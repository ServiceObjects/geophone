'''
Service Objects, Inc.

This module provides the get_phone_info_last_first function to validate and retrieve phone number
information using the Service Objects GP API's GetPhoneInfoLastFirst endpoint. It handles live/trial
endpoints, fallback logic, and JSON parsing.

Functions:
    get_phone_info_last_first(phone_number: str, license_key: str, is_live: bool, timeout_seconds: int) -> dict:
'''

import requests  # HTTP client for RESTful API calls
from gp_response import GPResponse, Provider, Contact, Error

# Endpoint URLs for GP GetPhoneInfoLastFirst service
primary_url = 'https://sws.serviceobjects.com/GP/api.svc/json/GetPhoneInfoLastFirst?'
backup_url = 'https://swsbackup.serviceobjects.com/GP/api.svc/json/GetPhoneInfoLastFirst?'
trial_url = 'https://trial.serviceobjects.com/GP/api.svc/json/GetPhoneInfoLastFirst?'


def get_phone_info_last_first(phone_number: str, license_key: str, is_live: bool = True) -> GPResponse:
    """
    Call GP GetPhoneInfoLastFirst API to retrieve phone number information.

    Parameters:
        phone_number (str): Phone number to look up (e.g., '805-963-1700'). Required.
        license_key (str): Service Objects license key. Required.
        is_live (bool): True for production endpoints, False for trial URL. Defaults to True.
        timeout_seconds (int): Timeout for API calls in seconds. Defaults to 30.

    Returns:
        dict: Parsed JSON response with phone information or error details.
    """
    # Prepare query parameters for GP API
    params = {
        'PhoneNumber': phone_number,
        'LicenseKey': license_key
    }

    # Select the base URL: production vs trial
    url = primary_url if is_live else trial_url

    # Attempt primary (or trial) endpoint first
    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()

        # If API returned an error in JSON payload, trigger fallback
        error = getattr(response, 'Error', None)
        if not (error is None or getattr(error, 'Number', None) != "4"):
            if is_live:
                # Try backup URL when live
                response = requests.get(backup_url, params=params, timeout=10)
                response.raise_for_status()
                data = response.json()
                # If still error, propagate exception
                if 'Error' in data:
                    raise RuntimeError(f"GP service error: {data['Error']}")
            else:
                # Trial mode should not fallback; error is terminal
                raise RuntimeError(f"GP trial error: {data['Error']}")

        # Convert JSON response to GPResponse for structured access
        error = Error(**data.get('Error', {})) if data.get('Error') else None
        providers = [Provider(**prov) for prov in data.get('Providers', [])] if data.get('Providers') else None
        contacts = [Contact(**cont) for cont in data.get('Contacts', [])] if data.get('Contacts') else None
        response = GPResponse(providers=providers, contacts=contacts, error=error)

        return response

    except requests.RequestException as req_exc:
        # Network or HTTP-level error occurred
        if is_live:
            try:
                # Fallback to backup URL on network failure
                response = requests.get(backup_url, params=params, timeout=10)
                response.raise_for_status()
                data = response.json()
                if 'Error' in data and data['Error'].get('Number') == "4":
                    raise RuntimeError(f"GP backup error: {data['Error']}") from req_exc

                # Convert JSON response to GPResponse for structured access
                error = Error(**data.get('Error', {})) if data.get('Error') else None
                providers = [Provider(**prov) for prov in data.get('Providers', [])] if data.get('Providers') else None
                contacts = [Contact(**cont) for cont in data.get('Contacts', [])] if data.get('Contacts') else None
                response = GPResponse(providers=providers, contacts=contacts, error=error)

                return response

            except Exception as backup_exc:
                # Both primary and backup failed; escalate
                raise RuntimeError("GP service unreachable on both endpoints") from backup_exc
        else:
            # In trial mode, propagate the network exception
            raise RuntimeError(f"GP trial error: {str(req_exc)}") from req_exc
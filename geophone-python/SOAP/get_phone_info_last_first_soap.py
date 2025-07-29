from suds.client import Client
from suds import WebFault
from suds.sudsobject import Object
from dataclasses import dataclass

class GetPhoneInfoLastFirstValidation:
    def __init__(self, license_key: str, is_live: bool, timeout_ms: int = 10000):
        """
        license_key: Service Objects GeoPhone license key.
        is_live: whether to use live or trial endpoints
        timeout_ms: SOAP call timeout in milliseconds
        """
        self._timeout_s = timeout_ms / 1000.0
        self._is_live = is_live
        self.license_key = license_key

        # WSDL URLs
        self._primary_wsdl = (
            "https://sws.serviceobjects.com/gp/soap.svc?wsdl"
            if is_live else
            "https://trial.serviceobjects.com/gp/soap.svc?wsdl"
        )
        self._backup_wsdl = (
            "https://swsbackup.serviceobjects.com/gp/soap.svc?wsdl"
            if is_live else
            "https://trial.serviceobjects.com/gp/soap.svc?wsdl"
        )

    def get_phone_info_last_fisrt(self, phone_number: str) -> Object:
        """
        Calls GetPhoneInfoLastFirst on the primary endpoint; on None response,
        WebFault, or Error.Number == '4' falls back to the backup endpoint.
        returns: the suds response object
        raises RuntimeError: if both endpoints fail
        """
        # Common kwargs for both calls
        call_kwargs = dict(
            PhoneNumber=phone_number,
            LicenseKey=self.license_key
        )

        # Attempt primary
        try:
            client = Client(self._primary_wsdl, timeout=self._timeout_s)

            # Override endpoint URL if needed:
            response = client.service.GetPhoneInfo_V2(**call_kwargs)

            # If response is None or fatal error code, trigger fallback
            if response is None or (hasattr(response, 'Error') and response.Error and response.Error.Number == '4'):
                raise ValueError("Primary returned no result or fatal Error.Number=4")

            return response

        except (WebFault, ValueError, Exception) as primary_ex:
            # Attempt backup
            try:
                client = Client(self._backup_wsdl, timeout=self._timeout_s)
                response = client.service.GetPhoneInfo_V2(**call_kwargs)
                if response is None:
                    raise ValueError("Backup returned no result")
                return response
            except (WebFault, Exception) as backup_ex:
                msg = (
                    "Both primary and backup endpoints failed.\n"
                    f"Primary error: {str(primary_ex)}\n"
                    f"Backup error: {str(backup_ex)}"
                )
                raise RuntimeError(msg)
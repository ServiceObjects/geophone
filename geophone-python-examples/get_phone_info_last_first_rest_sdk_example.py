
import sys
import os

sys.path.insert(0, os.path.abspath("../geophone-python//REST"))

from get_phone_info_last_first_rest import get_phone_info_last_first


def get_phone_info_last_first_rest_sdk_go(license_key: str, is_live: bool) -> None:
    print("\n-------------------------------------------")
    print("GeoPhone - GetPhoneInfoLastFirst - REST SDK")
    print("-------------------------------------------")

    print("\n* Input *\n")
    print(f"Phone Number: 805-963-1700")
    print(f"Is Live     : {is_live}")
    print(f"License Key : {license_key}")

    try:
        # Call the API
        response = get_phone_info_last_first(
            phone_number="805-963-1700",
            license_key=license_key,
            is_live=is_live
        )

        if response.error is None:
            print("\n* Validation *\n")
            if response.providers:
                print("\n* Providers *\n")
                for provider in response.providers:
                    print(f"Provider : {provider.Name}")
                    print(f"City     : {provider.City}")
                    print(f"State    : {provider.State}")
                    print(f"LineType : {provider.LineType}")
                    print(f"Latitude : {provider.Latitude}")
                    print(f"Longitude: {provider.Longitude}")
                    print(f"Quality  : {provider.Quality}")
            else:
                print("No providers found.")
            print("\n* Contacts *\n")
            if response.contacts:
                for contact in response.contacts:
                    print(f"Name   : {contact.Name}")
                    print(f"Address: {contact.Address}")
                    print(f"City   : {contact.City}")
                    print(f"State  : {contact.State}")
                    print(f"Zip    : {contact.Zip}")
                    print(f"Type   : {contact.Type}")
            else:
                print("No contacts found.")
        else:
            print("\n* Error *\n")
            print(f"Error Description: {response.error.Desc}")
            print(f"Error Number     : {response.error.Number}")
            print(f"Error Location   : {response.error.Location}")

    except Exception as ex:
        print("\n* Exception *\n")
        print(f"Error: {str(ex)}")
        if ex.__cause__:
            print(f"Inner Exception: {str(ex.__cause__)}")
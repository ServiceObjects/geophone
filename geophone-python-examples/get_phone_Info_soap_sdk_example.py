import sys
import os

sys.path.insert(0, os.path.abspath("../geophone-python/SOAP"))

from get_phone_Info_soap import GetPhoneInfoValidation

def get_phone_info_soap_sdk_go(license_key, is_live):
    print("\n----------------------------------")
    print("GeoPhone - GetPhoneInfo - SOAP SDK")
    print("----------------------------------")
    
    print("\n* Input *\n")
    print(f"Phone Number: 805-963-1700")
    print(f"Is Live     : {is_live}")
    print(f"License Key : {license_key}")

    service = GetPhoneInfoValidation(license_key, is_live=True)
    try:
        response = service.get_phone_info(phone_number="805-963-1700")
        if not hasattr(response, 'Error'):
            print("\n* Validation *\n")
            if hasattr(response, 'Providers') and response.Providers:
                print("\n* Providers *\n")
                for provider in response.Providers:
                    print(f"Name     : {provider[1][0].Name}")
                    print(f"City     : {provider[1][0].City}")
                    print(f"State    : {provider[1][0].State}")
                    print(f"LineType : {provider[1][0].LineType}")
                    print(f"Latitude : {provider[1][0].Latitude}")
                    print(f"Longitude: {provider[1][0].Longitude}")
                    print(f"Quality  : {provider[1][0].Quality}")
            if hasattr(response, 'Contacts') and response.Contacts:
                print("\n\n* Contacts *\n")
                for contact in response.Contacts:
                    print(f"Name   : {contact[1][0].Name}")
                    print(f"Address: {contact[1][0].Address}")
                    print(f"City   : {contact[1][0].City}")
                    print(f"State  : {contact[1][0].State}")
                    print(f"ZIP    : {contact[1][0].Zip}")
                    print(f"Type   : {contact[1][0].Type}")
        else:
            if hasattr(response, 'Error') and response.Error:
                print("\n* Error *\n")
                print(f"Number     : {response.Error.Number}")
                print(f"Description: {response.Error.Desc}")
    except RuntimeError as e:
        print("Error calling service:", e)
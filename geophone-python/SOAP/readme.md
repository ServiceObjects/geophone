![Service Objects Logo](https://www.serviceobjects.com/wp-content/uploads/2021/05/SO-Logo-with-TM.gif "Service Objects Logo")

# GP - GeoPhone 

DOTS GeoPhone (referred to as “GeoPhone” or “GP”) is a publicly available XML web service that provides reverse phone lookup information about a US (or sometimes Canadian) phone number. The service provides name, address, city and state, along with carrier exchange information.

GeoPhone can provide instant reverse-phone lookup verification to websites or data enhancement to contact lists. However, the output from GP must be considered carefully before the existence or non-existence of a given phone number is decided.

## [Service Objects Website](https://serviceobjects.com)

# GP - GetPhoneInfo_V2

This is an improved version of the basic GetPhoneInfo operation. Given a phone number, will consult national directory-assistance databases to find the owner and address registered. The addresses returned are not validated via any address-validation technique. They are returned to you exactly as the phone carrier releases them. If you need these addresses to be validated, using Service Objects’ AddressValidation web services is highly recommended. 

Both the contact’s information and the phone company’s information are returned with this operation. The other operations in this service return the same data, but pared down.

Two valuable bits of information are also retrieved – whether the phone line is for business or residential purposes, and whether the phone line is landline, wireless or voip. Unique to this operation, latitude and longitude are returned. Coordinates are city centroids (ie the center points of the city the number is found in), but in most cases this is tied to a smaller area (for example, it’s the center of a suburb of a bigger city).

Finally, also new is the quality field. Currently all contacts will be returned as HIGH quality. Current contact data is updated daily and is very accurate. We may add additional data sources in the future that would supplement these results. These additional sources may not be as “fresh” or reliable as our current ones and would be given lower quality ratings. By examining the WSDL, you may see that multiple groups of contact/exchange information are possible. Although they are possible in the XML, you will only see one exchange per output, always. It is common, however, to see multiple contacts per phone number (as people change numbers, or there may be multiple businesses at the same phone number.) It is highly recommended that you handle each of these contacts, rather than just the first contact returned.

### [GetPhoneInfo_V2 Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-geophone/gp-operations/gp-getphoneinfo_v2-recommended/)

## Library Usage

```
1. Build the input
# Required fields:
#               PhoneNumber
#               LicenseKey
#               IsLive

from get_phone_Info_soap import GetPhoneInfoValidation

# 2 Call the  GetPhoneInfo method
service = GetPhoneInfoValidation(license_key, is_live=True)
response = service.get_phone_info(phone_number="805-963-1700")

# 3. Inspect results.
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
```

## GP - GetPhoneInfoLastFirst

This is the basic operation for finding the reverse-lookup information. Given a phone number, will consult national directory-assistance databases to find the owner and address registered. The addresses returned are not validated via any address-validation technique. They are returned to you exactly as the phone carrier releases them. If you need these addresses to be validated, using Service Objects’ AddressValidation web services is highly recommended. 
Both the contact’s information and the phone company’s information are returned with this operation. The other operations in this service return the same data, but pared down. This operation reverses the contacts name if the contact is residential (ie it returns name as Last,First).

Two valuable bits of information are also retrieved – whether the phone line is for business or residential purposes, and whether the phone line is landline or wireless. By examining the WSDL, you may see that multiple groups of contact/exchange information are possible. Although they are possible in the XML, you will only see one exchange per output, always. It is common, however, to see multiple contacts per phone number (as people change numbers, or there may be multiple businesses at the same phone number.) It is highly recommended that you handle each of these contacts, rather than just the first contact returned.

### [GetPhoneInfoLastFirst Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-geophone/gp-operations/gp-getphoneinfolastfirst/)

## Library Usage

```
1. Build the input
# Required fields:
#               PhoneNumber
#               LicenseKey
#               IsLive

from get_phone_info_last_first_soap import GetPhoneInfoLastFirstValidation

# 2 Call the method GetPhoneInfoLastFirst

service = GetPhoneInfoLastFirstValidation(license_key, is_live=True)
response = service.get_phone_info_last_fisrt(phone_number="805-963-1700")

# 3. Inspect results.   

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
    else:
        print("No providers found.")
    if hasattr(response, 'Contacts') and response.Contacts:
        print("\n* Contacts *\n")
        for contact in response.Contacts:
            print(f"Name   : {contact[1][0].Name}")
            print(f"Address: {contact[1][0].Address}")
            print(f"City   : {contact[1][0].City}")
            print(f"State  : {contact[1][0].State}")
            print(f"ZIP    : {contact[1][0].Zip}")
            print(f"Type   : {contact[1][0].Type}")
    else:
        print("No contacts found.")
else:
    if hasattr(response, 'Error') and response.Error:
        print("\n* Error *\n")
        print(f"Number     : {response.Error.Number}")
        print(f"Description: {response.Error.Desc}")
```
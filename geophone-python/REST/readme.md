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
#  1. Build the input
# Required fields:
#               PhoneNumber
#               LicenseKey
#               IsLive

from get_phone_Info_rest import get_phone_info

# 2  Call the method
 response_data = get_phone_info(
            phone_number=phone_number,
            license_key=license_key,
            is_live=is_live
        )

# 3. Inspect results.
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
```

## GP - GetPhoneInfoLastFirst

This is the basic operation for finding the reverse-lookup information. Given a phone number, will consult national directory-assistance databases to find the owner and address registered. The addresses returned are not validated via any address-validation technique. They are returned to you exactly as the phone carrier releases them. If you need these addresses to be validated, using Service Objects’ AddressValidation web services is highly recommended. 
Both the contact’s information and the phone company’s information are returned with this operation. The other operations in this service return the same data, but pared down. This operation reverses the contacts name if the contact is residential (ie it returns name as Last,First).

Two valuable bits of information are also retrieved – whether the phone line is for business or residential purposes, and whether the phone line is landline or wireless. By examining the WSDL, you may see that multiple groups of contact/exchange information are possible. Although they are possible in the XML, you will only see one exchange per output, always. It is common, however, to see multiple contacts per phone number (as people change numbers, or there may be multiple businesses at the same phone number.) It is highly recommended that you handle each of these contacts, rather than just the first contact returned.

### [GetPhoneInfoLastFirst Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-geophone/gp-operations/gp-getphoneinfolastfirst/)

## Library Usage

```
#  1. Build the input
# Required fields:
#               PhoneNumber
#               LicenseKey
#               IsLive
#
# Though the API will run in any scenario, not adhering to these
# rules can result in error responses.

from get_phone_info_last_first_rest import get_phone_info_last_first

#  2. Call the method

response_data = get_phone_info_last_first(
            phone_number=phone_number,
            license_key=license_key,
            is_live=is_live
        )
      
#  3. Inspect results. 
if response.error is None:
    print("\n* Provide *\n")
    if response.providers:
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

    print("\n* Contact *\n")
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
    print(f"Error Description: {response.Error.Desc}")
    print(f"Error Number     : {response.Error.Number}")
```
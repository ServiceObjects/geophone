![Service Objects Logo](https://www.serviceobjects.com/wp-content/uploads/2021/05/SO-Logo-with-TM.gif "Service Objects Logo")

# GP - GeoPhone

DOTS GeoPhone (referred to as “GeoPhone” or “GP”) is a publicly available XML web service that provides reverse phone lookup information about a US (or sometimes Canadian) phone number. The service provides name, address, city and state, along with carrier exchange information.

GeoPhone can provide instant reverse-phone lookup verification to websites or data enhancement to contact lists. However, the output from GP must be considered carefully before the existence or non-existence of a given phone number is decided.

## [Service Objects Website](https://serviceobjects.com)
## [Developer Guide/Documentation](https://www.serviceobjects.com/docs/)

# GP - GetPhoneInfo_V2

This is an improved version of the basic GetPhoneInfo operation. Given a phone number, will consult national directory-assistance databases to find the owner and address registered. The addresses returned are not validated via any address-validation technique. They are returned to you exactly as the phone carrier releases them. If you need these addresses to be validated, using Service Objects’ AddressValidation web services is highly recommended. 

Both the contact’s information and the phone company’s information are returned with this operation. The other operations in this service return the same data, but pared down.

Two valuable bits of information are also retrieved – whether the phone line is for business or residential purposes, and whether the phone line is landline, wireless or voip. Unique to this operation, latitude and longitude are returned. Coordinates are city centroids (ie the center points of the city the number is found in), but in most cases this is tied to a smaller area (for example, it’s the center of a suburb of a bigger city).

Finally, also new is the quality field. Currently all contacts will be returned as HIGH quality. Current contact data is updated daily and is very accurate. We may add additional data sources in the future that would supplement these results. These additional sources may not be as “fresh” or reliable as our current ones and would be given lower quality ratings. By examining the WSDL, you may see that multiple groups of contact/exchange information are possible. Although they are possible in the XML, you will only see one exchange per output, always. It is common, however, to see multiple contacts per phone number (as people change numbers, or there may be multiple businesses at the same phone number.) It is highly recommended that you handle each of these contacts, rather than just the first contact returned.

### [GetPhoneInfo_V2 Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-geophone/gp-operations/gp-getphoneinfo_v2-recommended/)

## GetPhoneInfo_V2 Request URLs (Query String Parameters)

>[!CAUTION]
>### *Important - Use query string parameters for all inputs.  Do not use path parameters since it will lead to errors due to optional parameters and special character issues.*


### JSON
#### Trial

https://trial.serviceobjects.com/GP/api.svc/json/GetPhoneInfo_V2?PhoneNumber=805-963-1700&LicenseKey={LicenseKey}

#### Production

https://sws.serviceobjects.com/GP/api.svc/json/GetPhoneInfo_V2?PhoneNumber=805-963-1700&LicenseKey={LicenseKey}

#### Production Backup

https://swsbackup.serviceobjects.com/GP/api.svc/json/GetPhoneInfo_V2?PhoneNumber=805-963-1700&LicenseKey={LicenseKey}

### XML
#### Trial

https://trial.serviceobjects.com/GP/api.svc/xml/GetPhoneInfo_V2?PhoneNumber=805-963-1700&LicenseKey={LicenseKey}

#### Production

https://sws.serviceobjects.com/GP/api.svc/xml/GetPhoneInfo_V2?PhoneNumber=805-963-1700&LicenseKey={LicenseKey}

#### Production Backup

https://swsbackup.serviceobjects.com/GP/api.svc/xml/GetPhoneInfo_V2?PhoneNumber=805-963-1700&LicenseKey={LicenseKey}

# GP - GetPhoneInfoLastFirst

This is the basic operation for finding the reverse-lookup information. Given a phone number, will consult national directory-assistance databases to find the owner and address registered. The addresses returned are not validated via any address-validation technique. They are returned to you exactly as the phone carrier releases them. If you need these addresses to be validated, using Service Objects’ AddressValidation web services is highly recommended. 
Both the contact’s information and the phone company’s information are returned with this operation. The other operations in this service return the same data, but pared down. This operation reverses the contacts name if the contact is residential (ie it returns name as Last,First).

Two valuable bits of information are also retrieved – whether the phone line is for business or residential purposes, and whether the phone line is landline or wireless. By examining the WSDL, you may see that multiple groups of contact/exchange information are possible. Although they are possible in the XML, you will only see one exchange per output, always. It is common, however, to see multiple contacts per phone number (as people change numbers, or there may be multiple businesses at the same phone number.) It is highly recommended that you handle each of these contacts, rather than just the first contact returned.

### [GetPhoneInfoLastFirst Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-geophone/gp-operations/gp-getphoneinfolastfirst/)

## GetPhoneInfoLastFirst Request URLs (Query String Parameters)

>[!CAUTION]
>#### *Important - Use query string parameters for all inputs.  Do not use path parameters since it will lead to errors due to optional parameters and special character issues.*

### JSON
#### Trial

https://trial.serviceobjects.com/GP/api.svc/json/GetPhoneInfoLastFirst?PhoneNumber=805-963-1700&LicenseKey={LicenseKey}

#### Production

https://sws.serviceobjects.com/GP/api.svc/json/GetPhoneInfoLastFirst?PhoneNumber=805-963-1700&LicenseKey={LicenseKey}

#### Production Backup

https://swsbackup.serviceobjects.com/GP/api.svc/json/GetPhoneInfoLastFirst?PhoneNumber=805-963-1700&LicenseKey={LicenseKey}

### XML
#### Trial

https://trial.serviceobjects.com/GP/api.svc/xml/GetPhoneInfoLastFirst?PhoneNumber=805-963-1700&LicenseKey={LicenseKey}

#### Production

https://sws.serviceobjects.com/GP/api.svc/xml/GetPhoneInfoLastFirst?PhoneNumber=805-963-1700&LicenseKey={LicenseKey}

#### Production Backup

https://swsbackup.serviceobjects.com/GP/api.svc/xml/GetPhoneInfoLastFirst?PhoneNumber=805-963-1700&LicenseKey={LicenseKey}
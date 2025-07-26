![Service Objects Logo](https://www.serviceobjects.com/wp-content/uploads/2021/05/SO-Logo-with-TM.gif "Service Objects Logo")

# GP - GeoPhone  

Developers to interact with Service Objects' **DOTS GeoPhone API**, including `GetPhoneInfo_V2` and `GetPhoneInfoLastFirst` operations. Both services return data about a given U.S. phone number, including contact and carrier information.

The  supports both sync and async operations, provides automatic failover for live environments, and features strongly typed models.

## [Service Objects Website](https://serviceobjects.com)

# GP - GetPhoneInfo_V2

This is an improved version of the basic GetPhoneInfo operation. Given a phone number, will consult national directory-assistance databases to find the owner and address registered. The addresses returned are not validated via any address-validation technique. They are returned to you exactly as the phone carrier releases them. If you need these addresses to be validated, using Service Objects’ AddressValidation web services is highly recommended. 

Both the contact’s information and the phone company’s information are returned with this operation. The other operations in this service return the same data, but pared down.

Two valuable bits of information are also retrieved – whether the phone line is for business or residential purposes, and whether the phone line is landline, wireless or voip. Unique to this operation, latitude and longitude are returned. Coordinates are city centroids (ie the center points of the city the number is found in), but in most cases this is tied to a smaller area (for example, it’s the center of a suburb of a bigger city).

Finally, also new is the quality field. Currently all contacts will be returned as HIGH quality. Current contact data is updated daily and is very accurate. We may add additional data sources in the future that would supplement these results. These additional sources may not be as “fresh” or reliable as our current ones and would be given lower quality ratings. By examining the WSDL, you may see that multiple groups of contact/exchange information are possible. Although they are possible in the XML, you will only see one exchange per output, always. It is common, however, to see multiple contacts per phone number (as people change numbers, or there may be multiple businesses at the same phone number.) It is highly recommended that you handle each of these contacts, rather than just the first contact returned.

### [GetPhoneInfo_V2 Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-geophone/gp-operations/gp-getphoneinfo_v2-recommended/)

## Library Usage

```
//
// 1. Build the input
//
//  Required fields:
//               PhoneNumber
//               LicenseKey
//               IsLive
// 
// Optional:
//        TimeoutSeconds (default: 15)

using geo_phone_dot_net.REST;

var input = new GetPhoneInfoClient.GetPhoneInfoInput(
    PhoneNumber:    "805-963-1700",
    LicenseKey:     "YOUR_LICENSE_KEY_HERE",
    IsLive:         true,
    TimeoutSeconds: 15
);

// 2. Call the sync Invoke() method.
GPResponse response = GetPhoneInfoClient.Invoke(input);

// 3. Inspect results.
if (response.Error is null)
{
    Console.WriteLine("\r\n* Provider *\r\n"); 

    foreach (var provider in response.Providers)
    {
        Console.WriteLine($"Provider : {provider.Name}");
        Console.WriteLine($"City     : {provider.City}");
        Console.WriteLine($"State    : {provider.State}");
        Console.WriteLine($"Line Type: {provider.LineType}");
        Console.WriteLine($"Latitude : {provider.Latitude}");
        Console.WriteLine($"Longitude: {provider.Longitude}");
        Console.WriteLine($"Quality  : {provider.Quality}");
    }

    Console.WriteLine("\r\n* Contact *\r\n");

    foreach (var contact in response.Contacts)
    {
        Console.WriteLine($"Name   : {contact.Name}");
        Console.WriteLine($"Address: {contact.Address}");
        Console.WriteLine($"City   : {contact.City}");
        Console.WriteLine($"State  : {contact.State}");
        Console.WriteLine($"Zip    : {contact.Zip}");
        Console.WriteLine($"Type   : {contact.Type}");
    }
}
else
{
    Console.WriteLine("\n* Error *\r\n");

    Console.WriteLine($"Error Type : {response.Error.Type}");
    Console.WriteLine($"Description: {response.Error.Desc}");
    Console.WriteLine($"Code       : {response.Error.Number}");
}
```

## GP - GetPhoneInfoLastFirst

This is the basic operation for finding the reverse-lookup information. Given a phone number, will consult national directory-assistance databases to find the owner and address registered. The addresses returned are not validated via any address-validation technique. They are returned to you exactly as the phone carrier releases them. If you need these addresses to be validated, using Service Objects’ AddressValidation web services is highly recommended. 
Both the contact’s information and the phone company’s information are returned with this operation. The other operations in this service return the same data, but pared down. This operation reverses the contacts name if the contact is residential (ie it returns name as Last,First).

Two valuable bits of information are also retrieved – whether the phone line is for business or residential purposes, and whether the phone line is landline or wireless. By examining the WSDL, you may see that multiple groups of contact/exchange information are possible. Although they are possible in the XML, you will only see one exchange per output, always. It is common, however, to see multiple contacts per phone number (as people change numbers, or there may be multiple businesses at the same phone number.) It is highly recommended that you handle each of these contacts, rather than just the first contact returned.

### [GetPhoneInfoLastFirst Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-geophone/gp-operations/gp-getphoneinfolastfirst/)

## Library Usage

```
// 1. Build the input
//  Required fields:
//               PhoneNumber
//               LicenseKey
//               IsLive
//
// Optional:
//        TimeoutSeconds (default: 30)

using geo_phone_dot_net.REST;

var input = new GetPhoneInfoLastFirstInput.GetPhoneInfoLastFirstInput(
    PhoneNumber:    "805-963-1700",
    LicenseKey:     "YOUR_LICENSE_KEY_HERE",
    IsLive:         true,
    TimeoutSeconds: 15
);

// 2. Call the sync Invoke() method.
GPResponse response = GetPhoneInfoLastFirstClient.Invoke(input);

// 3. Inspect results.
if (response.Error is null)
{
    Console.WriteLine("\r\n* Provider *\r\n");

    foreach (var provider in response.Providers)
    {
        Console.WriteLine($"Provider    : {provider.Name}");
        Console.WriteLine($"Phone Number: {provider.City}");
        Console.WriteLine($"State       : {provider.State}");
        Console.WriteLine($"LineType    : {provider.LineType}");
        Console.WriteLine($"Latitude    : {provider.Latitude}");
        Console.WriteLine($"Longitude   : {provider.Longitude}");
        Console.WriteLine($"Quality     : {provider.Quality}");
    }

    Console.WriteLine("\r\n* Contact *\r\n");

    foreach (var contact in response.Contacts)
    {
        Console.WriteLine($"Name   : {contact.Name}");
        Console.WriteLine($"Address: {contact.Address}");
        Console.WriteLine($"City   : {contact.City}");
        Console.WriteLine($"State  : {contact.State}");
        Console.WriteLine($"Zip    : {contact.Zip}");
        Console.WriteLine($"Type   : {contact.Type}");
    }
}
else
{
    Console.WriteLine("\r\n* Error *\r\n");

    Console.WriteLine($"Error Description: {response.Error.Desc}");
    Console.WriteLine($"Error Number     : {response.Error.Number}");
    Console.WriteLine($"Error Location   : {response.Error.Location}");
}
```
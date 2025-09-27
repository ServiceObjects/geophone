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
//  1. Build the input
// Required fields:
//              phoneNumber
//              licenseKey
//              isLive

import { GetPhoneInfoClient } from "../geophone-nodejs/src/REST/get-phone-Info-rest.js";

const phoneNumber = "805-963-17000";
const timeoutSeconds = 15;
const isLive = true;
const licenseKey = "YOUR LICENSE KEY";

// 2  Call the method 
const response_data = await GetPhoneInfoClient.invoke(phoneNumber, licenseKey, isLive, timeoutSeconds);

//  3. Inspect results.
if (response_data.Error)
        return console.error("Error invoking GetPhoneInfo:", response_data.Error);
    
console.log("\n* Validation *\n");

if (response_data.Providers && response_data.Providers.length > 0) {
    console.log("\n* Providers *\n");
    for (const provider in response_data.Providers) {
        const providerData = response_data.Providers[provider];
        console.log(`Name     : ${providerData.Name}`);
        console.log(`City     : ${providerData.City}`);
        console.log(`State    : ${providerData.State}`);
        console.log(`LineType : ${providerData.LineType}`);
        console.log(`Latitude : ${providerData.Latitude}`);
        console.log(`Longitude: ${providerData.Longitude}`);
        console.log(`Quality  : ${providerData.Quality}`);
    }
} else {
    console.log("No providers found.");
}
console.log("\n* Contacts *\n");
if (response_data.Contacts && response_data.Contacts.length > 0) {
    for (const contact in response_data.Contacts) {
        const contactData = response_data.Contacts[contact];
        console.log(`Name   : ${contactData.Name}`);
        console.log(`Address: ${contactData.Address}`);
        console.log(`City   : ${contactData.City}`);
        console.log(`State  : ${contactData.State}`);
        console.log(`Zip    : ${contactData.Zip}`);
        console.log(`Type   : ${contactData.Type}`);
    }
} else {
    console.log("No contacts found.");
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
// Required fields:
//               phoneNumber
//               licenseKey
//               isLive

import { GetPhoneInfoLastFirstClient } from '../geophone-nodejs/src/REST/get-phone-info-last-first-rest.js';

const phoneNumber = "805-963-17000";
const timeoutSeconds = 15;
const isLive = true;
const licenseKey = "YOUR LICENSE KEY";
 
// 2. Call the method
const response_data = await GetPhoneInfoLastFirstClient.invokeAsync(phoneNumber, licenseKey, isLive, timeoutSeconds);
      
// 3. Inspect results. 
if (response_data.Error)
    return console.error("Error invoking GetPhoneInfo:", response_data.Error);
    
console.log("\n* Validation *\n");

if (response_data.Providers && response_data.Providers.length > 0) {
    console.log("\n* Providers *\n")
    for (const provider in response_data.Providers) {
        const providerData = response_data.Providers[provider];
        console.log(`Name     : ${providerData.Name}`);
        console.log(`City     : ${providerData.City}`);
        console.log(`State    : ${providerData.State}`);
        console.log(`LineType : ${providerData.LineType}`);
        console.log(`Latitude : ${providerData.Latitude}`);
        console.log(`Longitude: ${providerData.Longitude}`);
        console.log(`Quality  : ${providerData.Quality}`);
    }
} else {
    console.log("No providers found.");
}
console.log("\n* Contacts *\n");
if (response_data.Contacts && response_data.Contacts.length > 0) {
    for (const contact in response_data.Contacts) {
        const contactData = response_data.Contacts[contact];
        console.log(`Name   : ${contactData.Name}`);
        console.log(`Address: ${contactData.Address}`);
        console.log(`City   : ${contactData.City}`);
        console.log(`State  : ${contactData.State}`);
        console.log(`Zip    : ${contactData.Zip}`);
        console.log(`Type   : ${contactData.Type}`);
    }
} else {
    console.log("No contacts found.");
} 
```
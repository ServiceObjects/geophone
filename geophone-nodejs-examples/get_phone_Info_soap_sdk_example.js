import { GetPhoneInfoSoap } from "../geophone-nodejs/src/SOAP/get-phone-Info-soap.js";

export async function getPhoneInfoSoapGo(licenseKey, isLive) {
    console.log("\n----------------------------------")
    console.log("GeoPhone - GetPhoneInfo - SOAP SDK")
    console.log("----------------------------------")

    console.log("\n* Input *\n")
    console.log("Phone Number: 805-963-1700")
    console.log("Is Live     : " + isLive)
    console.log("License Key : " + licenseKey)

    const phoneNumber = "805-963-17000";
    const timeoutSeconds = 15;

    const client = new GetPhoneInfoSoap(phoneNumber, licenseKey, isLive, timeoutSeconds);
    const response_data = await client.getPhoneInfo();

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
}

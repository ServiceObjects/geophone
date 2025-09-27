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

    if (response_data.Providers) {
        console.log("\n* Providers *\n")
        console.log(`Name     : ${response_data.Providers.Provider[0].Name}`);
        console.log(`City     : ${response_data.Providers.Provider[0].City}`);
        console.log(`State    : ${response_data.Providers.Provider[0].State}`);
        console.log(`LineType : ${response_data.Providers.Provider[0].LineType}`);
        console.log(`Latitude : ${response_data.Providers.Provider[0].Latitude}`);
        console.log(`Longitude: ${response_data.Providers.Provider[0].Longitude}`);
        console.log(`Quality  : ${response_data.Providers.Provider[0].Quality}`);
    } else {
        console.log("No providers found.");
    }
    console.log("\n* Contacts *\n");
    if (response_data.Contacts) {
        console.log(`Name   : ${response_data.Contacts.Contact[0].Name}`);
        console.log(`Address: ${response_data.Contacts.Contact[0].Address}`);
        console.log(`City   : ${response_data.Contacts.Contact[0].City}`);
        console.log(`State  : ${response_data.Contacts.Contact[0].State}`);
        console.log(`Zip    : ${response_data.Contacts.Contact[0].Zip}`);
        console.log(`Type   : ${response_data.Contacts.Contact[0].Type}`);
    } else {
        console.log("No contacts found.");
    }
}

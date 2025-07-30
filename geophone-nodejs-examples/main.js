import { getPhoneInfoGo } from "./get_phone_Info_rest_sdk_example.js";
import { getPhoneInfoLastFirstGo } from "./get_phone_info_last_first_rest_sdk_example.js";
import { getPhoneInfoSoapGo } from "./get_phone_Info_soap_sdk_example.js";
import { getPhoneInfoLastFirstSoapGo } from "./get_phone_info_last_first_soap_sdk_example.js";

async function main() {
    //Your license key from Service Objects.
    //Trial license keys will only work on the
    //trail environments and production license
    //keys will only owork on production environments.
    const licenseKey = "LICENSE KEY";
    const isLive = true;

    //GeoPhone - GetPhoneInfo - REST SDK
    await getPhoneInfoGo(licenseKey, isLive);

    //GeoPhone - GetPhoneInfoLastFirst - REST SDK
    await getPhoneInfoLastFirstGo(licenseKey, isLive);

    //GeoPhone - GetPhoneInfo - SOAP SDK"
    await getPhoneInfoSoapGo(licenseKey, isLive);

    //GeoPhone - GetPhoneInfoLastFirst - SOAP SDK"
    await getPhoneInfoLastFirstSoapGo(licenseKey, isLive);
}

main().catch((err) => console.error("Error:", err));

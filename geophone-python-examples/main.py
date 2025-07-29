
from get_phone_Info_rest_sdk_example import get_phone_info_rest_sdk_go
from get_phone_Info_soap_sdk_example import get_phone_info_soap_sdk_go
from get_phone_info_last_first_rest_sdk_example import get_phone_info_last_first_rest_sdk_go
from get_phone_info_last_first_soap_sdk_example import get_phone_info_last_first_soap_sdk_go


if __name__ == "__main__":  
 
    # Your license key from Service Objects.  
    # Trial license keys will only work on the trial environments and production  
    # license keys will only work on production environments.  
    license_key = "LICENSE KEY"  
    is_live_license_key = False  
 
    # GeoPhone - GetPhoneInfo - REST SDK
    get_phone_info_rest_sdk_go(license_key, is_live_license_key)

    # GeoPhone - GetPhoneInfoLastFirst - SOAP SDK
    get_phone_info_soap_sdk_go(license_key, is_live_license_key)

    # GeoPhone - GetPhoneInfoLastFirst - REST SDK
    get_phone_info_last_first_rest_sdk_go(license_key, is_live_license_key) 

    # GeoPhone - GetPhoneInfo - SOAP SDK
    get_phone_info_last_first_soap_sdk_go(license_key, is_live_license_key)




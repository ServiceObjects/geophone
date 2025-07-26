
// See https://aka.ms/new-console-template for more information
using geophone_dot_net_examples;

//Your license key from Service Objects.
//Trial license keys will only work on the
//trail environments and production license
//keys will only owork on production environments.
string LicenseKey = "LICENSE KEY";

bool IsProductionKey = true;

//GeoPhone - GetPhoneInfo - REST SDK
GetPhoneInfoRestSdkExample.Go(LicenseKey, IsProductionKey);

//GeoPhone - GetPhoneInfo - SOAP SDK
GetPhoneInfoSoapSdkExample.Go(LicenseKey, IsProductionKey);

//GeoPhone - GetPhoneInfoLastFirst - REST SDK
GetPhoneInfoLastFirstRestSdkExample.Go(LicenseKey, IsProductionKey);

//GeoPhone - GetPhoneInfoLastFirst - SOAP SDK
GetPhoneInfoLastFirstSoapSdkExample.Go(LicenseKey, IsProductionKey);



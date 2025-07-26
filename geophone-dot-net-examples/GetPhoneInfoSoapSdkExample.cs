using geophone_dot_net.SOAP;

namespace geophone_dot_net_examples
{
    public static class GetPhoneInfoSoapSdkExample
    {
        public static async Task Go(string LicenseKey, bool IsLive)
        {
            Console.WriteLine("\r\n---------------------------------------");
            Console.WriteLine("GeoPhone - GetPhoneInfoInput - SOAP SDK");
            Console.WriteLine("---------------------------------------");

            Console.WriteLine("\r\n* Input *\r\n");

            Console.WriteLine($"Phone Number: 805-963-1700");
            Console.WriteLine($"Is Live     : {IsLive}");
            Console.WriteLine($"License Key : {LicenseKey}");

            GetPhoneInfoValidation phoneInfoValidation = new (IsLive);
            GPService.PhoneInfo_V2 response = phoneInfoValidation.InvokeAsync("805-963-1700", LicenseKey).Result;

            if (response.Error is null)
            {
                Console.WriteLine("\r\n* Provider(s) *\r\n");

                foreach (GPService.Provider provider in response.Providers)
                {
                    Console.WriteLine($"Provider : {provider.Name}");
                    Console.WriteLine($"City     : {provider.City}");
                    Console.WriteLine($"State    : {provider.State}");
                    Console.WriteLine($"LineType : {provider.LineType}");
                    Console.WriteLine($"Latitude : {provider.Latitude}");
                    Console.WriteLine($"Longitude: {provider.Longitude}");
                    Console.WriteLine($"Quality  : {provider.Quality}");
                    Console.WriteLine("\r\n");
                }

                Console.WriteLine("* Contact(s) *\r\n");

                foreach (GPService.Contact contact in response.Contacts)
                {
                    Console.WriteLine($"Name   : {contact.Name}");
                    Console.WriteLine($"Address: {contact.Address}");
                    Console.WriteLine($"City   : {contact.City}");
                    Console.WriteLine($"State  : {contact.State}");
                    Console.WriteLine($"Zip    : {contact.Zip}");
                    Console.WriteLine($"Type   : {contact.Type}");
                    Console.WriteLine("\r\n");
                }
            }
            else
            {
                Console.WriteLine("\r\n* Error *\r\n");

                Console.WriteLine($"Error Description: {response.Error.Desc}");
                Console.WriteLine($"Error Number     : {response.Error.Number}");
                Console.WriteLine($"Error Location   : {response.Error.Location}");
            }
        }
    }
}

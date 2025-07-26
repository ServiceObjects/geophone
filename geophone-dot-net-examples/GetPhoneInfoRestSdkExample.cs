using geophone_dot_net.REST;

namespace geophone_dot_net_examples
{
    public static class GetPhoneInfoRestSdkExample
    {
        public static void Go(string LicenseKey, bool IsLive)
        {
            Console.WriteLine("\r\n---------------------------------------");
            Console.WriteLine("GeoPhone - GetPhoneInfoInput - REST SDK");
            Console.WriteLine("---------------------------------------");

            GetPhoneInfoClient.GetPhoneInfoInput getPhoneInfoInput = new(
                "805-963-1700",
                LicenseKey,
                IsLive);

            Console.WriteLine("\r\n* Input *\r\n");

            Console.WriteLine($"Phone Number: {getPhoneInfoInput.PhoneNumber}");
            Console.WriteLine($"Is Live     : {getPhoneInfoInput.IsLive}");
            Console.WriteLine($"License Key : {getPhoneInfoInput.LicenseKey}");

            GPResponse response = GetPhoneInfoClient.Invoke(getPhoneInfoInput);
            if (response.Error is null)
            {
                Console.WriteLine("\r\n* Provider(s) *\r\n");

                foreach (Provider provider in response.Providers)
                {
                    Console.WriteLine($"Provider : {provider.Name}");
                    Console.WriteLine($"City     : {provider.City}");
                    Console.WriteLine($"State    : {provider.State}");
                    Console.WriteLine($"Line Type: {provider.LineType}");
                    Console.WriteLine($"Latitude : {provider.Latitude}");
                    Console.WriteLine($"Longitude: {provider.Longitude}");
                    Console.WriteLine($"Quality  : {provider.Quality}");
                    Console.WriteLine("\r\n");
                }

                Console.WriteLine("* Contact(s) *\r\n");

                foreach (Contact contact in response.Contacts)
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
                Console.WriteLine("\n* Error *\r\n");

                Console.WriteLine($"Error Type : {response.Error.Number}");
                Console.WriteLine($"Description: {response.Error.Desc}");
                Console.WriteLine($"Code       : {response.Error.Number}");
            }
        }
       
    }
}

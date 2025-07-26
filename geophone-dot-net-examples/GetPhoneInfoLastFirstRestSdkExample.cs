using geophone_dot_net.REST;

namespace geophone_dot_net_examples
{
    public static class GetPhoneInfoLastFirstRestSdkExample
    {
        public static async void Go(string LicenseKey, bool IsLive)
        {
            Console.WriteLine("\r\n------------------------------------------------");
            Console.WriteLine("GeoPhone - GetPhoneInfoLastFirstInput - REST SDK");
            Console.WriteLine("------------------------------------------------");

            GetPhoneInfoLastFirstClient.GetPhoneInfoLastFirstInput input = new(
                PhoneNumber: "805-963-1700",
                LicenseKey: LicenseKey,
                IsLive: IsLive,
                TimeoutSeconds: 30
            );

            Console.WriteLine("\r\n* Input *\r\n");

            Console.WriteLine($"Phone Number: {input.PhoneNumber}");
            Console.WriteLine($"Is Live     : {input.IsLive}");
            Console.WriteLine($"License Key : {input.LicenseKey}");


            GPResponse response = GetPhoneInfoLastFirstClient.Invoke(input);
            if (response.Error is null)
            {
                Console.WriteLine("\r\n* Provider(s) *\r\n");

                foreach (var provider in response.Providers)
                {
                    Console.WriteLine($"Provider    : {provider.Name}");
                    Console.WriteLine($"Phone Number: {provider.City}");
                    Console.WriteLine($"State       : {provider.State}");
                    Console.WriteLine($"LineType    : {provider.LineType}");
                    Console.WriteLine($"Latitude    : {provider.Latitude}");
                    Console.WriteLine($"Longitude   : {provider.Longitude}");
                    Console.WriteLine($"Quality     : {provider.Quality}");
                    Console.WriteLine("\r\n");
                }

                Console.WriteLine("* Contact(s) *\r\n");

                foreach (var contact in response.Contacts)
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

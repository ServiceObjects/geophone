using System.Web;

namespace geophone_dot_net.REST
{
    /// <summary>
    /// Provides functionality to call the ServiceObjects GeoPhone REST API's GetPhoneInfo_V2 endpoint,
    /// retrieving phone-related information (e.g., provider and contact details) with fallback to a backup endpoint
    /// for reliability in live mode.
    /// </summary>
    public class GetPhoneInfoClient
    {

        private const string LiveBaseUrl = "https://sws.serviceobjects.com/GP/api.svc/";
        private const string BackupBaseUrl = "https://swsbackup.serviceobjects.com/GP/api.svc/";
        private const string TrailBaseUrl = "https://trial.serviceobjects.com/GP/api.svc/";

        /// <summary>
        /// Synchronously calls the GetPhoneInfo_V2 REST endpoint to retrieve phone information,
        /// attempting the primary endpoint first and falling back to the backup if the response is invalid
        /// (Error.Number == "4") in live mode.
        /// </summary>
        /// <param name="input">The input parameters including phone number, license key, is live and timeout.</param>
        /// <returns>Deserialized <see cref="GPResponse"/>.</returns>
        public static GPResponse Invoke(GetPhoneInfoInput input)
        {
            //Use query string parameters so missing/options fields don't break
            //the URL as path parameters would.
            string url = BuildUrl(input, input.IsLive ? LiveBaseUrl : TrailBaseUrl);
            GPResponse response = Helper.HttpGet<GPResponse>(url, input.TimeoutSeconds);

            // Fallback on error payload in live mode
            if (input.IsLive && !IsValid(response))
            {
                var fallbackUrl = BuildUrl(input, BackupBaseUrl);
                GPResponse fallbackResponse = Helper.HttpGet<GPResponse>(fallbackUrl, input.TimeoutSeconds);
                return IsValid(fallbackResponse) ? fallbackResponse : response;
            }

            return response;
        }
        /// <summary>
        /// Asynchronously calls the GetPhoneInfo_V2 REST endpoint to retrieve phone information,
        /// attempting the primary endpoint first and falling back to the backup if the response is invalid
        /// (Error.Number == "4") in live mode.
        /// </summary>
        /// <param name="input">The input parameters including phone number, license key, is live and timeout.</param>
        /// <returns>Deserialized <see cref="GPResponse"/>.</returns>
        public static async Task<GPResponse> InvokeAsync(GetPhoneInfoInput input)
        {
            //Use query string parameters so missing/options fields don't break
            //the URL as path parameters would.
            string url = BuildUrl(input, input.IsLive ? LiveBaseUrl : TrailBaseUrl);
            GPResponse response = await Helper.HttpGetAsync<GPResponse>(url, input.TimeoutSeconds).ConfigureAwait(false);
            if (input.IsLive && !IsValid(response))
            {
                var fallbackUrl = BuildUrl(input, BackupBaseUrl);
                GPResponse fallbackResponse = await Helper.HttpGetAsync<GPResponse>(fallbackUrl, input.TimeoutSeconds).ConfigureAwait(false);
                return IsValid(fallbackResponse) ? fallbackResponse : response;
            }

            return response;
        }

        // Build the full request URL, including URL-encoded query string
        public static string BuildUrl(GetPhoneInfoInput input,string baseUrl)
        {
            var qs = $"json/GetPhoneInfo_V2?PhoneNumber={HttpUtility.UrlEncode(input.PhoneNumber)}" +
                     $"&LicenseKey={HttpUtility.UrlEncode(input.LicenseKey)}";
            return baseUrl + qs;
        }

        private static bool IsValid(GPResponse response) => response?.Error == null || response.Error.Number != "4";

        /// <summary>
        /// Defines the input parameters for the GetPhoneInfo_V2 REST operation.
        /// </summary>
        /// <param name="PhoneNumber">The phone number to look up (e.g., "805-963-1700") - Required.</param>
        /// <param name="LicenseKey">Service Objects GeoPhone license key. - Required</param>
        /// <param name="IsLive">True for live (production+backup) endpoints; false for trial only. - Required.</param>
        /// <param name="TimeoutSeconds">The timeout duration in seconds for the request (default: 15).</param>
        public record GetPhoneInfoInput(
            string PhoneNumber = "",
            string LicenseKey = "",
            bool IsLive = true,
            int TimeoutSeconds = 15
        );
    }
}

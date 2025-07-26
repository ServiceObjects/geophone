using System;
using GPService;

namespace geophone_dot_net.SOAP
{
    /// <summary>
    /// Provides functionality to call the ServiceObjects GeoPhone SOAP service's GetPhoneInfo_V2 operation,
    /// retrieving phone-related information (e.g., provider and contact details) with fallback to a backup endpoint
    /// for reliability in live mode.
    /// </summary>
    public class GetPhoneInfoValidation
    {
        private const string LiveBaseUrl = "https://sws.serviceobjects.com/GP/SOAP.svc/SOAP";
        private const string BackupBaseUrl = "https://swsbackup.serviceobjects.com/GP/SOAP.svc/SOAP";
        private const string TrailBaseUrl = "https://trial.serviceobjects.com/GP/SOAP.svc/SOAP";

        private readonly string _primaryUrl;
        private readonly string _backupUrl;
        private readonly int _timeoutMs;
        private readonly bool _isLive;

        /// <summary>
        /// Initializes URLs/timeout/IsLive.
        /// </summary>
        public GetPhoneInfoValidation(bool isLive)
        {
            // Read timeout (milliseconds) and IsLive flag
            _timeoutMs = 10000;
            _isLive = isLive;

            if (_isLive)
            {
                _primaryUrl = LiveBaseUrl;
                _backupUrl = BackupBaseUrl;
            }
            else
            {
                _primaryUrl = TrailBaseUrl;
                _backupUrl = TrailBaseUrl;
            }

            if (string.IsNullOrWhiteSpace(_primaryUrl))
                throw new InvalidOperationException("Primary URL not set.");
            if (string.IsNullOrWhiteSpace(_backupUrl))
                throw new InvalidOperationException("Backup URL not set.");
        }

        /// <summary>
        /// Asynchronously calls the GetPhoneInfo_V2 SOAP endpoint to retrieve phone information,
        /// attempting the primary endpoint first and falling back to the backup if the response is invalid
        /// (Error.Number == "4") in live mode or if the primary call fails.
        /// </summary>
        /// <param name="phoneNumber">The phone number in question.</param>
        /// <param name="licenseKey">Your ServiceObjects GeoPhone license key</param>
        /// <returns>A <see cref="Task{TResult}"/> containing a <see cref="PhoneInfo_V2"/> object with provider and contact details or an error.</returns>
        /// <exception cref="Exception">
        /// Thrown if both primary and backup endpoints fail.
        /// </exception>
        public async Task<PhoneInfo_V2> InvokeAsync(string phoneNumber, string licenseKey)
        {
            SOAPClient clientPrimary = null;
            SOAPClient clientBackup = null;

            try
            {
                // Attempt Primary_PLL
                clientPrimary = new SOAPClient();
                clientPrimary.Endpoint.Address = new System.ServiceModel.EndpointAddress(_primaryUrl);
                clientPrimary.InnerChannel.OperationTimeout = TimeSpan.FromMilliseconds(_timeoutMs);

                PhoneInfo_V2 response = await clientPrimary.GetPhoneInfo_V2Async(phoneNumber, licenseKey).ConfigureAwait(false);

                if(response == null || (response.Error != null && response.Error.Number == "4"))
                {
                    throw new InvalidOperationException("Primary endpoint returned null or a fatal TypeCode=3 error for PhoneInfo_V2");
                }
                return response;
            }
            catch (Exception primaryEx)
            {
                // If primary fails, try Backup
                try
                {
                    clientBackup =new SOAPClient();
                    clientBackup.Endpoint.Address = new System.ServiceModel.EndpointAddress(_backupUrl);
                    clientBackup.InnerChannel.OperationTimeout = TimeSpan.FromMilliseconds(_timeoutMs);

                    var response = await clientBackup.GetPhoneInfo_V2Async(phoneNumber, licenseKey).ConfigureAwait(false);
                    // If the response is null, or if a “fatal” Error.TypeCode == "3" came back, force a fallback
                    if (response == null || (response.Error != null && response.Error.Number == "4"))
                    {
                        throw new InvalidOperationException("Backup endpoint returned null or a fatal TypeCode=4 error for PhoneInfo_V2");
                    }
                    return response;
                }
                catch (Exception backupEx)
                {
                    // If backup also fails, wrap both exceptions
                    throw new Exception(
                        $"Both primary and backup endpoints failed.\n" +
                        $"Primary error: {primaryEx.Message}\n" +
                        $"Backup error: {backupEx.Message}");
                }
                finally
                {
                    clientBackup?.Close();
                }
            }
            
            finally
            {
                clientPrimary?.Close();
            }
        }
    }
}
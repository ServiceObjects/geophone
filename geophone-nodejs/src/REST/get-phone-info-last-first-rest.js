import axios from 'axios';
import querystring from 'querystring';
import { GPResponse } from './gp-response.js';

/**
* @constant
* @type {string}
* @description The base URL for the live ServiceObjects GeoPhone API service.
*/
const LiveBaseUrl = 'https://sws.serviceobjects.com/GP/api.svc/';

/**
* @constant
* @type {string}
* @description The base URL for the backup ServiceObjects GeoPhone API service.
*/
const BackupBaseUrl = 'https://swsbackup.serviceobjects.com/GP/api.svc/';

/**
* @constant
* @type {string}
* @description The base URL for the trial ServiceObjects GeoPhone API service.
*/
const TrialBaseUrl = 'https://trial.serviceobjects.com/GP/api.svc/';

/**
* Checks if a response from the API is valid by verifying that it either has no Error object
* or the Error.Number is not equal to '4'.
* @param {Object} response - The API response object to validate.
* @returns {boolean} True if the response is valid, false otherwise.
*/
const isValid = (response) => !response?.Error || response.Error.Number !== '4';

/**
* Constructs a full URL for the GetPhoneInfoLastFirst API endpoint by combining the base URL
* with query parameters derived from the input parameters.
* @param {string} phoneNumber - The phone number to query.
* @param {string} licenseKey - The license key for API authentication.
* @param {string} baseUrl - The base URL for the API service (live, backup, or trial).
* @returns {string} The constructed URL with query parameters.
*/
const buildUrl = (phoneNumber, licenseKey, baseUrl) =>
    `${baseUrl}json/GetPhoneInfoLastFirst?${querystring.stringify({ PhoneNumber: phoneNumber, LicenseKey: licenseKey })}`;

/**
* Performs an HTTP GET request to the specified URL with a given timeout.
* @param {string} url - The URL to send the GET request to.
* @param {number} timeoutSeconds - The timeout duration in seconds for the request.
* @returns {Promise<GPResponse>} A promise that resolves to a GPResponse object containing the API response data.
* @throws {Error} If the HTTP request fails, with a message detailing the error.
*/
const httpGet = async (url, timeoutSeconds) => {
    try {
        const response = await axios.get(url, { timeout: timeoutSeconds * 1000 });
        return new GPResponse(response.data);
    } catch (error) {
        throw new Error(`HTTP request failed: ${error.message}`);
    }
};

/**
* Provides functionality to call the ServiceObjects GeoPhone API's GetPhoneInfoLastFirst endpoint,
* retrieving phone-related information with fallback to a backup endpoint for reliability in live mode.
*/
const GetPhoneInfoLastFirstClient = {
    /**
    * Asynchronously invokes the GetPhoneInfoLastFirst API endpoint, attempting the primary endpoint
    * first and falling back to the backup if the response is invalid (Error.Number == "4") in live mode.
    * @param {string} phoneNumber - The phone number to query.
    * @param {string} licenseKey - The license key for API authentication.
    * @param {boolean} isLive - Whether to use live or trial endpoint.
    * @param {number} [timeoutSeconds=15] - The timeout duration in seconds for the request.
    * @returns {Promise<GPResponse>} A promise that resolves to a GPResponse object with provider and contact details or an error.
    * @throws {Error} If both primary and backup endpoints fail, with details of the failure.
    */
    async invokeAsync(phoneNumber, licenseKey, isLive, timeoutSeconds = 15) {
        const url = buildUrl(phoneNumber, licenseKey, isLive ? LiveBaseUrl : TrialBaseUrl);
        let response = await httpGet(url, timeoutSeconds);
    
        if (isLive && !isValid(response)) {
            const fallbackUrl = buildUrl(phoneNumber, licenseKey, BackupBaseUrl);
            const fallbackResponse = await httpGet(fallbackUrl, timeoutSeconds);
            return isValid(fallbackResponse) ? fallbackResponse : response;
        }
        return response;
    },

    /**
    * Synchronously invokes the GetPhoneInfoLastFirst API endpoint by wrapping the async call
    * and awaiting its result immediately.
    * @param {string} phoneNumber - The phone number to query.
    * @param {string} licenseKey - The license key for API authentication.
    * @param {boolean} isLive - Whether to use live or trial endpoint.
    * @param {number} [timeoutSeconds=15] - The timeout duration in seconds for the request.
    * @returns {GPResponse} A GPResponse object with provider and contact details or an error.
    * @throws {Error} If both primary and backup endpoints fail, with details of the failure.
    */
    invoke(phoneNumber, licenseKey, isLive, timeoutSeconds = 15) {
        return (async () => await this.invokeAsync(phoneNumber, licenseKey, isLive, timeoutSeconds))();
    },
};

export { GetPhoneInfoLastFirstClient, GPResponse };
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
* <summary>
* Checks if a response from the API is valid by verifying that it either has no Error object
* or the Error.Number is not equal to '4'.
* </summary>
* <param name="response" type="Object">The API response object to validate.</param>
* <returns type="boolean">True if the response is valid, false otherwise.</returns>
*/
const isValid = (response) => !response?.Error || response.Error.Number !== '4';

/**
* <summary>
* Constructs a full URL for the GetPhoneInfo_V2 API endpoint by combining the base URL
* with query parameters derived from the input object.
* </summary>
* <param name="phoneNumber" type="string">The phone number to query.</param>
* <param name="licenseKey" type="string">The license key for the API.</param>
* <param name="baseUrl" type="string">The base URL for the API service (live, backup, or trial).</param>
* <returns type="string">The constructed URL with query parameters.</returns>
*/
const buildUrl = (phoneNumber, licenseKey, baseUrl) =>
    `${baseUrl}json/GetPhoneInfo_V2?${querystring.stringify({ PhoneNumber: phoneNumber, LicenseKey: licenseKey })}`;

/**
* <summary>
* Performs an HTTP GET request to the specified URL with a given timeout.
* </summary>
* <param name="url" type="string">The URL to send the GET request to.</param>
* <param name="timeoutSeconds" type="number">The timeout duration in seconds for the request.</param>
* <returns type="Promise<GPResponse>">A promise that resolves to a GPResponse object containing the API response data.</returns>
* <exception cref="Error">Thrown if the HTTP request fails, with a message detailing the error.</exception>
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
* <summary>
* Provides functionality to call the ServiceObjects GeoPhone API's GetPhoneInfo_V2 endpoint,
* retrieving phone-related information with fallback to a backup endpoint for reliability in live mode.
* </summary>
*/
const GetPhoneInfoClient = {
    /**
    * <summary>
    * Asynchronously invokes the GetPhoneInfo_V2 API endpoint, attempting the primary endpoint
    * first and falling back to the backup if the response is invalid (Error.Number == "4") in live mode.
    * </summary>
    * <param name="phoneNumber" type="string">The phone number to query.</param>
    * <param name="licenseKey" type="string">The license key for the API.</param>
    * <param name="isLive" type="boolean">Whether to use live or trial endpoints.</param>
    * <param name="timeoutSeconds" type="number">The timeout duration in seconds for the request.</param>
    * <returns type="Promise<GPResponse>">A promise that resolves to a GPResponse object with provider and contact details or an error.</returns>
    * <exception cref="Error">Thrown if both primary and backup endpoints fail, with details of the failure.</exception>
    */
    async invokeAsync(phoneNumber, licenseKey, isLive, timeoutSeconds) {
        const url = buildUrl(phoneNumber, licenseKey, isLive ? LiveBaseUrl : TrialBaseUrl);
        let response = await httpGet(url, timeoutSeconds || 15);
        if (isLive && !isValid(response)) {
            const fallbackUrl = buildUrl(phoneNumber, licenseKey, BackupBaseUrl);
            const fallbackResponse = await httpGet(fallbackUrl, timeoutSeconds || 15);
            return fallbackResponse;
        }
        return response;
    },

    /**
    * <summary>
    * Synchronously invokes the GetPhoneInfo_V2 API endpoint by wrapping the async call
    * and awaiting its result immediately.
    * </summary>
    * <param name="phoneNumber" type="string">The phone number to query.</param>
    * <param name="licenseKey" type="string">The license key for the API.</param>
    * <param name="isLive" type="boolean">Whether to use live or trial endpoints.</param>
    * <param name="timeoutSeconds" type="number">The timeout duration in seconds for the request.</param>
    * <returns type="GPResponse">A GPResponse object with provider and contact details or an error.</returns>
    * <exception cref="Error">Thrown if both primary and backup endpoints fail, with details of the failure.</exception>
    */
    invoke(phoneNumber, licenseKey, isLive, timeoutSeconds) {
        return (async () => await this.invokeAsync(phoneNumber, licenseKey, isLive, timeoutSeconds))();
    },
};

export { GetPhoneInfoClient, GPResponse };
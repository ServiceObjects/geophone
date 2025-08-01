import { soap } from "strong-soap";
import { GPResponse } from "./gp-response.js";

/**
 * <summary>
 * A class that provides functionality to call the ServiceObjects GeoPhone SOAP service's GetPhoneInfoLastFirst endpoint,
 * retrieving phone-related information with fallback to a backup endpoint for reliability in live mode.
 * </summary>
 */
class GetPhoneInfoLastFirstSoap {
    /**
     * <summary>
     * Initializes a new instance of the GetPhoneInfoLastFirstSoap class with the provided input parameters,
     * setting up primary and backup WSDL URLs based on the live/trial mode.
     * </summary>
     * <param name="input" type="Object">The input object containing phoneNumber, licenseKey, isLive, and timeoutSeconds.</param>
     * <exception cref="Error">Thrown if phoneNumber, licenseKey, primaryWsdl, or backupWsdl is empty or null.</exception>
     */
    constructor(phoneNumber, licenseKey, isLive, timeoutSeconds) {
        if (!phoneNumber)
            throw new Error("PhoneNumber cannot be empty or null.");
        if (!licenseKey)
            throw new Error("LicenseKey cannot be empty or null.");

        this.phoneNumber = phoneNumber;
        this.licenseKey = licenseKey;
        this.isLive = isLive;
        this.timeoutSeconds = timeoutSeconds;
        this.LiveBaseUrl = "https://sws.serviceobjects.com/gp/soap.svc?wsdl";
        this.BackupBaseUrl = "https://swsbackup.serviceobjects.com/gp/soap.svc?wsdl";
        this.TrailBaseUrl = "https://trial.serviceobjects.com/gp/soap.svc?wsdl";
        this._primaryWsdl = this.isLive ? this.LiveBaseUrl : this.TrailBaseUrl;
        this._backupWsdl = this.isLive ? this.BackupBaseUrl : this.TrailBaseUrl;
        if (!this._primaryWsdl) throw new Error("Primary WSDL URL is not set.");
        if (!this._backupWsdl) throw new Error("Backup WSDL URL is not set.");
    }

    /**
     * <summary>
     * Asynchronously calls the GetPhoneInfoLastFirst SOAP endpoint, attempting the primary endpoint
     * first and falling back to the backup if the response is invalid (Error.Number == "4") in live mode
     * or if the primary call fails.
     * </summary>
     * <returns type="Promise<GPResponse>">A promise that resolves to a GPResponse object with provider and contact details or an error.</returns>
     * <exception cref="Error">Thrown if both primary and backup calls fail, with details of both errors.</exception>
     */
    async getPhoneInfoLastFirst() {
        const args = {
            PhoneNumber: this.phoneNumber,
            LicenseKey: this.licenseKey,
        };

        try {
            const primaryResult = await this._callSoapService(this._primaryWsdl, args);

            if (this._isLive && !this._isValid(primaryResult)) {
                console.warn(
                    "Primary returned Error.Number == '4', attempting backup..."
                );
                const backupResult = await this._callSoapService(this._backupWsdl, args);
                return backupResult;
            }

            return primaryResult;
        } catch (primaryErr) {
            try {
                const backupResult = await this._callSoapService(this._backupWsdl, args);
                return backupResult;
            } catch (backupErr) {
                throw new Error(
                    `Both primary and backup calls failed:\nPrimary: ${primaryErr.message}\nBackup: ${backupErr.message}`
                );
            }
        }
    }

    /**
     * <summary>
     * Performs a SOAP service call to the specified WSDL URL with the given arguments,
     * creating a client and processing the response into a GPResponse object.
     * </summary>
     * <param name="wsdlUrl" type="string">The WSDL URL of the SOAP service endpoint (primary or backup).</param>
     * <param name="args" type="Object">The arguments to pass to the GetPhoneInfoLastFirst method (e.g., PhoneNumber, LicenseKey).</param>
     * <returns type="Promise<GPResponse>">A promise that resolves to a GPResponse object containing the SOAP response data.</returns>
     * <exception cref="Error">Thrown if the SOAP client creation fails, the service call fails, or the response cannot be parsed.</exception>
     */
    _callSoapService(wsdlUrl, args) {
        return new Promise((resolve, reject) => {
            soap.createClient(
                wsdlUrl,
                { timeout: this.timeoutSeconds * 1000 },
                (err, client) => {
                    if (err) return reject(err);

                    client.GetPhoneInfoLastFirst(args, (err, result) => {
                        if (err) return reject(err);
                        const rawData = result.GetPhoneInfoLastFirstResult;
                        try {
                            if (!rawData) {
                                return reject(
                                    new Error("SOAP response is empty or undefined.")
                                );
                            }
                            const parsed = new GPResponse(rawData);
                            resolve(parsed);
                        } catch (parseErr) {
                            reject(
                                new Error(`Failed to parse SOAP response: ${parseErr.message}`)
                            );
                        }
                    });
                }
            );
        });
    }

    /**
     * <summary>
     * Checks if a SOAP response is valid by verifying that it exists and either has no Error object
     * or the Error.Number is not equal to '4'.
     * </summary>
     * <param name="response" type="GPResponse">The GPResponse object to validate.</param>
     * <returns type="boolean">True if the response is valid, false otherwise.</returns>
     */
    _isValid(response) {
        return response && (!response.Error || response.Error.Number !== "4");
    }
}

export { GetPhoneInfoLastFirstSoap };
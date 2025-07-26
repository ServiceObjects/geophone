using System.Runtime.Serialization;

namespace geophone_dot_net.REST
{
    /// <summary>
    /// Response object for the GeoPhone REST API, containing provider and contact information,
    /// </summary>
    [DataContract]
    public class GPResponse 
    {
        public Provider[] Providers { get; set; }
        public Contact[] Contacts { get; set; }
        public Error Error { get; set; }
        public override string ToString()
        {
            string providers = Providers != null ? string.Join(", ", Providers.Select(p => p.ToString())) : "null";
            string contacts = Contacts != null ? string.Join(", ", Contacts.Select(c => c.ToString())) : "null";
            string error = Error != null ? Error.ToString() : "null";

            return $"GP GPResponse: Providers = {providers}, Contacts = {contacts}, Error = {error}";
        }
    }
    /// <summary>
    /// Represents a provider's information in the GeoPhone REST API response.
    /// </summary>  
    public class Provider
    {
        public string Name { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string LineType { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string Quality { get; set; }
        public override string ToString()
        {
            return $"ProviderOutput: Name = {Name}, City = {City}, State = {State}, LineType = {LineType}, Latitude = {Latitude}, Longitude = {Longitude}, Quality = {Quality}";
        }
    }

    /// <summary>
    /// Represents a contact's information in the GeoPhone REST API response.
    /// </summary>
    public class Contact
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Type { get; set; }
        public override string ToString()
        {
            return $"ContactOutput: Name = {Name}, Address = {Address}, City = {City}, State = {State}, Zip = {Zip}, Type = {Type}";
        }
    }

    public class Error
    {
        public string Desc { get; set; }
        public string Number { get; set; }
        public string Location { get; set; }
        public override string ToString()
        {
            return $"Desc: {Desc} " +
                $"Number: {Number} " +
                $"Location: {Location} ";
        }
    }

    public class LF_Provider
    {
        public string Name { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string LineType { get; set; }

        public override string ToString()
        {
            return $"Name: {Name}, City: {City}, State: {State}, LineType: {LineType}";
        }
    }

    public class LF_Contact
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Type { get; set; }

        public override string ToString()
        {
            return $"Name: {Name}, Address: {Address}, City: {City}, State: {State}, Zip: {Zip}, Type: {Type}";
        }
    }

    public class LF_ResponseObject 
    {
        public Provider[] Providers { get; set; }
        public Contact[] Contacts { get; set; }
        public Error Error { get; set; }

        public override string ToString()
        {
            string providers = Providers?.Any() == true
                ? string.Join(", ", Providers.Select(p => p.ToString()))
                : "None";

            string contacts = Contacts?.Any() == true
                ? string.Join(", ", Contacts.Select(c => c.ToString()))
                : "None";

            return $"GP LF_Response: Providers: [{providers}], Contacts: [{contacts}], Error: {Error}";
        }
    }

}

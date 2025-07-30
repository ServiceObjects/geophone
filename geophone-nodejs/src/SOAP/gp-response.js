export class GPResponse {
  constructor(data) {
    const providersArray = data.Providers?.Provider || [];
    const contactsArray = data.Contacts?.Contact || [];

    this.Providers = Array.isArray(providersArray)
      ? providersArray.map(p => new Provider(p))
      : [new Provider(providersArray)];

    this.Contacts = Array.isArray(contactsArray)
      ? contactsArray.map(c => new Contact(c))
      : [new Contact(contactsArray)];

    this.Error = data.Error ? new Error(data.Error) : null;
  }

  toString() {
    const providers = this.Providers.length ? this.Providers.map(p => p.toString()).join(', ') : 'null';
    const contacts = this.Contacts.length ? this.Contacts.map(c => c.toString()).join(', ') : 'null';
    const error = this.Error ? this.Error.toString() : 'null';
    return `GPResponse: Providers = ${providers}, Contacts = ${contacts}, Error = ${error}`;
  }
}
export class Provider {
  constructor(data) {
    this.Name = data.Name || '';
    this.City = data.City || '';
    this.State = data.State || '';
    this.LineType = data.LineType || '';
    this.Latitude = data.Latitude || '';
    this.Longitude = data.Longitude || '';
    this.Quality = data.Quality || '';
  }

  toString() {
    return `ProviderOutput: Name = ${this.Name}, City = ${this.City}, State = ${this.State}, LineType = ${this.LineType}, Latitude = ${this.Latitude}, Longitude = ${this.Longitude}, Quality = ${this.Quality}`;
  }
}
export class Contact {
  constructor(data) {
    this.Name = data.Name || '';
    this.Address = data.Address || '';
    this.City = data.City || '';
    this.State = data.State || '';
    this.Zip = data.Zip || '';
    this.Type = data.Type || '';
  }

  toString() {
    return `ContactOutput: Name = ${this.Name}, Address = ${this.Address}, City = ${this.City}, State = ${this.State}, Zip = ${this.Zip}, Type = ${this.Type}`;
  }
}
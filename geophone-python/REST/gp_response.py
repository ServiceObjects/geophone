
from dataclasses import dataclass
from typing import Optional, List

@dataclass
class Provider:
    """Represents provider information returned by the GP API."""
    Name: Optional[str] = None
    City: Optional[str] = None
    State: Optional[str] = None
    LineType: Optional[str] = None
    Latitude: Optional[str] = None
    Longitude: Optional[str] = None
    Quality: Optional[str] = None

    def __str__(self) -> str:
        return (f"ProviderOutput: Name = {self.Name}, City = {self.City}, State = {self.State}, "
                f"LineType = {self.LineType}, Latitude = {self.Latitude}, Longitude = {self.Longitude}, "
                f"Quality = {self.Quality}")

@dataclass
class Contact:
    """Represents contact information returned by the GP API."""
    Name: Optional[str] = None
    Address: Optional[str] = None
    City: Optional[str] = None
    State: Optional[str] = None
    Zip: Optional[str] = None
    Type: Optional[str] = None

    def __str__(self) -> str:
        return (f"ContactOutput: Name = {self.Name}, Address = {self.Address}, City = {self.City}, "
                f"State = {self.State}, Zip = {self.Zip}, Type = {self.Type}")

@dataclass
class Error:
    """Represents error information returned by the GP API."""
    Desc: Optional[str] = None
    Number: Optional[str] = None
    Location: Optional[str] = None

    def __str__(self) -> str:
        return f"Desc: {self.Desc} Number: {self.Number} Location: {self.Location}"

@dataclass
class GPResponse:
    """Represents the full response from the GP API."""
    providers: Optional[List[Provider]] = None
    contacts: Optional[List[Contact]] = None
    error: Optional[Error] = None

    def __str__(self) -> str:
        providers_str = ", ".join(str(p) for p in self.providers) if self.providers else "null"
        contacts_str = ", ".join(str(c) for c in self.contacts) if self.contacts else "null"
        error_str = str(self.error) if self.error else "null"
        return f"GP GPResponse: Providers = {providers_str}, Contacts = {contacts_str}, Error = {error_str}"
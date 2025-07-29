from dataclasses import dataclass
from typing import List, Optional

@dataclass
class Error:
    Number: str
    Message: str

@dataclass
class Provider:
    Name: str
    City: str
    State: str
    LineType: str
    Latitude: str
    Longitude: str
    Quality: str

@dataclass
class Contact:
    Name: str
    Address: str
    City: str
    State: str
    Zip: str
    Type: str

@dataclass
class GPResponse:
    providers: List[Provider]
    contacts: List[Contact]
    error: Optional[Error]
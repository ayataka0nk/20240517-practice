from uuid import UUID
from pydantic import BaseModel


class ClientSummary(BaseModel):
    client_id: UUID
    name: str


class ClientDetail(BaseModel):
    client_id: UUID
    name: str


class ClientBody(BaseModel):
    name: str


class ClientValidationError(BaseModel):
    name: list[str]


class ClientId(BaseModel):
    client_id: UUID

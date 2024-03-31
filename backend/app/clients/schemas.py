from uuid import UUID
from pydantic import BaseModel, Field


class ClientSummary(BaseModel):
    client_id: UUID
    name: str


class ClientDetail(BaseModel):
    client_id: UUID
    name: str


class ClientBody(BaseModel):
    name: str = Field(..., min_length=1)


class ClientValidationError(BaseModel):
    name: list[str]


class ClientId(BaseModel):
    client_id: UUID


class ClientSearchParams(BaseModel):
    keyword: str = None

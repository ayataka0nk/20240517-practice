from pydantic import BaseModel
from uuid import UUID


class Profile(BaseModel):
    user_id: UUID
    email: str
    name: str

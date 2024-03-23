from pydantic import BaseModel


class Profile(BaseModel):
    user_id: int
    email: str
    name: str

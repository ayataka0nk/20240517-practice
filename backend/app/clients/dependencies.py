from http.client import HTTPException
from typing import Annotated
from fastapi import Depends
from app.database import Session, get_db
from .models import Client
from ..auths import User, get_user


def get_client(
    client_id: str,
    db: Annotated[Session, Depends(get_db)],
    user: Annotated[User, Depends(get_user)],
):
    client = (
        db.query(Client)
        .filter(Client.client_id == client_id)
        .filter(Client.user_id == user.user_id)
        .first()
    )
    if client is None:
        raise HTTPException(status_code=404, detail="Client not found")
    return client

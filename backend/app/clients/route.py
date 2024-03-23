from fastapi import APIRouter, Depends
from typing import Annotated
from app.auths import User, get_user
from app.database import get_db, Session
from .dependencies import get_client
from .schemas import (
    ClientSummary,
    ClientId,
    ClientDetail,
    ClientBody,
    ClientValidationError,
)
from .models import Client

router = APIRouter(prefix="/clients", tags=["clients"])


@router.get("", response_model=list[ClientSummary])
def get_clients(
    user: Annotated[User, Depends(get_user)], db: Annotated[Session, Depends(get_db)]
):
    clients = db.query(Client).filter(Client.user_id == user.user_id).all()
    return clients


@router.post(
    "",
    response_model=ClientId,
    status_code=201,
    responses={
        422: {
            "model": ClientValidationError,
            "description": "Validation Error",
        }
    },
)
def store_clients(
    body: ClientBody,
    user: Annotated[User, Depends(get_user)],
    db: Annotated[Session, Depends(get_db)],
):
    new_client = Client(**body.model_dump(), user_id=user.user_id)
    db.add(new_client)
    db.commit()
    return new_client


@router.get("/{client_id}", response_model=ClientDetail)
def get_client(client: Annotated[Client, Depends(get_client)]):
    return client


@router.put(
    "/{client_id}",
    status_code=204,
    responses={
        422: {"model": ClientValidationError, "description": "Validation Error"}
    },
)
def update_clients(
    client: Annotated[Client, Depends(get_client)],
    body: ClientBody,
    db: Annotated[Session, Depends(get_db)],
):
    client.name = body.name
    db.commit()
    return


@router.delete("/{client_id}", status_code=204)
def delete_clients(
    client: Annotated[Client, Depends(get_client)],
    db: Annotated[Session, Depends(get_db)],
):
    db.delete(client)
    db.commit()
    return

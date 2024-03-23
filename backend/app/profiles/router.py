from fastapi import APIRouter, Depends
from typing import Annotated
from ..auths import User, get_user
from .schemas import Profile

router = APIRouter(prefix="/profile", tags=["profile"])


@router.get("", response_model=Profile)
def get_profile(user: Annotated[User, Depends(get_user)]):
    return Profile(
        user_id=user.user_id,
        email=user.email,
        name=user.name,
    )

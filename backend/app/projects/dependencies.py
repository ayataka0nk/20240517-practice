from http.client import HTTPException
from typing import Annotated
from fastapi import Depends
from sqlalchemy import select
from app.database import Session, get_db
from ..auths import User, get_user
from .models import Project, WorkEntry


def get_project(
    project_id: str,
    db: Annotated[Session, Depends(get_db)],
    user: Annotated[User, Depends(get_user)],
):
    stmt = (
        select(Project)
        .where(Project.owner_id == user.user_id)
        .where(Project.project_id == project_id)
    )
    project = db.execute(stmt).scalar()
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


def get_work_entry(
    work_entry_id: str,
    db: Annotated[Session, Depends(get_db)],
    user: Annotated[User, Depends(get_user)],
):
    stmt = (
        select(WorkEntry)
        .where(WorkEntry.user_id == user.user_id)
        .where(WorkEntry.work_entry_id == work_entry_id)
    )
    work_entry = db.execute(stmt).scalar()
    if work_entry is None:
        raise HTTPException(status_code=404, detail="Work Entry not found")
    return work_entry

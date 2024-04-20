from sqlalchemy import select
from fastapi import APIRouter, Depends
from typing import Annotated, Optional
from app.auths import User, get_user
from app.database import get_db, Session
from .models import Project, WorkEntry
from .schemas import (
    ProjectBody,
    ProjectDetail,
    ProjectId,
    ProjectSummary,
    ProjectValidationError,
)
from . import schemas
from .dependencies import get_project, get_work_entry

router = APIRouter(prefix="/projects", tags=["projects"])


@router.get("", response_model=list[ProjectSummary])
def get_projects(
    user: Annotated[User, Depends(get_user)],
    db: Annotated[Session, Depends(get_db)],
    keyword: Optional[str] = None,
):
    stmt = select(Project).where(Project.owner_id == user.user_id)

    if keyword:
        stmt = stmt.where(Project.name.contains(keyword))
    projects = db.scalars(stmt).all()
    return projects


@router.post(
    "",
    response_model=ProjectId,
    status_code=201,
    responses={
        422: {"model": ProjectValidationError, "description": "Validation Error"}
    },
)
def store_projects(
    body: ProjectBody,
    user: Annotated[User, Depends(get_user)],
    db: Annotated[Session, Depends(get_db)],
):
    new_project = Project(**body.model_dump(), owner_id=user.user_id)
    db.add(new_project)
    db.commit()
    return {"project_id": new_project.project_id}


@router.get("/{project_id}", response_model=ProjectDetail)
def get_project_l(
    user: Annotated[User, Depends(get_user)],
    project: Annotated[Project, Depends(get_project)],
):
    return project


@router.patch(
    "/{project_id}",
    status_code=204,
    responses={
        422: {"model": ProjectValidationError, "description": "Validation Error"}
    },
)
def update_project(
    project: Annotated[Project, Depends(get_project)],
    body: ProjectBody,
    db: Annotated[Session, Depends(get_db)],
):
    project.name = body.name
    project.description = body.description
    db.commit()
    return


@router.delete("/{project_id}", status_code=204)
def delete_project(
    project: Annotated[Project, Depends(get_project)],
    db: Annotated[Session, Depends(get_db)],
):
    db.delete(project)
    db.commit()
    return


@router.get("/{project_id}/work-entries", response_model=list[schemas.WorkEntrySummary])
def get_work_entries(
    user: Annotated[User, Depends(get_user)],
    project_id: str,
    db: Annotated[Session, Depends(get_db)],
):
    stmt = (
        select(WorkEntry)
        .where(WorkEntry.project_id == project_id)
        .where(WorkEntry.user_id == user.user_id)
    )
    userWorkEntries = db.scalars(stmt).all()
    return userWorkEntries


@router.get(
    "/{project_id}/work-entries/{work_entry_id}",
    response_model=schemas.WorkEntryDetail,
)
def get_work_entry(
    work_entry: Annotated[WorkEntry, Depends(get_work_entry)],
):
    return work_entry


@router.post(
    "/{project_id}/work-entries",
    response_model=schemas.WorkEntryId,
    status_code=201,
    responses={
        422: {
            "model": schemas.WorkEntryValidationError,
            "description": "Validation Error",
        }
    },
)
def store_work_entries(
    project_id: str,
    body: schemas.WorkEntryBody,
    user: Annotated[User, Depends(get_user)],
    db: Annotated[Session, Depends(get_db)],
):
    new_work_entry = WorkEntry(
        **body.model_dump(), project_id=project_id, user_id=user.user_id
    )
    db.add(new_work_entry)
    db.commit()
    return {"work_entry_id": new_work_entry.work_entry_id}


@router.patch(
    "/{project_id}/work-entries/{work_entry_id}",
    status_code=204,
    responses={
        422: {
            "model": schemas.WorkEntryValidationError,
            "description": "Validation Error",
        }
    },
)
def update_work_entry(
    work_entry: Annotated[WorkEntry, Depends(get_work_entry)],
    body: schemas.WorkEntryBody,
    db: Annotated[Session, Depends(get_db)],
):
    work_entry.start_time = body.start_time
    work_entry.end_time = body.end_time
    work_entry.description = body.description
    db.commit()
    return


@router.delete(
    "/{project_id}/work-entries/{work_entry_id}",
    status_code=204,
)
def delete_work_entry(
    work_entry: Annotated[WorkEntry, Depends(get_work_entry)],
    db: Annotated[Session, Depends(get_db)],
):
    db.delete(work_entry)
    db.commit()
    return

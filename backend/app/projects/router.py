from sqlalchemy import select
from sqlalchemy.orm import joinedload
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

router = APIRouter()


@router.get("/projects", response_model=list[ProjectSummary], tags=["projects"])
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
    "/projects",
    response_model=ProjectId,
    status_code=201,
    responses={
        422: {"model": ProjectValidationError, "description": "Validation Error"}
    },
    tags=["projects"],
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


@router.get("/projects/{project_id}", response_model=ProjectDetail, tags=["projects"])
def get_project(
    user: Annotated[User, Depends(get_user)],
    project: Annotated[Project, Depends(get_project)],
):
    return project


@router.patch(
    "/projects/{project_id}",
    status_code=204,
    responses={
        422: {"model": ProjectValidationError, "description": "Validation Error"}
    },
    tags=["projects"],
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


@router.delete("/projects/{project_id}", status_code=204, tags=["projects"])
def delete_project(
    project: Annotated[Project, Depends(get_project)],
    db: Annotated[Session, Depends(get_db)],
):
    db.delete(project)
    db.commit()
    return


#################
## WorkEntry
#################


@router.get(
    "/work-entries",
    response_model=list[schemas.WorkEntrySummary],
    tags=["work-entries"],
)
def get_work_entries(
    user: Annotated[User, Depends(get_user)],
    db: Annotated[Session, Depends(get_db)],
):
    stmt = (
        select(WorkEntry)
        .where(WorkEntry.user_id == user.user_id)
        .options(joinedload(WorkEntry.project))
    )
    userWorkEntries = db.scalars(stmt).all()
    return userWorkEntries


@router.get(
    "/work-entries/{work_entry_id}",
    response_model=schemas.WorkEntryDetail,
    tags=["work-entries"],
)
def get_work_entry(
    work_entry: Annotated[WorkEntry, Depends(get_work_entry)],
):
    return work_entry


@router.post(
    "/work-entries",
    response_model=schemas.WorkEntryId,
    status_code=201,
    responses={
        422: {
            "model": schemas.WorkEntryValidationError,
            "description": "Validation Error",
        }
    },
    tags=["work-entries"],
)
def store_work_entries(
    body: schemas.WorkEntryBody,
    user: Annotated[User, Depends(get_user)],
    db: Annotated[Session, Depends(get_db)],
):
    new_work_entry = WorkEntry(**body.model_dump(), user_id=user.user_id)
    db.add(new_work_entry)
    db.commit()
    return {"work_entry_id": new_work_entry.work_entry_id}


@router.patch(
    "/work-entries/{work_entry_id}",
    status_code=204,
    responses={
        422: {
            "model": schemas.WorkEntryValidationError,
            "description": "Validation Error",
        }
    },
    tags=["work-entries"],
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
    "/work-entries/{work_entry_id}",
    status_code=204,
    tags=["work-entries"],
)
def delete_work_entry(
    work_entry: Annotated[WorkEntry, Depends(get_work_entry)],
    db: Annotated[Session, Depends(get_db)],
):
    db.delete(work_entry)
    db.commit()
    return

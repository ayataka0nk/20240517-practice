from uuid import UUID
from pydantic import BaseModel, Field
from datetime import datetime


###########
# Project
###########
class ProjectSummary(BaseModel):
    project_id: UUID
    name: str
    owner_id: UUID


class ProjectDetail(BaseModel):
    project_id: UUID
    name: str
    description: str
    owner_id: UUID


class ProjectBody(BaseModel):
    name: str = Field(..., min_length=1)
    description: str = Field(..., min_length=1)


class ProjectValidationError(BaseModel):
    name: list[str]
    description: list[str]


class ProjectId(BaseModel):
    project_id: UUID


class ProjectSearchParams(BaseModel):
    keyword: str = None


###########
# WorkEntry
###########


class WorkEntrySummary(BaseModel):
    work_entry_id: UUID
    project_id: UUID
    user_id: UUID
    start_time: datetime
    end_time: datetime
    description: str


class WorkEntryDetail(BaseModel):
    work_entry_id: UUID
    project_id: UUID
    user_id: UUID
    start_time: datetime
    end_time: datetime
    description: str


class WorkEntryBody(BaseModel):
    project_id: UUID
    start_time: datetime
    end_time: datetime
    description: str


class WorkEntryValidationError(BaseModel):
    project_id: list[str]
    start_time: list[str]
    end_time: list[str]
    description: list[str]


class WorkEntryId(BaseModel):
    work_entry_id: UUID


###########
# Tag
###########
class TagSummary(BaseModel):
    tag_id: UUID
    name: str


class TagDetail(BaseModel):
    tag_id: UUID
    name: str


class TagBody(BaseModel):
    name: str


class TagValidationError(BaseModel):
    name: list[str]


class TagId(BaseModel):
    tag_id: UUID

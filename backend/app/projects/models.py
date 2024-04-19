from sqlalchemy import Column, Integer, String, Table, Text, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship, Mapped, mapped_column
from ..database import Base
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime

work_entry_tags_table = Table(
    "work_entry_tags",
    Base.metadata,
    Column(
        "work_entry_id", UUID(as_uuid=True), ForeignKey("work_entries.work_entry_id")
    ),
    Column("tag_id", UUID(as_uuid=True), ForeignKey("tags.tag_id")),
)


class Project(Base):
    __tablename__ = "projects"

    project_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(length=255), nullable=False)
    description = Column(Text(), nullable=False)
    owner_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False)
    created_at = Column(
        DateTime, nullable=False, server_default=func.current_timestamp()
    )
    updated_at = Column(
        DateTime,
        nullable=True,
        server_default=func.current_timestamp(),
        onupdate=func.current_timestamp(),
    )

    owner = relationship("User", back_populates="projects")
    work_entries = relationship("WorkEntry", back_populates="project")
    tags = relationship("Tag", back_populates="project")


class WorkEntry(Base):
    __tablename__ = "work_entries"

    work_entry_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(
        UUID(as_uuid=True), ForeignKey("projects.project_id"), nullable=False
    )
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False)
    start_time: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    end_time: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    description = Column(Text(), nullable=True)
    created_at = Column(
        DateTime, nullable=False, server_default=func.current_timestamp()
    )
    updated_at = Column(
        DateTime,
        nullable=True,
        server_default=func.current_timestamp(),
        onupdate=func.current_timestamp(),
    )
    tags: Mapped[list["Tag"]] = relationship(
        "Tag", secondary=work_entry_tags_table, back_populates="work_entries"
    )

    project = relationship("Project", back_populates="work_entries")
    user = relationship("User", back_populates="work_entries")


class Tag(Base):
    __tablename__ = "tags"

    tag_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(
        UUID(as_uuid=True), ForeignKey("projects.project_id"), nullable=False
    )
    name = Column(Text(), nullable=False)

    work_entries: Mapped[list[WorkEntry]] = relationship(
        secondary=work_entry_tags_table, back_populates="tags"
    )

    project = relationship("Project", back_populates="tags")

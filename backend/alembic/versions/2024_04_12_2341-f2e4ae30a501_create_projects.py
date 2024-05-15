"""create projects

Revision ID: f2e4ae30a501
Revises: ab8f751e5f39
Create Date: 2024-04-12 23:41:50.489530

"""

from typing import Sequence, Union
from sqlalchemy.dialects.postgresql import UUID

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "f2e4ae30a501"
down_revision: Union[str, None] = "ab8f751e5f39"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "projects",
        sa.Column("project_id", UUID(as_uuid=True), primary_key=True),
        sa.Column("name", sa.String, nullable=False),
        sa.Column("description", sa.Text, nullable=True),
        sa.Column(
            "owner_id",
            UUID(as_uuid=True),
            sa.ForeignKey("users.user_id"),
            nullable=False,
        ),
        sa.Column(
            "created_at", sa.DateTime, server_default=sa.func.now(), nullable=False
        ),
        sa.Column(
            "updated_at",
            sa.DateTime,
            server_default=sa.func.now(),
            onupdate=sa.func.now(),
            nullable=False,
        ),
    )

    op.create_table(
        "work_entries",
        sa.Column("work_entry_id", UUID(as_uuid=True), primary_key=True),
        sa.Column(
            "project_id",
            UUID(as_uuid=True),
            sa.ForeignKey("projects.project_id"),
            nullable=False,
        ),
        sa.Column(
            "user_id",
            UUID(as_uuid=True),
            sa.ForeignKey("users.user_id"),
            nullable=False,
        ),
        sa.Column("start_time", sa.DateTime, nullable=False),
        sa.Column("end_time", sa.DateTime, nullable=True),
        sa.Column("description", sa.Text, nullable=True),
        sa.Column(
            "created_at", sa.DateTime, server_default=sa.func.now(), nullable=False
        ),
        sa.Column(
            "updated_at",
            sa.DateTime,
            server_default=sa.func.now(),
            onupdate=sa.func.now(),
            nullable=False,
        ),
    )

    op.create_table(
        "tags",
        sa.Column("tag_id", UUID(as_uuid=True), primary_key=True),
        sa.Column(
            "project_id",
            UUID(as_uuid=True),
            sa.ForeignKey("projects.project_id"),
            nullable=False,
        ),
        sa.Column("name", sa.Text, nullable=False),
    )

    op.create_table(
        "work_entry_tags",
        sa.Column(
            "work_entry_id",
            UUID(as_uuid=True),
            sa.ForeignKey("work_entries.work_entry_id"),
            nullable=False,
        ),
        sa.Column(
            "tag_id", UUID(as_uuid=True), sa.ForeignKey("tags.tag_id"), nullable=False
        ),
    )


def downgrade() -> None:
    op.drop_table("work_entry_tags")
    op.drop_table("tags")
    op.drop_table("work_entries")
    op.drop_table("projects")

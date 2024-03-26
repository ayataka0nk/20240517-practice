"""create clients

Revision ID: ab8f751e5f39
Revises: 554fa61f3117
Create Date: 2024-03-23 16:24:20.604710

"""

from typing import Sequence, Union

from alembic import op
from sqlalchemy import (
    Column,
    String,
    Integer,
    UniqueConstraint,
    ForeignKey,
    DateTime,
    func,
    ForeignKeyConstraint,
)
from sqlalchemy.dialects.postgresql import UUID
import uuid

# revision identifiers, used by Alembic.
revision: str = "ab8f751e5f39"
down_revision: Union[str, None] = "554fa61f3117"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "clients",
        Column("client_id", UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        Column("name", String(length=255), nullable=False),
        Column(
            "created_at",
            DateTime(),
            nullable=False,
            server_default=func.current_timestamp(),
        ),
        Column(
            "updated_at",
            DateTime(),
            nullable=True,
            server_default=func.current_timestamp(),
            onupdate=func.current_timestamp(),
        ),
        Column(
            "user_id", UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False
        ),
    )


def downgrade() -> None:
    op.drop_table("clients")

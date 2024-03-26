"""create_first_tables

Revision ID: 554fa61f3117
Revises: 
Create Date: 2024-03-23 00:33:00.849578

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
)
from sqlalchemy.dialects.postgresql import UUID
from uuid import uuid4


# revision identifiers, used by Alembic.
revision: str = "554fa61f3117"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "users",
        Column("user_id", UUID(as_uuid=True), primary_key=True, default=uuid4),
        Column("email", String(length=255), nullable=False),
        Column("name", String(length=255), nullable=False),
        Column("password", String(length=255), nullable=False),
        UniqueConstraint("email"),
    )
    op.create_table(
        "refresh_tokens",
        Column("refresh_token_id", Integer, primary_key=True),
        Column("token", String(256), nullable=False, unique=True),
        Column(
            "user_id", UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False
        ),
        Column(
            "created_at",
            DateTime,
            nullable=False,
            server_default=func.current_timestamp(),
        ),
        Column("expires_at", DateTime, nullable=False),
    )


def downgrade() -> None:
    op.drop_table("refresh_tokens")
    op.drop_table("users")

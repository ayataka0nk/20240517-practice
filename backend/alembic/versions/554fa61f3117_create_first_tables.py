"""create_first_tables

Revision ID: 554fa61f3117
Revises: 
Create Date: 2024-03-23 00:33:00.849578

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "554fa61f3117"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("user_id", sa.Integer, primary_key=True),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("password", sa.String(length=255), nullable=False),
        sa.UniqueConstraint("email"),
    )
    op.create_table(
        "refresh_tokens",
        sa.Column("refresh_token_id", sa.Integer, primary_key=True),
        sa.Column("token", sa.String(256), nullable=False, unique=True),
        sa.Column(
            "user_id", sa.Integer, sa.ForeignKey("users.user_id"), nullable=False
        ),
        sa.Column(
            "created_at",
            sa.DateTime,
            nullable=False,
            server_default=sa.func.current_timestamp(),
        ),
        sa.Column("expires_at", sa.DateTime, nullable=False),
    )


def downgrade() -> None:
    pass

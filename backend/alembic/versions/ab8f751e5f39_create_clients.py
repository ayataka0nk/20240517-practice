"""create clients

Revision ID: ab8f751e5f39
Revises: 554fa61f3117
Create Date: 2024-03-23 16:24:20.604710

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ab8f751e5f39'
down_revision: Union[str, None] = '554fa61f3117'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass

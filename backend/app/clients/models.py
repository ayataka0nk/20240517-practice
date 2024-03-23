from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func
from ..database import Base


class Client(Base):
    __tablename__ = "clients"

    client_id = Column(Integer, primary_key=True)
    name = Column(String(length=255), nullable=False)
    created_at = Column(
        DateTime, nullable=False, server_default=func.current_timestamp()
    )
    updated_at = Column(
        DateTime,
        nullable=True,
        server_default=func.current_timestamp(),
        onupdate=func.current_timestamp(),
    )

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func
from ..database import Base
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from uuid import uuid4


class User(Base):
    __tablename__ = "users"

    user_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    email = Column(String(length=255), nullable=False)
    password = Column(String(length=255), nullable=False)
    name = Column(String(length=255), nullable=False)

    clients = relationship("Client", back_populates="user")
    projects = relationship("Project", back_populates="owner")
    work_entries = relationship("WorkEntry", back_populates="user")

    def verify_password(self, password):
        return self.password == password


class RefreshToken(Base):
    __tablename__ = "refresh_tokens"

    refresh_token_id = Column(Integer, primary_key=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False)
    token = Column(String(256), nullable=False, unique=True)
    created_at = Column(
        DateTime, nullable=False, server_default=func.current_timestamp()
    )
    expires_at = Column(DateTime, nullable=False)

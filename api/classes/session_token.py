from sqlalchemy import DateTime, Index, Text, ForeignKey
from sqlalchemy.orm import mapped_column, relationship, Mapped
from utils.orm import Base
import uuid
from datetime import datetime
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .user import User

class SessionToken(Base):
    __tablename__ = 'SessionToken'

    id = mapped_column(Text, primary_key=True)
    user_id = mapped_column(ForeignKey('User.id', ondelete='RESTRICT', onupdate='CASCADE'), nullable=False)
    expires_at = mapped_column(DateTime, nullable=False)
    created_at = mapped_column(DateTime, nullable=False, default=datetime.now)
    updated_at = mapped_column(DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

    user: Mapped['User'] = relationship('User', back_populates='SessionToken')

    def __init__(self, user_id: str, expires_at: datetime) -> None:
        """
        Initialize the SessionToken object

        Args:
            - user_id (str): The user ID of the user
            - expires_at (datetime): The expiration date of the token
        Returns:
            - None
        """
        self.id = uuid.uuid4().hex
        self.user_id = user_id
        self.expires_at = expires_at

    def is_expired(self) -> bool:
        """
        Check if the token is expired

        Args:
            - None
        Returns:
            - bool: True if the token is expired, False otherwise
        """
        return self.expires_at < datetime.now()
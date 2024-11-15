from sqlalchemy import DateTime, Index, Text
from sqlalchemy.orm import mapped_column, relationship, Mapped
from utils.orm import Base
import uuid
from datetime import datetime
from typing import TYPE_CHECKING, List

if TYPE_CHECKING:
    from .session_token import SessionToken

class User(Base):
    __tablename__ = 'User'
    __table_args__ = (
        Index('User_email_key', 'email', unique=True),
    )

    id = mapped_column(Text, primary_key=True)
    first_name = mapped_column(Text, nullable=False)
    last_name = mapped_column(Text, nullable=False)
    email = mapped_column(Text, nullable=False)
    password = mapped_column(Text, nullable=False)
    created_at = mapped_column(DateTime, nullable=False, default=datetime.now)
    updated_at = mapped_column(DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

    SessionToken: Mapped[List['SessionToken']] = relationship('SessionToken', uselist=True, back_populates='user')

    def __init__(self, first_name: str, last_name: str, email: str, password: str) -> None:
        """
        Initialize the User object

        Args:
            - first_name (str): The first name of the user
            - last_name (str): The last name of the user
            - email (str): The email of the user
            - password (str): The password of the user
        Returns:
            - None
        """
        self.id = uuid.uuid4().hex
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
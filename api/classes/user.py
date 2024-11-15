from sqlalchemy import DateTime, Index, Text, text
from sqlalchemy.orm import mapped_column
from utils.orm import Base

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
    created_at = mapped_column(DateTime, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
    updated_at = mapped_column(DateTime, nullable=False)

    def __init__(self, id: str, first_name: str, last_name: str, email: str, password: str, created_at: DateTime, updated_at: DateTime) -> None:
        """
        Initialize the User object

        Args:
            - id (str): The id of the user
            - first_name (str): The first name of the user
            - last_name (str): The last name of the user
            - email (str): The email of the user
            - password (str): The password of the user
            - created_at (datetime): The time the user was created
            - updated_at (datetime): The time the user was updated
        Returns:
            - None
        """
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.created_at = created_at
        self.updated_at = updated_at
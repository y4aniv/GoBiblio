from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker, scoped_session
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from sqlalchemy.orm.session import Session as SessionType
    from sqlalchemy.ext.declarative import DeclarativeMeta

engine = create_engine('sqlite:///database/dev.db')

SessionFactory = sessionmaker(bind=engine)
Session = scoped_session(SessionFactory)

Base = declarative_base()
Base.metadata.create_all(engine)

def __repr__(self) -> str:
    """
    Represent the object as a string

    Returns: 
        - str: The string representation of the object
    """
    return f"<{self.__class__.__name__} {self.id}>"

def save(self, session: 'SessionType' = None) -> 'DeclarativeMeta':
    """
    Save the object to the database

    Args:
        - session (SessionType): The session to use to save the object
    Returns:
        - DeclarativeMeta: The object that was saved
    """
    if session is None:
        session = Session()

    session.add(self)
    session.commit()
    return self

def delete(self, session: 'SessionType' = None):
    """
    Delete the object from the database

    Args:
        - session (SessionType): The session to use to delete the object
    """
    if session is None:
        session = Session()

    session.delete(self)
    session.commit()

Base.__repr__ = __repr__
Base.save = save
Base.delete = delete
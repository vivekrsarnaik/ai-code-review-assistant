from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import DateTime
from sqlalchemy.sql import func

from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Review(Base):

    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)

    language = Column(String(50))

    code = Column(Text)

    review = Column(Text)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
import os
import csv
from sqlalchemy import *
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


engine = create_engine(os.getenv("DATABASE_URL"))
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()


class Book(Base):
	__tablename__ = "Books"
	isbn = Column(String, primary_key=True)
	name = Column(String)
	publishedYear = Column(Integer)
	author = Column(String)


data = open('books.csv', 'rt')
Base.metadata.create_all(engine)
data = list(csv.reader(data))
for a in data[1:]:
	session.add(Book(isbn=a[0], name=a[1], publishedYear=int(a[3]), author = a[2]))
session.commit()

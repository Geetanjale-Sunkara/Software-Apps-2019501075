import os

from flask import Flask, session
from flask_session import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from flask import render_template
from flask import request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


# Check for environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Set up database
engine = create_engine(os.getenv("DATABASE_URL"))
db = SQLAlchemy(app)


class user(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(80))


db.create_all()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/register", methods=["POST", "GET"])
def register():
    if request.method == "POST":
        uname = request.form.get("uname")
        pwd = request.form.get("pwd")
        email = request.form.get("email")
        print(uname+" "+pwd + " "+email)
        check = user.query.filter_by(email=email).first()
        if check is None:
            register = user(username=uname, email=email, password=pwd)
            db.session.add(register)
            db.session.commit()
        else:
            return "Failed email already registered"
        return render_template("sucess.html", mail=register.email, username=register.username, register=register)
    return render_template("register.html")

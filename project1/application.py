import os

from flask import Flask, session
from flask_session import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from flask import render_template
from flask import request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import sessionmaker


app = Flask(__name__)
app.secret_key = "geetu_1597"


# Check for environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"

# Set up database
engine = create_engine(os.getenv("DATABASE_URL"))
db = SQLAlchemy(app)


class user(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uname = db.Column(db.String(80))
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(80))


db.create_all()


@app.route("/")
def index():
    if 'log' in session and 'uname' in session:
        return render_template("logs.html")
    return render_template("index.html")


@app.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        uname = request.form.get("uname")
        pwd = request.form.get("pwd")
        if uname != "" and pwd != "":
            login = user.query.filter_by(uname=uname, password=pwd).first()
            if login is not None:
                session['log'] = True
                session['uname'] = uname
                return render_template("logs.html")
            else:
                return render_template("login.html", msg="Data entered is wrong")
        else:
            return render_template("login.html", msg="Please Enter Data")
    return render_template("login.html", msg="")


@app.route("/register", methods=["POST", "GET"])
def register():
    if request.method == "POST":
        uname = request.form.get("uname")
        pwd = request.form.get("pwd")
        email = request.form.get("email")
        if uname != "" and pwd != "" and email != "":
            check = user.query.filter_by(email=email).first()
            checkun = user.query.filter_by(uname=uname).first()
            if (check is None) and (checkun is None):
                register = user(uname=uname, email=email, password=pwd)
                db.session.add(register)
                db.session.commit()
            else:
                msg = "Already registered"
                return render_template("failed.html", msg=msg)
            return render_template("sucess.html", mail=register.email, uname=register.uname, register=register)
        else:
            return render_template("register.html", msg="Please enter data")
    return render_template("register.html", msg="")


@app.route("/logout")
def logout():
    session.clear()
    return render_template("logedout.html")

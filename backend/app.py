from typing import Optional
from sqlmodel import Field, Session, SQLModel, create_engine, select
from flask import Flask, request, jsonify
from flask_cors import cross_origin
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

acces_password = "root"
hash_password = generate_password_hash(acces_password)


@app.post("/password/<string:password>")
@cross_origin()
def verify_password(password):
    acces_password = "root"
    hash_password = generate_password_hash(acces_password)
    return check_password_hash(hash_password, password)


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    roles: str


class Role(SQLModel, table=True):
    name: str = Field(primary_key=True)


engine = create_engine("sqlite:///database.db")


@app.get("/users")
@cross_origin()
def get_users():
    with Session(engine) as session:
        select_statement = select(User).order_by(User.id)
        users = session.execute(select_statement).all()
        # TODO: find out why a tuple is returned
        result = [
            {
                "id": user[0].id,
                "name": user[0].name,
                "roles": user[0].roles
            } for user in users
        ]
        return jsonify(result)


@app.get("/users/<int:row_id>")
@cross_origin()
def get_user(row_id):
    with Session(engine) as session:
        user_statement = select(User).where(User.id == row_id)
        user = session.execute(user_statement).first()
        result = {
            "id": user[0].id,
            "name": user[0].name,
            "roles": user[0].roles
        }
        return jsonify(result)


@app.post("/users")
@cross_origin()
def create_user():
    request_data = request.get_json()
    new_user = User(name=request_data["name"], roles=request_data["roles"])
    with Session(engine) as session:
        session.add(new_user)
        session.commit()
        return {"id": new_user.id, "name": new_user.name, "roles": new_user.roles}, 201


@app.delete("/users/<int:id>")
@cross_origin()
def delete_user(id):
    with Session(engine) as session:
        user = session.get(User, id)
        if user:
            session.delete(user)
            session.commit()
            return {"message": "user removed"}, 201
        else:
            return {"message": "user not found"}, 404


@app.put("/users/<int:user_id>")
@cross_origin()
def update_user(user_id):
    # Check if user exists.
    request_data = request.get_json()
    with Session(engine) as session:
        user = session.get(User, user_id)
        if user is None:
            return {"message": "user not found"}, 404

        # Update user entry in database
        user.name = request_data["name"]
        user.roles = ",".join(request_data["roles"])
        session.add(user)
        session.commit()
        return {"message": "user changed"}


@app.get("/roles")
@cross_origin()
def get_roles():
    with Session(engine) as session:
        roles_statement = select(Role)
        roles = session.execute(roles_statement).all()
        # TODO: find out why a tuple is returned
        result = [role[0].name for role in roles]
        return jsonify(result)


@app.post("/roles")
@cross_origin()
def create_roles():
    request_data = request.get_json()
    new_role = Role(name=request_data["name"])
    with Session(engine) as session:
        session.add(new_role)
        session.commit()
        return {"name": new_role.name}, 201


@app.delete("/roles/<string:name>")
@cross_origin()
def del_role(name):
    with Session(engine) as session:
        role = session.query(Role).filter(Role.name == name).first()
        if role is None:
            return {"message": "role not found"}, 404
        session.delete(role)
        session.commit()
        return {"message": "role removed"}, 201

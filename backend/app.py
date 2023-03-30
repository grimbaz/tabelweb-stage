from typing import Optional

from sqlmodel import Field, Session, SQLModel, create_engine, select
from flask import Flask, request, jsonify
from flask_cors import cross_origin

app = Flask(__name__)

roles = [
    {
        "name": "role1"
    },
    {
        "name": "role2"
    },
    {
        "name": "role3"
    },
    {
        "name": "role4"
    },
    {
        "name": "role5"
    },
    {
        "name": "role6"
    },
    {
        "name": "role7"
    },
    {
        "name": "role8"
    },
    {
        "name": "role9"
    },
    {
        "name": "role10"
    },
    {
        "name": "role11"
    },
    {
        "name": "role12"
    },
    {
        "name": "role13"
    },
    {
        "name": "role14"
    },
    {
        "name": "role15"
    },
    {
        "name": "role16"
    },
    {
        "name": "role17"
    },
    {
        "name": "role18"
    },
    {
        "name": "role19"
    },
    {
        "name": "role20"
    }
]


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    roles: str


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
        select_statement = select(User).where(User.id == row_id)
        user = session.execute(select_statement).first()
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
    return {"roles": roles}


@app.post("/roles")
@cross_origin()
def create_roles():
    request_data = request.get_json()
    new_role = {"name": request_data["name"]}
    roles.append(new_role)
    return new_role, 201


@app.delete("/roles/<string:name>")
@cross_origin()
def del_role(name):
    del_roles = None
    for role in roles:
        if role["name"] == name:
            del_roles = role
            break
    if del_roles is None:
        return {"message": "role not found"}, 404
    else:
        roles.remove(del_roles)
        return {"message": "role removed"}, 201


@app.get("/roles/<string:name>")
@cross_origin()
def get_role(name):
    for role in roles:
        if role["name"] == name:
            return role
    return {"message": "role not found"}

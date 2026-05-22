from main import app, db_connection
from helpers.Logger import *
from flask import request

# this route is supposed to keep methods related to user creation and fetches

@app.post("/users/insert_user")
def insert_user():
    # create a user
    # sample user
    # {
            # "username": "name",
            # "type": "type"
    # }
    try:
        post_id = db_connection.insert_user(request.data)
        return { "postId": str(post_id) }
    except Exception as e:
        logger.error(e)
        return '{"message": "error creating user"}',500

@app.get("/user/<object_id>")
def get_users(object_id):
    # list a user against user id
    try:
        users_object_list = db_connection.get_user(object_id)
        return users_object_list
    except Exception as e:
        logger.error(e)
        return '{"message": "no such user exists"}',404


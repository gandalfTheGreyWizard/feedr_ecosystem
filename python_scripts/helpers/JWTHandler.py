import jwt
from main import db_connection
from helpers.Logger import logger
import json
from flask import request
from datetime import datetime, timedelta

def encode_jwt(user_id):
    try:
        user_data =json.loads(db_connection.get_user(user_id))[0]
        del user_data['_id']
        expiry_time = datetime.now() + timedelta(hours=2)
        user_data['exp'] = expiry_time.timestamp()
        logger.info(expiry_time)
        logger.info(user_data)
        encoded_jwt = jwt.encode(user_data, "a_secret", algorithm="HS256")
        logger.info(encoded_jwt)
    except Exception as e:
        return {"message": "no such user found"},404
        logger.error(e)
    return {"jwt": encoded_jwt}

def decode_jwt():
    try:
        authorization_header = request.headers.get("Authorization")
        token = authorization_header.split(" ")[1]
        decoded_jwt = jwt.decode(token, "a_secret", algorithms=["HS256"], verify=True)
    except Exception as e:
        raise Exception(e)

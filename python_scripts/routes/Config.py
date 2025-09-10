from main import app
from flask import request
from helpers.Logger import logger
from main import db_connection
import json

@app.put('/config/<user_id>/create_or_update')
def create_or_update_config(user_id):
    try:
        logger.info(request.data)
        request_body = json.loads(request.data)
        logger.info(request_body)
    except Exception as e:
        logger.error(e)
        return '{"message": "please use a valid json"}',415
    try:
        resp = db_connection.create_or_update_config(user_id, request_body)
        logger.info(resp)
        return {"message": "config updated"}
    except Exception as e:
        logger.error(e)
        return {"message": "please update a valid config object"},400

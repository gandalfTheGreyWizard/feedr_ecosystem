from pymongo import MongoClient
import json
from bson.json_util import dumps
from bson import ObjectId
from helpers.Logger import logger

class DBQuery:
    def __init__(self):
        try:
            self.client = MongoClient("mongodb://root:example@localhost:27019")
            self.db = self.client.rss_feeds_reader;
        except Exception as e:
            print(e)
    def insert_user(self, user_body):
        try:
            user = json.loads(user_body)
            insert_id = self.db.users.insert_one(user)
            return insert_id.inserted_id
        except Exception as e:
            print(e)

    def get_user(self, object_id):
        db_response = self.db.users.find({"_id": ObjectId(object_id)})
        response = dumps(db_response)
        print(dumps(response))
        return response 

# configs queries
    def create_or_update_config(self, user_id, request_body_dict):
        # sample user config 
        # {
            # "userId": "id of the user for which config is being created",
            # "feedsList": "array of each_feed object"
        # }
        try:
            user = self.db.users.find({"_id": ObjectId(user_id)})
        except Exception as e:
            return '{"message": "user not found"}',404
        feedsList = []
        try:
            # sample each_feed
            # {
                # "feedName": "name of the feed",
                # "feedUrl": "the feed url to subscribe to",
                # "feedSource": "the source of the feed example reddit facebook or standalone"
            # }
            for each_feed in request_body_dict['feedsList']:
                logger.info(each_feed)
                feedsList.append(each_feed)
            existing_config = self.db.user_configs.find({ "userId": user_id })
            logger.info(existing_config)
            self.db.user_configs.update_one(
                    {"userId": user_id},
                    { "$set": {'feedsList': feedsList} },
                     upsert=True)
        except Exception as e:
            logger.error(e)
            return '{"message": "internal server error"}',500
    
    def get_user_config_as_object(self, user_id):
        try:
            user_config = self.db.user_configs.find_one({"userId": user_id})
            # dont forget to create a proper python serializer 
            return (dumps(user_config))
        except Exception as e:
            logger.error(e)
            return {"message": "no such user"},404


import requests
headers = {'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'}
from main import db_connection
from helpers.Logger import logger
import json
from helpers.Parser import Parser
import feedparser

headers = {'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'}

def aggregate_feeds_from_user_config(user_id):
    localparser = Parser()
    user_config = db_connection.get_user_config_as_object(user_id)
    # dont forget to create a proper python serializer 
    user_config_object = json.loads(user_config)
    for each_feed_object in user_config_object['feedsList']:
        logger.info(each_feed_object)
        data = requests.get(each_feed_object['feedUrl'], headers = headers)
        logger.info(data.content)
        parsed_data = feedparser.parse(data.content)
        for each_entry in parsed_data.entries:
            # each_entry['feedName'] = each_feed_obj['feedName']
            # each_entry['feedUrl'] = each_feed_obj['feedUrl']
            localparser.data_parser(each_entry, each_feed_object['feedName'], each_feed_object['feedSource'])
    return localparser.prepare_and_respond()
    

    


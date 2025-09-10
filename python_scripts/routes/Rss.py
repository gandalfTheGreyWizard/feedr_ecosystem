from main import app, db_connection
from helpers.Logger import *
from helpers.Parser import Parser
import requests
from dotenv import dotenv_values
import feedparser
from helpers.FeedsAggregator import *

from helpers.JWTHandler import *

config = dotenv_values()
feed_urls = config['FEEDS_URL'].split(',')
headers = {'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'}

@app.route("/rss/from_config/<user_id>")
def get_feeds_from_user_config(user_id):
    try:
        decode_jwt()
    except Exception as e:
        logger.error(e)
        return {"message": "not authorized"},401
    try:
        return aggregate_feeds_from_user_config(user_id)
    except Exception as e:
        return {"message": "internal server error"},500
    

@app.route("/rss/from_config")
def get_feeds_from_config():
    with open("./feedsConfig.json") as config:
        config_dict = json.load(config)
        logger.info(config_dict)
    response_entries = []
    for each_feed_obj in config_dict['randomFeeds']:
        feed_body = requests.get(each_feed_obj['feedUrl'], headers = headers)
        parsed_data = feedparser.parse(feed_body.content)
        content_arr = parsed_data.entries
        feed_entry = {'feedName': each_feed_obj['feedName']}
        feed_entry['feeds'] = []
        for each_entry in content_arr:
            # logger.info(each_entry, "\n")
            entry = {}
            entry['author_detail'] = each_entry.get('author_detail')
            entry['author'] = each_entry.get('author')
            entry['tags'] = each_entry.get('tags')
            entry['content'] = each_entry.get('content')
            entry['summary'] = each_entry.get('summary')
            entry['link'] = each_entry.get('link')
            entry['title'] = each_entry.get('title')
            entry['title_detail'] = each_entry.get('title_detail')
            feed_entry['feeds'].append(entry)
        response_entries.append(feed_entry)
    return { "entries" : response_entries }

@app.route("/rss/all")
def get_rss_data():
    logger.info(config)
    response_entries = []
    logger.info(feed_urls)
    for each_url in feed_urls:
        data = requests.get(each_url, headers = headers)
        parsed_data = feedparser.parse(data.content)
        for each_entry in parsed_data.entries:
            entry = {}
            entry['author_detail'] = each_entry['author_detail']['href']
            entry['author'] = each_entry['author']
            entry['tags'] = each_entry['tags'][0]['label']
            entry['content'] = each_entry['content'][0]['value']
            entry['summary'] = each_entry['summary']
            entry['link'] = each_entry['link']
            entry['title'] = each_entry['title']
            entry['title_detail'] = each_entry['title_detail']['value']
            response_entries.append(entry)
    return { "entries": response_entries }

@app.route("/rss/custom/<user_id>")
def get_rss_from_custom_urls(user_id):
    try:
        decode_jwt()
    except Exception as e:
        logger.error(e)
        return {"message": "not authorized"},401
    try:
        return aggregate_feeds_from_user_config(user_id)
    except Exception as e:
        return {"message": "internal server error"},500
    

    # localparser = Parser()
    # response_entries = []
    # custom_urls = ["http://localhost:1200/github/issue/vuejs/core/all/wontfix", "https://www.youtube.com/feeds/videos.xml?channel_id=UCnCikd0s4i9KoDtaHPlK-JA"]
    # for each_url in custom_urls:
        # data = requests.get(each_url, headers = headers)
        # parsed_data = feedparser.parse(data.content)
        # for each_entry in parsed_data.entries:
            # localparser.data_parser(each_entry)
    # return localparser.prepare_and_respond()

@app.route("/rss/<feed_name>")
def get_feed_by_name(feed_name):
    response_entries = []
    request_url = "https://reddit.com/r/{}.rss".format(feed_name)
    logger.info("requesting to ", request_url)
    try:
        data = requests.get(request_url, headers = headers)
        try:
            parsed_data = feedparser.parse(data.content)
        except Exception as e:
            logger.error("feed parsing error")
        for each_entry in parsed_data.entries:
            entry = {}
            entry['author_detail'] = each_entry['author_detail']['href']
            entry['author'] = each_entry['author']
            entry['tags'] = each_entry['tags'][0]['label']
            entry['content'] = each_entry['content'][0]['value']
            entry['summary'] = each_entry['summary']
            entry['link'] = each_entry['link']
            entry['title'] = each_entry['title']
            entry['title_detail'] = each_entry['title_detail']['value']
            response_entries.append(entry)
    except Exception as e:
        logger.error(e)
    return { 'entries': response_entries }

@app.route("/rss/<feed_name>/<feed_type>")
def get_feed_by_name_and_type(feed_name, feed_type):
    response_entries = []
    request_url = "https://reddit.com/r/{}/{}.rss".format(feed_name, feed_type)
    logger.info("requesting to ", request_url)
    try:
        data = requests.get(request_url, headers = headers)
        try:
            parsed_data = feedparser.parse(data.content)
        except Exception as e:
            logger.error("feed parsing error")
        for each_entry in parsed_data.entries:
            entry = {}
            entry['author_detail'] = each_entry['author_detail']['href']
            entry['author'] = each_entry['author']
            entry['tags'] = each_entry['tags'][0]['label']
            entry['content'] = each_entry['content'][0]['value']
            entry['summary'] = each_entry['summary']
            entry['link'] = each_entry['link']
            entry['title'] = each_entry['title']
            entry['title_detail'] = each_entry['title_detail']['value']
            response_entries.append(entry)
    except Exception as e:
        logger.error(e)
    return { 'entries': response_entries }


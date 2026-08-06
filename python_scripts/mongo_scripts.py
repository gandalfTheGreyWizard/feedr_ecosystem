from pymongo import MongoClient
client = MongoClient("mongodb://root:example@localhost:27019")
client.list_databases()

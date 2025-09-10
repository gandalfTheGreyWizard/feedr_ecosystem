import requests
from flask import Flask,request
from flask_cors import CORS
from dotenv import dotenv_values
import json
# module imports
from helpers.Parser import *
from helpers.DBQueries import *
from helpers.Logger import *

# helper service definitions
main_parser = Parser()


config = dotenv_values()


app = Flask(__name__)
CORS(app)
db_connection = DBQuery()

# route imports
from routes.Users import *
from routes.Rss import *
from routes.Config import *
from routes.Admin import *

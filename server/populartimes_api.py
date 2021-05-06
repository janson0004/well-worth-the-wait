import sys
import json
import os

from populartimes import populartimes
from dotenv import load_dotenv
load_dotenv()

API_KEY = os.getenv('API_KEY')

from populartimes import populartimes

response = json.dumps(populartimes.get_id("API-KEY", sys.argv[1]))
print(response)

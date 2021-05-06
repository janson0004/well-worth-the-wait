import sys
import json
import os

from populartimes import populartimes
from dotenv import load_dotenv
load_dotenv()

API_KEY = os.getenv('API_KEY')


response = json.dumps(populartimes.get_id(API_KEY, sys.argv[1]))
print(response)

import sys
import json

from populartimes import populartimes

response = json.dumps(populartimes.get_id("api_key", "place_id"))
print(response)

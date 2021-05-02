import sys
import json

from populartimes import populartimes

response = json.dumps(populartimes.get_id("API-KEY", sys.argv[1]))
print(response)

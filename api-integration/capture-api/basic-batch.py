import requests
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

url = f"{os.getenv('POSTHOG_API_HOST')}/batch/"

headers = {
    "Content-Type": "application/json",
}

body = {
    "api_key": os.getenv('POSTHOG_API_KEY'),
    "batch": [
        {
            "event": "batched_event",
            "properties" : {
                "distinct_id": "test-user-python",
                "number_in_batch": 1
            }
        },
        {
            "event": "batched_event",
            "properties" : {
                "distinct_id": "test-user-python",
                "number_in_batch": 2
            }
        }
    ]
}

response = requests.post(url, headers=headers, json=body)

print(response.json())

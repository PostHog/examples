import requests
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

headers = {
    "Content-Type": "application/json",
}

body = {
    "api_key": os.getenv('POSTHOG_API_KEY'),
    "event": "request",
    "properties": {
        "distinct_id": "test-user-python"
    }
}

url = f"{os.getenv('POSTHOG_API_HOST')}/i/v0/e/"

response = requests.post(url, headers=headers, json=body)

print(response.json())
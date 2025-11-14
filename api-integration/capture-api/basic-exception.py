import requests
import os
import traceback
import hashlib
import time
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

url = f"{os.getenv('POSTHOG_API_HOST')}/i/v0/e/"

headers = {
    "Content-Type": "application/json",
}

# Create a fake exception for demonstration
try:
    # Simulate an error_event_python
    raise ValueError("error_event_python: This is a simulated error for testing")
except Exception as e:
    # Get the current traceback
    tb = traceback.format_exc()
    
    # Create exception fingerprint based on exception message
    fingerprint = hashlib.md5(str(e).encode()).hexdigest()
    
    body = {
        "api_key": os.getenv('POSTHOG_API_KEY'),
        "event": "$exception",
        "properties": {
            "distinct_id": "test-user-python",
            "$exception_list": [{
                "type": type(e).__name__,
                "value": str(e),
                "mechanism": {
                    "handled": True,
                    "synthetic": False
                },
                "stacktrace": {
                    "type": "raw",
                    "frames": [
                        {
                            "platform": "custom",
                            "lang": "python",
                            "function": "error_event_python",
                            "filename": "basic-exception.py",
                            "lineno": 15,
                            "colno": 1,
                            "module": "exception_handler",
                            "resolved": True,
                            "in_app": True
                        },
                        {
                            "platform": "custom",
                            "lang": "python",
                            "function": "simulate_error",
                            "filename": "error_simulator.py",
                            "lineno": 8,
                            "colno": 5,
                            "module": "testing",
                            "resolved": True,
                            "in_app": True
                        },
                        {
                            "platform": "custom",
                            "lang": "python",
                            "function": "main",
                            "filename": "app.py",
                            "lineno": 42,
                            "colno": 12,
                            "module": "application",
                            "resolved": False,
                            "in_app": False
                        }
                    ]
                }
            }],
            "$exception_fingerprint": fingerprint
        }
    }

response = requests.post(url, headers=headers, json=body)

print(response.json())

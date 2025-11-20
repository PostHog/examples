// Load environment variables from .env file
require('dotenv').config();

const headers = {
    "Content-Type": "application/json",
};

const body = {
    "api_key": process.env.POSTHOG_API_KEY,
    "batch": [
        {
            "event": "batched_event",
            "properties" : {
                "distinct_id": "test-user-javascript",
                "number_in_batch": 1
            }
        },
        {
            "event": "batched_event",
            "properties" : {
                "distinct_id": "test-user-javascript",
                "number_in_batch": 2
            }
        }
    ]
};

const url = `${process.env.POSTHOG_API_HOST}/batch/`;

fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

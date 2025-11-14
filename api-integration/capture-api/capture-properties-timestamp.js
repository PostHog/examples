// Load environment variables from .env file
require('dotenv').config();

const headers = {
    "Content-Type": "application/json",
};

const body = {
    "api_key": process.env.POSTHOG_API_KEY,
    "event": "big_request",
    "timestamp": new Date().toISOString(),
    "properties": {
        "distinct_id": "test-user-javascript",
        "request_size": "big",
        "api_request": true
    }
};

const url = `${process.env.POSTHOG_API_HOST}/i/v0/e/`;

fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
// Load environment variables from .env file
require('dotenv').config();

const headers = {
    "Content-Type": "application/json",
};

const body = {
    "api_key": process.env.POSTHOG_API_KEY,
    "properties": {
        "distinct_id": "test-user-javascript",
        "alias": "test-user-javascript-alias"
    },
    "event": "$create_alias"
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

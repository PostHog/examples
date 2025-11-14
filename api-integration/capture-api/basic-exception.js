// Load environment variables from .env file
require('dotenv').config();
const crypto = require('crypto');

const headers = {
    "Content-Type": "application/json",
};

// Create a fake exception for demonstration
try {
    // Simulate an error_event_javascript
    throw new Error('error_event_javascript: This is a simulated error for testing');
} catch (error) {
    // Create exception fingerprint based on exception message
    const fingerprint = crypto.createHash('md5').update(error.message).digest('hex');
    
    const body = {
        "api_key": process.env.POSTHOG_API_KEY,
        "event": "$exception",
        "properties": {
            "distinct_id": "test-user-javascript",
            "$exception_list": [{
                "type": error.name,
                "value": error.message,
                "mechanism": {
                    "handled": true,
                    "synthetic": false
                },
                "stacktrace": {
                    "type": "raw",
                    "frames": [
                        {
                            "platform": "custom",
                            "lang": "javascript",
                            "function": "error_event_javascript",
                            "filename": "basic-exception.js",
                            "lineno": 8,
                            "colno": 1,
                            "module": "exception_handler",
                            "resolved": true,
                            "in_app": true
                        },
                        {
                            "platform": "custom",
                            "lang": "javascript",
                            "function": "simulateError",
                            "filename": "error-simulator.js",
                            "lineno": 15,
                            "colno": 5,
                            "module": "testing",
                            "resolved": true,
                            "in_app": true
                        },
                        {
                            "platform": "custom",
                            "lang": "javascript",
                            "function": "main",
                            "filename": "app.js",
                            "lineno": 42,
                            "colno": 12,
                            "module": "application",
                            "resolved": false,
                            "in_app": false
                        }
                    ]
                }
            }],
            "$exception_fingerprint": fingerprint
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
    .catch(err => console.error('Error:', err));
}

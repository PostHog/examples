#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

curl -v -L --header "Content-Type: application/json" -d "{
  \"api_key\": \"$POSTHOG_API_KEY\",
  \"properties\": {
    \"request_size\": \"big\",
    \"api_request\": true
  },
  \"timestamp\": \"$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)\",
  \"distinct_id\": \"test-user-bash\",
  \"event\": \"big_request\"
}" $POSTHOG_API_HOST/i/v0/e/
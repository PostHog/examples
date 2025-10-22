#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

curl -v -L --header "Content-Type: application/json" -d "{
    \"api_key\": \"$POSTHOG_API_KEY\",
    \"event\": \"request\",
    \"distinct_id\": \"test-user-bash\"
}" $POSTHOG_API_HOST/i/v0/e/
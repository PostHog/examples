#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

curl -v -L --header "Content-Type: application/json" -d "{
    \"api_key\": \"$POSTHOG_API_KEY\",
    \"properties\": {
        \"distinct_id\": \"test-user-bash\",
        \"alias\": \"test-user-bash-alias\"
    },
    \"event\": \"\$create_alias\"
}" $POSTHOG_API_HOST/i/v0/e/

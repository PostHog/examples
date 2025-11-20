#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

curl -v -L --header "Content-Type: application/json" -d "{
    \"api_key\": \"$POSTHOG_API_KEY\",
    \"batch\": [
        {
            \"event\": \"batched_event\",
            \"properties\" : {
                \"distinct_id\": \"test-user-bash\",
                \"number_in_batch\": 1
            }
        },
        {
            \"event\": \"batched_event\",
            \"properties\" : {
                \"distinct_id\": \"test-user-bash\",
                \"number_in_batch\": 2
            }
        }
    ]
}" $POSTHOG_API_HOST/batch/

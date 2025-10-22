#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

curl -X POST "$POSTHOG_API_HOST/i/v0/e/" \
     -H "Content-Type: application/json" \
     -d "{
         \"api_key\": \"$POSTHOG_API_KEY\",
         \"event\": \"\$exception\",
         \"properties\": {
             \"distinct_id\": \"test-user-bash\",
             \"\$exception_list\": [{
                 \"type\": \"ScriptError\",
                 \"value\": \"Command not found: fake_command\",
                 \"mechanism\": {
                     \"handled\": true,
                     \"synthetic\": false
                 },
                 \"stacktrace\": {
                     \"type\": \"raw\",
                     \"frames\": [
                         {
                             \"platform\": \"custom\",
                             \"lang\": \"bash\",
                             \"function\": \"main\",
                             \"filename\": \"basic-exception.sh\",
                             \"lineno\": 15,
                             \"colno\": 1,
                             \"module\": \"script_execution\",
                             \"resolved\": true,
                             \"in_app\": true
                         },
                         {
                             \"platform\": \"custom\",
                             \"lang\": \"bash\",
                             \"function\": \"execute_command\",
                             \"filename\": \"utils.sh\",
                             \"lineno\": 42,
                             \"colno\": 5,
                             \"module\": \"command_handler\",
                             \"resolved\": true,
                             \"in_app\": true
                         },
                         {
                             \"platform\": \"custom\",
                             \"lang\": \"bash\",
                             \"function\": \"error_event_bash\",
                             \"filename\": \"error_handler.sh\",
                             \"lineno\": 8,
                             \"colno\": 12,
                             \"module\": \"error_tracking\",
                             \"resolved\": false,
                             \"in_app\": false
                         }
                     ]
                 }
             }],
             \"\$exception_fingerprint\": \"$(echo 'Command not found: fake_command' | md5sum | cut -c1-32)\"
         }
     }"

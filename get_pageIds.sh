#!/usr/bin/env bash

curl https://scpfoundation.net/api/articles | jq -r -c '.[].pageId' > pageIds.txt
# will have to edit manually/with grep to remove deleted:/draft: and other

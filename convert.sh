#!/usr/bin/env bash

for f in $(cat pageIds.txt); do
  ./ftml2html articles_json/$f.json scp/articles_html/$f.html || echo failed to convert $f | tee convert.log
done

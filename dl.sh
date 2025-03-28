#!/usr/bin/env bash

total=$(cat pageIds.txt | grep -v '^deleted:' | grep -v '^draft:' | wc -l)
good=0
bad=0
skipped=0
for PAGE_ID in $(cat pageIds.txt | grep -v '^deleted:' | grep -v '^draft'); do
  ([[ ! -f articles/$PAGE_ID.json ]] || [[ ! -s articles/$PAGE_ID.json ]]) && (wget -q https://scpfoundation.net/api/articles/$PAGE_ID -O articles_json/$PAGE_ID.json && good=$((good+1)) || bad=$((bad+1))) || skipped=$(($skipped+1))
  left=$(($total-$good-$bad-$skipped))
  #echo $PAGE_ID --- Good: $good, Bad: $bad, Skipped: $skipped, Left: $left 
  #read
  sleep 3
done

#! /usr/bin/env bash

_collect() {
  local now=$(date +%s)
  local results_path="/Users/caio.tavares/dev/personal/chest/data/"
  local file="$results_path/$now"
  mkdir -p $results_path
  /usr/local/bin/node /Users/caio.tavares/dev/personal/chest/index.js file $file
}

_collect

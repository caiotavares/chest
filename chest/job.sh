#! /usr/bin/env bash

_chest() {
  local file=$1
  /usr/local/bin/node /Users/caio.tavares/dev/personal/chest/index.js file $file
}

_collect() {
  local time=$(date +%s)
  local month=$(date +%m)
  local day=$(date +%d)
  local results_path="/Users/caio.tavares/dev/personal/chest-results/$month/$day"
  local file="$results_path/$t"
  mkdir -p $results_path
  _chest $file
}

_collect

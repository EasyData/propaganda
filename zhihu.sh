#!/bin/bash
#
# zhihu hotlist
#

curl -s https://www.zhihu.com/billboard |
  htmlq -t '#js-initialData' |
    jq '[.initialState.topstory.hotList | map(.target) | with_entries(.key|=(.+1|tostring) | .value.rank=(.key|tonumber))[] | {rank, title:.titleArea.text, excerpt:.excerptArea.text, image:.imageArea.url, metrics:.metricsArea.text, link:.link.url}]'

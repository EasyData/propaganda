#!/bin/bash
#
# toutiao hotlist
#

BASE_URL=https://www.toutiao.com/trending

curl -s 'https://www.toutiao.com/hot-event/hot-board/?origin=toutiao_pc' |
  jq --arg burl $BASE_URL '.data | with_entries(.key|=(.+1|tostring) | .value.rank=(.key|tonumber)) | map({rank,id:.ClusterIdStr,title:.Title,image:.Image.url,score:(.HotValue|tonumber),url:"\($burl)/\(.ClusterIdStr)/?rank=\(.rank)"})'

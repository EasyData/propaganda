#!/bin/bash
#
# sogou hotlist
#

curl -s https://hotlist.imtt.qq.com/Fetch |
  jq '.weibo'

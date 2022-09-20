#!/bin/bash
#
# sogou hotlist
#

curl -s https://go.ie.sogou.com/hot_ranks |
  jq '.data| map(.attributes.id = .id | .attributes)'

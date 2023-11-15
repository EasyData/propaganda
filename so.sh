#!/bin/bash

curl -s 'https://news.so.com/hotnews?src=hotnews' |
  htmlq '#hot-list li a' |
    htmlq 'a' |
      grep -w 'pos' |
        htmlq -t '.pos,.title,.hot' |
          sed 'N;N;s/\n/\t/g' |
            sed 's/人在看$//' |
              jq -sR 'split("\n")|map(split("\t")|select(length==3)|{index:(.[0]|tonumber),title:.[1],url:(@uri "https://www.so.com/s?q=\(.[1])"),score:(.[2]|tonumber)})'

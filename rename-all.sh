#!/usr/bin/env bash

for f in ./config ./examples ./scripts ./src ./test ./testrunner ./webgl-boilerplate ./package.json ./README.md ./TODOs.md
do
  if [ -d "$f" ]
  then
    find -E "$f" -type f -regex '.*\.(js|mjs|json|css|scss|html|sh|md)$' -exec ./rename.sh {} \;
  else
    ./rename.sh "$f"
  fi
done


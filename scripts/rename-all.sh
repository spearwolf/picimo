#!/usr/bin/env bash

RENAME_SH=./scripts/rename.sh

for f in ./config ./examples ./scripts ./src ./test ./testrunner ./webgl-boilerplate ./package.json ./README.md ./TODOs.md
do
  if [ -d "$f" ]
  then
    find -E "$f" -type f -regex '.*\.(js|mjs|json|css|scss|html|sh|md)$' -exec $RENAME_SH {} \;
  else
    $RENAME_SH "$f"
  fi
done

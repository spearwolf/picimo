#!/bin/bash
cd "$(dirname "$0")"/.. || exit
SOURCES=$(./scripts/source-files.sh)
sed $* $SOURCES

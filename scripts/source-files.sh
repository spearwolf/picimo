#!/bin/bash
cd "$(dirname "$0")"/.. || exit
ack --js -f src/ test/ webgl-boilerplate/src/ examples/*/src/

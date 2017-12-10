#!/bin/bash
cd "$(dirname "$0")"/.. || exit
ack --js -f src/ test/ webgl-boilerplate/src/ examples/hello-picimo/src/ examples/sinus-scroll/src/

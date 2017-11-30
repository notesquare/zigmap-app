#!/bin/bash
LOCATION=37.557426,126.924792
ZOOM_LEVEL=15
SIZE=100

CURL_BIN=curl
URL=https://maps.googleapis.com/maps/api/staticmap
API_KEY=AIzaSyDZ9GLYRxUxqNxxI_KGLNuGSRO3d5rdbXw
OUTPUT=map
[[ -n "$1" ]] && OUTPUT=$1

${CURL_BIN} -o ${OUTPUT}.png ${URL}?center=${LOCATION}\&zoom=${ZOOM_LEVEL}\&size=${SIZE}x${SIZE}\&maptype=roadmap\&markers=color:blue%7Clabel:S%7C${LOCATION}\&key=${API_KEY}
${CURL_BIN} -o ${OUTPUT}@2x.png ${URL}?center=${LOCATION}\&zoom=${ZOOM_LEVEL}\&size=${SIZE}x${SIZE}\&scale=2\&maptype=roadmap\&markers=color:blue%7Clabel:S%7C${LOCATION}\&key=${API_KEY}

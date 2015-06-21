#!/usr/bin/env bash
set -ev

cd application/frontend

if [ -f bower.json ]; then
    bower install
fi

npm install
npm test

cd ../backend

if [ -f bower.json ]; then
    bower install
fi

npm install
npm test



exit 0



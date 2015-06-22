#!/usr/bin/env bash
# set -ev

pwd

cd ./application/frontend

bower install
npm install
npm test

cd ../backend

npm install
npm test

exit 0
#!/usr/bin/env bash

pwd

cd ./application/backend

npm install
npm test

cd ../frontend

bower install
npm install
npm test
grunt build
grunt test
exit 0
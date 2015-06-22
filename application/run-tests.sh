#!/usr/bin/env bash
# set -ev

cd frontend

bower install
npm install
npm test

cd backend

npm install
npm test

exit 0
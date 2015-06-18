#!/usr/bin/env bash
set -ev
cd ${TEST_DIR}

if [ -f /tmp/foo.txt ]; then
    bower install
fi

npm install
npm test

exit 0
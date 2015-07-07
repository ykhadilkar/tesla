var Path = require('path');

module.exports = {
    server: {
        address: "0.0.0.0",
        port: 3000
    },
    serverOptions: {
        cors: {
            headers: ['Authorization', 'Content-Type', 'If-None-Match', 'If-Modified-Since']
        }
    }
};

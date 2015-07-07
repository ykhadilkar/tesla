module.exports = [
    {
        identity: 'test',
        connection: 'mongoConnection',
        attributes: {
            "test_id": {type: "integer", primaryKey: true},
            "name": "string",
            "date": "date",
            "comments": "string"
        }
    }];


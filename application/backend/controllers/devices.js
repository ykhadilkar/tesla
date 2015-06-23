"use strict";

var OpenFDA = require('../models/openfda');

var DeviceController = function() {

};

DeviceController.prototype.event = function event(request, reply) {
    reply(OpenFDA.search('device','event',request.url.search));
};

DeviceController.prototype.enforcement = function enforcement(request, reply) {
    reply(OpenFDA.search('device','enforcement',request.url.search));
};

module.exports = new DeviceController();
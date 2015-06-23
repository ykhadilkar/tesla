"use strict";

var OpenFDA = require('../models/openfda');

var DrugsController = function() {

};

DrugsController.prototype.symptoms = function symptoms(request, reply) {


};

DrugsController.prototype.events = function events(request, reply) {
    reply(OpenFDA.search('drug','event',request.url.search));
};

DrugsController.prototype.labels = function labels(request, reply) {
    reply(OpenFDA.search('drug','label',request.url.search));
};

DrugsController.prototype.enforcements = function enforcements(request, reply) {
    reply(OpenFDA.search('drug','enforcement',request.url.search));
};

module.exports = new DrugsController();
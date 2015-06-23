"use strict";

var OpenFDA = require('../models/openfda');

var DrugController = function() {

};

DrugController.prototype.symptoms = function symptoms(request, reply) {


};

DrugController.prototype.events = function events(request, reply) {
    reply(OpenFDA.search('drug','event',request.url.search));
};

DrugController.prototype.labels = function labels(request, reply) {
    reply(OpenFDA.search('drug','label',request.url.search));
};

DrugController.prototype.enforcements = function enforcements(request, reply) {
    reply(OpenFDA.search('drug','enforcement',request.url.search));
};

module.exports = new DrugController();
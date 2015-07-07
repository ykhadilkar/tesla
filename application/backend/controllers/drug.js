'use strict';

var OpenFDA = require('../models/openfda');

var DrugController = function () {

};

DrugController.prototype.symptom = function symptom(request, reply) {


};

DrugController.prototype.event = function event(request, reply) {
    reply(OpenFDA.search('drug', 'event', request.url.query.search));
};

DrugController.prototype.label = function label(request, reply) {
    reply(OpenFDA.search('drug', 'label', request.url.query.search));
};

DrugController.prototype.enforcement = function enforcement(request, reply) {
    reply(OpenFDA.search('drug', 'enforcement', request.url.query.search));
};

module.exports = new DrugController();

'use strict';

var OpenFDA = require('../models/openfda');

var SymptomController = function() {};

SymptomController.prototype.search = function search(request, reply) {
    var data = [];
    reply(data);
};

SymptomController.prototype.findSynonym = function findSynonym(request, reply) {

    var data = [];
    data.push('High Blood Pressure');
    data.push('Hypertension');
    data.push('HBP');
    data.push('HTP');

    reply(data);
};

module.exports = new SymptomController();
'use strict';

var Fizz = require('../models/fizz');


var SymptomController = function() {};

SymptomController.prototype.search = function search(request, reply) {

    var data = Fizz.search(request.url.query.search);

    console.log(data);
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
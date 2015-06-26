'use strict';

var Fizz = require('../models/fizz');
var logger = require('../utils/logger');


var SymptomController = function () {
};

SymptomController.prototype.search = function search(request, reply) {
    var data = Fizz.search(request.url.query.search);
    reply(data);
};

SymptomController.prototype.autocomplete = function autocomplete(request, reply) {
    var data = Fizz.autocomplete(request.url.query.search);

    reply(data);
};

module.exports = new SymptomController();

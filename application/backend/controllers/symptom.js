'use strict';

var Fizz = require('../models/fizz');
var logger = require('../utils/logger');


var SymptomController = function () {
};

SymptomController.prototype.search = function search(request, reply) {
    if (request.url.query.search != undefined) {
        var data = Fizz.search(request.url.query.search);
    }else{
        var data = {};
    }
    reply(data);
};

SymptomController.prototype.autocomplete = function autocomplete(request, reply) {
    var data = Fizz.autocomplete(request.url.query.search);

    reply(data);
};

module.exports = new SymptomController();

"use strict";

var Wreck = require('wreck');
var uri = "https://api.fda.gov/drug/event.json";
var search = "?search=receivedate:[20140101+TO+20150101]&count=receivedate"

function EventsController(){};
EventsController.prototype = (function() {
    return {
        find: function find(request, reply) {
            Wreck.get(uri+search, function (err, res, payload) {
                reply(payload);
            });
        }
    }
})();

var eventsController = new EventsController();
module.exports = eventsController;
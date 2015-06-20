"use strict";

var Wreck = require('wreck');
var drugs_event_search_uri = "https://api.fda.gov/drug/event.json?search=";

function EventsController(){};
EventsController.prototype = (function() {
    return {
        find: function find(request, reply) {
            var search = request.params.search;
            Wreck.get(drugs_event_search_uri + search, function (err, res, payload) {
                reply(payload);
            });
        }
    }
})();

var eventsController = new EventsController();
module.exports = eventsController;
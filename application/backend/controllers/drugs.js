/**
 * Created by ykhadilkar on 6/21/15.
 */
"use strict";

var Wreck = require('wreck');
var drugs_search_uri = "https://api.fda.gov/drug/";

function DrugsController() {
}
DrugsController.prototype = (function () {
    return {
        events: function find(request, reply) {
            var event_prefix = "event.json";
            var search = "";
            if (request.url.search) {
                search = request.url.search;
            }
            ;
            Wreck.get(drugs_search_uri + event_prefix + search, function (err, res, payload) {
                //TODO: Get data from ES and other sources. Return mashed up magical results.
                reply(payload);
            });
        },
        labels: function find(request, reply) {
            var label_prefix = "label.json";
            var search = "";
            if (request.url.search) {
                search = request.url.search;
            }
            ;
            Wreck.get(drugs_search_uri + label_prefix + search, function (err, res, payload) {
                //TODO: Get data from ES and other sources. Return mashed up magical results.
                reply(payload);
            });
        },
        enforcements: function find(request, reply) {
            var enforcement_prefix = "enforcement.json";
            var search = "";
            if (request.url.search) {
                search = request.url.search;
            }
            ;
            Wreck.get(drugs_search_uri + enforcement_prefix + search, function (err, res, payload) {
                //TODO: Get data from ES and other sources. Return mashed up magical results.
                reply(payload);
            });
        }
    }
})();

var drugsController = new DrugsController();
module.exports = drugsController;
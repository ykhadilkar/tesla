/**
 * Created by ykhadilkar on 6/21/15.
 */
"use strict";

var Wreck = require('wreck');
var foods_search_uri = "https://api.fda.gov/food/";

function FoodsController() {
}
FoodsController.prototype = (function () {
    return {
        enforcements: function find(request, reply) {
            var enforcement_prefix = "enforcement.json";
            var search = "";
            if (request.url.search) {
                search = request.url.search;
            }
            Wreck.get(foods_search_uri + enforcement_prefix + search, function (err, res, payload) {
                //TODO: Get data from ES and other sources. Return mashed up magical results.
                reply(payload);
            });
        }
    }
})();

var foodsController = new FoodsController();
module.exports = foodsController;
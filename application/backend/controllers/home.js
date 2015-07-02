'use strict';

var HomeController = function () {
};

HomeController.prototype.routes = function event(request, reply) {
    reply({
        'endpoints': [
            '/symptom.json',
            '/symptom/autocomplete.json',
            '/drug/event.json',
            '/drug/label.json',
            '/drug/enforcement.json',
            '/device/event.json',
            '/device/enforcement.json',
            '/food/enforcement.json',
            '/goodrx/fair-price.json',
            '/goodrx/low-price.json',
            '/goodrx/compare-price.json',
            '/goodrx/drug-info.json',
            '/goodrx/drug-search.json'
        ]
    })
};

module.exports = new HomeController();

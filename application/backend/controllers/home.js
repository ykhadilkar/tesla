'use strict';

var HomeController = function () {
};

HomeController.prototype.routes = function event(request, reply) {
    reply({
        'endpoints': [
            '/symptom.json',
            '/symptom/synonym.json',
            '/drug/event.json',
            '/drug/label.json',
            '/drug/enforcement.json',
            '/device/event.json',
            '/device/enforcement.json',
            '/food/enforcement.json',
            '/food/enforcement.json'
        ]
    })
};

module.exports = new HomeController();
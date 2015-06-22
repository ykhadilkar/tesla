var options = {maxLimit:100};
var drugsController = require('./controllers/drugs');
var devicesController = require('./controllers/devices');
var foodsController = require('./controllers/foods');

exports.endpoints = [
	{
        method: 'GET',
        path: '/drug/event.json',
        config: {
            handler: drugsController.events
        }
    },
    {
        method: 'GET',
        path: '/drug/label.json',
        config: {
            handler:drugsController.labels
        }
    },
    {
        method: 'GET',
        path: '/drug/enforcement.json',
        config: {
            handler:drugsController.enforcements
        }
    },
    {
        method: 'GET',
        path: '/device/event.json',
        config: {
            handler:devicesController.events
        }
    },
    {
        method: 'GET',
        path: '/device/enforcement.json',
        config: {
            handler:devicesController.enforcements
        }
    },
    {
        method: 'GET',
        path: '/food/enforcement.json',
        config: {
            handler:foodsController.enforcements
        }
    }
];
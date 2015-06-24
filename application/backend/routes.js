var drugController = require('./controllers/drug');
var deviceController = require('./controllers/device');
var foodController = require('./controllers/food');
var symptomController = require('./controllers/symptom');

exports.endpoints = [
    {
        method: 'GET',
        path: '/symptom.json',
        config: {
            handler: symptomController.search
        }
    },
    {
        method: 'GET',
        path: '/symptom/synonym.json',
        config: {
            handler: symptomController.findSynonym
        }
    },
	{
        method: 'GET',
        path: '/drug/event.json',
        config: {
            handler: drugController.event
        }
    },
    {
        method: 'GET',
        path: '/drug/label.json',
        config: {
            handler:drugController.label
        }
    },
    {
        method: 'GET',
        path: '/drug/enforcement.json',
        config: {
            handler:drugController.enforcement
        }
    },
    {
        method: 'GET',
        path: '/device/event.json',
        config: {
            handler:deviceController.event
        }
    },
    {
        method: 'GET',
        path: '/device/enforcement.json',
        config: {
            handler:deviceController.enforcement
        }
    },
    {
        method: 'GET',
        path: '/food/enforcement.json',
        config: {
            handler:foodController.enforcement
        }
    }
];
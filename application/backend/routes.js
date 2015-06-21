var bedwetter = require('bedwetter');

var options = {maxLimit:100};
var drugsController = require('./controllers/drugs');
var devicesController = require('./controllers/devices');
var foodsController = require('./controllers/foods');

exports.endpoints = [

	{method: 'GET',path: '/test',handler:{bedwetter: {}}},
	{method: 'GET',path: '/test/count',handler:{bedwetter: {}}},
	{method: 'GET',path: '/test/{id}',handler:{bedwetter: {}}},
	{method: 'POST',path: '/test',handler:{bedwetter: {}}},
	{method: 'PATCH',path: '/test/{id}',handler:{bedwetter: {}}},

    {method: 'GET',path: '/drug/event.json',handler:drugsController.events},
    {method: 'GET',path: '/drug/label.json',handler:drugsController.labels},
    {method: 'GET',path: '/drug/enforcement.json',handler:drugsController.enforcements},

    {method: 'GET',path: '/device/event.json',handler:devicesController.events},
    {method: 'GET',path: '/device/enforcement.json',handler:devicesController.enforcements},

    {method: 'GET',path: '/food/enforcement.json',handler:foodsController.enforcements}
];
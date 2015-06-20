var bedwetter = require('bedwetter');

var options = {maxLimit:100};
var eventsController = require('./controllers/events');

exports.endpoints = [

	{method: 'GET',path: '/test',handler:{bedwetter: {}}},
	{method: 'GET',path: '/test/count',handler:{bedwetter: {}}},
	{method: 'GET',path: '/test/{id}',handler:{bedwetter: {}}},
	{method: 'POST',path: '/test',handler:{bedwetter: {}}},
	{method: 'PATCH',path: '/test/{id}',handler:{bedwetter: {}}},

    {method: 'GET',path: '/drug/event/{search}',handler:eventsController.find}
];
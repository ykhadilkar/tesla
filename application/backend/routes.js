var bedwetter = require('bedwetter');

var options = {maxLimit:100};

exports.endpoints = [

	{method: 'GET',path: '/test',handler:{bedwetter: {}}},
	{method: 'GET',path: '/test/count',handler:{bedwetter: {}}},
	{method: 'GET',path: '/test/{id}',handler:{bedwetter: {}}},
	{method: 'POST',path: '/test',handler:{bedwetter: {}}},
	{method: 'PATCH',path: '/test/{id}',handler:{bedwetter: {}}},


];
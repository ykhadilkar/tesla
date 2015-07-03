"use strict";

var drugController = require('./controllers/drug');
var deviceController = require('./controllers/device');
var foodController = require('./controllers/food');
var symptomController = require('./controllers/symptom');
var homeController = require('./controllers/home');
var productController = require('./controllers/product');
var goodRxController = require('./controllers/goodrx');

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
        path: '/symptom/autocomplete.json',
        config: {
            handler: symptomController.autocomplete
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
            handler: drugController.label
        }
    },
    {
        method: 'GET',
        path: '/drug/enforcement.json',
        config: {
            handler: drugController.enforcement
        }
    },
    {
        method: 'GET',
        path: '/device/event.json',
        config: {
            handler: deviceController.event
        }
    },
    {
        method: 'GET',
        path: '/device/enforcement.json',
        config: {
            handler: deviceController.enforcement
        }
    },
    {
        method: 'GET',
        path: '/food/enforcement.json',
        config: {
            handler: foodController.enforcement
        }
    },
    {
        method: 'GET',
        path: '/product/search.json',
        config: {
            handler: productController.search
            }
    },
    {
        method: 'GET',
        path: '/goodrx/fair-price.json',
        config: {
            handler: goodRxController.fairprice
        }
    },
    {
        method: 'GET',
        path: '/goodrx/low-price.json',
        config: {
            handler: goodRxController.lowprice
        }
    },
    {
        method: 'GET',
        path: '/goodrx/compare-price.json',
        config: {
            handler: goodRxController.compareprice
        }
    },
    {
        method: 'GET',
        path: '/goodrx/drug-info.json',
        config: {
            handler: goodRxController.druginfo
        }
    },
    {
        method: 'GET',
        path: '/goodrx/drug-search.json',
        config: {
            handler: goodRxController.drugsearch
        }
    },
    {
        method: 'GET',
        path: '/',
        config: {
            handler: homeController.routes
        }
    }
];

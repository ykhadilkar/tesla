'use strict';

TeslaApp.config(['$routeProvider', 'usSpinnerConfigProvider',
    function ($routeProvider, usSpinnerConfigProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'home/views/homePartial.html',
                controller: 'HomeCtrl',
                class: 'home' // custom directive
            }).
            when('/search', {
                templateUrl: 'search/views/searchPartial.html',
                controller: 'SearchCtrl'
            }).
            when('/fda', {
                templateUrl: 'fda/views/fda.html',
                controller: 'FdaCtrl'
            }).
            when('/drug', {
                templateUrl: 'drug/views/drugPartial.html',
                controller: 'DrugCtrl'
            }).
            when('/interaction', {
                templateUrl: 'drug/views/interactionPartial.html',
                controller: 'InteractionCtrl'
            }).
            when('/product', {
                templateUrl: 'product/views/productPartial.html',
                controller: 'ProductCtrl'
            }).
            when('/about', {
                templateUrl: 'about/views/about.html'
            }).
            when('/faqs', {
                templateUrl: 'about/views/faqs.html'
            }).
            otherwise({
                redirectTo: '/'
            });

            //customizing spinner
            usSpinnerConfigProvider.setDefaults({color: 'black', radius:30, width:12, length: 25});
    }]);

'use strict';

angular.module('teslaApp').config(['$routeProvider',
    function ($routeProvider) {
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
            when('/events', {
                templateUrl: 'events/views/eventsPartial.html',
                controller: 'EventsCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);

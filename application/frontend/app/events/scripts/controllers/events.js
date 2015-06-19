'use strict';

angular.module('teslaApp.events', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/events', {
            templateUrl: 'events/views/events.html',
            controller: 'EventsCtrl'
        });
    }])

    .controller('EventsCtrl', [function() {

    }]);

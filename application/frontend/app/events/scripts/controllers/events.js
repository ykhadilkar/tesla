'use strict';
var events_data = {}
var model = {
};

var teslaApp = angular.module('teslaApp.events', ['ngRoute']);

teslaApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/events', {
        templateUrl: 'events/views/events.html',
        controller: 'EventsCtrl'
    });
}]);

teslaApp.run(function ($http) {
    $http.get("https://api.fda.gov/drug/event.json?search=receivedate:[20140101+TO+20150101]&count=receivedate").success(function (data) {
        model.items = data;
    });
});

teslaApp.controller('EventsCtrl', function ($scope) {
    $scope.todo = model;
    $scope.message = "Hello Controller";
});

'use strict';
var events_data = {}
var model = {
};

var teslaAppEvents = angular.module('teslaApp.events', ['ngRoute']);

teslaAppEvents.controller('EventsCtrl', function ($scope) {
    $scope.todo = model;
    $scope.message = "Hello Controller";
});

teslaAppEvents.run(function ($http) {
    $http.get("https://api.fda.gov/drug/event.json?search=receivedate:[20140101+TO+20150101]&count=receivedate").success(function (data) {
        model.items = data;
    });
});



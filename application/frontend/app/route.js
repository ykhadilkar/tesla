'use strict';

angular.module('teslaApp').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'home/views/homePartial.html',
        controller: 'HomeCtrl'
      }).
      when('/events', {
        templateUrl: 'events/views/eventsPartial.html',
        controller: 'EventsCtrl'
      }).
      when('/search', {
        templateUrl: 'search/views/searchPartial.html',
        controller: 'SearchCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
angular.module('teslaApp').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'home/views/index.html',
        controller: 'HomeCtrl'
      }).
      when('/events', {
        templateUrl: 'events/views/events.html',
        controller: 'EventsCtrl'
      }).
      when('/search', {
        templateUrl: 'search/views/index.html',
        controller: 'SearchCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
'use strict';

// Declare app level module which depends on views, and components
angular.module('teslaApp', [
    'ngRoute',
    'teslaApp.home',
    'teslaApp.search',
    'teslaApp.events',
    'teslaApp.version'
]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    }]);
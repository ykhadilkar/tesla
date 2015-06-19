'use strict';

angular.module('myApp.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/views/index.html',
            controller: 'HomeCtrl'
        });
    }])

    .controller('HomeCtrl', [function() {

    }]);
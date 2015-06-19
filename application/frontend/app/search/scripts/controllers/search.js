'use strict';

angular.module('myApp.search', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: 'search/views/index.html',
            controller: 'SearchCtrl'
        });
    }])

    .controller('SearchCtrl', [function() {

    }]);
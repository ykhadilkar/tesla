'use strict';

angular.module('teslaApp.search', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: 'search/views/index.html',
            controller: 'SearchCtrl'
        });
    }])

    .controller('SearchCtrl', [function() {

    }]);
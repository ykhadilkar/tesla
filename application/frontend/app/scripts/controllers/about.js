'use strict';

/**
 * @ngdoc function
 * @name teslaFrontApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the teslaFrontApp
 */
angular.module('teslaFrontApp')
    .controller('AboutCtrl', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });

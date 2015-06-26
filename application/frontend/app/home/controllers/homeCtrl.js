'use strict';

angular.module('teslaApp.home', [])
    .controller('HomeCtrl', ['$scope', function ($scope) {

        $scope.symptom = "My Symptom";
        $scope.drug = "";
    }]);

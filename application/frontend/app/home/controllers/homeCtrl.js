'use strict';

angular.module('teslaApp.home', [])
  .controller('HomeCtrl', ['$scope', 'teslaFactory', function ($scope, teslaFactory) {

    $scope.symptom = "My Symptom";
    $scope.drug = "";

    console.log('InHomeCtrl');

  }]);

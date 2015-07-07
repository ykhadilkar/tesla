'use strict';

TeslaApp.controller('HomeCtrl', ['$scope', 'usSpinnerService', function ($scope, usSpinnerService) {

    $scope.symptom = "My Symptom";
    $scope.drug = "";
    
    usSpinnerService.stop('spinner');
}]);

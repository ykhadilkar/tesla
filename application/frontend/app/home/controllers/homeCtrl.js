'use strict';

angular.module('teslaApp.home', [])
	.controller('HomeCtrl', ['$scope','teslaFactory', function($scope, teslaFactory) {

   $scope.symptom = "My Symptom";
   $scope.drug = "";
   
    console.log('InHomeCtrl');

    $scope.searchGo = function(keyEvent){
      console.log('keypressed');
      if (keyEvent.which === 13) {
        teslaFactory.setSymptom($scope.formSymptom);
        console.log('Hello location');
        $location.path('/search');
      }
    };

}]);

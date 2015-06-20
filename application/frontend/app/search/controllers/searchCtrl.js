'use strict';

angular.module('teslaApp.search', ['ngRoute'])

    .controller('SearchCtrl', ['teslaFactory', '$scope', function(teslaFactory, $scope) {
      // When the search page is initiated, grab the symptom search term from the teslaFactory
      $scope.factorySymptom = teslaFactory.getSymptom();

      // Default the form value to the previously set search symptom
      $scope.formSymptom = $scope.factorySymptom;

      // ****
      // onSearchClick - Search button click handler from the search page
      // ****
      $scope.onSearchClick = function() {
        // Update the factory first to reflect the new search term
        teslaFactory.setSymptom($scope.formSymptom);
        $scope.factorySymptom = $scope.formSymptom;

        // TO DO : Add API call here
        //$scope.results = [
        //  {
        //    "first":"Bob",
        //    "last":"Weber"
        //  },
        //  {
        //    "first":"John",
        //    "last":"Smith"
        //  },
        //  {
        //    "first":"Joe",
        //    "last":"Public"
        //  }];

              };
    }]);

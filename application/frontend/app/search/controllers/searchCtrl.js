'use strict';

angular.module('teslaApp.search', ['ngRoute'])

  .controller('SearchCtrl', ['teslaFactory', 'searchFactory', 'fdaApiService', '$scope',
    function (teslaFactory, searchFactory, fdaApiService, $scope) {
    // When the search page is initiated, grab the symptom search term from the teslaFactory
    $scope.factorySymptom = teslaFactory.getSymptom();

    // Default the form value to the previously set search symptom
    $scope.formSymptom = $scope.factorySymptom;
    $scope.sortResultsBySafe = true;


    var searchString = 'drugindication:' + $scope.formSymptom;

    // ****
    // onSearchClick - Search button click handler from the search page
    // ****
    $scope.onSearchClick = function () {
      // Update the factory first to reflect the new search term
      teslaFactory.setSymptom($scope.formSymptom);
      $scope.factorySymptom = $scope.formSymptom;
      var searchString = 'drugindication:' + $scope.formSymptom;
      console.log(searchString);
      searchFactory.getDrugsBySymptom(searchString, function(data){
       console.log('Ctrl Results');
       $scope.results = data;
       console.log($scope.results);

     });

    };
  }]);

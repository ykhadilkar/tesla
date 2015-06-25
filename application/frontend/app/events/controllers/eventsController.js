'use strict';

angular.module('teslaApp.events', ['ngRoute'])

  .controller('EventsCtrl', ['teslaFactory', 'searchFactory', 'fdaApiService', '$scope', '$location',
    function (teslaFactory, searchFactory, fdaApiService, $scope, $location) {
      // When the search page is initiated, grab the symptom search term from the teslaFactory
      $scope.factorySymptom = teslaFactory.getSymptom();

        searchFactory.getDrugInteractions('ibuprofen', function(result){
          $scope.interactions = result;
        });
//      console.log('in control');
  //    teslaFactory.getDrugInteractions('ibuprofen');
    }]);


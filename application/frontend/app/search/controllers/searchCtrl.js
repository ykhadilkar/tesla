'use strict';

TeslaApp.controller('SearchCtrl', ['teslaFactory', 'searchFactory', 'fdaApiService', '$scope', '$location', 'usSpinnerService',
    function (teslaFactory, searchFactory, fdaApiService, $scope, $location, usSpinnerService) {
        // When the search page is initiated, grab the symptom search term from the teslaFactory
        $scope.factorySymptom = teslaFactory.getSymptom();

        if (!$scope.factorySymptom) {
            return;
        }

        // Default the form value to the previously set search symptom
        $scope.formSymptom = $scope.factorySymptom;
        $scope.sortResultsBySafe = true;
        $scope.someValue = 'Safest';

        $scope.clickDrug = function (result) {
            teslaFactory.setDrug(result.drug);
            teslaFactory.setDrugEventCount(result.eventCount);
        };

        var runSearch = function () {
            //load spinner
            usSpinnerService.spin('spinner');

            if ($scope.formSymptom) {
                searchFactory.getDrugsBySymptom($scope.formSymptom, function (results) {
                    console.log('results returned');
                    console.log(results);
                    $scope.drugResults = results;

                    usSpinnerService.stop('spinner');
                }, function(result){
                    if(result.error.message === 'No matches found!') {
                        usSpinnerService.stop('spinner');
                    }
                });
            }
        };

        runSearch();
    }]);

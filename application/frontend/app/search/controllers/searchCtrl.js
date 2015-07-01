'use strict';

TeslaApp.controller('SearchCtrl', ['teslaFactory', 'searchFactory', 'fdaApiService', '$scope', '$location',
    function (teslaFactory, searchFactory, fdaApiService, $scope, $location) {
        // When the search page is initiated, grab the symptom search term from the teslaFactory
        $scope.factorySymptom = teslaFactory.getSymptom();

        if (!$scope.factorySymptom) {
            var q = $location.search()['q'];
            if (q) {
                $scope.factorySymptom = $scope.searchText = q;
                teslaFactory.setSymptom(q);
            }
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

            if ($scope.formSymptom) {
                searchFactory.getDrugsBySymptom($scope.formSymptom, function (results) {
                    console.log('results returned');
                    console.log(results);
                    $scope.drugResults = results;
                    $scope.noDrugResults = Boolean(!results);
                });
            }
        };

        runSearch();
    }]);

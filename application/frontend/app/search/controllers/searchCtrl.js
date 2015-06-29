'use strict';

TeslaApp.controller('SearchCtrl', ['teslaFactory', 'searchFactory', 'fdaApiService', '$scope', '$location',
        function (teslaFactory, searchFactory, fdaApiService, $scope, $location) {
        // When the search page is initiated, grab the symptom search term from the teslaFactory
        $scope.factorySymptom = teslaFactory.getSymptom();

        // Default the form value to the previously set search symptom
        $scope.formSymptom = $scope.factorySymptom;
        $scope.sortResultsBySafe = true;
        $scope.someValue = 'Safest';

        //var searchString = 'drugindication:' + $scope.formSymptom;

            //****
            // xClick - Clear the search form
            //****
//            $scope.xClick = function () {
//                $scope.formSymptom = "";
//            };

        // ****
        // onSearchClick - Search button click handler from the search page
        // ****
        $scope.onSearchKeypress = function (event) {
            console.log(event.which);
            if (event.which === 13) {
                console.log('enter');
                // Update the factory first to reflect the new search term
                teslaFactory.setSymptom($scope.formSymptom);
                $scope.factorySymptom = $scope.formSymptom;

                if ($location.path() == '/search') {
                    runSearch();
                }
                else {
                    $location.path('/search');
                }


            }
        };

        // ****
        // onSearchClick - Search button click handler from the search page
        // ****
        $scope.onSearchClick = function () {


            // Update the factory first to reflect the new search term
            teslaFactory.setSymptom($scope.formSymptom);
            $scope.factorySymptom = $scope.formSymptom;

            runSearch();
        };

        $scope.clickDrug = function(result) {
            teslaFactory.setDrug(result.drug);
            teslaFactory.setDrugEventCount(result.eventCount);
        };

        var runSearch = function () {

            if ($scope.formSymptom) {
                searchFactory.getDrugsBySymptom($scope.formSymptom, function (results) {
                    $scope.drugResults = results;
                });
            }

        };

        runSearch();

}]);

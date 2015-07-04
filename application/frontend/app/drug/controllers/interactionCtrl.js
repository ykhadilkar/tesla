'use strict';

TeslaApp.controller('InteractionCtrl', ['teslaFactory', 'searchFactory', '$scope', '$location', 'usSpinnerService',
    function (teslaFactory, searchFactory, $scope, $location, usSpinnerService) {

        //get drug
        $scope.drugSelected = teslaFactory.getDrug();

        //if drug is not scope try to get it from URL
        if (!$scope.drugSelected) {
            var drug = $location.search()['drugName'];
            if (drug) {
                $scope.drugSelected = drug;
                teslaFactory.setDrug(drug);
            }
        }

        //get drug interaction
        searchFactory.getDrugInteractions($scope.drugSelected, function (results) {
            $scope.drugInteractions = results;

            //stop spinner
            usSpinnerService.stop('spinner');
        });
}]);
'use strict';

TeslaApp.controller('ProductCtrl', ['teslaFactory', '$scope', '$location', 'usSpinnerService',
    function (teslaFactory, $scope, $location, usSpinnerService) {
        $scope.product = teslaFactory.getProduct();

        //stop spinner
        usSpinnerService.stop('spinner');

        //make sure we have product otherwise direct to home
        if(!$scope.product) {
            //redirect home
            $location.path('/');
            //we can make a call fdaApi to reload product based on Q param given in url
        }
}]);
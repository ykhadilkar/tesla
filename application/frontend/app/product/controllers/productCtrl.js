'use strict';

TeslaApp.controller('ProductCtrl', ['teslaFactory', 'searchFactory', '$scope', '$location', 'usSpinnerService',
    function (teslaFactory, searchFactory, $scope, $location, usSpinnerService) {
        $scope.product = teslaFactory.getProduct();

        //make sure we have product otherwise direct to home
        if(!$scope.product) {
            //redirect home
            $location.path('/');
            //we can make a call fdaApi to reload product based on Q param given in url
        }

        //get product from PillBox by prodCode
        searchFactory.getPillBoxProduct($scope.product.openfda.product_ndc[0]).then(
            function(data) {
                var x2js = new X2JS(); 
                var jsonObj = x2js.xml_str2json( data );

                if(jsonObj.Pills.record_count > 0) {
                    if(jsonObj.Pills.pill.HAS_IMAGE === '1') {
                        $scope.imageID = jsonObj.Pills.pill.image_id;
                    }
                }
            },
            function(error) {
            }
        ).finally(function() {
            //stop spinner
            usSpinnerService.stop('spinner');
        });
}]);
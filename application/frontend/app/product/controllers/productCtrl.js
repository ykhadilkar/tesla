'use strict';

TeslaApp.controller('ProductCtrl', ['teslaFactory', 'searchFactory', '$scope', '$location', 'usSpinnerService',
    function (teslaFactory, searchFactory, $scope, $location, usSpinnerService) {
        $scope.product = teslaFactory.getProduct();

        //get product from PillBox by prodCode
        $scope.getProductImage = function()
        {
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
            }).finally(function() {
                //stop spinner
                usSpinnerService.stop('spinner');
            });
        }

        //make sure we have product otherwise direct to home
        if(!$scope.product) {
            if(!$location.search()['splID']) {
                //redirect home
                $location.path('/');
            }

            //load spinner
            usSpinnerService.spin('spinner');

            //get product(API Call)
            searchFactory.getDrugLabel($location.search()['splID'], function(data){
                if(data.results.length > 0) {
                    $scope.product = data.results[0];

                    //get product image
                    $scope.getProductImage();
                } else {
                    //redirect home: product not found
                    $location.path('/');
                }
            });
        } else {
            //get product picture
            $scope.getProductImage();
        }
}]);
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

        //adverse events
        $scope.runEventSearchByProduct = function () {
            var brandName = $location.search()['brandName'];
            searchFactory.getDrugEventsByBrandName(brandName, function (eventResults) {
                //var totalEvents = eventResults.totalEvents;
                var eventArray = [];
                var count = 0;
                var keepGoing = true;
                angular.forEach(eventResults.effectResults, function (eventResult) {
                    if (keepGoing) {
                        if (count == 9) {
                            keepGoing = false;
                        }

                        var lower = eventResult.term.toLowerCase();
                        var effectString = lower.replace(/(^| )(\w)/g, function (x) {
                            return x.toUpperCase();
                        });

                        eventArray.push({'label': effectString, 'value': eventResult.count});
                        count++;
                    }
                });
                $scope.drugEvents = eventArray;
                $scope.data = [
                    {
                        key: "Adverse Events",
                        values: eventArray
                    }
                ];
            });
        }
        $scope.runRecallsSearchByProduct = function () {
            var brandName = $location.search()['brandName'];
            searchFactory.getDrugRecalls("", brandName, function (drugData) {
                $scope.drugEffectResults = drugData.effectResults;
                $scope.drugRecallsMeta = drugData.meta;
                var recallsData = [];
                var time = 0;
                var count = 0;
                var pattern = /(\d{4})(\d{2})(\d{2})/;
                angular.forEach(drugData.effectResults, function (drugEffectResult) {
                    time = new Date(drugEffectResult.time.replace(pattern, '$1-$2-$3'));
                    count = drugEffectResult.count;
                    recallsData.push({time:time, count:count});
                });

                $scope.drugRecallsData = [
                    {
                        key: "Recalls",
                        values: recallsData
                    }
                ];
            });
        }
        $scope.runEventSearchByProduct();
        $scope.runRecallsSearchByProduct();
        $scope.adverseEvent = "Adverse events from controller";
        $scope.adverseDrugEventsChartOptions = {
            chart: {
                color: ["#004529","#006837","#238443","#41ab5d","#78c679","#addd8e","#d9f0a3","#d9f0a4","#f7fcb9","#f7fcb7"],
                type: 'discreteBarChart',
                height: 500,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 55
                },
                x: function (d) {
                    return d.label;
                },
                y: function (d) {
                    return d.value;
                },
                tooltips: false,
                showValues: true,
                valueFormat: function (d) {
                    return d3.format(',.0f')(d);
                },
                transitionDuration: 1000,
                yAxis: {
                    axisLabel: 'No. of adverse events',
                    axisLabelDistance: 28,
                    tickFormat: d3.format(',.0f')
                },
                xAxis: {
                    rotateLabels: 25
                }
            }
        };
        $scope.drugRecallChartOptions = {
            chart: {
                type: 'lineChart',
                showLegend: false,
                color: ["#004529"],
                forceY:([0]),
                height: 350,
                margin : {
                    top: 80,
                    right: 20,
                    bottom: 60,
                    left: 50
                },
                x: function(d){return d.time;},
                y: function(d){return d.count;},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.0f')(d);
                },
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'Date',
                    tickFormat: function(d) {
                        return d3.time.format('%x')(new Date(d))
                    },
                    rotateLabels: 50,
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'No. of recalls',
                    axisLabelDistance: 35,
                    tickFormat: function(d){
                        return d3.format(',.0f')(d);
                    },
                    showMaxMin: true
                },
                tooltips:true
            }
        };

        //mobile: show only selected label info
        $scope.showLabelInfo = function(oLabelInfo) {
            oLabelInfo = JSON.parse(oLabelInfo);
            if($scope.product.hasOwnProperty(oLabelInfo.key)){
                $scope.selectedLabelInfo = {
                    'title': oLabelInfo.val,
                    'text': $scope.product[oLabelInfo.key][0]
                };
            } else if($scope.product.openfda.hasOwnProperty(oLabelInfo.key)){
                $scope.selectedLabelInfo = {
                    'title': oLabelInfo.val,
                    'text': $scope.product.openfda[oLabelInfo.key][0]
                };
            }
        };
}]);
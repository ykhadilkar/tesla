'use strict';

TeslaApp.controller('DrugCtrl', ['teslaFactory', 'searchFactory', 'fdaApiService', '$scope', '$location', 'usSpinnerService',
    function (teslaFactory, searchFactory, fdaApiService, $scope, $location, usSpinnerService) {

        // Default to All Ages
        $scope.ageGroup = 0;
        $scope.genderSelected = 9;
        // Set Age Group Text Values
        $scope.ageDesc = ['All Ages', '0-17', '18-35', '36-55', '56+'];

        //if drug is not scope try to get it from URL
        if (!$scope.drugSelected) {
            var drug = $location.search()['drugName'];
            if (drug) {
                $scope.drugSelected = drug;
                teslaFactory.setDrug(drug);
            }
        }

        //if event count is not scope try to get it from URL
        if (!$scope.drugEventCount) {
            var count = $location.search()['count'];
            if (count) {
                $scope.drugEventCount = count;
                teslaFactory.setDrugEventCount(count);
            }
        }

        // When the search page is initiated, grab the symptom search term from the teslaFactory
        $scope.factorySymptom = teslaFactory.getSymptom();
        $scope.drugSelected = teslaFactory.getDrug();
        $scope.drugEventCount = teslaFactory.getDrugEventCount();

        $scope.genderButtonClick = function (gender) {
            if (gender === $scope.genderSelected) {
                $scope.genderSelected = 9;
            } else {
                $scope.genderSelected = gender;
            }

            $scope.runEventSearch();
        };

        $scope.runEventSearch = function () {
            $scope.ageText = $scope.ageDesc[$scope.ageGroup - 1];

            var ageMin = 0;
            var ageMax = 150;

            // translate
            switch ($scope.ageGroup) {
                case 1:
                    // Defaults are fine, do nothing
                    break;
                case 2:
                    ageMax = 17;
                    break;
                case 3:
                    ageMin = 18;
                    ageMax = 35;
                    break;
                case 4:
                    ageMin = 36;
                    ageMax = 55;
                    break;
                case 5:
                    ageMin = 56;
                    ageMax = 150;
                    break;
                default:
                    ageMin = 0;
                    ageMax = 150;
                    break;
            }

            searchFactory.getDrugEvents($scope.drugSelected, $scope.genderSelected, ageMin, ageMax, function (eventResults) {
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
        };

        $scope.runRecallsSearch = function () {
            searchFactory.getDrugRecalls($scope.drugSelected, function (drugData) {
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
        };

        $scope.runInteractionSearch = function () {
            searchFactory.getDrugInteractions($scope.drugSelected, function (results) {
                $scope.drugInteractions = results;
            });
        };

        $scope.runLabelsSearch = function () {
            searchFactory.getDrugLabels($scope.drugSelected, function (data) {
                var aBrandNames = [];
                //get only unique values case-sensitive
                $scope.products = _.uniq(data.results, false, function (oObject) {
                    return oObject.openfda.brand_name[0].toLowerCase();
                });
            });
        };

        /**
         * go to product page
         * 
         * @param object product
         * @returns void
         */
        $scope.gotoProduct = function (product) {
            //show spinner
            usSpinnerService.spin('spinner');
            //store product into tesla factory
            teslaFactory.setProduct(product);
            //goto to product page
            $location.path('/product').search(
            {
                'drugName': $scope.drugSelected,
                'brandName': product.openfda.brand_name, 
                'splID': product.openfda.spl_id[0],
                'symptom': $location.search()['symptom'],
            });
        };

        /**
         * go to interaction page
         * 
         * @returns void
         */
        $scope.gotoInteraction = function () {
            //show spinner
            usSpinnerService.spin('spinner');
            //store drugname into tesla factory
            teslaFactory.setDrug($scope.drugSelected);
            //goto to product page
            $location.path('/interaction').search(
            {
                'drugName': $scope.drugSelected,
                'symptom': $location.search()['symptom'],
            });
        };

        $scope.runEventSearch();
        $scope.runRecallsSearch();
        $scope.runInteractionSearch();
        $scope.runLabelsSearch();
        $scope.adverseEventsChartOptions = {
            chart: {
                //color: ["#004529","#006837","#238443","#41ab5d","#78c679","#addd8e","#d9f0a3","#f7fcb9","#ffffe5"],
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
        $scope.recallChartOptions = {
            chart: {
                type: 'lineChart',
                forceY:([0]),
                height: 350,
                margin : {
                    top: 20,
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
                    axisLabel: 'X Axis',
                    tickFormat: function(d) {
                        return d3.time.format('%x')(new Date(d))
                    },
                    rotateLabels: 50,
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: 35,
                    tickFormat: function(d){
                        return d3.format(',.0f')(d);
                    },
                    showMaxMin: true
                },
                tooltips:true
            }
        };
    }]);
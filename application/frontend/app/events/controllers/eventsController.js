'use strict';

angular.module('teslaApp.events', ['ngRoute'])

    .controller('EventsCtrl', ['teslaFactory', 'searchFactory', 'fdaApiService', '$scope', '$location',
        function (teslaFactory, searchFactory, fdaApiService, $scope, $location) {

            // Default to All Ages
            $scope.ageGroup = 0;
            $scope.genderSelected = 9;
            // Set Age Group Text Values
            $scope.ageDesc = ['All Ages', '0-17', '18-35', '36-55', '56+'];

            if (!$scope.drugSelected) {
                var drug = $location.search()['drug'];
                if (drug) {
                    $scope.drugSelected = drug;
                    teslaFactory.setDrug(drug);
                }
            }
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

            $scope.genderButtonClick = function(gender){
                if(gender == $scope.genderSelected)
                {
                    $scope.genderSelected = 9;
                }
                else
                {
                    $scope.genderSelected = gender;
                }

                $scope.runEventSearch();
            }

            $scope.runEventSearch = function(){
                $scope.ageText = $scope.ageDesc[$scope.ageGroup-1];

                var ageMin=0;
                var ageMax=150;

                // translate
                switch($scope.ageGroup) {
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
                };//switch

                searchFactory.getDrugEvents($scope.drugSelected, $scope.genderSelected, ageMin, ageMax, function(eventResults){
                    var totalEvents = eventResults.totalEvents;
                    var eventArray = [];
                    angular.forEach(eventResults.effectResults, function(eventResult){
                        var effectPercent = eventResult.count / $scope.drugEventCount * 100;
                        effectPercent = effectPercent.toFixed(2)

                        var lower = eventResult.term.toLowerCase();
                        var effectString = lower.replace(/(^| )(\w)/g, function(x) {
                            return x.toUpperCase();
                        });

                       eventArray.push({'event':effectString, 'count':eventResult.count, 'percent':effectPercent });
                    });
                    $scope.drugEvents = eventArray;
                });
            };

            $scope.runRecallsSearch = function() {
                searchFactory.getDrugRecalls($scope.drugSelected, function (drugData) {
                    $scope.drugEffectResults = drugData.effectResults;
                    $scope.drugRecallsMeta = drugData.meta;
                });
            };

            $scope.runInteractionSearch = function() {
                searchFactory.getDrugInteractions($scope.drugSelected, function(results){
                   $scope.drugInteractions = results;
                });
            };

            $scope.runEventSearch();
            $scope.runRecallsSearch();
            $scope.runInteractionSearch();

        }]);


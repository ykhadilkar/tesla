TeslaApp.controller('autoCompleteCtrl',
    ['teslaFactory', 'searchFactory', '$scope', '$location', '$timeout', '$q', '$log', 'usSpinnerService',
        function (teslaFactory, searchFactory, $scope, $location, $timeout, $q, $log, usSpinnerService) {
        var self = this;
        self.simulateQuery = true;
        self.isDisabled = false;
        self.querySearch = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange = searchTextChange;

        if ('/search' == $location.path()) {
                self.searchTextChange($location.search().q);
            }

            if ('/' == $location.path()) {
                self.searchText = '';
        }

        function querySearch(query) {
            //make sure query not null before performing ajax (autocomplete)
            if (query) {
                var deferred = $q.defer();
                //call autocomplete
                searchFactory.autoComplete(query)
                    .then(function (data) {
                        if (!data) {
                            deferred.reject('empty response');
                        } else {
                            //re-structure data for ngAutocomplete
                            deferred.resolve(data.map(function (synonym) {
                                return {
                                    value: synonym,
                                    display: synonym.toLowerCase()
                                };
                            }));
                        }
                    });

                return deferred.promise;
            }
            //important to clear list items when the term is null/empty
            return [];
        }

        function searchTextChange(text) {
            self.searchText = text;

            //save term in teslaFactory for search page purposes
            teslaFactory.setSymptom(text);

            //$scope.loadDrugsBySymptom(text);

            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            if (!item || !('value' in item)) {
                return;
            }

            //save term in teslaFactory for search page purposes
            teslaFactory.setSymptom(item.value);

            $scope.loadDrugsBySymptom(item.value);

            $log.info('Item changed to ' + JSON.stringify(item));
        }

        //Populating drugs based on Autocomplete
        $scope.loadDrugsBySymptom = function (symptom) {
            if (symptom) {
                //load spinner
                usSpinnerService.spin('spinner');

                //get drugs and populate dropdown list
                searchFactory.getDrugsBySymptom(symptom, function (results) {
                    $scope.drugResults = results;
                    usSpinnerService.stop('spinner');
                }, function(result){
                    if(result.error.message === 'No matches found!') {
                        usSpinnerService.stop('spinner');
                        $scope.drugResults = [];
                    }
                });
            }
        };

        //set selected drug
        $scope.setSelectedDrug = function(drug){
            teslaFactory.setDrug(drug.drug);
            teslaFactory.setDrugEventCount(drug.eventCount);

            //goto to drug page
            $location.path('/drug').search({'drugName':drug.drug,count:drug.eventCount});
        };
    }]);

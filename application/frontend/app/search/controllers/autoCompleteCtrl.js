TeslaApp.controller('autoCompleteCtrl',
    ['teslaFactory', 'searchFactory', '$scope', '$location', '$timeout', '$q', '$log', 'usSpinnerService',
        function (teslaFactory, searchFactory, $scope, $location, $timeout, $q, $log, usSpinnerService) {
        var self = this;
        self.simulateQuery = true;
        self.isDisabled = false;
        self.querySearch = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange = searchTextChange;
        var symptom = (teslaFactory.getSymptom()) ? teslaFactory.getSymptom().toLowerCase() : '';
        symptom = (!symptom) ? $location.search()['symptom'] : symptom;
        var drug = (teslaFactory.getDrug()) ? teslaFactory.getDrug().toLowerCase() : '';
        drug = (!drug) ? $location.search()['drugName'] : drug;

        //Populating drugs based on Autocomplete
        $scope.loadDrugsBySymptom = function (symptom) {
            if (symptom) {
                //load spinner
                usSpinnerService.spin('spinner');

                //get drugs and populate dropdown list
                searchFactory.getDrugsBySymptom(symptom, function (results) {
                    $scope.drugResults = results;

                    //select current drug in dropdown list
                    if(drug) {
                        _.find($scope.drugResults, function(oVal){
                            if(drug === oVal.drug) {
                                $scope.drug = oVal;
                            }
                        });
                    } else {
                        expandSelector('drugSelector');
                    }

                    usSpinnerService.stop('spinner');
                }, function(result){
                    if(result.error.message === 'No matches found!') {
                        usSpinnerService.stop('spinner');
                        $scope.drugResults = [];
                    }
                });
            }
        };

        //set symptom in autocomplete field
        if(!self.searchText) {
            self.searchText = symptom;

            //load drugs to populate dropdown
            $scope.loadDrugsBySymptom(symptom);
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

            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            if (!item || !('value' in item)) {
                return;
            }

            //save term in teslaFactory for search page purposes
            teslaFactory.setSymptom(item.value);
            self.searchText = item.display;

            $scope.loadDrugsBySymptom(item.value);

            $log.info('Item changed to ' + JSON.stringify(item));
        }

        //set selected drug
        $scope.setSelectedDrug = function(drug){
            teslaFactory.setDrug(drug.drug);
            teslaFactory.setDrugEventCount(drug.eventCount);

            //goto to drug page
            $location.path('/drug').search(
            {
                'symptom': self.searchText,
                'drugName': drug.drug,
                'count': drug.eventCount
            });
        };
    }]);

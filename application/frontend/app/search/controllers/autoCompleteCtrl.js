TeslaApp.controller('autoCompleteCtrl', ['teslaFactory', 'searchFactory', '$scope', '$location', '$timeout', '$q', '$log',
    function (teslaFactory, searchFactory, $scope, $location, $timeout, $q, $log) {
        var self = this;
        self.simulateQuery = true;
        self.isDisabled = false;
        self.querySearch = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange = searchTextChange;

        if ('/search' == $location.path()) {
            var query = $location.search()['q'];
            if (query) {
                self.searchTextChange(query);
            }
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

            //submit form to search result
            $scope.factorySymptom = text;

            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            if (!item || !('value' in item)) {
                return;
            }

            //save term in teslaFactory for search page purposes
            teslaFactory.setSymptom(item.value);

            //submit form to search result
            $scope.factorySymptom = item.value;

            //submit search result on item selected
            $location.path('/search').search('q', item.value.toLowerCase());

            $log.info('Item changed to ' + JSON.stringify(item));
        }

        //user hit enter and submit form
        $scope.submitSearch = function (event) {
            $location.path('/search').search('q', teslaFactory.getSymptom().toLowerCase());

            event.preventDefault();
        };
    }]);

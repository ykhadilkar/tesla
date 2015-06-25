'use strict';

TeslaApp.factory('searchFactory', ['fdaApiService', 'rxNormApiService', 'backendApiService', 'teslaFactory', '$q', function (fdaApiService, rxNormApiService, backendApiService, teslaFactory, $q) {

    return {
        /**
         *
         * @param symptom
         * @param callback
         */
        getDrugsBySymptom: function (symptom, callback) {

            // Initialize an empty array to store the promises for the 2 OpenFDA API calls. These can be run in parallel.
            var promises = [];

            // Build the API search string for label search for usage
            var labelSearchString = "indications_and_usage:" + symptom;

            var synonymsPromise = backendApiService.getConditionSynonyms(symptom);

            synonymsPromise.then(function (synonymResult) {

                    var conditionString = '"' + symptom + '"';

                    _.each(synonymResult, function(syn){ conditionString = conditionString + '+"' + syn + '"' });

                    // Build the API search string for search by symptom
                    var drugEventSearchString = "drugindication:" + conditionString;
                    var labelSearchString = "indications_and_usage:" + conditionString;

                    promises.push(fdaApiService.getDrugEvent(fdaApiService.queryBuilder()
                        .searchString(drugEventSearchString).setCount('medicinalproduct')));
                    promises.push(fdaApiService.getDrugLabel(fdaApiService.queryBuilder()
                        .searchString(labelSearchString).setCount('substance_name')));

                    // When both OpenFDA API calls are complete, execute the remainder of the code.
                    $q.all(promises).then(
                        function (datasets) {
                            // Dataset 0 is the response for drug events
                            var eventDrugs = datasets[0].results;
                            // Dataset 1 is the response for drug labels
                            var labelDrugs = datasets[1].results;

                            var eventDrugList = _.pluck(eventDrugs, 'term');
                            var labelDrugList = _.pluck(labelDrugs, 'term');
                            var mergedDrugList = _.intersection(eventDrugList, labelDrugList);

                            // Remove terms we know are not really drug names.
                            mergedDrugList = _.without(mergedDrugList, 'acid', 'sodium', 'sulfate', 'calcium', 'unspecified');

                            console.log('filteredMergedDrugList : ', mergedDrugList);

                            // Initialize array to store the promises from each RXNorm API Call
                            var RXNormPromises = [];

                            angular.forEach(mergedDrugList, function (drug) {

                                var rxNormSearchString = 'name=' + drug;

                                RXNormPromises.push(rxNormApiService.getDrugInfo(rxNormApiService.queryBuilder()
                                    .searchString(rxNormSearchString)));
                            });

                            var drugResults = [];
                            $q.all(RXNormPromises).then(
                                function (rxDataSets) {
                                    var brandNames = [];
                                    angular.forEach(rxDataSets, function (rxDataset) {

                                        console.log('DataSet');
                                        console.log(rxDataset);
                                        var drug = rxDataset.drugGroup.name;

                                        // Grab the full list of brands returned from RXNorm available for this substance.
                                        if(!_.isUndefined(rxDataset.drugGroup.conceptGroup)){
                                            var groupArray = rxDataset.drugGroup.conceptGroup[2].conceptProperties;
                                            var groupNames = _.pluck(groupArray, 'name');
                                            angular.forEach(groupNames, function (value) {
                                                var words = value.match(/[^[\]]+(?=])/g);
                                                brandNames.push(words[0]);
                                            });
                                        }


                                        var popularBrands = _.chain(brandNames)
                                            .countBy()
                                            .pairs()
                                            .sortBy(function (c) {
                                                return -c[1]
                                            })
                                            .map(function (c) {
                                                return c[0]
                                            })
                                            .value();


                                        var matchedRecord = _.findWhere(eventDrugs, {"term": drug});
                                        var drugCap = drug.charAt(0).toUpperCase() + drug.slice(1);
                                        drugResults.push({
                                            "drug": drugCap,
                                            "eventCount": matchedRecord.count,
                                            "popularBrands": popularBrands
                                        });
                                    });

                                });
                            callback(drugResults);
                        });



                }
            )
        },

        /**
         *
         * @param drug
         * @param gender = The sex of the patient. 0 = Unknown, 1 = Male, 2 = Female
         * @param ageMin
         * @param ageMax
         * @param callback
         */
        getDrugEvents: function (drug, gender, ageMin, ageMax, callback) {

            var drugData = {};
            var drugEventSearchDrug = "patient.drug.medicinalproduct:" + drug;
            var drugEventSearchGender = "patient.patientsex:" + gender;
            var drugEventSearchAgeGroup = "patient.patientonsetage:["+ ageMin +"+TO+"+ ageMax +"]";
            var drugEventSearchString = drugEventSearchDrug + "+AND+" + drugEventSearchGender + "+AND+" + drugEventSearchAgeGroup;

            var eventsPromise = fdaApiService.getDrugEvent(fdaApiService.queryBuilder()
                .searchString(drugEventSearchString).setCount('patient.reaction.reactionmeddrapt.exact'));

            eventsPromise.then(function (eventResult) {
                var resultsArray = eventResult.results;
                drugData.effectResults = resultsArray;
                callback(drugData);
            });
        },
        /**
         *
         * @param symptom
         * @param callback
         */
        getConditionSynonyms: function (symptom, callback){
            backendApiService.getConditionSynonyms(symptom).then(results)
            {
                console.log('inCtrlbackend :');
                console.log(results);

                callback(results);
            }

        }
    };
}]);


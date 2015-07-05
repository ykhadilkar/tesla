'use strict';

TeslaApp.factory('searchFactory', ['fdaApiService', 'rxNormApiService', 'backendApiService', 'teslaFactory', '$q',
    function (fdaApiService, rxNormApiService, backendApiService, teslaFactory, $q) {

    return {
        /**
         *
         * @param symptom
         * @param callbackSuccess
         * @param callbackError
         */
        getDrugsBySymptom: function (symptom, callbackSuccess, callbackError) {
            // Initialize an empty array to store the promises for the 2 OpenFDA API calls. These can be run in parallel.
            var promises = [];

            // Build the API search string for backend
            var oParam = {"search": teslaFactory.elasticQueryString(symptom)};

            var synonymsPromise = backendApiService.getConditionSynonyms(oParam);

            var conditionString = '"' + teslaFactory.elasticQueryString(symptom) + '"';
            synonymsPromise.then(
                function (synonymResult) {
                    _.each(synonymResult, function (syn) {
                        conditionString = conditionString + '+"' + teslaFactory.elasticQueryString(syn) + '"'
                    });
                }).catch(
                function (error) {
                    //Do Nothing
                }).finally(
                function () {
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
                            mergedDrugList = _.without(mergedDrugList, 'acid', 'sodium', 'sulfate', 'calcium', 'hydrochloride', 'unspecified');

                            //console.log('filteredMergedDrugList : ', mergedDrugList);
                            var drugResults = [];

                            angular.forEach(mergedDrugList, function(drug){
                                    drugResults.push({
                                        "drug": drug
                                    });
                            });

                            callbackSuccess(drugResults);

                            //// Initialize array to store the promises from each RXNorm API Call
                            //var RXNormPromises = [];

                            //angular.forEach(mergedDrugList, function (drug) {
                            //
                            //    var rxNormSearchString = 'name=' + drug;
                            //
                            //    RXNormPromises.push(rxNormApiService.getDrugInfo(rxNormApiService.queryBuilder()
                            //        .searchString(rxNormSearchString)));
                            //});

                            //
                            //$q.all(RXNormPromises).then(
                            //    function (rxDataSets) {
                            //        var brandNames = [];
                            //        angular.forEach(rxDataSets, function (rxDataset) {
                            //
                            //            //console.log('DataSet');
                            //            //console.log(rxDataset);
                            //            var drug = rxDataset.drugGroup.name;
                            //
                            //            // Grab the full list of brands returned from RXNorm available for this substance.
                            //            if (!_.isUndefined(rxDataset.drugGroup.conceptGroup)) {
                            //                var groupArray = rxDataset.drugGroup.conceptGroup[2].conceptProperties;
                            //                var groupNames = _.pluck(groupArray, 'name');
                            //                angular.forEach(groupNames, function (value) {
                            //                    var words = value.match(/[^[\]]+(?=])/g);
                            //                    brandNames.push(words[0]);
                            //                });
                            //            }
                            //
                            //            var popularBrands = _.chain(brandNames)
                            //                .countBy()
                            //                .pairs()
                            //                .sortBy(function (c) {
                            //                    return -c[1]
                            //                })
                            //                .map(function (c) {
                            //                    return c[0]
                            //                })
                            //                .value();
                            //
                            //
                            //            var matchedRecord = _.findWhere(eventDrugs, {"term": drug});
                            //            var drugCap = drug.charAt(0).toUpperCase() + drug.slice(1);
                            //            drugResults.push({
                            //                "drug": drugCap,
                            //                "eventCount": matchedRecord.count,
                            //                "popularBrands": popularBrands
                            //            });
                            //        });
                            //
                            //    });
                            //callbackSuccess(drugResults);
                        },
                        function(error)
                        {
                            callbackError(error);
                        });
                })
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
            var drugEventSearchString = "patient.drug.medicinalproduct:" + drug;
            //console.log('1 ', drugEventSearchString);
            if (gender !== 9) {
                var drugEventSearchString = drugEventSearchString + "+AND+patient.patientsex:" + gender;
            }

            //console.log('2 ', drugEventSearchString);
            drugEventSearchString = drugEventSearchString + "+AND+patient.patientonsetage:[" + ageMin + "+TO+" + ageMax + "]";

            //console.log('3 ', drugEventSearchString);
            var eventsPromise = fdaApiService.getDrugEvent(fdaApiService.queryBuilder()
                .searchString(drugEventSearchString).setCount('patient.reaction.reactionmeddrapt.exact'));

            eventsPromise.then(function (eventResult) {

                var countPromise = fdaApiService.getDrugEvent(fdaApiService.queryBuilder()
                    .searchString(drugEventSearchString));

                countPromise.then(function (countResult) {
                    var resultsArray = eventResult.results;
                    var totalCount = 0;
                    _.each(resultsArray, function (val) {
                        totalCount = totalCount + val.count
                    });
                    drugData.effectResults = resultsArray;
                    drugData.totalEvents = countResult.meta.results.total;
                    callback(drugData);
                });
            });
        },

        /**
         *
         * @param drug
         * @param callback
         */
        getDrugRecalls: function (drug, callback) {
            var drugData = {};
            var drugRecallsSearchString = "product_description:" + drug + "&count=report_date";
            var recallsPromise = fdaApiService.getDrugRecall(fdaApiService.queryBuilder()
                .searchString(drugRecallsSearchString));

            recallsPromise.then(function (eventResult) {
                drugData.effectResults = eventResult.results;
                drugData.meta = eventResult.meta;
                callback(drugData);
            });
        },

        /**
         *
         * @param symptom
         * @param callback
         */
        getConditionSynonyms: function (symptom, callback) {
            backendApiService.getConditionSynonyms(symptom).then(function (results) {
                callback(results);
            });
        },

        /**
         *
         * @param drug
         * @param callback
         */
        getDrugInteractions: function (drug, callback) {

            var rxNormSearchString = 'name=' + drug;

            rxNormApiService.getRxCUI(rxNormApiService.queryBuilder()
                .searchString(rxNormSearchString)).then(function (rxNormResults) {
                if(typeof rxNormResults.idGroup.rxnormId === 'undefined') {
                    return;
                }
                var rxcui = rxNormResults.idGroup.rxnormId[0];

                var interactionSearchString = 'rxcui=' + rxcui;
                rxNormApiService.getDrugInteractions(interactionSearchString).then(function (intResults) {
                    var finalInteractions = [];
    
                    if(typeof intResults.interactionTypeGroup !== 'undefined') {
                        angular.forEach(intResults.interactionTypeGroup[0].interactionType[0].interactionPair, function (intPair) {
                            var intDescription = intPair.description;

                            var intDrug = intPair.interactionConcept[1].minConceptItem.name;
                            finalInteractions.push({'drug': intDrug, 'interaction': intDescription});
                        });
                    }

                    callback(finalInteractions);

                }); // rxNormApiService.getDrugInteractions
            }); //rxNormApiService.getDrugInfo
        } // getDrugInteractions
        ,
        /**
         * get drug labels (items) by substance_name
         * @param string drug
         * @return void
         */
        getDrugLabels: function(drug, callback){
            var drugData = {};
            var drugLabelSearchString = "substance_name:" + teslaFactory.elasticQueryString(drug);
            var labelsPromise = fdaApiService.getDrugLabel(fdaApiService.queryBuilder()
                .searchString(drugLabelSearchString)
                .setLimit(50)
            );

            //brand_name
            labelsPromise.then(function (labelResult) {
                callback(labelResult);
            });
        },
        /**
         * get drug label by spl_id
         * @param string splID
         * @return void
         */
        getDrugLabel: function(splID, callback){
            var drugData = {};
            var drugLabelSearchString = "spl_id:" + teslaFactory.elasticQueryString(splID);
            var labelsPromise = fdaApiService.getDrugLabel(fdaApiService.queryBuilder()
                .searchString(drugLabelSearchString)
                .setLimit(1)
            );

            //brand_name
            labelsPromise.then(function (labelResult) {
                callback(labelResult);
            });
        },
        /**
         * get product from pillBox API (backend)
         *
         * @param String prodCode
         * @param Fn callbackSuccess
         * @param Fn callbackError
         * @returns {$q@call;defer.promise}
         */
        getPillBoxProduct: function(prodCode){
            var oParam = {
                "prodcode": prodCode,
            };

            return backendApiService.getProduct(oParam);
        },
        /**
         * AutoCompleete synonyms
         *
         * @param string term
         * @returns {$q@call;defer.promise}
         */
        autoComplete: function (term) {
            //build API Query
            var oParam = {
                "search": term
            };
            return backendApiService.autoComplete(oParam);
        }
    };
}]);


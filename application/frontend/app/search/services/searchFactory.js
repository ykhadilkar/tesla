'use strict';

TeslaApp.factory('searchFactory', ['fdaApiService', 'rxNormApiService', 'teslaFactory', '$q', function(fdaApiService, rxNormApiService, teslaFactory, $q){

  return {
    getDrugsBySymptom: function(symptom, callback) {

      // Initialize an empty array to store the promises for the 2 OpenFDA API calls. These can be run in parallel.
      var promises = [];

      // Build the API search string for search by symptom
      var drugEventSearchString = "drugindication:" + symptom;

      // Build the API search string for label search for usage
      var labelSearchString = "indications_and_usage:" + symptom;


      promises.push(fdaApiService.getDrugEvent(fdaApiService.queryBuilder()
        .searchString(drugEventSearchString).setCount('medicinalproduct')));
      promises.push(fdaApiService.getDrugLabel(fdaApiService.queryBuilder()
        .searchString(labelSearchString).setCount('substance_name')));

      // When both OpenFDA API calls are complete, execute the remainder of the code.
      $q.all(promises).then(
        function(datasets){
          // Dataset 0 is the response for drug events
          var eventDrugs = datasets[0].results;
          // Dataset 1 is the response for drug labels
          var labelDrugs = datasets[1].results;

          var eventDrugList = _.pluck(eventDrugs, 'term');
          var labelDrugList = _.pluck(labelDrugs, 'term');
          var mergedDrugList = _.intersection(eventDrugList,labelDrugList);

          // Remove terms we know are not really drug names.
          mergedDrugList = _.without(mergedDrugList, 'acid', 'sodium', 'sulfate', 'calcium', 'unspecified');

          console.log('filteredMergedDrugList : ', mergedDrugList);

          // Initialize array to store the promises from each RXNorm API Call
          var RXNormPromises = [];

          angular.forEach(mergedDrugList, function(drug) {

            var rxNormSearchString = 'name=' + drug;

            RXNormPromises.push(rxNormApiService.getDrugInfo(rxNormApiService.queryBuilder()
              .searchString(rxNormSearchString)));
          });

          var drugResults = [];
          $q.all(RXNormPromises).then(
            function(rxDataSets){
              angular.forEach(rxDataSets, function(rxDataset){

                console.log('DataSet');
                console.log(rxDataset);
                var drug = rxDataset.drugGroup.name;
                // Grab the full list of brands returned from RXNorm available for this substance.
                var groupArray = [];
                groupArray = rxDataset.drugGroup.conceptGroup[2].conceptProperties;
                var groupNames = _.pluck(groupArray, 'name');
                var brandNames = [];
                angular.forEach(groupNames, function (value) {
                  var words = value.match(/[^[\]]+(?=])/g);
                  brandNames.push(words[0]);
                });

                var popularBrands = _.chain(brandNames)
                  .countBy()
                  .pairs()
                  .sortBy(function (c) { return -c[1] })
                  .map(function (c) { return c[0] })
                  .value();


                var matchedRecord = _.findWhere(eventDrugs, {"term": drug} );
                var drugCap = drug.charAt(0).toUpperCase() + drug.slice(1);
                drugResults.push({"drug":drugCap, "eventCount":matchedRecord.count, "popularBrands":popularBrands} );

              });

            });

            callback(drugResults);

        }
      )
    }
  };

  }
]);

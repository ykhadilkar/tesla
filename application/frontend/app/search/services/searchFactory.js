'use strict';

TeslaApp.factory('searchFactory', ['fdaApiService', 'teslaFactory', '$q', function(fdaApiService, teslaFactory, $q){
  var symptom = "headache";


  return {
    getDrugsBySymptom: function(symptom, callback) {

      var promises = [];

      var drugEventSearchString = "drugindication:" + symptom;
      var labelSearchString = "indications_and_usage:" + symptom;

      promises.push(fdaApiService.getDrugEvent(fdaApiService.queryBuilder()
        .searchString(drugEventSearchString).setCount('medicinalproduct')));
      promises.push(fdaApiService.getDrugLabel(fdaApiService.queryBuilder()
        .searchString(labelSearchString).setCount('substance_name')));
//      promises.push(fdaApiService.getDrugLabel(fdaApiService.queryBuilder().searchString(symptom).setLimit(50)));

      $q.all(promises).then(
        function(datasets){
          var eventDrugs = datasets[0].results;
          var labelDrugs = datasets[1].results;

          var eventDrugList = _.pluck(eventDrugs, 'term');
          var labelDrugList = _.pluck(labelDrugs, 'term');
          var mergedDrugList = _.intersection(eventDrugList,labelDrugList);

          var drugResults = [];
          angular.forEach(mergedDrugList, function(drug){
            var matchedRecord = _.findWhere(eventDrugs, {"term": drug} );
            drugResults.push({"drug":drug, "eventCount":matchedRecord.count});
          });

          console.log('in factory');
          console.log(drugResults);
          callback(drugResults);

        }
      )
    }
  };

  }
]);

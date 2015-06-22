'use strict';

TeslaApp.factory('searchFactory', ['fdaApiService', function(fdaApiService){
  var symptom = "headache";

  return {
    getDrugsBySymptom: function(inString, callback) {
      fdaApiService.getDrugEvent(fdaApiService.queryBuilder().searchString(inString).setLimit(10), function (data) {
        var results = data.results;
        callback(data.results);
      });
    }
  };

  }
]);

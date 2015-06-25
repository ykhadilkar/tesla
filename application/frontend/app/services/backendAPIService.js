'use strict';

TeslaApp.service('backendApiService', ['$http', '$q', function ($http, $q) {
  var baseUrl = 'http://52.1.147.83:3000';

  var endPoints = {
    "synonym": '/symptom/synonym.json'
  };

  this.endpoints = endPoints;

  var apiCall = function (endpoint, query) {
//    if ('object' == typeof query) {
  //    query = query.build();
    //}

    console.log('In Backend API apiCall');
    var deferred = $q.defer();
    $http.get(baseUrl + endpoint).success(function (data) {
      console.log('in API Call Success');
      console.log(data);
      deferred.resolve(data);
    }).error(function (data, status) {
      deferred.reject(data);
      console.log(status + ": could not get api data. Reason: " + data);
    })
    return deferred.promise;
  };

  //  Drug APIs
  this.getConditionSynonyms = function (condition) {
    console.log('in getConditionSynonyms');
    return apiCall(endPoints.synonym, condition);
  };
}]);

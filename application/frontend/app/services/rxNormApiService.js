'use strict';

TeslaApp.service('rxNormApiService', ['$http', '$q', function ($http, $q) {
  var baseUrl = 'http://rxnav.nlm.nih.gov/REST';

  var endPoints = {
    'drugInfo': '/drugs?'
  };

  var apiCall = function (endpoint, query) {
    if ('object' == typeof query) {
      query = query.build();
    }

    var deferred = $q.defer();
    $http.get(
      baseUrl + endpoint + query
    ).success(function (data) {
        deferred.resolve(data);
      }).error(function (data, status) {
        deferred.reject(data)
        console.log(status + ": could not get api data. Reason: " + data);
      });
    return deferred.promise;
  };

  var rxNormQueryBuilder = function () {
    this.search = '';
    return this;
  };


  rxNormQueryBuilder.prototype.searchString = function (str) {
    this.search = str;
    return this;
  };

  rxNormQueryBuilder.prototype.build = function () {
    var query = '';
    query += this.search;
    return query;
  };

  //  Drug APIs
  this.getDrugInfo = function (query) {
    return apiCall(endPoints.drugInfo, query);
  };


  this.endpoints = endPoints;
  this.queryBuilder = function() {
    return new rxNormQueryBuilder();
  };

}]);

'use strict';

TeslaApp.factory('fdaApiService', ['$http', '$q', function ($http, $q) {
  var baseUrl = '//api.fda.gov';
  ///drug/event.json?api_key=MQcYBmlcJ41XLzrsgZyaRGlpDwEgm80uWtvxtAUi&search=headache';

  var endPoints = {
    'apiStatus' : '/status',
    'drugRecall' : '/drug/enforcement.json',
    'drugEvent' : '/drug/event.json',
    'drugLabel' : '/drug/label.json',
    'deviceRecall' : '/device/enforcement.json',
    'deviceEvent' : '/device/event.json',
    'foodRecall' : '/food/enforcement.json'
  }

  var apiKey = 'MQcYBmlcJ41XLzrsgZyaRGlpDwEgm80uWtvxtAUi';  //  free api key
  var apiPrefix = '?api_key=' + apiKey + '&search=';


  return {
    apiStatus: function(callback) {
      $http.get(baseUrl + endPoints.apiStatus).success(function(data) {
        callback(data);
      });
    },
    getDrugRecalls: function(query, callback) {
      $http.get(
        baseUrl + endPoints.drugRecall + apiPrefix + query
      ).success(function(data) {
        callback(data);
      });
    }
  }

}]);

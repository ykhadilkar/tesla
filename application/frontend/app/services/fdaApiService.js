'use strict';

TeslaApp.service('fdaApiService', ['$http', function ($http) {
  var baseUrl = 'https://api.fda.gov';

  var apiKey = 'MQcYBmlcJ41XLzrsgZyaRGlpDwEgm80uWtvxtAUi';  //  free api key
  var apiPrefix = '?api_key=' + apiKey;
  //  /drug/event.json?search=headache';


  var endPoints = {
    "apiStatus": '/status',

    'drugRecall': '/drug/enforcement.json',
    'drugEvent': '/drug/event.json',
    'drugLabel': '/drug/label.json',

    'deviceRecall': '/device/enforcement.json',
    'deviceEvent': '/device/event.json',

    'foodRecall': '/food/enforcement.json'
  }

  var apiCall = function (endpoint, query, callback) {
    $http.get(
      baseUrl + endpoint + apiPrefix + query
    ).success(function (data) {
        callback(data);
      });
  };

  this.getDrugRecall = function (query, callback) {
    apiCall(endPoints.drugRecall, query, callback);
  };
  this.getDrugEvent = function (query, callback) {
    apiCall(endPoints.drugEvent, query, callback);
  };
  this.getDrugLabel = function (query, callback) {
    apiCall(endPoints.drugLabel, query, callback);
  };

  this.getDeviceRecall = function (query, callback) {
    apiCall(endPoints.deviceRecall, query, callback);
  };
  this.getDeviceEvent = function (query, callback) {
    apiCall(endPoints.deviceEvent, query, callback);
  };

  this.getFoodRecall = function (query, callback) {
    apiCall(endPoints.foodRecall, query, callback);
  };

  this.getApiStatus = function (callback) {
    apiCall(endPoints.apiStatus, '', callback);
  };

  this.endpoints = endPoints;

}]);

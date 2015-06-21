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
    if ('object' == typeof query) {
      query = query.build();
      console.log(query);
    }
    $http.get(
      baseUrl + endpoint + apiPrefix + query
    ).success(function (data) {
        callback(data);
      }).error(function (data, status) {
        console.log(status + ": could not get api data. Reason: " + data);
      });
  };

  var fdaQueryBuilder = function () {
    this.limit = 0;
    this.offset = 0;
    this.count = '';
    this.search = '';
    return this;
  };

  fdaQueryBuilder.prototype.setLimit = function (num) {
    this.limit = num;
    return this;
  };
  fdaQueryBuilder.prototype.setOffset = function (num) {
    this.offset = num;
    return this;
  };
  fdaQueryBuilder.prototype.setCount = function (countField) {
    this.count = countField;
    return this;
  }
  fdaQueryBuilder.prototype.setCountExact = function (countField) {
    this.count = countField + '.exact';
    return this;
  }
  fdaQueryBuilder.prototype.searchString = function (str) {
    this.search = str;
    return this;
  }
  fdaQueryBuilder.prototype.build = function () {
    var query = '';
    query += this.search ? '&search=' + this.search : '';
    query += this.count ? '&count=' + this.count : '';
    query += this.offset ? '&offset=' + this.offset : '';
    query += this.limit ? '&limit=' + this.limit : '';
    return query;
  }

  //  Drug APIs
  this.getDrugRecall = function (query, callback) {
    apiCall(endPoints.drugRecall, query, callback);
  };
  this.getDrugEvent = function (query, callback) {
    apiCall(endPoints.drugEvent, query, callback);
  };
  this.getDrugLabel = function (query, callback) {
    apiCall(endPoints.drugLabel, query, callback);
  };

  //  Device APIs
  this.getDeviceRecall = function (query, callback) {
    apiCall(endPoints.deviceRecall, query, callback);
  };
  this.getDeviceEvent = function (query, callback) {
    apiCall(endPoints.deviceEvent, query, callback);
  };

  //  Food APIs
  this.getFoodRecall = function (query, callback) {
    apiCall(endPoints.foodRecall, query, callback);
  };

  //  FDA API status
  this.getApiStatus = function (callback) {
    apiCall(endPoints.apiStatus, '', callback);
  };

  this.endpoints = endPoints;
  this.queryBuilder = function() {
    return new fdaQueryBuilder();
  };

}]);

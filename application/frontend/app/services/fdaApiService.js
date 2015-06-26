'use strict';

TeslaApp.service('fdaApiService', ['$http', '$q', function ($http, $q) {
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
    };

    this.endpoints = endPoints;

    var apiCall = function (endpoint, query) {
        if ('object' == typeof query) {
            query = query.build();
        }
        console.log(query);
        var deferred = $q.defer();
        $http.get(baseUrl + endpoint + apiPrefix + query).success(function (data) {
            deferred.resolve(data);
        }).error(function (data, status) {
            deferred.reject(data);
            console.log(status + ": could not get api data. Reason: " + data);
        });
        return deferred.promise;
    };

    var fdaQueryBuilder = function () {
        this.limit = 0;
        this.offset = 0;
        this.count = '';
        this.search = '';
    };

    //fdaQueryBuilder.prototype.setLimit = function (num) {
    //  this.limit = num;
    //  return this;
    //};

    fdaQueryBuilder.prototype.setOffset = function (num) {
        this.offset = num;
        return this;
    };

    fdaQueryBuilder.prototype.setCount = function (countField) {
        this.count = countField;
        return this;
    };

    //fdaQueryBuilder.prototype.setCountExact = function (countField) {
    //  this.count = countField + '.exact';
    //  return this;
    //};

    fdaQueryBuilder.prototype.searchString = function (str) {
        this.search = str;
        return this;
    };

    fdaQueryBuilder.prototype.build = function () {
        var query = '';
        query += this.search ? '&search=' + this.search : '';
        query += this.count ? '&count=' + this.count : '';
        query += this.offset ? '&offset=' + this.offset : '';
        query += this.limit ? '&limit=' + this.limit : '';
        return query;
    };

    //  Drug APIs
    this.getDrugRecall = function (query) {
        return apiCall(endPoints.drugRecall, query);
    };

    this.getDrugEvent = function (query) {
        return apiCall(endPoints.drugEvent, query);
    };

    this.getDrugLabel = function (query) {
        return apiCall(endPoints.drugLabel, query);
    };

    ////  Device APIs
    //this.getDeviceRecall = function (query) {
    //  return apiCall(endPoints.deviceRecall, query);
    //};
    //
    //this.getDeviceEvent = function (query) {
    //  return apiCall(endPoints.deviceEvent, query);
    //};
    //
    ////  Food APIs
    //this.getFoodRecall = function (query) {
    //  return apiCall(endPoints.foodRecall, query);
    //};

    //  FDA API status
    this.getApiStatus = function () {
        return apiCall(endPoints.apiStatus, '');
    };

    this.queryBuilder = function () {
        return new fdaQueryBuilder();
    };

}]);

'use strict';

TeslaApp.service('backendApiService', ['ENV', '$http', '$q', function (ENV, $http, $q) {
    var baseUrl = ENV.BACKEND_API;

    var endPoints = {
        "synonym": '/symptom.json',
        "autocomplete": '/symptom/autocomplete.json',
    };

    this.endpoints = endPoints;

    var apiCall = function (endpoint, oParam) {

        console.log('In Backend API apiCall');
        var deferred = $q.defer();

        $http.get(baseUrl + endpoint, {params:oParam})
        .success(function (data) {
            console.log('in API Call Success');
            console.log(data);
            deferred.resolve(data);
        }).error(function (data, status) {
            deferred.reject(data);
            console.log(status + ": could not get api data. Reason: " + data);
        });

        return deferred.promise;
    };

    //  Drug APIs
    this.getConditionSynonyms = function (condition) {
        console.log('in getConditionSynonyms');
        return apiCall(endPoints.synonym, condition);
    };

     /**
     * Autocomplete API (Backend)
     * 
     * oParam:{
     *  'param1': 'val1',
     *  'paramN': 'valN',
     *  ...
     * }
     * 
     * @param object oParam
     * @returns {$q@call;defer.promise}
     */
    this.autoComplete = function (oParam) {
        return apiCall(endPoints.autocomplete, oParam);
    };
}]);

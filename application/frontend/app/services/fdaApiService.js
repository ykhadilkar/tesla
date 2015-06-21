'use strict';

TeslaApp.service('fdaApiService', function(){
  var baseUrl = '//api.fda.gov';
  ///drug/event.json?api_key=MQcYBmlcJ41XLzrsgZyaRGlpDwEgm80uWtvxtAUi&search=headache';

  var drugApiPrefix = '/drug/event';
  var deviceApiPrefix = '/device/event';
  var foodsApiPrefix = '/food/enforcement';

  var apiKey = 'MQcYBmlcJ41XLzrsgZyaRGlpDwEgm80uWtvxtAUi';  //  free api key

  this.apiStatus = function(){
    var result = null;
    var test = $http.get(baseUrl + '/status')
      .success(function(response){result = response;});
    console.log(test);
  };

  this.getDrugEvents = function(){

  };
});


//
//
//teslaApp.service('fdaDrugs', function($http, fdaServiceSkeleton){
//  fdaServiceSkeleton['method_four'] = function(){};
//  return BasicService;
//}
//
//
//  .factory('ExtendedService', function($http, BasicService){
//
//    var extended = angular.extend(BasicService, {})
//    extended.method = function() {
//      // ...
//    }
//    return extended;
//  }

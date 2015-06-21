'use strict';


TeslaApp.controller('FdaCtrl', ['fdaApiService', '$scope', function (fdaApiService, $scope) {
  fdaApiService.apiStatus(function (data) {
    // array of {"endpoint":"recall","status":"GREEN","last_updated":"2015-05-31","documents":25540,"requests":66384,"latency":5.861563027235478}
    $scope.apiStatus = data;
  });

  fdaApiService.getDrugRecalls('', function(data){
    $scope.drugRecalls = data;
  });
}]);

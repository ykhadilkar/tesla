'use strict';


TeslaApp.controller('FdaCtrl', ['fdaApiService', '$scope', function (fdaApiService, $scope) {
  fdaApiService.getApiStatus(function (data) {
    // array of {"endpoint":"recall","status":"GREEN","last_updated":"2015-05-31","documents":25540,"requests":66384,"latency":5.861563027235478}
    $scope.apiStatus = data;
  });

  fdaApiService.getDrugRecall(fdaApiService.queryBuilder().searchString('motrin'), function (data) {
    $scope.drugRecalls = data;
  });

  fdaApiService.getDrugEvent(fdaApiService.queryBuilder().searchString('receivedate:[20040101+TO+20160101]').setCount('receivedate'), function (data) {
    $scope.reports2004 = data.results;
  });
}]);

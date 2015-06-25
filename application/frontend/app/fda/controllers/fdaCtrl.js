'use strict';


TeslaApp.controller('FdaCtrl', ['fdaApiService', '$scope', '$q', function (fdaApiService, $scope, $q) {
  var promises = [];

  promises.push(fdaApiService.getApiStatus());

  promises.push(fdaApiService.getDrugRecall(fdaApiService.queryBuilder().searchString('motrin')));

  promises.push(fdaApiService.getDrugEvent(fdaApiService.queryBuilder()
    .searchString('receivedate:[20040101+TO+20160101]').setCount('receivedate')));

  // When both OpenFDA API calls are complete, execute the remainder of the code.
  $q.all(promises).then(
    function(datas){
      $scope.apiStatus = datas[0];
      $scope.drugRecalls = datas[1];
      $scope.reports2004 = datas[2].results;
    }
  );

  //
  //fdaApiService.getApiStatus(function (data) {
  //  // array of {"endpoint":"recall","status":"GREEN","last_updated":"2015-05-31","documents":25540,"requests":66384,"latency":5.861563027235478}
  //  $scope.apiStatus = data;
  //});
  //
  //fdaApiService.getDrugRecall(fdaApiService.queryBuilder().searchString('motrin'), function (data) {
  //  $scope.drugRecalls = data;
  //});
  //
  //fdaApiService.getDrugEvent(fdaApiService.queryBuilder().searchString('receivedate:[20040101+TO+20160101]').setCount('receivedate'), function (data) {
  //  $scope.reports2004 = data.results;
  //});
}]);

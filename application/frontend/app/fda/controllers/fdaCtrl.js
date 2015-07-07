'use strict';

TeslaApp.controller('FdaCtrl', ['fdaApiService', '$scope', '$q', function (fdaApiService, $scope, $q) {
    var promises = [];

    promises.push(fdaApiService.getApiStatus());

    promises.push(fdaApiService.getDrugRecall(fdaApiService.queryBuilder().searchString('motrin')));

    promises.push(fdaApiService.getDrugEvent(fdaApiService.queryBuilder()
        .searchString('receivedate:[20040101+TO+20160101]').setCount('receivedate')));

    // When both OpenFDA API calls are complete, execute the remainder of the code.
    $q.all(promises).then(
        function (data) {
            $scope.apiStatus = data[0];
            $scope.drugRecalls = data[1];
            $scope.reports2004 = data[2].results;
        }
    );
}]);

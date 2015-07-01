'use strict';

TeslaApp.controller('RightCtrl', ['$scope', '$timeout', '$mdSidenav', '$log',
    function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        };
    }]);

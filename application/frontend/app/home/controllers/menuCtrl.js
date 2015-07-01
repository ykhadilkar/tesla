'use strict';

controllers
    .controller('MenuCtrl', ['$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log',
        function ($scope, $timeout, $mdSidenav, $mdUtil, $log) {
            $scope.toggleRight = buildToggler('right');
            /**
             * Build handler to open/close a SideNav; when animation finishes
             * report completion in console
             */
            function buildToggler(navID) {
                return $mdUtil.debounce(function () {
                    $mdSidenav(navID)
                        .toggle()
                        .then(function () {
                            $log.debug("toggle " + navID + " is done");
                        });
                }, 300);
            }
        }]);

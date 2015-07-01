'use strict';

// Declare app level module which depends on views, and components
var TeslaApp = angular.module('teslaApp', [
    'ngRoute',
    'ngAnimate',
    'ngAria',
    'ngMaterial',
    'config',
    'teslaApp.home',
    'teslaApp.events',
    'angulartics',
    'angulartics.google.analytics'
]);

// Slide out menu
TeslaApp
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
    }])
    .controller('RightCtrl', ['$scope', '$timeout', '$mdSidenav', '$log',
    function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        };
    }])
    .directive('classRoute', ['$rootScope', function($rootScope) {
        return function(scope, elem, attr) {
          var previous = '';
          $rootScope.$on('$routeChangeSuccess', function(event, currentRoute) {
            var route = currentRoute.$$route;
            if(route) {

              var cls = route['class'];

              if(previous) {
                attr.$removeClass(previous);
              }

              if(cls) {
                previous = cls;
                attr.$addClass(cls);
              }
            }
          });
        };
    }]);

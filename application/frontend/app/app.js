'use strict';

// Declare app level module which depends on views, and components
angular.module('teslaApp', [
    'ngRoute',
    'ngAnimate',
    'ngAria',
    'ngMaterial',
    'teslaApp.home',
    'teslaApp.search',
    'teslaApp.events',
    'teslaApp.version'
]);
//   // Slide out menu
  angular 
    .module('frontendApp')
    .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $mdUtil, $log) {
      $scope.toggleRight = buildToggler('right');
      /**
       * Build handler to open/close a SideNav; when animation finishes
       * report completion in console
       */
      function buildToggler(navID) {
        var debounceFn =  $mdUtil.debounce(function(){
              $mdSidenav(navID)
                .toggle()
                .then(function () {
                  $log.debug("toggle " + navID + " is done");
                });
            },300);
        return debounceFn;
      }
    })
    .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
      $scope.close = function () {
        $mdSidenav('right').close()
          .then(function () {
            $log.debug("close RIGHT is done");
          });
      };
    });

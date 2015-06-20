'use strict';

/**
 * @ngdoc overview
 * @name frontendApp
 * @description
 * # frontendApp
 *
 * Main module of the application.
 */
angular
  .module('frontendApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial'
  ])
  .config(function ($routeProvider, $mdThemingProvider, $mdIconProvider) {

    $mdIconProvider
        .defaultIconSet("svg/avatars.svg", 128)
        .icon("menu"       , "svg/menu.svg"        , 24)
        .icon("share"      , "svg/share.svg"       , 24)
        .icon("google_plus", "svg/google_plus.svg" , 512)
        .icon("hangouts"   , "svg/hangouts.svg"    , 512)
        .icon("twitter"    , "svg/twitter.svg"     , 512)
        .icon("phone"      , "svg/phone.svg"       , 512);

//    $mdThemingProvider.theme('default')
//        .primaryPalette('brown')
//        .accentPalette('red');

    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });


});
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

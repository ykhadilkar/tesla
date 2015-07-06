'use strict';

// Declare app level module which depends on views, and components
var TeslaApp = angular.module('teslaApp', [
    'ngRoute',
    'ngAnimate',
    'ngAria',
    'ngMaterial',
    'config',
    'angularSpinner',
    'nvd3'
])
.config(function($mdThemingProvider) {
  // Extend the teal theme with different color
  var reiTealMap = $mdThemingProvider.extendPalette('teal', {
    'A400': '47d091'
  });
  // Register the new color palette map with the name
  $mdThemingProvider.definePalette('reiTeal', reiTealMap);
  // Use that theme for the accent intentions
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('reiTeal',{
      'default': 'A400'
    });
});

'use strict';

var services = angular.module('services',[]);
var controllers = angular.module('controllers',['services']);
var directives = angular.module('directives',['services']);


// Declare app level module which depends on views, and components
var TeslaApp = angular.module('teslaApp', [
    'ngRoute',
    'ngAnimate',
    'ngAria',
    'ngMaterial',
    'config',
    'services',
    'controllers',
    'directives',
    'angularSpinner',
    'angulartics',
    'angulartics.google.analytics'
]);

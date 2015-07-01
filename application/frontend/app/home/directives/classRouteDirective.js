'use strict';

directives.directive('classRoute', ['$rootScope', function($rootScope) {
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

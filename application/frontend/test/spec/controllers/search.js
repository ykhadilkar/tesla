'use strict';

describe('teslaApp', function () {
  var scope,
    controller;
  beforeEach(function () {
    module('teslaApp');
  });

  describe('SearchCtrl', function () {
    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller('SearchCtrl', {
        '$scope': scope
      });
    }));

    it('variables are set', function () {
      expect(scope.someValue).toBe('Safest');
      expect(scope.sortResultsBySafe).toBe(true);
    });
  });
});

'use strict';

describe('teslaApp', function () {
  var scope,
    controller;
  beforeEach(function () {
    module('teslaApp');
  });

  describe('HomeCtrl', function () {
    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller('HomeCtrl', {
        '$scope': scope
      });
    }));

    it('variables are set', function () {
      expect(scope.symptom).toBe('My Symptom');
      expect(scope.drug.length).toBe(0)
    });
  });
});

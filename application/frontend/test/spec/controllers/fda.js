'use strict';

describe('teslaApp', function () {
  var scope,
    controller;
  beforeEach(function () {
    module('teslaApp');
  });

  describe('FdaCtrl', function () {
    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller('FdaCtrl', {
        '$scope': scope
      });
    }));

    it('variables are set', function () {
      //expect(true).toBe(true);
      //expect(promises).toEqual([]);
      //expect(scope.symptom).toBe('My Symptom');
      //expect(scope.drug.length).toBe(0)
    });
  });
});

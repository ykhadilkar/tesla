'use strict';

describe('Controller: HomeCtrl', function () {

  // load the controller's module
  beforeEach(module('teslaApp.home'));

  var HomeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HomeCtrl = $controller('HomeCtrl', {
      $scope: scope
    });
  }));

  it('should have no items to start', function () {
    expect(scope.symptom.length).toBe(0);
    expect(scope.drug.length).toBe(0);
  });
});

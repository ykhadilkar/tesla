'use strict';

describe('teslaApp.version module', function() {
  beforeEach(module('teslaApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});

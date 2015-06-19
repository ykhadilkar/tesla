'use strict';

angular.module('teslaApp.version', [
  'teslaApp.version.interpolate-filter',
  'teslaApp.version.version-directive'
])

.value('version', '0.1');

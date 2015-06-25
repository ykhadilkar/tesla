'use strict';

TeslaApp.factory('teslaFactory', function () {
  var symptom = "";


  return {
    getSymptom: function () {
      return symptom;
    },
    setSymptom: function (value) {
      symptom = value;
    },
    getResults: function () {
      return results;
    }
  }
});

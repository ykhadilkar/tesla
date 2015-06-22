'use strict';

TeslaApp.factory('teslaFactory', function(){
  var symptom = "headache";


  return {
    getSymptom: function(){
      return symptom;
    },
    setSymptom: function(value){
      symptom = value;
    },
    getResults: function(){
      return results;
    }
  }
});

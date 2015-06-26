'use strict';

TeslaApp.factory('teslaFactory', function () {
    var symptom = "";
    var drug = "aspirin";


    return {
        getSymptom: function () {
            return symptom;
        },
        setSymptom: function (value) {
            symptom = value;
        },
        getDrug: function () {
            return drug;
        }
    }
});

'use strict';

TeslaApp.factory('teslaFactory', function () {
    var symptom = "";
    var drug = "";


    return {
        getSymptom: function () {
            return symptom;
        },
        setSymptom: function (value) {
            symptom = value;
        },
        getDrug: function () {
            return drug;
        },
        setDrug: function (drugIn) {
            drug = drugIn;
        }
    }
});

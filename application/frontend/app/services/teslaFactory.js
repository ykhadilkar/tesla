'use strict';

TeslaApp.factory('teslaFactory', function () {
    var symptom = "";
    var drug = "";
    var drugEventCount = 0;


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
        },
        getDrugEventCount: function () {
            return drugEventCount;
        },
        setDrugEventCount: function (drugEventCountIn) {
            drugEventCount = drugEventCountIn;
        }
    }
    });

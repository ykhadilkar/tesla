'use strict';

TeslaApp.factory('teslaFactory', function () {
    var symptom = "";
    var drug = "";
    var drugEventCount = 0;


    return {
        /**
         * Escape special character that would break the elastic search
         * and encode special character
         *
         * @param String query
         * @returns String
         */
        elasticQueryString: function (query) {
            return encodeURIComponent(query.replace(/([\/!\*\+&\|\(\)\[\]{}\^~\?:"'])/g, "+"));
        },
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

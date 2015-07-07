'use strict';

describe('teslaFactoryTest', function () {
    var teslaFactoryObj;

    beforeEach(function () {
        module('teslaApp');
        inject(function (teslaFactory) {
            teslaFactoryObj = teslaFactory;
        })
    });

    it("checks all functions are defined", function () {
        expect(teslaFactoryObj.elasticQueryString).toEqual(jasmine.any(Function));
        expect(teslaFactoryObj.getSymptom).toEqual(jasmine.any(Function));
        expect(teslaFactoryObj.setSymptom).toEqual(jasmine.any(Function));
        expect(teslaFactoryObj.getDrug).toEqual(jasmine.any(Function));
        expect(teslaFactoryObj.setDrug).toEqual(jasmine.any(Function));
        expect(teslaFactoryObj.getProduct).toEqual(jasmine.any(Function));
        expect(teslaFactoryObj.setProduct).toEqual(jasmine.any(Function));
        expect(teslaFactoryObj.getDrugEventCount).toEqual(jasmine.any(Function));
        expect(teslaFactoryObj.setDrugEventCount).toEqual(jasmine.any(Function));
    });

    it("test elasticQueryString methods", function () {
        var escapedString = teslaFactoryObj.elasticQueryString('test?karma}jasmine{test');
        //  skip encodeURIComponent(), we test only our code here
        expect(escapedString).toBe('test+karma+jasmine+test'.replace(/\+/g, '%2B'));
    });

    it("tests symptom setters getters", function () {
        teslaFactoryObj.setSymptom('karma');
        expect(teslaFactoryObj.getSymptom()).toBe('karma');
    });

    it("tests drug setters getters", function () {
        teslaFactoryObj.setDrug('jasmine');
        expect(teslaFactoryObj.getDrug()).toBe('jasmine');
    });

    it("tests product setters getters", function () {
        teslaFactoryObj.setProduct('tesla');
        expect(teslaFactoryObj.getProduct()).toBe('tesla');
    });

    it("tests DrugEventCount setters getters", function () {
        teslaFactoryObj.setDrugEventCount('rei');
        expect(teslaFactoryObj.getDrugEventCount()).toBe('rei');
    });
});

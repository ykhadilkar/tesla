'use strict';

describe('rxNormApiService', function () {
    var escapeRegExp = function (str) {
        return str.replace(/[\/\.\?]/g, "\\$&");
    };

    var $httpBackend,
        rxNormApiServiceObj,
        baseUrl;

    beforeEach(function () {
        module('teslaApp');
        inject(function (_$httpBackend_, rxNormApiService, ENV) {
            $httpBackend = _$httpBackend_;
            rxNormApiServiceObj = rxNormApiService;
            baseUrl = ENV.RXNORM_API;
        })
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("checks endpoints list", function () {
        expect(rxNormApiServiceObj.endpoints).toEqual(jasmine.any(Object));
        expect(rxNormApiServiceObj.endpoints.drugInfo).toEqual(jasmine.stringMatching('/drugs?'));
    });

    it("checks functions are defined", function () {
        expect(rxNormApiServiceObj.getDrugInfo).toEqual(jasmine.any(Function));
        expect(rxNormApiServiceObj.getDrugInteractions).toEqual(jasmine.any(Function));
        expect(rxNormApiServiceObj.getRxCUI).toEqual(jasmine.any(Function));
    });

    it("checks query builder functions are defined", function () {
        var queryBuilder = rxNormApiServiceObj.queryBuilder();
        expect(queryBuilder.searchString).toEqual(jasmine.any(Function));
        expect(queryBuilder.build).toEqual(jasmine.any(Function));
    });

    it("checks query builder functions work", function () {
        var queryBuilder = rxNormApiServiceObj.queryBuilder();
        expect(queryBuilder.search).toBe('');

        queryBuilder.searchString('someString');
        expect(queryBuilder.search).toBe('someString');

        var query = queryBuilder.build();
        expect(query).toBe('someString');
    });

    it("checks drugInfo request", function () {
        var apiUrl = new RegExp(
            escapeRegExp(baseUrl + rxNormApiServiceObj.endpoints.drugInfo)
            + 'karma', 'gi');

        $httpBackend.when('GET', apiUrl).respond(
            {drugInfo: 'some info'}
        );
        var status = false;
        rxNormApiServiceObj.getDrugInfo('karma').then(function (result) {
            status = result;
        });
        $httpBackend.flush();

        expect(status).toEqual({drugInfo: 'some info'});
    });

    it("checks drugInteractions request", function () {
        var apiUrl = new RegExp(
            escapeRegExp(baseUrl + rxNormApiServiceObj.endpoints.interactions)
            + 'jasmine', 'gi');

        $httpBackend.when('GET', apiUrl).respond(
            {drugInteractions: 'some interactions'}
        );
        var status = false;
        rxNormApiServiceObj.getDrugInteractions('jasmine').then(function (result) {
            status = result;
        });
        $httpBackend.flush();

        expect(status).toEqual({drugInteractions: 'some interactions'});
    });

    it("checks getRxCUI request", function () {
        var apiUrl = new RegExp(
            escapeRegExp(baseUrl + rxNormApiServiceObj.endpoints.rxcui)
            + 'rei', 'gi');

        $httpBackend.when('GET', apiUrl).respond(
            {rxInfo: 'some RX info'}
        );
        var status = false;
        rxNormApiServiceObj.getRxCUI('rei').then(function (result) {
            status = result;
        });
        $httpBackend.flush();

        expect(status).toEqual({rxInfo: 'some RX info'});
    });
});

'use strict';

describe('fdaApiServiceTest', function () {
    function escapeRegExp(str) {
        return str.replace(/[\/\.\?]/g, "\\$&");
    }

    var $httpBackend,
        fdaApiServiceObj,
        baseUrl;

    beforeEach(function () {
        module('teslaApp');
        inject(function (_$httpBackend_, fdaApiService, ENV) {
            $httpBackend = _$httpBackend_;
            fdaApiServiceObj = fdaApiService;
            baseUrl = ENV.FDA_API;
        })
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("checks endpoints list", function () {
        expect(fdaApiServiceObj.endpoints).toEqual(jasmine.any(Object));
        expect(fdaApiServiceObj.endpoints.apiStatus).toEqual(jasmine.stringMatching('/status'));
    });

    it("checks functions are defined", function () {
        expect(fdaApiServiceObj.getDrugRecall).toEqual(jasmine.any(Function));
        expect(fdaApiServiceObj.getDrugEvent).toEqual(jasmine.any(Function));
        expect(fdaApiServiceObj.getDrugLabel).toEqual(jasmine.any(Function));
        expect(fdaApiServiceObj.getApiStatus).toEqual(jasmine.any(Function));
        expect(fdaApiServiceObj.queryBuilder).toEqual(jasmine.any(Function));
    });

    it("checks query builder functions are defined", function () {
        var queryBuilder = fdaApiServiceObj.queryBuilder();
        expect(queryBuilder.setLimit).toEqual(jasmine.any(Function));
        expect(queryBuilder.setOffset).toEqual(jasmine.any(Function));
        expect(queryBuilder.setCount).toEqual(jasmine.any(Function));
        expect(queryBuilder.setCountExact).toEqual(jasmine.any(Function));
        expect(queryBuilder.searchString).toEqual(jasmine.any(Function));
        expect(queryBuilder.build).toEqual(jasmine.any(Function));
    });

    it("checks query builder functions work", function () {
        var queryBuilder = fdaApiServiceObj.queryBuilder();
        expect(queryBuilder.limit).toBe(0);
        expect(queryBuilder.offset).toBe(0);
        expect(queryBuilder.count).toBe('');
        expect(queryBuilder.search).toBe('');

        queryBuilder.setLimit(7);
        expect(queryBuilder.limit).toBe(7);

        queryBuilder.setOffset(9);
        expect(queryBuilder.offset).toBe(9);

        queryBuilder.setCount('receivedate');
        expect(queryBuilder.count).toBe('receivedate');

        queryBuilder.setCountExact('receivedate');
        expect(queryBuilder.count).toBe('receivedate.exact');

        queryBuilder.searchString('someString');
        expect(queryBuilder.search).toBe('someString');

        var query = queryBuilder.build();
        expect(query).toBe('&search=someString&count=receivedate.exact&offset=9&limit=7');
    });

    it("checks apiStatus request", function () {
        var apiUrl = new RegExp(
            escapeRegExp(baseUrl+fdaApiServiceObj.endpoints.apiStatus)
            +'\\?api_key=[a-z0-9]+', 'gi');

        $httpBackend.when('GET', apiUrl).respond(
            {status:'amazing'}
        );
        var status = false;
        fdaApiServiceObj.getApiStatus().then(function (result) {
            status = result;
        });
        $httpBackend.flush();

        expect(status).toEqual({status:'amazing'});
    });

    it("checks drugRecall request", function () {
        var apiUrl = new RegExp(
            escapeRegExp(baseUrl+fdaApiServiceObj.endpoints.drugRecall+'?')
            +'api_key=[a-z0-9]+&search=karmaTest', 'gi');

        $httpBackend.when('GET', apiUrl).respond(
            {recalls:'list'}
        );
        var status = false;
        fdaApiServiceObj.getDrugRecall('&search=karmaTest').then(function (result) {
            status = result;
        });
        $httpBackend.flush();

        expect(status).toEqual({recalls:'list'});
    });

});

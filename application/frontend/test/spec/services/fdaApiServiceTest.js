'use strict';

describe('fdaApiServiceTest', function () {
    var $httpBackend,
        fdaApiServiceObj;

    beforeEach(function () {
        module('teslaApp');
        inject(function (_$httpBackend_, fdaApiService) {
            $httpBackend = _$httpBackend_;
            fdaApiServiceObj = fdaApiService;
            //$httpBackend.when('GET', 'Users/users.json').respond([{id: 1, name: 'Bob'}, {id:2, name: 'Jane'}]);
        })
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

});

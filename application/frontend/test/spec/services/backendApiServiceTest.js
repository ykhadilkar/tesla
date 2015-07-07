'use strict';

describe('backendApiService', function () {
    //var escapeRegExp = function (str) {
    //    return str.replace(/[\/\.\?]/g, "\\$&");
    //};

    var $httpBackend,
        backendApiServiceObj,
        baseUrl;

    beforeEach(function () {
        module('teslaApp');
        inject(function (_$httpBackend_, backendApiService, ENV) {
            $httpBackend = _$httpBackend_;
            backendApiServiceObj = backendApiService;
            baseUrl = ENV.BACKEND_API;
        })
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("checks endpoints list", function () {
        expect(backendApiServiceObj.endpoints).toEqual(jasmine.any(Object));
        expect(backendApiServiceObj.endpoints.synonym).toEqual(jasmine.stringMatching('/symptom.json'));
    });

    it("checks functions are defined", function () {
        expect(backendApiServiceObj.getConditionSynonyms).toEqual(jasmine.any(Function));
        expect(backendApiServiceObj.autoComplete).toEqual(jasmine.any(Function));
        expect(backendApiServiceObj.getProduct).toEqual(jasmine.any(Function));
    });

    //xit("checks /symptom.json request", function () {
    //    var apiUrl = new RegExp(
    //        escapeRegExp(baseUrl + backendApiServiceObj.endpoints.synonym)
    //        + 'karma', 'gi');
    //
    //    $httpBackend.when('GET', apiUrl).respond(
    //        {drugInfo: 'some info'}
    //    );
    //    var status = false;
    //    backendApiServiceObj.getConditionSynonyms('karma').then(function (result) {
    //        status = result;
    //    });
    //    $httpBackend.flush();
    //
    //    expect(status).toEqual({drugInfo: 'some info'});
    //});
});

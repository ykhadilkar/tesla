'use strict';

describe('SearchCtrl', function () {
    var scope,
        controller;

    describe('symptom is not set', function(){
        beforeEach(function () {
            module('teslaApp');
            inject(function ($rootScope, $controller, teslaFactory) {
                scope = $rootScope.$new();
                var mockTeslaFactory = teslaFactory;
                spyOn(mockTeslaFactory, 'getSymptom').and.callFake(function(){
                    return '';
                });

                controller = $controller('SearchCtrl', {
                    '$scope': scope,
                    'teslaFactory': mockTeslaFactory
                });
            });
        });

        it('symptom is defined', function () {
            expect(scope.factorySymptom).toEqual('');
        });
    });

    describe('symptom is set', function(){
        beforeEach(function () {
            module('teslaApp');
            inject(function ($rootScope, $controller, teslaFactory) {
                scope = $rootScope.$new();
                var mockTeslaFactory = teslaFactory;
                spyOn(mockTeslaFactory, 'getSymptom').and.callFake(function(){
                    return 'karmache';
                });

                controller = $controller('SearchCtrl', {
                    '$scope': scope,
                    'teslaFactory': mockTeslaFactory
                });
            });
        });

        it('symptom is defined', function () {
            expect(scope.factorySymptom).toEqual('karmache');
        });
    });
});


'use strict';

describe('DrugCtrl', function () {
    var scope,
        controller;

    describe("no mocks", function () {
        beforeEach(function () {
            module('teslaApp');
            inject(function ($rootScope, $controller) {
                scope = $rootScope.$new();
                controller = $controller('DrugCtrl', {
                    '$scope': scope
                });
            });
        });

        it('variables are set', function () {
            expect(scope.ageGroup).toEqual(1);
            expect(scope.genderSelected).toEqual(9);
            expect(scope.ageDesc).toContain('0-17');
            expect(scope.ageDesc).toContain('18-35');
        });
    });

    describe("with mocks", function () {
        var mockTeslaFactory,
            mockSearchFactory;

        beforeEach(function () {
            module('teslaApp');
            inject(function ($rootScope, $controller, teslaFactory, searchFactory) {

                mockTeslaFactory = teslaFactory;
                spyOn(mockTeslaFactory, 'getSymptom').and.callFake(function () {
                    return 'karmache';
                });
                spyOn(mockTeslaFactory, 'getDrug').and.callFake(function () {
                    return 'karmadrug';
                });
                spyOn(mockTeslaFactory, 'getDrugEventCount').and.callFake(function () {
                    return 3;
                });

                mockSearchFactory = searchFactory;
                spyOn(mockSearchFactory, 'getDrugEvents').and.callFake(function () {
                    return 3;
                });

                scope = $rootScope.$new();
                controller = $controller('DrugCtrl', {
                    '$scope': scope,
                    'teslaFactory': mockTeslaFactory
                });
            });
        });

        it('checks variables are set', function () {
            expect(scope.ageGroup).toEqual(1);
            expect(scope.genderSelected).toEqual(9);
            expect(scope.ageDesc).toContain('0-17');
            expect(scope.ageDesc).toContain('18-35');
            expect(scope.ageDesc).toContain('56+');
        });

        it('checks functions and objects are set', function () {
            expect(scope.openLeftMenu).toEqual(jasmine.any(Function));
            expect(scope.runEventSearch).toEqual(jasmine.any(Function));
            expect(scope.runRecallsSearch).toEqual(jasmine.any(Function));
            expect(scope.runInteractionSearch).toEqual(jasmine.any(Function));
            expect(scope.runLabelsSearch).toEqual(jasmine.any(Function));
            expect(scope.gotoProduct).toEqual(jasmine.any(Function));
            expect(scope.gotoInteraction).toEqual(jasmine.any(Function));

            expect(scope.adverseEventsChartOptions).toEqual(jasmine.any(Object));
            expect(scope.adverseEventsChartOptions.chart).toEqual(jasmine.any(Object));
            expect(scope.recallChartOptions).toEqual(jasmine.any(Object));
            expect(scope.recallChartOptions.chart).toEqual(jasmine.any(Object));
        });

        it('checks mocked values', function () {
            expect(scope.factorySymptom).toBe('karmache');
            expect(scope.drugSelected).toBe('karmadrug');
            expect(scope.drugEventCount).toBe(3);
        });

        it("checks genderButtonClick function", function () {
            spyOn(scope, 'runEventSearch');
            var gender = 3;
            scope.genderButtonClick(gender);
            expect(scope.runEventSearch).toHaveBeenCalled();
            expect(scope.genderSelected).toBe(gender);
        });

        it("checks runEventSearch function", function () {
            expect(scope.ageGroup).toBe(1);
            expect(scope.ageDesc[scope.ageGroup - 1]).toBe('All Ages');
            scope.runEventSearch();
            expect(mockSearchFactory.getDrugEvents).toHaveBeenCalled();
            expect(scope.ageText).toBe('All Ages');
        });

        it("checks runEventSearch function with age 36-55", function () {
            scope.ageGroup = 4;
            expect(scope.ageDesc[scope.ageGroup - 1]).toBe('36-55');
            scope.runEventSearch();
            expect(mockSearchFactory.getDrugEvents).toHaveBeenCalledWith(
                'karmadrug', 9, 36, 55, jasmine.any(Function)
            );
            expect(scope.ageText).toBe('36-55');
        });
    });
});

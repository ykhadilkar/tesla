"use strict";

var Code = require('code');   // assertion library
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var OpenFDA = require('../../models/openfda');

var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('OpenFDA Model Test', function () {

    var validEntities = {
        entity: 'drug',
        relationship: 'event'
    };

    var invalidEntities = {
        entity: 'apple',
        relationship: 'laptops'
    };

    it('checks wrong Entity values', function (done) {
        var err = OpenFDA.search(invalidEntities.entity, validEntities.relationship);
        expect(err).to.exist();
        err.done(function () {
            throw new Error('This should never happen!');
        }, function (reason) {
            expect(reason).to.be.an.instanceof(Error);
            expect(reason.message === 'Invalid OpenFda Api entity: ' + invalidEntities.entity).to.be.true();
        });
        done();
    });

    it("checks wrong relationship sequence for api: drug", function (done) {
        var err = OpenFDA.search('drug', invalidEntities.relationship);
        expect(err).to.exist();
        err.done(function () {
            throw new Error('This should never happen!');
        }, function (reason) {
            expect(reason).to.be.an.instanceof(Error);
            expect(reason.message).to.be.equal('Invalid OpenFda Api entity drug relationship');
        });
        done();
    });

    it("checks wrong relationship sequence for api: device", function (done) {
        var err = OpenFDA.search('device', invalidEntities.relationship);
        expect(err).to.exist();
        err.done(function () {
            throw new Error('This should never happen!');
        }, function (reason) {
            expect(reason).to.be.an.instanceof(Error);
            expect(reason.message).to.be.equal('Invalid OpenFda Api entity device relationship');
        });
        done();
    });

    it("checks wrong relationship sequence for api: food", function (done) {
        var err = OpenFDA.search('food', invalidEntities.relationship);
        expect(err).to.exist();
        err.done(function () {
            throw new Error('This should never happen!');
        }, function (reason) {
            expect(reason).to.be.an.instanceof(Error);
            expect(reason.message).to.be.equal('Invalid OpenFda Api entity food relationship');
        });
        done();
    });

    it("checks search", function (done) {
        var result = OpenFDA.search(validEntities.entity, validEntities.relationship, 'search', 'count', 1, 3);
        expect(result).to.exist();
        result.done(function (value) {
            expec(value).to.be.instanceof(Object);
        }, function (reason) {
            throw new Error(reason);
        });
        done();
    });
});

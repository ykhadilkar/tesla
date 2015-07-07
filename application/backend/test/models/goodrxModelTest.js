//"use strict";
//
//var Code = require('code');   // assertion library
//var Lab = require('lab');
//var lab = exports.lab = Lab.script();
//var GoodRX = require('../../models/goodrx');
//
//var describe = lab.describe;
//var it = lab.it;
//var expect = Code.expect;
//
//describe('GoodRX Model Test', function () {
//
//    it('checks signature generator', function (done) {
//        var signature = GoodRX.generateSignature('name=asdf&api_key=569006e8b5');
//        expect(signature).to.be.equal('foS4VRiLnukIioFh9TPfDBSmb8LPR1Sy9S8_l1DA1gQ=');
//
//        done();
//    });
//
//    it('checks wrong entity validation', function (done) {
//        var wrongEntity = 'weird-entity';
//        var err = GoodRX.search(wrongEntity, 'ibuprofen');
//
//        expect(err).to.exist();
//        err.done(function () {
//            throw new Error('This should never happen!');
//        }, function (reason) {
//            expect(reason).to.be.an.instanceof(Error);
//            expect(reason.message).to.be.equal('Invalid GoodRX Api entity: ' + wrongEntity);
//        });
//
//        done();
//    });
//
//    it('checks wrong param validation', function (done) {
//        var entity = 'drug-search';
//        var err = GoodRX.search(entity, {weirdParam: 'asdfasdf'});
//
//        expect(err).to.exist();
//        err.done(function () {
//            throw new Error('This should never happen!');
//        }, function (reason) {
//            expect(reason).to.be.an.instanceof(Error);
//            expect(reason.message).to.be.equal('Invalid param `weirdParam` for GoodRX Api entity: ' + entity);
//        });
//
//        done();
//    });
//
//    it('checks good search results', function (done) {
//        var result = GoodRX.search('drug-search', {query: 'aspirin'});
//
//        expect(result).to.exist();
//        result.then(function (json) {
//            expect(json).to.exist();
//            json = JSON.parse(json);
//            expect(json.success).to.be.true();
//            expect(json.data.candidates).to.exist();
//            expect(json.data.candidates).to.be.an.array();
//            expect(json.data.candidates).to.contain('isradipine');
//            expect(json.data.candidates).to.contain('aspirin');
//        }, function (reason) {
//            throw new Error('This should never happen: ' + reason);
//        }).done(function () {
//            done();
//        });
//    });
//});

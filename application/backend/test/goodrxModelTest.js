"use strict";

var Code = require('code');   // assertion library
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var GoodRX = require('../models/goodrx');

var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('GoodRX Model Test', function () {

    it('checks wrong Entity values', function (done) {
        var signature = GoodRX.generateSignature('name=asdf&api_key=569006e8b5');
        expect(signature).to.be.equal('foS4VRiLnukIioFh9TPfDBSmb8LPR1Sy9S8_l1DA1gQ=');

        done();
    });
});

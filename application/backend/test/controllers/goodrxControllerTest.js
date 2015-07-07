"use strict";

var Code = require('code');   // assertion library
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var server = require('../../server');

lab.experiment("Testing GoodRX Controller", {timeout: 3000}, function () {

    lab.test("drug-info endpoint", function (done) {
        var options = {
            method: "GET",
            url: "/goodrx/drug-info.json?name=aspirin"
        };
        // server.inject lets you simulate an http request
        server.inject(options, function (response) {
            var result = JSON.parse(response.result);
            Code.expect(response.statusCode).to.equal(200);                 //  Expect http response status code to be 200 ("Ok")
            Code.expect(result.success).to.be.true();
            done();                                                         // done() callback is required to end the test.
        });
    });

    lab.test("fair-price endpoint", function (done) {
        var options = {
            method: "GET",
            url: "/goodrx/fair-price.json?name=motrin"
        };
        // server.inject lets you simulate an http request
        server.inject(options, function (response) {
            var result = JSON.parse(response.result);
            Code.expect(response.statusCode).to.equal(200);                 //  Expect http response status code to be 200 ("Ok")
            Code.expect(result.success).to.be.true();
            Code.expect(result.data.manufacturer).to.be.equal('generic');
            done();                                                         // done() callback is required to end the test.
        });
    });

    lab.test("low-price endpoint", function (done) {
        var options = {
            method: "GET",
            url: "/goodrx/low-price.json?name=motrin"
        };
        // server.inject lets you simulate an http request
        server.inject(options, function (response) {
            var result = JSON.parse(response.result);
            Code.expect(response.statusCode).to.equal(200);                 //  Expect http response status code to be 200 ("Ok")
            Code.expect(result.success).to.be.true();
            Code.expect(result.data.form).to.be.equal('tablet');
            done();                                                         // done() callback is required to end the test.
        });
    });

    lab.test("compare-price endpoint", function (done) {
        var options = {
            method: "GET",
            url: "/goodrx/compare-price.json?name=motrin"
        };
        // server.inject lets you simulate an http request
        server.inject(options, function (response) {
            var result = JSON.parse(response.result);
            Code.expect(response.statusCode).to.equal(200);                 //  Expect http response status code to be 200 ("Ok")
            Code.expect(result.success).to.be.true();
            Code.expect(result.data.prices.length).to.be.at.least(2);
            done();                                                         // done() callback is required to end the test.
        });
    });

    lab.test("drug-search endpoint", function (done) {
        var options = {
            method: "GET",
            url: "/goodrx/drug-search.json?query=motrin"
        };
        // server.inject lets you simulate an http request
        server.inject(options, function (response) {
            var result = JSON.parse(response.result);
            Code.expect(response.statusCode).to.equal(200);                 //  Expect http response status code to be 200 ("Ok")
            Code.expect(result.success).to.be.true();
            Code.expect(result.data.candidates).to.be.an.array();
            Code.expect(result.data.candidates.length).to.be.at.least(3);
            Code.expect(result.data.candidates).to.contain('motrin');
            Code.expect(result.data.candidates).to.contain('motrin pm');
            done();                                                         // done() callback is required to end the test.
        });
    });
});

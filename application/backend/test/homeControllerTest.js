"use strict";

var Code = require('code');   // assertion library
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var server = require('../server');

lab.experiment("Basic HTTP Tests", function () {
    // test home end point
    lab.test("Main endpoint /", function (done) {
        var options = {
            method: "GET",
            url: "/"
        };
        // server.inject lets you simulate an http request
        server.inject(options, function (response) {
            //var result = JSON.parse(response.result);
            Code.expect(response.statusCode).to.equal(200);             //  Expect http response status code to be 200 ("Ok")
            Code.expect(response.result.endpoints).to.be.an.array().and.to.contain('/drug/label.json');
            Code.expect(response.result.endpoints.length).to.be.at.least(8);
            done();                                                     // done() callback is required to end the test.
        });
    });
});

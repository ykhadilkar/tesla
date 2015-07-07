"use strict";

var Code = require('code');   // assertion library
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var server = require('../../server');

lab.experiment("Basic HTTP Tests", function () {
    // test food end point
    lab.test("Main endpoint /food/enforcement.json", function (done) {
        var options = {
            method: "GET",
            url: "/food/enforcement.json"
        };
        // server.inject lets you simulate an http request
        server.inject(options, function (response) {
            var result = JSON.parse(response.result);
            Code.expect(response.statusCode).to.equal(200);                 //  Expect http response status code to be 200 ("Ok")
            Code.expect(result.meta.results.total).to.be.at.least(5);       //  Atleast 5 total records
            done();                                                         // done() callback is required to end the test.
        });
    });
});
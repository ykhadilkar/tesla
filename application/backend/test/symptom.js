"use strict";

var Code = require('code');   // assertion library
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var server = require('../server');

lab.experiment("Basic HTTP Tests", function(done) {
    // test drug enforcement end point
    lab.test("Main endpoint /symptom/synonym.json", function(done) {
        var options = {
            method: "GET",
            url: "/symptom/synonym.json"
        };
        // server.inject lets you simulate an http request
        server.inject(options, function(response) {
            //var result = JSON.parse(response.result);
            Code.expect(response.statusCode).to.equal(200);             //  Expect http response status code to be 200 ("Ok")
            Code.expect(response.result).to.be.an.array().and.to.contain('Hypertension');
            Code.expect(response.result.length).to.be.at.least(4);
            done();                                                     // done() callback is required to end the test.
        });
    });
})
"use strict";

var Code = require('code');   // assertion library
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var server = require('../server');

lab.experiment("Basic HTTP Tests", function(done) {
    // test drug events end point
    lab.test("Main endpoint /drug/event.json", function(done) {
        var options = {
            method: "GET",
            url: "/drug/event.json"
        };
        // server.inject lets you simulate an http request
        server.inject(options, function(response) {
            var result = JSON.parse(response.result);
            Code.expect(response.statusCode).to.equal(200);                 //  Expect http response status code to be 200 ("Ok")
            Code.expect(result.meta.results.total).to.be.at.least(4500000); //  Atleast 4,500,000 total records
            //console.log();
            done();                                         // done() callback is required to end the test.
        });
    });

    // test drug label end point
    lab.test("Main endpoint /drug/label.json", function(done) {
        var options = {
            method: "GET",
            url: "/drug/label.json"
        };
        // server.inject lets you simulate an http request
        server.inject(options, function(response) {
            var result = JSON.parse(response.result);
            Code.expect(response.statusCode).to.equal(200);                 //  Expect http response status code to be 200 ("Ok")
            Code.expect(result.meta.results.total).to.be.at.least(70000);   //  At least 70,000 total records
            done();                                                         // done() callback is required to end the test.
        });
    });

    // test drug enforcement end point
    lab.test("Main endpoint /drug/enforcement.json", function(done) {
        var options = {
            method: "GET",
            url: "/drug/enforcement.json"
        };
        // server.inject lets you simulate an http request
        server.inject(options, function(response) {
            var result = JSON.parse(response.result);
            Code.expect(response.statusCode).to.equal(200);             //  Expect http response status code to be 200 ("Ok")
            Code.expect(result.meta.results.total).to.be.at.least(3000);//  At least 3000 total records
            done();                                                     // done() callback is required to end the test.
        });
    });
});
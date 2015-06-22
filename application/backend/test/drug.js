/**
 * Created by ykhadilkar on 6/22/15.
 */
"use strict";
var Code = require('code');   // assertion library
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var server = require('../');

lab.experiment("Basic HTTP Tests", function(done) {
    // tests
    lab.test("Main endpoint /drug/event.json", function(done) {
        var options = {
            method: "GET",
            url: "/drug/event.json"
        };
        // server.inject lets you simulate an http request
        server.inject(options, function(response) {
            var result = response.result;
            Code.expect(response.statusCode).to.equal(200);  //  Expect http response status code to be 200 ("Ok")
            done();                                         // done() callback is required to end the test.
        });
    });

    lab.test("Main endpoint /drug/label.json", function(done) {
        var options = {
            method: "GET",
            url: "/drug/event.json"
        };
        // server.inject lets you simulate an http request
        server.inject(options, function(response) {
            var result = response.result;
            Code.expect(response.statusCode).to.equal(200);  //  Expect http response status code to be 200 ("Ok")
            done();                                         // done() callback is required to end the test.
        });
    });

    lab.test("Main endpoint /drug/enforcement.json", function(done) {
        var options = {
            method: "GET",
            url: "/drug/event.json"
        };
        // server.inject lets you simulate an http request
        server.inject(options, function(response) {
            var result = response.result;
            Code.expect(response.statusCode).to.equal(200);  //  Expect http response status code to be 200 ("Ok")
            done();                                         // done() callback is required to end the test.
        });
    });
})
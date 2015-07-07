"use strict";

//var Code = require('code');   // assertion library
var Lab = require('lab');
var lab = exports.lab = Lab.script();
//var server = require('../server');

lab.experiment("Basic HTTP Tests", function (done) {

    //lab.test("Main endpoint /symptom.json", function(done) {
    //    var options = {
    //        method: "GET",
    //        url: "/symptom.json"
    //    };
    //    // server.inject lets you simulate an http request
    //    server.inject(options, function(response) {
    //        //var result = JSON.parse(response.result);
    //        Code.expect(response.statusCode).to.equal(500);             //  Expect http response status code to be 200 ("Ok")
    //        done();                                                     // done() callback is required to end the test.
    //    });
    //});
    //
    //lab.test("Main endpoint /symptom/synonym.json", function(done) {
    //    var options = {
    //        method: "GET",
    //        url: "/symptom/synonym.json?search=Hypertension",
    //    };
    //    // server.inject lets you simulate an http request
    //    server.inject(options, function(response) {
    //        //var result = JSON.parse(response.result);
    //        console.log(response);
    //        Code.expect(response.statusCode).to.equal(200);             //  Expect http response status code to be 200 ("Ok")
    //        Code.expect(response.result).to.be.an.array().and.to.contain('Hypertension');
    //        Code.expect(response.result.length).to.be.at.least(4);
    //        done();                                                     // done() callback is required to end the test.
    //    });
    //});


});

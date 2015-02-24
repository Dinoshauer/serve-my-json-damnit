/*jshint node:true */
/*global describe, it, expect, beforeEach, afterEach*/

'use strict';

var fs = require('fs'),
    path = require('path'),
    request = require('request'),
    http = require('../server/http'),
    baseUrl = 'http://0.0.0.0:8888';


describe('Serve my JSON, damnit!', function () {
    describe('GET', function (done) {
        beforeEach(function (done) {
            var fp = path.resolve(__dirname, 'res', 'get.json'),
                config = JSON.parse(fs.readFileSync(fp));

            http.init(config, function() {
                done();
            });
        });

        it('should return a list of users', function (done) {
            request.get('http://localhost:8000/users', function (e, res, body) {
                var expected = [
                        {id: 0, name: 'Foo', email: 'foo@example.com'},
                        {id: 1, name: 'Bar', email: 'bar@example.com'}
                    ],
                    result = JSON.parse(body);
                expect(result).toEqual(expected);
                expect(res.statusCode).toBe(200);
                done();
            });
        });

        afterEach(function (done) {
            http._server.close();
            done();
        });
    });
});

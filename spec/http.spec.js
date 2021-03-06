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

        it('accepts a GET request', function (done) {
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
    describe('POST', function (done) {
        beforeEach(function (done) {
            var fp = path.resolve(__dirname, 'res', 'post.json'),
                config = JSON.parse(fs.readFileSync(fp));

            http.init(config, function() {
                done();
            });
        });

        it('accepts a POST request', function (done) {
            var d = {foo: 'bar'};
            request.post('http://localhost:8000/users', d, function (e, res, body) {
                var expected = {status: 'success!'},
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
    describe('PUT', function (done) {
        beforeEach(function (done) {
            var fp = path.resolve(__dirname, 'res', 'put.json'),
                config = JSON.parse(fs.readFileSync(fp));

            http.init(config, function() {
                done();
            });
        });

        it('accepts a PUT request', function (done) {
            var d = {foo: 'bar'};
            request.put('http://localhost:8000/users/0', d, function (e, res, body) {
                var expected = {status: 'success!'},
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
    describe('DELETE', function (done) {
        beforeEach(function (done) {
            var fp = path.resolve(__dirname, 'res', 'delete.json'),
                config = JSON.parse(fs.readFileSync(fp));

            http.init(config, function() {
                done();
            });
        });

        it('accepts a DELETE request', function (done) {
            request.del('http://localhost:8000/users/0', function (e, res, body) {
                var expected = {status: 'success!'},
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
    describe('PATCH', function (done) {
        beforeEach(function (done) {
            var fp = path.resolve(__dirname, 'res', 'patch.json'),
                config = JSON.parse(fs.readFileSync(fp));

            http.init(config, function() {
                done();
            });
        });

        it('accepts a PATCH request', function (done) {
            var d = {foo: 'bar'};
            request.patch('http://localhost:8000/users/0', d, function (e, res, body) {
                var expected = {status: 'success!'},
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
    describe('HEAD', function (done) {
        beforeEach(function (done) {
            var fp = path.resolve(__dirname, 'res', 'head.json'),
                config = JSON.parse(fs.readFileSync(fp));

            http.init(config, function() {
                done();
            });
        });

        it('accepts a HEAD request', function (done) {
            request.head('http://localhost:8000/users', function (e, res, body) {
                expect(body).toEqual('');
                expect(res.statusCode).toBe(200);
                done();
            });
        });

        afterEach(function (done) {
            http._server.close();
            done();
        });
    });
    describe('OPTIONS', function (done) {
        beforeEach(function (done) {
            var fp = path.resolve(__dirname, 'res', 'options.json'),
                config = JSON.parse(fs.readFileSync(fp));

            http.init(config, function() {
                done();
            });
        });

        it('accepts a OPTIONS request', function (done) {
            request({
                method: 'OPTIONS',
                uri: 'http://localhost:8000/users'
            }, function (e, res, body) {
                var expected = {status: 'success!'},
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

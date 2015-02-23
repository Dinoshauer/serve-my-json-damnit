var fp = process.argv[2],
    fs = require('fs'),
    _ = require('lodash'),
    restify = require('restify');

var server = restify.createServer(),
    config = JSON.parse(fs.readFileSync(fp)),
    port = config.port || 5000;

var method_map = {
    GET: function (server, url, code, data, headers) {
        server.get(url, function (req, res, next) {
            res.headers = headers || {};
            res.send(code, data);
            return next();
        });
    },
    DELETE: function (server, url, code, data, headers) {
        server.del(url, function (req, res, next) {
            res.headers = headers || {};
            res.send(code, data);
            return next();
        });
    },
    HEAD: function (server, url, code, data, headers) {
        server.head(url, function (req, res, next) {
            res.headers = headers || {};
            res.send(code, data);
            return next();
        });
    },
    OPTIONS: function (server, url, code, data, headers) {
        server.opts(url, function (req, res, next) {
            res.headers = headers || {};
            res.send(code, data);
            return next();
        });
    },
    PATCH: function (server, url, code, data, headers) {
        server.patch(url, function (req, res, next) {
            res.headers = headers || {};
            res.send(code, data);
            return next();
        });
    },
    POST: function (server, url, code, data, headers) {
        server.post(url, function (req, res, next) {
            res.headers = headers || {};
            res.send(code, data);
            return next();
        });
    },
    PUT: function (server, url, code, data, headers) {
        server.put(url, function (req, res, next) {
            res.headers = headers || {};
            res.send(code, data);
            return next();
        });
    },
}



_.forEach(config.endpoints, function(endpoint) {
    var method = endpoint.method,
        url = endpoint.url,
        code = endpoint.code,
        response = endpoint.response,
        headers = endpoint.headers;

    method_map[method](server, url, code, response);
});

server.listen(port, function () {
    console.log('listening on: %s', port)
});

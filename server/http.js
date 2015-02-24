var _ = require('lodash'),
    restify = require('restify'),
    server = restify.createServer();

var method_map = {
    GET: ApiGen('get'),
    DELETE: ApiGen('del'),
    HEAD: ApiGen('head'),
    OPTIONS: ApiGen('opts'),
    PATCH: ApiGen('patch'),
    POST: ApiGen('post'),
    PUT: ApiGen('put'),
};

function ApiGen (method) {
    return function (url, code, response) {
        server[method](url, function (req, res, next) {
            res.send(code, response);
            return next();
        });
    }
}

module.exports = {
    init: function (config, cb) {
        _.forEach(config.endpoints, function(endpoint) {
            var method = endpoint.method,
                url = endpoint.url,
                code = endpoint.code,
                response = endpoint.response,
                headers = endpoint.headers;

            method_map[method](url, code, response, headers);
        });

        server.listen(config.port, cb);
    },
    _server: server,
}

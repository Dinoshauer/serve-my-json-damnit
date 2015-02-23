var fp = process.argv[2],
    fs = require('fs'),
    restify = require('restify');

var server = restify.createServer(),
    config = JSON.parse(fs.readFileSync(fp));


server.listen(5000);

var fp = process.argv[2],
    fs = require('fs'),
    http = require('./server/http'),
    config = JSON.parse(fs.readFileSync(fp));


http.init(config, function () {
    console.log('serving your json on: %s', config.port)
});

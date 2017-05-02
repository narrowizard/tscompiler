var restify = require('restify');
var tscompiler = require('./services/ts').compiler;
var Logger = require('bunyan');

var server = restify.createServer({
    name: "tscompiler",
    version: "1.0.0",
    log: new Logger.createLogger({
        name: 'tscompiler',
        serializers: {
            req: Logger.stdSerializers.req
        }
    })
});

server.pre(function (req, res, next) {
    req.log.info({ req: req }, 'REQUEST');
    next();
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.post("/tscompiler", function (req, res, next) {
    var config = req.params.Config;
    var source = req.params.Source;
    if (!config) {
        config = {};
    }
    if (!source) {
        res.status(404);
        res.end();
        return next();
    }
    res.send(tscompiler(source, config));
    return next();
});

server.listen(8778, function () {
    console.log('%s listening at %s', server.name, server.url);
});
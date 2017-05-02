var restify = require('restify');
var Logger = require('bunyan');

var ts = require('./controllers/ts').tshandler;
var html = require('./controllers/html').normalizer;

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

server.post("/tscompiler", ts);
server.post("/html/normal", html)

server.listen(8778, function () {
    console.log('%s listening at %s', server.name, server.url);
});
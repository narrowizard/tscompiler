var restify = require('restify');
var Logger = require('bunyan');
var nconf = require('nconf');

var ts = require('./controllers/ts').tshandler;
var html = require('./controllers/html').normalizer;

var config = {};

//loading config file
nconf.file({ file: "webconfig.json" });
config.PORT = nconf.get("port");

//create http server
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
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.post("/tscompiler", ts);
server.post("/html/normal", html);
server.get("/", restify.serveStatic({
    directory: "./app",
    file: "index.html"
}));

server.listen(config.PORT, function () {
    console.log('%s listening at %s', server.name, server.url);
});

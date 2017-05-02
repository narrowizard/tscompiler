var tscompiler = require('../services/ts').compiler;

exports.tshandler = function (req, res, next) {
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
};
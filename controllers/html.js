var normalize = require('../services/normalizer').normalize;
const qs = require('querystring');

exports.normalizer = function (req, res, next) {
    var origin = req.params.Data;
    res.send(normalize(origin));
    return next();
}
var ts = require('typescript');

exports.compiler = function (source, config) {
    return JSON.stringify(ts.transpileModule(source, config));
}

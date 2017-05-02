var ts = require('typescript');

exports.compiler = function (source, config) {
    return ts.transpileModule(source, config);
}

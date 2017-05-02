var jsdom = require('jsdom');

var $window;

// 创建一个公共的window,用来解析
jsdom.env('', function (err, publicWindow) {
    if (err) {
        log.err(err);
        return;
    }
    $window = publicWindow;
});

exports.normalize = function (input) {
    var d = $window.document.createElement("div");
    d.innerHTML = input;
    return {
        Normal: d.innerHTML == input,
        Input: input,
        Output: d.innerHTML
    }
}
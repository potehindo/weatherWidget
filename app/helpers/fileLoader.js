function loadCss (href) {
    var link = document.createElement('link');
    link.href = href;
    link.rel = 'stylesheet';
    var head = document.querySelector('head');
    head.appendChild(link);
}

function loadScript (src) {
    var _loadScript = function (src) {
        return new Promise(function (resolve, reject) {
            var script = document.createElement('script');
            var body = document.querySelector('body');

            script.src = src;
            script.type = "text/javascript";
            script.onload = function () {
                resolve(src);
            }
            body.appendChild(script);
        });
    }

    var self = this;
    return new Promise(function (resolve, reject) {
        if (typeof src === 'object') {
            var scripts = [];
            function _resolveScripts(i) {
                return function (data) {
                    if (i === src.length - 1) {
                        resolve(true);
                    }
                }
            }

            for (var i = 0; i < src.length; i++) {
                _loadScript(src[i]).then(_resolveScripts(i));
            }

        } else {
            resolve(_loadScript(src));
        }
    });
}
var Ajax = (function () {
    var method = 'GET',
        url,
        type;
    
    function Ajax (data) {
        if (data) {
            if (typeof data === 'string') {
                url = data;
                type = 'json';
            } else {
                method = (data.method) ? data.method : method;
                url = data.url;
                type = (data.type) ? data.type : type;
            }
            return _sendRequest();
        }
    }

    var _sendRequest = function () {
        if (type === 'jsonp') {
            return _sendJSONP();
        } else {
            return _sendXmlHttpRequest();
        }
    }

    var _sendXmlHttpRequest = function () {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState != 4) {
                    return;
                }

                if (xhr.status != 200) {
                    reject(_getAjaxObject(xhr));
                } else {
                    resolve(_getAjaxObject(xhr));
                }
            }
        });
    }

    var _sendJSONP = function () {
        return new Promise(function (resolve, reject) {
            var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
            window[callbackName] = function(data) {
                delete window[callbackName];
                document.body.removeChild(script);
                resolve(data);
            };
            var script = document.createElement('script');
            script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
            document.body.appendChild(script);
        });
    }

    var _getAjaxObject = function (xhr) {
        return {
            result: JSON.parse(xhr.responseText),
            xhr: xhr
        }
    };

    return Ajax;
})();


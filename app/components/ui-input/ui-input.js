loadCss('app/components/ui-input/ui-input.css');

function UiInput (data) {
    this._input = document.createElement('input');
    this._value = '';
    this._class = 'ui-input';
    this._callback = null;

    Object.defineProperty(this, 'value', {
        get: function () { 
            return this._value; 
        },
        set: function (value) { 
            this._value = value;
            this._input.value = value;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(this, 'onEnter', {
        set: function (callback) { 
            this._callback = callback;
        },
        enumerable: true,
        configurable: true
    });
}

UiInput.prototype.render = function () {
    this._input.className = this._class;
    this._input.value = this._value;
    this._addEvents();
    return this._input;
}

UiInput.prototype._addEvents = function () {
    var self = this;
    this._input.addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
            self._value = event.target.value;
            if (self._callback) {
                self._callback(self._value);
            }
        }
    });
}
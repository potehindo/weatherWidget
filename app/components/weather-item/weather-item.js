loadCss('app/components/weather-item/weather-item.css');

function WeatherItem (value) {
    this._temperature = null;
    this._windSpeed = null;
    this._dewPoint = null;
    this._time = null;
    this._icon = null;
    this._className = 'weather-item';
    this._iconWidth;
    this._iconHeight;

    this._temperatureDiv = null;
    this._windSpeedDiv = null;
    this._iconCanvas = null;
    this._dewPointDiv = null;
    this._timeDiv = null;
    
    Object.defineProperties(this, {
        'temperature': {
            get: function () {
                return this._temperature;
            },
            set: function (value) {
                this._temperature = value;
            }
        },

        'windSpeed': {
            get: function () {
                return this._windSpeed;
            },
            set: function (value) {
                this._windSpeed = value;
            }
        },

        'dewPoint': {
            get: function () {
                return this._dewPoint;
            },
            set: function (value) {
                this._dewPoint = value;
            }
        },

        'time': {
            get: function () {
                return this._time;
            },
            set: function (value) {
                this._time = value;
            }
        },

        'icon': {
            get: function () {
                return this._icon;
            },
            set: function (value) {
                this._icon = value;
            }
        },

        'className': {
            get: function () {
                return this._className;
            },
            set: function (value) {
                this._className = value;
            }
        },

        'iconWidth': {
            get: function () {
                return this._iconWidth;
            },
            set: function (value) {
                this._iconWidth = value;
            }
        },

        'iconHeight': {
            get: function () {
                return this._iconHeight;
            },
            set: function (value) {
                this._iconHeight = value;
            }
        }
    });
    return this;
}

WeatherItem.prototype.constructor = WeatherItem;

WeatherItem.prototype.render = function () {
    var weatherItem = document.createElement('div');
    weatherItem.className = this._className;

    weatherItem.appendChild(this._renderTemperature());
    weatherItem.appendChild(this._renderWindSpeed());
    weatherItem.appendChild(this._renderIcon());
    weatherItem.appendChild(this._renderDewPoint());
    if (this._time) {
        weatherItem.appendChild(this._renderTime());
    }

    return weatherItem;
}

WeatherItem.prototype.update = function () {
    this._setTemperature(this._temperature);
    this._setWindSpeed(this._windSpeed);
    this._setIcon(this._icon);
    this._setDewPoint(this._dewPoint);
    if (this._time) {
        console.log(this._time);
        this._setTime(this._time);
    }
}

WeatherItem.prototype._renderTemperature = function () {
    this._temperatureDiv = document.createElement('div');
    this._temperatureDiv.className = this._className + '__temperature';
    this._setTemperature(this._temperature);
    return this._temperatureDiv;
}

WeatherItem.prototype._setTemperature = function (value) {
    this._temperatureDiv.innerHTML = Math.round(value) + '&deg' + 'C';
}

WeatherItem.prototype._renderWindSpeed = function () {
    this._windSpeedDiv = document.createElement('div');
    this._windSpeedDiv.className = this._className + '__wind-speed';
    this._setWindSpeed(this._windSpeed);
    return this._windSpeedDiv;
}

WeatherItem.prototype._setWindSpeed = function (value) {
    this._windSpeedDiv.innerHTML = Math.round(value) + ' м/с';
}

WeatherItem.prototype._renderIcon = function () {
    var iconDiv = document.createElement('div');
    iconDiv.className = this._className + '__icon';
    this._iconCanvas = new Icon({
        color: 'black',
        icon: this._icon,
        height: this._iconHeight,
        width: this._iconWidth
    });
    
    this._iconCanvas.play();
    iconDiv.appendChild(this._iconCanvas.render());
    return iconDiv;
}

WeatherItem.prototype._setIcon = function (value) {
    this._iconCanvas.setIcon(value);
}

WeatherItem.prototype._renderDewPoint = function () {
    this._dewPointDiv = document.createElement('div');
    this._dewPointDiv.className = this._className + '__dew-point';
    this._setDewPoint(this._dewPoint);
    return this._dewPointDiv;   
}

WeatherItem.prototype._setDewPoint = function (value) {
    this._dewPointDiv.innerHTML = value + '%';
}

WeatherItem.prototype._renderTime = function () {
    this._timeDiv = document.createElement('div');
    this._timeDiv.className = this._className + '__time';
    this._setTime(this._time);
    return this._timeDiv;
}

WeatherItem.prototype._setTime = function (value) {

    var date = new Date();
    date.setTime(value * 1000);
    // @todo Сделать сеттер геттер на текст пока так
    if (new Date().getHours() === date.getHours()) {
        this._timeDiv.innerHTML = 'Сейчас';
    } else {
        this._timeDiv.innerHTML = date.getHours() + ':00';
    }
}
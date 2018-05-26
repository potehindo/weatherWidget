var WeatherItems = (function () {
    loadCss('app/components/weather-items/weather-items.css');
 
    var _items,
        _weatherItems = [],
        _className = 'weather-items',
        _hoursCount = 24;

    function WeatherItems () {
        this.weatherItems = [];
        Object.defineProperty(this, 'items', {
            get: function () {
                return _items;
            },
            set: function (value) {
                _items = value;
            }
        });
    }

    WeatherItems.prototype.render = function () {
        var weatherItemsDiv = document.createElement('div');
        weatherItemsDiv.className = _className;

        for (var i = 0 ; i < _hoursCount; i++) {
            var weatherItemsInnerDiv = document.createElement('div');
            weatherItemsInnerDiv.className = _className + '__item';

            _weatherItems[i] = new WeatherItem();
            
            _weatherItems[i].temperature = _items.data[i].temperature;
            _weatherItems[i].windSpeed = _items.data[i].windSpeed;
            _weatherItems[i].dewPoint = _items.data[i].dewPoint;
            _weatherItems[i].time = _items.data[i].time;
            _weatherItems[i].icon = _items.data[i].icon;

            _weatherItems[i].iconWidth = 50;
            _weatherItems[i].iconHeight = 50;

            _weatherItems[i].className = 'small-weather-item';

            weatherItemsInnerDiv.appendChild(_weatherItems[i].render());
            weatherItemsDiv.appendChild(weatherItemsInnerDiv);
        }
        
        return weatherItemsDiv;
    }

    WeatherItems.prototype.update = function () {
        for (var i = 0; i < _hoursCount; i++) {
            _weatherItems[i].temperature = _items.data[i].temperature;
            _weatherItems[i].windSpeed = _items.data[i].windSpeed;
            _weatherItems[i].dewPoint = _items.data[i].dewPoint;
            _weatherItems[i].time = _items.data[i].time;
            _weatherItems[i].icon = _items.data[i].icon;

            _weatherItems[i].update();
        }
    }

    return WeatherItems;
})();
var WeatherWidget = (function () {
    loadCss('app/modules/weather-widget/weather-widget.css');

    var _googleGeoCoderUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=',
        _darkSkyApiUrl = 'https://api.darksky.net/forecast/f45d8630a7e1c0e1fbe6d78ef10d0fe6/',
        _defaultCityValue = 'Новосибирск',
        _lat = 55.008353,
        _lng = 82.935733,
        _currentWeather,
        _hourlyWeather;

    var _getData = function (city) {
        return Ajax(_googleGeoCoderUrl + city ).then(function (data) {
            var coords = data.result.results[0].geometry.location;
            _lat = coords.lat;
            _lng = coords.lng;
            return Ajax({
                url: _darkSkyApiUrl + _lat + ',' + _lng + '?lang=ru&units=si',
                type: 'jsonp'
            });
        }).then(function (data) {
            _currentWeather = data.currently;
            _hourlyWeather = data.hourly;
        });
    };

    function _updateWidget (city) {
        if (city) {
            var self = this;
            _getData(city).then(function (item) {
                self.weatherItem.temperature = _currentWeather.temperature;
                self.weatherItem.windSpeed = _currentWeather.windSpeed;
                self.weatherItem.dewPoint = _currentWeather.dewPoint;
                self.weatherItem.icon = _currentWeather.icon;
                self.weatherItem.update();

                self.weatherItems.items = _hourlyWeather;
                self.weatherItems.update();
                
            });
        }
    }


    function WeatherWidget () {
        this.class = 'weather-widget';
    }

    WeatherWidget.prototype._getSearch = function () {
        var search = document.createElement('div');
        search.className = 'weather-widget__search';
        var input = new UiInput();
        input.value = _defaultCityValue;
        input.onEnter = _updateWidget.bind(this);
        search.appendChild(input.render());
        return search;
    }

    WeatherWidget.prototype._getCurrentWeather = function () {
        var currentWeatherDiv = document.createElement('div');
        currentWeatherDiv.className = 'weather-widget__current-weather';

        this.weatherItem = new WeatherItem();
        this.weatherItem.temperature = _currentWeather.temperature;
        this.weatherItem.windSpeed = _currentWeather.windSpeed;
        this.weatherItem.dewPoint = _currentWeather.dewPoint;
        this.weatherItem.icon = _currentWeather.icon;
        this.weatherItem.className = 'current-weather';
        this.weatherItem.iconWidth = 100;
        this.weatherItem.iconHeight = 100;
        currentWeatherDiv.appendChild(this.weatherItem.render());

        return currentWeatherDiv;
    }

    WeatherWidget.prototype._getHourlyWeather = function () {
        var hourlyWeatherDiv = document.createElement('div');
        hourlyWeatherDiv.className = 'weather-widget__hourly-weather';

        this.weatherItems = new WeatherItems();
        this.weatherItems.items = _hourlyWeather;
        this.weatherItems.className = 'hourly-weather';

        hourlyWeatherDiv.appendChild(this.weatherItems.render());
        return hourlyWeatherDiv;
    }

    WeatherWidget.prototype.render = function () {
        var self = this;
        return _getData(_defaultCityValue).then(function (data) {
            self._weatherWidget = document.createElement('div');
            self._weatherWidget.className = self.class;
            self._weatherWidget.appendChild(self._getSearch());
            self._weatherWidget.appendChild(self._getCurrentWeather());
            self._weatherWidget.appendChild(self._getHourlyWeather());            
            return self._weatherWidget;
        });
    }

   return WeatherWidget;
})();
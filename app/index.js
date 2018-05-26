var css = [
    'https://fonts.googleapis.com/css?family=Jura:300,400,500,600,700',
    'libs/css/reset.css'
];

var js = [
    'app/helpers/xmlHttpRequest.js',
    'app/app.js',
    'app/components/icon/skycons.js',
    'app/components/icon/icon.js',
    'app/components/ui-input/ui-input.js',
    'app/modules/weather-widget/weather-widget.js',
    'app/components/weather-item/weather-item.js',
    'app/components/weather-items/weather-items.js'
];

css.map(function (item) {
    loadCss(item);
});

loadScript(js).then(function () {
    new App({
        element: '#app'
    });
});
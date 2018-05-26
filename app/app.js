var App = (function () {
    loadCss('app/app.css');
  
    function App (data) {
        this.element = document.querySelector(data.element);
        this._render();
    }

    App.prototype._render = function () {
        var div = document.createElement('div');
        div.className = 'widgets-area';
        this.element.appendChild(div);

        var innerDiv = document.createElement('div');
        innerDiv.className = 'widgets-area__item';

        var widget = new WeatherWidget();
        
        widget.render().then(function (child) {
            innerDiv.appendChild(child);
            div.appendChild(innerDiv);
        });
    };

    return App;
})();
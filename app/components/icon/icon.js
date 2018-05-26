loadCss('app/components/icon/icon.css');

function Icon (data) {
    this.constructor({
        color: data.color
    });

    
    this._icon = data.icon;
    this._width = data.width;
    this._height = data.height;
}

Icon.prototype.setIcon = function (icon) {
    this.set(this.canvas, icon);
}

Icon.prototype.play = function () {
    this.play();
}

Icon.prototype.render = function () {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this._width;
    this.canvas.height = this._height;
    this.add(this.canvas, this._icon);
    return this.canvas;
}

Icon.prototype.constructor = Skycons;
Icon = Object.assign(Icon, Skycons);
Icon.prototype = Object.assign(Icon.prototype, Skycons.prototype);
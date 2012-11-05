define(['gamejs'], function(gamejs) {
    var PatternSurface = gamejs.Surface;
    PatternSurface.prototype.fillPattern = function(imgUrl) {
        var image = gamejs.image.loadImage(imgUrl);
        this.fill(this.context.createPattern(image, 'repeat'));
    };

    var basisChange = function(ux, uy, v) {
        return [
            ux[0] * v[0] + uy[0] * v[1],
            ux[1] * v[0] + uy[1] * v[1]
        ];
    };

    var hypotenuse = function() {
        if (arguments.length == 1)
            arguments = arguments[0];
        var x = arguments[0],
            y = arguments[1];
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    };

    var sameSign = function(x, y) {
        return (x * y >= 0);  // this might not work for really big numbers.
    };

    return {
        basisChange: basisChange,
        hypotenuse: hypotenuse,
        sameSign: sameSign,
        PatternSurface: PatternSurface
    };
});

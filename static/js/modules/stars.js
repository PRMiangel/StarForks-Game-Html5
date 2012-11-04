define(['gamejs', 'modules/globals', 'modules/utils'], function(gamejs, globals, utils) {
    var StarsField = function() {
        var size  = utils.hypotenuse(globals.game.screenSize);
        this.surface = new utils.PatternSurface([size, size]);
        this.surface.fillPattern(globals.starsField.image);
    };

    StarsField.prototype.draw = function(display, offset) {
        display.blit(this.surface, offset);
    };

    return {
        StarsField: StarsField
    };
});

define(['gamejs', 'modules/globals', 'modules/utils'], function(gamejs, globals, utils) {
    var StarsField = function() {
        var size  = utils.hypotenuse(globals.game.screenSize);

        this.field1 = new utils.PatternSurface([size, size]);
        this.field2 = new utils.PatternSurface([size, size]);

        this.field1.fillPattern(globals.starsField.image);
        this.field2.fillPattern(globals.starsField.image);

        this.surface = new gamejs.Surface([size, size*2]);
        this.surface.blit(this.field1, [0, 0]);
        this.surface.blit(this.field1, [0, size]);

        this.offset = [0, 0];
    };

    StarsField.prototype.draw = function(display) {
        display.blit(this.surface, this.offset);
    };

    return {
        StarsField: StarsField
    };
});

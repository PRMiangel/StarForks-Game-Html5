define(['gamejs', 'modules/globals', 'modules/utils'], function(gamejs, globals, utils) {
    var size  = [globals.game.screenSize[0], Math.ceil(globals.game.screenSize[1] / 256) * 256];

    var StarsField = function() {
        //var size  = utils.hypotenuse(globals.game.screenSize);

        this.field1 = new utils.PatternSurface(size);
        this.field2 = new utils.PatternSurface(size);

        this.field1.fillPattern(globals.starsField.image);
        this.field2.fillPattern(globals.starsField.image);

        this.offset1 = [0, 0];
        this.offset2 = [0, -size[1]];
    };

    StarsField.prototype.draw = function(display) {
        display.blit(this.field1, this.offset1);
        display.blit(this.field2, this.offset2);
    };

    StarsField.prototype.handle = function(event) {
    };

    StarsField.prototype.update = function() {
        var dy = 5;
        this.offset1[1] += dy;
        this.offset2[1] += dy;

        if (this.offset1[1] >= 0)
            this.offset2[1] = -size[1] + this.offset1[1];
        if (this.offset2[1] >= 0)
            this.offset1[1] = -size[1] + this.offset2[1];
    };

    return {
        StarsField: StarsField
    };
});

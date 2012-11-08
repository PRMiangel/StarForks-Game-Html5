define(['gamejs', 'modules/globals', 'gamejs/utils/math', 'gamejs/utils/vectors'], function(gamejs, globals, $m, $v) {
    /*
     * Laser.
     * just some orientated laser shooted by the player.
     * -------------------------------------------------------------------------
     */
    var Laser = function(spriteUrl, position, orientation) {
        // call superconstructor
        Laser.superConstructor.apply(this, arguments);

        this.image = gamejs.image.load(spriteUrl);
        this.orientation = $m.normaliseRadians(orientation);  // radians
        this.origin = position;

        // weapon qualities
        this.strength = 1;
        this.speed = 100;

        // laser image
        this.image = gamejs.transform.rotate(this.image, $m.degrees(this.orientation));
        var size = this.image.getSize();
        this.rect = new gamejs.Rect($v.add(position, [-size[0] / 2, -size[1]/2]), size);
        this.mask = gamejs.mask.fromSurface(this.image);

        // speed line image
        var speedLineImg = gamejs.image.load(globals.player.speedSprite);
        this.speedLineVerticalSize = speedLineImg.getSize()[1];
        this.speedLine = new gamejs.Surface($v.add(speedLineImg.getSize(), [0, size[1]]));
        this.speedLine.blit(speedLineImg, [0, size[1]]);
        this.speedLine = gamejs.transform.rotate(this.speedLine, $m.degrees(this.orientation));
        if (this.orientation >= 0 && this.orientation < Math.PI / 2) this.speedLineCorner = ['top', 'right'];
        else if (this.orientation >= Math.PI / 2 && this.orientation < Math.PI) this.speedLineCorner = ['bottom', 'right'];
        else if (this.orientation >= Math.PI && this.orientation < 3 * Math.PI / 2) this.speedLineCorner = ['bottom', 'left'];
        else this.speedLineCorner = ['top', 'left'];
        this.speedRect = new gamejs.Rect([0, 0], this.speedLine.getSize());
        this.speedRect[this.speedLineCorner] = this.rect[this.speedLineCorner];
        this.speedLine.setAlpha(1);
    };
    gamejs.utils.objects.extend(Laser, gamejs.sprite.Sprite);

    Laser.prototype.draw = function(display) {
        // speedline
        display.blit(this.speedLine, this.speedRect.topleft);

        // laser
        display.blit(this.image, this.rect.topleft);

        // gamejs.draw.line(display, '#FF0000', this.speedRect.topleft, this.speedRect.topright);
        // gamejs.draw.line(display, '#FF0000', this.speedRect.topleft, this.speedRect.bottomleft);
        // gamejs.draw.line(display, '#FF0000', this.speedRect.bottomleft, this.speedRect.bottomright);
        // gamejs.draw.line(display, '#FF0000', this.speedRect.bottomright, this.speedRect.topright);

        // gamejs.draw.line(display, '#FFFF00', this.rect.topleft, this.rect.topright);
        // gamejs.draw.line(display, '#FFFF00', this.rect.topleft, this.rect.bottomleft);
        // gamejs.draw.line(display, '#FFFF00', this.rect.bottomleft, this.rect.bottomright);
        // gamejs.draw.line(display, '#FFFF00', this.rect.bottomright, this.rect.topright);

        return;
    };

    Laser.prototype.update = function(msDuration) {
        var time = msDuration / 1000;

        this.rect.left += this.speed * Math.cos(this.orientation - Math.PI/2);
        this.rect.top  += this.speed * Math.sin(this.orientation - Math.PI/2);
        this.speedRect[this.speedLineCorner[0]] = this.rect[this.speedLineCorner[0]];
        this.speedRect[this.speedLineCorner[1]] = this.rect[this.speedLineCorner[1]];

        if (this.rect.center[0] > globals.game.screenSize[0] + this.speedLine.getSize()[0] || this.rect.center[0] < -this.speedLine.getSize()[0] ||
            this.rect.center[1] > globals.game.screenSize[1] + this.speedLine.getSize()[1] || this.rect.center[1] < -this.speedLine.getSize()[1])
            this.kill();

        if (this.speedLine.getAlpha() > 0) {
            var alpha = 1 - Math.abs($v.distance(this.origin, this.speedRect.center)) / (this.speedLineVerticalSize * 3);
            alpha = alpha < 0 ? 0 : alpha;
            this.speedLine.setAlpha(alpha);
        }
    };


    //
    // return API
    return { Laser: Laser };
});

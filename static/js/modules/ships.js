define(['gamejs', 'modules/globals', 'modules/sprite_sheet'], function(gamejs, globals, spriteSheet) {
    /*
     * Ship SuperClass.
     * -------------------------------------------------------------------------
     */
    var Ship = function(spriteSheetUrl, spriteSheetSpecs, center) {
        // call superconstructor
        Ship.superConstructor.apply(this, arguments);

        this.spriteSheet = new spriteSheet.SpriteSheet(spriteSheetUrl, spriteSheetSpecs);
        this.currentSprite = 0;
        this.center = this.newCenter = center;

        return this;
    };
    gamejs.utils.objects.extend(Ship, gamejs.sprite.Sprite);

    Ship.prototype.draw = function(display) {
        display.blit(this.spriteSheet.get(this.currentSprite), this.center);
    };

    /*
     * Player.
     * This is the main awesome ship controlled by the user.
     * -------------------------------------------------------------------------
     */
    var Player = function() {
        var center = [globals.game.screenSize[0] / 2, (globals.game.screenSize[1] / 2) + 50];
        var spriteSpecs = {
            width: globals.player.width,
            height: globals.player.height
        };
        var args = [].splice.call(arguments, 0);
        Player.superConstructor.apply(this, args.concat([globals.player.sprite, spriteSpecs, center]));
        this.center[0] -= globals.player.width / 2;

        return this;
    };
    gamejs.utils.objects.extend(Player, Ship);

    Player.prototype.handle = function(event) {
        if (event.type !== gamejs.event.KEY_DOWN ||
            (event.key !== gamejs.event.K_a && event.key !== gamejs.event.K_d &&
             event.key !== gamejs.event.K_s && event.key !== gamejs.event.K_w))
            return;
        this.newCenter = this.center.slice(0);
        switch(event.key) {
        case gamejs.event.K_a:
            this.newCenter[0] -= globals.player.normalStep;
            this.currentSprite = 1;
            break;
        case gamejs.event.K_d:
            this.newCenter[0] += globals.player.normalStep;
            this.currentSprite = 2;
            break;
        case gamejs.event.K_w:
            this.newCenter[1] -= globals.player.normalStep;
            break;
        case gamejs.event.K_s:
            this.newCenter[1] += globals.player.normalStep;
            break;
        }
    };

    Player.prototype.update = function() {
        // analyze restrictions.
        this.center = this.newCenter;
    };

    Player.prototype.draw = function(display) {
        display.blit(this.spriteSheet.get(this.currentSprite), this.center);
        this.currentSprite = 0;
    };

    //
    // Return API
    return {
        Ship: Ship,
        Player: Player
    };
});

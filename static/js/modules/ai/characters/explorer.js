define(['underscore', 'gamejs', 'modules/ai/characters/enemy', 'modules/globals', 'modules/laser', 'modules/helpers/utils', 'gamejs/utils/math', 'gamejs/utils/vectors'], function(_, gamejs, enemy, globals, laser, utils, $m, $v) {
    /*
     * Explorer ship.
     * Really dumb ships that fire just once in a while and move straight
     * forward in a semi random direction.
     */
    var Explorer = function() {
        Explorer.superConstructor.apply(this, arguments);

        // internal
        var orientationVariance = Math.random() * Math.PI / 32 * (Math.random() < 0.5 ? 1 : -1);  // ugh
        this.orientation = 3 * Math.PI / 2 + orientationVariance;

        // basics...
        this.image = gamejs.transform.rotate(gamejs.image.load(globals.enemies.images.explorer), $m.degrees(this.orientation + Math.PI));
        this.rect  = new gamejs.Rect([0, 0], this.image.getSize());
        this.mask  = gamejs.mask.fromSurface(this.image);

        // this ones might vary according to the level, but are common to every
        // enemy sprite.
        this.speed    = utils.randomBetween(0.9, 1, false) * 7;
        this.life     = 3;

        // firing
        this.fireRate = 1000 / globals.game.fps * 120;
        this.nextFire = Math.random() * this.fireRate;
    };
    gamejs.utils.objects.extend(Explorer, enemy.Enemy);

    Explorer.prototype.canShoot = function(msDuration) {
        if (this.rect.center > globals.game.screenSize[0]) return;

        this.nextFire -= msDuration;
        return this.nextFire < 0;
    };

    Explorer.prototype.shoot = function() {
        this.nextFire = this.fireRate;
        return new laser.Laser(globals.player.laserSprite, this.rect.center, this.orientation);
    };

    Explorer.prototype.setInitialPosition = function() {
        enemy.Enemy.prototype.setInitialPosition.call(this);
        var halfScreen = globals.game.screenSize[1] / 2;
        if (this.orientation > 3 * Math.PI / 2 && this.rect.top < halfScreen)
            this.rect.top += halfScreen;
        else if (this.orientation < 3 * Math.PI / 2 && this.rect.top > halfScreen)
            this.rect.top -= halfScreen;
        return;
    };

    Explorer.prototype.update = function(msDuration) {
        this.rect.left += this.speed * Math.cos(this.orientation - Math.PI/2);
        this.rect.top  += this.speed * Math.sin(this.orientation - Math.PI/2);
        if (this.rect.left < -this.image.getSize()[0] || this.rect.top < -this.image.getSize()[1] || this.rect.top > globals.game.screenSize[1])
            this.kill();
    };


    //
    // return API
    return { Explorer: Explorer };
});

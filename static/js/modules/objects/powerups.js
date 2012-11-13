define(['gamejs', 'modules/globals', 'modules/helpers/utils', 'gamejs/utils/math', 'gamejs/utils/vectors'], function(gamejs, globals, utils, $m, $v) {
    var Powerup = function(center) {
        Powerup.superConstructor.apply(this, arguments);

        this.type = utils.randomBetween(0, 4); // 0: Cloning
                                               // 1: Forking
                                               // 2: Branching
                                               // 3: Pulling
                                               // 4: Pushing
        this.image = gamejs.image.load(globals.powerups[this.type]);
        this.rect  = new gamejs.Rect($v.add(center, [-this.image.getSize()[0] / 2, -this.image.getSize()[1] / 2]));
        this.mask  = gamejs.mask.fromSurface(this.image);

        return this;
    };
    gamejs.utils.objects.extend(Powerup, gamejs.sprite.Sprite);

    Powerup.prototype.update = function(msDuration, world) {
        if (world.player.pulling > 0) {
            var angle = $m.normaliseRadians($v.angle([1, 0], $v.subtract(world.player.position, this.rect.topleft)));
            this.rect.left += world.level.speed * 4 * Math.cos(angle);
            this.rect.top  += world.level.speed * 4 * Math.sin(angle);
        } else
            this.rect.left -= world.level.speed;
        return;
    };

    Powerup.prototype.upgrade = function(player) {
        switch (this.type) {
            case 0: this.clone(player); break;
            case 1: this.fork(player); break;
            case 2: this.branch(player); break;
            case 3: this.pull(player); break;
            case 4: this.push(player); break;
        }
    };

    /*
     * Cloning: clones an extra life for the player
     */
    Powerup.prototype.clone = function(player) {
        if (player.lifes < 4) player.lifes++;
        return;
    };

    /*
     * Forking: more forking player power!
     */
    Powerup.prototype.fork = function(player) {
        if (player.ammoStrength < 5) player.ammoStrength++;
        return;
    };

    /*
     * Branching: branch player's laser weapons
     */
    Powerup.prototype.branch = function(player) {
        if (player.ammoRatio < 3) player.ammoRatio++;
        return;
    };

    /*
     * Pulling: now the player will automatically pull other powerups
     */
    Powerup.prototype.pull = function(player) {
        player.pulling += 30000;
        return;
    };

    /*
     * Pushing: player will automatically push enemies (including lasers) away,
     * for 30 seconds.
     */
    Powerup.prototype.push = function(player) {
        player.pushing += 30000;
        return;
    };


    //
    // Return API
    return { Powerup: Powerup };
});

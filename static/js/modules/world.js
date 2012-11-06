define(['gamejs', 'modules/ships',  'modules/ai/levels'], function(gamejs, ships, levels) {
    /*
     * What the world needs to control:
     * 1. updating levels
     * 2. controlling enemies generation in those levels (how many should be in
     *    screen at a time).
     * 3. powerups. maybe make them depend on the player's life an ammo.
     */

    var World = function(player) {
        this.player = player;
        this.currentLevel = 0;
        this.currentTime  = 0;
        this.enemies = new gamejs.sprite.Group();
        this.bullets = new gamejs.sprite.Group();  // only enemy bullets

        levels.init();
        this.level = levels.get(this.currentLevel);
    };

    World.prototype.draw = function(display) {
        this.player.draw(display);
        this.enemies.draw(display);
    };

    World.prototype.handle = function(event) {
        this.player.handle(event);
    };

    World.prototype.update = function(msDuration, player) {
        this.currentTime += msDuration;
        if (typeof this.level.duration !== 'undefined' && this.currentTime > this.level.duration) {
            this.currentLevel += 1;
            this.currentTime   = 0;
            this.level         = levels.get(this.currentLevel);
            // maybe upgrade score.
        }

        // update stuff
        this.level.update(msDuration, this);
        this.player.update(msDuration);
        this.enemies.update(msDuration);
        // update powerups.

        // check collisions

        // update score.
    };

    return {
        World: World
    };
});
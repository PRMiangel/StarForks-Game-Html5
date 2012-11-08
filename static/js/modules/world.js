define(['underscore', 'gamejs', 'modules/screen', 'modules/ai/levels', 'modules/player'], function(_, gamejs, screen, levels, $p) {
    /*
     * What the world needs to control:
     * 1. updating levels
     * 2. controlling enemies generation in those levels (how many should be in
     *    screen at a time).
     * 3. powerups. maybe make them depend on the player's life an ammo.
     */

    var World = function(player) {
        this.player = new $p.Player();
        this.currentLevel = 0;
        this.currentTime  = 0;
        this.enemies  = new gamejs.sprite.Group();
        this.bullets  = new gamejs.sprite.Group();  // only enemies' bullets
        this.powerups = new gamejs.sprite.Group();
        this.paused   = false;
        this.gameOver = false;

        levels.init();
        this.level = levels.get(this.currentLevel);
    };

    World.prototype.draw = function(display) {
        this.player.draw(display);
        this.enemies.draw(display);
    };

    World.prototype.handle = function(event) {
        this.player.handle(event);
        // pause / unpause world
        if (event.type === gamejs.event.KEY_DOWN && event.key === gamejs.event.K_ESC)
            this.paused = !this.paused;
    };

    World.prototype.update = function(msDuration) {
        var self = this;

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
        var bullet = null;
        _.each(this.enemies.sprites(), function(enemy) {
            enemy.update(msDuration);

            if (typeof enemy.canShoot !== 'undefined' && enemy.canShoot(msDuration)) {
                bullet = enemy.shoot();
                if (bullet != null) self.enemies.add(bullet);
            }
        });
        // update powerups.

        // check collisions (first powerups, then everything else)
        // var powerupsCollides = gamejs.sprite.spriteCollide(this.player, this.powerups);
        _.each(gamejs.sprite.groupCollide(this.player.lasers, this.enemies, true, false, gamejs.sprite.collideMask), function(collision) {
            var laser = collision.a,
                enemy = collision.b;
            enemy.getDamage(laser.strength);  // collision.b.kill();
        });
        if (this.player.isUntouchable()) return;

        _.each(gamejs.sprite.spriteCollide(this.player, this.enemies, false, gamejs.sprite.collideMask), function(enemy) {
            self.gameOver = self.player.getDamage();
            enemy.kill();
        });
        // var bulletsCollides  = gamejs.sprite.spriteCollide(this.player, this.bullets, true);

        // update score.
    };

    return {
        World: World
    };
});

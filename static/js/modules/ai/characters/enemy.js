define(['gamejs', 'modules/globals'], function(gamejs, globals) {
    /*
     * In this module we implement Enemy, the base class for all the monsters.
     */

    /*
     * Enemy.
     */
    var Enemy = function() {
        Enemy.superConstructor.apply(this, arguments);
        this.life = 1;
    };
    gamejs.utils.objects.extend(Enemy, gamejs.sprite.Sprite);

    Enemy.prototype.canShoot = function() {
        return false;
    };

    Enemy.prototype.shoot = function() {
        return null;
    };

    Enemy.prototype.getDamage = function(damage) {
        this.life -= damage;
        if (this.life <= 0) {
            this.kill();  // you dead, dude
            return globals.game.killScore;
        }
        return 0; // score
    };

    Enemy.prototype.setInitialPosition = function() {
        this.rect.left = Math.random() * globals.game.screenSize[0] + globals.game.screenSize[0] + 100;
        this.rect.top  = Math.random() * globals.game.screenSize[1];
        return;
    };


    //
    // Return API
    return {
        Enemy: Enemy
    };
});

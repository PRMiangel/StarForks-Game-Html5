define(['gamejs', 'modules/globals'], function(gamejs, globals) {
    /*
     * This is basically a proxy module for all the enemies in the
     * static/js/modules/ai/enemies/ lib
     *
     * In this module we also implement Enemy, the base class for all the
     * monsters.
     */

    /*
     * Enemy.
     */
    var Enemy = function() {
        Enemy.superConstructor.apply(this, arguments);
        this.life = 1;
    };
    gamejs.utils.objects.extend(Enemy, gamejs.sprite.Sprite);

    Enemy.prototype.getDamage = function(damage) {
        this.life -= damage;
        if (this.life <= 0) this.kill();  // you dead, dude
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

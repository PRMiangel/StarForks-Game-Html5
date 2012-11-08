define(['underscore', 'gamejs', 'modules/globals', 'modules/ai/foes'], function(_, gamejs, globals, foes) {
    /*
     * Level.
     * it's aware of all the enemies in this level and it's in charge of
     * generating them
     */
    var Level = function(opts) {
        _.extend(this, opts);
    };

    Level.prototype.update = function(msDuration, world) {
        var enemy;

        while (world.enemies.sprites().length < this.maxEnemies) {
            //enemyProb = Math.random();
            enemy = new this.enemies[0].type();
            enemy.setInitialPosition();
            world.enemies.add(enemy);
        }
    };


    /*
     * Module helper functions
     */
    var list = [];

    var init = function() {
        list.push(
            new Level({
                maxEnemies: 5,
                enemies: [{type: foes.Meteor, prob: 1}]
            })
        );
    };

    var get = function(i) {
        return list[i];
    };


    //
    // Return API
    return {
        init: init,
        get: get
    };
});

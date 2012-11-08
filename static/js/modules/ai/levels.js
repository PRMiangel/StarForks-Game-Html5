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
            enemy = this.pickEnemy();
            enemy = new enemy.type();
            enemy.setInitialPosition();
            world.enemies.add(enemy);
        }
    };

    Level.prototype.pickEnemy = function() {
        var oldAcc, probAcc = 0;
        var select  = Math.random();
        return _.find(this.enemies, function(enemy) {
            oldAcc = probAcc;
            probAcc += enemy.prob;
            return (select >= oldAcc && select < probAcc);
        });
    };


    /*
     * Module helper functions
     */
    var list = [];

    var init = function() {
        list.push(
            new Level({
                maxEnemies: 5,
                enemies: [
                    {type: foes.Meteor, prob: .7},
                    {type: foes.Explorer, prob: .3}
                ]
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

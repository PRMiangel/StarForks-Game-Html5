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
        var enemyProb, position;

        while (world.enemies.sprites().length < this.maxEnemies) {
            //enemyProb = Math.random();
            position = [
                Math.random() * globals.game.screenSize[0] + globals.game.screenSize[0] + 100,
                Math.random() * globals.game.screenSize[1]
            ];
            world.enemies.add(new this.enemies[0].type(position));
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

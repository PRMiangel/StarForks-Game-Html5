define(['gamejs', 'modules/ai/characters/enemy', 'modules/globals', 'modules/utils', 'gamejs/utils/vectors'], function(gamejs, enemy, globals, utils, $v) {
    /*
     * Meteor.
     */
    var Meteor = function(position) {
        Meteor.superConstructor.apply(this, arguments);

        // basics...
        this.image = gamejs.image.load(globals.enemies.images.meteor);
        this.rect  = new gamejs.Rect(position, this.image.getSize());

        // this ones might vary according to the level, but are common to every
        // enemy sprite.
        this.speed    = utils.randomBetween(0.5, 1, false) * 250;
        this.life     = 5;
        // this.strength = 5; // ?

        // and this ones only make sense for a meteor.
        this.orientation = Math.random() * Math.PI * 2;
        this.rotation = 75;
    };
    gamejs.utils.objects.extend(Meteor, enemy.Enemy);

    Meteor.prototype.update = function(msDuration) {
        var time = msDuration / 1000;
        this.rect.left -= this.speed * time;

        this.orientation += this.rotation * time;

        if (this.rect.right < 0) this.kill();

//        this.image = gamejs.transform.rotate(this.image, this.orientation);
    };


    //
    // Return API
    return {
        Meteor: Meteor
    };
});

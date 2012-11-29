define(['gamejs', 'modules/ai/characters/enemy', 'modules/globals', 'modules/objects/laser', 'modules/helpers/utils', 'gamejs/utils/math', 'gamejs/utils/vectors'], function(gamejs, enemy, globals, laser, utils, $m, $v) {
    /*
     * Raider ship.
     * A fast ship that can shoot two lasers at a time.
     */
    var Raider = function(spriteUrl, speed, life, fireRate, fireDeviation) {
        Raider.superConstructor.apply(this, arguments);

        // init arguments
        spriteUrl     = spriteUrl || globals.enemies.images.raider;
        speed         = speed || utils.randomBetween(0.9, 1, false) * 10;
        life          = life || 5;
        fireRate      = fireRate || 1000 / globals.game.fps * 30;
        fireDeviation = fireDeviation || 25;

        // internal
        this.orientation = 3 * Math.PI / 2;

        // basics...
        this.image = gamejs.transform.rotate(gamejs.image.load(spriteUrl), $m.degrees(this.orientation + Math.PI));
        this.rect  = new gamejs.Rect([0, 0], this.image.getSize());
        this.mask  = gamejs.mask.fromSurface(this.image);

        // this ones might vary according to the level, but are common to every
        // enemy sprite.
        this.speed    = speed;
        this.life     = life;
        this.firingSpeed = 50;  // it may be a good idea to relate this to the enemy's speed.

        // firing
        this.fireRate = fireRate;
        this.nextFire = Math.random() * this.fireRate;
        this.firingSide = 0;  // 0: left; 1: right
        this.fireDeviation = fireDeviation;
    };
    gamejs.utils.objects.extend(Raider, enemy.ShooterEnemy);

    Raider.prototype.shoot = function() {
        this.nextFire = this.fireRate;

        var position = $v.add(this.rect.center, [0, this.firingSide === 0 ? this.fireDeviation : -this.fireDeviation]);

        this.firingSide = (this.firingSide + 1) % 2;

        return new laser.Laser(
            globals.enemies.laserSprite, position, this.orientation,
            { 'speed': this.firingSpeed }
        );
    };

    Raider.prototype.update = function(msDuration) {
        this.rect.left += this.speed * Math.cos(this.orientation - Math.PI/2);
        this.rect.top  += this.speed * Math.sin(this.orientation - Math.PI/2);
        if (this.rect.left < -this.image.getSize()[0] || this.rect.top < -this.image.getSize()[1] || this.rect.top > globals.game.screenSize[1])
            this.kill();
    };


    /*
     * Raider ship.
     * A fast ship that can shoot two lasers at a time.
     */
    var HeavyRaider = function() {
        var args = [].splice.call(arguments, 0);
        HeavyRaider.superConstructor.apply(this, args.concat([
            globals.enemies.images.heavyraider,
            utils.randomBetween(0.9, 1, false) * 10,
            7,
            1000 / globals.game.fps * 25,
            50
        ]));
    };
    gamejs.utils.objects.extend(HeavyRaider, Raider);

    HeavyRaider.prototype.shoot = function() {
        var laser = Raider.prototype.shoot.call(this);
        if (this.firingSide === 1)
            this.nextFire /= 8;
        return laser;
    };


    //
    // Return API
    return {
        Raider: Raider,
        HeavyRaider: HeavyRaider
    };
});

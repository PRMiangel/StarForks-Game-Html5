define(['gamejs', 'modules/globals', 'modules/sprite_sheet', 'gamejs/utils/vectors'], function(gamejs, globals, spriteSheet, $v) {
    /*
     * Ship SuperClass.
     * -------------------------------------------------------------------------
     */
    var Ship = function(spriteSheetUrl, spriteSheetSpecs, position) {
        // call superconstructor
        Ship.superConstructor.apply(this, arguments);

        this.spriteSheet = new spriteSheet.SpriteSheet(spriteSheetUrl, spriteSheetSpecs);
        this.currentSprite = 0;

        // kinematics
        this.position = this.newPosition = position;
        this.orientation = 0;  // 0 orientation means looking down the y axis (-y). in degrees
        this.velocity = [0, 0];
        this.rotation = 0;
        this.steering = {
            linear: [0, 0],
            angular: 0
        };

        return this;
    };
    gamejs.utils.objects.extend(Ship, gamejs.sprite.Sprite);

    Ship.prototype.draw = function(display) {
        display.blit(this.spriteSheet.get(this.currentSprite), this.position);
    };

    /*
     * Player.
     * This is the main awesome ship controlled by the user.
     * -------------------------------------------------------------------------
     */
    var Player = function() {
        var center = [globals.game.screenSize[0] / 2, (globals.game.screenSize[1] / 2) + 50];
        var spriteSpecs = {
            width: globals.player.width,
            height: globals.player.height
        };
        var args = [].splice.call(arguments, 0);
        Player.superConstructor.apply(this, args.concat([globals.player.sprite, spriteSpecs, center]));
        this.position[0] -= globals.player.width / 2;

        return this;
    };
    gamejs.utils.objects.extend(Player, Ship);

    Player.prototype.handle = function(event) {
        if (event.type !== gamejs.event.KEY_DOWN ||
            (event.key !== gamejs.event.K_a && event.key !== gamejs.event.K_d &&
             event.key !== gamejs.event.K_s && event.key !== gamejs.event.K_w))
            return;
        switch(event.key) {
        case gamejs.event.K_a:
            this.steering.linear[0] -= globals.player.normalStep;
            break;
        case gamejs.event.K_d:
            this.steering.linear[0] += globals.player.normalStep;
            break;
        case gamejs.event.K_w:
            this.steering.linear[1] -= globals.player.normalStep;
            break;
        case gamejs.event.K_s:
            this.steering.linear[1] += globals.player.normalStep;
            break;
        }
    };

    Player.prototype.update = function(time) {
        // analyze restrictions. decision making process. kinematic algorithms

        //
        // kinematics
        time = time / 1000;

        this.velocity     = this.linearMovement(time);
        this.position     = $v.add(this.position, $v.multiply(this.velocity, time));

        this.rotation    += this.angularMovement(time);
        this.orientation += this.rotation * time;

        // also set the sprite according to the current velocity
        if (this.velocity[0] == 0)
            this.currentSprite = 0;
        else if (this.velocity[0] > 0)
            this.currentSprite = 2;
        else
            this.currentSprite = 1;

        this.steering.linear = [0, 0];
    };

    Player.prototype.linearMovement = function(time) {
        var newVelocity = $v.add(this.velocity, $v.multiply(this.steering.linear, time));
        // wind resistance
        if (newVelocity[0] != 0) {
            if (newVelocity[0] > 0)
                newVelocity[0] -= globals.physics.windResistance;
            else
                newVelocity[0] += globals.physics.windResistance;
            newVelocity[0] = (Math.abs(newVelocity[0]) > globals.physics.windResistance * 0.75 ? newVelocity[0] : 0);
        }
        if (newVelocity[1] != 0) {
            if (newVelocity[1] > 0)
                newVelocity[1] -= globals.physics.windResistance;
            else
                newVelocity[1] += globals.physics.windResistance;
            newVelocity[1] = (Math.abs(newVelocity[1]) > globals.physics.windResistance * 0.75 ? newVelocity[1] : 0);
        }
        return newVelocity;
    };

    Player.prototype.angularMovement = function(time) {
        return this.steering.angular * time;
    };

    //
    // Return API
    return {
        Ship: Ship,
        Player: Player
    };
});

define(['gamejs', 'modules/globals', 'modules/helpers/sprite_sheet', 'gamejs/utils/math', 'gamejs/utils/vectors'], function(gamejs, globals, spriteSheet, $m, $v) {

    var BASE_SPRITE_ORIENTATION = [0, -1];

    /*
     * Player.
     * This is the main awesome ship controlled by the user.
     * -------------------------------------------------------------------------
     */
    var Player = function() {
        // call superconstructor
        Player.superConstructor.apply(this, arguments);

        var center = [90, globals.game.screenSize[1] / 2];
        var spriteSpecs = {
            width: globals.player.width,
            height: globals.player.height
        };
        var args = [].splice.call(arguments, 0);

        this.spriteSheet = new spriteSheet.SpriteSheet(globals.player.sprite, spriteSpecs);
        this.currentSprite = 0;

        // kinematics
        this.position = this.newPosition = center;
        this.velocity = [0, 0];
        this.orientation = 0;  // 0 orientation means looking down the y axis (-y). in radians
        this.rotation = 0;
        this.steering = {
            linear: [0, 0],
            angular: 0
        };
        this.directions = [0, 0];
        this.seeking = [globals.game.screenSize[0], this.position[1]];

        // game internals
        this.rect = new gamejs.Rect(center, [globals.player.width-15, globals.player.width-15]);
        this.surface = this.spriteSheet.get(this.currentSprite);
        this.mask = gamejs.mask.fromSurface(this.surface);

        // life
        this.lifes = globals.player.defaultLifes;
        this.untouchable = 0;
        this.hit = false;
        this.hitAnimation = undefined;

        return this;
    };
    gamejs.utils.objects.extend(Player, gamejs.sprite.Sprite);


    Player.prototype.draw = function(display) {
        // set the player opacity (in case of hit)
        if (typeof this.hitAnimation != 'undefined') {
            if (this.hitAnimation)
                this.surface.setAlpha(0);
            else
                this.surface.setAlpha(1);
        }

        // just draw.
        display.blit(this.surface, $v.add(this.position, [-this.surface.getSize()[0]/2, -this.surface.getSize()[1]/2]));

        // DEBUG: orientation
        // gamejs.draw.line(display, '#FFFF00', this.position, this.seeking);
        // gamejs.draw.line(display, '#FF0000', this.rect.topleft, this.rect.topright);
        // gamejs.draw.line(display, '#FF0000', this.rect.topleft, this.rect.bottomleft);
        // gamejs.draw.line(display, '#FF0000', this.rect.bottomleft, this.rect.bottomright);
        // gamejs.draw.line(display, '#FF0000', this.rect.bottomright, this.rect.topright);
    };

    Player.prototype.handle = function(event) {
        if (event.type !== gamejs.event.KEY_DOWN && event.type !== gamejs.event.KEY_UP &&
            event.type !== gamejs.event.MOUSE_MOTION)
            return;
        if (event.type === gamejs.event.KEY_DOWN) {
            if (event.key === gamejs.event.K_a) this.directions[0] -= 1;
            if (event.key === gamejs.event.K_d) this.directions[0] += 1;
            if (event.key === gamejs.event.K_s) this.directions[1] += 1;
            if (event.key === gamejs.event.K_w) this.directions[1] -= 1;
        } else if (event.type === gamejs.event.KEY_UP) {
            if (event.key === gamejs.event.K_a) this.directions[0] = 0;
            if (event.key === gamejs.event.K_d) this.directions[0] = 0;
            if (event.key === gamejs.event.K_s) this.directions[1] = 0;
            if (event.key === gamejs.event.K_w) this.directions[1] = 0;
        } else {  // mouse motion
            this.seeking = event.pos;
        }
        this.steering.linear = $v.multiply(this.directions, globals.player.normalStep);
    };

    Player.prototype.update = function(time) {
        // analyze restrictions. decision making process. kinematic algorithms

        //
        // manage life
        this.untouchable -= time;
        if (this.isUntouchable())
            this.hitAnimation = !this.hitAnimation;
        else
            this.hitAnimation = undefined;

        //
        // kinematics
        time = time / 1000;

        this.velocity     = this.linearMovement(time);
        this.position     = $v.add(this.position, $v.multiply(this.velocity, time));

        //this.rotation     = this.angularMovement(time);
        this.orientation  = this.angularMovement(time);  // radians

        this.rect.center  = this.position;

        // also set the sprite according to the current velocity
        if (this.velocity[1] == 0)
            this.currentSprite = 0;
        else if (this.velocity[1] > 0)
            this.currentSprite = 2;
        else
            this.currentSprite = 1;
        if (this.lifes == 0) this.currentSprite = 3;

        //
        // update the surface
        this.surface = gamejs.transform.rotate(this.spriteSheet.get(this.currentSprite), $m.normaliseDegrees($m.degrees(this.orientation)));
        this.mask = gamejs.mask.fromSurface(this.surface);

        //
        // map restrictions
        if (this.position[0] < 0) {
            this.position[0] = 0;
            this.velocity[0] *= -0.5;
        }
        if (this.position[0] > globals.game.screenSize[0]) {
            this.position[0] = globals.game.screenSize[0];
            this.velocity[0] *= -0.5;
        }
        if (this.position[1] < 0) {
            this.position[1] = 0;
            this.velocity[1] *= -0.5;
        }
        if (this.position[1] > globals.game.screenSize[1]) {
            this.position[1] = globals.game.screenSize[1];
            this.velocity[1] *= -0.5;
        }
   };

    Player.prototype.linearMovement = function(time) {
        var newVelocity = $v.add(this.velocity, $v.multiply(this.steering.linear, time));
        var direction = [0, 0];
        // direction
        if (newVelocity[0] != 0)
            if (newVelocity[0] > 0)
                direction[0] = 1;
            else
                direction[0] = -1;
        if (newVelocity[1] != 0)
            if (newVelocity[1] > 0)
                direction[1] = 1;
            else
                direction[1] = -1;

        // wind resistance
        newVelocity = $v.add(newVelocity, $v.multiply(direction, globals.physics.windResistance * -1));
        newVelocity[0] = (Math.abs(newVelocity[0]) > globals.physics.windResistance * 0.75 ? newVelocity[0] : 0);
        newVelocity[1] = (Math.abs(newVelocity[1]) > globals.physics.windResistance * 0.75 ? newVelocity[1] : 0);

        // max speed
        newVelocity[0] = (Math.abs(newVelocity[0]) > globals.player.maxSpeed ? (globals.player.maxSpeed * direction[0]) : newVelocity[0]);
        newVelocity[1] = (Math.abs(newVelocity[1]) > globals.player.maxSpeed ? (globals.player.maxSpeed * direction[1]) : newVelocity[1]);

        return newVelocity;
    };

    Player.prototype.angularMovement = function(time) {
        return $v.angle(BASE_SPRITE_ORIENTATION, $v.subtract(this.seeking, this.position));
        //return this.steering.angular * time;
    };


    //
    // Helpers
    Player.prototype.getDamage = function() {
        if (this.isUntouchable())
            return;
        this.lifes--;
        this.untouchable = 1000;
        this.hit = true;
        this.hitAnimation = true;
        return (this.lifes < 0);
    };

    Player.prototype.isUntouchable = function() {
        return this.untouchable > 0;
    };

    //
    // Return API
    return {
        Player: Player
    };
});

define(['gamejs', 'modules/globals', 'modules/utils', 'gamejs/utils/vectors'], function(gamejs, globals, utils, $v) {
    var size  = [globals.game.screenSize[0], Math.ceil(globals.game.screenSize[1] / 256) * 256];

    /*
     * StarsField.
     * -------------------------------------------------------------------------
     */
    var StarsField = function() {
        //var size  = utils.hypotenuse(globals.game.screenSize);

        this.field1 = new utils.PatternSurface(size);
        this.field2 = new utils.PatternSurface(size);

        this.field1.fillPattern(globals.starsField.image);
        this.field2.fillPattern(globals.starsField.image);

        this.offset1 = [0, 0];
        this.offset2 = [0, -size[1]];

        this.speed = 5;

        // clouds
        this.clouds = new Clouds();
    };

    StarsField.prototype.draw = function(display) {
        display.blit(this.field1, this.offset1);
        display.blit(this.field2, this.offset2);

        this.clouds.draw(display);
    };

    StarsField.prototype.handle = function(event) {
    };

    StarsField.prototype.update = function(msDuration) {
        this.offset1[1] += this.speed;
        this.offset2[1] += this.speed;

        if (this.offset1[1] >= 0)
            this.offset2[1] = -size[1] + this.offset1[1];
        if (this.offset2[1] >= 0)
            this.offset1[1] = -size[1] + this.offset2[1];

        this.clouds.update(msDuration / 1000);
    };


    /*
     * CloudsField.
     * -------------------------------------------------------------------------
     */
    var Clouds = function(count) {
        count = count || 20;

        this.queue = [];
        this.maxSpeed = 250;
        this.maxAlpha = 1;

        // seed the clouds.
        for (var i = 0; i < count; i++) {
            var cloud = gamejs.image.load(globals.starsField.cloud);
            cloud = gamejs.transform.scale(cloud, $v.multiply(cloud.getSize(), utils.randomBetween(50, 100) / 100));
            cloud.setAlpha(Math.random() * this.maxAlpha);
            cloud.position = [Math.random() * size[0] - cloud.getSize()[0] / 2, Math.random() * size[1] - size[1]];
            cloud.speed    = Math.random() * this.maxSpeed;

            this.queue.push(cloud);
        }

        return this;
    };

    Clouds.prototype.draw = function(display) {
        this.queue.forEach(function(cloud) {
            display.blit(cloud, cloud.position);
        });
    };

    Clouds.prototype.update = function(time) {
        var maxSpeed = this.maxSpeed,
            maxAlpha = this.maxAlpha;
        this.queue.forEach(function(cloud) {
            if (cloud.position[1] < size[1])
                cloud.position[1] += cloud.speed * time;
            else {
                // this cloud is off the screen, better "create" a new one.
                cloud.position = [Math.random() * size[0] - cloud.getSize()[0] / 2, Math.random() * size[1] - size[1]];
                cloud.speed    = Math.random() * maxSpeed;
                cloud.setAlpha(Math.random() * maxAlpha);
            }
        });
    };


    //
    // return the API
    return {
        StarsField: StarsField
    };
});

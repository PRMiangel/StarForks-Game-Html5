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
        this.lowerClouds = new Clouds();
        this.upperClouds = new Clouds(10, [0.5, 1]);

        return this;
    };

    StarsField.prototype.draw = function(display) {
        display.blit(this.field1, this.offset1);
        display.blit(this.field2, this.offset2);

        this.lowerClouds.draw(display);
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

        this.lowerClouds.update(msDuration / 1000);
        this.upperClouds.update(msDuration / 1000);
    };


    /*
     * CloudsField.
     * -------------------------------------------------------------------------
     */
    var Clouds = function(count, alphaRange) {
        count = count || 10;

        this.queue = [];
        this.maxSpeed = 250;
        this.alphaRange = alphaRange || [0, 1];

        // seed the clouds.
        for (var i = 0; i < count; i++) {
            var cloud = gamejs.image.load(globals.starsField.cloud);
            cloud = gamejs.transform.scale(cloud, $v.multiply(cloud.getSize(), utils.randomBetween(50, 100) / 100));
            cloud.setAlpha(utils.randomBetween(this.alphaRange[0], this.alphaRange[1], false));
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
        var maxSpeed   = this.maxSpeed,
            alphaRange = this.alphaRange;
        this.queue.forEach(function(cloud) {
            if (cloud.position[1] < size[1])
                cloud.position[1] += cloud.speed * time;
            else {
                // this cloud is off the screen, better "create" a new one.
                cloud.position = [Math.random() * size[0] - cloud.getSize()[0] / 2, Math.random() * size[1] - size[1]];
                cloud.speed    = Math.random() * maxSpeed;
                cloud.setAlpha(utils.randomBetween(alphaRange[0], alphaRange[1], false));
            }
        });
    };


    //
    // return the API
    return {
        Clouds: Clouds,
        StarsField: StarsField
    };
});

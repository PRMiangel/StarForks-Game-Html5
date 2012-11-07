define(['underscore', 'gamejs', 'modules/globals', 'modules/screen', 'modules/stars', 'modules/world'], function(_, gamejs, globals, screen, stars, $w) {
    return function() {
        var display = gamejs.display.setMode(globals.game.screenSize);
        var starsField = new stars.StarsField();
        var world = new $w.World();

        screen.init();

        var tick = function(msDuration) {
            // events
            _.each(gamejs.event.get(), function(event) {
                //starsField.handle(event);
                world.handle(event);
            });

            if (world.paused || world.gameOver) return;

            // update
            starsField.update(msDuration);
            world.update(msDuration);
            screen.update(msDuration, world);

            // redraw
            display.clear();
            starsField.draw(display);

            world.draw(display);

            starsField.upperClouds.draw(display);
            starsField.stars.draw(display);

            screen.draw(display, world);
        };

        gamejs.time.fpsCallback(tick, this, globals.game.fps);
    };
});

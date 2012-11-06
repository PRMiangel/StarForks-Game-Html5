define(['underscore', 'gamejs', 'modules/globals', 'modules/screen', 'modules/ships',  'modules/stars', 'modules/world'], function(_, gamejs, globals, screen, ships, stars, $w) {
    return function() {
        var display = gamejs.display.setMode(globals.game.screenSize);
        var starsField = new stars.StarsField();
        var world = new $w.World(new ships.Player());

        var tick = function(msDuration) {
            // events
            _.each(gamejs.event.get(), function(event) {
                //starsField.handle(event);
                world.handle(event);
                screen.handle(event, display);
            });

            if (screen.pause) return;

            // update
            starsField.update(msDuration);
            world.update(msDuration);
            screen.update(msDuration);

            // redraw
            display.clear();
            starsField.draw(display);

            world.draw(display);

            starsField.upperClouds.draw(display);
            starsField.stars.draw(display);

            screen.draw();
        };

        gamejs.time.fpsCallback(tick, this, globals.game.fps);
    };
});

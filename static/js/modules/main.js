define(['underscore', 'gamejs', 'modules/globals', 'modules/ships',  'modules/stars', 'modules/world'], function(_, gamejs, globals, ships, stars, $w) {
    return function() {
        var display = gamejs.display.setMode(globals.game.screenSize);
        var starsField = new stars.StarsField();
        var world = new $w.World(new ships.Player());

        var tick = function(msDuration) {
            // events
            _.each(gamejs.event.get(), function(event) {
                //starsField.handle(event);
                world.handle(event);
            });

            // update
            starsField.update(msDuration);
            world.update(msDuration);

            // redraw
            display.clear();
            starsField.draw(display);

            world.draw(display);

            starsField.upperClouds.draw(display);
            starsField.stars.draw(display);
        };

        gamejs.time.fpsCallback(tick, this, globals.game.fps);
    };
});

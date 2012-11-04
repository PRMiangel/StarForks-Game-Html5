define(['gamejs', 'modules/globals', 'modules/stars'], function(gamejs, globals, stars) {
    return function() {
        var display = gamejs.display.setMode(globals.game.screenSize);
        var starsField = new stars.StarsField();

        var tick = function(msDuration) {
            // events
            gamejs.event.get().forEach(function(event) {
                starsField.handle(event);
            });

            // update
            starsField.update();

            // redraw
            display.clear();
            starsField.draw(display);
        };

        gamejs.time.fpsCallback(tick, this, globals.game.fps);
    };
});

define(['gamejs', 'modules/globals', 'modules/ships', 'modules/stars'], function(gamejs, globals, ships, stars) {
    return function() {
        var display = gamejs.display.setMode(globals.game.screenSize);
        var starsField = new stars.StarsField();
        var player = new ships.Player();

        var tick = function(msDuration) {
            // events
            gamejs.event.get().forEach(function(event) {
                starsField.handle(event);
                player.handle(event);
            });

            // update
            starsField.update();
            player.update(msDuration);

            // redraw
            display.clear();
            starsField.draw(display);
            player.draw(display);
        };

        gamejs.time.fpsCallback(tick, this, globals.game.fps);
    };
});

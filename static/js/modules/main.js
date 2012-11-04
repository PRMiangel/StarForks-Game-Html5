define(['gamejs', 'modules/globals'], function(gamejs, globals) {
    return function() {
        var display = gamejs.display.setMode(globals.game.screenSize);

        var tick = function(msDuration) {
            // events
            gamejs.event.get().forEach(function(event) {
            });

            // update

            // redraw
            display.clear();
        };

        gamejs.time.fpsCallback(tick, this, globals.game.fps);
    };
});

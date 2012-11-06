define(['gamejs', 'modules/globals'], function(gamejs, globals) {
    var surfaces = {
            lifes: new gamejs.Surface([40 * globals.player.defaultLifes, 27]),
            hit: new gamejs.Surface(globals.game.screenSize)
        },
        paused = false,
        playerLifes = globals.player.defaultLifes,
        playerHit,
        lifeSprite;

    /*
     * Draws every little detail in the screen.
     */
    var draw = function(display) {
        // clear everything
        for (var key in surfaces)
            surfaces[key].clear();

        // lifes
        for (var i = 0; i < playerLifes; i++)
            surfaces.lifes.blit(lifeSprite, [i * 40, 0]);

        // hit flash
        if (typeof playerHit != 'undefined') {
            gamejs.draw.rect(surfaces.hit, '#FFFFFF', new gamejs.Rect([0, 0], globals.game.screenSize));
            if (!playerHit)
                surfaces.hit.setAlpha(0.5);
        }

        // blit everything in display
        display.blit(surfaces.lifes, [10, 10]);
        display.blit(surfaces.hit);
    };

    var handle = function(event, display) {
    };

    /*
     * Init images.
     */
    var init = function() {
        lifeSprite = gamejs.image.load(globals.player.lifeSprite);
    };

    /*
     * Pauses the game and draw the pause screen
     */
    var pause = function(display) {
    };

    /*
     * Unpauses and destroys the pause screen
     */
    var unPause = function(display) {
    };

    var update = function(msDuration, world) {
        playerLifes = world.player.lifes;

        if (playerHit)
            playerHit = false;
        else if (playerHit === false)
            playerHit = undefined;
        else
            playerHit = world.player.hit ? true : undefined;
        world.player.hit = false;  // this might not be the best place to set this
        // playerHit -= msDuration;
        // if (playerHit < 0) playerHit = 0;
        // if (playerHit != 0) console.log(playerHit);
    };

    return {
        draw: draw,
        handle: handle,
        init: init,
        paused: paused,
        update: update
    };
});

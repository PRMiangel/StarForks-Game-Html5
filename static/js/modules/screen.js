define(['gamejs', 'modules/globals'], function(gamejs, globals) {
    var surfaces = {
            lifes: new gamejs.Surface([40 * globals.player.defaultLifes, 27]),
            hit: new gamejs.Surface(globals.game.screenSize)
        },
        playerHit,
        lifeSprite;

    /*
     * Draws every little detail in the screen.
     */
    var draw = function(display, world) {
        if (world.gameOver) {
            // draw the gameover screen
            return;
        }

        // clear everything
        for (var key in surfaces)
            surfaces[key].clear();

        // lifes
        for (var i = 0; i < world.player.lifes; i++)
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
    var unpause = function(display) {
    };

    var update = function(msDuration, world) {
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
        init: init,
        pause: pause,
        unpause: unpause,
        update: update
    };
});

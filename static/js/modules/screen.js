define(['gamejs', 'modules/globals'], function(gamejs, globals) {
    var surfaces = {
            lifes: new gamejs.Surface([40 * globals.player.defaultLifes, 27]),
            fullscreen: new gamejs.Surface(globals.game.screenSize)
        },
        fonts,
        playerHit,
        lifeSprite;

    /*
     * Draws every little detail in the screen.
     */
    var draw = function(display, world) {
        if (world.gameOver) { // draw the gameover screen
            gamejs.draw.rect(surfaces.fullscreen, '#000000', new gamejs.Rect([0, 0], globals.game.screenSize));
            surfaces.fullscreen.setAlpha(0.3);
            display.blit(surfaces.fullscreen);
            var gameover = fonts.big.render('GAME OVER', '#FFFFFF');
            display.blit(gameover, [globals.game.screenSize[0] / 2 - gameover.getSize()[0] / 2, globals.game.screenSize[1] / 2 - gameover.getSize()[1] - 2]);
            return;
        }

        if (world.paused) { // draw the pause screen
            gamejs.draw.rect(surfaces.fullscreen, '#000000', new gamejs.Rect([0, 0], globals.game.screenSize));
            surfaces.fullscreen.setAlpha(0.3);
            display.blit(surfaces.fullscreen);
            // now the instructions
            var pause = fonts.big.render('PAUSE', '#FFFFFF');
            var esc   = fonts.small.render('Press ESC to unpause', '#FFFFFF');
            display.blit(pause, [globals.game.screenSize[0] / 2 - pause.getSize()[0] / 2, globals.game.screenSize[1] / 2 - pause.getSize()[1] - 2]);
            display.blit(esc, [globals.game.screenSize[0] / 2 - esc.getSize()[0] / 2, globals.game.screenSize[1] / 2 + 2]);
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
            gamejs.draw.rect(surfaces.fullscreen, '#FFFFFF', new gamejs.Rect([0, 0], globals.game.screenSize));
            if (!playerHit)
                surfaces.fullscreen.setAlpha(0.5);
        }

        // blit everything in display
        display.blit(surfaces.lifes, [10, 10]);
        display.blit(surfaces.fullscreen);
    };

    /*
     * Init images.
     */
    var init = function() {
        lifeSprite = gamejs.image.load(globals.player.lifeSprite);
        fonts = {
            big: new gamejs.font.Font('64px Aller'),
            small: new gamejs.font.Font('24px Aller')
        };
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

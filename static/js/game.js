require.config({
    paths: {
        // templates: '../templates',
        backbone: 'libs/backbone/backbone',
        gamejs: 'libs/gamejs/gamejs',
        jquery: 'libs/jquery/jquery-1.8.2',
        underscore: 'libs/underscore/underscore'
    }
});

require(['jquery', 'gamejs', 'modules/main', 'modules/globals'], function($, gamejs, main, globals) {
    // game init
    gamejs.preload([
        globals.starsField.image,
        globals.starsField.cloud,
        globals.starsField.starSmall,
        globals.player.sprite,
        globals.player.lifeSprite,
        globals.player.laserSprite,
        globals.player.speedSprite,
        globals.enemies.images.explorer,
        globals.enemies.images.meteor,
        globals.enemies.laserSprite,
        globals.powerups[0],
        globals.powerups[1],
        globals.powerups[2],
        globals.powerups[3],
        globals.powerups[4]
    ]);

    globals.screenSize = [$('gjs-canvas').attr('width'), $('gjs-canvas').attr('height')];
    gamejs.ready(main);
});

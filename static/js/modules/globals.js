define(function() {
    return {
        game: {
            fps: 36,
            screenSize: [940, 480]
        },
        starsField: {
            image: 'static/images/background/starBackground.png'
        },
        player: {
            sprite: 'static/images/playerSprite.png',
            width: 99,
            height: 75,
            normalStep: 5,
            damagedStep: 2
        }
    };
});

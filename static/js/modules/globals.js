define(function() {
    return {
        game: {
            fps: 36,
            screenSize: [window.innerWidth-20, window.innerHeight-20]
        },
        starsField: {
            image: 'static/images/background/starBackground.png',
            cloud: 'static/images/background/nebula.png',
            meteorBig: 'static/images/meteorBig.png',
            starSmall: 'static/images/background/starSmall.png'
        },
        player: {
            sprite: 'static/images/playerSprite.png',
            width: 99,
            height: 75,
            normalStep: 1500,
            damagedStep: 2,
            maxSpeed: 500
        },
        physics: {
            windResistance: 15
        }
    };
});

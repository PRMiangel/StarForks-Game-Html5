define(function() {
    return {
        game: {
            fps: 36,
            screenSize: [window.innerWidth-20, window.innerHeight-20]
        },
        starsField: {
            image: 'static/images/background/starBackground.png',
            cloud: 'static/images/background/nebula.png',
            starSmall: 'static/images/background/starSmall.png'
        },
        player: {
            sprite: 'static/images/playerSprite.png',
            lifeSprite: 'static/images/life.png',
            laserSprite: 'static/images/laserGreen.png',
            speedSprite: 'static/images/background/speedLine.png',
            defaultLifes: 4,
            width: 99,
            height: 75,
            normalStep: 1500,
            damagedStep: 1000,
            maxSpeed: 500
        },
        enemies: {
            images: {
                meteor: 'static/images/meteorBig.png'
            }
        },
        physics: {
            windResistance: 15
        }
    };
});

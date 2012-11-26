define(function() {
    return {
        game: {
            fps: 36,
            killScore: 5,
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
            maxSpeed: 500,
            circleSpeed: 400
        },
        enemies: {
            images: {
                explorer: 'static/images/enemyShip.png',
                meteor: 'static/images/meteorBig.png'
            },
            laserSprite: 'static/images/laserRed.png'
        },
        powerups: {
            0: 'static/images/powerups/cloning.png',
            1: 'static/images/powerups/forking.png',
            2: 'static/images/powerups/branching.png',
            3: 'static/images/powerups/pulling.png',
            4: 'static/images/powerups/pushing.png',
            screenDuration: 835
        },
        physics: {
            windResistance: 15
        }
    };
});

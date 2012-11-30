# StarForks - a simple html5 game.

This is a simple space battleship game where you can collect powerups that
somehow resemble git verbs.

To play the game just go to:
[http://volrath.github.com/game-off-2012](volrath.github.com/game-off-2012).

## Tech Information

This game is entirely build over the HTML Canvas element, using a customized
version of [GameJS](http://gamejs.org) that is
[AMD](http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition) compliant
and has some bugfixes that I will try to contribute to the project later. I used
[RequireJS](http://requirejs.org) as the AMD implementation.

### Open Source projects used

* [GameJS](http://gamejs.org)
* [RequireJS](http://requirejs.org)
* [JQuery](http://jquery.com)

My customized version of GameJs can be found in
[/static/js/libs/gamejs](https://github.com/volrath/game-off-2012/tree/master/static/js/libs/gamejs)

### Graphic Art

I used [Kenney Vleugels](http://www.kenney.nl)'
[spaceship](http://opengameart.org/content/space-shooter-art) and
[puzzle](http://opengameart.org/content/puzzle-game-art) graphics.

## Game Information

### Controls

* **W/S/A/D**: Move
* **Mouse**: Aim
* **Mouse Left Button**: Shoot
* **Space**: Missile
* **ESC**: Pause/Unpause

### Powerups

A I said before, every powerup is a git verb and does something related to it.

* <img src="https://raw.github.com/volrath/game-off-2012/master/static/images/powerups/cloning.png" style="border:0;" /> **Cloning**: will get you (clone you) a new life.
* <img src="https://raw.github.com/volrath/game-off-2012/master/static/images/powerups/forking.png" style="border:0;" /> **Forking**: will get you more fork (ammo) power.
* <img src="https://raw.github.com/volrath/game-off-2012/master/static/images/powerups/branching.png" style="border:0;" /> **Branching**: will branch your laser guns.
* <img src="https://raw.github.com/volrath/game-off-2012/master/static/images/powerups/pulling.png" style="border:0;" /> **Pulling**: will automatically pull to you every powerup you see for a limited time.
* <img src="https://raw.github.com/volrath/game-off-2012/master/static/images/powerups/pushing.png" style="border:0;" /> **Pushing**: Nothing will stop you, you whill push enemies and lasers away.
* <img src="https://raw.github.com/volrath/game-off-2012/master/static/images/powerups/stashing.png" style="border:0;" /> **Stashing**: will stash a new powerful missile.

## More information

See [volrath.github.com](http://volrath.github.com) or send me a message.

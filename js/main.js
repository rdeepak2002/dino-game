// import modules
import Game from '../game-library/lib.js';
import Player from './player.js';
import Enemy from './enemy.js';

// get the size of the game screen
import { GAME_WIDTH, GAME_HEIGHT } from '../game-library/lib.js';

// create instance of player object
const playerWidth = 347/4;
const playerHeight = 370/4;

const player = new Player(GAME_WIDTH / 2 - playerWidth / 2, 0, playerWidth, playerHeight, 0, 0);

// create instance of enemy object
const enemyWidth = 347/4;
const enemyHeight = 255/4;

const enemy1 = new Enemy(enemyWidth, enemyHeight, -0.5, 0);
const enemy2 = new Enemy(enemyWidth, enemyHeight, -0.5, 0, GAME_WIDTH + 600);
const enemy3 = new Enemy(enemyWidth, enemyHeight, -0.5, 0, GAME_WIDTH + 1200);

const enemies = [enemy1];

if(GAME_WIDTH > 1000) {
  enemies.push(enemy2);
}

if(GAME_WIDTH > 1200) {
  enemies.push(enemy3);
}

const gameLoop = (game) => {
  // update and draw the player
  player.update(game);
  player.draw(game);

  if(game.started) {
    // update and draw the enemies
    for (const enemy of enemies) {
      enemy.update(game, player);
      enemy.draw(game);
    }

    // display the score
    const scoreText = `Score: ${Math.round(game.curScore)}`;
    game.drawText(scoreText, 10, 10);

    // display the high score if it is nonzero
    if(game.highScore !== 0) {
      const highScoreText = `High Score: ${Math.round(game.highScore)}`;
      game.drawText(highScoreText, 10, 40);
    }
  }
}

// start an instance of the game class
const bgColor = '#dfe0df';
let music = '../resources/music.mp3';

// uncomment to mute music:
// music = undefined;

new Game(gameLoop, bgColor, music).init();

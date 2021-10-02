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

const enemy = new Enemy(enemyWidth, enemyHeight, -0.5, 0);

const gameLoop = (game) => {
  // update and draw the player
  player.update(game);
  player.draw(game);

  // update and draw the enemy
  enemy.update(game, player);
  enemy.draw(game);

  // display the score
  const scoreText = `Score: ${Math.round(game.curScore)}`;
  game.drawText(scoreText, 10, 10);

  // display the high score if it is nonzero
  if(game.highScore !== 0) {
    const highScoreText = `High Score: ${Math.round(game.highScore)}`;
    game.drawText(highScoreText, 10, 40);
  }
}

// start an instance of the game class
new Game(GAME_WIDTH, GAME_HEIGHT, gameLoop).init();

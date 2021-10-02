import Game from '../game-library/lib.js';
import { box2dCollision } from '../game-library/lib.js';

import Player from './player.js';

const GAME_WIDTH = window.innerWidth;
const GAME_HEIGHT = 300;

const playerWidth = 347/4;
const playerHeight = 370/4;

const player = new Player(GAME_WIDTH / 2 - playerWidth / 2, 0, playerWidth, playerHeight, 0, 0);

const gameLoop = (game) => {
  // update the player
  player.update(game);
  player.draw(game);

  // update the score
  const scoreText = `Score: ${Math.round(game.curScore)}`;
  game.drawText(scoreText, 10, 10);
}

new Game(GAME_WIDTH, GAME_HEIGHT, gameLoop).init();

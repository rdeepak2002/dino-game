// get the size of the game screen
import { GAME_WIDTH, GAME_HEIGHT } from '../game-library/lib.js';

// collision detection library
import { box2dCollision } from '../game-library/lib.js';

// image files for animations
const bird_still_image = new Image();
bird_still_image.src = '../resources/bird_still.png';

class Enemy {
  constructor(width, height, velocityX = 0, velocityY = 0) {
    // bounding box of this sprite
    this.size = {width: width, height: height};
    this.velocity = {x: velocityX, y: velocityY};
    this.image = bird_still_image;

    // place enemy randomly
    this.randomizePosition();
  }

  randomizePosition() {
    const enemySpawnX = GAME_WIDTH;
    const enemySpawnY = this.size.height + Math.random() * (GAME_HEIGHT - 2 * this.size.height);
    this.position = {x: enemySpawnX, y: enemySpawnY};
  }

  update(game, player) {
    // update position based off velocity
    this.position.x += this.velocity.x * game.dt;
    this.position.y += this.velocity.y * game.dt;

    // reset score if enemy collides with player
    if(box2dCollision(player, this)) {
      game.highScore = Math.max(game.curScore, game.highScore);
      game.curScore = 0;
      this.randomizePosition();
    }

    if(this.position.x < -1 * this.size.width) {
      this.randomizePosition();
    }
  }

  draw(game) {
    game.drawImage(this.image, this.position.x, this.position.y, this.size.width, this.size.height);
  }
}

export default Enemy;

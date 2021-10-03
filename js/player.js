// image files for animations
const dino_still_image = new Image();
const dino_run_1_image = new Image();
const dino_run_2_image = new Image();

dino_still_image.src = '../resources/dino_still.png';
dino_run_1_image.src = '../resources/dino_run_1.png';
dino_run_2_image.src = '../resources/dino_run_2.png';

// player class
class Player {
  constructor(x, y, width, height, velocityX = 0, velocityY = 0) {
    // bounding box of this sprite
    this.position = {x: x, y: y};
    this.size = {width: width, height: height};
    this.velocity = {x: velocityX, y: velocityY};
    this.grounded = false;

    // create array of animation frames
    this.animations = {
      'standing' : [dino_still_image],
      'running' : [dino_run_1_image, dino_run_2_image],
      'jumping' : [dino_still_image]
    };

    this.curAnimation = 'standing';
  }

  update(game) {
    // update position based off velocity
    this.position.x += this.velocity.x * game.dt;
    this.position.y += this.velocity.y * game.dt;

    // apply gravity
    game.applyGravity(this);

    // jump if space is pressed
    const spacePressed = () => {
      // start the game
      game.started = true;

      // change background bgColor
      document.body.style.background = 'black';

      // play music on first key click
      game.playMusic();

      // set y velocity as upwards to make sprite jump
      if(this.grounded) {
        this.velocity.y -= 0.6;
      }
    };

    game.keyPressed('Space', spacePressed);

    // update game score
    if(game.started) {
      game.curScore += game.dt/100;
    }
  }

  draw(game) {
    if(!game.started) {
      this.curAnimation = 'standing';
    }
    else if(!this.grounded) {
      this.curAnimation = 'jumping';
    }
    else {
      this.curAnimation = 'running';
    }

    const animFrames = this.animations[this.curAnimation];
    game.drawAnimatedSprite(animFrames, this.position.x, this.position.y, this.size.width, this.size.height);
  }
}

export default Player;

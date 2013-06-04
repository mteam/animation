var Animation = require('./animation');

function Linear(spritesheet, sequence, interval) {
  Animation.call(this, spritesheet, sequence);

  this.interval = interval;
  this.timer = 0;
}

Linear.prototype = Object.create(Animation.prototype);

Linear.prototype.update = function(dt) {
  this.timer += dt;

  while (this.timer >= this.interval) {
    this.timer -= this.interval;
    this.next();
  }
};

module.exports = Linear;

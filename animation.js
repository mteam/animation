function Animation(reel, sequence) {
  this.reel = reel;
  this.sequence = sequence;
  this.active = 0;

  for (var i = 0; i < sequence.length; i++) {
    if (sequence[i] >= reel.frames.length) {
      throw new Error('invalid frame: ' + sequence[i]);
    }
  }
}

Animation.prototype.current = function() {
  return this.sequence[this.active];
};

Animation.prototype.next = function() {
  if (++this.active == this.sequence.length) {
    this.onEnd();
    this.rewind();
  }
};

Animation.prototype.rewind = function() {
  this.active = 0;
}; 

Animation.prototype.draw = function(ctx, x, y) {
  var image = this.reel.image,
      rect = this.reel.frame(this.current());

  image.drawRect(ctx, rect, x, y);
};

Animation.prototype.onEnd = function() {};

module.exports = Animation;

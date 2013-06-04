function Animation(spritesheet, sequence) {
  this.spritesheet = spritesheet;
  this.sequence = sequence;
  this.rewind();

  sequence.forEach(function(n) {
    if (spritesheet.get(n) == null) {
      throw new Error('invalid frame: ' + n);
    }
  });
}

Animation.prototype = {

  current: function() {
    return this.sequence[this.active];
  },

  next: function() {
    if (++this.active == this.sequence.length) {
      this.onEnd();
      this.rewind();
    }
  },

  rewind: function() {
    this.active = 0;
  },

  draw: function(ctx, x, y) {
    var frame = this.current();
    this.spritesheet.get(frame).draw(ctx, x, y);
  },

  onEnd: function() {}

};

module.exports = Animation;

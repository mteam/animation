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

Animation.protototype.current = function() {
  return this.sequence[this.active];
};

Animation.protototype.next = function() {
  if (++this.active == this.sequence.length) {
    this.rewind();
  }
};

Animation.protototype.rewind = function() {
  this.active = 0;
}; 

Animation.protototype.draw = function(ctx, x, y) {
  var image = this.reel.image,
      rect = this.reel.frames[this.current()];

  image.drawRect(ctx, rect, x, y);
};

module.exports = Animation;

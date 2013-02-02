var Animation = require('./animation');

function Nonlinear(reel, pairs) {
  var sequence = pairs.map(function(pair) { return pair[0] }),
      intervals = pairs.map(function(pair) { return pair[1] });

  Animation.call(this, reel, sequence);

  this.intervals = intervals;
  this.timer = 0;
}

Nonlinear.prototype = Object.create(Animation.prototype);

Nonlinear.prototype.interval = function() {
  return this.intervals[this.active];
};

Nonlinear.prototype.update = function(dt) {
  this.timer += dt;

  while (this.timer >= this.interval()) {
    this.timer -= this.interval();
    this.next();
  }
};

module.exports = Nonlinear;

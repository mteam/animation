var Rect = require('rect');

function Reel(image, width, height) {
  this.image = image;
  this.setup(width, height);
}

Reel.prototype.setup = function(width, height) {
  var cols = this.image.width / width,
      rows = this.image.height / height;

  this.frames = [];

  var x, y;

  for (y = 0; y < rows; y++) {
    for (x = 0; x < cols; x++) {

      this.frames.push(new Rect(
        x * width, y * height,
        width, height
      ));

    }
  }
};

module.exports = Reel;

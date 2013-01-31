var Rect = require('rect'),
    Drawable = require('drawable');

function Reel(image, width, height) {
  if (!(image instanceof Drawable)) {
    throw new Error('image is not drawable');
  }

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

var expect = require('expect.js'),
    sham = require('sham'),
    Rect = require('rect'),
    Drawable = require('drawable');

var Reel = require('./reel'),
    Animation = require('./animation'),
    Linear = require('./linear'),
    Nonlinear = require('./nonlinear');

describe('animation', function() {

  var image = new Drawable;
  image.width = 320;
  image.height = 240;

  describe('Reel', function() {

    it('should create frames', function() {
      var reel = new Reel(image, 80, 40);

      expect(reel.frames).to.have.length(24);
    });

    it('should create rects', function() {
      var reel = new Reel(image, 80, 40);

      reel.frames.forEach(function(frame) {
        expect(frame).to.be.a(Rect);
      });

      expect(String(reel.frames[6])).to.be('rect[160;40 80x40]');
    });

  });

  describe('Animation', function() {

    var reel = new Reel(image, 80, 40);

    it('should switch frames', function() {
      var a = new Animation(reel, [1, 9, 7]);

      [1, 9, 7, 1, 9].forEach(function(i) {
        expect(a.current()).to.be(i);
        a.next();
      });
    });

    it('should throw when sequence is invalid', function() {
      expect(function() {
        new Animation(reel, [1, 34]);
      }).to.throwError(/invalid frame: 34/);
    });

    it('should draw current frame', function() {
      var a = new Animation(reel, [6]);

      var ctx = {},
          rect = reel.frames[6];

      image.drawRect = sham
        .spy()
        .args(ctx, rect, 10, 20)
        .called();

      a.draw(ctx, 10, 20);

      image.drawRect.check();
    });

  });

  describe('Linear', function() {

    var reel = new Reel(image, 80, 40);

    it('should work', function() {
      var a = new Linear(reel, [1, 3, 9], 0.3);

      expect(a.current()).to.be(1);

      a.update(0.2);
      expect(a.current()).to.be(1);

      a.update(0.4);
      expect(a.current()).to.be(9);

      a.update(0.7);
      expect(a.current()).to.be(3);
    });

  });

  describe('Nonlinear', function() {

    var reel = new Reel(image, 80, 40);

    it('should work', function() {
      var a = new Nonlinear(reel, [[2, 0.2], [4, 0.4], [6, 0.6]]);

      expect(a.current()).to.be(2);
      
      a.update(0.1);
      expect(a.current()).to.be(2);
      
      a.update(0.1);
      expect(a.current()).to.be(4);
      
      a.update(0.5);
      expect(a.current()).to.be(6);
      
      a.update(0.8);
      expect(a.current()).to.be(4);
    });

  });
});

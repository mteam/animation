var assert = require('assert'),
    sham = require('sham'),
    Spritesheet = require('spritesheet');

var Animation = require('animation/animation.js'),
    Linear = require('animation/linear.js'),
    Nonlinear = require('animation/nonlinear.js');

describe('animation', function() {

  var image = {};
  image.width = 320;
  image.height = 240;

  describe('Animation', function() {

    var ss = new Spritesheet(image, 80, 40);

    it('should switch frames', function() {
      var a = new Animation(ss, [1, 9, 7]);

      [1, 9, 7, 1, 9].forEach(function(i) {
        assert.equal(a.current(), i);
        a.next();
      });
    });

    it('should throw when sequence is invalid', function() {
      assert.throws(function() {
        new Animation(ss, [1, 34]);
      }, /invalid frame: 34/);
    });

    it('should draw current frame', function() {
      var a = new Animation(ss, [6]);

      var ctx = sham.mock();
      ctx.spy('drawImage').called();

      a.draw(ctx, 0, 0);

      ctx.check();
    });

  });

  describe('Linear', function() {

    var ss = new Spritesheet(image, 80, 40);

    it('should work', function() {
      var a = new Linear(ss, [1, 3, 9], 0.3);

      assert.equal(a.current(), 1);

      a.update(0.2);
      assert.equal(a.current(), 1);

      a.update(0.4);
      assert.equal(a.current(), 9);

      a.update(0.7);
      assert.equal(a.current(), 3);
    });

  });

  describe('Nonlinear', function() {

    var ss = new Spritesheet(image, 80, 40);

    it('should work', function() {
      var a = new Nonlinear(ss, [[2, 0.2], [4, 0.4], [6, 0.6]]);

      assert.equal(a.current(), 2);
      
      a.update(0.1);
      assert.equal(a.current(), 2);
      
      a.update(0.1);
      assert.equal(a.current(), 4);
      
      a.update(0.5);
      assert.equal(a.current(), 6);
      
      a.update(0.8);
      assert.equal(a.current(), 4);
    });

  });
});

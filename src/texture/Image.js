
glx.texture.Image = function(src, callback) {
  this.id = GL.createTexture();
  GL.bindTexture(GL.TEXTURE_2D, this.id);

  GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR_MIPMAP_NEAREST);
  GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
//GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
//GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);

  GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, true);
  GL.bindTexture(GL.TEXTURE_2D, null);

  var image = new Image();

  image.crossOrigin = '*';

  image.onload = function() {
    // TODO: do this only once
    var maxTexSize = GL.getParameter(GL.MAX_TEXTURE_SIZE);
    if (image.width > maxTexSize || image.height > maxTexSize) {
      var w = maxTexSize, h = maxTexSize;
      var ratio = image.width/image.height;
      // TODO: if other dimension doesn't fit to POT after resize, there is still trouble
      if (ratio < 1) {
        w = Math.round(h*ratio);
      } else {
        h = Math.round(w/ratio);
      }

      var canvas = document.createElement('CANVAS');
      canvas.width  = w;
      canvas.height = h;

      var context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      image = canvas;
    }

    if (!this.id) {
      image = null;
    } else {
      GL.bindTexture(GL.TEXTURE_2D, this.id);
      GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, image);
      GL.generateMipmap(GL.TEXTURE_2D);
    
      if (GL.anisotropyExtension) {
        GL.texParameterf(
          GL.TEXTURE_2D,
          GL.anisotropyExtension.TEXTURE_MAX_ANISOTROPY_EXT,
          GL.anisotropyExtension.maxAnisotropyLevel
        );
      }
      GL.bindTexture(GL.TEXTURE_2D, null);
    }

    if (callback) {
      callback(image);
    }

  }.bind(this);

  image.onerror = function() {
    if (callback) {
      callback();
    }
  };

  image.src = src;
};

glx.texture.Image.prototype = {

  enable: function(index) {
    if (!this.id) {
      return;
    }
    GL.bindTexture(GL.TEXTURE_2D, this.id);
    GL.activeTexture(GL.TEXTURE0 + (index || 0));
  },

  disable: function() {
    GL.bindTexture(GL.TEXTURE_2D, null);
  },

  destroy: function() {
    this.disable();
    GL.deleteTexture(this.id);
    this.id = null;
  }
};

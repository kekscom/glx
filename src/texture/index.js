
glx.texture = {

  disableAll: function() {
    GL.activeTexture(GL.TEXTURE0);
    GL.bindTexture(GL.TEXTURE_2D, null);
  }

};

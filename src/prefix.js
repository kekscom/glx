GLX.use = function(context) {

  return (function(GL) {

    var glx = {};

    glx.context = context;

    glx.start = function(render) {
      return setInterval(function() {
        requestAnimationFrame(render);
      }, 17);
    };

    glx.stop = function(loop) {
      clearInterval(loop);
    };

    glx.destroy = function(GL) {
      GL.canvas.parentNode.removeChild(GL.canvas);
      GL.canvas = null;
    };

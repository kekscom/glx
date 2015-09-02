
var glx = {};

var GL;

glx.View = function(container, width, height) {

  var canvas = document.createElement('CANVAS');
  canvas.style.position = 'absolute';
  canvas.width = width;
  canvas.height = height;
  container.appendChild(canvas);

  var options = {
    antialias: true,
    depth: true,
    premultipliedAlpha: false
  };

  try {
    GL = canvas.getContext('webgl', options);
  } catch (ex) {}
  if (!GL) {
    try {
      GL = canvas.getContext('experimental-webgl', options);
    } catch (ex) {}
  }
  if (!GL) {
    throw new Error('WebGL not supported');
  }

  canvas.addEventListener('webglcontextlost', function(e) {
    console.warn('context lost');
  });

  canvas.addEventListener('webglcontextrestored', function(e) {
    console.warn('context restored');
  });

  //var ext = GL.getExtension("WEBGL_lose_context");
  //ext.loseContext();

  GL.viewport(0, 0, width, height);
  GL.cullFace(GL.BACK);
  GL.enable(GL.CULL_FACE);
  GL.enable(GL.DEPTH_TEST);
  GL.clearColor(0.5, 0.5, 0.5, 1);

  return GL;
};

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

//*****************************************************************************

if (typeof define === 'function') {
  define([], glx);
} else if (typeof exports === 'object') {
  module.exports = glx;
} else {
  global.glx = glx;
}

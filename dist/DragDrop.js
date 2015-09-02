
var DragDrop = (function() {

  function addListener(target, type, fn) {
    target.addEventListener(type, fn, false);
  }

  function cancelEvent(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    e.returnValue = false;
  }

  var DragDrop = function(container) {
    this.listeners = {};
    this.prevX = 0;
    this.prevY = 0;
    this.pointerIsDown = false;

    addListener(container, 'mousedown', this._dragStart.bind(this));
    addListener(document, 'mousemove', this._dragMove.bind(this));
    addListener(document, 'mouseup', this._dragEnd.bind(this));
  };

  DragDrop.prototype._dragStart = function(e) {
    cancelEvent(e);

    this.prevX = e.clientX;
    this.prevY = e.clientY;
    this.pointerIsDown = true;
  };

  DragDrop.prototype._dragMove = function(e) {
    if (!this.pointerIsDown) {
      return;
    }

    this.emit('drag', { dx:(e.clientX - this.prevX), dy:(e.clientY - this.prevY) });

    this.prevX = e.clientX;
    this.prevY = e.clientY;
  };

  DragDrop.prototype._dragEnd = function(e) {
    if (!this.pointerIsDown) {
      return;
    }

    this.emit('drag', { dx:(e.clientX - this.prevX), dy:(e.clientY - this.prevY) });

    this.pointerIsDown = false;
  };

  DragDrop.prototype.on = function(type, listener) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(listener);
  };

  DragDrop.prototype.emit = function(type, payload) {
    if (this.listeners[type]) {
      for (var i = 0; i < this.listeners[type].length; i++) {
        this.listeners[type][i](payload);
      }
    }
  };

  return DragDrop;

}());

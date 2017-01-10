HOPPY.controller = {
  callbacks: {
    returnFrogMove: function(e) {
      var direction;
      var frog = HOPPY.model.frog;
      e.preventDefault();
      console.log('in event')
      console.log('key ' + e.which)
      if (e.which === 38) {
       direction = 'up';
      } else if (e.which === 40) {
       direction = 'down';
      } else if (e.which === 37) {
       direction = 'left';
      } else if(e.which === 39) {
       direction = 'right';
      } else {
        direction = 'none'
      }
      return [frog, direction]
    }
  },

  init: function() {
    this.fps = 400;
    this.view = HOPPY.view;
    this.model = HOPPY.model;
    this.model.init();
    this.view.init(this.callbacks);
    this.loop();
  },

  loop: function() {
    this.renderLoop = setInterval(this.renderBoard, this.fps)
    this.logLoop = setInterval(this.generateLogs, this.fps * 5)
  },

  renderBoard: function() {
    HOPPY.model.movePieces();
    HOPPY.model.removeOffScreenBlocks();
    if (HOPPY.model.gameOver) {
      HOPPY.controller.gameOver();
    } else {
      HOPPY.view.renderPieces(HOPPY.model.currentBlocks);
    }
  },

  generateLogs: function() {
    HOPPY.model.generateLogs();
  },

  gameOver: function() {
    clearInterval(HOPPY.controller.renderLoop);
    clearInterval(HOPPY.controller.logLoop);
    HOPPY.view.renderGameOver();
  }
}
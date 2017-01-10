HOPPY.model = {

  boardEdges: {
    left: 0,
    right: HOPPY.board.width,
    top: 0,
    bottom: HOPPY.board.height
  },

  logRows: [
    'firstLogRow',
    'secondLogRow',
    'thirdLogRow'
  ],

  init: function() {
    this.currentBlocks = [];
    this.generateInitialBoard();
    this.nextLogRow = 0;
    this.gameOver = false;
  },

  getCurrentBlocks: function() {
    return this.currentBlocks;
  },

  generateLogs: function() {
    var row = this.logRows[this.nextLogRow];
    var direction = HOPPY.rowDirections[row];
    var newLog = new HOPPY.Log(direction, row)
    this.currentBlocks.push(newLog)
    this.nextLogRow = ++this.nextLogRow % 3;
  },

  removeOffScreenBlocks: function() {
    var blocksOffScreen = [];
    for (var i = this.currentBlocks.length - 1; i >= 0; i--) {
      var block = this.currentBlocks[i];
      if (this.offLeftEdge(block) || this.offRightEdge(block)) {
        this.currentBlocks.splice(i, 1);
      }
    }
  },

  movePieces: function() {
    this.setFrogDirection();
    for (var i = 0; i < this.currentBlocks.length; i++) {
      this.currentBlocks[i].advance();
    }
  },

  checkGameOver: function() {
    return this.gameOver;
  },

  // Helpers
  generateInitialBoard: function(){
    this.frog = new HOPPY.Frog();
    this.currentBlocks.push(this.frog);
    this.currentBlocks.push(new HOPPY.Log('left', 'firstLogRow', HOPPY.board.width - 200));
    this.currentBlocks.push(new HOPPY.Log('right', 'secondLogRow', HOPPY.board.width - 500));
    this.currentBlocks.push(new HOPPY.Log('left', 'thirdLogRow', (HOPPY.board.width - 350)));
  },

  offLeftEdge: function(block) {
    return (block.x + block.width) <= this.boardEdges['left'];
  },

  offRightEdge: function(block) {
    return block.x >= this.boardEdges['right'];
  },

  setFrogDirection: function() {
    var frogsFooting = this.getFrogsFooting();
    console.log(frogsFooting)
    if (frogsFooting.type == 'log') {
      this.frog.direction = frogsFooting.direction;
    } else if (false) {
      // car - game over
    } else if (this.inRiverOrOffBoard(frogsFooting)) {
      this.gameOver = true;
    } else {
      this.frog.direction = 'none';
    }
    console.log(this.gameOver)
    // console.log(this.frog.direction)
  },

  getLogs: function() {
    return this.currentBlocks.filter(function(block) {
      return block.type === 'log';
    })
  },

  getFrogsFooting: function() {
    var footing = this.determineBoardRegion();
    for (var i = 1; i < this.currentBlocks.length; i++) {
      var block = this.currentBlocks[i];
      if (this.frogOnBlock(block)) {
        footing = block;
      }
    }
    return footing;
  },

  frogOnBlock: function(block) {
    var sameHeight = this.frog.y === block.y;
    var sameDistance;
    var blocksLandingSpots = []
    sameDistance = this.frog.x >= block.x && this.frog.x < block.x + block.width;

    return sameDistance && sameHeight;
  },

  determineBoardRegion: function() {
    if (this.frog.y <= 400 && this.frog.y >= 300) {
      return 'river'
    } else if (false) {
      //in street
    } else {
      return 'grass'
    }
  },

  inRiverOrOffBoard: function(footing) {
    return (footing === 'river'
      || this.offRightEdge(this.frog)
      || this.offLeftEdge(this.frog)
    )
  }


}
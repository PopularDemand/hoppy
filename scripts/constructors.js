var HOPPY = HOPPY || {};

HOPPY.board = {
  width: 700,
  height: 500
}

HOPPY.directions = {
  'left': { x: -50, y: 0 },
  'right': { x: 50, y: 0 },
  'up': { x: 0, y: -50 },
  'down': { x: 0, y: 50 },
  'none': { x: 0, y: 0 }
}

HOPPY.rowHeights = {
  'firstLogRow': HOPPY.board.height - 100,
  'secondLogRow': HOPPY.board.height - 150,
  'thirdLogRow': HOPPY.board.height - 200
},

HOPPY.rowDirections = {
  'firstLogRow': 'left',
  'secondLogRow': 'right',
  'thirdLogRow': 'left'
}

HOPPY.actionBlock = {
  advance: function() {
    this.x += HOPPY.directions[this.direction]['x'];
  },

  startXFromDirection: function() {
    var startX = -150;
    if (this.direction === 'left') {
      startX =  HOPPY.board.width;
    }
    return startX;
  },

  heightFromRow: function(rowName) {
    return HOPPY.rowHeights[rowName];
  }
}

HOPPY.Frog = function Frog() {
  this.width = 50;
  this.height = 50;
  this.type = 'frog';
  this.direction = 'none';
  this.x = 0;
  this.y = HOPPY.board.height - this.height;
}
HOPPY.Frog.prototype = HOPPY.actionBlock;

HOPPY.Log = function Log(direction, rowName, xPosition) {
  this.width = 150;
  this.height = 50;
  this.type = 'log';
  this.direction = direction;
  this.x = xPosition || this.startXFromDirection(this.direction);
  this.y = this.heightFromRow(rowName);
}
HOPPY.Log.prototype = HOPPY.actionBlock;
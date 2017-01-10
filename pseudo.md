# HTML
- big div for board
- divided into 3 grounds (top, middle, bottom)
- 2 danger areas

  ___________________________
  |##########################|
  |                          |
  |                          |
  |                          |
  |##########################|
  |                          |
  |                          |
  |                          |
  |#_#_#_#_#_#_#_#_#_#_#_#_#_|

# JS
 - in one loop:
   - check frogs position
     - if log, frog.direction = log.direction
     - if car or off board, game over
   - all action blocks advance
 - in another loop:
   - make and destroy car and log divs
     - if full div is off board, destroy

## Models

### classes.js
actionBlock = { 
                advance: move in this.direction,
                render: <div.action-block.type>.appendTo(board).css(position),
              }

HOPPY.Frog = function Frog(type, direction, position){
  this.type = type,
  this.direction = direction,
  this.position = position,
  this.detectInteraction = function
}
Frog.prototype = actionBlock

HOPPY.model
 - init: place frog, place some logs
 - currentBlocks = frog, logs
 - board edges:
     top: 0
     left: 0
     right: width
     bottom: height
 - clean up:
    for each current block
    if left and left + width off screen, remove from array

Hoppy.view
 - renderLoop
   - for each model.currentblock, block.render
 - keydown listener moves frog

HOPPY.controller
 - callbacks { moveFrog: function(e) }
 - init:
   - model.init
   - view.init(callbacks)
   - setInterval(movePieces)
   - setInterval(generateLogs)
   - setInterval(generate cars)
 - generateLogs:
   - hoppy.model.currentblocks.push(new log(position, dir, etc))
 - generateCars: see above




Refactor:

ActionBlocks - 
var Rectangle = function (id, x, y, width, height) {
    Shape.call(this, id, x, y);
    this.width  = width;
    this.height = height;
};
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;
var Circle = function (id, x, y, radius) {
    Shape.call(this, id, x, y);
    this.radius = radius;
};
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;
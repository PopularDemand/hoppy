HOPPY.view = {
  init: function(callbacks) {
    $('#game-over').hide();
    this.setHandlers(callbacks);
  },

  renderPieces: function(blocks) {
    $('.game-piece').remove();
    blocks.forEach(this.renderPiece);
  },

  // Helpers
  setHandlers: function(callbacks) {
    $(document).keydown(function(e) {
      var objAndDirection = callbacks.returnFrogMove(e);
      var block = objAndDirection[0];
      var directionKey = objAndDirection[1];
      var directionVector = HOPPY.directions[directionKey];
      block.y = block.y + directionVector.y;
      block.x = block.x + directionVector.x;
      $('.frog').remove();
      HOPPY.view.renderPiece(block);
    });
  },

  renderPiece: function(block) {
    $div = $('<div class="game-piece">')
            .addClass(block.type)
            .css({
              width: block.width,
              height: block.height,
              top: block.y,
              left: block.x
            });
    $div.appendTo($('#board'));
  },

  renderGameOver: function() {
    $('.game-piece').remove();
    $(document).off('keydown');
    $('#game-over').show();
  }
}
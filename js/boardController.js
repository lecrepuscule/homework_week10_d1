angular.module("ticTacToe").controller("BoardController", BoardController);

function BoardController(){

  this.board = [];
  this.maxRow;
  this.maxColumn;
  this.winCondition;

  this.setupBoad = function(){
    for (r = 0; r < maxRow; r++) {
      board.push([]);
      for (c = 0; c < maxColumn; c++) {
        board[r][c] = "";
      }
    }
    return board;
  }
}
angular.module("ticTacToe").controller("BoardController", BoardController);

function BoardController(){

  this.board = [];
  this.maxRow;
  this.maxColumn;
  this.winCondition;

  this.setupBoard = function(){
    for (r = 0; r < this.maxRow; r++) {
      this.board.push([]);
      for (c = 0; c < this.maxColumn; c++) {
        this.board[r][c] = "";
      };
    };
  };


}
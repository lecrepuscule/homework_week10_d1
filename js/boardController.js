angular.module("ticTacToe").controller("BoardController", BoardController);

function BoardController(){

  this.board = [];
  this.maxRow;
  this.maxColumn;
  this.winCondition;
  this.currentPlayer = "x";

  this.setupBoard = function(){
    for (r = 0; r < this.maxRow; r++) {
      this.board.push([]);
      for (c = 0; c < this.maxColumn; c++) {
        this.board[r][c] = "";
      };
    };
  };

  this.markSquare = function(rowIndex, columnIndex){
    this.board[rowIndex][columnIndex] = this.currentPlayer;
    this.currentPlayer = this.currentPlayer === "x" ? "o" : "x";
    console.log(this.currentPlayer);
  }


}
angular.module("ticTacToe").controller("BoardController", BoardController);

function BoardController(){

  this.board;
  this.maxRow;
  this.maxColumn;
  this.winCondition;
  this.winner;
  this.currentPlayer;
  this.moveCounter;

  this.setupBoard = function(){
    this.board = [];
    this.winner = null;
    this.currentPlayer = "x";
    this.moveCounter = 0;

    for (r = 0; r < this.maxRow; r++) {
      this.board.push([]);
      for (c = 0; c < this.maxColumn; c++) {
        this.board[r][c] = "";
      };
    };
  };

  this.makeMove = function(rowIndex, columnIndex){
    if (this.board[rowIndex][columnIndex] === ""){
      this.board[rowIndex][columnIndex] = this.currentPlayer;
      this.winner = this.checkConnection(rowIndex, columnIndex);
    };
  };

  this.countConnections = function(row, rIncrement, column, cIncrement, currentCount) {
    if (this.board[row+rIncrement][column+cIncrement] === this.currentPlayer) { 
      currentCount.push([row+rIncrement,column+cIncrement])
    } 
    else {
      currentCount = [];
    }
    return currentCount;
  }

  this.checkConnection = function(row, column) {
    var horizontalConnections=[];
    var verticalConnections=[];
    var leadDiagConnections=[];
    var antiDiagConnections=[];
    var winner;

    for (i=1-this.winCondition; i<this.winCondition; i++) {
      if (column+i >= 0 && column+i < this.maxColumn) {
        horizontalConnections = this.countConnections(row, 0, column, i, horizontalConnections);
        if (row+i >= 0 && row+i < this.maxRow) {
          leadDiagConnections = this.countConnections(row, i, column, i, leadDiagConnections);
        }
        if (row-i >= 0 && row-i < this.maxRow) {
          antiDiagConnections = this.countConnections(row, -i, column, i, antiDiagConnections);
        }
      }

      if (row+i >= 0 && row+i < this.maxRow) {
        verticalConnections = this.countConnections(row, i, column, 0, verticalConnections);
      }

      var winner = this.findWinner([horizontalConnections, verticalConnections, leadDiagConnections, antiDiagConnections]);
      
      if (winner) {
        return winner;
      }
      else {
        continue;
      }
    }

    this.moveCounter++;
    if (this.moveCounter >= ((this.maxRow +1)* (this.maxColumn+1))) {
      return winner = "draw";
    }
    this.currentPlayer = this.currentPlayer === "x" ? "o" : "x";
    this.moveCounter++;
  }

  this.findWinner = function(connections) {
    var winner;
    var bindedThis = this;
    connections.forEach(function(value){
      if (value.length >= bindedThis.winCondition) {
        value.forEach ( function(winSpot) {
          bindedThis.board[winSpot[0]][winSpot[1]] = bindedThis.currentPlayer + "wins";
        })
        winner = bindedThis.currentPlayer;
      } 
    })
    return winner;
  }

  this.endGame = function(winner) {
  }

}
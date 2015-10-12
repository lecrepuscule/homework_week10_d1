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
    this.checkConnection(rowIndex, columnIndex);
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

      console.log(horizontalConnections);
      console.log(verticalConnections);
      console.log(leadDiagConnections);
      console.log(antiDiagConnections);

      var winner = this.findWinner([horizontalConnections, verticalConnections, leadDiagConnections, antiDiagConnections]);
      
      if (winner) {
        alert("we have a winner!");
        return winner;
      }
      else {
        continue;
      }
    }
    // if (document.getElementsByClassName("empty").length < 1) {
    //     return winner = "draw";
    // }
    this.currentPlayer = this.currentPlayer === "x" ? "o" : "x";
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
    alert(winner === "draw" ? "It's a draw!" : winner + " has won!");
    if (window.confirm("Would you like to play another game?")) {
      runGame();
    } 
    else {
      alert("Bye!");
    }
  }

}
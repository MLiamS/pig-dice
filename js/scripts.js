// Back-End
function Player(turn) {
  this.score = 0;
  this.tempScore = 0;
  this.myTurn = turn;
  this.win = false;
};

Player.prototype.roll = function() {
  if (this.myTurn) {
    var roll = Math.ceil(Math.random() * 6);
    // var roll = 50;
    if (roll > 1) {
      this.tempScore += roll;
      if (this.score + this.tempScore >= 100) {
        this.win = true;
      }
    } else {
      this.tempScore = 0
      return this.pass();
    };
  };
};

Player.prototype.pass = function() {
  this.score += this.tempScore;
  this.tempScore = 0;
  this.myTurn = false;
  return true;
};

Player.prototype.reset = function(turn) {
  this.score = 0;
  this.tempScore = 0;
  this.myTurn = turn;
  this.win = false;
}

// Front-End
$(function() {
  var player1 = new Player(true);
  var player2 = new Player(false);

  function updateScoreBoard() {
    $("#player1Score").text(player1.score);
    $("#player1TempScore").text(player1.tempScore);
    $("#player2Score").text(player2.score);
    $("#player2TempScore").text(player2.tempScore);
  };

  function newGame() {
    player1.reset(true);
    player2.reset(false);
    updateScoreBoard();
  };

  $("#buttonStart").click(function() {
    newGame();
  });

  $("#buttonRoll").click(function() {
    if (player1.myTurn) {
      player2.myTurn = player1.roll();
      if (player1.win) {
        alert("player1 Won")
        newGame();
      }
    } else if (player2.myTurn) {
      player1.myTurn = player2.roll();
      if (player2.win) {
        alert("player2 Won")
        newGame();
      }
    };
    updateScoreBoard();
  });

  $("#buttonPass").click(function() {
    if (player1.myTurn) {
      player2.myTurn = player1.pass();
    } else if (player2.myTurn) {
      player1.myTurn = player2.pass();
    };
    updateScoreBoard();
  });
});

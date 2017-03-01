// Back-End
function Player(turn, comp) {
  this.score = 0;
  this.tempScore = 0;
  this.myTurn = turn;
  this.win = false;
  this.isComp = comp;
};

Player.prototype.roll = function() {
  var roll = Math.ceil(Math.random() * 6);
  if (roll > 1) {
    this.tempScore += roll;
    if (this.score + this.tempScore >= 100) {
      this.win = true;
    };
    updateScoreBoard(roll);
  } else {
    this.tempScore = 0
    updateScoreBoard(roll);
    return this.pass();
  };
};

Player.prototype.pass = function() {
  this.score += this.tempScore;
  updateScoreBoard();
  this.tempScore = 0;
  this.myTurn = false;
  return true;
};

Player.prototype.reset = function(turn, comp) {
  this.score = 0;
  this.tempScore = 0;
  this.myTurn = turn;
  this.win = false;
  this.isComp = comp;
};

Player.prototype.compTurn = function() {
  var done;
  while (this.myTurn) {
    if (this.tempScore <= 15) {
      done = this.roll();
    } else {
      done = this.pass();
    }
  }
  return done;
}

var player1 = new Player(true, false);
var player2 = new Player(false, true);

function rollDice() {
  return Math.ceil(Math.random() * 6);
}

function updateScoreBoard(roll) {
  $("#player1Score").text(player1.score);
  $("#player2Score").text(player2.score);
  $("#rollTotal").text(player1.tempScore+player2.tempScore);
  if (roll) {
    $("#roll").text(roll);
  };
  turnIndicator();
};

function turnIndicator() {
  if (player1.myTurn){
    $("#p1").addClass("currentTurn");
    $("#p2").removeClass("currentTurn");
  } else if (player2.myTurn){
    $("#p2").addClass("currentTurn");
    $("#p1").removeClass("currentTurn");
  };

}

// Front-End
$(function() {

  function newGame() {
    player1.reset(true, false);
    player2.reset(false, true);
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
      };
      if (player2.myTurn && player2.isComp) {
        player1.myTurn = player2.compTurn();
        if (player2.win) {
          alert("player2 Won")
          newGame();
        };
        turnIndicator();
      }
    } else if (player2.myTurn) {
      player1.myTurn = player2.roll();
      if (player2.win) {
        alert("player2 Won")
        newGame();
      };
    };
  });

  $("#buttonPass").click(function() {
    if (player1.myTurn) {
      player2.myTurn = player1.pass();
      if (player2.myTurn && player2.isComp) {
        player1.myTurn = player2.compTurn();
        if (player2.win) {
          alert("player2 Won")
          newGame();
        };
        turnIndicator();
      }
    } else if (player2.myTurn) {
      player1.myTurn = player2.pass();
    };
  });
});

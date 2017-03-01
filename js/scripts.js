// Back-End
function Player(turn) {
  this.score = 0;
  this.tempScore = 0;
  this.myTurn = turn;
  this.win = false;
};

Player.prototype.roll = function(roll) {
  if (this.myTurn) {
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

  function updateScoreBoard(roll) {
    $("#player1Score").text(player1.score);
    $("#player2Score").text(player2.score);
    $("#rollTotal").text(player1.tempScore+player2.tempScore);
    $("#roll").text(roll);
    if (player1.myTurn){
      $("#p1").addClass("currentTurn");
      $("#p2").removeClass("currentTurn");
    } else {
      $("#p2").addClass("currentTurn");
      $("#p1").removeClass("currentTurn");
    }
  };

  function newGame() {
    player1.reset(true);
    player2.reset(false);
    updateScoreBoard(0);
  };

  $("#buttonStart").click(function() {
    newGame();
  });

  $("#buttonRoll").click(function() {
    var roll = Math.ceil(Math.random() * 6);
    if (player1.myTurn) {
      player2.myTurn = player1.roll(roll);
      if (player1.win) {
        alert("player1 Won")
        newGame();
      }
    } else if (player2.myTurn) {
      player1.myTurn = player2.roll(roll);
      if (player2.win) {
        alert("player2 Won")
        newGame();
      }
    };
    updateScoreBoard(roll);
  });

  $("#buttonPass").click(function() {
    if (player1.myTurn) {
      player2.myTurn = player1.pass();
    } else if (player2.myTurn) {
      player1.myTurn = player2.pass();
    };
    updateScoreBoard(0);
  });
});

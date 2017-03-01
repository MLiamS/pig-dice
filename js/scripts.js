// Back-End
function Player(turn) {
  this.score = 0;
  this.tempScore = 0;
  this.myTurn = turn;
};

Player.prototype.roll = function() {
  if (this.myTurn) {
    var roll = Math.ceil(Math.random() * 6);
    console.log(roll);
    if (roll > 1) {
      this.tempScore += roll;
    } else {
      this.tempScore = 0
      return this.pass();
    };
  };
};

Player.prototype.pass = function() {
  console.log("pass called");
  this.score += this.tempScore;
  this.tempScore = 0;
  this.myTurn = false;
  return true;
};

// Front-End
$(function() {
  $("#buttonStart").click(function() {
    var player1 = new Player(true);
    var player2 = new Player(false);
    console.log("player1 ", player1);
    console.log("player2 ", player2);

    $("#buttonRoll").click(function() {
      if (player1.myTurn) {
        player2.myTurn = player1.roll();
      } else if (player2.myTurn) {
        player1.myTurn = player2.roll();
      };
      // player1.roll();
      console.log("player1 ", player1);
      console.log("player2 ", player2);
    });

    $("#buttonPass").click(function() {
      if (player1.myTurn) {
        player2.myTurn = player1.pass();
      } else if (player2.myTurn) {
        player1.myTurn = player2.pass();
      };
      console.log("player1 ", player1);
      console.log("player2 ", player2);
    })
  });
});

// Back-End
function Player() {
  this.score = 0;
  this.tempScore = 0;
};

Player.prototype.roll = function() {
  var roll = Math.ceil(Math.random() * 6);
  console.log(roll);
  if (roll > 1) {
    this.tempScore += roll;
  } else {
    // rolled 1
  };
};

// Front-End
$(function() {
  $("#buttonStart").click(function() {
    var player1 = new Player();
    console.log(player1);

    $("#buttonRoll").click(function() {
      player1.roll();
      console.log(player1);
    });
  });
});

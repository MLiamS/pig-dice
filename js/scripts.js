// Back-End
function Player() {
  this.score = 0;
  this.tempScore = 0;
};

// Front-End
$(function() {
  $("#buttonStart").click(function() {
    var player1 = new Player();
    console.log(player1);
  });
});

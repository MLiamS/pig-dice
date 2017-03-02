// Back-End
var turnCounter = 1;

function Player(name, comp) {
  this.name = name;
  this.score = 0;
  this.tempScore = 0;
  this.isComp = comp;
};

Player.prototype.roll = function() {
  var roll = Math.ceil(Math.random() * 6);
  if (roll > 1) {
    this.tempScore += roll;
    if (this.score + this.tempScore >= 100) {
      alert(this.name + " WON!!!!!");
      newGame();
    };
    updateScoreBoard(roll);
  } else {
    this.tempScore = 0
    updateScoreBoard(roll);
    this.pass();
  };
};

Player.prototype.pass = function() {
  this.score += this.tempScore;
  this.tempScore = 0;
  turnCounter ++;
  updateScoreBoard();
};

Player.prototype.reset = function(comp) {
  this.score = 0;
  this.tempScore = 0;
  this.isComp = comp;
};

Player.prototype.compTurn = function() {
  var self = this;
  var runInterval = setInterval(autoRun, 1000);
  function autoRun() {
    if (turnCounter % 2 === 0) {
      if (self.tempScore <= 15) {
        self.roll();
      } else {
        self.pass();
      };
    } else {
      clearInterval(runInterval);
    };
  };
};

var player1 = new Player("Player 1", false);
var player2 = new Player("Player 2", true);

function updateScoreBoard(roll) {
  $("#player1Score").text(player1.score);
  $("#player2Score").text(player2.score);
  $("#rollTotal").text(player1.tempScore+player2.tempScore);
  if (roll >= 0) {
    $("#roll").text(roll);
  };
  turnIndicator();
};

function turnIndicator() {
  if (turnCounter % 2 === 0){
    $("#p2").animate({backgroundColor: "#f7c165"}, 1000);
    $("#p1").animate({backgroundColor: "rgb(245, 245, 245)"}, 1000);
  } else {
    $("#p1").animate({backgroundColor: "#f7c165"}, 1000);
    $("#p2").animate({backgroundColor: "rgb(245, 245, 245)"}, 1000);
  };
};

function checkComputerPlayer() {
  if ((turnCounter % 2 === 0) && player2.isComp) {
    player2.compTurn();
  };
};

function newGame(p2) {
  player1.reset(false);
  player2.reset(p2);
  updateScoreBoard(0);
  turnCounter = 1;
};


// Front-End
$(function() {

  $("#buttonStart").click(function() {
    var p2 = $("input:radio[name=p2]:checked").val();
    if (p2 === "false") {
      newGame(false);
    } else {
      newGame(true);
    };
  });

  $("#buttonRoll").click(function() {
    if (turnCounter % 2 != 0) {
      player1.roll();
      checkComputerPlayer();
    } else if (turnCounter % 2 === 0) {
      player2.roll();
    };
  });

  $("#buttonPass").click(function() {
    if (turnCounter % 2 != 0) {
      player1.pass();
      checkComputerPlayer();
    } else if (turnCounter % 2 === 0) {
      player2.pass();
    };
  });
});

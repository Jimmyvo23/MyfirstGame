// The button Array
var buttonColours = ["red", "blue", "green", "yellow"];
// The first function which creat a random color/number
var gamePattern = [];
// The function, when the user clicks, it save based on "this" element
var userClickedPattern = [];
// the boolean in order to start the games
var start = false;
var level = 0;

// Detect the keypress function in order to start the games
$(document).keypress(function() {
  if (!start) {
    $("#level-title").text("level " + level);
    nextSequence();
    start = true;
  }

});
// the secondFunction to memorise the color that user clicked
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
 // We have to follow the pattern by pressing the previous color
  checkAnswer(userClickedPattern.length-1);

});
// important: we need to function to play the game with IF?Else
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

  if (gamePattern.length === userClickedPattern.length) {


    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
} else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}


// The main Function of the game which create a random number or colour
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);


  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
// Restarting the game
function startOver(){
  level = 0;
  gamePattern =[];
  start = false;
}

//all button colors
var buttonColors = ["red", "blue", "green", "yellow"];
//game button sequence
var gamePattern = [];
//game user sequence
var userPattern = [];
//var to set levels in nextSequence
var level = 0;
//var to control 'A' keypress
var isAClicked = false;

$("body").keypress(function(event){
  if(event.key == "a"){
    if(isAClicked == false){
          nextSequence();
    }
    isAClicked = true;
  }
  console.log(event.key);
});

$(".btn").click(function(event) {
  userPattern.push(event.target.id);
  var userChosenColor = event.target.id;
  //check if userPattern satisfies game pattern
  var allPassed = satisfyPattern();
  //check if both user and game patterns are same length and allPassed is true then call nextSequence
  if(gamePattern.length == userPattern.length && allPassed == true){
    nextSequence();
  }
  //if allPassed is true then continue reading and print some message
  if(allPassed == true){
    console.log("Game Pattern is " + gamePattern + " and User Pattern is " + userPattern);
  }

  //if allPassed is false then end and reset game.
  if(allPassed == false){
    printLoseMessage();
    resetGame();
  }
  //animate and play button press sounds
  animatePress(userChosenColor);
  playButtonSound(userChosenColor);
});

function printLoseMessage(){
  $("#level-title").text("Game Over. Press A to restart game.");
}

function resetGame(){
  //reset all values
  gamePattern = [];
  userPattern = [];
  level = 0;
  isAClicked = false;
}

//return true or false
function satisfyPattern() {
  var allPassed;
  var loops = userPattern.length;

  //loop to check each patterns
  for (var count = 0; count < loops; count++) {
    if (userPattern[count] != gamePattern[count]) {
      allPassed = false;
    } else {
      allPassed = true;
    }
    count++;
  }
  return allPassed;
}

function nextSequence() {
  userPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumberGenerator = Math.floor(Math.random() * 4);
  //get random number and add random color in array
  var randomChosenColor = buttonColors[randomNumberGenerator];
  gamePattern.push(randomChosenColor);
  //animate next Sequence
  animateButton(randomChosenColor);
  //animate and play button sounds together
  //animatePress(randomChosenColor);
  //playButtonSound(randomChosenColor);
}

function animateButton(randomChosenColor) {
  $("#" + randomChosenColor).fadeOut(200).fadeIn(200);
}

function animatePress(randomChosenColor) {
  $("#" + randomChosenColor).addClass("pressed");
  setTimeout(function() {
    $("#" + randomChosenColor).removeClass("pressed");
  }, 100);
}

function playButtonSound(randomChosenColor) {
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
}

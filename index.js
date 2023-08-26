
var gamepattern = [];
var userClickedPattern = [];

var buttoncolor = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;

$(document).keydown(function(){
    if(!started){
        // $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animate(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){

    userClickedPattern = [];

    level ++;
    $("#level-title").text("Level "+level);

    var n = Math.random();
    var number = Math.floor(n*4);
    var colorselected = buttoncolor[number];

    gamepattern.push(colorselected);

    $("#"+colorselected).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound(colorselected);
}

function checkAnswer(key){

    if(gamepattern[key] === userClickedPattern[key]) {

        if (userClickedPattern.length === gamepattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
    
      } 
      else{

        $("#level-title").text("GAME OVER");
        $("body").addClass("game-over");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100);
        setTimeout(restart , 1000);
      }
}

function restart(){

    $("#level-title").text("Press a Key to Start");
    gamepattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;

}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animate(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}


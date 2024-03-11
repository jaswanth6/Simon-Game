var gamePattern=[];
var userClickedPattern=[];
var randomChosenColour=0;
var buttonColors=['red','blue','green','yellow'];
var level=0;
var firstKey=true;
var clicks=0;

function nextSequence(){
    userClickedPattern=[];
    var randomNumber=Math.floor(Math.random()*4);

    randomChosenColour=buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#'+randomChosenColour).fadeOut(100).fadeIn(100);
    var audio = new Audio("./sounds/"+randomChosenColour+".mp3");
    audio.play();
    playSound(randomChosenColour);
    level+=1;
    $('h1').text('Level '+level);

}

function checkAnswer(currentLevel){
    var flag=false;
    for(var i=0;i<=currentLevel;i++){
    if (gamePattern[i]!=userClickedPattern[i]){
        console.log('failure')
        flag=true;
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        },200);
        $('h1').text("Game Over, Press Any Key to Restart");
        startOver();
        break;
        }      
    }
    if (flag===false){
        console.log('Success')
    }

}
$(document).keydown(function(e){
    if (firstKey){
        nextSequence();
        $('h1').text('Level '+level);
        firstKey=false;
    }
    })
$('.btn').click(function(){
        var userChosenColor=this.id;
        userClickedPattern.push(userChosenColor);
        // $('#'+userChosenColor).fadeOut(100).fadeIn(100);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        console.log(userClickedPattern,gamePattern);
        checkAnswer(userClickedPattern.length-1);
        console.log(userClickedPattern,gamePattern);
        if (gamePattern.length==userClickedPattern.length){
            
        setTimeout(function(){
            nextSequence();
        },1000);};
    })
function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $('#'+currentColor).addClass('pressed');
    setTimeout(function(){
        $('#'+currentColor).removeClass('pressed');
    },100);
}

function startOver(){
    gamePattern=[];
    level=0;
    firstKey=true;
    
}
// $("#red").fadeOut(100).fadeIn(100);
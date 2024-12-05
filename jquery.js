var playing = false;
var score;
var trialsLeft;
var step;
var action;
var fruits = ['apple', 'banana', 'grapes', 'orange', 'pineapple'];
$(function(){
    //click on start reset button\
    $("#startreset").click(function(){
        
        //we sre playing
        if(playing == true){
            
            //relod page
            location.reload();
        }
        else{
            //we are not playing
            playing = true; //game initiated
            
            //set score to 0
            score = 0; //set score to 0
            $("#scoreValue").html(score); 
            
            //show trials box
            $("#trialsLeft").show();
            trialsLeft = 3;
            addHearts();

            //hide game over box
            $("#gameOver").hide();

            //change button to reset
            $("#startreset").html("Reset Game");

            //start sending fruits
            startAction();
        }
    });

//score update
    $("#fruit1").mouseover(function(){
        score++;
        $("#scoreValue").html(score);

        //sound play
        $("#sourceSound")[0].play();

        //stop fruit from going down 
        clearInterval(action);

        //slice and hide fruit
        $("#fruit1").hide("explode", 500);

        //send new fruit 
        setTimeout(startAction, 500);
    });

//Functions

//adding heart to lifeline
function addHearts() {
            $("#trialsLeft").empty();
    for(let i = 0; i < trialsLeft; i++){
        $("#trialsLeft").append('<img src="images/heart.jpg" class="life">');
    }
}

//start sending fruits
function startAction(){
    
    //generate a fruit
    $("#fruit1").show();
    chooseFruit(); //choose a random fruit
    $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position
    
    //generate a random step
    step = 1+ Math.round(5*Math.random()); // change step
    
    // Move fruit down by one step every 10ms
    action = setInterval(function(){
        
        //move fruit by one step
        $("#fruit1").css('top', $("#fruit1").position().top + step);                              
    
        //check if the fruit is too low
        if($("#fruit1").position().top > $("#fruitsContainer").height()){
            //check if we have trials left
            console.log("trialsLeft",trialsLeft);
            if(trialsLeft > 1 ){
                //generate a fruit
                $("#fruit1").show();
                chooseFruit(); //choose a random fruit
                $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position

                //generate a random step
                step = 1+ Math.round(5*Math.random()); // change step
                
                //reduce trials by one
                trialsLeft --;
                
                //populate trialsLeft box
                addHearts();
                
            }else{ // game over
                playing = false; //we are not playing anymore
                $("#startreset").html("Start Game"); // change button to Start Game
                $("#gameOver").show();
                $("#gameOver").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
                $("#trialsLeft").hide();
                stopAction();
            }
        }
    }, 10);
}

//generate random fruits
function chooseFruit(){
    $("#fruit1").attr('src', 'images/'+ fruits[Math.round(4*Math.random())] + '.png')
}

//stop dropping fruits
function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}
});
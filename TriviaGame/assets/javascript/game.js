
var gameOverFlag = false;
var startedFlag = false;
var apiResponse = "";
var intervalId = 0;
var clickedSubmit=false;
TIMER = 10;
var timer = TIMER;
var noOfQues=10;
var questionCounter = 0;
var diffculty="medium";
var game = {

    currentQuestion: "",
    currentOptionA: "",
    currentOptionB: "",
    currentOptionC: "",
    currentOptionD: "",
    currentAnswer: "",
    options: [],
    userAnswer: "",
    userSelection: "",
    correctCount: 0,
    wrongCount: 0,
    unansweredCount: 0,
   

    callQuestionAPI: function () {
        var queryUrl = "https://opentdb.com/api.php?amount="+noOfQues+"&diffculty="+diffculty+"&type=multiple"

        $.ajax({
            url: queryUrl,
            method: "GET"

        }).then(function (response) {
            //console.log(response)
            apiResponse = response.results
            //console.log(apiResponse)
            game.randomQuestion()
        })
    },
    randomQuestion: function () {
        questionCounter+=1;
        //console.log(apiResponse)
        var i = Math.floor(Math.random() * (apiResponse.length - 0)) + 0;
        //console.log(i);
        //console.log(apiResponse[i]);
        game.currentQuestion = apiResponse[i].question;
        game.currentAnswer = apiResponse[i].correct_answer;
        game.options.push(apiResponse[i].correct_answer)
        game.options.push(apiResponse[i].incorrect_answers[0])
        game.options.push(apiResponse[i].incorrect_answers[1])
        game.options.push(apiResponse[i].incorrect_answers[2])

        console.log(game.currentQuestion);
        console.log(game.options);

        var shuffled= game.shuffle(game.options);
        //console.log(shuffled);

        game.options=shuffled
        //console.log(game.options);

        apiResponse.splice(i, 1);
        //  console.log(apiResponse)
        if (apiResponse.length === 1) {
            lastQues = true;
        }
        
        game.renderQuestionAnswers();
        


        //possibly remove that item frm apiResponse array and reduce length by 1

    },

    renderQuestionAnswers: function () {

        $(".card-text").html(game.currentQuestion);
        $(".card-title").html("<h5>Question "+questionCounter+" :</h5>");
        for (var i = 0; i < game.options.length; i++) {
            var optionButton = $("#optionLabel" + (i + 1))
            optionButton.text(game.options[i]);
        }
        
        game.options = []
        if (questionCounter === noOfQues) {
            $("#next").val("Submit");
            gameOverFlag=true;
        }
    },
    inputAnswer: function (userAns) {
        // set game.User answer as per input
        var userSelection = userAns.id
        switch (userSelection) {
            case "optionRadio1":
                game.userAnswer = $("#optionLabel1").text()
                break;
            case "optionRadio2":
                game.userAnswer = $("#optionLabel2").text()
                break;
            case "optionRadio3":
                game.userAnswer = $("#optionLabel3").text()
                break;
            case "optionRadio4":
                game.userAnswer = $("#optionLabel4").text()
                break;

        }

        console.log(game.userAnswer);

        game.validateAnswer();

    },
    validateAnswer: function () {

        if (game.userAnswer === "") {
            game.unansweredCount++;
        } else if (game.userAnswer === game.currentAnswer) {
            game.correctCount++
        } else {
            game.wrongCount++;
        }

        if(questionCounter===noOfQues){
            game.gameOver();

        }
       

    },
    displayScore: function (length) {
        //Set UI to show how user did
        $("#message").html("Here is how you did...");
        $("#message").append("<br>");
        $("#message").append("Correct: " + game.correctCount);
        $("#message").append("<br>");
        $("#message").append("Incorrect: " + game.wrongCount);
        $("#message").append("<br>");
        $("#message").append("Unanswered: " + game.unansweredCount);
        $("#message").show();
    },

    startGame: function () {
        game.startedFlag = true;
        
        $("#quiz").show();
        $("#start").hide();
        $("#message").hide();
        game.callQuestionAPI();
        game.startTimer();

    },
    timer: function () {
        //generate timer - 30sec and decrement it

        if (timer === 0) {
            game.unansweredCount++;

        }
    },
    gameOver: function () {
        //When 10th question is done display end game msg and show stats
        //show the start button msg again
        clickedSubmit=true;
        game.displayScore();
        $("#start").show();
        //gameOverFlag=true;
        $("#quiz").hide();
        game.stopTimer();
        game.resetView();


    },

    resetView: function () {

        //reset for next round of trivia
        
        startedFlag = false;
        apiResponse = "";
        intervalId = 0;
        questionCounter = 0;
        $("#timer").empty()

    },

    startTimer: function () {
        
        // for(var i=timer;i>=0;i--){
        //     intervalId = setTimeout(game.count, 1000);
        // }   
        intervalId = setInterval(game.count, 1000);
        
    },
    count: function () {
       
        $("#timer").html("Time Remaining: " + timer);
        timer--;
        if (timer === -1) {
            clearInterval(intervalId)
            if (game.startedFlag === true) {
 
                game.resetTimer();
                game.startTimer();
                game.randomQuestion();
                game.inputAnswer(game.userSelection);
                if( gameOverFlag===true){
                    // game.unansweredCount++;
                    game.inputAnswer(game.userSelection);
                    game.gameOver();
                }
                
            }
            
        }
    
    },

    resetTimer: function () {
        clearInterval(intervalId);
        timer = TIMER;
    },
    stopTimer: function () {
        clearInterval(intervalId);
       
    },

     shuffle:function (array) {
        var i = 0
          , j = 0
          , temp = null
      
        for (i = array.length - 1; i > 0; i -= 1) {
          j = Math.floor(Math.random() * (i + 1))
          temp = array[i]
          array[i] = array[j]
          array[j] = temp
        }

        return array;
      }

}
$(document).ready(function () {
    $("#quiz").hide();
    console.log("ready!");
    if(gameOverFlag===true){
        game.inputAnswer(game.userSelection);
    }
    $("#start-button").on("click", function (event) {
        console.log("Clicked Start button!");
        game.startGame();

    });

    $(".answer-option").on("click", function (event) {
        console.log("Clicked Option " + event.target.id);
        if (game.startedFlag === true) {
            game.userSelection = event.target
        }
    });

    $("#next").on("click", function (event) {
        console.log("Clicked Next " + event.target.value);
        console.log(questionCounter);
        $(".answer-option").prop("checked", false);
        if (game.startedFlag === true) {
            game.inputAnswer(game.userSelection);
            game.resetTimer();
            if(clickedSubmit===false){
                game.startTimer();
                game.randomQuestion();
            }
            
            }
    });
});


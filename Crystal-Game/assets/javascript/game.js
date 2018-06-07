
var successFlag = false;
var gameOverFlag = false;
var startedFlag = false;
var game = {


    userScore: 0,
    matchNumber: 0,
    wins: 0,
    losses: 0,
    valCrystal1: 0,
    valCrystal2: 0,
    valCrystal3: 0,
    valCrystal4: 0,


    randomNumber: function () {
        game.matchNumber = Math.floor(Math.random() * (120 - 19) ) + 19;
        $("#matchnumber").html("<h2>Number to Match: " + game.matchNumber + "</h2>")

    },
    randomCrystalValue: function () {
        var value = Math.floor(Math.random() * (12 - 1) ) + 1;
        console.log(value);
        return value;

    },

    addScore: function (target) {
        var successMatch = false;
        switch (target.id) {
            case "cry1":
                game.userScore += game.valCrystal1;
                break;
            case "cry2":
                game.userScore += game.valCrystal2;
                break;
            case "cry3":
                game.userScore += game.valCrystal3;
                break;
            case "cry4":
                game.userScore += game.valCrystal4;
                break;

        }
        $("#score").html("<h2>Your Score: " + game.userScore + "</h2>")
        successMatch = game.matchScore();
        game.successOrFailure(successMatch);


    },
    matchScore: function () {
        var matched = null;
        if (game.userScore > game.matchNumber) {
            matched = false;
            gameOverFlag = true;
        } else if (game.userScore === game.matchNumber) {
            successFlag = true;
            matched = true;
        }
        return matched;

    },


    startGame: function () {


        game.startedFlag = true;
        game.userScore = 0;
        $("#success-failure").empty();
        $("#message").hide();
        $("#score").html("<h2>Your Score: " + game.userScore + "</h2>")
        game.randomNumber();
        game.valCrystal1 = game.randomCrystalValue();
        game.valCrystal2 = game.randomCrystalValue();
        game.valCrystal3 = game.randomCrystalValue();
        game.valCrystal4 = game.randomCrystalValue();


    },


    successOrFailure: function (matched) {

        switch (matched) {

            case true:
                successFlag = true;
                game.startedFlag = false;
                game.wins++;
                $("#success-failure").html("<h2>Correct guess !! You Won!!</h2>");
                $("#success-failure").css({'color': 'rgb(40, 125, 40)','margin-top':'-10px'})
                $("#success-failure").append("<h3>Press START button to play again</h3>");
                $("#wins").html("<h2>Wins: " + game.wins + "</h2>");
                $("#message").show();

                break;

            case false:
                successFlag = true;
                game.startedFlag = false;
                game.losses++;
                $("#success-failure").html("<h2>Incorrect guess !! You Lost!!</h2>");
                $("#success-failure").append("<h3>Press START button to play again</h3>");
                $("#success-failure").css({'color': 'rgb(135, 28, 28)','margin-top':'-10px'})
                $("#losses").html("<h2>Losses: " + game.losses + "</h2>");
                $("#message").show();

                break;

            case null:
                break;
        }
    },

}
$(document).ready(function () {
    console.log("ready!");
    $("#start-button").on("click", function (event) {
        console.log("Clicked Start button!");
        game.startGame();
    });

    $(".crystal-button").on("click", function (event) {
        console.log("Clicked Crystal "+ event.target.id);
        if (game.startedFlag === true) {
            game.addScore(event.target);
        }
    });
});



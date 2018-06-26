
var gameOverFlag = false;
var startedFlag = false;
var activeUsers = 0;
var selectionCounter = 0;
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDd2xClEaJbmBAG-7E7WSEJUZLGXmm4mi8",
    authDomain: "rockpaperscissors-45914.firebaseapp.com",
    databaseURL: "https://rockpaperscissors-45914.firebaseio.com",
    projectId: "rockpaperscissors-45914",
    storageBucket: "rockpaperscissors-45914.appspot.com",
    messagingSenderId: "690685349387"
};
firebase.initializeApp(config);

var database = firebase.database();

var playerOne = {
    name: "",
    wins: 0,
    losses: 0,
    selection: "",
    savePlayerDetails: function (name) {
        playerOne.name = name;
        console.log(playerOne.name);
        database.ref("Players").child("Player1").set({
            name: name,
            wins: 0,
            losses: 0,
        });

        sessionStorage.setItem('player', "player1");
        sessionStorage.setItem('playerName', playerOne.name);

    },
    displayPlayerDetails: function () {
        //console.log(playerOne.name);
        //$("#p1").html(playerOne.name);
    },
    makeSelection: function (selected) {
        database.ref("Players").child("Player1").update({
            selection: selected
        })
        selectionCounter++;
        playerOne.selection = selected;
        sessionStorage.setItem('selection', playerOne.selection);

    },
    leaveGame: function () {
        database.ref("Players").child("Player1").remove()
        window.location.reload()

    }
}

var playerTwo = {
    name: "",
    wins: 0,
    losses: 0,
    selection: "",
    savePlayerDetails: function (name) {
        playerTwo.name = name;
        console.log(playerTwo.name);
        database.ref("Players").child("Player2").set({
            name: name,
            wins: 0,
            losses: 0,
        });
        sessionStorage.setItem('player', "player2");
        sessionStorage.setItem('playerName', playerTwo.name);
    },
    displayPlayerDetails: function () {
        console.log(playerOne.name);
        //$("#p2").html(playerOne.name);
    },
    makeSelection: function (selected) {
        database.ref("Players").child("Player2").update({
            selection: selected
        });
        selectionCounter++;
        playerTwo.selection = selected;

        sessionStorage.setItem('selection', playerTwo.selection);

    },
    leaveGame: function () {
        database.ref("Players").child("Player2").remove()
        window.location.reload()

    }
}

var game = {
    player1: "",
    player2: "",
    ties: "",
    winner: "",

    determinePlayerNumber: function () {

    },
    rockPaperScissor: function (one, two) {
        //game.winner = "";
        if (one === "rock") {

            if (two === "rock") {
                tie++;
            } else if (two === "paper") {
                game.winner = playerTwo.name;
                playerTwo.wins++;
                playerOne.losses++;
            } else if (two === "scissors") {
                game.winner = playerOne.name
                playerOne.wins++;
                playerTwo.losses++;

            }
        }
        if (one === "paper") {
            if (two === "paper") {
                tie++;
            } else if (two === "rock") {
                playerOne.wins++;
                game.winner = playerOne.name;
                playerTwo.losses++;

            } else if (two === "scissors") {
                playerTwo.wins++;
                game.winner = playerTwo.name;
                playerOne.losses++;

            }
        }
        if (one === "scissors") {
            if (two === "scissors") {
                tie++;
            } else if (two === "rock") {
                playerTwo.wins++;
                game.winner = playerTwo.name;
                playerOne.losses++;

            } else if (two === "paper") {
                playerOne.wins++;
                game.winner = playerOne.name;
                playerTwo.losses++;
            }
        }

        if (game.winner === playerOne.name) {
            database.ref("Players").child("Player1").update({
                wins: playerOne.wins
            });
            database.ref("Players").child("Player2").update({
                losses: playerTwo.losses
            })
        }
        if (game.winner === playerTwo.name) {
            database.ref("Players").child("Player1").update({
                losses: playerOne.losses
            });
            database.ref("Players").child("Player2").update({
                wins: playerTwo.wins
            })
        }

        database.ref("Winner").set({
            winner: game.winner
            
        });
        database.ref("Winner").on("value", function (snapshot) {
            
                $("#message").html("The winner is: " + snapshot.val().winner);
                // playerOne.makeSelection("");
                // playerTwo.makeSelection("");



                database.ref("Players").on("value", function (snapshot) {
            
                playerOne.wins = snapshot.val().Player1.wins;
                playerOne.losses = snapshot.val().Player1.losses;
                playerOne.name = snapshot.val().Player1.name;

                playerTwo.wins = snapshot.val().Player2.wins;
                playerTwo.losses = snapshot.val().Player2.losses;
                playerTwo.name = snapshot.val().Player2.name;

                $("#player1-results").html("Wins: "+playerOne.wins+"\nLosses: "+playerOne.losses);
                // $("#player1-results").append("<br>");
                // $("#player1-results").append("Losses: "+playerOne.losses);

                $("#player2-results").html("Wins: "+playerTwo.wins+"\nLosses: "+playerTwo.losses);
                // $("#player2-results").append("<br>");
                // $("#player2-results").append("Losses: "+playerTwo.losses);
                })
                
        })

         


    },
    renderOnStart: function () {

        $("#p1").hide();
        $("#p2").hide();
        //$("#chat-div").hide();
        $("#player1").hide();
        $("#player2").hide();
        database.ref("Players").on("value", function (snapshot) {
            activeUsers = snapshot.numChildren()
            console.log("Active users: " + activeUsers);
            //$("#player1").empty();
            //$("#player2").empty();
            console.log("This is window of: " + window.name)
            if (activeUsers >= 2) {
                $("#add-player").hide();

            }
            if (activeUsers == 2) {
                // game.player1 = snapshot.val().Player1.name;
                // game.player2 = snapshot.val().Player2.name;

                // playerOne.wins = snapshot.val().Player1.wins;
                // playerOne.losses = snapshot.val().Player1.losses;
                // playerOne.name = snapshot.val().Player1.name;

                // playerTwo.wins = snapshot.val().Player2.wins;
                // playerTwo.losses = snapshot.val().Player2.losses;
                // playerTwo.name = snapshot.val().Player2.name;

                if (sessionStorage.getItem('player') === "player1") {
                    $("#p1").html(playerOne.name);
                    $("#p1").show();
                    $("#p2").html(game.player2);
                    $("#p2").show();
                    $("#player1").show();
                    $("#message").html(playerOne.name + " , You are PLAYER 1");
                    $("#message").show();
                    $("#player2").hide();

                }

                if (sessionStorage.getItem('player') === "player2") {
                    $("#p2").html(playerTwo.name);
                    $("#p2").show();
                    $("#p1").html(game.player1);
                    $("#p1").show();
                    $("#player2").show();
                    $("#message").html(playerTwo.name + " , You are PLAYER 2");
                    $("#message").show();
                    $("#player1").hide();


                }
            }
            // if(activeUsers < 2 && activeUsers!==0){
            //     playerOne.wins = snapshot.val().Player1.wins;
            //     playerOne.losses = snapshot.val().Player1.losses;
            //     playerOne.name = snapshot.val().Player1.name;

            //     $("#player1").append("Wins: "+playerOne.wins);
            //     $("#player1").append("<br>");
            //     $("#player1").append("Losses: "+playerOne.losses);
            //     $("#p1").html(playerOne.name);

            // }


        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    },

    renderMainPlayer: function () {
        console.log("This is window of: " + sessionStorage.getItem('player'))
        if (activeUsers >= 2) {
            $("#add-player").hide();

        }
        database.ref("Players").on("value", function (snapshot) {
            game.player1 = snapshot.val().Player1.name;
            game.player2 = snapshot.val().Player2.name;

        })
        if (sessionStorage.getItem('player') === "player1") {
            $("#p1").html(playerOne.name);
            $("#p1").show();
            $("#p2").html(game.player2);
            $("#p2").show();
            $("#player1").show();
            $("#message").html(playerOne.name + " , You are PLAYER 1");
            $("#message").show();
            $("#player2").hide();

        }

        if (sessionStorage.getItem('player') === "player2") {
            $("#p2").html(playerTwo.name);
            $("#p2").show();
            $("#p1").html(game.player1);
            $("#p1").show();
            $("#player2").show();
            $("#message").html(playerTwo.name + " , You are PLAYER 2");
            $("#message").show();
            $("#player1").hide();


        }
        if (activeUsers == 2) {

            //     playerOne.wins = snapshot.val().Player1.wins;
            //     playerOne.losses = snapshot.val().Player1.losses;
            //     playerOne.name = snapshot.val().Player1.name;

            //     playerTwo.wins = snapshot.val().Player2.wins;
            //     playerTwo.losses = snapshot.val().Player2.losses;
            //     playerTwo.name = snapshot.val().Player2.name;

            //     $("#player1").append("Wins: "+playerOne.wins);
            //     $("#player1").append("<br>");
            //     $("#player1").append("Losses: "+playerOne.losses);

            //     $("#player2").append("Wins: "+playerTwo.wins);
            //     $("#player2").append("<br>");
            //     $("#player2").append("Losses: "+playerTwo.losses);
            // }
            // if(activeUsers < 2 && activeUsers!==0){
            //     playerOne.wins = snapshot.val().Player1.wins;
            //     playerOne.losses = snapshot.val().Player1.losses;
            //     playerOne.name = snapshot.val().Player1.name;

            //     $("#player1").append("Wins: "+playerOne.wins);
            //     $("#player1").append("<br>");
            //     $("#player1").append("Losses: "+playerOne.losses);
            //     $("#p1").html(playerOne.name);

        }



    },

    renderOtherPlayer: function () {
        if (sessionStorage.getItem('player') === "player1") {
            if (activeUsers == 2) {
                $("#p2").append(game.player2);
            }
        }

        if (sessionStorage.getItem('player') === "player2") {
            if (activeUsers == 2) {
                $("#p1").append(game.player1);
            }
        }
    },


    chat: function () {
        var date = new Date();
        var timestamp = date.getTime()
        var msg = $("#chatMessage").val().trim();
        $("#chatMessage").val("");
        database.ref("Chat").push({
            name: sessionStorage.getItem('playerName'),
            message: msg,
            timeStamp: timestamp
        });
    }
}



$(document).ready(function () {
    console.log("ready!");
    game.renderOnStart();
    // database.ref("Players").on("value", function (snapshot) {
    //     if (game.winner.length > 1) {
    //         $("#message").html("The winner is: " + game.winner);
    //     }
    //     playerOne.wins = snapshot.val().Player1.wins;
    //         playerOne.losses = snapshot.val().Player1.losses;
    //         playerOne.name = snapshot.val().Player1.name;

    //         playerTwo.wins = snapshot.val().Player2.wins;
    //         playerTwo.losses = snapshot.val().Player2.losses;
    //         playerTwo.name = snapshot.val().Player2.name;

    //         $("#player1").append("Wins: "+playerOne.wins);
    //         $("#player1").append("<br>");
    //         $("#player1").append("Losses: "+playerOne.losses);

    //         $("#player2").append("Wins: "+playerTwo.wins);
    //         $("#player2").append("<br>");
    //         $("#player2").append("Losses: "+playerTwo.losses);

    // })

    $("#join-button").on("click", function (event) {
        event.preventDefault();
        console.log("Clicked Join button!");
        if (activeUsers == 0) {
            playerOne.savePlayerDetails($("#playerName").val().trim());
            $("#playerName").val("");

        }
        else if (activeUsers == 1) {
            playerTwo.savePlayerDetails($("#playerName").val().trim());
            $("#playerName").val("");
        }

        game.renderMainPlayer();
        //game.startGame();

    });

    $(".selection").on("click", function (event) {
        event.preventDefault();

        console.log("Clicked Option " + event.target.id);
        console.log($(this).attr("data-parent"));

        if ($(this).attr("data-parent") === "player1") {
            playerOne.makeSelection($(this).attr("data"));
            $("#message").html("You selected: " + $(this).attr("data").toUpperCase());
        }
        else if ($(this).attr("data-parent") === "player2") {
            playerTwo.makeSelection($(this).attr("data"));
            $("#message").html("You selected: " + $(this).attr("data").toUpperCase());

        }
        database.ref("Players").on("value", function (snapshot) {
            playerOne.selection = snapshot.val().Player1.selection;
            playerTwo.selection = snapshot.val().Player2.selection;

        });
        if (playerOne.selection.length >= 1 && playerTwo.selection.length >= 1) {
            game.rockPaperScissor(playerOne.selection, playerTwo.selection);
        }

    });

    $(".leave").on("click", function (event) {
        console.log("Clicked " + event.target.value);
        if ($(this).attr("data-parent") === "player1") {
            playerOne.leaveGame();
        }
        else if ($(this).attr("data-parent") === "player2") {
            playerTwo.leaveGame();
        }



    });

    $("#chat-button").on("click", function (event) {
        game.chat();

    });

    database.ref("Chat").orderByChild("timeStamp").on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());
        $("textarea").append("\n<br>" + childSnapshot.val().name + ": " + childSnapshot.val().message + "<br>");

    })
});


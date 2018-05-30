        var counter = 7;
        var successFlag = false;
        var gameOverFlag = false;
        var startedFlag=false;

        document.getElementById("hangman").innerHTML = "<h1>Hangman</h1>";
        window.addEventListener('keydown', function (e) {
            game.keyPressed = e.key;
            if (game.keyPressed === "Enter" && startedFlag===false) {
                game.startGame();
            }
            if (e.keyCode >= 65 && e.keyCode <= 90 && gameOverFlag === false && successFlag===false && startedFlag===true) {
                game.playGame();
            }
            if (game.keyPressed === "Enter" && (gameOverFlag === true || successFlag === true)) {
                game.resetView();
            }
        })

        var game = {

            divHangman: document.getElementById("hangman"),
            divWord: document.getElementById("word"),
            divCat: document.getElementById("category"),
            divUsed: document.getElementById("usedchar"),
            divCounter: document.getElementById("counter"),
            divGameover: document.getElementById("gameover"),
            divSucess: document.getElementById("success"),
            divMessage:document.getElementById("message"),
            currentMatches: 0,
            currentWord: "",
            usedCount: 0,
            keyPressed: "",
            usedChars: [],
            playWord: [],
            categories: ["Animals", "Geography", "Sports"],
            Animals: ["TIGER", "LEOPARD", "AARDVARK", "HIPPOPOTAMUS", "WILDEBEEST", "HYENA", "ARMADILLO", "RHINOCEROS", "ZEBRA"],
            Geography: ["MINNESOTA", "INDIA", "MISSISSIPPI", "ALGERIA", "BARCELONA", "AUSTRALIA", "HIMALAYAS", "ACONCAGUA"],
            Sports: ["HOCKEY", "SOCCER", "CRICKET", "BADMINTON", "TENNIS", "BASEBALL", "SKIING", "ATHLETICS", "FOOTBALL"],

            randomCategory: function () {
                var currentCat = game.categories[Math.floor(Math.random() * game.categories.length)];
                //document.getElementById("category").innerHTML = "<h3>Category: "+currentCat+"</h3>";
                return currentCat;
            },
            randomWord: function (category) {
                if (category === "Animals") {
                    game.currentWord = game.Animals[Math.floor(Math.random() * game.Animals.length)]
                }
                if (category === "Geography") {
                    game.currentWord = game.Geography[Math.floor(Math.random() * game.Geography.length)]
                }
                if (category === "Sports") {
                    game.currentWord = game.Sports[Math.floor(Math.random() * game.Sports.length)]
                }
                game.divCat.innerHTML = "<h3>Category: " + category + "</h3>";
                console.log(category);
                console.log(game.currentWord);


            },
            generateDashes: function (length) {
                for (var i = 0; i < length; i++) {
                    game.playWord[i] = "_ ";
                    game.divWord.append(game.playWord[i]);
                }
                game.divHangman.append(game.divWord);
            },
            generateDivDashes: function (length) {
                var divIterator;
                game.divWord.innerHTML = "<h5>Word to guess: </h5>";

                for (var i = 0; i < length; i++) {
                    divIterator = document.createElement("div");
                    divIterator.textContent = "_ ";
                    divIterator.setAttribute("class", "index");
                    divIterator.setAttribute("id", "wordindex" + (i + 1));
                    game.divWord.append(divIterator);
                }
                //divMessage.setAttribute('visible',false);

            },
            containsLetter: function (word, character) {
                var pos = new Array();
                var j = 0;
                var matched = 0;
                console.log(word.length);
                console.log(character);
                if (word.indexOf(character.toUpperCase()) > -1 ) {
                    for (var i = 0; i < word.length; i++) {

                        if (word[i] == character.toUpperCase()) {
                            pos[j] = i;
                            j++;
                            if (game.usedChars.indexOf(character.toUpperCase()) < 0) {
                                game.currentMatches++;

                            }
                        }
                    }

                    console.log("Found at: " + pos);
                    console.log("Total Matches: " + game.currentMatches);

                } else {
                    console.log("Not Found");
                    if(game.usedChars.indexOf(character.toUpperCase())<0){counter--;}
                    
                }
                game.updateUsedCollection(character);
                return pos;

            },
            updateWordDisplay: function (length, character, pos) {
                var j = 0;
                var divIterator;
                console.log(game.playWord);
                for (var i = 0; i < length; i++) {
                    divIterator = document.getElementById("wordindex" + (i + 1));
                    if (pos[j] == i) {
                        divIterator.textContent = character.toUpperCase() + " ";
                        j++;
                    } else if (divIterator.textContent === "_ ") {
                        divIterator.textContent = "_ ";
                    }
                }
                console.log(game.playWord);

            },
            updateUsedCollection: function (character) {
                if (game.usedChars.indexOf(character.toUpperCase()) < 0) {
                    game.usedChars.push(character.toUpperCase());
                    game.usedCount++;
                }
                console.log("Used Chracters: " + game.usedChars);
            },
            startGame: function () {
                startedFlag=true;
                var cat = game.randomCategory();
                game.divMessage.style.display="none";
                game.randomWord(cat);
                game.generateDivDashes(game.currentWord.length);
                game.divUsed.innerHTML = "<h3> Used Characters: " + game.usedChars.toString() + "</h3>";
                game.divCounter.innerHTML = "<h3> Characters Remaining: " + counter + "</h3>";

            },
            playGame: function () {
                var pos = new Array();
                pos = game.containsLetter(game.currentWord, game.keyPressed);
                if (pos.length > 0) {
                    game.updateWordDisplay(game.currentWord.length, game.keyPressed, pos);
                }
                if (game.currentMatches == game.currentWord.length) {
                    game.success();
                }
                game.divUsed.innerHTML = "<h3> Used Characters: " + game.usedChars.toString() + "</h3>";
                game.divCounter.innerHTML = "<h3> Characters Remaining: " + counter + "</h3>";

                console.log(counter);
                if (counter === 0) {
                    game.gameOver()
                }

            },
            gameOver: function () {
                game.divGameover.innerHTML = "<h2>Game Over !! You Lost!!</h2>";
                gameOverFlag = true;
                game.divMessage.style.display="";
                game.divWord.innerHTML = "<h3>Word to guess: "+ game.currentWord +"</h3>";

            },
            success: function () {
                game.divSucess.innerHTML = "<h2>Correct guess !! You Won!!</h2>";
                successFlag = true;
                game.divMessage.style.display="";


            },
            resetView: function () {

                counter = 7;
                game.currentMatches = 0;
                game.currentWord = "";
                game.usedCount = 0;
                game.usedChars = [];
                game.keyPressed = "";
                game.playWord = [];
                startedFlag=false;
                document.location.reload(true);

            }
        }

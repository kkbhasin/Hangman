
        // Starting a new game and selecting the word for the hangman game.
        var wordList = ["espionage", "mnemonic", "megahertz", "xylophone", "zigzagging", "rickshaw", "kilobyte", "daiquiri", "rhubarb", "wyvern"];

        // Randomly selecting a word from the list, and setting placeholder for the length of the word.
        var selection;
        var placeholder;
        var userGuess = document.getElementById("user-key");
        var wrongSelect = [];
        var correctSelect = [];
        var availableGuess = 10;
        var totalGuess = 0;
        var guessLength = 0;
        var wins = 0;


        function newGame() {
            selection = wordList[Math.floor(Math.random() * wordList.length)];
            console.log(selection);
            placeholder = "";
            wrongSelect = [];
            availableGuess = 10;
            totalGuess = 0;
            guessLength = 0;
            correctSelect = [];
            for (var i = 0; i < selection.length; i++) {
                placeholder = placeholder + "_";
                document.getElementById("placeholder").innerHTML = placeholder;
            }
            x();
        }


        // Setting up the onKey event for user selection.

        function x(event) {
            if (event === undefined) {
                return;
            }
            else {
                userGuess.textContent = event.key;
                if (wrongSelect.indexOf(event.key) > -1 || correctSelect.indexOf(event.key) > -1) {
                    alert("You have already selected this key");
                    return;
                }
                if (availableGuess > totalGuess) {
                    console.log(event.keyCode);
                    if (event.keyCode >= 65 && event.keyCode <= 90) {
                        console.log("Valid letter")
                        var isWrongGuess = true;
                        for (var i = 0; i < selection.length; i++) {
                            if (event.key === selection[i]) {
                                correctSelect.push(event.key);
                                placeholder = placeholder.slice(0, i) + event.key + placeholder.slice(i + 1);
                                document.getElementById("placeholder").innerHTML = placeholder;
                                guessLength++;
                                console.log();
                                isWrongGuess = false;
                            }
                        }
                        if (isWrongGuess && !(wrongSelect.indexOf(event.key) > -1)) {
                            wrongSelect.push(event.key);
                            availableGuess = availableGuess - 1;
                            document.getElementById("wrong-select").innerHTML = wrongSelect;
                            document.getElementById("available-guess").innerHTML = availableGuess;
                            console.log(selection[i]);
                        }

                        if (guessLength === selection.length) {
                            alert("Congrats, you have survived!");
                            wins++;
                            document.getElementById("wins").innerHTML = wins;
                            document.getElementById("wrong-select").innerHTML = "";
                            document.getElementById("available-guess").innerHTML = "";
                            newGame();
                        }
                    }
                    else {
                        alert("Invalid character. Guess again");
                    }
                }
                else {
                    alert("You lose. You dead, muhuhahaha!");
                    document.getElementById("wrong-select").innerHTML = "";
                    document.getElementById("available-guess").innerHTML = "";
                    newGame();
                }
            }
        }

        document.onkeyup = x;

        newGame();

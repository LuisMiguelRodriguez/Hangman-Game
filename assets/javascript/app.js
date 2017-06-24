
// An array of words to pick from
  var words = ["Javascript", "Bootstrap", "Tanuki", "School"];

// Picking a random word from the array
  var word = words[Math.floor((Math.random() * words.length))];

//For Testing Purposes
  console.log(word);

// Creating an Array of letters from the chosen word
  var letters = word.split('');
  var numberOfLetters = letters.length;

// Several variable to initiate
  var x = '';
  var wins = 0;
  var tries = 10;
  var losses = 0;
  var chosenLetters = [];
  var correctGuesses = 1;


// Looping through all letters in letters array and inserting them
// into there place holders which will currently have a class which
// sets its visibility attribute to hidden. Also a bottom border
// will be placed for each container to act as a dash below the letters

  for (var i = 0; i < letters.length; i++) {
    x += "<div class=\"underline\">";
    x += "<span id=\"" + i + "\" class=\"hidden\">" + letters[i] + "</span>";
    x += "</div>";
  }

//Places results from loop into the placeHolder ID to
//populate displayed dashes
  document.getElementById("placeHolder").innerHTML = x;

// Applying variable values to specified container
  document.getElementById("wins").innerHTML = wins;
  document.getElementById("tries").innerHTML = tries;
  document.getElementById("losses").innerHTML = losses;

// Beginning of keyboard interactions and logic of game
  document.onkeyup = function(event) {
      // Grabs value of keyboard keyup event
      var guess = event.key;

      //Grabing either -1 for false or index number of letter if true
      var guessIndex = letters.indexOf(guess);

      //  Game Logic
      //  Tesing if current letter exists in letters Array
      if (guessIndex >= 0){
        // Attempt at capturing number of same letters
        // var count = 0;
        // var pos = word.indexOf(guess);
        //
        // document.getElementById(letters.indexOf(guess)).className = "show";
        //
        // while (pos !== -1) {
        //   count++;
        //   pos = word.indexOf(guess , pos + 1);
        //   document.getElementById(letters.indexOf(pos)).className = "show";
        // }
        //
        // console.log(count); // displays 4
        //
        correctGuesses++;
        delete letters[guessIndex];
        document.getElementById(guessIndex).className = "show";

        // For Testing Purposes
        console.log(correctGuesses);
        console.log(numberOfLetters);
        console.log(letters);
      } else {

        tries--;
      }

      if (correctGuesses === numberOfLetters){
        alert("You Win");
      }

      // Checking to see if tries are finished
      if(tries <= 0){
        alert("You loose Loser");
      }

      // Updating Wins , Tries and Losses
      document.getElementById("wins").innerHTML = wins;
      document.getElementById("tries").innerHTML = tries;
      document.getElementById("losses").innerHTML = losses;

  }



//Unhides first element for testing
  document.getElementById("0").className = "show";

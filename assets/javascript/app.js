//Assigning word the value of whats returned
//when excuting the randomWord function
  var word = randomWord();

//For Testing Purposes
  console.log(word);

// Creating an Array of letters from the chosen word
  var letters = word.split('');
  var numberOfLetters = letters.length;

// Several variable to initiate
  var wins = 0;
  var tries = 6;
  var losses = 0;
  var correctGuesses = 0;
  var position = 0;
  var chosenLetters = [];

// Creating placeholders for the letters builds on x variable
  createPlaceHolders(letters);

//Updating Stats
  updateStats();

// Beginning of keyboard interactions and logic of game
  document.onkeyup = function(event) {
      // Grabs value of keyboard keyup event
      var guess = event.key;

      // Takes guess and adds it to an array which gets updated the screen
      lettersChosen(guess);

      console.log(guess);

      var guessIndex = letters.indexOf(guess);

      //  Game Logic
      //  Tesing if current letter exists in letters Array
      if (guessIndex >= 0){

        while (guessIndex !== -1){
          correctGuesses++;
          document.getElementById(guessIndex).className = "show";
          delete letters[guessIndex];
          console.log(letters);
          guessIndex = letters.indexOf(guess);
        }

        if (correctGuesses === numberOfLetters){
          wins++ ;
          alert("You Win");
        }

      } else {

        tries--;
        position += 512;
        var hangman = document.getElementById('hangman');
      
        // Changes sprite position after failed attempts
        if (tries >= 1){
          hangman.style.backgroundPosition = '0 -'+ position +'px';
        } else {
          alert("You Loose");
        }

      }


      // // Checking to see if tries are finished
      // if(tries <= 0){
      //   alert("You loose Loser");
      // }

      // Updating Wins , Tries and Losses

      updateStats();
  }

// **************************************************************
// ********************* FUNCTIONS ******************************
// **************************************************************



  // A function on that returns a random word from an array
  function randomWord () {
    // An array of words to pick from
      var words = ["javascript", "bootstrap", "tanuki", "school"];

    // Picking a random word from the array
    // And Returning it
      return words[Math.floor((Math.random() * words.length))];
  }

  // Looping through all letters in letters array and inserting them
  // into there place holders which will currently have a class which
  // sets its visibility attribute to hidden. Also a bottom border
  // will be placed for each container to act as a dash below the letters

  function createPlaceHolders (array){
    var x = '';
    for (var i = 0; i < array.length; i++) {
      x += "<div class=\"underline\"><span id=\"" + i + "\" class=\"hidden\">" + array[i] + "</span></div>";
    }

    document.getElementById("placeHolder").innerHTML = x;
  }

  function updateStats (){
    // Applying variable values to specified container
      document.getElementById("wins").innerHTML = wins;
      document.getElementById("tries").innerHTML = tries;
      document.getElementById("losses").innerHTML = losses;
  }

  function lettersChosen (guess) {
    var letterStyling = '';
    letterStyling += "<span class='btn btn-danger'>" + guess + "</span>";
    chosenLetters.push(letterStyling);
    document.getElementById("chosenLetters").innerHTML = chosenLetters;
  }

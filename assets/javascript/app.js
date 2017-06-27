
// End point for api that returns a random number
  var url = "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
//Function that returns a random word using an ajax request
  var word = getRandomWord(url);

// Several variables to initiate
// Needed a we to declare variables
// for a global scope
  var wins = 0;
  var tries = 6;
  var losses = 0;
  var correctGuesses = 0;
  var position = 0;
  var chosenLetters = [];

// Initial Word Setup
// Splits word to an array and
// lays out it out on the screen
  wordSetup(word);
  //Testing Purposes
  console.log(word);

//Updating Stats
  updateStats();

// Beginning of keyboard interactions and logic of game
  document.onkeyup = function(event) {
      // Grabs value of keyboard keyup event
      var guess = event.key;

      //Testing for only lettters to be allowed
      //Using the power of regular expressions
      var r = /[a-zA-Z]/;

      if (r.test(guess)){
        var guessIndex = letters.indexOf(guess);
        //Add's guess to an array to be displayed
        //Shows letters selection
        lettersChosen(guess);
        //  Game Logic
        //  Tesing if current letter exists in letters Array
        if (guessIndex >= 0){
          //Loops through the word to find duplicate
          //letters and to display 1 or more duplicates
          while (guessIndex !== -1){
            correctGuesses++;
            document.getElementById(guessIndex).className = "show";
            delete letters[guessIndex];
            console.log(letters);
            guessIndex = letters.indexOf(guess);
          }

          winOrLoose();

        } else {

        // Failed guess subtracting from tries
          tries--;
          position += 512;
          var hangman = document.getElementById('hangman');

          winOrLoose();

        }

        updateStats();
      } else {
        console.log("You did not press a letter try again");
      }

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

      if (correctGuesses === numberOfLetters){
        wins++ ;
        alert("You Win");
      }
      // Checking to see if tries are finished
      if(tries <= 0){
        alert("You loose Loser");
      }

  }

  function lettersChosen (guess) {
    var letterStyling = '';
    letterStyling += "<span class='btn btn-danger'>" + guess + "</span>";
    chosenLetters.push(letterStyling);
    document.getElementById("chosenLetters").innerHTML = chosenLetters;
  }

  function getJson(url) {
    return JSON.parse($.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        global: false,
        async: false,
        success: function (data) {
            return data;
        }
    }).responseText);
  }

  function getRandomWord (url){
    var wordObject = getJson(url);
    return wordObject.word.toLowerCase();
  }

  function wordSetup (word){
    letters = word.split('');
    numberOfLetters = letters.length;
    correctGuesses = 0;
    position = 0;
    chosenLetters = [];
    document.getElementById("chosenLetters").innerHTML = chosenLetters;
    tries = 6;
    createPlaceHolders(letters);
  }

  function winOrLoose (){
    // Changes sprite position after failed attempts
    if (tries >= 1) {
      hangman.style.backgroundPosition = '0 -'+ position +'px';
    } else {
      losses++;
      alert("You loose");
      //Reset Game
      word = getRandomWord(url);
      //Test Purposes
      console.log(word);
      wordSetup(word);
    }

    if (correctGuesses === numberOfLetters){
      wins++ ;
      alert("You Win");
      word = getRandomWord(url);
      //Test Purposes
      console.log(word);
      wordSetup(word);
    }
  }

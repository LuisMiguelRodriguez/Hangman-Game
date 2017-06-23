
// An array of words to pick from
  var words = ["Javascript", "Bootstrap", "Tanuki", "School"];

// Picking a random word from the array
  var word = words[Math.floor((Math.random() * words.length) -1)];

// Creating an Array of letters from the chosen word
  var letters = word.split('');

// Several variable to initiate
  var x = '';
  var wins = 0;
  var tries = 10;
  var losses = 0;
  var chosenLetters = [];

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


      if (letters.indexOf(guess) >= 0){
        
        wins++;
        document.getElementById(letters.indexOf(guess)).className = "show";
      } else {

        tries--;
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

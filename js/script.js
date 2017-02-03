/// James' comments in 3x slashes
/// Overall feedback: your project is extremely well thought out. Your problem
/// modeling skills appear to be quite strong. Admirable! My feedback is therefore
/// focussed on stylistic aspects of your code though i've included suggestions for
/// paring down your program and simplifying your design.

//This is an object that will contain all possible sequences.  At the moment
//there are four sequences- sequence at startup, sequence for the computer,
//sequence the user inputs (these two have values pushed as the game is played
//a randomizer will randomly decide for the computer sequence, and each push of
//the button by the user will populate the input sequence.  The last is a sequence
//that plays when the player loses.
//I might eventually make this object hold a counter for a possible hard mode
//I think I may also not need an inputSequence as I can just do a comparison
//to the computerSequence using a counter that ticks up every time the user
//chooses a color and checks against the computer sequence array index
var simon = {
  beginningSequence: [1,2,3,4,13,24,1,12,123,1234,1234,1234,1234,false],
  lossSequence: [1234,1234,1234,1,4,3,2,1,14,143,1432,1234,false],
  computerSequence: [],
  inputSequence: [], //possibly extraneous
  powerOn: false, //adding this to avoid using dom as a makeshift database
  colorMap: ['green','red','blue','yellow'], //'map' of the buttons
  speed: 50, //speed of delay between lights flashing
  sequenceCounter: 0,
  inputCounter: 0,
  score: 0,
  playerTimer: null
}
$('.powerSwitch').on('click',powerToggle); //user hits the powerSwitch
$('.startButton').on('click',function(){
  if (simon.computerSequence.length==0) {playGame()}
}); //user hits play
$('.button').on('click',checkSequence); //user clicks a button

function powerToggle() {
  if(simon.powerOn===false) {//if true, this means simon is off
    $('.powerButton').css('justify-content','flex-start'); //moves switch to on position
    simon.powerOn = true; //sets keypair to true for future toggle
    $('.startButton').css('background','rgba(255,0,0,1)'); //turns the start button "on"
    runSequence(simon.beginningSequence); //lights up the board in a sequence
  } else {//code to power down simon goes here, reset the object to original values etc
    allLightsOff();
    simon.computerSequence = [];

    /// You've already defined this above. also CONSTANTS by convention are
    /// ALL_CAPS_AND_SNAKE_CASED, even if they are object properties
    simon.speed = 50;
    simon.powerOn = false;
    simon.score = 0;

    /// I like that you thought to include the round-counter as part of how you modeled this object/machine
    /// my feedback here is that if you have two correspondent arrays, where each index in each array corresponds,
    /// meaning matching indices/indexes contain related information, you don't strictly need the counter but!
    /// it models the machine well. but maybe it could be considered extraneous. just food for thought.
    simon.sequenceCounter = 0;
    simon.inputCounter = 0;

    ///not sure if below line is doing anything
    $('.powerButton').css('justify-content','flex-end');
    ///nice uses of alhpa/opacity
    $('.startButton').css('background','rgba(255,0,0,.5)');
    $('.score').css('color','rgba(255,255,255,.1)');//turns score board off
    $('.outerCircle').css('pointer-events','auto');
  }
}

function runSequence(sequenceToUse) {
  ///I think sequenceArrayHolder isn't strictly necessary. really I think all you need is one looping structure that loops over player choices and the randomize sequence, checking for a match

  var sequenceArrayHolder;
  $('.outerCircle').css('pointer-events','auto'); //makes it so the user can't click items when this function runs


  ///I think you don't even need false at the end of these arrays here. if you're passing in an index outside the array, the reference to the non-existant array item will return undefined, and therefore be falsey
  ///however, your meticulous and lucid commenting and problem modeling are very commendable!!


  ///I would break out all the animation code in these conditional blocks into dedicated animation functions
  ///The code below is a little difficult to read/visually parse

  if (sequenceToUse[simon.sequenceCounter] === false) { //checks to see if it's at the last item in the sequence.  This is important because I wanted there to be a distinct end ot the function instead of having it taper off

    $('.outerCircle').css('pointer-events','none'); //at end of function, reactivates ability to push buttons
    $('.score').css('color','red');//turns score board on
    simon.sequenceCounter = 0;
    simon.inputCounter = 0;
    return null; //ends function


  } else if (sequenceToUse[simon.sequenceCounter].toString().length==1) { //checks how many digits are in the index of the array of the sequence
      $('#'+simon.colorMap[sequenceToUse[simon.sequenceCounter]-1]).addClass('on');
      beepBeep(simon.colorMap[sequenceToUse[simon.sequenceCounter]-1],!(sequenceToUse == simon.beginningSequence || sequenceToUse == simon.lossSequence));
      simon.sequenceCounter++; //these are used instead of a for loop because setTimer will set a timer but the loops will keep running (so there will just be many multiple timers at the same time and then the waiting function will run all after another)
  } else if (1 < sequenceToUse[simon.sequenceCounter].toString().length) { //if the value in the index has a two digit number or more, it will run this to light multiple lights at once for effect
      sequenceArrayHolder = sequenceToUse[simon.sequenceCounter].toString().split('');
      for (j=0; j < sequenceArrayHolder.length; j++) {
        $('#'+simon.colorMap[sequenceArrayHolder[j]-1]).addClass('on');
      }
      simon.sequenceCounter++
  }
  if (sequenceToUse[simon.sequenceCounter]===false && (sequenceToUse == simon.beginningSequence || sequenceToUse ==simon.lossSequence)) {
    var delayOff = setTimeout(function(){ //i want the ending light up to be longer if it's the turning on sequence
      allLightsOff(true,sequenceToUse);
    }
      ,simon.speed*3) //makes the last item of the sequence longer but only if its the beginning sequence
  } else if (sequenceToUse[simon.sequenceCounter]===false){ //basically if this is the last of the sequence that is not a beginning or ending animation, I want a timer for a lose scenario to start
    delayOff = setTimeout(function(){
      allLightsOff(true,sequenceToUse);
    }
      ,simon.speed);
    simon.playerTimer = setTimeout(loseScenario,3000); //you have three seconds to start after the sequence ends to begin
  }
  else {
    delayOff = setTimeout(function(){
      allLightsOff(true,sequenceToUse);
    }
      ,simon.speed);
  }
}
function allLightsOff(checkForOff,whichSequence) { //turns off any lights that are on (unless active, aka user is actively clicking)
  $('#green').removeClass('on');
  $('#red').removeClass('on');
  $('#blue').removeClass('on');
  $('#yellow').removeClass('on');
  if (checkForOff) { //added checkForOff so when I 'turn off' the board, I don't accidentally run runSequence.  In fact, this just lets me run this function when I want to clear the board
    var delayOff = setTimeout(runSequence,simon.speed+20,whichSequence);
  }
}
function playGame() {
  if (simon.powerOn === false) {
    return false; //checks to see if the game is on, if not it just refuses to start the game.
  }
  if (simon.computerSequence.length > 1) {
    simon.computerSequence.pop(); //i know the array is size 0 at the start, and once this runs through once, size 2 due to having an initial sequence (1 long) and a "false" end value to denote the end of the sequence. I want to "pop" the false off, attach a random value, and then reattach the false, which I do later
  }
  simon.computerSequence.push(randomizer()); //attaching a random number 1-4 which maps to a button
  simon.computerSequence.push(false); //adding the false to denote the end of the sequence

  ///you could also have a separate speed constant for startup/powerdown animations
  ///the virute of this is that you could keep all your simon.CONSTANTS in one place in your source
  simon.speed = 500; //since I know this is gameplay, I'm setting the speed of the lights to half a second as opposed to a tenth of a second for the startup animation

  runSequence(simon.computerSequence);
}
function checkSequence() {
  ///nice; i like that you broke out the sound-behavior into a separate function
  beepBeep($(this).attr('id'),true); //feeds the color name to the sound function to let it know which file to use
  if (simon.powerOn === false || simon.computerSequence.length==0) {
    return false; //game isn't on OR does not have an active sequence to compare to, do nothing
  } else {
    clearTimeout(simon.playerTimer);
    if (simon.computerSequence[simon.inputCounter] == (simon.colorMap.indexOf($(this).attr('id'))+1)){ //checks the computers sequence at the index that is equivalent to the users button push
      simon.inputCounter++
      simon.score = simon.inputCounter;
      simon.playerTimer = setTimeout(loseScenario,2000); //user made the right click, they have two seconds for the next click
      if (simon.inputCounter == simon.computerSequence.length-1) { //we've gone through the entire array and we know now that the user has gotten everything right
        clearTimeout(simon.playerTimer); //if it's the end of the computer sequence, you dont want the lose scenario to go anyway (set rigth before), so you clear it
        updateScore();
        var delayRound = setTimeout(playGame,1000);
      }
    } else {//input code for losing
      loseScenario();
      return false;
      // simon.speed = 100;
      // simon.score = 0;
      // simon.computerSequence = [];
      // var delayLoss = setTimeout(runSequence,500,simon.lossSequence);
      // var delayLoss2 = setTimeout(updateScore,5000);
    }

  }
}
function loseScenario(){
  simon.speed = 50;
  simon.score = 0;
  simon.computerSequence = [];
  var delayLoss = setTimeout(runSequence,500,simon.lossSequence);
  var delayLoss2 = setTimeout(updateScore,5000);
}
function updateScore(){
  if (1 < simon.score.toString().length){ //if the score has more than 1 digit (example: 15 has two digits, 1 and 5)
    var scoreArray = simon.score.toString().split(''); //split it so it can populate the score field
    $('.score10').html(scoreArray[0]); //first digit placed in the tens field
    $('.score01').html(scoreArray[1]); //second digit placed in the ones field
  } else {
    $('.score10').text('0');
    $('.score01').text(simon.score); //one digit score just updates the ones field
  }
}
function beepBeep(colorSound,playGame){
  if (playGame == true) {
    var beep = $('<audio autoplay></audio>');
    beep.append('<source src="sounds/' + colorSound + '.mp3" type="audio/mp3" />');
    $('[data-action=sound]').html(beep);
  }
}
function randomizer() { //made this it's own function because I intended to use it again in another game mode
  return Math.floor((Math.random() * 4) + 1);
}

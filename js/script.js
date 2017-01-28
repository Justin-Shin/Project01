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
  computerSequence: [],
  inputSequence: [], //possibly extraneous
  lossSequence: [1234,1234,false],
  powerOn: false, //adding this to avoid using dom as a makeshift database
  colorMap: ['.green','.red','.blue','.yellow'], //'map' of the buttons
  speed: 100, //speed of delay between lights flashing
  sequenceCounter: 0,
  runningSequence: []
}

//user hits the powerSwitch
$('.powerSwitch').on('click',powerToggle);
$('.startButton').on('click',playGame);

function powerToggle() {
  if(simon.powerOn===false) {//if true, this means simon is off
    $('.powerButton').css('justify-content','flex-start'); //moves switch to on position
    simon.powerOn = true; //sets keypair to true for future toggle
    $('.startButton').css({'background':'rgba(255,0,0,1)', 'box-shadow':function(){
      var boxShadow = $('.startButton').css('box-shadow').replace(/rgba.*\)/,'rgba(255,0,0,1)')
      return boxShadow;
    }}); //turns the start button "on"
    runSequence(simon.runningSequence = simon.beginningSequence); //lights up the board in a sequence
    // $('.score').css('color','red');//turns score board on
  } else {
    //code to power down simon goes here
    allLightsOff();
    simon.computerSequence = [];
    simon.speed = 100;
    simon.powerOn = false;
    $('.powerButton').css('justify-content','flex-end');
    $('.startButton').css({'background':'rgba(255,0,0,.5)', 'box-shadow': function(){
      var boxShadow = $('.startButton').css('box-shadow').replace(/rgba.*\)/,'rgba(255, 0, 0, 50%)')
      console.log(boxShadow)
      return boxShadow;
    }});
    $('.score').css('color','rgba(255,255,255,.1)');//turns score board off
  }
}
function runSequence(sequenceToUse) {
  console.log(sequenceToUse)
  console.log(simon.sequenceCounter)
  console.log(sequenceToUse[simon.sequenceCounter])
  var sequenceArrayHolder;
  $('.outerCircle').css('pointer-events','auto'); //makes it so the user can't click items when this function runs
  if (sequenceToUse[simon.sequenceCounter] === false) { //checks to see if it's at the last item in the sequence.  This is important because I wanted there to be a distinct end ot the function instead of having it taper off
    $('.outerCircle').css('pointer-events','none'); //at end of function, reactivates ability to push buttons
    $('.score').css('color','red');//turns score board on
    simon.sequenceCounter = 0;
    return null; //ends function
  } else if (sequenceToUse[simon.sequenceCounter].toString().length==1) { //checks how many digits are in the index of the array of the sequence
      $(simon.colorMap[sequenceToUse[simon.sequenceCounter]-1]).addClass('on');
      simon.sequenceCounter++; //these are used instead of a for loop because setTimer will set a timer but the loops will keep running (so there will just be many multiple timers at the same time and then the waiting function will run all after another)
  } else if (1 < sequenceToUse[simon.sequenceCounter].toString().length) { //if the value in the index has a two digit number or more, it will run this to light multiple lights at once for effect
      sequenceArrayHolder = sequenceToUse[simon.sequenceCounter].toString().split('');
      for (j=0; j < sequenceArrayHolder.length; j++) {
        $(simon.colorMap[sequenceArrayHolder[j]-1]).addClass('on');
      }
      simon.sequenceCounter++
  }
  if (sequenceToUse[simon.sequenceCounter]===false) {
    var delayOff = setTimeout(allLightsOff,simon.speed*3,true) //makes the last item of the sequence longer
  } else {
    delayOff = setTimeout(allLightsOff,simon.speed,true);
  }
}
function allLightsOff(checkForOff) { //turns off any lights that are on (unless active, aka user is actively clicking)
  $('.green').removeClass('on');
  $('.red').removeClass('on');
  $('.blue').removeClass('on');
  $('.yellow').removeClass('on');
  if (checkForOff) { //added checkForOff so when I 'turn off' the board, I don't accidentally run runSequence.  In fact, this just lets me run this function when I want to clear the board
    var delayOff = setTimeout(runSequence,simon.speed+20,simon.runningSequence);
  }
}
function playGame() {
  if (simon.computerSequence.length > 1) {simon.computerSequence.pop()}
  simon.computerSequence.push(randomizer());
  simon.computerSequence.push(false);
  console.log(simon.computerSequence)
  runSequence(simon.runningSequence=simon.computerSequence);
}
function randomizer() {
  return Math.floor((Math.random() * 4) + 1);
}

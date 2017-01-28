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
  beginningSequence: [1,2,3,4,1,2,3,4,13,24,13,24,1234,1234,1234,false],
  computerSequence: [],
  inputSequence: [], //possibly extraneous
  lossSequence: [1234,1234,false],
  powerOn: false, //adding this to avoid using dom as a makeshift database
  colorMap: ['.green','.red','.blue','.yellow'], //'map' of the buttons
  speed: 200, //speed of delay between lights flashing
  sequenceCounter: 0,
  runningSequence: null
}

//user hits the powerSwitch
$('.powerSwitch').on('click',powerToggle);

function powerToggle() {
  if(simon.powerOn===false) {//if true, this means simon is off
    $('.powerButton').css('justify-content','flex-start'); //moves switch to on position
    simon.powerOn = true; //sets keypair to true for future toggle
    $('.startButton').css({'background':'rgba(255,0,0,1)', 'box-shadow':function(){
      var boxShadow = $('.startButton').css('box-shadow').replace(/rgba.*\)/,'rgba(255,0,0,1)')
      return boxShadow;
    }}); //turns the start button "on"
    runSequence(simon.runningSequence = simon.beginningSequence); //lights up the board in a sequence
    $('.score').css('color','red');//turns score board on
  } else {
    //code to power down simon goes here
  }
}
function runSequence(sequenceToUse) {
  var sequenceArrayHolder;
  $('.outerCircle').css('pointer-events','auto'); //makes it so the user can't click items when this function runs
  if (sequenceToUse[simon.sequenceCounter] === false) {
    console.log('completed a sequence');
    return true;
  } else if (sequenceToUse[simon.sequenceCounter].toString().length==1) {
      $(simon.colorMap[sequenceToUse[simon.sequenceCounter]-1]).addClass('on');
      simon.sequenceCounter++;
  } else if (1 < sequenceToUse[simon.sequenceCounter].toString().length) {

      sequenceArrayHolder = sequenceToUse[simon.sequenceCounter].toString().split('');
      console.log(sequenceArrayHolder)
      for (j=0; j < sequenceArrayHolder.length; j++) {
        $(simon.colorMap[sequenceArrayHolder[j]-1]).addClass('on');
      }
      simon.sequenceCounter++
  }
  if (sequenceToUse[simon.sequenceCounter]===false) {
    var delayOff = setTimeout(allLightsOff,simon.speed*2)
  } else {
    delayOff = setTimeout(allLightsOff,simon.speed);
  }

  $('.outerCircle').css('pointer-events','none'); //at end of function, reactivates ability to push buttons
}

function allLightsOff(checkForOff) {
  console.log('hey who turnedout the lights')
  $('.green').removeClass('on');
  $('.red').removeClass('on');
  $('.blue').removeClass('on');
  $('.yellow').removeClass('on');
  if (!checkForOff) {
    var delayOff = setTimeout(runSequence,simon.speed+50,simon.runningSequence);
  }
}

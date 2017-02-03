//I would put this on a different branch rather in the same repo. This is one of the purposes of version control

var simon = {
  powerOn: false,
  colorMap: {
    green: $('#green'),
    red: $('red'),
    blue: $('blue'),
    yellow: $('yellow')
  },
  beginningSequence: [1,2,3,4,12,24,1,12,123,123,123,123,123],
  lossSequence:[1234,1234,1234,1,4,3,2,1,14,143,1432,1234],
  computerSequence: [],
  speed: {
    animationSpeed: 50,
    easy: 1000,
    normal: 500,
    hard: 250,
    blazing: 125
  },
  sequenceCounter: 0,
  inputCounter: 0,
  score: 0,
  playerTimer: null,
  powerToggle: function(){
    $('.powerSwitch').on('click',function(){
      if( simon.powerOn === false ) {
        $('.powerButton').css('justify-content','flex-start');
        simon.powerOn = true;
        $('.startButton').css('background','rgba(255,0,0,1)');
        runSequence(simon.beginningSequence);
      } else {
        simon.allLightsOff();
        simon.computerSequence = [];
        simon.powerOn = false;
        simon.score = 0;
        simon.sequenceCounter = 0;
        simon.inputCounter = 0;
        $('.powerButton').css('justify-content','flex-end');
        $('.startButton').css('background','rgba(255,0,0,.5)');
        $('.score').css('color','rgba(255,255,255,.1)');
        $('.outerCircle').css('pointer-events','auto');
      }
    })
  },
  runSequence: function(){
  },
  allLightsOff: function(){

  },

}

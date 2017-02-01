#SIMON
###by Justin Shin

#Technologies Used
This game was built using HTML, CSS, JavaScript, sleep deprivation, and caffeine. Included is is a jQuery library.

#HTML, CSS
- divs in divs in divs: initially I did not like using so many divs, but eventually I learned to accept the div and love it.
- I used the :active psuedoclass to light the buttons up when clicked.  This is useful since I didn't want to run it all within JavaScript ~ in retrospect I should have utilized this more instead of relying so heavily on JS, but that's ok.
- I used media queries to switch what elements sized off of.  In retrospect I could have done this more efficiently, but it works so I'm not complaining.
- FlexBox is the real hero here. It helped with alignments, and in conjunction with the absolute positioning, I was able to make what I wanted to appear
- `user-select:none;` to prevent users from selecting the text
- I overlayed divs on the color buttons for two reasons. One, I wanted to add a black border to give a circular shape, and two, I wanted to be able to prevent button clicking before the game was "on".  Activation of the switch turned `pointer-events` to none, which made them able to be clicked through

#JavaScript, jQuery
- This was all over the place.  I started off wanting to make an array of arrays, but once learning about objects switched to that approach.  Didn't know enough to be able to encapsulate all functions in the object (I could, but I don't know how to make all listeners within the object active..)
- Functions are friends, not food.  I love functions, they make your life easier- repeatable code can be written once and utilized over and over again.  You just need to know how to manipulate it to do what you want
- From my talks with classmates, `$(this)` gets a bad rap when it is in fact the greatest thing since sliced bread.
- I hate timers in JavaScript, but a counter in conjunction with an if statement and a self-calling function made the time delay of the sequences running work just fine.

#Approach Taken
My approach to these problems is to write a general idea of what I want and then dive in headfirst. As I wrote out what I thought it should do, I would reference unwritten functions (and also declare them so I remember to write them), until I had a basic skeleton of written out.  Then I worked on filling it in.

I knew I wanted the game to function much like the actual Simon game, so there would be an "on" switch as well as an opening animation, and a start button that made the game go.  I realized I needed a way for the sequence to play when called, so I made a function that could play a sequence of lights based on an array I fed into it.  The play sequence would call, on a slight delay, the function to turn off the lights, which calls the play sequence function.  These calls will only occur with specific conditions so it wont run forever.

I was going to make the solution check based on two arrays- one array that is populated randomly per turn by the computer, and then one array that is populated as the player presses buttons, but I thought that having a counter of which part of the sequence the player was in and comparing the current click to the index of the computer array (using the counter as the index) was much easier to do.

#Installation Instructions

This is hosted online, have fun.  Or not, I think Simon, in retrospect, is a pretty dreadfully boring game.  Really fun to make though!

#User Stories
- A user should not be able to click buttons on an game that is off (unless it is the on switch)
- A user should be able to see when a game is turned on with an opening animation
- A user should be able to follow the sequence easily and replay it (if they remember it)
- A user will lose if they wait too long to begin the sequence
- A user will lose if they wait too long between clicks when following the sequence
- A user should be able to track the score they have accrued that round in the score box-shadow
- A user should be annoyed greatly at the terrible sounds that appear when a button is clicked.

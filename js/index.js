// Keyboard inputs
var p1Touch = 'z';
var p1Shoot = 'x';
var p2Touch = 'c';
var p2Shoot = 'v';
var counter = 4;
var countingDown = false;
var countdown;
var drawCounter;
var audioStart = document.getElementById('audioStart');
var audioDraw = document.getElementById('audioDraw');
var audioPlayer1Wins = document.getElementById('audioPlayer1Wins');
var audioPlayer2Wins = document.getElementById('audioPlayer2Wins');
var audioPlayer1Cheated = document.getElementById('audioPlayer1Cheated');
var audioPlayer2Cheated = document.getElementById('audioPlayer2Cheated');


$('.controller').on('input', function() {
  var value = $(this).val();
  if (value.substr(-1) == 'r') {
    startGame();
  } else {
    checkWinner(value);
  }
})

function startGame() {
  resetGame();
  $('.target').html('Wild West Shootout');
  audioStart.play();

  setTimeout(function() {
    $('.target').html('Take three steps!')
    setTimeout(function() {
      $('.target').html('Turn Around!')
      console.log('counting down')
      countingDown = true;
      randomDraw();
    }, 3700)
  }, 2200)
}

function randomDraw() {
  var randomTime = (((Math.floor(Math.random() * 7)) + 5) * 1000);
  console.log(randomTime);
  drawCounter = setTimeout(function() {
    countingDown = false;
    $('.target').html('Draw!');
    audioDraw.play();
  }, randomTime)
}

function resetGame() {
  stopAllSound();
  $('.controller').val('');
  $('.target').html('Wild West Shootout');
}

function resetTimer() {
  clearTimeout(drawCounter);
}

function stopAllSound() {
  audioStart.pause();
  audioStart.currentTime = 0;
  audioDraw.pause();
  audioDraw.currentTime = 0;
  audioPlayer1Wins.pause();
  audioPlayer1Wins.currentTime = 0;
  audioPlayer2Wins.pause();
  audioPlayer2Wins.currentTime = 0;
  audioPlayer1Cheated.pause();
  audioPlayer1Cheated.currentTime = 0;
  audioPlayer2Cheated.pause();
  audioPlayer2Cheated.currentTime = 0;
}

$('#reset').on('click', function() {
  resetGame();
})

$('#start').on('click', function() {
  startCountdown();
  var audio = document.getElementById('audio');
  audio.play();
})

function checkWinner(input) {
  var p1ShootIndex = input.indexOf(p1Shoot);
  var p2ShootIndex = input.indexOf(p2Shoot);
  var p1TouchIndex = input.indexOf(p1Touch);
  var p2TouchIndex = input.indexOf(p2Touch);

  if (input == '') {
    $('.target').html('Wild West Shootout');
  }

  if (countingDown && (p1TouchIndex != -1)) {
    resetTimer();
    $('.target').html('Player One Cheated');
    stopAllSound();
    audioPlayer1Cheated.play();
  } else if (countingDown && (p2TouchIndex != -1)) {
    resetTimer();
    $('.target').html('Player Two Cheated');
    stopAllSound();
    audioPlayer2Cheated.play();
  } else if (!countingDown) {
    // Only check if someone has fired
    if (p1ShootIndex != -1 || p2ShootIndex != -1) {
      // If both have fired...
      if (p1ShootIndex != -1 && p2ShootIndex != -1) {
        // And player one has as lower index that's not -1, they shot first.
        if (p1ShootIndex < p2ShootIndex) {
          $('.target').html('Player One Wins');
          stopAllSound();
          audioPlayer1Wins.play();
        } else if (p2ShootIndex < p1ShootIndex) { // else player two shot first
          $('.target').html('Player Two Wins');
          stopAllSound();
          audioPlayer2Wins.play();
        }
        // if only one player has shot, the higher number wins because the other
        // one is -1 because they haven't shot and that's what indexOf returns
        // when there is no instance of it.
      } else if (p1ShootIndex > p2ShootIndex) {
        $('.target').html('Player One Wins');
        stopAllSound();
        audioPlayer1Wins.play();
      } else if (p2ShootIndex > p1ShootIndex) {
        $('.target').html('Player Two Wins');
        stopAllSound();
        audioPlayer2Wins.play();
      }
    }
  }
}

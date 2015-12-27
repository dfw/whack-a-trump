var playBtn = document.getElementById('play');
var quitBtn = document.getElementById('quit');
var time = document.getElementById('time');
var score = document.getElementById('score');

var game = {
  countdown: 0,
  timeRemaining: 5,
  score: 0,
  start: function() {
    game.showQuit();
    game.countdown = setInterval(game.updateTime, 1000);    
  },
  end: function() {
    game.showPlay();
    clearInterval(game.countdown);    
  },
  resetGame: function() {
    game.showPlay();    
  },
  showPlay: function() {
    quitBtn.className = 'hide';
    playBtn.className = '';
  },
  showQuit: function() {
    playBtn.className = 'hide';
    quitBtn.className = '';
  },
  updateTime: function() {
    time.innerHTML = game.timeRemaining;
    if (game.timeRemaining > 0) {
      game.timeRemaining -= 1;            
    } else {
      clearInterval(game.countdown);
      game.showPlay();
    }
  },
  resetTime: function() {
    game.timeRemaining = 30;
    time.innerHTML = game.timeRemaining;
  }
};

playBtn.onclick = function() {
  var newGame = game;
  newGame.start();
  quitBtn.onclick = function() {
    newGame.end();
  };
};
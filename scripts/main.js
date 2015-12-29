var playBtn = document.getElementById('play');
var quitBtn = document.getElementById('quit');
var time = document.getElementById('time');
var score = document.getElementById('score');
var trumps = document.getElementById('trumps').getElementsByTagName('li');
var activeTrumps = [];

var game = {
  countdown: 0,
  playLoop: 0,
  timeRemaining: 15,
  score: 0,
  start: function() {
    game.showQuit();
    game.countdown = setInterval(game.updateTime, 1000);
    game.playLoop = setInterval(game.play, 1500);
  },
  end: function() {
    game.showPlay();
    game.deactivateTrumps();
    clearInterval(game.countdown);
    clearInterval(game.playLoop);
  },
  play: function() {
    if (game.timeRemaining > 0) {
      game.deactivateTrumps();
      var randomTrumps = game.getRandomTrumps();
      game.activateTrumps(randomTrumps);
    } else {
      game.deactivateTrumps();
      clearInterval(game.playLoop);
    }
  },
  getRandomTrumps: function() {
    var firstTrump = secondTrump = 0;
    var trumpsArray = [];
    if (activeTrumps.length > 0) {
      while (firstTrump === activeTrumps[0] ||
             firstTrump === activeTrumps[1] ||
             secondTrump === activeTrumps[0] ||
             secondTrump === activeTrumps[1] ||
             firstTrump === secondTrump) {
        firstTrump = randomNumber(0, 8);
        secondTrump = randomNumber(0, 8);
      }
    } else {
      while (firstTrump === secondTrump) {
        firstTrump = randomNumber(0, 8);
        secondTrump = randomNumber(0, 8);
      }
    }
    trumpsArray.push(firstTrump);
    trumpsArray.push(secondTrump);
    return trumpsArray;
  },
  activateTrumps: function(selectedTrumps) {
    for (var i = 0; i < selectedTrumps.length; i++) {
      trumps[selectedTrumps[i]].getElementsByTagName('span')[0].className = 'up';
    }
    activeTrumps = selectedTrumps;
  },
  deactivateTrumps: function() {
    if (activeTrumps.length > 0) {
      for (var i = 0; i < activeTrumps.length; i++) {
        trumps[activeTrumps[i]].getElementsByTagName('span')[0].className = '';
      }
    }
  },
  hit: function() {
    if (this.className === 'up') {
      game.updateScore();
      this.className = 'hit';
    }
  },
  updateScore: function() {
    game.score += 1;
    score.innerHTML = game.score;
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
      game.end();
    }
  },
  resetTime: function() {
    game.timeRemaining = 15;
    time.innerHTML = game.timeRemaining;
  },
  resetScore: function() {
    game.score = 0;
    score.innerHTML = game.score;
  },
  resetGame: function() {
    game.resetTime();
    game.resetScore();
  }
};

playBtn.onclick = function() {
  game.start();
};

quitBtn.onclick = function() {
  game.end();
  game.resetGame();
};

for (var i = 0; i < trumps.length; i++) {
  var trump = trumps[i].getElementsByTagName('span')[0];
  trump.onclick = game.hit;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
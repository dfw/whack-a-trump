'use strict';

var playBtn = document.getElementById('play');
var quitBtn = document.getElementById('quit');
var time = document.getElementById('time');
var score = document.getElementById('score');
var trumps = document.getElementById('trumps').getElementsByTagName('li');
var activeTrumps = [];

var game = {
  countdown: 0,
  playLoop: 0,
  timeRemaining: 20,
  score: 0,
  trumpCount: 0,
  newHighScore: false,
  init: function() {
    playBtn.onclick = function() {
      game.start();
    };
    quitBtn.onclick = function() {
      game.end();
      game.resetGame();
    };
    for (var i = 0; i < trumps.length; i++) {
      var trump = trumps[i].getElementsByTagName('span')[0];
      if ('ontouchstart' in document.documentElement) {
        trump.ontouchend = game.hit;
      } else {
        trump.onclick = game.hit;
      }
    }
  },
  start: function() {
    game.showQuit();
    game.countdown = setInterval(game.updateTime, 1000);
    game.playLoop = setInterval(game.play, 1250);
  },
  end: function() {
    game.showPlay();
    game.deactivateTrumps();
    clearInterval(game.countdown);
    clearInterval(game.playLoop);
    if (game.timeRemaining === 0) {
      game.saveScore();
      game.showMessage();
    }
  },
  play: function() {
    if (game.timeRemaining > 0) {
      game.deactivateTrumps();
      var randomTrumps = game.getRandomTrumps();
      game.activateTrumps(randomTrumps);
    }
  },
  getRandomTrumps: function() {
    var firstTrump = 0;
    var secondTrump = 0;
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
      game.trumpCount += 1;
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
    game.timeRemaining = 20;
    time.innerHTML = game.timeRemaining;
  },
  resetScore: function() {
    game.trumpCount = 0;
    game.score = 0;
    score.innerHTML = game.score;
  },
  resetGame: function() {
    game.resetTime();
    game.resetScore();
  },
  message: function() {
    var msgDiv = document.createElement('div');
    msgDiv.className = 'game-over';
    var h2 = document.createElement('h2');
    var h2Content = document.createTextNode('Game Over');
    h2.appendChild(h2Content);
    var p1 = document.createElement('p');
    var p1Content;
    var msg;
    if (game.score === 0) {
      msg = 'Well that\'s embarrassing.';
    } else if (game.score === game.trumpCount) {
      msg = 'Perfect!';
    } else if (game.newHighScore) {
      msg = 'New high score!';
    } else {
      msg = randomExpression();
    }
    p1Content = document.createTextNode(msg);
    p1.appendChild(p1Content);
    var p2 = document.createElement('p');
    var p2Content = document.createTextNode('You whacked ' + game.score + ' Trump' + (game.score !== 1 ? 's' : '') + '.');
    p2.appendChild(p2Content);
    var btn = document.createElement('button');
    var btnContent = document.createTextNode('Play Again');
    btn.appendChild(btnContent);
    btn.onclick = game.removeMessage;
    msgDiv.appendChild(h2);
    msgDiv.appendChild(p1);
    msgDiv.appendChild(p2);
    msgDiv.appendChild(btn);
    return msgDiv;
  },
  showMessage: function() {
    document.body.appendChild(game.message());
  },
  removeMessage: function() {
    var msg = document.getElementsByClassName('game-over')[0];
    game.resetGame();
    msg.remove();
  },
  saveScore: function() {
    if (!localStorage.score || game.score > localStorage.score) {
      localStorage.score = game.score;
      game.newHighScore = true;
    } else {
      game.newHighScore = false;
    }
  }
};

game.init();

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomExpression() {
  var expressions = [
    'Yes!',
    'Woo!',
    'Way to go!',
    'Congrats!',
    'Awesome!',
    'Boom!'
  ];
  return expressions[randomNumber(0, 5)];
}
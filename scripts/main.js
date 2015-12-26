var playBtn = document.getElementById('play');

function Game() {
  this.start = function() {
    alert('start!');
  };
  this.start();
};

playBtn.onclick = function() {
  var newGame = new Game();
}
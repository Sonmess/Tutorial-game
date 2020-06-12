$(function() {
  startButton();
  endButton();
});

function endButton() {
  var gameMenu = $('#game-menu');
  var gameEnd = $('#game-end');
  gameMenu.find('#end-button').click(() => {
    gameMenu.hide();
    gameEnd.show();
  });

  /*gameMenu.find('#end-button').click(function() {
    gameMenu.hide();
    gameEnd.show();
  });*/
}

function startButton() {
  var gameMenu = $('#game-menu');
  var gamePlay = $('#game-play');
  gameMenu.find('#play-button').click(() => {
    gameMenu.hide();
    gamePlay.show();
  });

  //porovnanie javascript a jquery
  function info() {
    var gameMenu = $('#game-menu'); //jquery
    var gameMenu2 = document.getElementById('game-menu'); //javascript
    gameMenu.click(() => {
      //nieco co sa ma vykonat toto je JQUERY
    });
    gameMenu2.addEventListener('click', function() {
      //nieco co sa ma vykonat, toto je cisty javascript
    });
  }
}
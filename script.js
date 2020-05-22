$(() => {
  startButton();
  endButton();
})

function endButton() {
  let gameMenu = $('#game-menu');
  let gameEnd = $('#game-end');
  gameMenu.find('#end-button').click(() => {
    gameMenu.hide();
    gameEnd.show();
  });
}

function startButton() {
  let gameMenu = $('#game-menu');
  let gamePlay = $('#game-play');
  gameMenu.find('#play-button').click(() => {
    gameMenu.hide();
    gamePlay.show();
  })
}
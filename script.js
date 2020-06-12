$(() => {
  startButton();
  optionsButton();
  endButton();
  inputName();
  backButton();
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

function optionsButton() {
  let gameMenu = $('#game-menu');
  let gameOptions = $('#game-options');
  $('#options-button').click(() => {
    gameMenu.hide();
    gameOptions.show();
  });
}

function inputName() {
  let nameInput = $('#options-name');
  nameInput.change(() => {
    let playerName = nameInput.val();
    $('.player-name').text(playerName);
  })
}

function backButton() {
  $('.back-link').click(() => {
    $('#game-menu').show();
    $('#game-options').hide();
    $('#game-play').hide();
    $("#game-end").hide();
  });
}
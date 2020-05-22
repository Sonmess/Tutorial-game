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
    this.startGame();
  })
}

function startGame() {
  const startGameBtn = $('#start-game');
  const stopGameBtn = $('#stop-game');
  const vsLogo = $('#vs-logo');
  startGameBtn.click(() => {
    startGameBtn.hide();
    stopGameBtn.show();
    vsLogo.hide();
    this.timeCountDown(10);
    this.playerSwitch(true);
  });
}

function timeCountDown(maxTime) {
  const timeCountdown = $('#time-countdown');
  timeCountdown.text(maxTime);
  var intervalId = window.setInterval(function() {
    timeCountdown.text(maxTime);
    maxTime--;
    if (maxTime < 0) {
      window.clearInterval(intervalId);
      //ked cas vyprsal mal by nastat koniec hry
    }
  }, 1000)
}

function playerTurn() {
    const playerAvatar = $('#player-avatar');
    this.attackAction(playerAvatar);
}

function enemyTurn() {
  const enemyAvatar = $('#enemy-avatar');
  window.setTimeout(() => {      
      enemyAvatar.animate({
        height: '300px'
      }, 'slow', () => {
        this.changeStatus('Útočí');
        enemyAvatar.finish();
        enemyAvatar.animate({
          left: '-166%'
        }, 'slow', () => {
          enemyAvatar.finish();
          this.changeStatus('Vracia sa');
          enemyAvatar.animate({
            left: '0'
          }, 'slow', () => {    
            enemyAvatar.animate({
              height: '200px'
            }, 'slow', () => {
              enemyAvatar.finish();
              this.playerSwitch(true)
            });
          });
        });
      });
  }, 1000);
}

function playerSwitch(isPlayer) {
  const actions = $('#actions');
  if (isPlayer) {
    actions.show();
    this.changeStatus('Čaká na výprask');
    this.playerTurn();
  } else {
    actions.hide();
    this.changeStatus('Premýšľa');
    this.enemyTurn();    
  }
}

function changeStatus(statusText) {
  const status = $('#enemy-status');
  status.text(statusText);
}

function attackAction(avatar) {
  const attack = $('#attack-action');
  attack.click(() => {
      avatar.animate({
        right: '-166%'
      }, 'slow', () => {
        this.changeStatus('Dostáva výprask');
        avatar.finish();
        avatar.animate({
          right: '0'
        }, 'slow', () => {
          avatar.finish();
          this.playerSwitch(false);
        });
      });      
  });
}
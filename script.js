var playerHealth = 100;

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
    this.timeCountDown(180);
    this.playerSwitch(true);
  });
}

function timeCountDown(maxTime) {
  const timeCountdown = $('#time-countdown');
  timeCountdown.text(maxTime);
  var intervalId = window.setInterval(function () {
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
  enemyAvatar.animate({
    height: '300px'
  }, 'slow', () => {
    this.changeStatus('Útočí');
    playerHealth = this.calculateHealth(true, 20);
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
          window.setTimeout(() => {
              if (playerHealth <= 0) {
                const looseImage = '<img class="lose-img" src="./img/loose.jpg"/>'
                $('#game-play').html(looseImage);
              } else {
                this.playerSwitch(true)
              }
          }, 1000);          
        });
      });
    });
  });
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
      this.calculateHealth(false, 5);
      avatar.finish();
      avatar.animate({
        right: '0'
      }, 'slow', () => {
        avatar.finish();
        window.setTimeout(() => {
          this.playerSwitch(false);
        }, 1000);
      });
    });
  });
}

function calculateHealth(isPlayer, damage) {
  let hpWrapper = null;
  if (isPlayer) {
    hpWrapper = $('#player-health');
  } else {
    hpWrapper = $('#enemy-health');
  }
  let hpElement = $(hpWrapper.find('.current-health')[0]);
  let hpNumber = Number(hpElement.text());
  let newHp = hpNumber - damage > 0 ? hpNumber - damage : 0;
  hpElement.text(newHp);
  hpWrapper.animate({
    width: newHp + '%'
  }, 'slow');
  return newHp;
}
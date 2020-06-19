var playerHealth = 100;
var enemyHealth = 100;
var timeIntervalId = '';

startButton();
endButton();

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
    startGame();
    stopGame();
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
    timeCountDown(180);
    playerSwitch(false);
  });
}

function stopGame() {
  const startGameBtn = $('#start-game');
  const stopGameBtn = $('#stop-game');
  const vsLogo = $('#vs-logo');
  stopGameBtn.click(() => {
    startGameBtn.show();
    stopGameBtn.hide();
    vsLogo.show();
    resetGame();
  });
}

function timeCountDown(maxTime) {
  const timeCountdown = $('#time-countdown');
  timeCountdown.text(maxTime);
  timeIntervalId = window.setInterval(function () {
    timeCountdown.text(maxTime);
    maxTime--;
    if (maxTime <= 0) {
      window.clearInterval(timeIntervalId);
      //ked cas vyprsal mal by nastat koniec hry
    }
  }, 1000)
}

function clearTimeCountDown() {
  const timeCountdown = $('#time-countdown');
  timeCountdown.text('Cas');
  window.clearInterval(timeIntervalId);
}

function resetGame() {
  clearTimeCountDown();
  playerHealth = $('#player-health');
  playerHealth.css('width', '100%');
  $(playerHealth.find('.current-health')[0]).text(100);
  enemyHealth = $('#enemy-health');
  enemyHealth.css('width', '100%');
  $(enemyHealth.find('.current-health')[0]).text(100);
  changeStatus('');
  const actions = $('#actions');
  actions.hide();
}

function playerTurn() {
  console.log('Hrac');
  const attack = $('#attack-action');
  attack.off().click(() => {
    attackAction(attack);
  });
}

async function attackAction(attack) {
    attack.parent().hide();    
    
    changeStatus('Dostava vyprask');
    playerMove();
    await sleep(2000);
    playerSwitch(true);
}

async function enemyTurn() {
  console.log('nepriatel');
  await enemyMove();
  await sleep(2000);
  playerSwitch(false);
}

async function enemyMove() {
  const enemyAvatar = $('#enemy-avatar');
  enemyAvatar.animate({
    height: '300px'
  }, 'slow', () => {
    changeStatus('Útočí');
    enemyAvatar.finish();
    enemyAvatar.animate({
      left: '-166%',
    }, 'slow', () => {
      var health = calculateHealth(false, 20);
      enemyAvatar.finish();
      changeStatus('Vracia sa');
      enemyAvatar.animate({
        left: '0'
      }, 'slow', () => {
        enemyAvatar.animate({
          height: '200px'
        }, 'slow', () => {
          enemyAvatar.finish();
            if (health == 0) {
              alert('Koniec hry, prehrali ste !!');
            }
        });
      });
    });
  });
}

async function playerMove() {
  const playerAvatar = $('#player-avatar');
  playerAvatar.animate({
    left: '166%'
  }, 'slow', () => {
    playerAvatar.finish();
    var health = calculateHealth(true, 10);
    playerAvatar.animate({
      left: '0'
    }, 'slow', () => {
      playerAvatar.finish();
        if (health == 0) {
          alert('Koniec hry, vyhrali ste');
        }
    });
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function playerSwitch(isPlayer) {
  const actions = $('#actions');
  if (!isPlayer) {
    actions.show();
    changeStatus('Čaká na výprask');
    playerTurn();
  } else {
    actions.hide();
    changeStatus('Premýšľa');
    enemyTurn();
  }
}

function changeStatus(statusText) {
  const status = $('#enemy-status');
  status.text(statusText);
}

function calculateHealth(isPlayer, damage) {
  let hpWrapper = null;
  if (!isPlayer) {
    hpWrapper = $('#player-health');
  } else {
    hpWrapper = $('#enemy-health');
  }
  let hpElement = $(hpWrapper.find('.current-health')[0]);
  let hpNumber = Number(hpElement.text());
  let newHp = hpNumber - damage > 0 ? hpNumber - damage : 0;
  console.log(newHp, isPlayer);
  hpElement.text(newHp);
  hpWrapper.animate({
    width: newHp + '%'
  }, 'slow');
  return newHp;
}
// Set to 60 fps
var INTERVAL = 1000 / 60;
/** @const */
var IS_IOS = /iPad|iPhone|iPod/.test(window.navigator.platform);

/** @const */
var IS_MOBILE = /Android/.test(window.navigator.userAgent) || IS_IOS;

// Jump multiplication factor
var FACTOR = IS_MOBILE ? 5 : 25;

var PLAYER_DIED = false;

function activateBot() {
  toggleButtons();
  window.playerBot = setInterval(function () {
    var player = Runner.instance_.player;
    // console.log(Runner.instance_.tRex);
    var obstacles = Runner.instance_.horizon.obstacles;
    if (!player.jumping &&
      (obstacles.length > 0) &&
      (obstacles[0].xPos + obstacles[0].width) <= ((parseInt(Runner.instance_.currentSpeed - 0.1) - 5) * FACTOR + 160) &&
      (obstacles[0].xPos + obstacles[0].width) > 20) {
      player.startJump(Runner.instance_.currentSpeed);
    }
  }, INTERVAL);

}

function killBot() {
    toggleButtons();
    window.clearInterval(window.playerBot);
}


function toggleButtons() {
    var killButton = document.getElementById('bot-deactivate-btn');
    var activateButton = document.getElementById('bot-activate-btn');
    if(!killButton.classList.contains('hidden')) {
        killButton.classList.add('hidden');
    } else {
        killButton.classList.remove('hidden');
    }

    if(activateButton.classList.contains('hidden')) {
        activateButton.classList.remove('hidden');
    } else {
        activateButton.classList.add('hidden');
    }
}

function toggleScreens() {
    var solutions = document.getElementById('solutions');
    var instructions = document.getElementById('instructions');
    if(!solutions.classList.contains('hidden')) {
        solutions.classList.add('hidden');
    } else {
        solutions.classList.remove('hidden');
    }

    if(instructions.classList.contains('hidden')) {
        instructions.classList.remove('hidden');
    } else {
        instructions.classList.add('hidden');
    }
}

function doInstructions() {
    var tap = document.getElementById('tapInstruction');
    var space = document.getElementById('spaceInstruction');
    if(IS_MOBILE) {
        tap.classList.remove('hidden');
    } else {
        space.classList.remove('hidden');
    }
}

doInstructions();

function start() {
    if(PLAYER_DIED) {
        PLAYER_DIED = false;
        toggleScreens();
    }
}

function gameOver() {
    PLAYER_DIED = true;
    toggleScreens();
}

// Create events to listen for
// bindEventToDocument('gameStarted', start);
document.addEventListener('gameStarted', start, false);
document.addEventListener('gameOver', gameOver, false);


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
    var touchpad = document.getElementsByClassName('touchpad-container')[0];
    if(!solutions.classList.contains('hidden')) {
        solutions.classList.add('hidden');
    } else {
        solutions.classList.remove('hidden');
    }

    if(instructions.classList.contains('hidden')) {
        instructions.classList.remove('hidden');
        touchpad.classList.remove('hidden');
    } else {
        instructions.classList.add('hidden');
        touchpad.classList.add('hidden');
    }
}

function doInstructions() {
    var tap = document.getElementById('tapInstruction');
    var touchpad = document.getElementsByClassName('touchpad-container')[0];
    var space = document.getElementById('spaceInstruction');
    if(IS_MOBILE) {
        tap.classList.remove('hidden');
        touchpad.classList.remove('hidden');
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

// Social Sharing

function getHighScore(){
    return Runner.instance_.highScoreNumber;
}

function shareToFacebook(url) {
    var score = getHighScore();
    // Save these for future use, maybe we can do custom images. 
    // var fbimgurl = 'http://';
    // "&p[images][0]=" + encodeURI(fbimgurl) +
    var fbimg = 'https://uploads-ssl.webflow.com/5aa733c2f1bd8ac7bbd2d257/5b02bb0efcdffe66897e7d83_sharing-img.jpg';
    var fbtitle = 'I scored ' + score + '. Can you beat it?';
    var fbsummary = 'Because sometimes it can be a bit hard keeping up with everything you need to do in your business, and sometimes you deserve a bit of fun. ';
    var fbAppID = '223385144922428';
    FB.ui({
        method: 'share_open_graph',
        action_type: 'og.shares',
        action_properties: JSON.stringify({
            object : {
               'og:url': url, // your url to share
               'og:title': fbtitle,
               'og:description': fbsummary,
               'og:image': fbimg
            }
        })
        },
        // callback
        function(response) {
        if (response && !response.error_message) {
            // then get post content
        } else {
            console.error('could not share post');
        }
    });
}

function shareToTwitter(url) {
    var score = getHighScore();
    var tweet = 'I scored ' + score + '. Can you beat it?';
    var tweetLink = 'https://twitter.com/share?text='+ tweet +'&url=' + url + '&hashtags=bitlabnz,digitalmarketing,runrunrun';
    window.open(
        tweetLink,
        'twitter-share-dialog',
        'width=626,height=436'); 
      return  false;

}

function socialShare(platform) {
    var shareLink = 'https://bitlab.co.nz/game';
    switch(platform) {
        case 'facebook':
            shareToFacebook(shareLink);
            break;
        case 'twitter':
            shareToTwitter(shareLink);
            break;
        default:
            console.error('Invalid share option');
    }
}
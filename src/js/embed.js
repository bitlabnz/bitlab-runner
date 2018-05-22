//this function will work cross-browser for loading scripts asynchronously
function loadScript(src, callback) {
  var s,
    r,
    t;
  r = false;
  s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = src;
  s.onload = s.onreadystatechange = function () {
    //console.log( this.readyState ); //uncomment this line to see which ready states are called.
    if (!r && (!this.readyState || this.readyState == 'complete')) {
      r = true;
      callback();
    }
  };
  t = document.getElementsByTagName('script')[0];
  t.parentNode.insertBefore(s, t);
}

function loadXMLDoc(url, success, error) {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
      if (xmlhttp.status == 200) {
        success(xmlhttp.responseText)
      } else if (xmlhttp.status == 400) {
        error('There was an error 400');
      } else {
        error('something else other than 200 was returned');
      }
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function addCSSStyleTag(css) {
  head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

  style.type = 'text/css';
  style.title = 'remote';
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  head.appendChild(style);
  loadScript('https://bitlabnz.github.io/bitlab-runner/src/js/game.js?v=1', function () {
    loadScript('https://bitlabnz.github.io/bitlab-runner/src/js/main.js?v=1', function () {
      new Runner('.interstitial-wrapper');
      return false;
    });
  });


}

// Load external css in
// https://bitlabnz.github.io/bitlab-runner/src/css/styles.css
loadXMLDoc('https://bitlabnz.github.io/bitlab-runner/src/css/styles.css',
  function (payload) {
    addCSSStyleTag(payload);
  },
  function (err) {
    console.error(err);
  });

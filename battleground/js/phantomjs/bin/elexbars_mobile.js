var page = require('webpage').create();

page.open('http://striblab.github.io/2016election/elex_summary/elex-graphics-mobile.html', function() {
  // being the actual size of the headless browser
  page.viewportSize = { width: 350, height: 420 };

  var clipRect = page.evaluate(function(){
    return document.querySelector('#snapme').getBoundingClientRect();
  });

  page.clipRect = {
    top:    clipRect.top,
    left:   clipRect.left,
    width:  clipRect.width,
    height: clipRect.height
  };

window.setTimeout(function () {
  var testIt = page.evaluate(function(){
    return document.getElementById('done').innerHTML;
  });

  if (testIt == "DONE"){
  page.render('frontpage_bars_mobile.png');
  phantom.exit();
  }
}, 10000);

});
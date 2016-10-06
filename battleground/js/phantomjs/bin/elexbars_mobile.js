var page = require('webpage').create();

page.open('http://striblab.github.io/2016election/elex_summary/elex-graphics-mobile.html', function() {
  // being the actual size of the headless browser
  page.viewportSize = { width: 350, height: 420 };

  var clipRect = page.evaluate(function(){
    return document.querySelector('#snapshot').getBoundingClientRect();
  });

  page.clipRect = {
    top:    clipRect.top,
    left:   clipRect.left,
    width:  clipRect.width,
    height: clipRect.height
  };

window.setTimeout(function () {
  page.render('frontpage_bars_mobile.png');
  phantom.exit();
}, 6000);

});
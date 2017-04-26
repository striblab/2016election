var page = require('webpage').create();

page.open('https://striblab.github.io/2016election/2016elections/20161108-elex_summary/elex-graphics-returns-map.html/elex-graphics-banner.html', function() {
  // being the actual size of the headless browser
  page.viewportSize = { width: 1020, height: 90 };

  var clipRect = page.evaluate(function(){
    return document.querySelector('#snapshot').getBoundingClientRect();
  });

  page.clipRect = {
    top:    clipRect.top,
    left:   clipRect.left,
    width:  976,
    height: clipRect.height
  };

window.setTimeout(function () {
  var testIt = page.evaluate(function(){
    return document.getElementById('done').innerHTML;
  });

  if (testIt == "DONE"){
  page.render('frontpage_bars_desktop.png');
  phantom.exit();
  }
}, 10000);

});
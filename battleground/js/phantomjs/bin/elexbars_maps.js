var page = require('webpage').create();

page.open('http://striblab.github.io/2016election/elex_summary/elex-graphics-returns-map.html', function() {
  // being the actual size of the headless browser
  page.viewportSize = { width: 800, height: 500 };

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
  var testIt = page.evaluate(function(){
    return document.getElementById('done').innerHTML;
  });

  if (testIt == "DONE"){
  page.render('frontpage_bars_maps.png');
  phantom.exit();
  }
}, 10000);

});
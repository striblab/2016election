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
  page.render('file://Users/hargaja/Dropbox/jhargarten.github.io/STRIBLAB/_archive/2016election/battleground/js/phantomjs/bin/' + new Date().getTime() + '-frontpage_bars_mobile2.png');
  phantom.exit();
}, 10000);

});
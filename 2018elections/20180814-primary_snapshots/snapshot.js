var page = require('webpage').create();

page.open('http://static.startribune.com/news/elections/widgetDesktop.html', function() { //CHANGE THIS
  // being the actual size of the headless browser
  page.viewportSize = { width: 1020, height: 200 };

  var clipRect = page.evaluate(function(){
    return document.querySelector('.widget').getBoundingClientRect();
  });

  page.clipRect = {
    top:    clipRect.top,
    left:   clipRect.left,
    width:  clipRect.width, //CHANGE THIS
    height: clipRect.height
  };

window.setTimeout(function () {
  var testIt = page.evaluate(function(){
    return document.getElementById('done').innerHTML;
  });

  if (testIt == "DONE"){ 
  page.render('results.png');
  phantom.exit();
  }

}, 10000);

});
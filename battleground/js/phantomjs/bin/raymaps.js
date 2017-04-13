// phantomjs raymaps.js https://striblab.github.io/2016election/battleground/?race=mnhouse MNHOUSE > test.svg
// phantomjs raymaps.js https://striblab.github.io/2016election/battleground/?race=mnhouse MNHOUSEMETRO > test.svg
// phantomjs raymaps.js https://striblab.github.io/2016election/battleground/?race=mnsenate MNSENATE > test.svg
// phantomjs raymaps.js https://striblab.github.io/2016election/battleground/?race=mnsenate MNSENATEMETRO > test.svg
// phantomjs raymaps.js https://striblab.github.io/2016election/battleground/?race=house USHOUSE > test.svg
// phantomjs raymaps.js https://striblab.github.io/2016election/battleground/?race=house USHOUSEMN > test.svg
// phantomjs raymaps.js https://striblab.github.io/2016election/battleground/?race=president USSTATES > test.svg
// phantomjs raymaps.js https://striblab.github.io/2016election/battleground/?race=president USCOUNTIES > test.svg
// phantomjs raymaps.js https://striblab.github.io/2016election/elex_summary/elex-graphics-returns-map.html MNHOUSE > test.svg

var system = require('system');

if (system.args.length != 3) {
  console.log("Usage: svg_d3.js url dom_id. If no id, use 'no_id' for dom_id value");
  phantom.exit(1);
}

var address = system.args[1];
var elementID = system.args[2];
var page = require('webpage').create();
//page.settings.resourceTimeout = 3000;

page.viewportSize = {
  width: 1000,
  height: 800
};

function serialize(elementID) {
  var serializer = new XMLSerializer();
  if (elementID == 'no_id') {
    var element = document.getElementsByTagName('svg');
    element =  element[0];
  } else {
    var element = document.getElementById(elementID);
  }
  
  return serializer.serializeToString(element);
}

function extract(elementID) {
  return function (status) {
    if (status != 'success') {
      console.log("Failed to open the page.");
    } else {
   window.setTimeout(function () {
      var output = page.evaluate(serialize, elementID);

      var js = page.evaluate(function () {
        var stylesheets = document.getElementsByTagName('link');
        var xml_css_ref = [];

        for (var i = 0, len = stylesheets.length; i < len; i++) {
          xml_css_ref.push('<?xml-stylesheet type="text/css" href="' + stylesheets[i].href + '" ?>');
        }
        return xml_css_ref;
      });

      console.log(js.join('\n') + '\n' + output);
      phantom.exit();
    }, 30000);
    }
  };
}

page.open(address, extract(elementID));
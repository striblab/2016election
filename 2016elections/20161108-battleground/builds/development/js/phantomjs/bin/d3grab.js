var system = require('system');
 
if (system.args.length != 3) {
    console.log("Usage: extract.js  ");
    phantom.exit(1);
}
 
var address = system.args[1];
var elementID = system.args[2];
var page = require('webpage').create();
 
function serialize(elementID) {
    var serializer = new XMLSerializer();
    var element = document.getElementById(elementID);
    return serializer.serializeToString(element);
}
 
function extract(elementID) {
  return function(status) {
    if (status != 'success') {
      console.log("Failed to open the page.");
    } else {
      var output = page.evaluate(serialize, elementID);
      console.log(output);
    }
  phantom.exit();
  };
}
 
page.open(address, extract(elementID));
/**
 * Main JS file for project.
 */
// Define globals that are added through the js.globals in
// the config.json file, here like this:
// /* global _ */
// Utility functions, such as Pym integration, number formatting,
// and device checking
import utilsFn from './utils.js';
import Map from './map.js';
import * as d3 from 'd3';

const map = new Map("#mapper");

utilsFn({});

$("body").fadeIn();

$("a").on("click", function(){
  $("body").fadeOut();
});

$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results != null) {
        return results[1] || 0;
    } else {
        return null;
    }
}

var selected = $.urlParam('chart');

var scope = $.urlParam('scope');
var zoom = $.urlParam('zoom');
var race = String($.urlParam('race'));
var party = String($.urlParam('party')).toUpperCase();
var raceFull = "Congressional District " + race;

if (selected == "all") {
$("#dflGOVmn_map").load('./img/dflGOVmn.html');
$("#dflGOVmetro_map").load('./img/dflGOVmetro.html');

$("#gopGOVmn_map").load('./img/gopGOVmn.html');
$("#gopGOVmetro_map").load('./img/gopGOVmetro.html');

$("#dflAGmn_map").load('./img/dflAGmn.html');
$("#dflAGmetro_map").load('./img/dflAGmetro.html');

$("#dflCD5metro_map").load('./img/dflCD5metro.html');

$("#dflCD8mn_map").load('./img/dflCD8mn.html');
$("#dflCD8metro_map").load('./img/dflCD8metro.html');
}
else if (selected != null) {
    $(".slide").hide();
    $("#" + selected).show();
    $("." + selected).load('./img/' + selected + '.html');
}
else if (selected == null) {
    $("#mainmap").show();

if (race == "gov") {
    raceFull = "Gubernatorial";
} else if (race == "sen") {
    raceFull = "Senate Two Special";
} else if (race == "ag") {
    raceFull = "Attorney General";
}
var data;
function loadData(data){
    map.render(scope, zoom, party, "all", race, data);
}

$.ajax({
  url: './data/' + race + '.json',
  async: false,
  dataType: 'json',
  success: function (response) {
    data = response.results; 
    loadData(data);
  }
});


$("#districtSelect").html('<div id="focus" class="' + String(party).toLowerCase() + '">&nbsp;' + party + ' ' + raceFull + ' Primary</div>');

}
/**
 * Main JS file for project.
 */

// Define globals that are added through the js.globals in
// the config.json file, here like this:
// /* global _ */

// Utility functions, such as Pym integration, number formatting,
// and device checking

import utilsFn from './utils.js';
import * as c3 from 'c3';
import Map from './map.js';

const map = new Map("#mapper");

utilsFn({ });

$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results != null) {
        return results[1] || 0;
    } else {
        return null;
    }
}

var race = $.urlParam('race');
var party = $.urlParam('party');

// Import local ES6 modules like this:
//import utilsFn from './utils.js';

// Or import libraries installed with npm like this:
// import module from 'module';

// Utilize templates on the client.  Get the main content template.
//import Content from '../templates/_index-content.svelte.html';
//
// Get the data parts that are needed.  For larger data points,
// utilize window.fetch.  Add the build = true option in the buildData
// options.
//import content from '../content.json';
// OR: let content = await (await window.fetch('./assets/data/content.json')).json();
//
// const app = new Content({
//   target: document.querySelector('.main-app-container'),
//   data: {
//     content
//   }
// });

if (race == "gov") {
    if (party == "dfl") { 
    	map.render("all","mn","DFL","all","gov");
    	$("#districtSelect").html('<div id="focus" class="d4">&nbsp;DFL Gubernatorial Primary</div>');
    }
	else if (party == "gop") { 
		map.render("all","mn","GOP","all","gov");
		$("#districtSelect").html('<div id="focus" class="r4">&nbsp;GOP Gubernatorial Primary</div>');
	}
} else if (race == "ag") {
	if (party == "dfl") {
		map.render("all","mn","DFL","all","ag");
		$("#districtSelect").html('<div id="focus" class="d4">&nbsp;DFL Attorney General Primary</div>');
	}
	else if (party == "gop") {
		map.render("all","mn","GOP","all","ag");
		$("#districtSelect").html('<div id="focus" class="r4">&nbsp;GOP Attorney General Primary</div>');
	}
} else if (race == "sen") {
	if (party == "dfl") {
		map.render("all","mn","DFL","all","sen");
		$("#districtSelect").html('<div id="focus" class="d4">&nbsp;DFL Senate Special Primary</div>');
	}
	else if (party == "gop") {
		map.render("all","mn","GOP","all","sen");
		$("#districtSelect").html('<div id="focus" class="r4">&nbsp;GOP Senate Special Primary</div>');
	}
} else if (race == "cd1") {
	if (party == "dfl") {
		map.render("CD1","mn","DFL","all","1");
		$("#districtSelect").html('<div id="focus" class="d4">&nbsp;DFL District One Primary</div>');
	}
	else if (party == "gop") {
		map.render("CD1","mn","DFL","all","1");
		$("#districtSelect").html('<div id="focus" class="r4">&nbsp;GOP District One Primary</div>');
	}
} else if (race == "cd5") {
	$(".reset").addClass("hidden");
	if (party == "dfl") {
		map.render("CD5","metro","DFL","all","5");
		$("#districtSelect").html('<div id="focus" class="d4">&nbsp;DFL District Five Primary</div>');
	}
	else if (party == "gop") {
		map.render("CD5","metro","GOP","all","5");
		$("#districtSelect").html('<div id="focus" class="r4">&nbsp;GOP District Five Primary</div>');
	}
} else if (race == "cd8") {
	if (party == "dfl") {
		map.render("CD8","mn","DFL","all","8");
		$("#districtSelect").html('<div id="focus" class="d4">&nbsp;DFL District Eight Primary</div>');
	}
	else if (party == "gop") {
		map.render("CD8","mn","GOP","all","8");
		$("#districtSelect").html('<div id="focus" class="r4">&nbsp;GOP District Eight Primary</div>');
	}
} else {
	    map.render("all","mn","DFL","all","gov");
    	$("#districtSelect").html('<div id="focus" class="d4">&nbsp;DFL Gubernatorial Primary</div>');
}

// $("#districtSelect").click(function() { 
//   $("#districtList").toggle();
// });
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var thisView = "us";

//D3 CLICKY MAP BINDINGS
jQuery.fn.d3Click = function () {
  this.each(function (i, e) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    e.dispatchEvent(evt);
    return false;
  });
};

jQuery.fn.d3Down = function () {
  this.each(function (i, e) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    e.dispatchEvent(evt);
    return false;
  });
};

jQuery.fn.d3Up = function () {
  this.each(function (i, e) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    e.dispatchEvent(evt);
    return false;
  });
};

//WE HAVE A BINARY POLITICAL PARTY SYSTEM UNTIL YOU HAVE TO CRUNCH NUMBERS ON ELECTION NIGHT
function fetchData(district,state,type,dataCompare,race,ev,label,evcd){

//initialize top level variables 
var stateName = '';
var statePostal = '';
var precinctsReporting = 0;
var precinctsTotal = 0;
var precinctsReportingPct = 0;
var lastUpdated = 0;

var fipsCode = '';
var seatName = '';
var seatNum = '';

var voteCountT = 0;

//initialize candidate arrays
var first = [];
var last = [];
var party = [];
var incumbent = [];
var voteCount = [];
var winner = [];

//initialize sorting array
var sortAll = [];

//run through data and assign variables to candidate arrays
  for (var i=0; i < dataCompare.races.length; i++) {
   if (race == "ushouse" || race == "mnhouse" || race == "mnsenate"){
    if (district == "District 0"){
      if (dataCompare.races[i].seatName == "District 1") {
     for (var j=0; j < dataCompare.races[i].reportingUnits.length; j++) {
         if (dataCompare.races[i].reportingUnits[j].stateName == state){
              stateName = dataCompare.races[i].reportingUnits[j].stateName;
              statePostal = dataCompare.races[i].reportingUnits[j].statePostal;
              precinctsReporting = dataCompare.races[i].reportingUnits[j].precinctsReporting;
              precinctsTotal = dataCompare.races[i].reportingUnits[j].precinctsTotal;
              precinctsReportingPct = dataCompare.races[i].reportingUnits[j].precinctsReportingPct;
              lastUpdated = dataCompare.races[i].reportingUnits[j].lastUpdated;

           for (var k=0; k < dataCompare.races[i].reportingUnits[j].candidates.length; k++) {
              first[k] = dataCompare.races[i].reportingUnits[j].candidates[k].first;
              last[k] = dataCompare.races[i].reportingUnits[j].candidates[k].last;
              party[k] = dataCompare.races[i].reportingUnits[j].candidates[k].party;
              incumbent[k] = dataCompare.races[i].reportingUnits[j].candidates[k].incumbent;
              voteCount[k] = dataCompare.races[i].reportingUnits[j].candidates[k].voteCount;
              winner[k] = dataCompare.races[i].reportingUnits[j].candidates[k].winner; 
           } //end k loop
         } //end if
     } //end j loop
    } //end if
}
     else {
        if (dataCompare.races[i].seatName == district) {
     for (var j=0; j < dataCompare.races[i].reportingUnits.length; j++) {
         if (dataCompare.races[i].reportingUnits[j].stateName == state){
              stateName = dataCompare.races[i].reportingUnits[j].stateName;
              statePostal = dataCompare.races[i].reportingUnits[j].statePostal;
              precinctsReporting = dataCompare.races[i].reportingUnits[j].precinctsReporting;
              precinctsTotal = dataCompare.races[i].reportingUnits[j].precinctsTotal;
              precinctsReportingPct = dataCompare.races[i].reportingUnits[j].precinctsReportingPct;
              lastUpdated = dataCompare.races[i].reportingUnits[j].lastUpdated;

           for (var k=0; k < dataCompare.races[i].reportingUnits[j].candidates.length; k++) {
              first[k] = dataCompare.races[i].reportingUnits[j].candidates[k].first;
              last[k] = dataCompare.races[i].reportingUnits[j].candidates[k].last;
              party[k] = dataCompare.races[i].reportingUnits[j].candidates[k].party;
              incumbent[k] = dataCompare.races[i].reportingUnits[j].candidates[k].incumbent;
              voteCount[k] = dataCompare.races[i].reportingUnits[j].candidates[k].voteCount;
              winner[k] = dataCompare.races[i].reportingUnits[j].candidates[k].winner;
           } //end k loop
         } //end if
     } //end j loop
    } //end if
     }
   } else {
     for (var j=0; j < dataCompare.races[i].reportingUnits.length; j++) {
       if (state != null && evcd != null) {
         if (dataCompare.races[i].reportingUnits[j].statePostal == state && dataCompare.races[i].reportingUnits[j].reportingunitName == evcd){
              stateName = dataCompare.races[i].reportingUnits[j].stateName;
              statePostal = dataCompare.races[i].reportingUnits[j].statePostal;
              precinctsReporting = dataCompare.races[i].reportingUnits[j].precinctsReporting;
              precinctsTotal = dataCompare.races[i].reportingUnits[j].precinctsTotal;
              precinctsReportingPct = dataCompare.races[i].reportingUnits[j].precinctsReportingPct;
              lastUpdated = dataCompare.races[i].reportingUnits[j].lastUpdated;

           for (var k=0; k < dataCompare.races[i].reportingUnits[j].candidates.length; k++) { 
              first[k] = dataCompare.races[i].reportingUnits[j].candidates[k].first;
              last[k] = dataCompare.races[i].reportingUnits[j].candidates[k].last;
              party[k] = dataCompare.races[i].reportingUnits[j].candidates[k].party;
              incumbent[k] = dataCompare.races[i].reportingUnits[j].candidates[k].incumbent;
              voteCount[k] = dataCompare.races[i].reportingUnits[j].candidates[k].voteCount;
              winner[k] = dataCompare.races[i].reportingUnits[j].candidates[k].winner;
           } //end k loop
         }
      } else if (state != null){
         if (dataCompare.races[i].reportingUnits[j].stateName == state){
              stateName = dataCompare.races[i].reportingUnits[j].stateName;
              statePostal = dataCompare.races[i].reportingUnits[j].statePostal;
              precinctsReporting = dataCompare.races[i].reportingUnits[j].precinctsReporting;
              precinctsTotal = dataCompare.races[i].reportingUnits[j].precinctsTotal;
              precinctsReportingPct = dataCompare.races[i].reportingUnits[j].precinctsReportingPct;
              lastUpdated = dataCompare.races[i].reportingUnits[j].lastUpdated;

           for (var k=0; k < dataCompare.races[i].reportingUnits[j].candidates.length; k++) { 
              first[k] = dataCompare.races[i].reportingUnits[j].candidates[k].first;
              last[k] = dataCompare.races[i].reportingUnits[j].candidates[k].last;
              party[k] = dataCompare.races[i].reportingUnits[j].candidates[k].party;
              incumbent[k] = dataCompare.races[i].reportingUnits[j].candidates[k].incumbent;
              voteCount[k] = dataCompare.races[i].reportingUnits[j].candidates[k].voteCount;
              winner[k] = dataCompare.races[i].reportingUnits[j].candidates[k].winner;
           } //end k loop
         }
      } else if (district != null) {
         if (dataCompare.races[i].reportingUnits[j].fipsCode == district){
              stateName = dataCompare.races[i].reportingUnits[j].stateName;
              statePostal = dataCompare.races[i].reportingUnits[j].statePostal;
              precinctsReporting = dataCompare.races[i].reportingUnits[j].precinctsReporting;
              precinctsTotal = dataCompare.races[i].reportingUnits[j].precinctsTotal;
              precinctsReportingPct = dataCompare.races[i].reportingUnits[j].precinctsReportingPct;
              lastUpdated = dataCompare.races[i].reportingUnits[j].lastUpdated;

           for (var k=0; k < dataCompare.races[i].reportingUnits[j].candidates.length; k++) { 
              first[k] = dataCompare.races[i].reportingUnits[j].candidates[k].first;
              last[k] = dataCompare.races[i].reportingUnits[j].candidates[k].last;
              party[k] = dataCompare.races[i].reportingUnits[j].candidates[k].party;
              incumbent[k] = dataCompare.races[i].reportingUnits[j].candidates[k].incumbent;
              voteCount[k] = dataCompare.races[i].reportingUnits[j].candidates[k].voteCount;
              winner[k] = dataCompare.races[i].reportingUnits[j].candidates[k].winner;
           } //end k loop
         }
      } 
     } //end j loop
   }
} //end i loop

//sort arrays by vountCount
for (var i = 0; i < voteCount.length; i++) {
    sortAll.push({ 'first': first[i], 'last': last[i], 'party': party[i], 'incumbent': incumbent[i], 'voteCount': voteCount[i], 'winner': winner[i] });
}

sortAll.sort(function(a, b) {
  return b.voteCount - a.voteCount;
});

first = [];
last = [];
party = [];
incumbent = [];
voteCount = [];
winner = [];

for (var i = 0; i < sortAll.length; i++) {
   first.push(sortAll[i].first);
   last.push(sortAll[i].last);
   party.push(sortAll[i].party);
   incumbent.push(sortAll[i].incumbent);
   voteCount.push(sortAll[i].voteCount);
   winner.push(sortAll[i].winner);
} 


//initialize and calculate some miscellaneous variables for printing results
for (var i=0; i < voteCount.length; i++){
  voteCountT += voteCount[i];
}

var topPCT = voteCount[0] / voteCountT;

var evString = "";
if (ev != null) { evString = "<span class='ev'> - " + ev + " electoral votes</span>"; }

var stateString = state;
if (label != null) { stateString = label + ", " + statePostal; } else { stateString = state; }

var iMark = [];
for (var i = 0; i < incumbent.length; i++) {
if (incumbent[i] == true) { iMark[i] = "*"; }
else { iMark[i] = ""; }
}

var wMark = [];
for (var i = 0; i < last.length; i++) {
if (winner[i] == "X") { wMark[i] = "&#x2714;"; }
else if (winner[i] == "R") { wMark[i] = "-R"; }
else { wMark[i] = ""; }
}

var colors = [];
for (var i=0; i < last.length; i++){
  var thisPCT = voteCount[i] / voteCountT;
    if (party[i] == "GOP"){
      if (thisPCT >= .80) { colors[i] = "#d34A44"; } 
      else if (thisPCT >= .70) { colors[i] = "#d34A44"; } 
      else if (thisPCT >= .50) { colors[i] = "#f7816E"; } 
      else if (thisPCT > 0) { colors[i] = "#f7816E"; } 
      else { colors[i] = "#bbbbbb"; }
    }
    else if (party[i] == "Dem") { 
      if (thisPCT >= .80) { colors[i] = "#3585BC"; } 
      else if (thisPCT >= .70) { colors[i] = "#3585BC"; } 
      else if (thisPCT >= .50) { colors[i] = "#72A9D6"; } 
      else if (thisPCT > 0) { colors[i] = "#72A9D6"; } 
      else { colors[i] = "#bbbbbb"; }
    }
    else if (thisPCT > 0) { colors[i] = "#7CB342"; }
    else { colors[i] = "#bbbbbb"; }
}


//return precincts
if (type == "pct"){ return precinctsReportingPct; }

//return timestamp
if (type == "timestamp"){ var dateString = new Date(lastUpdated); return dateString; }

//return all votes
if (type == "votesT"){ return voteCountT; }

//return dem votes
if (type == "votesD"){
    for (var i = 0; i < last.length; i++) {
    if (party[i] == "Dem") { return voteCount[i]; }
    }
}

//return gop votes
if (type == "votesR"){
    for (var i = 0; i < last.length; i++) {
    if (party[i] == "GOP") { return voteCount[i]; }
    }
}

//return winner
if (type == "winner"){
  for (var i = 0; i < last.length; i++) {
    if (winner[i] == "X"){
      if (party[i] == "GOP"){ return "GOP Win"; }
      else if (party[i] == "Dem"){ return "DEM Win"; }
      else { return "IND Win"; }
    }
  }
}

//return lean
if (type == "lean"){
    if (winner[0] == "X" && party[0] == "GOP"){ return "#d34A44"; }
    else if (winner[0] == "X" && party[0] == "Dem"){ return "#3585BC"; }
    else if (winner[0] == "X") { return "#7CB342"; }
    else if (party[0] == "GOP" && voteCount[0] != 0) { return "#f7816E"; }
    else if (party[0] == "Dem" && voteCount[0] != 0) { return "#72A9D6"; }
    else if (voteCount[0] == 0) { return "#bbbbbb"; } 
    else { return "#bbbbbb"; } 
}

//return color
if (type == "colors"){ return colors[0]; }

//return tooltips
if (type == "tooltip"){
  var tooltipString = "<div class='districtName'>" + stateString + "</div>";
  if (last.length < 2) { var howMany = last.length; }
  else { var howMany = 2; }

  for (var i = 0; i < howMany; i++) {
    var thisPCT = "0%";
    if (voteCountT > 0) { thisPCT = d3.format("%")(voteCount[i] / voteCountT); }
    tooltipString += "<div class='candidate'>" + iMark[i] + last[i] + " " + wMark[i] + "</div><div class='pct' style='background-color:" + colors[i] + "'>" + thisPCT + "</div><div class='smallbreak'>"
  }

  return tooltipString;
}

//return tables
if (type == "table"){
  var stateColor = "";
  if (last.length < 3) { var howMany = last.length; }
  else { var howMany = 3; }

  var tableString = "<div class='districtName'>" + stateString + " " + evString + "</div><div class='resultsRow'><div class='resultsHead'>Candidate</div><div class='counts resultsHead'>#</div><div class='pct resultsHead'>%</div></div>";

  for (var i = 0; i < howMany; i++) {
    var thisPCT = "0%";
    if (voteCountT > 0) { thisPCT = d3.format(".1%")(voteCount[i] / voteCountT); }

    stateColor = ""

    if (winner[i] == "X" && party[i] == "GOP") { stateColor = "republican"; }
    else if (winner[i] == "X" && party[i] == "Dem") { stateColor = "democrat"; }
    else if (winner[i] == "X") { stateColor = "green4";  }

    if (race == "president" && evcd != null){ stateColor = colors[i]; wMark[i] = ""; }
      
    tableString += "<div class='resultsRow'><div class='candidate'>" + iMark[i] + first[i] + " " + last[i] + " (" + party[i] + ")" + " " + wMark[i] + "</div><div class='counts'>" + d3.format(",")(voteCount[i]) + "</div><div class='pct " + stateColor + "' style='background-color:" + colors[i] + ";'>" + thisPCT + "</div></div>"
  }

  return tableString + "<div class='reportingRow'><span class='pctReported'>" + precinctsReporting + "</span> / <span class='pctAll'>" + precinctsTotal + "</span> (" + precinctsReportingPct + "%) precincts reporting</div>";
}

//return boards
if (type == "board"){
var pct1 = "0%";
var pct2 = "0%";
var color1 = "";
var color2 = "";
var candidate1 = first[0] + " " + last[0];
var candidate2 = first[1] + " " + last[1];
var stateColor1 = "";
var stateColor2 = "";
var dTest = false;
var isWin = false;

  for (var i = 0; i < 2; i++) {
    if (party[i] == "Dem" && pct1 == "0%"){
        pct1 = d3.format("%")(voteCount[i] / voteCountT); 
        color1 = colors[i];
        if (winner[i] == "X") { stateColor1 = "democrat"; isWin = true; }
    }
    else if (party[i] == "Dem" && pct1 != "0%"){
        pct2 = d3.format("%")(voteCount[i] / voteCountT); 
        color2 = colors[i];
        if (winner[i] == "X") { stateColor2 = "democrat"; isWin = true; }
    }
    else if (party[i] == "GOP" && pct2 == "0%"){
        pct2 = d3.format("%")(voteCount[i] / voteCountT); 
        color2 = colors[i];
        if (winner[i] == "X") { stateColor2 = "republican"; isWin = true; }
    }
    else if (party[i] == "GOP" && pct2 != "0%"){
        pct1 = d3.format("%")(voteCount[i] / voteCountT); 
        color1 = colors[i];
        if (winner[i] == "X") { stateColor1 = "republican"; isWin = true; }
    }
  }

  if (race == "president" && evcd != null){
    if (isWin == true){
      if (party[0] == "Dem") {
        stateColor1 = "democrat";
        stateColor2 = "";
      } else  {
        stateColor1 = "";
        stateColor2 = "republican";
      }  
    }
  }

    if (voteCountT == 0) { pct1 = "0%"; pct2 = "0%"; }

    if (race == "president" && evcd != null){
    return "<div id='evcd" + label + "' class='tableRow evcd' name='" + label + "'><div class='stateBlockR'>" + label + "</div><div class='pctBox'>" + ev + "</div><div class='pctBox " + stateColor1 + "' style='border:2px solid " + color1 + ";'>" + pct1 + "</div><div class='pctBox " + stateColor2 + "' style='border:2px solid " + color2 + ";'>" + pct2 + "</div><div class='pctBox reporting'>" + precinctsReportingPct + "%</div><div class='searchTerms'>" + stateName + " " + candidate1 + " " + candidate2 +  "</div></div>";
    }

    if (race == "president"){
    return "<div class='tableRow' name='" + statePostal + "'><div class='stateBlockR'>" + statePostal + "</div><div class='pctBox'>" + ev + "</div><div class='pctBox " + stateColor1 + "' style='border:2px solid " + color1 + ";'>" + pct1 + "</div><div class='pctBox " + stateColor2 + "' style='border:2px solid " + color2 + ";'>" + pct2 + "</div><div class='pctBox reporting'>" + precinctsReportingPct + "%</div><div class='searchTerms'>" + stateName + " " + candidate1 + " " + candidate2 +  "</div></div>";
    }

    if (race == "senate" || race == "governors"){
    return "<div class='tableRow' name='" + statePostal + "'><div class='stateBlockR'>" + statePostal + "</div><div class='pctBox " + stateColor1 + "' style='border:2px solid " + color1 + ";'>" + pct1 + "</div><div class='pctBox " + stateColor2 + "' style='border:2px solid " + color2 + ";'>" + pct2 + "</div><div class='pctBox reporting'>" + precinctsReportingPct + "%</div><div class='searchTerms'>" + stateName + " " + candidate1 + " " + candidate2 +  "</div></div>";
    }

    if (race == "mnhouse" || race == "mnsenate"){
    return "<div class='tableRow' name='" + label + "'><div class='stateBlockR'>" + label + "</div><div class='pctBox " + stateColor1 + "' style='border:2px solid " + color1 + ";'>" + pct1 + "</div><div class='pctBox " + stateColor2 + "' style='border:2px solid " + color2 + ";'>" + pct2 + "</div><div class='pctBox reporting'>" + precinctsReportingPct + "%</div><div class='searchTerms'>" + stateName + " " + candidate1 + " " + candidate2 +  "</div></div>";
    }

    if (race == "ushouse"){
    return "<div class='tableRow' name='Minnesota" + label + "'><div class='stateBlockR'>MN" + label + "</div><div class='pctBox " + stateColor1 + "' style='border:2px solid " + color1 + ";'>" + pct1 + "</div><div class='pctBox " + stateColor2 + "' style='border:2px solid " + color2 + ";'>" + pct2 + "</div><div class='pctBox reporting'>" + precinctsReportingPct + "%</div><div class='searchTerms'>" + stateName + " " + candidate1 + " " + candidate2 +  "</div></div>";
    }
  }

} //end fetchData

//UPDATE INFOBOXES
function spillInfo(data){
 $("#infobox").html(data);
} //end spillInfo

//CARTOGRAM DATA UPDATE
function electoralCarto(data){
    $('.cartoState').each(function(i, obj) {
        var color = fetchData($(this).attr("name"),$(this).attr("name"),"lean",data,"president");
        $(this).attr("fill", color);
    });
} //end electoralCarto

//US HOUSE CARTOGRAM
function houseCarto(data){
(function(){
    var margin = {top: 3, left: 10, bottom: 40, right: 10}
    , width = 800
    // , width = width - margin.left - margin.right
    , mapRatio = .5
    , height = 600;

    var projection = d3.geo.equirectangular()
              .scale(width/1.1)//this makes it larger or smaller for the space you have
              .translate([width / 4, height / 2.5])
              .center([-102, 40 ]); //move the map center to fit in the spsace

    var path = d3.geo.path()
          .projection(projection);

    var svg = d3.select("#cartoHouse svg")
          .attr("width", width)
          .attr("height", height);

    var g = svg.append("g").attr('transform',"translate(150,25)").attr('class','house-group-g');

    makeCartogram();

function makeCartogram() {
        d3.json("shapefiles/usdistricts_cartogram.json", function(error, us) {

            g.append("g").attr("id", "districts").selectAll("path")
            .data(topojson.feature(us, us.objects['uscd']).features)
            .enter().append("path")
                .attr("d", path)
                .attr("class","cd")
                .attr("fill", function(d){
                    var color = fetchData("District " + d.properties['d'],d.properties.State,"lean",data,"ushouse",null,"District " + d.properties['d']);
                    return color;
                })
                .attr('id',function(d){ return d.properties.State + '' + d.properties['d'] + "c"; })
                .attr('data-hash-key',function(d){ return d.properties.State + '-' + d.properties['d']; })
                .on("mousedown", function(d, i){
                    d3.selectAll(".cd").classed("active",false);
                    d3.select(this).classed("active",true);
                    $(".tableRow").removeClass("selectedBox");
                    if (d.properties.State == "Minnesota") { $(".tableRow[name=" + d.properties.State + "" + d.properties['d'] + "]").addClass("selectedBox"); }
                    if (d.properties['d'] == 0) { var thisDistrict = "1"; }
                    else { var thisDistrict = d.properties['d']; }
                    
                      spillInfo(fetchData("District " + d.properties['d'],d.properties.State,"table",data,"ushouse",null,"District " + thisDistrict));
                })
                .call(d3.helper.tooltip(function(d, i){
                    if ($(window).width() > 500) { 
                    return fetchData("District " + d.properties['d'],d.properties.State,"tooltip",data,"ushouse",null,"District " + d.properties['d']);
                } else { $(".tooltip").hide(); }}));
        })
    }
})();

d3.helper = {};

d3.helper.tooltip = function(accessor){
    return function(selection){
        var tooltipDiv;
        var bodyNode = d3.select('body').node();
        selection.on("mouseover", function(d, i){
            // Clean up lost tooltips
            d3.select('body').selectAll('div.tooltip').remove();
            // Append tooltip
            tooltipDiv = d3.select('body').append('div').attr('class', 'tooltip');
            var absoluteMousePos = d3.mouse(bodyNode);
            tooltipDiv.style('left', (absoluteMousePos[0] - 160)+'px')
                .style('top', (absoluteMousePos[1] - 15)+'px')
                .style('position', 'absolute')
                .style('z-index', 1001);
            // Add text using the accessor function
            var tooltipText = accessor(d, i) || '';
            // Crop text arbitrarily
            //tooltipDiv.style('width', function(d, i){return (tooltipText.length > 80) ? '300px' : null;})
            //    .html(tooltipText);
        })
        .on('mousemove', function(d, i) {
            // Move tooltip
            var absoluteMousePos = d3.mouse(bodyNode);
            tooltipDiv.style('left', (absoluteMousePos[0] - 160)+'px')
                .style('top', (absoluteMousePos[1] - 15)+'px');
            var tooltipText = accessor(d, i) || '';
            tooltipDiv.html(tooltipText);
        })
        .on("mouseout", function(d, i){
            // Remove tooltip
            tooltipDiv.remove();
        });

    };
};

var aspect = 800 / 600, chart = $("#cartoHouse svg"); //, chart2 = $(".carto svg")
  var targetWidth = chart.parent().width();
  chart.attr("width", targetWidth);
  chart.attr("height", targetWidth / aspect);
  if ($(window).width() <= 420) { $("#cartogram svg").attr("viewBox","0 0 500 400"); }

$(window).on("resize", function() {
  if ($(window).width() >= 970) { $("#mobmenu").hide(); }
  chart.attr("style","");
  $("#cartogram svg").attr("style","");
  var targetWidth = chart.parent().width();
  chart.attr("width", targetWidth);
  chart.attr("height", targetWidth / aspect);
});

} //end houseCarto

//ALL OTHER MAPS
function mapBuild(container, boxContainer, chartContainer, shape, race, geo, level, dataCompare, index, visible) {

if (geo=="us") { var width = 800, height = 600, centered; var projection = d3.geo.albersUsa().scale(1000).translate([400, 210]); }
else if (geo=="mn") { var width = 400, height = 400, centered; var projection = d3.geo.mercator().scale([3200]).center([-89.736328,46.377254]); }
else if (geo=="metro") { var width = 400, height = 400, centered; var projection = d3.geo.mercator().scale([16500]).center([-92.403259,44.988113]); }

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select(container + " svg")
    .attr("width", width)
    .attr("height", height);

var g = svg.append("g").attr("class", "mappage states " + race + " " + level);

d3.json("shapefiles/" + shape, function(error, us) {

  g.selectAll("path")
      .data(us.features)
    .enter().append("path")
      .attr("d", path)
      .on("click", clicked)
      .attr("precinctName", function(d){ return d.properties.NAME })
      .style("fill", function(d){
         if (race == "president") { 
        $('#president .sideStates .block').each(function(i, obj) {
            if ($(this).hasClass(d.properties.STUSPS)){
            var color = fetchData(d.properties.NAME,d.properties.NAME,"lean",dataCompare,race);
            $(this).css("background-color", color);
            }
        });
            return fetchData(d.properties.NAME,d.properties.NAME,"lean",dataCompare,race); 
         }
         if (race == "senate") { 
        $('#senate .sideStates .block').each(function(i, obj) {
            if ($(this).hasClass(d.properties.STUSPS)){
            var color = fetchData(d.properties.NAME,d.properties.NAME,"lean",dataCompare,race);
            $(this).css("background-color", color);
            }
        });
            return fetchData(d.properties.NAME,d.properties.NAME,"lean",dataCompare,race); 
         }
         if (race == "governors") { 
        $('#governors .sideStates .block').each(function(i, obj) {
            if ($(this).hasClass(d.properties.STUSPS)){
            var color = fetchData(d.properties.NAME,d.properties.NAME,"lean",dataCompare,race);
            $(this).css("background-color", color);
            }
        });
            return fetchData(d.properties.NAME,d.properties.NAME,"lean",dataCompare,race); 
         }
         else if (race == "county") { return fetchData(d.properties.GEOID,null,"colors",dataCompare,race); }
         // else if (race == "pct") { return mapColor(d.properties.PCTCODE, race, dataCompare); }
         else if (race == "house") { return fetchData("District " + d.properties.DISTRICT,d.properties.STATENAME,"lean",dataCompare,"ushouse",null,"District " + d.properties.DISTRICT); $(".tableRow").removeClass("selectedBox"); if (d.properties.STATENAME == "Minnesota") { $(".tableRow[name=" + d.properties.STATENAME + "" + d.properties.DISTRICT + "]").addClass("selectedBox"); } }
         else if (race == "mnsenate" || race == "mnhouse") { return fetchData("District " + d.properties.DISTRICT,"Minnesota","lean",dataCompare,race,null,"District " + d.properties.DISTRICT); }
        })
       .on("mousedown", function(d, i){

        var str = d.properties.NAME; 
        $(".district").removeClass("selected");
        $(".tableRow").removeClass("selectedBox");
        $(".tableRow[name=" + d.properties.STUSPS + "]").addClass("selectedBox");
        $(".tableRow[name=" + d.properties.DISTRICT + "]").addClass("selectedBox");
        if (race == "president" || race == "senate" ||  race == "governors"){ 
            spillInfo(fetchData(d.properties.NAME,d.properties.NAME,"table",dataCompare,race)); $(".block").removeClass("blockSelect"); $("." + d.properties.STUSPS).addClass("blockSelect"); }
        else if (race == "county"){ spillInfo(fetchData(d.properties.GEOID,null,"table",dataCompare,race,null,d.properties.NAME)); }
        else if (race == "house"){ 
          if (d.properties.DISTRICT == 0) { var thisDistrict = "1"; }
          else { var thisDistrict = d.properties.DISTRICT; }

          spillInfo(fetchData("District " + d.properties.DISTRICT,d.properties.STATENAME,"table",dataCompare,"ushouse",null,"District " + thisDistrict)); 
          if (d.properties.STATENAME == "Minnesota") { $(".tableRow[name=" + d.properties.STATENAME + "" + d.properties.DISTRICT + "]").addClass("selectedBox"); } 
        } 
        else if (race == "mnsenate" || race == "mnhouse") { 
          if (d.properties.DISTRICT == "32B") { return spillInfo("<div class='districtName'>District 32B, MN</div><div>No race. A special election has been called for Feb. 14, 2017.</div>"); }
          else { spillInfo(fetchData("District " + d.properties.DISTRICT,"Minnesota","table",dataCompare,race,null,"District " + d.properties.DISTRICT)); } 
        }

       })
      .style("stroke-width", "0.3px")
      .style("stroke", "#fff")
      .attr("id",function(d){ 
        if (race == "president"){ return d.properties.STUSPS; }
        else if (race == "senate"){ return d.properties.STUSPS + "s"; }
        else if (race == "governors"){ return d.properties.STUSPS + "g"; }
        else if (race == "mnsenate"){ return "mns" + d.properties.DISTRICT; }
        else if (race == "mnhouse"){ return "mnh" + d.properties.DISTRICT; }
        else if (race == "house"){ return d.properties.STATENAME + "" + d.properties.DISTRICT; }
        else { return null; }
      })
      .attr("class",function(d){
          if (race == "president"){ return "district " + d.properties.STUSPS; }
          if (race == "senate"){ 
            if (d.properties.NAME == "Montana" || d.properties.NAME == "Wyoming" || d.properties.NAME == "Nebraska" || d.properties.NAME == "Minnesota" || d.properties.NAME == "New Mexico" || d.properties.NAME == "Texas" || d.properties.NAME == "Mississippi" || d.properties.NAME == "Tennessee" || d.properties.NAME == "West Virginia" || d.properties.NAME == "Virginia" || d.properties.NAME == "New Jersey" || d.properties.NAME == "Delaware" || d.properties.NAME == "Rhode Island" || d.properties.NAME == "Massachusetts" || d.properties.NAME == "Maine" || d.properties.NAME == "Michigan"){
                return "noclicky  district " + d.properties.STUSPS;
            }
          }
          if (race == "governors"){ 
            if (d.properties.NAME != "Washington" && d.properties.NAME != "Oregon" && d.properties.NAME != "Montana" && d.properties.NAME != "Utah" && d.properties.NAME != "Missouri" && d.properties.NAME != "Montana" && d.properties.NAME != "Montana" && d.properties.NAME != "Montana" && d.properties.NAME != "West Virginia" && d.properties.NAME != "North Carolina" && d.properties.NAME != "Delaware" && d.properties.NAME != "New Hampshire" && d.properties.NAME != "Vermont" && d.properties.NAME != "Indiana" && d.properties.NAME != "North Dakota"){
                return "noclicky district " + d.properties.STUSPS;
            }
          }
          if (race == "county"){ 
            if (d.properties.STATEFP == 46){ if (d.properties.NAME == "Shannon") { return "noclicky district"; } }
            if (d.properties.STATEFP == 27){
              if (d.properties.NAME == "Hennepin" || d.properties.NAME == "Ramsey" || d.properties.NAME == "Washington" || d.properties.NAME == "Carver" || d.properties.NAME == "Scott" || d.properties.NAME == "Dakota" || d.properties.NAME == "Anoka") { return "mn metro"; }
              else { return "mn"; }  
            } else if (d.properties.STATEFP == 2){
              return "noclicky district";
            }
            else { return "areas district"; }
          }
          if (race == "house"){ 
            if (d.properties.STATENAME == "Minnesota"){ return "mn"; }
            else { return "areas district"; }
          }
      })
      .call(d3.helper.tooltip(function(d, i){
        if ($(window).width() > 500) { 
         if (race == "president" || race == "senate" || race == "governors") { return fetchData(d.properties.NAME,d.properties.NAME,"tooltip",dataCompare,race); }
         else if (race == "county") { return fetchData(d.properties.GEOID,null,"tooltip",dataCompare,race,null,d.properties.NAME); }
         // else if (race == "pct") { return mapTips(d, race, dataCompare, level); }
         else if (race == "house") { 
          if (d.properties.DISTRICT == 0) { var thisDistrict = "1"; }
          else { var thisDistrict = d.properties.DISTRICT; }
          return fetchData("District " + d.properties.DISTRICT,d.properties.STATENAME,"tooltip",dataCompare,"ushouse",null,"District " + thisDistrict); 
        }
         else if (race == "mnsenate" || race == "mnhouse") { 
          if (d.properties.DISTRICT == "32B") { return "<div class='districtName'>District 32B, MN</div><div>No race</div>"; }
          else { return fetchData("District " + d.properties.DISTRICT,"Minnesota","tooltip",dataCompare,race,null,"District " + d.properties.DISTRICT); }
        }
      } else { $(".tooltip").hide(); }}))

if (race == "president" || race == "senate" ||  race == "governors"){
    g.selectAll("text")
    .data(us.features)
    .enter()
    .append("text")
    .attr("fill", "white")
    .style("font-weight",900)
    .attr("class","passthrough")
    .attr("transform", function(d) { 
        var centroid = path.centroid(d);
        var x = centroid[0];
        var y = centroid[1];

        if (d.properties.STUSPS == "FL") { x = x + 11; }
        if (d.properties.STUSPS == "MI") { x = x + 9; y = y + 18; }
        if (d.properties.STUSPS == "AK") { y = y - 4; }
        if (d.properties.STUSPS == "LA") { x = x - 8; y = y - 4; }
        return "translate(" + x + "," + y + ")";
    })
    .attr("text-anchor", "middle")
    .attr("dy", ".35em")
    .text(function(d) {
        if (race == "president") { 
            if (d.properties.STUSPS != "MA" && d.properties.STUSPS != "RI" && d.properties.STUSPS != "CT" && d.properties.STUSPS != "DE" && d.properties.STUSPS != "DC" && d.properties.STUSPS != "MD" && d.properties.STUSPS != "NH" && d.properties.STUSPS != "VT" && d.properties.STUSPS != "NJ") { return d.properties.STUSPS; }
        }
        if (race == "senate") { 
            if (d.properties.STUSPS != "MA" && d.properties.STUSPS != "RI" && d.properties.STUSPS != "CT" && d.properties.STUSPS != "DE" && d.properties.STUSPS != "DC" && d.properties.STUSPS != "MD" && d.properties.STUSPS != "NH" && d.properties.STUSPS != "VT" && d.properties.STUSPS != "NJ" && d.properties.STUSPS != "MT" && d.properties.STUSPS != "WY" && d.properties.STUSPS != "NE" && d.properties.STUSPS != "NM" && d.properties.STUSPS != "TX" && d.properties.STUSPS != "MN" && d.properties.STUSPS != "MI" && d.properties.STUSPS != "MS" && d.properties.STUSPS != "TN" && d.properties.STUSPS != "WV" && d.properties.STUSPS != "VA" && d.properties.STUSPS != "ME") { return d.properties.STUSPS; }
        }
        if (race == "governors") { 
            if (d.properties.STUSPS != "OH" && d.properties.STUSPS != "MI" && d.properties.STUSPS != "AZ" && d.properties.STUSPS != "ME" && d.properties.STUSPS != "NY" && d.properties.STUSPS != "PA" && d.properties.STUSPS != "VA" && d.properties.STUSPS != "FL" && d.properties.STUSPS != "SC" && d.properties.STUSPS != "GA" && d.properties.STUSPS != "MS" && d.properties.STUSPS != "AL" && d.properties.STUSPS != "KY" && d.properties.STUSPS != "TN" && d.properties.STUSPS != "WI" && d.properties.STUSPS != "IL" && d.properties.STUSPS != "AR" && d.properties.STUSPS != "LA" && d.properties.STUSPS != "MN" && d.properties.STUSPS != "IA" && d.properties.STUSPS != "TX" && d.properties.STUSPS != "KS" && d.properties.STUSPS != "OK" && d.properties.STUSPS != "SD" && d.properties.STUSPS != "NE" && d.properties.STUSPS != "NM" && d.properties.STUSPS != "CO" && d.properties.STUSPS != "ID" && d.properties.STUSPS != "WY" && d.properties.STUSPS != "CA" && d.properties.STUSPS != "NV" && d.properties.STUSPS != "AK" && d.properties.STUSPS != "HI" && d.properties.STUSPS != "MA" && d.properties.STUSPS != "RI" && d.properties.STUSPS != "CT" && d.properties.STUSPS != "DE" && d.properties.STUSPS != "DC" && d.properties.STUSPS != "MD" && d.properties.STUSPS != "NH" && d.properties.STUSPS != "VT" && d.properties.STUSPS != "NJ") { return d.properties.STUSPS; }
        }
    });
}

  g.append("path")
      //.datum(topojson.mesh(us, us.features, function(a, b) { return a !== b; }))
      .attr("class", "state-borders")
      .attr("d", path);

});

var zoom = d3.behavior.zoom()
    .on("zoom",function() {
        g.attr("transform","translate("+
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        g.selectAll("circle")
            .attr("d", path.projection(projection));
        g.selectAll("path")
            .attr("d", path.projection(projection));

  });

$(".zoom").click(function() {
  g.selectAll("." + race + " path")
      .classed("faded", false)
      .classed("active", false);
});

$(".uszoom").on("mousedown",function() {
    clicked2();
    d3.selectAll(".areas").classed("gone", false);
    d3.selectAll(".mn").classed("gone", false);
    d3.selectAll(".metro").classed("gone", false);
});

$(".mnzoom").on("mousedown",function() {
    mnzoom();
    d3.selectAll(".areas").classed("gone", true);
    d3.selectAll(".mn").classed("gone", false);
});

$(".metrozoom").on("mousedown",function() {
    metrozoom();
    d3.selectAll(".areas").classed("gone", true);
    d3.selectAll(".mn").classed("gone", true);
    d3.selectAll(".metro").classed("gone", false);
});

function clicked(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 3;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 3;
    centered = null;
  }

  g.selectAll("." + race + " path")
      .classed("faded", true)
      .classed("active", centered && function(d) { return d === centered; });

  // g.transition()
  //     .duration(200)
  //     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      // .style("stroke-width", 1.5 / k + "px");

  // g.selectAll("path").style("stroke-width", "0.3px");
}

function mnzoom(d) {
  var x, y, k;

    var centroid = path.centroid(d);
    x = 429.8542649319006;
    y = 90.27472769218944;
    k = 5;

  g.transition()
      .duration(200)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", "0");

  g.selectAll("path").style("stroke-width", "0.3px");
}

function metrozoom(d) {
  var x, y, k;

    var centroid = path.centroid(d);
    x = 439.8542649319006;
    y = 103.27472769218944;
    k = 25;

  g.transition()
      .duration(200)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", "0");

  g.selectAll("path").style("stroke-width", "0.1px");
}

function clicked2(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 1;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  g.selectAll("." + race + " path")
      .classed("faded", false)
      .classed("active", centered && function(d) { return d === centered; });

  g.transition()
      .duration(200)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width","0.5px");

  g.selectAll("path").style("stroke-width", ".5px");
}

d3.helper = {};

d3.helper.tooltip = function(accessor){
    return function(selection){
        var tooltipDiv;
        var bodyNode = d3.select('body').node();
        selection.on("mouseover", function(d, i){
            // Clean up lost tooltips
            d3.select('body').selectAll('div.tooltip').remove();
            // Append tooltip
            tooltipDiv = d3.select('body').append('div').attr('class', 'tooltip');
            var absoluteMousePos = d3.mouse(bodyNode);
            tooltipDiv.style('left', (absoluteMousePos[0] - 160)+'px')
                .style('top', (absoluteMousePos[1] - 15)+'px')
                .style('position', 'absolute')
                .style('z-index', 1001);
            // Add text using the accessor function
            var tooltipText = accessor(d, i) || '';
            // Crop text arbitrarily
            //tooltipDiv.style('width', function(d, i){return (tooltipText.length > 80) ? '300px' : null;})
            //    .html(tooltipText);
        })
        .on('mousemove', function(d, i) {
            // Move tooltip
            var absoluteMousePos = d3.mouse(bodyNode);
            tooltipDiv.style('left', (absoluteMousePos[0] - 160)+'px')
                .style('top', (absoluteMousePos[1] - 15)+'px');
            var tooltipText = accessor(d, i) || '';
            tooltipDiv.html(tooltipText);
        })
        .on("mouseout", function(d, i){
            // Remove tooltip
            tooltipDiv.remove();
        });

    };
};

var aspect = 800 / 600, chart = $(container + " svg"); //, chart2 = $(".carto svg")
$(document).ready(function() {
  var targetWidth = chart.parent().width();
  chart.attr("width", targetWidth);
  chart.attr("height", targetWidth / aspect);
});
$(window).on("resize", function() {
  if ($(window).width() >= 970) { $("#mobmenu").hide(); }
  chart.attr("style","");
  var targetWidth = chart.parent().width();
  chart.attr("width", targetWidth);
  chart.attr("height", targetWidth / aspect);
});

} //end mapBuild


//show/hide parameters
$.urlParam = function(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  return results[1] || 0;
}

var race = $.urlParam('race');
$(".raceSwitch, li").removeClass("selected2");
$(".raceSwitch[section=" + race + "]").addClass("selected2");
$("li[section=" + race + "]").addClass("selected2");

var currentrace = race;

function mapShow(container, race){
 d3.selectAll(".mappage").each(function(i){
  if (!d3.select(this).classed(race)) { d3.select(this).style("display","none"); }
  else { d3.select(this).style("display","block"); }
 });
} //end mapShow

function mapSpill(race,data){

  if (race == "president"){
    mapBuild("#president .geo", "#districtName", "#chart", "us_states.json", race, "us", "country", data);
    if ($(window).width() > 500) { mapBuild("#president .geo", "#districtName", "#chart", "us_counties.json", "county", "us", "counties", data); }
    electoralCarto(data);
    // mapBuild("#mapStates", "#districtName", "#chart", "us_states.json", race, "us", "country", data);
    // mapBuild("#mapCounties", "#districtName", "#chart", "us_counties.json", "county", "us", "counties", data);
  }  

  if (race == "house"){
    mapBuild("#house .geo", "#districtName", "#chart", "uscongress.json", race, "us", "country", data);
    // mapBuild("#mapMN", "#districtName", "#chart", "us_cd_mn_2012.json", race, "mn", "country", data);
    houseCarto(data);
  }  

  if (race == "senate"){
    mapBuild("#senate .geo", "#districtName", "#chart", "us_states.json", race, "us", "country", data);
  }  

  if (race == "governors"){
    mapBuild("#governors .geo", "#districtName", "#chart", "us_states.json", race, "us", "country", data);
  }  

  if (race == "mnhouse"){
    mapBuild("#mnhouse .mapState", "#districtName", "#chart", "mnleg.json", race, "mn", "country", data);
    mapBuild("#mnhouse .mapMetro", "#districtName", "#chart", "mnleg_metro.json", race, "metro", "country", data);
    // cartoBuild("#mnhouse .cartoState", "#districtName", "#chart", null, race, data, "us", 0, cartoData(race,"mn"));
    // cartoBuild("#mnhouse .cartoMetro", "#districtName", "#chart", null, race, data, "us", 0, cartoData(race,"metro"));
  }  

  if (race == "mnsenate"){
    mapBuild("#mnsenate .mapState", "#districtName", "#chart", "mnsenate.json", race, "mn", "country", data);
    mapBuild("#mnsenate .mapMetro", "#districtName", "#chart", "mnsenate_metro.json", race, "metro", "country", data);
    // cartoBuild("#mnsenate .cartoState", "#districtName", "#chart", null, race, data, "us", 0, cartoData(race,"mn"));
    // cartoBuild("#mnsenate .cartoMetro", "#districtName", "#chart", null, race, data, "us", 0, cartoData(race,"metro"));
  }

} //end mapSpill

//RETRIEVE NEW DATA FOR THE TABLES AND POWER BALANCE
function prezCrunch(data,dataEV){

  $("#allResults .president").html("");

  var stateList = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","District of Columbia","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];

  var evList = [9,3,11,6,55,9,7,3,3,29,16,4,4,20,11,6,6,8,8,2,10,11,16,10,6,10,3,2,6,4,14,5,29,15,3,18,7,7,20,4,9,3,11,38,6,3,13,12,5,10,3];

  var dTally = 0;
  var rTally = 0;
  var iTally = 0;

  for (var i=0; i < stateList.length; i++){
    var updated = fetchData(null,stateList[i],"winner",data,"president",null,null,null);
    if (updated == "GOP Win") { rTally += evList[i]; }
    else if (updated == "DEM Win") { dTally += evList[i]; }
    else if (updated == "IND Win") { iTally += evList[i]; }
    $("#allResults .president").append(fetchData(null,stateList[i],"board",data,"president",evList[i],null));
  }

  var me1 = fetchData(null,"ME","lean",dataEV,"president",null,null,"District 1");
  var me2 = fetchData(null,"ME","lean",dataEV,"president",null,null,"District 2");
  var ne1 = fetchData(null,"NE","lean",dataEV,"president",null,null,"District 1");
  var ne2 = fetchData(null,"NE","lean",dataEV,"president",null,null,"District 2");
  var ne3 = fetchData(null,"NE","lean",dataEV,"president",null,null,"District 3");

  $(".ME01").css("background-color",me1);
  $(".ME02").css("background-color",me2);
  $(".NE01").css("background-color",ne1);
  $(".NE02").css("background-color",ne2);
  $(".NE03").css("background-color",ne3);
  $("#ME01").css("fill",me1);
  $("#ME02").css("fill",me2);
  $("#NE01").css("fill",ne1);
  $("#NE02").css("fill",ne2);
  $("#NE03").css("fill",ne3);

  $("#allResults .president").append(fetchData("District 1","ME","board",dataEV,"president",1,"ME01","District 1"));
  $("#allResults .president").append(fetchData("District 2","ME","board",dataEV,"president",1,"ME02","District 2"));
  $("#allResults .president").append(fetchData("District 1","NE","board",dataEV,"president",1,"NE01","District 1"));
  $("#allResults .president").append(fetchData("District 2","NE","board",dataEV,"president",1,"NE02","District 2"));
  $("#allResults .president").append(fetchData("District 3","NE","board",dataEV,"president",1,"NE03","District 3"));

  var me1R = fetchData("District 1","ME","votesR",dataEV,"president",1,"ME01","District 1");
  var me1D = fetchData("District 1","ME","votesD",dataEV,"president",1,"ME01","District 1");
  var me2R = fetchData("District 2","ME","votesR",dataEV,"president",1,"ME02","District 2");
  var me2D = fetchData("District 2","ME","votesD",dataEV,"president",1,"ME02","District 2");
  var ne1R = fetchData("District 1","NE","votesR",dataEV,"president",1,"NE01","District 1");
  var ne1D = fetchData("District 1","NE","votesD",dataEV,"president",1,"NE01","District 1");
  var ne2R = fetchData("District 2","NE","votesR",dataEV,"president",1,"NE02","District 2");
  var ne2D = fetchData("District 2","NE","votesD",dataEV,"president",1,"NE02","District 2");
  var ne3R = fetchData("District 3","NE","votesR",dataEV,"president",1,"NE03","District 3");
  var ne3D = fetchData("District 3","NE","votesD",dataEV,"president",1,"NE03","District 3");

  var meW = fetchData(null,"Maine","winner",data,"president",null,null,null);
  var neW = fetchData(null,"Nebraska","winner",data,"president",null,null,null);

  if (meW == "GOP Win" || meW == "DEM Win") { 
    if (me1R > me1D) { rTally++; }
    if (me1R < me1D) { dTally++; }

    if (me2R > me2D) { rTally++; }
    if (me2R < me2D) { dTally++; }
  }

  if (neW == "GOP Win" || neW == "DEM Win") { 
    if (ne1R > ne1D) { rTally++; }
    if (ne1R < ne1D) { dTally++; }

    if (ne2R > ne2D) { rTally++; }
    if (ne2R < ne2D) { dTally++; }

    if (ne3R > ne3D) { rTally++; }
    if (ne3R < ne3D) { dTally++; }
  }

  var winner = fetchData(null,"United States","winner",data,"president",null,null);

  if (winner == "GOP Win") { $("#rMark").html("&#x2714;"); }
  else if (winner == "DEM Win") { $("#dMark").html("&#x2714;"); }

  $(".demsCount").html(dTally);
  $(".gopCount").html(rTally);
  // $(".dcount").html(d3.format(",")(votesD));
  // $(".rcount").html(d3.format(",")(votesR));
  // $(".demPCT").html(d3.format("%")(votesD/votesT));
  // $(".gopPCT").html(d3.format("%")(votesR/votesT)); 
  $("#dWin").css("width", d3.format("%")(dTally/538));
  $("#rWin").css("width", d3.format("%")(rTally/538));
  $("#iWin").css("width", d3.format("%")(iTally/538));
  $("#dChange").html("");
  $("#rChange").html("");

  $('.filter_box').keyup(function(i){
     $('#allResults .president .tableRow').hide();
     $("#allResults .president .tableRow").removeClass("selectedBox");
     var txt = String($('.filter_box').val());
     $('#allResults .president .tableRow').each(function(){
        if($(this).text().toUpperCase().indexOf(txt.toUpperCase()) != -1){
            $(this).show();
        }
     });
  });

  $(".president .tableRow").click(function() {
    $(".tableRow").removeClass("selectedBox");
    $(this).addClass("selectedBox");
    var findDistrict = $(this).attr("name");
    $(".cartoState").removeClass("selectedBox");
    $("#cartogram #" + $(this).attr("name")).addClass("selectedBox");
    $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Down();
    $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Up();
    $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Click();
  });

  var time = fetchData(null,"United States","timestamp",data,"president",null,null);
  $("#timestamp").html("Last update: " + time.toLocaleTimeString());

} //end prezCrunch

function senCrunch(data){

  $("#allResults .senate").html("");
  $("#rMark, #dMark").html("");

  var stateList = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maryland","Missouri","Nevada","New Hampshire","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","South Carolina","South Dakota","Utah","Vermont","Washington","Wisconsin"];

  var dPre = 46;
  var rPre = 54;

  var dTally = 36;
  var rTally = 30;
  var iTally = 0;

  for (var i=0; i < stateList.length; i++){
    var updated = fetchData(null,stateList[i],"winner",data,"senate",null,null);
    if (updated == "GOP Win") { rTally++; }
    else if (updated == "DEM Win") { dTally++; }
    else if (updated == "IND Win") { iTally++; }

    $("#allResults .senate").append(fetchData(null,stateList[i],"board",data,"senate",null,null));
  }

  $(".demsCount").html(dTally);
  $(".gopCount").html(rTally);
  $("#dWin").css("width", d3.format("%")(dTally/100));
  $("#rWin").css("width", d3.format("%")(rTally/100));
  $("#iWin").css("width", d3.format("%")(iTally/100));
  $("#dChange").html(d3.format("+")(dTally - dPre));
  $("#rChange").html(d3.format("+")(rTally - rPre));


  $('.filter_box').keyup(function(i){
     $('#allResults .senate .tableRow').hide();
     $("#allResults .senate .tableRow").removeClass("selectedBox");
     var txt = String($('.filter_box').val());
     $('#allResults .senate .tableRow').each(function(){
        if($(this).text().toUpperCase().indexOf(txt.toUpperCase()) != -1){
            $(this).show();
        }
     });
  });

  $(".senate .tableRow").click(function() {
     d3.selectAll("path").classed("faded", false).classed("active", false); 
     $(".tableRow").removeClass("selectedBox");
     $(this).addClass("selectedBox");
     var findDistrict = $(this).attr("name") + "s";
     $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Down();
     $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Up();
     $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Click();
  });

} //end senCrunch

function govCrunch(data){

  $("#allResults .governors").html("");
  $("#rMark, #dMark").html("");

  var stateList = ["Delaware","Indiana","Missouri","Montana","New Hampshire","North Carolina","North Dakota","Oregon","Utah","Vermont","Washington","West Virginia"];

  var dPre = 18;
  var rPre = 31;

  var dTally = 10;
  var rTally = 27;
  var iTally = 1;

  for (var i=0; i < stateList.length; i++){
    var updated = fetchData(null,stateList[i],"winner",data,"governors",null,null);
    if (updated == "GOP Win") { rTally++; }
    else if (updated == "DEM Win") { dTally++; }
    else if (updated == "IND Win") { iTally++; }

    $("#allResults .governors").append(fetchData(null,stateList[i],"board",data,"governors",null,null));
  }

  $(".demsCount").html(dTally);
  $(".gopCount").html(rTally);
  $("#dWin").css("width", d3.format("%")(dTally/50));
  $("#rWin").css("width", d3.format("%")(rTally/50));
  $("#iWin").css("width", d3.format("%")(iTally/50));
  $("#dChange").html(d3.format("+")(dTally - dPre));
  $("#rChange").html(d3.format("+")(rTally - rPre));

  $('.filter_box').keyup(function(i){
     $('#allResults .governors .tableRow').hide();
     $("#allResults .governors .tableRow").removeClass("selectedBox");
     var txt = String($('.filter_box').val());
     $('#allResults .governors .tableRow').each(function(){
        if($(this).text().toUpperCase().indexOf(txt.toUpperCase()) != -1){
            $(this).show();
        }
     });
  });

  $(".governors .tableRow").click(function() {
    d3.selectAll("path").classed("faded", false).classed("active", false);  
    $(".tableRow").removeClass("selectedBox");
    $(this).addClass("selectedBox");
    var findDistrict = $(this).attr("name") + "g";
    $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Down();
    $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Up();
    $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Click();
  });

} //end govCrunch

function houseCrunch(data){

  $("#allResults .house").html("");
  $("#rMark, #dMark").html("");

  var stateList = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];
  var districtList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53];

  var dPre = 188;
  var rPre = 247;

  var dTally = 0;
  var rTally = 0;
  var iTally = 0;

  for (var i=0; i < districtList.length; i++){
    for (var k=0; k < stateList.length; k++){
    var updated = fetchData("District " + districtList[i],stateList[k],"winner",data,"ushouse",null,"District " + districtList[i]);
    if (updated == "GOP Win") { rTally++; }
    else if (updated == "DEM Win") { dTally++; }
    else if (updated == "IND Win") { iTally++; }
    }

  }

  $("#allResults .house").append(fetchData("District 1","Minnesota","board",data,"ushouse",null,"1"));
  $("#allResults .house").append(fetchData("District 2","Minnesota","board",data,"ushouse",null,"2"));
  $("#allResults .house").append(fetchData("District 3","Minnesota","board",data,"ushouse",null,"3"));
  $("#allResults .house").append(fetchData("District 4","Minnesota","board",data,"ushouse",null,"4"));
  $("#allResults .house").append(fetchData("District 5","Minnesota","board",data,"ushouse",null,"5"));
  $("#allResults .house").append(fetchData("District 6","Minnesota","board",data,"ushouse",null,"6"));
  $("#allResults .house").append(fetchData("District 7","Minnesota","board",data,"ushouse",null,"7"));
  $("#allResults .house").append(fetchData("District 8","Minnesota","board",data,"ushouse",null,"8"));

  $(".demsCount").html(dTally);
  $(".gopCount").html(rTally);
  $("#dWin").css("width", d3.format("%")(dTally/435));
  $("#rWin").css("width", d3.format("%")(rTally/435));
  $("#iWin").css("width", d3.format("%")(iTally/435));
  $("#dChange").html(d3.format("+")(dTally - dPre));
  $("#rChange").html(d3.format("+")(rTally - rPre));

  $('.filter_box').keyup(function(i){
     $('#allResults .house .tableRow').hide();
     $("#allResults .house .tableRow").removeClass("selectedBox");
     var txt = String($('.filter_box').val());
     $('#allResults .house .tableRow').each(function(){
        if($(this).text().toUpperCase().indexOf(txt.toUpperCase()) != -1){
            $(this).show();
        }
     });
  });

  $(".house .tableRow").click(function() {
    d3.selectAll("path").classed("faded", false).classed("active", false);  
    $(".tableRow").removeClass("selectedBox");
    $(this).addClass("selectedBox");  

      var findDistrict = $(this).attr("name");
    $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Down();
    $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Up();
    $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Click();  

      var findDistrict2 = $(this).attr("name") + "c";
    $("[id='" + findDistrict2.replace(new RegExp(" ", "g"),"-") + "']").d3Down();
    $("[id='" + findDistrict2.replace(new RegExp(" ", "g"),"-") + "']").d3Up();
    $("[id='" + findDistrict2.replace(new RegExp(" ", "g"),"-") + "']").d3Click();
  });

} //end houseCrunch

function mnhouseCrunch(data){

  $("#allResults .mnhouse").html("");
  $("#rMark, #dMark").html("");

  var districtList = ["1A","1B","2A","2B","3A","3B","4A","4B","5A","5B","6A","6B","7A","7B","8A","8B","9A","9B","10A","10B","11A","11B","12A","12B","13A","13B","14A","14B","15A","15B","16A","16B","17A","17B","18A","18B","19A","19B","20A","20B","21A","21B","22A","22B","23A","23B","24A","24B","25A","25B","26A","26B","27A","27B","28A","28B","29A","29B","30A","30B","31A","31B","32A","32B","33A","33B","34A","34B","35A","35B","36A","36B","37A","37B","38A","38B","39A","39B","40A","40B","41A","41B","42A","42B","43A","43B","44A","44B","45A","45B","46A","46B","47A","47B","48A","48B","49A","49B","50A","50B","51A","51B","52A","52B","53A","53B","54A","54B","55A","55B","56A","56B","57A","57B","58A","58B","59A","59B","60A","60B","61A","61B","62A","62B","63A","63B","64A","64B","65A","65B","66A","66B","67A","67B"];

  var dPre = 61;
  var rPre = 73;

  var dTally = 0;
  var rTally = 0;
  var iTally = 0;

  for (var i=0; i < districtList.length; i++){
    var updated = fetchData("District " + districtList[i],"Minnesota","winner",data,"mnhouse",null,"District " + districtList[i]);
    if (updated == "GOP Win") { rTally++; }
    else if (updated == "DEM Win") { dTally++; }
    else if (updated == "IND Win") { iTally++; }
    $("#allResults .mnhouse").append(fetchData("District " + districtList[i],"Minnesota","board",data,"mnhouse",null,districtList[i]));
  }

  $(".demsCount").html(dTally);
  $(".gopCount").html(rTally);
  $("#dWin").css("width", d3.format("%")(dTally/134));
  $("#rWin").css("width", d3.format("%")(rTally/134));
  $("#iWin").css("width", d3.format("%")(iTally/134));
  $("#dChange").html(d3.format("+")(dTally - dPre));
  $("#rChange").html(d3.format("+")(rTally - rPre));

  $('.filter_box').keyup(function(i){
     $('#allResults .mnhouse .tableRow').hide();
     $("#allResults .mnhouse .tableRow").removeClass("selectedBox");
     var txt = String($('.filter_box').val());
     $('#allResults .mnhouse .tableRow').each(function(){
        if($(this).text().toUpperCase().indexOf(txt.toUpperCase()) != -1){
            $(this).show();
        }
     });
  });

  $(".mnhouse .tableRow").click(function() {
      d3.selectAll("path").classed("faded", false).classed("active", false);
      $(".tableRow").removeClass("selectedBox");
      $(this).addClass("selectedBox");
      var findDistrict = "mnh" + $(this).attr("name");
      $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Down();
      $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Up();
      $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Click();
  });

} //end mnhouseCrunch

function mnsenCrunch(data){

  $("#allResults .mnsenate").html("");
  $("#rMark, #dMark").html("");

  var districtList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67];

  var dPre = 39;
  var rPre = 28;

  var dTally = 0;
  var rTally = 0;
  var iTally = 0;

  for (var i=0; i < districtList.length; i++){
    var updated = fetchData("District " + districtList[i],"Minnesota","winner",data,"mnsenate",null,"District " + districtList[i]);
    if (updated == "GOP Win") { rTally++; }
    else if (updated == "DEM Win") { dTally++; }
    else if (updated == "IND Win") { iTally++; }
    $("#allResults .mnsenate").append(fetchData("District " + districtList[i],"Minnesota","board",data,"mnsenate",null,districtList[i]));
  }

  $(".demsCount").html(dTally);
  $(".gopCount").html(rTally);
  $("#dWin").css("width", d3.format("%")(dTally/67));
  $("#rWin").css("width", d3.format("%")(rTally/67));
  $("#iWin").css("width", d3.format("%")(iTally/67));
  $("#dChange").html(d3.format("+")(dTally - dPre));
  $("#rChange").html(d3.format("+")(rTally - rPre));

  $('.filter_box').keyup(function(i){
     $('.tableRow').hide();
     $(".tableRow").removeClass("selectedBox");
     var txt = String($('.filter_box').val());
     $('.tableRow').each(function(){
        if($(this).text().toUpperCase().indexOf(txt.toUpperCase()) != -1){
            $(this).show();
        }
     });
  });

  $(".mnsenate .tableRow").click(function() {
      d3.selectAll("path").classed("faded", false).classed("active", false);
      $(".tableRow").removeClass("selectedBox");
      $(this).addClass("selectedBox");
      var findDistrict = "mns" + $(this).attr("name");
      $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Down();
      $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Up();
      $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Click();
  });

} //end mnsenCrunch

function toggleyBits(data1,data2,data3,data4,data5,data6,data7,reload){
  var loadState = 0;

function loadBars(race){
  if (race == "president") { prezCrunch(data1,data7); } 
  if (race == "senate") { senCrunch(data2); } 
  if (race == "governors") { govCrunch(data3); } 
  if (race == "mnsenate") { mnsenCrunch(data4); } 
  if (race == "mnhouse") { mnhouseCrunch(data5); } 
  if (race == "house") { houseCrunch(data6); } 
}

loadBars(currentrace);

//MAKE THOSE PESKY EVCDS WORK
function evcdToggles(){
$(".ME01, #ME01").hover(function(event) {
 spillInfo(fetchData("District 1","ME","table",data7,"president",null,"District 1","District 1"));
 $(".block").removeClass("blockSelect");
 $(".ME01.evcd").addClass("blockSelect");
 $("#evcdME01").addClass("selectedBox");
   d3.selectAll("path")
      .classed("faded", false)
      .classed("active", false);
});

$("#evcdME01").click(function(event) {
 spillInfo(fetchData("District 1","ME","table",data7,"president",null,"District 1","District 1"));
 $(".block").removeClass("blockSelect");
 $(".ME01.evcd").addClass("blockSelect");
   d3.selectAll("path")
      .classed("faded", false)
      .classed("active", false);
});

$(".ME02, #ME02").hover(function(event) {
 spillInfo(fetchData("District 2","ME","table",data7,"president",null,"District 2","District 2"));
 $(".block").removeClass("blockSelect");
 $(".ME02.evcd").addClass("blockSelect");
 $("#evcdME02").addClass("selectedBox");
   d3.selectAll("path")
      .classed("faded", false)
      .classed("active", false);
});

$("#evcdME02").click(function(event) {
 spillInfo(fetchData("District 2","ME","table",data7,"president",null,"District 2","District 2"));
 $(".block").removeClass("blockSelect");
 $(".ME02.evcd").addClass("blockSelect");
   d3.selectAll("path")
      .classed("faded", false)
      .classed("active", false);
});

$(".NE01, #NE01").hover(function(event) {
 spillInfo(fetchData("District 1","NE","table",data7,"president",null,"District 1","District 1"));
 $(".block").removeClass("blockSelect");
 $(".NE01.evcd").addClass("blockSelect");
 $("#evcdNE01").addClass("selectedBox");
   d3.selectAll("path")
      .classed("faded", false)
      .classed("active", false);
});

$("#evcdNE01").click(function(event) {
 spillInfo(fetchData("District 1","NE","table",data7,"president",null,"District 1","District 1"));
 $(".block").removeClass("blockSelect");
 $(".NE01.evcd").addClass("blockSelect");
   d3.selectAll("path")
      .classed("faded", false)
      .classed("active", false);
});

$(".NE02, #NE02").hover(function(event) {
 spillInfo(fetchData("District 2","NE","table",data7,"president",null,"District 2","District 2"));
 $(".block").removeClass("blockSelect");
 $(".NE02.evcd").addClass("blockSelect");
 $("#evcdNE02").addClass("selectedBox");
   d3.selectAll("path")
      .classed("faded", false)
      .classed("active", false);
});

$("#evcdNE02").click(function(event) {
 spillInfo(fetchData("District 2","NE","table",data7,"president",null,"District 2","District 2"));
 $(".block").removeClass("blockSelect");
 $(".NE02.evcd").addClass("blockSelect");
   d3.selectAll("path")
      .classed("faded", false)
      .classed("active", false);
});

$(".NE03, #NE03").hover(function(event) {
 spillInfo(fetchData("District 3","NE","table",data7,"president",null,"District 3","District 3"));
 $(".block").removeClass("blockSelect");
 $(".NE03.evcd").addClass("blockSelect");
 $("#evcdNE03").addClass("selectedBox");
   d3.selectAll("path")
      .classed("faded", false)
      .classed("active", false);
});

$("#evcdNE03").click(function(event) {
 spillInfo(fetchData("District 3","NE","table",data7,"president",null,"District 3","District 3"));
 $(".block").removeClass("blockSelect");
 $(".NE03.evcd").addClass("blockSelect");
   d3.selectAll("path")
      .classed("faded", false)
      .classed("active", false);
});

}

  evcdToggles();

$(".cartoState").click(function(event) {
 spillInfo(fetchData($(this).attr("name"),$(this).attr("name"),"table",data1,"president"));
});

$(".cartoState polygon").hover(function(event) {
$(".cartoState, .tableRow").removeClass("selectedBox");
$(".tableRow[name=" + $(this).parent().attr("id") + "]").addClass("selectedBox");
 spillInfo(fetchData($(this).parent().attr("name"),$(this).parent().attr("name"),"table",data1,"president"));
});

$(".cartoState").mouseleave(function(event) {
  $(".cartoState").removeClass("blockSelect");
  $(".cartoState, .tableRow").removeClass("selectedBox");
  if (thisView == "mn") { spillInfo(fetchData("Minnesota","Minnesota","table",data1,"president")); }
  else if (thisView == "us") { spillInfo(fetchData("United States","United States","table",data1,"president")); }
  else if (thisView == "cd") { spillInfo(fetchData("District 2","Minnesota","table",data6,"ushouse",null,"District 2")); }
  else { $("#infobox").html(""); }
});

$(".block").mouseleave(function(event) {
  $(".block").removeClass("blockSelect");
  $(".tableRow").removeClass("selectedBox");
  if (thisView == "mn") { spillInfo(fetchData("Minnesota","Minnesota","table",data1,"president")); }
  else if (thisView == "us") { spillInfo(fetchData("United States","United States","table",data1,"president")); }
  else if (thisView == "cd") { spillInfo(fetchData("District 2","Minnesota","table",data6,"ushouse",null,"District 2")); }
  else { $("#infobox").html(""); }
    d3.selectAll("path")
      .classed("faded", false)
      .classed("active", false);
});

//RESET ALL THE VIEWS
$(".zoom").click(function(event) {
  $(".block").removeClass("blockSelect");
  $(".tableRow").removeClass("selectedBox");
  $(".cartoState").removeClass("selectedBox");
  d3.selectAll(".cd").classed("active",false);
  $(".tableRow").show();
  $(".filter_box").val("");
  if (thisView == "mn") { spillInfo(fetchData("Minnesota","Minnesota","table",data1,"president")); }
  else if (thisView == "us") { spillInfo(fetchData("United States","United States","table",data1,"president")); }
  else if (thisView == "cd") { spillInfo(fetchData("District 2","Minnesota","table",data6,"ushouse",null,"District 2")); }
  else { $("#infobox").html(""); }
});

//carto clickies
$(".stateBlock").click(function(event) {
$(".block").removeClass("blockSelect");
$(this).addClass("blockSelect");
    var findDistrict = $(this).attr("ab");
    $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Down();
    $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Up();
    $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Click();
});

$(".stateBlock").hover(function(event) {
    var findDistrict = $(this).attr("ab");
    $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Down();
    $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Up();
    $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Click();
}, function(){
      // unhover code 
   });

//TRIGGER CHANGES WHEN SELECTING MENU ITEMS
$(".has-sub").click(function(event) {
  $(".raceSwitch, li").removeClass("selected2");
});

$(".raceSwitch").click(function(event) {
    
  //infobox switches
  thisView = $(this).attr("infobox");

  if (thisView == "mn") { spillInfo(fetchData("Minnesota","Minnesota","table",data1,"president")); }
  else if (thisView == "us") { spillInfo(fetchData("United States","United States","table",data1,"president")); }
  else if (thisView == "cd") { spillInfo(fetchData("District 2","Minnesota","table",data6,"ushouse",null,"District 2")); }
  else { $("#infobox").html(""); }

  //load power bars
  loadBars($(this).attr("data"));

  //button thingies
  $(".raceSwitch, li").removeClass("selected2");
  $(".cartoState").removeClass("selectedBox");
  $(this).addClass("selected2");
  $(".raceSwitch").find("a").removeClass("selected3");
  $(this).find("a").addClass("selected3");

  //show correct race
  $(".dataviz, .bigBoard").hide();
  $("#" + $(this).attr("data")).show();
  $("." + $(this).attr("data")).show();
  currentrace = $(this).attr("data");

  //show correct legend
  $(".legendBlock").hide();
  $("#" + $(this).attr("legend")).show();
  $(".dparty").html($(this).attr("dLabel"));
  $(".rparty").html($(this).attr("rLabel"));
  if ($(this).attr("stateKey") == "showMe") { $(".sideStates").show(); }
  else { $(".sideStates").hide(); }
  
  //show map or carto
  $(".map").hide();
  $("." + $(this).attr("type")).show();
  $("." + $(this).attr("type")).css('display','inline-block');

  //show correct layer
  loadState++;
  mapShow(".map",$(this).attr("layer"));

  evcdToggles();
}); //end menu triggers

} //end togglyBits


//INITIAL DATAMANCY TO CONJURE RESULTS FROM THE ASSOCIATED PRESS
// var apiStringPrez = "https://s3-us-west-2.amazonaws.com/strib-elections-ap-api/us-uspresident-by-county/full.json";
// var apiStringSen = "https://s3-us-west-2.amazonaws.com/strib-elections-ap-api/us-ussenate-by-state/full.json";
// var apiStringGov = "https://s3-us-west-2.amazonaws.com/strib-elections-ap-api/us-governors-by-state/full.json";
// var apiStringMNS = "https://s3-us-west-2.amazonaws.com/strib-elections-ap-api/mn-mnsenate-by-district/full.json";
// var apiStringMNH = "https://s3-us-west-2.amazonaws.com/strib-elections-ap-api/mn-mnhouse-by-district/full.json";
// var apiStringHouse = "https://s3-us-west-2.amazonaws.com/strib-elections-ap-api/us-ushouse-by-state/full.json";
// var apiStringEVCD = "https://s3-us-west-2.amazonaws.com/strib-elections-ap-api/us-uspresident-nebraska-maine/full.json";

var apiStringPrez = "./data/prezCounty2016.json";
var apiStringSen = "./data/ussenate2016.json";
var apiStringGov = "./data/usgov2016.json";
var apiStringMNS = "./data/mnsenate2016.json";
var apiStringMNH = "./data/mnhouse2016.json";
var apiStringHouse = "./data/ushouse2016.json";
var apiStringEVCD = "./data/prezEVCD2016.json";

d3.json(apiStringPrez + '?' + (Math.floor(Math.random() * 1000)), function(error1, jsonSpillPrez) {
d3.json(apiStringSen + '?' + (Math.floor(Math.random() * 1000)), function(error2, jsonSpillSen) {
d3.json(apiStringGov + '?' + (Math.floor(Math.random() * 1000)), function(error3, jsonSpillGov) {
d3.json(apiStringMNS + '?' + (Math.floor(Math.random() * 1000)), function(error4, jsonSpillMNS) {
d3.json(apiStringMNH + '?' + (Math.floor(Math.random() * 1000)), function(error5, jsonSpillMNH) {
d3.json(apiStringHouse + '?' + (Math.floor(Math.random() * 1000)), function(error6, jsonSpillHouse) {
d3.json(apiStringEVCD + '?' + (Math.floor(Math.random() * 1000)), function(error7, jsonSpillEVCD) {

//JUST IN CASE OF THERMONUCLEAR DISASTER
function fallback(){
  var mapsString = "<img src='http://static.startribune.com/news/elections/frontpage_bars_maps.png' width='100%' />";
  var mobileString = "<img src='http://static.startribune.com/news/elections/frontpage_bars_desktop.png' width='100%' />";
  $("#fulldataviz, #loader").hide();
  $("#fallback").html("<div style='padding:20px; text-align:center;'>We're experiencing technical difficulties, please check back shortly.</div><div>" + mapsString + "</div><div>" + mobileString + "</div>");
  // $("#fallback").html("FALLBACKS!!!11~");
  $("#fallback").show();
}

if (error1 != null || error2 != null || error3 != null || error4 != null || error5 != null || error6 != null || error7 != null) {
   fallback(); 
   return;
}

var dataPrez = jsonSpillPrez;
var dataSen = jsonSpillSen;
var dataGov = jsonSpillGov;
var dataMNS = jsonSpillMNS;
var dataMNH = jsonSpillMNH;
var dataHouse = jsonSpillHouse;
var dataEVCD = jsonSpillEVCD;

mapSpill("president",dataPrez);
if ($(window).width() > 500) { mapSpill("senate",dataSen); }
if ($(window).width() > 500) { mapSpill("governors",dataGov); }
mapSpill("mnsenate",dataMNS);
mapSpill("mnhouse",dataMNH);
mapSpill("house",dataHouse);

$(document).ready(function() {
    $(".dataviz").hide();
    $("#" + race).show();
    mapShow(".map","country");

var docwidth = $(window).width(); 

if ((docwidth < 500)) {
    $("svg").width(docwidth);
    $("svg").height(docwidth / 1.5);
}

});

toggleyBits(dataPrez,dataSen,dataGov,dataMNS,dataMNH,dataHouse,dataEVCD,false);

spillInfo(fetchData("United States","United States","table",dataPrez,"president"));

$(".dparty").html("Clinton");
$(".rparty").html("Trump");
$("#prezButton").trigger("click");
$("#table .president").show();

window.setTimeout(function () { $("#message").html("<div class='message'>Rendering results...</div><img src='http://stmedia.startribune.com/designimages/ajax-loader.gif' class='loader-img'>"); }, 3000);

window.setTimeout(function () {
  
  $("#wrapper").show();
  $(".loading-mask").hide();

    var count = 120;
    var timerId = setInterval(function() {
        count--;
        $(".ticker").html(count);

        if(count == 0) {
            count = 120;
            $(".ticker").html("--");
            reloadData();
        }
    }, 1000);

}, 6000);

});
});
});
});
});
});
}); //end data stream initialization


//REPAINT EVERYTHING TO REFLECT OUR TERRIFYING NEW REALITY
function mapReshade(container, shape, subject, race, dataCompare) {
d3.json("shapefiles/" + shape, function(error, us) {
    if (race != "cartoHouse"){
  d3.selectAll(container + " path")
        .data(us.features)
        .style("fill", function(d){
         if (race == "president") { 
            $('#president .sideStates .block').each(function(i, obj) {
                if ($(this).hasClass(d.properties.STUSPS)){
                var color = fetchData(d.properties.NAME,d.properties.NAME,"lean",dataCompare,race);
                $(this).css("background-color", color);
                }
            });
            return fetchData(d.properties.NAME,d.properties.NAME,"lean",dataCompare,race); 
         }
         if (race == "senate") { 
            $('#senate .sideStates .block').each(function(i, obj) {
                if ($(this).hasClass(d.properties.STUSPS)){
                var color = fetchData(d.properties.NAME,d.properties.NAME,"lean",dataCompare,race);
                $(this).css("background-color", color);
                }
            });
            return fetchData(d.properties.NAME,d.properties.NAME,"lean",dataCompare,race); 
         }
         if (race == "governors") { 
            $('#governors .sideStates .block').each(function(i, obj) {
                if ($(this).hasClass(d.properties.STUSPS)){
                var color = fetchData(d.properties.NAME,d.properties.NAME,"lean",dataCompare,race);
                $(this).css("background-color", color);
                }
            });
            return fetchData(d.properties.NAME,d.properties.NAME,"lean",dataCompare,race); 
         }
         else if (race == "county") { return fetchData(d.properties.GEOID,null,"colors",dataCompare,race); }
           // else if (race == "pct") { return mapColor(d.properties.PCTCODE, race, dataCompare); }
         else if (race == "house") { return fetchData("District " + d.properties.DISTRICT,d.properties.STATENAME,"lean",dataCompare,"ushouse",null,"District " + d.properties.DISTRICT); }
         else if (race == "mnsenate" || race == "mnhouse") { return fetchData("District " + d.properties.DISTRICT,"Minnesota","lean",dataCompare,race); }
        })
       .on("mousedown", function(d, i){
        var str = d.properties.NAME; 
        $(".district").removeClass("selected");
        $(".tableRow").removeClass("selectedBox");
        $(".tableRow[name=" + d.properties.STUSPS + "]").addClass("selectedBox");
        $(".tableRow[name=" + d.properties.DISTRICT + "]").addClass("selectedBox");
        if (race == "president" || race == "senate" ||  race == "governors"){ 
            spillInfo(fetchData(d.properties.NAME,d.properties.NAME,"table",dataCompare,race)); $(".block").removeClass("blockSelect"); $("." + d.properties.STUSPS).addClass("blockSelect"); 
        }
        else if (race == "county"){ 
            spillInfo(fetchData(d.properties.GEOID,null,"table",dataCompare,race,null,d.properties.NAME)); 
        }
        else if (race == "house"){ 
          if (d.properties.DISTRICT == 0) { var thisDistrict = "1"; }
          else { var thisDistrict = d.properties.DISTRICT; }

            spillInfo(fetchData("District " + d.properties.DISTRICT,d.properties.STATENAME,"table",dataCompare,"ushouse",null,"District " + thisDistrict)); 
            $(".tableRow").removeClass("selectedBox"); 
            if (d.properties.STATENAME == "Minnesota") { 
                $(".tableRow[name=" + d.properties.STATENAME + "" + d.properties.DISTRICT + "]").addClass("selectedBox"); } 
            } 
        else if (race == "mnsenate" || race == "mnhouse") { 
          if (d.properties.DISTRICT == "32B") { return spillInfo("<div class='districtName'>District 32B, MN</div><div>No race. A special election has been called for Feb. 14, 2017.</div>"); }
          else { spillInfo(fetchData("District " + d.properties.DISTRICT,"Minnesota","table",dataCompare,race,null,"District " + d.properties.DISTRICT)); } 
        }
            return false;
       })
         .call(d3.helper.tooltip(function(d, i){
         if ($(window).width() > 500) { 
         if (race == "president" || race == "senate" || race == "governors") { 
            return fetchData(d.properties.NAME,d.properties.NAME,"tooltip",dataCompare,race);
         }
         else if (race == "county") { 
            return fetchData(d.properties.GEOID,null,"tooltip",dataCompare,race,null,d.properties.NAME); 
         }
         else if (race == "house") { 
          if (d.properties.DISTRICT == 0) { var thisDistrict = "1"; }
          else { var thisDistrict = d.properties.DISTRICT; }
            return fetchData("District " + d.properties.DISTRICT,d.properties.STATENAME,"tooltip",dataCompare,"ushouse",null,"District " + thisDistrict); 
         }
         //DON'T FORGET THIS, STUPID
         else if (race == "mnsenate" || race == "mnhouse") { 
          if (d.properties.DISTRICT == "32B") { return "<div class='districtName'>District 32B, MN</div><div>No race</div>"; }
          else { return fetchData("District " + d.properties.DISTRICT,"Minnesota","tooltip",dataCompare,race,null,"District " + d.properties.DISTRICT); }
        }
        }}));
  } else {

  d3.selectAll(container + " path")
        .data(topojson.feature(us, us.objects['uscd']).features)
        .style("fill", function(d){
           return fetchData("District " + d.properties['d'],d.properties.State,"lean",dataCompare,"ushouse",null,"District " + d.properties['d']); 
          })
        .attr("class","cd")
        .on("mousedown", function(d, i){
            d3.selectAll(".cd").classed("active",false);
            d3.select(this).classed("active",true);
            $(".tableRow").removeClass("selectedBox");
            if (d.properties.State == "Minnesota") { 
                $(".tableRow[name=" + d.properties.State + "" + d.properties['d'] + "]").addClass("selectedBox"); 
            }
          if (d.properties['d'] == 0) { var thisDistrict = "1"; }
          else { var thisDistrict = d.properties['d']; }

            spillInfo(fetchData("District " + d.properties['d'],d.properties.State,"table",dataCompare,"ushouse",null,"District " + thisDistrict))
         })
         .call(d3.helper.tooltip(function(d, i){
        if ($(window).width() > 500) { 
            return fetchData("District " + d.properties['d'],d.properties.State,"tooltip",dataCompare,"ushouse",null,"District " + d.properties['d']);
        } else { $(".tooltip").hide(); }}));
  }
});
} //end mapReshade

//A SUMMONING SPELL FOR NEW DATA
function reloadData(){

   d3.json(apiStringPrez + '?' + (Math.floor(Math.random() * 1000)), function(error1, jsonSpillPrez) {
   d3.json(apiStringSen + '?' + (Math.floor(Math.random() * 1000)), function(error2, jsonSpillSen) {
   d3.json(apiStringGov + '?' + (Math.floor(Math.random() * 1000)), function(error3, jsonSpillGov) {
   d3.json(apiStringMNS + '?' + (Math.floor(Math.random() * 1000)), function(error4, jsonSpillMNS) {
   d3.json(apiStringMNH + '?' + (Math.floor(Math.random() * 1000)), function(error5, jsonSpillMNH) {
   d3.json(apiStringHouse + '?' + (Math.floor(Math.random() * 1000)), function(error6, jsonSpillHouse) {
   d3.json(apiStringEVCD + '?' + (Math.floor(Math.random() * 1000)), function(error7, jsonSpillEVCD) {   

   var dataPrez = jsonSpillPrez;
   var dataSen = jsonSpillSen;
   var dataGov = jsonSpillGov;
   var dataMNS = jsonSpillMNS;
   var dataMNH = jsonSpillMNH;
   var dataHouse = jsonSpillHouse;
   var dataEVCD = jsonSpillEVCD;   

   $('.raceSwitch').on('blur change click dblclick error focus focusin focusout hover keydown keypress keyup load mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup resize scroll select submit', function(event){ event.stopPropagation(); return false; });

   $('.raceSwitch').off("click");

   $('.block, .cartoState, .tableRow, path, .stateBlock, .ME01, #ME01, .ME02, #ME02, .NE01, #NE01, .NE02, #NE02, .NE03, #NE03, .evcd, .cartoState polygon').off();

   //presidential updates
   mapReshade("#USMAP .country", "us_states.json", "country", "president", dataPrez);
   if ($(window).width() > 500) { mapReshade("#USMAP .counties", "us_counties.json", "counties", "county", dataPrez); }
   electoralCarto(dataPrez);   

   //senate updates
   if ($(window).width() > 500) { mapReshade("#USSENATE .country", "us_states.json", "country", "senate", dataSen); }   

   //governors updates
   if ($(window).width() > 500) { mapReshade("#USGOV .country", "us_states.json", "country", "governors", dataGov); }   

   //house updates
   mapReshade("#cartoHouse svg", "usdistricts_cartogram.json", "country", "cartoHouse", dataHouse);
   mapReshade("#USHOUSE .country", "uscongress.json", "country", "house", dataHouse);
   // mapReshade("#USHOUSEMN .country", "us_cd_mn_2012.json", "country", "house", dataHouse);   

   //mnhouse updates
   mapReshade("#MNHOUSE .country", "mnleg.json", "country", "mnhouse", dataMNH);
   if ($(window).width() > 500) { mapReshade("#MNHOUSEMETRO", "mnleg_metro.json", "country", "mnhouse", dataMNH); }   

   //mnsenate updates
   mapReshade("#MNSENATE .country", "mnsenate.json", "country", "mnsenate", dataMNS);
   if ($(window).width() > 500) { mapReshade("#MNSENATEMETRO", "mnsenate_metro.json", "country", "mnsenate", dataMNS); }   

   d3.selectAll("path").classed("faded", false).classed("active", false);
   $(".block").removeClass("blockSelect");   

   toggleyBits(dataPrez,dataSen,dataGov,dataMNS,dataMNH,dataHouse,dataEVCD);

   if (thisView == "mn") { spillInfo(fetchData("Minnesota","Minnesota","table",dataPrez,"president")); }
   else if (thisView == "us") { spillInfo(fetchData("United States","United States","table",dataPrez,"president")); }
   else if (thisView == "cd") { spillInfo(fetchData("District 2","Minnesota","table",dataHouse,"ushouse",null,"District 2")); }
   else { $("#infobox").html(""); }

});
});
});
});
});
});
});
} //end reloadData

//NAV MENU DARK MAGICKS
$('#cssmenu li.active').addClass('open').children('ul').show();

$('#cssmenu li.has-sub>a, #mobmenu li.has-sub>a').on('click', function(){
    $(this).removeAttr('href');
    var element = $(this).parent('li');
    if (element.hasClass('open')) {
        element.removeClass('open');
        element.find('li').removeClass('open');
        element.find('ul').slideUp(200);
    }
    else {
        element.addClass('open');
        element.children('ul').slideDown(200);
        element.siblings('li').children('ul').slideUp(200);
        element.siblings('li').removeClass('open');
        element.siblings('li').find('li').removeClass('open');
        element.siblings('li').find('ul').slideUp(200);
    }
});

$( "button" ).click(function() { $("#mobmenu").toggle(); });
$("#mobmenu .raceSwitch").click(function() { $("#mobmenu").toggle(); });

//SOCIAL MEDIA TRIGGERS WORK WELL WHEN THEY'RE CONFIGURED PROPERLY, REMEMBER, YOU NEED TO FEED IT A SPECIFIC, DIFFERENT URL, NOT GET THE URL FROM LOCATION.HREF, OR DOCUMENT.TITLE
    function fbs_click() {
    u="http://www.startribune.com/u-s-results/396064451";
    t="U.S. Results";
    window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=520,height=350');return false;
    }
    function twitter_click(url){newwindow=window.open(url,'name','height=350,width=520');
        if (window.focus) {newwindow.focus()}
        return false;
    }
},{}]},{},[1])
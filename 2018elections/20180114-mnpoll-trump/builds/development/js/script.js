(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
d3.json("./data/polls.json", function(error, json) {

data = json.polls;

var url = window.location.href; 
var captured = /poll=([^&]+)/.exec(url)[1];
var poll = captured ? captured : 'test';

//GENERATE POLL SELECTION MENU
var holder = "test";

d3.select(".dropdown").selectAll(".list")
.data(data).enter().append("div")
.attr("class","list")
.html(function (d){ 
  if (d.tag != holder) { holder = d.tag; return "<a href='index.html?poll='" + d.tag + " class='loadLink'><li class='card' data='" + d.tag + "''>" + d.year + " | " + d.question + "</li></a>"; }
});

$(document).ready(function() {
  $(".loadLink").each(function(){
    $(this).attr("href","index.html?poll=" + $(this).find("li").attr("data") + "");
});
  $(".loadLink").click(function(){

    window.location.href = $(this).attr("href");
  });
});

colors = ['#000000', '#737373', '#969696', '#bdbdbd', '#d9d9d9', '#f0f0f0'];

var tag = poll;

spillResults(tag,"#chartBox0","#chartBox1","#chartBox2");

function spillResults(tag,section0,section1,section2) {
    $(section0).html("");
    $(section1).html("");
    $(section2).html("");

    askQuestion(tag,"#question");

  if (verifySections(tag,"Total") > 1) {  chartPolls(tag,"Total",section0,0); }

  if (verifySections(tag,"Democrat") > 1 || verifySections(tag,"Republican") > 1) {  pinCategory("Party",section1); }
  if (verifySections(tag,"Democrat") > 1) {  chartPolls(tag,"Democrat",section1,1); spitTables(tag,"Democrat",section1,1); }
  if (verifySections(tag,"Republican") > 1) {  chartPolls(tag,"Republican",section1,2); spitTables(tag,"Republican",section1,2); }
  if (verifySections(tag,"Independent") > 1) {  chartPolls(tag,"Independent",section1,3); spitTables(tag,"Independent",section1,3); }
  if (verifySections(tag,"Other/None") > 1) {  chartPolls(tag,"Other/None",section1,4); spitTables(tag,"Other/None",section1,4); }

  if (verifySections(tag,"Trump voters") > 1) {  pinCategory("Voters",section1); }
  if (verifySections(tag,"Trump voters") > 1) {  chartPolls(tag,"Trump voters",section1,26); spitTables(tag,"Trump voters",section1,26); }
  if (verifySections(tag,"Clinton voters") > 1) {  chartPolls(tag,"Clinton voters",section1,27); spitTables(tag,"Clinton voters",section1,27); }
  if (verifySections(tag,"Other/Did not vote") > 1) {  chartPolls(tag,"Other/Did not vote",section1,28); spitTables(tag,"Other/Did not vote",section1,28); }

  if (verifySections(tag,"Men") > 1) {  pinCategory("Gender",section1); }
  if (verifySections(tag,"Men") > 1) {  chartPolls(tag,"Men",section1,5); spitTables(tag,"Men",section1,5); }
  if (verifySections(tag,"Women") > 1) {  chartPolls(tag,"Women",section1,6); spitTables(tag,"Women",section1,6); }

  if (verifySections(tag,"Hennepin & Ramsey") > 1) {  pinCategory("Region",section1); }
  if (verifySections(tag,"Hennepin & Ramsey") > 1) {  chartPolls(tag,"Hennepin & Ramsey",section1,9); spitTables(tag,"Hennepin & Ramsey",section1,9); }
  if (verifySections(tag,"Metro Suburbs") > 1) {  chartPolls(tag,"Metro Suburbs",section1,10); spitTables(tag,"Metro Suburbs",section1,10); }
  if (verifySections(tag,"Rest of State") > 1) {  chartPolls(tag,"Rest of State",section1,11); spitTables(tag,"Rest of State",section1,11); }
  if (verifySections(tag,"Northern Minnesota") > 1) {  chartPolls(tag,"Northern Minnesota",section1,22); spitTables(tag,"Northern Minnesota",section1,22); }
  if (verifySections(tag,"Southern Minnesota") > 1) {  chartPolls(tag,"Southern Minnesota",section1,23); spitTables(tag,"Southern Minnesota",section1,23); }

  if (verifySections(tag,"< $50,000") > 1) {  pinCategory("Income",section2);  }
  if (verifySections(tag,"< $50,000") > 1) {  chartPolls(tag,"< $50,000",section2,7); spitTables(tag,"< $50,000",section2,7);  }
  if (verifySections(tag,"> $50,000") > 1) {  chartPolls(tag,"> $50,000",section2,8); spitTables(tag,"> $50,000",section2,8);  }

  if (verifySections(tag,"Age 18-34") > 1) {  pinCategory("Age",section2); }
  if (verifySections(tag,"Age 18-34") > 1) {  chartPolls(tag,"Age 18-34",section2,12); spitTables(tag,"Age 18-34",section2,12); }
  if (verifySections(tag,"Age 35-49") > 1) {  chartPolls(tag,"Age 35-49",section2,13); spitTables(tag,"Age 35-49",section2,13); }
  if (verifySections(tag,"Age 50-64") > 1) {  chartPolls(tag,"Age 50-64",section2,14); spitTables(tag,"Age 50-64",section2,14); }
  if (verifySections(tag,"Age 65+") > 1) {  chartPolls(tag,"Age 65+",section2,15); spitTables(tag,"Age 65+",section2,15); }

  if (verifySections(tag,"White") > 1) {  pinCategory("Race",section1); }
  if (verifySections(tag,"White") > 1) {  chartPolls(tag,"White",section1,16); spitTables(tag,"White",section1,16); }
  if (verifySections(tag,"Black") > 1) {  chartPolls(tag,"Black",section1,17); spitTables(tag,"Black",section1,17); }
  if (verifySections(tag,"Hispanic") > 1) {  chartPolls(tag,"Hispanic",section1,18); spitTables(tag,"Hispanic",section1,18); }
  if (verifySections(tag,"Asian") > 1) {  chartPolls(tag,"Asian",section1,19); spitTables(tag,"Asian",section1,19); }
  if (verifySections(tag,"Native") > 1) {  chartPolls(tag,"Native",section1,20); spitTables(tag,"Native",section1,20); }
  if (verifySections(tag,"Other") > 1) {  chartPolls(tag,"Other",section1,21); spitTables(tag,"Other",section1,21); }

  if (verifySections(tag,"High School/Some College") > 1) {  pinCategory("Education",section2); }
  if (verifySections(tag,"High School/Some College") > 1) {  chartPolls(tag,"High School/Some College",section2,24); spitTables(tag,"High School/Some College",section2,24); }
  if (verifySections(tag,"College Graduate") > 1) {  chartPolls(tag,"College Graduate",section2,25); spitTables(tag,"College Graduate",section2,25); }
    overview(tag);
    buildLegend(tag,"#legendBox");
}



function verifySections(tag,demographic){
    var count = d3.nest()
  .key(function(d) { return d.tag == tag && d.demographic == demographic; })
  .rollup(function(v) { return v.length; })
  .entries(data);

  var results = count; 

  return results.length;
}

function askQuestion(tag,section){
  for (i=0; i<data.length; i++){
    if (data[i].tag == tag && data[i].demographic == "main") {
      $(section).html("<div class='question'>" + data[i].question + "</div");
    }
  }
}

function buildLegend(tag,section) {
  var legendString = "";
  var colorIndex = 0;
  // var colorRange = ['#2c3942', '#556e7f', '#7f98aa', '#a8b9c5', '#c6d1d9', '#dae1e7'];
  // var colorRange = ['#9B9382', '#A39F97', '#BFBAAF', '#E2D4B7', '#DBD4C7', '#E2DBCE'];
  for (i=0; i<data.length; i++){
    if (data[i].tag == tag && data[i].demographic == "main") {
      if (data[i].answer1 != "null") { legendString += "<div class='legendBlock' style='background-color:" + colors[0] + "'></div> <div class='legendText'>" + data[i].answer1 + "</div>"; }
      if (data[i].answer2 != "null") { legendString += "<div class='legendBlock' style='background-color:" + colors[1] + "'></div> <div class='legendText'>" + data[i].answer2 + "</div>"; }
      if (data[i].answer3 != "null") { legendString += "<div class='legendBlock' style='background-color:" + colors[2] + "'></div> <div class='legendText'>" + data[i].answer3 + "</div>"; }
      if (data[i].answer4 != "null") { legendString += "<div class='legendBlock' style='background-color:" + colors[3] + "'></div> <div class='legendText'>" + data[i].answer4 + "</div>"; }
      if (data[i].answer5 != "null") { legendString += "<div class='legendBlock' style='background-color:" + colors[4] + "'></div> <div class='legendText'>" + data[i].answer5 + "</div>"; }
      if (data[i].answer6 != "null") { legendString += "<div class='legendBlock' style='background-color:" + colors[5] + "'></div> <div class='legendText'>" + data[i].answer6 + "</div>"; }
      if (data[i].answer7 != "null") { legendString += "<div class='legendBlock' style='background-color:" + colors[6] + "'></div> <div class='legendText'>" + data[i].answer7 + "</div>"; }
      if (data[i].answer8 != "null") { legendString += "<div class='legendBlock' style='background-color:" + colors[0] + "'></div> <div class='legendText'>" + data[i].answer8 + "</div>"; }
      if (data[i].answer9 != "null") { legendString += "<div class='legendBlock' style='background-color:" + colors[0] + "'></div> <div class='legendText'>" + data[i].answer9 + "</div>"; }
      if (data[i].answer10 != "null") { legendString += "<div class='legendBlock' style='background-color:" + colors[0] + "'></div> <div class='legendText'>" + data[i].answer10 + "</div>"; }
      if (data[i].answer11 != "null") { legendString += "<div class='legendBlock' style='background-color:" + colors[0] + "'></div> <div class='legendText'>" + data[i].answer11 + "</div>"; }
      if (data[i].answer12 != "null") { legendString += "<div class='legendBlock' style='background-color:" + colors[0] + "'></div> <div class='legendText'>" + data[i].answer12 + "</div>"; }
    }
  }
  $(".legendBox").html(legendString);
}

function pinCategory(cat,section){
      $(section).append("<div class='icon'><img src='img/" + cat.toLowerCase() + ".png' /></div><div class='category'>" + cat + "</div>");
}

function chartPolls(tag,demographic,section,index) {
  var count = d3.nest()
  .key(function(d) { return d.tag == tag && d.demographic == demographic; })
  .entries(data);

  var resultsString = count[1].values[0];
  
  var boxID = tag + "_" + index;
  // $(section).append("<div class='demo' rel="  + demographic + ">" + demographic + "</div>");
  $(section).append("<div rel='"  + demographic + "' id='" + boxID + "' class='chartLabel'>" + demographic + "</div>");
  $(section).append("<div rel='"  + demographic + "' id='" + boxID + "' class='chart'><svg></svg></div>");

  var chart;
nv.addGraph(function() {
  chart = nv.models.multiBarHorizontalChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .margin({top: 10, right: 20, bottom: 15, left: 20})
      .color(colors)
      .stacked(true)
      .showValues(false)
      .showLegend(false)
      .showControls(false);

  // chart.tooltip.enabled(true);

  chart.yAxis
      .tickFormat(d3.format('%'));

  d3.select('#' + boxID + ' svg')
      .datum(datatest)
    .transition().duration(500)
      .call(chart);

  nv.utils.windowResize(chart.update);

  var $doc = $(document);
  var centerX = $doc.width() / -2;

  // d3.selectAll(".nv-legendWrap").attr("transform","translate(" + centerX + ",-30)");

  return chart;
});

var $doc = $("#chartBox");
var centerX = $doc.width() / -2;

// d3.selectAll(".nv-legendWrap").attr("transform","translate(" + centerX + ",-30)");
if (resultsString.answer12 != "null"){
var datatest = [
  {
    "key": resultsString.answer1,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer1_pct)
      }
    ]
  },
  {
    "key": resultsString.answer2,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer2_pct)
      }
    ]
  },
  {
    "key": resultsString.answer3,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer3_pct)
      }
    ]
  },
  {
    "key": resultsString.answer4,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer4_pct)
      }
    ]
  },
  {
    "key": resultsString.answer5,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer5_pct)
      }
    ]
  },
  {
    "key": resultsString.answer6,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer6_pct)
      }
    ]
  },
  {
    "key": resultsString.answer7,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer7_pct)
      }
    ]
  },
  {
    "key": resultsString.answer8,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer8_pct)
      }
    ]
  },
  {
    "key": resultsString.answer9,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer9_pct)
      }
    ]
  },
  {
    "key": resultsString.answer10,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer10_pct)
      }
    ]
  },
  {
    "key": resultsString.answer11,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer11_pct)
      }
    ]
  },
  {
    "key": resultsString.answer12,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer12_pct)
      }
    ]
  }
]
}
else if (resultsString.answer11 != "null"){
var datatest = [
  {
    "key": resultsString.answer1,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer1_pct)
      }
    ]
  },
  {
    "key": resultsString.answer2,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer2_pct)
      }
    ]
  },
  {
    "key": resultsString.answer3,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer3_pct)
      }
    ]
  },
  {
    "key": resultsString.answer4,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer4_pct)
      }
    ]
  },
  {
    "key": resultsString.answer5,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer5_pct)
      }
    ]
  },
  {
    "key": resultsString.answer6,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer6_pct)
      }
    ]
  },
  {
    "key": resultsString.answer7,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer7_pct)
      }
    ]
  },
  {
    "key": resultsString.answer8,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer8_pct)
      }
    ]
  },
  {
    "key": resultsString.answer9,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer9_pct)
      }
    ]
  },
  {
    "key": resultsString.answer10,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer10_pct)
      }
    ]
  },
  {
    "key": resultsString.answer11,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer11_pct)
      }
    ]
  }
]
}
else if (resultsString.answer10 != "null"){
var datatest = [
  {
    "key": resultsString.answer1,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer1_pct)
      }
    ]
  },
  {
    "key": resultsString.answer2,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer2_pct)
      }
    ]
  },
  {
    "key": resultsString.answer3,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer3_pct)
      }
    ]
  },
  {
    "key": resultsString.answer4,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer4_pct)
      }
    ]
  },
  {
    "key": resultsString.answer5,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer5_pct)
      }
    ]
  },
  {
    "key": resultsString.answer6,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer6_pct)
      }
    ]
  },
  {
    "key": resultsString.answer7,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer7_pct)
      }
    ]
  },
  {
    "key": resultsString.answer8,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer8_pct)
      }
    ]
  },
  {
    "key": resultsString.answer9,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer9_pct)
      }
    ]
  },
  {
    "key": resultsString.answer10,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer10_pct)
      }
    ]
  }
]
}
else if (resultsString.answer9 != "null"){
var datatest = [
  {
    "key": resultsString.answer1,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer1_pct)
      }
    ]
  },
  {
    "key": resultsString.answer2,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer2_pct)
      }
    ]
  },
  {
    "key": resultsString.answer3,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer3_pct)
      }
    ]
  },
  {
    "key": resultsString.answer4,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer4_pct)
      }
    ]
  },
  {
    "key": resultsString.answer5,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer5_pct)
      }
    ]
  },
  {
    "key": resultsString.answer6,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer6_pct)
      }
    ]
  },
  {
    "key": resultsString.answer7,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer7_pct)
      }
    ]
  },
  {
    "key": resultsString.answer8,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer8_pct)
      }
    ]
  },
  {
    "key": resultsString.answer9,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer9_pct)
      }
    ]
  }
]
}
else if (resultsString.answer8 != "null"){
var datatest = [
  {
    "key": resultsString.answer1,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer1_pct)
      }
    ]
  },
  {
    "key": resultsString.answer2,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer2_pct)
      }
    ]
  },
  {
    "key": resultsString.answer3,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer3_pct)
      }
    ]
  },
  {
    "key": resultsString.answer4,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer4_pct)
      }
    ]
  },
  {
    "key": resultsString.answer5,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer5_pct)
      }
    ]
  },
  {
    "key": resultsString.answer6,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer6_pct)
      }
    ]
  },
  {
    "key": resultsString.answer7,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer7_pct)
      }
    ]
  },
  {
    "key": resultsString.answer8,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer8_pct)
      }
    ]
  }
]
}
else if (resultsString.answer7 != "null"){
var datatest = [
  {
    "key": resultsString.answer1,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer1_pct)
      }
    ]
  },
  {
    "key": resultsString.answer2,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer2_pct)
      }
    ]
  },
  {
    "key": resultsString.answer3,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer3_pct)
      }
    ]
  },
  {
    "key": resultsString.answer4,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer4_pct)
      }
    ]
  },
  {
    "key": resultsString.answer5,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer5_pct)
      }
    ]
  },
  {
    "key": resultsString.answer6,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer6_pct)
      }
    ]
  },
  {
    "key": resultsString.answer7,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer7_pct)
      }
    ]
  }
]
}
else if (resultsString.answer6 != "null"){
var datatest = [
  {
    "key": resultsString.answer1,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer1_pct)
      }
    ]
  },
  {
    "key": resultsString.answer2,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer2_pct)
      }
    ]
  },
  {
    "key": resultsString.answer3,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer3_pct)
      }
    ]
  },
  {
    "key": resultsString.answer4,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer4_pct)
      }
    ]
  },
  {
    "key": resultsString.answer5,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer5_pct)
      }
    ]
  },
  {
    "key": resultsString.answer6,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer6_pct)
      }
    ]
  }
]
}
else if (resultsString.answer5 != "null"){
var datatest = [
  {
    "key": resultsString.answer1,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer1_pct)
      }
    ]
  },
  {
    "key": resultsString.answer2,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer2_pct)
      }
    ]
  },
  {
    "key": resultsString.answer3,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer3_pct)
      }
    ]
  },
  {
    "key": resultsString.answer4,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer4_pct)
      }
    ]
  },
  {
    "key": resultsString.answer5,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer5_pct)
      }
    ]
  }
]
}
else if  (resultsString.answer4 != "null"){
var datatest = [
  {
    "key": resultsString.answer1,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer1_pct)
      }
    ]
  },
  {
    "key": resultsString.answer2,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer2_pct)
      }
    ]
  },
  {
    "key": resultsString.answer3,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer3_pct)
      }
    ]
  },
  {
    "key": resultsString.answer4,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer4_pct)
      }
    ]
  }
]
}

else {
var datatest = [
  {
    "key": resultsString.answer1,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer1_pct)
      }
    ]
  },
  {
    "key": resultsString.answer2,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer2_pct)
      }
    ]
  },
  {
    "key": resultsString.answer3,
    "values": [
      { 
        "label" : demographic ,
        "value" : Number(resultsString.answer3_pct)
      }
    ]
  }
]
}

}

function overview(tag){

// $(document).bind('DOMNodeInserted', function(event) {
// $(document).ready(function() {
//   $(".card").click(function() {
//    spillResults($(this).attr("data"),"#chartBox");
//   });

var forNum = 0;
var againstNum = 0;
var forLabel;
var againstLabel;

for (i=0; i<data.length; i++){
    if (data[i].tag == tag && data[i].demographic == "Total") {
      var forNum = Number(data[i].answer1_pct * 100);
      var againstNum = Number(data[i].answer2_pct * 100);
      forLabel = data[i].answer1;
      againstLabel = data[i].answer2;
    }
 }

$(".forLabel").html("" + forLabel);
$(".againstLabel").html("" + againstLabel);

$({countNum: $('.for').text()}).animate({countNum: Math.round(forNum)}, {
  duration: 1000,
  easing:'linear',
  step: function() {
    $('.for').text(Math.floor(this.countNum));
  },
  complete: function() {
    $('.for').text(this.countNum);
  }
});

$({countNum: $('.for').text()}).animate({countNum: Math.round(againstNum)}, {
  duration: 1000,
  easing:'linear',
  step: function() {
    $('.against').text(Math.floor(this.countNum));
  },
  complete: function() {
    $('.against').text(this.countNum);
  }
});

// });
}

function spitTables(tag,demographic,section,index) {
  var count = d3.nest()
  .key(function(d) { return d.tag == tag && d.demographic == demographic; })
  .entries(data);

  var boxID = tag + "_" + index + "Table";

  $(section).append("<div rel='"  + demographic + "' id='" + boxID + "' class='table'></div>");

    var table = d3.select("#" + boxID).append('table')
    var thead = table.append('thead')
    var tbody = table.append('tbody');

    var columns = [];
    var rows = [];

    var resultsString = count[1].values[0];

    var trigger = [];
    trigger[0] = null;

    columns[0] = "Category";
    if (resultsString.answer1 != "null") { columns[1] = resultsString.answer1; }
    if (resultsString.answer2 != "null") { columns[2] = resultsString.answer2; }
    if (resultsString.answer3 != "null") { columns[3] = resultsString.answer3; }
    if (resultsString.answer4 != "null") { columns[4] = resultsString.answer4; }
    if (resultsString.answer5 != "null") { columns[5] = resultsString.answer5; }
    if (resultsString.answer6 != "null") { columns[6] = resultsString.answer6; }
    if (resultsString.answer7 != "null") { columns[7] = resultsString.answer7; }
    if (resultsString.answer8 != "null") { columns[8] = resultsString.answer8; }
    if (resultsString.answer9 != "null") { columns[9] = resultsString.answer9; }
    if (resultsString.answer10 != "null") { columns[10] = resultsString.answer10; }
    if (resultsString.answer11 != "null") { columns[11] = resultsString.answer11; }
    if (resultsString.answer12 != "null") { columns[12] = resultsString.answer12; }
  

    rows[0] = demographic;
    if (resultsString.answer1 != "null") { rows[1] = resultsString.answer1_pct; }
    if (resultsString.answer2 != "null") { rows[2] = resultsString.answer2_pct; }
    if (resultsString.answer3 != "null") { rows[3] = resultsString.answer3_pct; }
    if (resultsString.answer4 != "null") { rows[4] = resultsString.answer4_pct; }
    if (resultsString.answer5 != "null") { rows[5] = resultsString.answer5_pct; }
    if (resultsString.answer6 != "null") { rows[6] = resultsString.answer6_pct; }
    if (resultsString.answer7 != "null") { rows[7] = resultsString.answer7_pct; }
    if (resultsString.answer8 != "null") { rows[8] = resultsString.answer8_pct; }
    if (resultsString.answer9 != "null") { rows[9] = resultsString.answer9_pct; }
    if (resultsString.answer10 != "null") { rows[10] = resultsString.answer10_pct; }
    if (resultsString.answer11 != "null") { rows[11] = resultsString.answer11_pct; }
    if (resultsString.answer12 != "null") { rows[12] = resultsString.answer12_pct; }

    // append the header row
    if (demographic == "Age 18-34" || demographic == "< $50,000" || demographic == "Men" || demographic == "Democrat" || demographic == "Hennepin & Ramsey" || demographic == "High School/Some College"){
    thead.append('tr')
      .attr("class","headers")
      .selectAll('th')
      .data(columns).enter()
      .append('th')
        .text(function (column) { return column; });
      }

    // create a row for each object in the data
    var rowsAll = tbody.selectAll('tr')
      .data(trigger)
      .enter()
      .append('tr');

    // create a cell in each row for each column
    var cells = rowsAll.selectAll('td')
      .data(rows)
      .enter()
      .append('td')
        .text(function (d) {  
          if (isNaN(d)) { return d; }
          else { return d3.format("%")(d) }
      });

    $(boxID + " .headers:not(:first)").hide();

}



$(".switchIcon").on("click",function(){
  $(".switchIcon").removeClass("thisView");
  $(this).addClass("thisView");
  $(".chart, .chartLabel, .table").hide();
  $("." + $(this).attr("view")).show();
  if ($(this).attr("view") == "chart") { $(".chartLabel").show(); }
  $("#chartBox0 .chart").show();
  $("#chartBox0 .chartLabel").show();
});

});
},{}]},{},[1])
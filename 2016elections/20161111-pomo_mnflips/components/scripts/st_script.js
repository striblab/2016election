var thisView = "us";
var rflips = 0;

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
         break;
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
           break;
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
           break;
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
           break;
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
    if (district == "Wisconsin" || district == "Michigan" || district == "Florida" || district == "Ohio" || district == "Pennsylvania" || district == "Iowa") {
      return "#550000";
    }

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


//ALL OTHER MAPS
function mapBuild(container, boxContainer, chartContainer, shape, race, geo, level, dataCompare, dataCompare2012, index, visible) {

if (geo=="us") { var width = 800, height = 600, centered; var projection = d3.geo.albersUsa().scale(1000).translate([400, 210]); }
else if (geo=="mn") { var width = 800, height = 600, centered; var projection = d3.geo.albersUsa().scale(5037).translate([50, 970]); }
else if (geo=="metro") { var width = 800, height = 600, centered; var projection = d3.geo.mercator().scale([21000]).center([-92.7,45.059134]); }

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
        if (race == "precincts"){ 
          for (var i=0; i < dataCompare.length; i++){
            if (Number(dataCompare[i].vtdcode) == Number(d.properties.VTDID)){
              if (dataCompare[i].Winner == "D"){
                if (dataCompare[i].D >= .70) { return "#3585BC"; }
                else { return "#72A9D6"; }
              } else if (dataCompare[i].Winner == "R"){
                if (dataCompare[i].R >= .70) { return "#d34A44"; }
                else { return "#f7816E"; }   
              }
            }
          }
          return "#cccccc"; 
        }
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
         else if (race == "countyShift") { 

          var rFlips = ["01005","08015","12103","13007","17003","19045","23025","23031","25005","27069","28107","35007","36077","36103","37017","37117","37127","45031","51029","53009","53015","53045","55023","05147","19111","23007","23027","19171","09009","09011","12065","18035","36105","36115","37155","38005","39043","26053","26099","27013","27023","27027","27073","27107","30005","30085","33009","34033","51057","53049","42049","45029","45065","46137","18123","21063","55011","55029","55069","55121","01035","06099","10001","13289","33017","34015","36053","42095","45017","36063","36075","36091","36113","23003","26115","27061","08055","51033","51125","55001","55043","55057","08071","17155","25027","36071","48245","44007","26073","50009","39123","36031","37153","23013","13239","17187","19089","19099","19105","19115","18091","19019","19175","26101","46031","36011","26159","36027","27055","39155","27155","37077","38073","39007","41057","26017","45011","51580","53027","19127","55033","55053","19033","19043","55099","19131","55139","19005","19015","19031","19067","46091","50001","23001","13099","17131","19187","19191","17195","17201","35061","17071","17085","36033","17095","36083","36085","36089","36099","12087","51550","28149","25013","26025","27007","31173","27087","27103","33013","27131","27151","28017","30041","35023","44003","45023","50015","18167","19017","39093","47069","19037","19039","19061","19065","39113","39133","19101","39143","19139","19179","19195","36007","38081","55021","55059","17057","55065","55091","17073","55101","55123","12111","13093","39173","21073","23019","27071","26155","41009","50021","18127","51193","55113","27099","27169","37073","27045","46037","46109","55041","26045","19057","23017","28113","55077","19097","36023","19157","50013","27047","13225","38091","42079","26085","26145","55103","08021","17015"]
          dFlips = ["06019","13135","13151","49035","06059","06065","30031","48261","51121","42029","06057","42027","24003","49043","53075","13067","31109","37189","31055","48157","33011"]

          // var r2016 = fetchData(d.properties.GEOID,null,"votesR",dataCompare,race); 
          // var d2016 = fetchData(d.properties.GEOID,null,"votesD",dataCompare,race); 
          // var r2012 = fetchData(d.properties.GEOID,null,"votesR",dataCompare2012,race);
          // var d2012 = fetchData(d.properties.GEOID,null,"votesD",dataCompare2012,race);

          for (var i=0; i<rFlips.length; i++){
            if (rFlips[i] == d.properties.GEOID) { rflips++; return "#550000"; }
          }
          for (var i=0; i<dFlips.length; i++){
            if (dFlips[i] == d.properties.GEOID) {  return "#0B4474"; }
          }

          // if (r2016 > d2016 && d2012 > r2012) {  return "#550000"; }
          // if (r2016 > d2016 && r2012 > d2012) { return "#d34A44"; }
          // if (d2016 > r2016 && r2012 > d2012) {  $("#spill").append("<div>" + d.properties.GEOID + "</div>"); return "#0B4474"; }
          // if (d2016 > r2016 && d2012 > r2012) { return "#3585BC"; }

          // return lean;
        }
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
        else if (race == "county" || race == "countyShift"){ spillInfo(fetchData(d.properties.GEOID,null,"table",dataCompare,race,null,d.properties.NAME)); }
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
      .style("stroke-width", function(d){ if (race != "precincts") { return "0.3px" } else { return "0.05px"; } })
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
        if (race == "precincts"){ 
          var found = false;
          for (var i=0; i < dataCompare.length; i++){
            if (Number(dataCompare[i].vtdcode) == Number(d.properties.VTDID)){
              found = true;
            } 
          }
          if (found = false) { return "noclicky"; }
        }
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
          if (race == "county" || race == "countyShift"){ 
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
         else if (race == "county" || race == "countyShift") { return fetchData(d.properties.GEOID,null,"tooltip",dataCompare,race,null,d.properties.NAME); }
         else if (race = "precincts") { 
          for (var i=0; i < dataCompare.length; i++){
            if (Number(dataCompare[i].vtdcode) == Number(d.properties.VTDID)){
              return "<div class='districtName'>" + d.properties.PCTNAME + "</div><div class='candidate'>Clinton &#x2714;</div><div class='pct' style='background-color:#72A9D6'>" + d3.format("%")(dataCompare[i].D) + "</div><div class='smallbreak'></div><div class='candidate'>Trump</div><div class='pct' style='background-color:#d34A44'>" + d3.format("%")(dataCompare[i].R) + "</div>";
            }
          }
          return "<div class='districtName'>" + d.properties.PCTNAME + "</div>"; 
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

      console.log(rflips);
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

if (race != "precincts"){
  g.selectAll("." + race + " path")
      .classed("faded", true)
      .classed("active", centered && function(d) { return d === centered; });
    }

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

  if (race == "precincts") { g.selectAll("path").style("stroke-width", "0.03px"); } else { g.selectAll("path").style("stroke-width", "0.3px"); }
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

  g.selectAll("path").style("stroke-width", "0.03px");
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



var race = "president";
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

function mapSpill(race, data, dataPCT){

  if (race == "president"){
    mapBuild("#president .geo", "#districtName", "#chart", "us_states.json", race, "us", "country", data);
    mapBuild("#president .geo", "#districtName", "#chart", "us_counties.json", "county", "us", "counties", data);
    mapBuild("#president .geo", "#districtName", "#chart", "us_counties.json", "countyShift", "us", "countiesShift", data);
    mapBuild("#president .geo", "#infobox", "#chart", "mnprecincts.json", "precincts", "us", "precincts", dataPCT);
    // electoralCarto(data);
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

function toggleyBits(data1,data2,data3,data4,data5,data6,data7,reload,data8){
  var loadState = 0;

function loadBars(race){
  if (race == "president") { prezCrunch(data1,data7,data8); } 
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

  $(".chatter").hide();
  $("#chatter" + $(this).attr("index")).show();

  $(".slide").hide();
  $("#" + $(this).attr("slide")).show();

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
var apiStringPrez = "./data/prezCounty2016.json";
// var apiStringPrez12 = "./data/prezCounty2012.json";
var apiStringPCT = "./data/pct.json";
// var apiStringSen = "https://s3-us-west-2.amazonaws.com/strib-elections-ap-api/us-ussenate-by-state/full.json";
// var apiStringGov = "https://s3-us-west-2.amazonaws.com/strib-elections-ap-api/us-governors-by-state/full.json";
// var apiStringMNS = "https://s3-us-west-2.amazonaws.com/strib-elections-ap-api/mn-mnsenate-by-district/full.json";
// var apiStringMNH = "https://s3-us-west-2.amazonaws.com/strib-elections-ap-api/mn-mnhouse-by-district/full.json";
// var apiStringHouse = "https://s3-us-west-2.amazonaws.com/strib-elections-ap-api/us-ushouse-by-state/full.json";
var apiStringEVCD = "https://s3-us-west-2.amazonaws.com/strib-elections-ap-api/us-uspresident-nebraska-maine/full.json";

d3.json(apiStringPrez + '?' + (Math.floor(Math.random() * 1000)), function(error1, jsonSpillPrez) {
// d3.json(apiStringPrez12 + '?' + (Math.floor(Math.random() * 1000)), function(error1, jsonSpillPrez12) {
// d3.json(apiStringSen + '?' + (Math.floor(Math.random() * 1000)), function(error2, jsonSpillSen) {
// d3.json(apiStringGov + '?' + (Math.floor(Math.random() * 1000)), function(error3, jsonSpillGov) {
// d3.json(apiStringMNS + '?' + (Math.floor(Math.random() * 1000)), function(error4, jsonSpillMNS) {
// d3.json(apiStringMNH + '?' + (Math.floor(Math.random() * 1000)), function(error5, jsonSpillMNH) {
// d3.json(apiStringHouse + '?' + (Math.floor(Math.random() * 1000)), function(error6, jsonSpillHouse) {
d3.json(apiStringEVCD + '?' + (Math.floor(Math.random() * 1000)), function(error7, jsonSpillEVCD) {
d3.json(apiStringPCT + '?' + (Math.floor(Math.random() * 1000)), function(error7, jsonSpillPCT) {

//JUST IN CASE OF THERMONUCLEAR DISASTER
function fallback(){
  var mapsString = "<img src='http://static.startribune.com/news/elections/frontpage_bars_maps.png' width='100%' />";
  var mobileString = "<img src='http://static.startribune.com/news/elections/frontpage_bars_desktop.png' width='100%' />";
  $("#fulldataviz, #loader").hide();
  $("#fallback").html("<div style='padding:20px; text-align:center;'>We're experiencing technical difficulties, please check back shortly.</div><div>" + mapsString + "</div><div>" + mobileString + "</div>");
  // $("#fallback").html("FALLBACKS!!!11~");
  $("#fallback").show();
}

// if (error1 != null || error2 != null || error3 != null || error4 != null || error5 != null || error6 != null || error7 != null) {
//    fallback(); 
//    return;
// }

var dataPrez = jsonSpillPrez;
var dataPCT = jsonSpillPCT.pct;
// var dataPrez12 = jsonSpillPrez12;
// var dataSen = jsonSpillSen;
// var dataGov = jsonSpillGov;
// var dataMNS = jsonSpillMNS;
// var dataMNH = jsonSpillMNH;
// var dataHouse = jsonSpillHouse;
var dataEVCD = jsonSpillEVCD;

mapSpill("president",dataPrez,dataPCT);
// if ($(window).width() > 500) { mapSpill("senate",dataSen); }
// if ($(window).width() > 500) { mapSpill("governors",dataGov); }
// mapSpill("mnsenate",dataMNS);
// mapSpill("mnhouse",dataMNH);
// mapSpill("house",dataHouse);

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

toggleyBits(dataPrez,null,null,null,null,null,dataEVCD,false,dataPCT);

spillInfo(fetchData("United States","United States","table",dataPrez,"president"));

$(".dparty").html("Clinton");
$(".rparty").html("Trump");
$("#prezButton").trigger("click");
$("#table .president").show();
$("#wrapper").show();

window.setTimeout(function () { $("#message").html("<div class='message'>Rendering results...</div><img src='http://stmedia.startribune.com/designimages/ajax-loader.gif' class='loader-img'>"); }, 4000);

window.setTimeout(function () {
  
  $(".loading-mask").hide();
  $("#wrapper").show();
  $("#cssmenu, .sideStates").css("opacity",1);

}, 5000);

// });
// });
// });
// });
// });
// });
});
});
}); //end data stream initialization


function chartCounties(){

var  padding = {
        top: 20,
        right: 60,
        bottom: 20,
        left: 120,
    };

var chartPopD = c3.generate({
      bindto: "#countiesChartD",
      padding: padding,
      data: {
            columns: [
                ['Clinton', .75, .42],
                ['Trump', .90, .24]
            ],
        type: 'bar'
        },
        // legend: {
        //     show: false
        // },
            color: {
              pattern: ['#3585BC','#d34A44']
            },
        axis: {
              // rotated: true,
              y: {
                    min: 0,
                    padding: {bottom: 0},
                    tick: {
                     count: 4,
                     format: d3.format('%')
                    }
                },
            x: {
                type: 'category',
                categories: ['White Non-Hispanic','Bachelors or Higher']
            }
        }

});

$(".raceSwitch").click(function(event) { chartPopD.flush(); });

}

function chartPVI(){
var  padding = {
        top: 20,
        right: 40,
        bottom: 20,
        left: 60,
    };

var chartH = c3.generate({
        bindto: '#chartH',
        padding: padding,
    data: {
        x: 'x',
        columns: [
            ['x',1982,1986,1990,1994,1998,2002,2006,2010,2014,2018],
            // ['MN DEM Vote %',0.549,0.465,0.497,0.529,0.435,0.511,0.479,0.511,0.541,0.527],
            // // ['MN GOP Vote %',0.420,0.425,0.495,0.459,0.319,0.350,0.455,0.477,0.438,0.450],
            // ['National DEM Vote %',0.501,0.410,0.406,0.457,0.430,0.492,0.484,0.482,0.529,0.51]
            // ['Minnesota PVI Score',5.15,7.3,8.15,3.85,1.2,0.7,1.2,2.05,1.45]
            ['Minnesota PVI',7,8,8,6,4,3,2,2,2,1]
        ],
        type: 'line'
    },
    point: {
            show: false
        },
    color:  {  pattern: ["#3F88C5"] },
    axis: {
      y: {
            // max: 1,
            min: 0,
            // label: 'Minnesota Electoral Votes',
            padding: {left: 0, right: 0, bottom: 0, top: 0},
            tick: {
             count: 4,
             format: d3.format('+.0f')
            }
        },
        x: {
            // type:'category',
            // categories: ['1976-1980','1980-1984','1984-1988','1988-1992','1992-1996','1996-2000','2000-2004','2004-2008','2008-2012'],
            // categories: ['1994','1998','2002','2006','2010','2014'],
            padding: {left: 0, right: 0, bottom: 0, top: 0},
            tick: {
                values: [1982, 1990, 1998, 2010, 2018],
                count: 5,
                multiline: false
            },
            padding: {
            // left: .7,
            // right: .3
          }
          }
        },
    grid: {
        y: {
          lines: [
                {value: 218, text: '', position: 'start', class:'powerline'}
          ]

        }
    },
        tooltip: {
      contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
          var $$ = this, config = $$.config,
              titleFormat = config.tooltip_format_title || defaultTitleFormat,
              nameFormat = config.tooltip_format_name || function (name) { return name; },
              valueFormat = config.tooltip_format_value || defaultValueFormat,
              text, i, title, value, name, bgcolor;
          for (i = 0; i < d.length; i++) {
              if (! (d[i] && (d[i].value || d[i].value === 0))) { continue; }

              if (! text) {
                  title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                  text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
              }

              name = nameFormat(d[i].name);
              value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
              bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);

              text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
              text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
              text += "<td class='value'>D" + value + "</td>";
              text += "</tr><tr>";
              text += "</tr>";
              
          }
          return text + "</table>";
      }
    }

});

$(".raceSwitch").click(function(event) { chartH.flush(); });
}


function chartBuilder(){
var  padding = {
        top: 20,
        right: 40,
        bottom: 20,
        left: 60,
    };

var chart = c3.generate({
        bindto: '#chartS',
        padding: padding,
    data: {
        x: 'x',
        columns: [
            ['x',1992,1996,2000,2004,2008,2012,2016],
            ['DEM Counties',65,76,18,24,41,28,9],
            ['GOP Counties',22,11,69,63,46,59,78]
        ],
        type: 'line'
    },
    point: {
            show: false
        },
    // legend: {
    //     show: false
    // },
    color:  {  pattern: ["#3F88C5","#A52129"] },
    axis: {
      y: {
            min: 0,
            padding: {bottom: 0},
            tick: {
             values: [0,43,87],
             count: 3,
             format: d3.format('.0f')
            }
        },
        x: {
            tick: {
                values: ['1992', '2000', '2012', '2016'],
                count: 4,
                multiline: false
            },
            padding: {
            left: .7,
            right: .3
          }
          }
        },
    grid: {
        y: {
          // lines: [
          //       {value: 67, text: '', position: 'start', class:'powerline'}
          // ]

        },
        x: {
            // lines: [
            //     {value: 2002, text: 'Midterm', position: 'start'},
            //     {value: 2004, text: 'Bush (R) Win', position: 'start'},
            //     {value: 2006, text: 'Midterm', position: 'start'},
            //     {value: 2008, text: 'Obama (D) Win', position: 'start'},
            //     {value: 2010, text: 'Midterm', position: 'start'},
            //     {value: 2012, text: 'Obama (D) Win', position: 'start'},
            //     {value: 2014, text: 'Midterm', position: 'start'},
            // ]
        }
    }

});

    $(".raceSwitch").click(function(event) { chart.flush(); });
}

d3.json("./data/pollster.json", function(error, dataLoad) {

  var data = dataLoad.pollster;

function spillChart(container, data){
var clintonAxis = [];
var trumpAxis = [];
var uAxis = [];
var oAxis = [];
var clintonNum = [];
var trumpNum = [];
var clintonLine = [];
var trumpLine = [];
var uNum = [];
var oNum = [];

clintonAxis[0] = 'clinton_x';
trumpAxis[0] = 'trump_x';
uAxis[0] = 'u_x';
oAxis[0] = 'o_x';
clintonNum[0] = 'Clinton';
trumpNum[0] = 'Trump';
uNum[0] = 'Undecided/Other';
oNum[0] = 'Other';

var index = 1;

for (var i=0; i < data.length; i++){
  // if (data[i].pollster != "Google Consumer Surveys" && data[i].observations >= 500){
  // if (data[i].pollster == filter){
  clintonAxis[index] = new Date(data[i].entry_date); //d3.time.format("%m-%d-%Y")(new Date(data[i].entry_date));
  trumpAxis[index] = d3.time.format("%m-%d-%Y")(new Date(data[i].entry_date));
  uAxis[index] = d3.time.format("%m-%d-%Y")(new Date(data[i].entry_date));
  oAxis[index] = d3.time.format("%m-%d-%Y")(new Date(data[i].entry_date));
  clintonNum[index] = data[i].clinton;
  trumpNum[index] = data[i].trump;
  uNum[index] = data[i].undecided;
  oNum[index] = data[i].other;
  index++;
 // }
}

var  padding = {
        top: 20,
        right: 30,
        bottom: 20,
        left: 40,
    };

var chart = c3.generate({
      bindto: container,
      padding: padding,
      point: {
        r: 3
    },
    data: {
        xs: { "Clinton": 'clinton_x', "Trump": 'clinton_x' },
        colors:  { 
          'Clinton': "#3F88C5",
          'Trump': "#8C1B17"
          // 'Undecided/Other': "#888888"
        },
        columns: [
            clintonAxis,
            clintonNum,
            trumpNum
        ],
        type: 'scatter'
    },
    axis: {
      y: {
            max: 0.55,
            min: 0.20,
            padding: {bottom: 0, top:0},
            tick: {
             count: 3,
             values: [0,0.25,0.55],
             format: d3.format('%')
            }
        },
        x: {
            type: 'timeseries',
            // categories: ['Contributions'],
            tick: {
                format: "%m-%d-%Y",
                count: 3,
                multiline: false
            }
          }
        },
    grid: {
        y: {
          lines: [
                {value: .46, text: 'Clinton:46%', position: 'start', class:'blueline'},
                {value: .44, text: 'Trump:44%', position: 'start', class:'redline'}
          ]
        }
    },
        tooltip: {
      contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
          var $$ = this, config = $$.config,
              titleFormat = config.tooltip_format_title || defaultTitleFormat,
              nameFormat = config.tooltip_format_name || function (name) { return name; },
              valueFormat = config.tooltip_format_value || defaultValueFormat,
              text, i, title, value, name, bgcolor;
          for (i = 0; i < d.length; i++) {
              if (! (d[i] && (d[i].value || d[i].value === 0))) { continue; }

              if (! text) {
                  title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                  text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
              }

              var pollster = "";

              name = nameFormat(d[i].name);
              value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
              bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);

              // console.log(title);

              for (var k=0; k < data.length; k++){
                if (d3.time.format("%m-%d-%Y")(new Date(data[k].entry_date)) == title){
                  pollster = "<td class='value pollster' colspan='2'>" + data[k].pollster + " (" + data[k].mode + ")</td>";
                  break;
                }
              }

              // if (name != "Undecided/Other") { pollster = ""; }

              text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
              text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
              text += "<td class='value'>" + value + "</td>";
              text += "</tr><tr>";
              text +=  pollster;
              text += "</tr>";
              
          }
          return text + "</table>";
      }
    }

});

   $(".raceSwitch").click(function(event) { chart.flush(); }); 

}

function chartN(){

d3.csv("./data/turnout.csv", function(d) {
  return {
    state: d.ab,
    turnout: +d.turnout,
    turnout2012: +d.turnout2012
  };
}, function(error, rows) {

var dataT = rows;

var x = [];
var turnout = [];
var turnout2012 = [];

x[0] = "x";
turnout[0] = "2016 Turnout";
turnout2012[0] = "2012 Turnout";
// gop[0] = "DFL Vote %";
// dfl[0] = "GOP Vote %";

for (var i=1; i <= dataT.length; i++){
  x[i] = dataT[i-1].state;
  turnout[i] = dataT[i-1].turnout;
  turnout2012[i] = dataT[i-1].turnout2012;
}

var  padding = {
        top: 20,
        right: 60,
        bottom: 20,
        left: 60,
    };

var chartT = c3.generate({
      bindto: "#chartNational",
      padding: padding,
      data: {
            x: 'x',
            columns: [
                x,
                turnout,
                turnout2012
            ],
        types: {
          '2016 Turnout':'bar',
          '2012 Turnout':'bar'
         },
         colors: {
              'Voter Turnout': function(d) { 

                // console.log(d);

              if (d.index == 0 || d.index == 36) { return "#000"; }
              else { return "#bbb"; }
          }
            }
        },
        // legend: {
        //     show: false
        // },
        color:{
          pattern: ["#333","#aaa"]
        },
        axis: {
              rotated: true,
              y: {
                    max: 1,
                    min: 0,
                    padding: {bottom: 0, top: 0},
                    tick: {
                     count: 4,
                     format: d3.format('%')
                    }
                },
            x: {
                type: 'category'
                //  tick: {
                //      values: [1950,1965,1980,1996,2012],
                //      count: 5
                // }
            }
        },
        // regions: [
        //     {axis: 'x', start: '1980', end: '1990', class: 'hottest'},
        // ],
        grid: {
        x: {
            // lines: [
            //     {value: '2000', text: 'Bush (R) Win', position: 'start'},
            //     {value: '2002', text: 'Midterm', position: 'start'},
            //     {value: '2004', text: 'Bush (R) Win', position: 'start'},
            //     {value: '2006', text: 'Midterm', position: 'start'},
            //     {value: '2008', text: 'Obama (D) Win', position: 'start'},
            //     {value: '2010', text: 'Midterm', position: 'start'},
            //     {value: '2012', text: 'Obama (D) Win', position: 'start'},
            //     {value: '2014', text: 'Midterm', position: 'start'},
            // ]
        }
    }
});

$(".raceSwitch").click(function() { 
  chartT.flush(); 
chartT.resize({
  height: 700,
  width: $("#wrapper").innerWidth()
});

});

});

}

  function chartShift(container){
d3.csv("./data/countyShift.csv", function(d) {
  return {
    abb: d.abb,
    rDIFF: +d.rDIFF,
    county: d.county,
    votes: +d.votes
  };
}, function(error, rows) {

var data = rows; 
var axis = [];
var votes = [];

axis[0] = 'shift_x';
votes[0] = 'Votes';

var index = 1;

for (var i=0; i < data.length; i++){
  // if (data[i].pollster != "Google Consumer Surveys" && data[i].observations >= 500){
  // if (data[i].pollster == filter){
  axis[index] = data[i].rDIFF; //d3.time.format("%m-%d-%Y")(new Date(data[i].entry_date));
  votes[index] = data[i].votes;
  index++;
 // }
}

var  padding = {
        top: 20,
        right: 30,
        bottom: 20,
        left: 80,
    };

var chart = c3.generate({
      bindto: container,
      padding: padding,
      point: {
        r: 3
    },
    data: {
        xs: { "Votes": 'shift_x' },
        colors:  { 
          'Votes': "#8C1B17"
        },
        columns: [
            axis,
            votes
        ],
        type: 'scatter'
    },
    legend: { show: false },
    axis: {
      y: {
            padding: {bottom: 0, top:0},
            label: "Total votes",
            tick: {
             format: d3.format(',.0f'),
             count: 3
            }
        },
        x: {
            // type: 'timeseries',
            // categories: ['Contributions'],
            label: "GOP % change",
            tick: {
                // format: "%m-%d-%Y",
                count: 3,
                format: d3.format('+%'),
                multiline: false
            }
          }
        },
    grid: {
        x: {
          lines: [
                {value: 0, text: '0% change', position: 'end', class:'powerline'},
          ]
        }
    },
        tooltip: {
      contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
          var $$ = this, config = $$.config,
              titleFormat = config.tooltip_format_title || defaultTitleFormat,
              nameFormat = config.tooltip_format_name || function (name) { return name; },
              valueFormat = config.tooltip_format_value || defaultValueFormat,
              text, i, title, value, name, bgcolor, raw;
          for (i = 0; i < d.length; i++) {
              if (! (d[i] && (d[i].value || d[i].value === 0))) { continue; }

              if (! text) {
                  title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                  raw = d[i].x;
                  text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
              }

              var county = "";

              name = nameFormat(d[i].name);
              value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
              bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);

              // console.log(title);

              for (var k=0; k < data.length; k++){
                if (data[k].rDIFF == raw){
                  county = "<td class='value pollster' colspan='2'>" + data[k].county + ", " + data[k].abb + "</td>";
                  break;
                }
              }

              // if (name != "Undecided/Other") { pollster = ""; }

              text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
              text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
              text += "<td class='value'>" + value + "</td>";
              text += "</tr><tr>";
              text +=  county;
              text += "</tr>";
              
          }
          return text + "</table>";
      }
    }

});

   $(".raceSwitch").click(function(event) { chart.flush(); }); 
});
}



chartN();
chartCounties();
chartPVI();
chartBuilder();
spillChart("#chartP", data);
chartShift("#chartR");

if (($(window).width() < 500)) { $(".raceSwitch").click(function(event) { $(".chart:not(#chartNational) svg").height(500); $(".chart:not(#chartNational) svg").css("height","500px !important"); }); }

// window.setTimeout(function () { $(".chart").hide(); }, 10000);

});
      
      function DropDown(el) {
        this.dd = el;
        this.placeholder = this.dd.children('span');
        this.opts = this.dd.find('ul.dropdown > li');
        this.val = '';
        this.index = -1;
        this.initEvents();
      }
      DropDown.prototype = {
        initEvents : function() {
          var obj = this;

          obj.dd.on('click', function(event){
            $(this).toggleClass('active');
            return false;
          });

          obj.opts.on('click',function(){
            var opt = $(this);
            obj.val = opt.text();
            obj.index = opt.index();
            obj.placeholder.text(obj.val);
          });
        },
        getValue : function() {
          return this.val;
        },
        getIndex : function() {
          return this.index;
        }
      }

      $(function() {

        var dd = new DropDown( $('#dd') );
        var dd2 = new DropDown( $('#ddY') );

        $(document).click(function() {
          // all dropdowns
          $('.wrapper-dropdown-1').removeClass('active');
        });

      });
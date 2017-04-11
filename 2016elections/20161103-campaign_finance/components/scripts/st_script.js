d3.csv("./data/races.csv", function(d) {
  return {
    race: d.district,
    chamber: d.chamber,
    democrat: d.democrat,
    dLast: d.dLast,
    dI: d.dI,
    republican: d.republican,
    rLast: d.rLast,
    rI: d.rI,
    candX: d.cand_xpend,
    indX: d.ind_xpend,
    totalX: d.total
  };
}, function(error, rows00) {

d3.csv("./data/candidates_master2.csv", function(d) {
  return {
    id: d.CandRegNumb,
    district: d.District,
    party: d.PoliticalParty,
    first: d.CandFirstName,
    last: d.CandLastName,
    total: +d.TotReceipts,
    endcash: +d.EndCash,
    indcontrib: +d.IndContrib,
    ppcontrib: +d.PPContrib,
    pfcontrib: +d.PFContrib,
    lbcontrib: +d.LbContrib,
    pubfin: +d.PubFin,
    miscinc: +d.MiscInc,
    notepayinc: +d.NotePayInc,
    noterecinc: +d.NoteRecInc,
    expend: +d.TotalExpend,
    begin: +d.BeginCash
  };
}, function(error, rows1) {

var dataRaces = rows00;
var dataFilings = rows1;

jQuery.fn.d3Click = function () {
  this.each(function (i, e) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    e.dispatchEvent(evt);
  });
};

jQuery.fn.d3Down = function () {
  this.each(function (i, e) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    e.dispatchEvent(evt);
  });
};

jQuery.fn.d3Up = function () {
  this.each(function (i, e) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    e.dispatchEvent(evt);
  });
};

function mapBuild(container, boxContainer, chartContainer, shape, race, geo, dataCompare, index) {

var width = 320,
    height = 400,
    centered;

if (geo=="us") { var projection = d3.geo.albersUsa().scale(700).translate([330, 200]); }
else if (geo=="mn") { var projection = d3.geo.albersUsa().scale(5037).translate([50, 970]); }
else if (geo=="metro") { var projection = d3.geo.mercator().scale([14800]).center([-92.384033,45.209134]); }

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select(container + " svg")
    .attr("width", width)
    .attr("height", height);

svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height);

var g = svg.append("g");

d3.json("shapefiles/" + shape, function(error, us) {

  g.append("g")
      .attr("class", "states")
    .selectAll("path")
      .data(us.features)
    .enter().append("path")
      .attr("d", path)
      .on("click", clicked)
      .attr("id", function(d) { var str = geo + "_" + d.properties.DISTRICT; return str.replace(new RegExp(" ", "g"),"-"); })
      .attr("precinctName", function(d){ return d.properties.DISTRICT; })
      .attr("class", function(d){
        var select = "";
        if (d.properties.DISTRICT == "01") { select = "activeB "; }
        for (var i=0; i<dataCompare.length; i++){
          if (d.properties.DISTRICT == dataCompare[i].race){
            if (dataCompare[i].totalX >= 500000) { return select + "purple5"; }
            if (dataCompare[i].totalX >= 375000) { return select + "purple4"; }
            if (dataCompare[i].totalX >= 250000) { return select + "purple3"; }
            if (dataCompare[i].totalX >= 125000) { return select + "purple2"; }
            if (dataCompare[i].totalX >= 0) { return select + "purple1"; }
          }
        }
            // return "mid";
        })
       .on("mousedown", function(d, i){  
        if (race == "house"){ dataSpill(d.properties.DISTRICT,"House"); } 
        else if (race == "senate") { dataSpill(d.properties.DISTRICT,"Senate"); }

       // $('.switch').hide();
       // var txt = d.properties.DISTRICT;
       // $("#filter_box").val(txt);
       // $('.switch').each(function(){
       //     if($(this).text().toUpperCase().indexOf(txt.toUpperCase()) != -1){
       //         $(this).show();
       //     }
       // });

       })
      .style("stroke-width", "1px")
      .style("stroke", "#fff")
      .call(d3.helper.tooltip(function(d, i){
        var color = "";
        var total = 0;
          for (var i=0; i<dataCompare.length; i++){
          if (d.properties.DISTRICT == dataCompare[i].race){
            if (dataCompare[i].totalX >= 500000) { color = "purple5"; total = dataCompare[i].totalX; }
            else if (dataCompare[i].totalX >= 375000) { color = "purple4"; total = dataCompare[i].totalX; }
            else if (dataCompare[i].totalX >= 250000) { color = "purple3"; total = dataCompare[i].totalX; }
            else if (dataCompare[i].totalX >= 125000) { color = "purple2"; total = dataCompare[i].totalX; }
            else if (dataCompare[i].totalX >= 0) { color = "purple1"; total = dataCompare[i].totalX; }
          }
        }

        return "<div class='districtName'> District " + d.properties.DISTRICT + "</div><div class='" + color + "'>" + d3.format("$,.0f")(total) + " spent</div>";
      }));

  g.append("path")
      //.datum(topojson.mesh(us, us.features, function(a, b) { return a !== b; }))
      .attr("id", "state-borders")
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

$(".zoom, .switch, #close, .mapSwitch").click(function() {
  clicked2();
});

$(".mapSwitch").click(function() {
  $("#filter input").val("");
});

function clicked(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 6;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 3;
    centered = null;
  }

  d3.selectAll("#mapMetroH path, #mapStateH path, #mapMetroS path, #mapStateS path")
      .classed("activeB", false);

  g.selectAll("path")
      .classed("activeB", centered && function (d) { return d === centered; });
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

  g.selectAll("path")
      .classed("faded", false)
      .classed("active", centered && function (d) { return d === centered; });
}

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
            tooltipDiv.style('left', (absoluteMousePos[0] + 10)+'px')
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
            tooltipDiv.style('left', (absoluteMousePos[0] + 10)+'px')
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

//LOAD RACE LIST
function getRaces() {
    d3.select("#raceSelection").selectAll(".switch")
      .data(dataRaces).enter().append("div")
      .attr("class",function(d) { return "switch " + d.chamber; })
      .attr("chamber",function(d) { return d.chamber; })
      .attr("district",function(d) { return d.race; })
      .on("click",function(d){

      })
      .html(function(d){ 
        if (d.chamber == "House" || d.chamber == "Senate") { return "<div class='cell'>District " + d.race + "</div><div class='cell'>" + d.dLast + " " + d.dI + "</div><div class='cell'>" + d.rLast  + " " + d.rI + "</div><div class='cell kill'>" + d.chamber + "</div>"; }
      });

    $('#filter_box').keyup(function(i){
       $('.switch').hide();
       var txt = $('#filter_box').val();
       $('.switch').each(function(){
           if($(this).text().toUpperCase().indexOf(txt.toUpperCase()) != -1){
               $(this).show();
           }
       });
    });

    $(".sift").click(function()  { 
       $(".sift").removeClass("selected2");
       $(this).addClass("selected2");
       $(".switch").hide();
       $("." + $(this).attr("data")).show();
       $('#raceSelection').animate({scrollTop : 0},800);
       return false;
    });

    $(".switch").click(function()  { 
       $(".switch").removeClass("selected");
       $(this).addClass("selected");
       dataSpill($(this).attr("district"),$(this).attr("chamber"));

       var findDistrict = "mn_" + $(this).attr("district");
       var findMetro = "metro_" + $(this).attr("district");

       $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Down();
       $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Up();
       $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Click();
       $("[id='" + findMetro.replace(new RegExp(" ", "g"),"-") + "']").d3Down();
       $("[id='" + findMetro.replace(new RegExp(" ", "g"),"-") + "']").d3Up();
       $("[id='" + findMetro.replace(new RegExp(" ", "g"),"-") + "']").d3Click();

    });

    $("#listLabels").click(function()  { 
       $("#listR").slideToggle();
       $("#listD").slideToggle();
    });
}

getRaces();

//LOAD DONORS
function getDonors(container, candidate, party){
    d3.select(container).html("");

    d3.select(container).selectAll(".donor")
      .data(dataDonors.filter(function(d) { if (party == null) { return d.id == candidate; } else { if (getCandidates(d.id, true) == party) { return d.id; } } }).sort(function(a,b) {return b.amount-a.amount;})).enter().append("div")
      .attr("class",function(d) { return "donor"; })
      .on("click",function(d){ })
      .html(function(d){ 
        return "<div class='adjacent'>" + d.donor + "</div><div class='adjacent'>" + d3.format("$,.0f")(d.amount) + "</div>";
      });
}


//LOAD CHARTS
function drawChart(container, amount, bigTotal) {

var pct = d3.format("%")(amount[0] / bigTotal);
var indPCT = d3.format("%")(amount[1] / amount[0]);
var ppPCT = d3.format("%")(amount[2] / amount[0]);
var pfPCT = d3.format("%")(amount[3] / amount[0]);
var lbPCT = d3.format("%")(amount[4] / amount[0]);
var pubfinPCT = d3.format("%")(amount[5] / amount[0]);
var miscPCT = d3.format("%")(amount[6] / amount[0]);
var notepayPCT = d3.format("%")(amount[7] / amount[0]);
var noterecPCT = d3.format("%")(amount[8] / amount[0]);

$(container).html("<div class='bigNum'>" + d3.format("$,.0f")(amount[0]) + "</div><div class='bigBar'><div class='inBar' style='height:" + pct + "'><div class='ind' title='"  + d3.format("$,.0f")(amount[1]) +  " independent contributions' style='height:" + indPCT + "'></div><div class='pp' title='"  + d3.format("$,.0f")(amount[2]) +  " political party' style='height:" + ppPCT + "'></div><div class='pf' title='" + d3.format("$,.0f")(amount[3]) +  " political committees' style='height:" + pfPCT + "'></div><div class='lb' title='"  + d3.format("$,.0f")(amount[4]) +  " lobbyist contributions' style='height:" + lbPCT + "'></div><div class='pubfin' title='"  + d3.format("$,.0f")(amount[5]) +  " public financing' style='height:" + pubfinPCT + "'></div><div class='misc' title='"  + d3.format("$,.0f")(amount[6]) +  " miscellaneous' style='height:" + miscPCT + "'></div><div class='notepay' title='"  + d3.format("$,.0f")(amount[7]) +  " receipts loans payable' style='height:" + notepayPCT + "'></div><div class='noterec' title='"  + d3.format("$,.0f")(amount[8]) +  " noterec' style='height:" + noterecPCT + "'></div></div></div><div class='subtotal'><div class='left'>Begin 1/1/16</div><div class='right'>" +  d3.format("$,.0f")(amount[11]) + "</div></div><div class='subtotal'><div class='left'>Raised</div><div class='right'>+" +  d3.format("$,.0f")(amount[0]) + "</div></div><div class='subtotal'><div class='left'>Expenditures</div><div class='right'>-" + d3.format("$,.0f")(amount[9]) + "</div></div><div class='subtotal'><div class='left'>End 12/31/16</div><div class='right'>" + d3.format("$,.0f")(amount[10]) + "</div></div>");

 $( function() {
    $( document ).tooltip();
  } );

}

//LOAD CANDIDATES INFO
function getCandidates(district, party){
  var first, last, city, party, chamber, endcash, indcontrib, ppcontrib, pfcontrib, lbcontrib;
    for (var i=0; i < dataFilings.length; i++){
      if (dataFilings[i].district == district && dataFilings[i].party == party){
        party = dataFilings[i].party;
        first = dataFilings[i].first;
        last = dataFilings[i].last;
      }
    }

    if (party == "DFL"){ 
      $("#partyD").html(party); $("#candD").html("<div>" + first + " " + last + "</div>"); 
    } 
    else if (party == "GOP"){ 
      $("#partyR").html(party); $("#candR").html("<div>" + first + " " + last + "</div>");
    }
}

function getCandidateTotals(district,party){
 var total = [];
 var endcash, indcontrib, ppcontrib, pfcontrib, lbcontrib;
 for (var i=0; i < dataFilings.length; i++){
  
    if (dataFilings[i].district == district && dataFilings[i].party == party){  
        total[0] = Number(dataFilings[i].total);
        total[1] = Number(dataFilings[i].indcontrib);
        total[2] = Number(dataFilings[i].ppcontrib);
        total[3] = Number(dataFilings[i].pfcontrib);
        total[4] = Number(dataFilings[i].lbcontrib);
        total[5] = Number(dataFilings[i].pubfin);
        total[6] = Number(dataFilings[i].miscinc);
        total[7] = Number(dataFilings[i].notepayinc);
        total[8] = Number(dataFilings[i].noterecinc);
        total[9] = Number(dataFilings[i].expend);
        total[10] = Number(dataFilings[i].endcash);
        total[11] = Number(dataFilings[i].begin);
       }
 }

 return total;
}

//LOAD PARTIES
function dataSpill(race,chamber){

if (chamber == "House" || chamber == "Senate"){
$(".results").hide();
$("#races").show();

$("#districtInfo").html("District " + race + " (" + String(chamber).toUpperCase() + ")")

getCandidates(race,"DFL");
getCandidates(race,"GOP");

var bigTotal = getCandidateTotals(race,"DFL")[0] + getCandidateTotals(race,"GOP")[0];

drawChart("#chartD", getCandidateTotals(race,"DFL"), bigTotal);
drawChart("#chartR", getCandidateTotals(race,"GOP"), bigTotal);

var totalX;
var indX;
var candX;

for (var i=0; i<dataRaces.length; i++){
  if (race == dataRaces[i].race){
    totalX = dataRaces[i].totalX;
    indX = dataRaces[i].indX;
    candX = dataRaces[i].candX;
  }
}

$("#totalX").html(d3.format("$,.0f")(totalX));
$("#indX").html(d3.format("$,.0f")(indX));
$("#candX").html(d3.format("$,.0f")(candX));

}
}

dataSpill("01","Senate");

mapBuild("#mapMetroS", "#infobox", "#chart", "mnsenate_metro.json", "senate", "metro", dataRaces, 0);
mapBuild("#mapStateS", "#infobox", "#chart", "mnsenate.json", "senate", "mn", dataRaces, 0);
mapBuild("#mapMetroH", "#infobox", "#chart", "mnleg_metro.json", "house", "metro", dataRaces, 0);
mapBuild("#mapStateH", "#infobox", "#chart", "mnleg.json", "house", "mn", dataRaces, 0);

var findDistrict = "mn_01";

//PARAMETER SWITCHES
$.urlParam = function(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results != null) { return results[1]; }
  else { return 0; }
}

if ($.urlParam('race') != 0 && $.urlParam('chamber') != 0) { 
dataSpill($.urlParam('race'),$.urlParam('chamber'));
$("#leftSide").hide();
} 

});
});
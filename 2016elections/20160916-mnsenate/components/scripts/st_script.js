  $("#dLeanCount").parent().parent().hide();
  $("#tossupCount").parent().parent().hide();
  $("#rLeanCount").parent().parent().hide();

d3.json("./data/mnleg.json", function(error, dataLoad) {
d3.json("./data/mnleg_chatter.json", function(error, dataLoadC) {

var data = dataLoad.power_index;
var dataChatter = dataLoadC.mnleg_chatter;

d3.csv("./data/candidates_master.csv", function(d) {
  return {
    id: d.CandRegNumb,
    district: d.District,
    party: d.PoliticalParty,
    first: d.CandFirstName,
    last: d.CandLastName,
    total: +d.TotReceipts,
    endcash: d.EndCash,
    indcontrib: d.IndContrib,
    ppcontrib: d.PPContrib,
    pfcontrib: d.PFContrib,
    lbcontrib: d.LbContrib,
    pubfin: d.PubFin,
    miscinc: d.MiscInc,
    notepayinc: d.NotePayInc,
    noterecinc: d.NoteRecInc,
    expend: d.TotalExpend,
    begin: d.BeginCash
  };
}, function(error, rows00) {

//BUTTON TRIGGERS
$(".switch").click(function() {
  $(".switch").removeClass("selected");
  $(this).addClass("selected");
  $(".district").removeClass("selected");
  $(".chamberSection").hide();
  $(".districtList").removeClass("selected");
  $("#infobox").hide();
  $(".rightSide").show();
  $("#" + $(this).attr("data") + ", ." + $(this).attr("data")).show();
});

$(".mapSwitch").click(function() {
  $(".mapSwitch").removeClass("selected2");
  $(".districtList").removeClass("selected");
  $(this).addClass("selected2");
  $(".maps").hide();
  $("#" + $(this).attr("data")).show();

  // if ($(this).attr("data") == "maindata") { $("#filter").css("visibility","visible"); }
  // else { $("#filter").css("visibility","hidden"); }
});

$(".chatterBox, #mChatter").html("<div class='chartTitle'>" + dataChatter[8].headline + "</div><div class='chatter'>" + dataChatter[8].chatter + "</div>");

$("#close").click(function() {
  $("#infobox").hide();
  $("#profile").hide();
  $(".rightSide").show();
  $(".districtList").removeClass("selected");
});

//RESPONSIVENESS
// var aspect = 500 / 550, chart = $("#mapState svg"), chart2 = $("#cartoState svg");

// $(window).on("resize", function() {
//   var targetWidth = chart.parent().width();
//   chart.attr("width", targetWidth);
//   chart.attr("height", targetWidth / aspect);
//   var targetWidth2 = chart2.parent().width();
//   chart2.attr("width", targetWidth2);
//   chart2.attr("height", targetWidth2 / aspect);
// });


//CONTENT SPITTERS
function spitRankings(container, rank, breakit){
  if (breakit == true) {
  d3.select(container).selectAll(".box").data(data).exit().remove();
  d3.select(container).html("");
d3.select(container).selectAll(".box")
.data(data.filter(function(d){ return d.lean == rank && d.chamber == "senate"; }).sort(function(a, b) { return d3['ascending'](a.district, b.district); })).enter().append("div")
.attr("id", function (d) { return "d" + d.district; })
.on("click", function (d) { 
  d3.selectAll(".box").classed("selected",false);
  d3.select(this).classed("selected",true);
 })
.attr("class",function (d){ 
  // if (rank == "DFL Stronghold") { color = "d3"; }
  // if (rank == "DFL Lean") { color = "d2"; }
  // if (rank == "Tossup") { 
  //   if (d.party == "GOP") { color = "r1" }
  //   else { color = "d1" }
  // }
  // if (rank == "GOP Lean") { color = "r2"; }
  // if (rank == "GOP Stronghold") { color = "r3"; }
  // return color + " box district"; })

      if (d.party == "GOP") { 
        if  (d.PCT2014 > 70) { var color =  "r3"; }
        else if  (d.PCT2014 > 60) { var color =  "r2"; }
        else if  (d.PCT2014 > 48) { var color =  "r1"; }
      }
      else if (d.party == "DFL") { 
        if  (d.PCT2014 > 70) { var color =  "d3"; }
        else if  (d.PCT2014 > 60) { var color =  "d2"; }
        else if  (d.PCT2014 > 48) { var color = "d1"; }
      }
    
      return color + " box district"; })
  .html(function (d){ 
      return d.district;
  })
.call(d3.helper.tooltip(function(d, i){
        if (d.party == "GOP") { 
        if  (d.PCT2014 > 80) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='r4'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
        else if  (d.PCT2014 > 70) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='r3'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
        else if  (d.PCT2014 > 60) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='r2'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
        else if  (d.PCT2014 > 50) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='r1'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
      }
      else if (d.party == "DFL") { 
        if  (d.PCT2014 > 80) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='d4'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
        else if  (d.PCT2014 > 70) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='d3'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
        else if  (d.PCT2014 > 60) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='d2'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
        else if  (d.PCT2014 > 50) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='d1'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
      }
}));

// d3.select(container).selectAll(".box").data(data.sort(function(a, b) { return d3['ascending'](a.district, b.district); })).transition().duration(750);

} else if (breakit == "split") {
  d3.select(container).selectAll(".box").data(data).exit().remove();
  d3.select(container).html("");
d3.select(container).selectAll(".box")
.data(data.filter(function(d){ return d.party == rank && d.chamber == "senate"; }).sort(function(a, b) { return d3['ascending'](a.PCT2014, b.PCT2014); })).enter().append("div")
.attr("id", function (d) { return "d" + d.district; })
.attr("class",function (d){ 
      if (d.party == "GOP") { 
        if  (d.PCT2014 > 70) { var color =  "r3"; }
        else if  (d.PCT2014 > 60) { var color =  "r2"; }
        else if  (d.PCT2014 > 48) { var color =  "r1"; }
      }
      else if (d.party == "DFL") { 
        if  (d.PCT2014 > 70) { var color =  "d3"; }
        else if  (d.PCT2014 > 60) { var color =  "d2"; }
        else if  (d.PCT2014 > 48) { var color = "d1"; }
      }
    
      return color + " box district"; })
  .html(function (d,i){ 
      return d.district;
  })
.call(d3.helper.tooltip(function(d, i){
        if (d.party == "GOP") { 
        if  (d.PCT2014 > 80) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='r4'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
        else if  (d.PCT2014 > 70) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='r3'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
        else if  (d.PCT2014 > 60) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='r2'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
        else if  (d.PCT2014 > 50) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='r1'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
      }
      else if (d.party == "DFL") { 
        if  (d.PCT2014 > 80) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='d4'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
        else if  (d.PCT2014 > 70) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='d3'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
        else if  (d.PCT2014 > 60) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='d2'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
        else if  (d.PCT2014 > 50) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='d1'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
      }
}));

// d3.select(container).selectAll(".box").data(data.sort(function(a, b) { return d3['ascending'](a.PCT2014, b.PCT2014); })).transition().duration(750);

// $(container).parent().append("<div class='breaker'></div>");

} 
else if (breakit == "first") {
 d3.select(container).selectAll(".box").data(data).exit().remove();
d3.select(container).selectAll(".box")
.data(data.filter(function(d){ return d.party == rank && d.chamber == "senate"; })).enter().append("div")
.attr("id", function (d) { return "d" + d.district; })
.attr("class",function (d){ 
      if (d.party == "GOP") { 
        var color =  "r3";
      }
      else if (d.party == "DFL") { 
        var color =  "d3";
      }
      return color + " box district"; })
  .html(function (d){ 
      return d.district;
  })
.call(d3.helper.tooltip(function(d, i){
        if (d.party == "GOP") { 
        if  (d.PCT2014 > 80) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='r4'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
        else if  (d.PCT2014 > 70) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='r3'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
        else if  (d.PCT2014 > 60) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='r2'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
        else if  (d.PCT2014 > 50) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='r1'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
      }
      else if (d.party == "DFL") { 
        if  (d.PCT2014 > 80) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='d4'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
        else if  (d.PCT2014 > 70) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='d3'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
        else if  (d.PCT2014 > 60) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='d2'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
        else if  (d.PCT2014 > 50) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='d1'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
      }
}));

// d3.select(container).selectAll(".box").data(data.sort(function(a, b) {return d3['ascending'](a.district, b.district);})).transition().duration(750);

// $(container).parent().append("<div class='breaker'></div>");


} else if (breakit == "all") {
  d3.select(container).selectAll(".box").data(data).exit().remove();
  d3.select(container).html("");
d3.select(container).selectAll(".box")
.data(data.filter(function(d){ return d.party == rank && d.chamber == "senate"; }).sort(function(a, b) { return d3['ascending'](a.district, b.district); })).enter().append("div")
.attr("id", function (d) { return "d" + d.district; })
.attr("class",function (d){ 
      if (d.party == "GOP") { 
        var color =  "r3";
      }
      else if (d.party == "DFL") { 
        var color =  "d3";
      }
    
      return color + " box district"; })
  .html(function (d, i){ 
      return d.district;
  })
.call(d3.helper.tooltip(function(d, i){
        if (d.party == "GOP") { 
        if  (d.PCT2014 > 80) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='r4'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
        else if  (d.PCT2014 > 70) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='r3'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
        else if  (d.PCT2014 > 60) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='r2'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
        else if  (d.PCT2014 > 50) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='r1'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
      }
      else if (d.party == "DFL") { 
        if  (d.PCT2014 > 80) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='d4'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
        else if  (d.PCT2014 > 70) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='d3'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
        else if  (d.PCT2014 > 60) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='d2'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
        else if  (d.PCT2014 > 50) { return "<div><strong>District " + d.district + "</strong></div><div>" + d.candidate + "</div><div class='d1'>" +  Math.round(d.PCT2014) + "% 2012 WIN</div>"; }
      }
}));

} else { return; }

//DISTRICT SELECTION
$(".district").click(function() {

  $(".district").removeClass("selected");
  $(this).addClass("selected");

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

    // clicked2();
    var findDistrict = "mn_" + $(this).text();
    var findMetro = "metro_" + $(this).text();
    

    $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Down();
    $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Up();
    $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Click();
    $("[id='" + findMetro.replace(new RegExp(" ", "g"),"-") + "']").d3Down();
    $("[id='" + findMetro.replace(new RegExp(" ", "g"),"-") + "']").d3Up();
    $("[id='" + findMetro.replace(new RegExp(" ", "g"),"-") + "']").d3Click();

});

    return;
}

function spitList(){

d3.select("#districtList").selectAll(".districtList")
.data(data.filter(function(d){ return d.chamber == "senate"; }).sort(function(a, b) { return d3['ascending'](a.district, b.district); })).enter().append("div")
.attr("id", function (d) { return "dL" + d.district; })
.attr("district", function (d) { return d.district; })
.on("click", function (d) { 
  d3.selectAll(".districtList").classed("selected",false);
  d3.select(this).classed("selected",true);
 })
.attr("class",function (d){ 
      if (d.party == "GOP") { 
        if  (d.PCT2014 > 70) { var color =  "r3"; }
        else if  (d.PCT2014 > 60) { var color =  "r2"; }
        else if  (d.PCT2014 > 48) { var color =  "r1"; }
      }
      else if (d.party == "DFL") { 
        if  (d.PCT2014 > 70) { var color =  "d3"; }
        else if  (d.PCT2014 > 60) { var color =  "d2"; }
        else if  (d.PCT2014 > 48) { var color = "d1"; }
      }
    
      return color + " districtList"; })
  .html(function (d){ 
      return "<div class='listCell'>District " + d.district + "</div><div class='listCell'>" + d.candidate + "</div><div class='listCell'>" + d.party + "</div><div class='listCell'>" + d.PCT2014 + "%</div>";
  });

    $( document ).ready(function() {
     $('#filter_box').keyup(function(i){
        $('.districtList').hide();
        var txt = $('#filter_box').val();
        $('.districtList').each(function(){
           if($(this).text().toUpperCase().indexOf(txt.toUpperCase()) != -1){
               $(this).show();
           }
        });
    });
});

//DISTRICT SELECTION
$(".districtList").click(function() {

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

    // clicked2();
    var findDistrict = "mn_" + $(this).attr("district");
    var findMetro = "metro_" + $(this).attr("district");
    

    $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Down();
    $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Up();
    $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Click();
    $("[id='" + findMetro.replace(new RegExp(" ", "g"),"-") + "']").d3Down();
    $("[id='" + findMetro.replace(new RegExp(" ", "g"),"-") + "']").d3Up();
    $("[id='" + findMetro.replace(new RegExp(" ", "g"),"-") + "']").d3Click();

});

}

spitList();

function tableSort(container,candidate,sorted){
   
  d3.select(container).selectAll(".districtList").sort(function(a, b) {
          if (candidate == "district") { 
        if (sorted == "descend") { return d3.descending(a.district, b.district); }
        if (sorted == "ascend") { return d3.ascending(a.district, b.district); }
     }
          if (candidate == "candidate") { 
        if (sorted == "descend") { return d3.descending(a.candidate, b.candidate); }
        if (sorted == "ascend") { return d3.ascending(a.candidate, b.candidate); }
     }
           if (candidate == "party") { 
        if (sorted == "descend") { return d3.descending(a.party, b.party); }
        if (sorted == "ascend") { return d3.ascending(a.party, b.party); }
     }
           if (candidate == "win") { 
        if (sorted == "descend") { return d3.ascending(a.PCT2014, b.PCT2014); }
        if (sorted == "ascend") { return d3.descending(a.PCT2014, b.PCT2014); }
     }
    })
    .transition().duration(500);
}

$(".th").click(function() {
  $(".th").removeClass("selected");
  $(this).addClass("selected");
      if ($(this).hasClass("toggled")) { $(this).removeClass("toggled"); var sorted = "ascend"; }
      else if ($(this).hasClass("selected")) { $(this).addClass("toggled"); var sorted ="descend"; } 
      tableSort("#districtList",$(this).attr("data"),sorted);
});

function cfBuilder(district){
  // $("#cfFrame").attr("src",$("#cfFrame").attr("data") + district);
  dataSpill(district,"senate");
  $("#moreTop").html("More about District " + district);
  voteBuilder(district);
}


function chartBuilder(){
var  padding = {
        top: 20,
        right: 40,
        bottom: 20,
        left: 60,
    };

var chart = c3.generate({
        bindto: '#chart',
        padding: padding,
    data: {
        x: 'x',
        columns: [
            ['x',2002,2006,2010,2012],
            ['DFL Seats',38,44,30,39],
            ['GOP Seats',29,23,37,28]
        ],
        type: 'line'
    },
    legend: {
        show: false
    },
    color:  {  pattern: ["#3F88C5","#A52129"] },
    axis: {
      y: {
            min: 0,
            padding: {bottom: 0},
            tick: {
             values: [0,34,48],
             count: 3,
             format: d3.format('.0f')
            }
        },
        x: {
            tick: {
                values: ['2002 ', '2006', '2010', '2012'],
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
          lines: [
                {value: 34, text: '', position: 'start', class:'powerline'}
          ]

        },
        x: {
            lines: [
                {value: 2002, text: 'Midterm', position: 'start'},
                {value: 2006, text: 'Midterm', position: 'start'},
                {value: 2010, text: 'Midterm', position: 'start'},
                {value: 2012, text: 'Obama (D) Win', position: 'start'}
            ]
        }
    }
});
}

chartBuilder();

function voteBuilder(district){
var  padding = {
        top: 20,
        right: 40,
        bottom: 20,
        left: 60,
    };

var x = [];
var dflPCT = [];
var GOPPCT = [];  

x[0] = 'x';
dflPCT[0] = "DFL Vote %";
GOPPCT[0] = "GOP Vote %";

x[1] = '2002';
x[2] = '2006';
x[3] = '2010';
x[4] = '2012';

for (var i=0; i < data.length; i++){
  if (data[i].district == district && data[i].chamber == "senate"){
    dflPCT[1] = data[i].DFL2002 / 100;
    dflPCT[2] = data[i].DFL2006 / 100;
    dflPCT[3] = data[i].DFL2010 / 100;
    dflPCT[4] = data[i].DFL2012 / 100;
    GOPPCT[1] = data[i].GOP2002 / 100;
    GOPPCT[2] = data[i].GOP2006 / 100;
    GOPPCT[3] = data[i].GOP2010 / 100;
    GOPPCT[4] = data[i].GOP2012 / 100;
  }
}

var chart = c3.generate({
        bindto: '#voteChart',
        padding: padding,
    data: {
        x: 'x',
        columns: [
            x,
            dflPCT,
            GOPPCT
        ],
        type: 'line'
    },
    color:  {  pattern: ["#3F88C5","#A52129"] },
    axis: {
      y: {
            min: 0,
            max: 1,
            padding: {bottom: 0},
            tick: {
             values: [0,0.5,1],
             count: 3,
             format: d3.format('%')
            }
        },
        x: {
            tick: {
                values: ['2002 ', '2006', '2010', '2012'],
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
          lines: [
                {value: 0.5, text: '', position: 'start', class:'powerline'}
          ]

        },
        x: {
            lines: [
                {value: 2012, text: 'Post-redistricting', position: 'start'}
            ]
        }
    }
});
}

function mapColor(d, race, dataCompare){
  if (race == "senate"){
  for (var i=0; i < dataCompare.length; i++){
    if (Number(dataCompare[i].district) == Number(d) && dataCompare[i].chamber == "senate"){
      if (dataCompare[i].party == "GOP") { return "r3";}
      else if (dataCompare[i].party == "DFL") { return "d3"; }
    }
  } 
 } else if (race == "lean") {
  for (var i=0; i < dataCompare.length; i++){
    if (Number(dataCompare[i].district) == Number(d) && dataCompare[i].chamber == "senate"){
          var rank = dataCompare[i].lean;
          if (rank == "DFL Stronghold") { var color = "d3"; }
          else if (rank == "DFL Lean") { var color = "d2"; }
          else if (rank == "Competitive") { var color = "mid" }
          else if (rank == "GOP Lean") { var color = "r2"; }
          else if (rank == "GOP Stronghold") { var color = "r3"; }
            return color;
          }
        }
      } else if (race == "margins") {
  for (var i=0; i < dataCompare.length; i++){
    if (Number(dataCompare[i].district) == Number(d) && dataCompare[i].chamber == "senate"){
      if (dataCompare[i].party == "GOP") { 
        if  (dataCompare[i].PCT2014 > 70) { return "r3"; }
        else if  (dataCompare[i].PCT2014 > 60) { return "r2"; }
        else if  (dataCompare[i].PCT2014 > 48) { return "r1"; }
      }
      else if (dataCompare[i].party == "DFL") { 
        if  (dataCompare[i].PCT2014 > 70) { return "d3"; }
        else if  (dataCompare[i].PCT2014 > 60) { return "d2"; }
        else if  (dataCompare[i].PCT2014 > 48) { return "d1"; }
      }
          }
        }
      }
}

function mapTips(d, subject, dataCompare){
    if (subject == "senate"){
    for (var i=0; i < dataCompare.length; i++){
    if (Number(dataCompare[i].district) == Number(d.properties.DISTRICT) && dataCompare[i].chamber == "senate"){
      if (dataCompare[i].party == "GOP") { 
        if  (dataCompare[i].PCT2014 > 80) { return "<div><strong>District " + d.properties.DISTRICT + "</strong></div><div>" + dataCompare[i].candidate + " (" + dataCompare[i].party + ")" + "</div><div class='r4'>" +  Math.round(dataCompare[i].PCT2014) + "% 2012 WIN</div>"; }
        else if  (dataCompare[i].PCT2014 > 70) { return "<div><strong>District " + d.properties.DISTRICT + "</strong></div><div>" + dataCompare[i].candidate + " (" + dataCompare[i].party + ")" + "</div><div class='r3'>" +  Math.round(dataCompare[i].PCT2014) + "% 2012 WIN</div>"; }
        else if  (dataCompare[i].PCT2014 > 60) { return "<div><strong>District " + d.properties.DISTRICT + "</strong></div><div>" + dataCompare[i].candidate + " (" + dataCompare[i].party + ")" + "</div><div class='r2'>" +  Math.round(dataCompare[i].PCT2014) + "% 2012 WIN</div>"; }
        else if  (dataCompare[i].PCT2014 > 50) { return "<div><strong>District " + d.properties.DISTRICT + "</strong></div><div>" + dataCompare[i].candidate + " (" + dataCompare[i].party + ")" + "</div><div class='r1'>" +  Math.round(dataCompare[i].PCT2014) + "% 2012 WIN</div>"; }
      }
      else if (dataCompare[i].party == "DFL") { 
        if  (dataCompare[i].PCT2014 > 80) { return "<div><strong>District " + d.properties.DISTRICT + "</strong></div><div>" + dataCompare[i].candidate + " (" + dataCompare[i].party + ")" + "</div><div class='d4'>" +  Math.round(dataCompare[i].PCT2014) + "% 2012 WIN</div>"; }
        else if  (dataCompare[i].PCT2014 > 70) { return "<div><strong>District " + d.properties.DISTRICT + "</strong></div><div>" + dataCompare[i].candidate + " (" + dataCompare[i].party + ")" + "</div><div class='d3'>" +  Math.round(dataCompare[i].PCT2014) + "% 2012 WIN</div>"; }
        else if  (dataCompare[i].PCT2014 > 60) { return "<div><strong>District " + d.properties.DISTRICT + "</strong></div><div>" + dataCompare[i].candidate + " (" + dataCompare[i].party + ")" + "</div><div class='d2'>" +  Math.round(dataCompare[i].PCT2014) + "% 2012 WIN</div>"; }
        else if  (dataCompare[i].PCT2014 > 50) { return "<div><strong>District " + d.properties.DISTRICT + "</strong></div><div>" + dataCompare[i].candidate + " (" + dataCompare[i].party + ")" + "</div><div class='d1'>" +  Math.round(dataCompare[i].PCT2014) + "% 2012 WIN</div>"; }
      }
    }
     
  }
}
      
}

function mapBuild(container, boxContainer, chartContainer, shape, race, geo, dataCompare, index) {

var width = 320,
    height = 400,
    centered;

if (geo=="us") { var projection = d3.geo.albersUsa().scale(700).translate([330, 200]); }
else if (geo=="mn") { var projection = d3.geo.albersUsa().scale(5037).translate([50, 970]); }
else if (geo=="metro") { var projection = d3.geo.mercator().scale([14000]).center([-92.246704,45.255555]); }

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
      .attr("precinctName", function(d){ return d.properties.DISTRICT })
      .attr("class", function(d){
         return mapColor(d.properties.DISTRICT, race, dataCompare);
        })
       .on("mousedown", function(d, i){  
        // $(document).bind('DOMNodeInserted', function(event) {
        $("#infobox").show();
        $(".rightSide").hide();
        $(".district").removeClass("selected");
        $("#profile").show();
        $("#d" + d.properties.DISTRICT).addClass("selected");
      // });
      for (var i=0; i < dataCompare.length; i++){
        if (Number(dataCompare[i].district) == Number(d.properties.DISTRICT) && dataCompare[i].chamber == "senate"){
            $(".stat").removeClass("gray1,gray2,gray3,gray4,gray5");
            $("#chatter").html(dataCompare[i].chatter);
            $("#districtName").html(dataCompare[i].district);
            $("#districtRow, #moreTop").removeClass("r1,r2,r3,r4,d1,d2,d3,d4,repbulican,democrat");
            $("#districtRow, #moreTop").attr("class",mapColor(d.properties.DISTRICT, "margins", dataCompare));
            $("#incumbant").html(dataCompare[i].candidate);
            $("#status").html(dataCompare[i].incumbant);
            $("#terms").html(dataCompare[i].tenure);
            $("#winpct").removeClass("r1,r2,r3,r4,d1,d2,d3,d4,repbulican,democrat");
            $("#winpct").html(Math.round(dataCompare[i].PCT2014) + "%");
            $("#winpct").attr("class",mapColor(d.properties.DISTRICT, "margins", dataCompare));
            $("#winpct").addClass("stat");
            $("#lean").html(dataCompare[i].lean);
            $("#lean").attr("class",mapColor(d.properties.DISTRICT, "lean", dataCompare));
            $("#lean").addClass("stat");
            $("#from").html(dataCompare[i].from);
            $("#party").html(dataCompare[i].party);
            $("#voting").html(dataCompare[i].voter_amend);
            $("#marriage").html(dataCompare[i].marriage_amend);
            $("#rheld").html(dataCompare[i].GOP_held);
            $("#dheld").html(dataCompare[i].dfl_held);
            $("#population").html(d3.format(",")(dataCompare[i].population));
            $("#votingage").html(dataCompare[i].F_H18_POP);
            $("#maleyoung").html(dataCompare[i].male_18_to_34_pct + dataCompare[i].female_18_to_34_pct);
            $("#malemiddle").html(dataCompare[i].male_35_to_49_pct + dataCompare[i].female_35_to_49_pct);
            $("#maleold").html(dataCompare[i].male_50_to_64_pct + dataCompare[i].female_50_to_64_pct);
            $("#maleoldest").html(d3.format("%")(dataCompare[i].male_65_over_pct + dataCompare[i].female_65_over_pct));
            // $("#femaleyoung").html(dataCompare[i].female_18_to_34_pct);
            // $("#femalemiddle").html(dataCompare[i].female_35_to_49_pct);
            // $("#femaleold").html(dataCompare[i].female_50_to_64_pct);
            // $("#femaleoldest").html(dataCompare[i].female_65_over_pct);
            $("#whites").html(d3.format("%")(dataCompare[i].whites_18_pct));
            $("#minorities").html(d3.format("%")(dataCompare[i].minority_18_pct));
            $("#income").html(d3.format("$,")(dataCompare[i].median_income));
            $("#p2008").html(dataCompare[i].PresWin2008);
            $("#p2012").html(dataCompare[i].PresWin2012);
            $("#thisdistrict").html(dataCompare[i].district);
            $("#wasdistrict").html(dataCompare[i].old_district);
            if (dataCompare[i].chatter != "#") { $("#analysis").html(dataCompare[i].chatter); }
            else { $("#analysis").html(""); }

            cfBuilder(d.properties.DISTRICT);

            

            var mIncome = dataCompare[i].median_income;
            $("#income").removeClass("gray5");
            $("#income").removeClass("gray4");
            $("#income").removeClass("gray3");
            $("#income").removeClass("gray2");
            $("#income").removeClass("gray1");
            if (mIncome >= 70000) { $("#income").addClass("gray5"); }
            else if (mIncome >= 50000) { $("#income").addClass("gray4"); } 
            else if (mIncome >= 40000) { $("#income").addClass("gray3"); }
            else if (mIncome >= 32000) { $("#income").addClass("gray2"); }
            else if (mIncome > 25000) { $("#income").addClass("gray1"); }
        }
      }


         $('.statNum').each(function() {
    var num = $(this).text();
      $(this).removeClass("gray5");
      $(this).removeClass("gray4");
      $(this).removeClass("gray3");
      $(this).removeClass("gray2");
      $(this).removeClass("gray1");
      if (num >= .80) { $(this).addClass("gray5"); $(this).html(d3.format("%")(num)); }
      else if (num >= .60) { $(this).addClass("gray4"); $(this).html(d3.format("%")(num)); } 
      else if (num >= .30) { $(this).addClass("gray3"); $(this).html(d3.format("%")(num)); }
      else if (num >= .10) { $(this).addClass("gray2"); $(this).html(d3.format("%")(num)); }
      else if (num > 0) { $(this).addClass("gray1"); $(this).html(d3.format("%")(num)); }
    });



       })
      .style("stroke-width", "1px")
      .style("stroke", "#fff")
      .call(d3.helper.tooltip(function(d, i){
        return mapTips(d, race, dataCompare);
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
  $("#filter input").val("");
  $(".district").removeClass("selected");
  $("#infobox").hide();
  d3.selectAll(".map rect").classed('faded', false); 
  d3.selectAll(".map rect").classed('active', false); 
  $(".rightSide").show();
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

  d3.selectAll("#mapMetro path, #mapState path")
      .classed("faded", false)
      .classed("active", false);

  g.selectAll("path")
      .classed("faded", true)
      .classed("active", centered && function (d) { return d === centered; });
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

function mapReshade(container, shape, subject, race, dataCompare) {

d3.selectAll(".district").classed("selected",false);
d3.selectAll(".district").classed("fadeBox",true);


d3.json("shapefiles/" + shape, function(error, us) {
d3.selectAll(container + " svg g path")
      .data(us.features)
      .attr("class", function(d){
        // console.log(d.properties.DISTRICT);
    if (subject == "current") { 
      d3.selectAll(".district").classed("fadeBox",false);
  for (var i=0; i < dataCompare.length; i++){
    if (Number(dataCompare[i].district) == Number(d.properties.DISTRICT) && dataCompare[i].chamber == "senate"){
      if (dataCompare[i].party == "GOP") { return "r3";}
      else if (dataCompare[i].party == "DFL") { return "d3"; }
    }
  }
   return "mid";
}

  else if (subject == "hot") { 
    for (var i=0; i < dataCompare.length; i++){
      if (Number(d.properties.DISTRICT) == Number(dataCompare[i].district) && dataCompare[i].chamber == "senate"){
    if (dataCompare[i].HotDistrict == "x"){

d3.select("#d" + d.properties.DISTRICT).classed("fadeBox",false);
// d3.select("#d" + d.properties.DISTRICT).classed("selected",true);
// d3.select("#d" + d.properties.DISTRICT).classed("thisBox",true);

      if (dataCompare[i].party == "GOP") { 
        if  (dataCompare[i].PCT2014 > 70) { return "r3"; }
        else if  (dataCompare[i].PCT2014 > 60) { return "r2"; }
        else if  (dataCompare[i].PCT2014 > 50) { return "r1"; }
      }
      else if (dataCompare[i].party == "DFL") { 
        if  (dataCompare[i].PCT2014 > 70) { return "d3"; }
        else if  (dataCompare[i].PCT2014 > 60) { return "d2"; }
        else if  (dataCompare[i].PCT2014 > 50) { return "d1"; }
      }
    }
     
  }
}
 return "mid";
}
        else if (subject == "open") { 
    for (var i=0; i < dataCompare.length; i++){
      if (Number(d.properties.DISTRICT) == Number(dataCompare[i].district) && dataCompare[i].chamber == "senate"){
    if (dataCompare[i].incumbant == "Open"){

d3.select("#d" + d.properties.DISTRICT).classed("fadeBox",false);
// d3.select("#d" + d.properties.DISTRICT).classed("selected",true);
// d3.select("#d" + d.properties.DISTRICT).classed("thisBox",true);

      if (dataCompare[i].party == "GOP") { 
        if  (dataCompare[i].PCT2014 > 70) { return "r3"; }
        else if  (dataCompare[i].PCT2014 > 60) { return "r2"; }
        else if  (dataCompare[i].PCT2014 > 50) { return "r1"; }
      }
      else if (dataCompare[i].party == "DFL") { 
        if  (dataCompare[i].PCT2014 > 70) { return "d3"; }
        else if  (dataCompare[i].PCT2014 > 60) { return "d2"; }
        else if  (dataCompare[i].PCT2014 > 50) { return "d1"; }
      }
    }
     
  }
}
 return "mid";
         }
        else if (subject == "rematch") { 
    for (var i=0; i < dataCompare.length; i++){
      if (Number(d.properties.DISTRICT) == Number(dataCompare[i].district) && dataCompare[i].chamber == "senate"){
    if (dataCompare[i].incumbant == "Rematch"){

d3.select("#d" + d.properties.DISTRICT).classed("fadeBox",false);
// d3.select("#d" + d.properties.DISTRICT).classed("selected",true);
// d3.select("#d" + d.properties.DISTRICT).classed("thisBox",true);

      if (dataCompare[i].party == "GOP") { 
        if  (dataCompare[i].PCT2014 > 70) { return "r3"; }
        else if  (dataCompare[i].PCT2014 > 60) { return "r2"; }
        else if  (dataCompare[i].PCT2014 > 50) { return "r1"; }
      }
      else if (dataCompare[i].party == "DFL") { 
        if  (dataCompare[i].PCT2014 > 70) { return "d3"; }
        else if  (dataCompare[i].PCT2014 > 60) { return "d2"; }
        else if  (dataCompare[i].PCT2014 > 50) { return "d1"; }
      }
    }
     
  }
}
 return "mid";
         }
         else if (subject == "margins"){
          d3.selectAll(".district").classed("fadeBox",false);
    for (var i=0; i < dataCompare.length; i++){
    if (Number(dataCompare[i].district) == Number(d.properties.DISTRICT) && dataCompare[i].chamber == "senate"){
      if (dataCompare[i].party == "GOP") { 
        if  (dataCompare[i].PCT2014 > 70) { return "r3"; }
        else if  (dataCompare[i].PCT2014 > 60) { return "r2"; }
        else if  (dataCompare[i].PCT2014 > 48) { return "r1"; }
      }
      else if (dataCompare[i].party == "DFL") { 
        if  (dataCompare[i].PCT2014 > 70) { return "d3"; }
        else if  (dataCompare[i].PCT2014 > 60) { return "d2"; }
        else if  (dataCompare[i].PCT2014 > 48) { return "d1"; }
      }
    }
  }
         }
        else if (subject == "lean"){
        
          d3.selectAll(".district").classed("fadeBox",false);

    for (var i=0; i < dataCompare.length; i++){
    if (Number(dataCompare[i].district) == Number(d.properties.DISTRICT) && dataCompare[i].chamber == "senate"){
     var rank = dataCompare[i].lean;
  if (rank == "DFL Stronghold") { color = "d3"; }
  if (rank == "DFL Lean") { color = "d2"; }
  if (rank == "Competitive") { var color = "mid" }
  if (rank == "GOP Lean") { color = "r2"; }
  if (rank == "GOP Stronghold") { color = "r3"; }
    return color;

    }
  }
         }
      });
});

}

var cartogram = [];

function cartoBuild(container, boxContainer, chartContainer, shape, race, dataCompare, geo, index, data){
cartogram[index] = {
    margin: {
        top: 80,
        right: 60,
        bottom: 0,
        left: 0
    },

    selector: container + ' svg',

    init: function() {
        var self = this;

        self.$el = $(self.selector);

        self.width = 400 - self.margin.left - self.margin.right; self.height = 400 - self.margin.top - self.margin.bottom;

       if (geo == "us") { self.width = 800 - self.margin.left - self.margin.right; self.height = 500 - self.margin.top - self.margin.bottom; }
       if (geo == "mn") { self.width = 400 - self.margin.left - self.margin.right; self.height = 400 - self.margin.top - self.margin.bottom; }
       if (geo == "metro") { self.width = 400 - self.margin.left - self.margin.right; self.height = 400 - self.margin.top - self.margin.bottom; }

        self.svg = d3.select(self.selector)
            .attr('height', self.height + self.margin.top + self.margin.bottom)
            .attr('width', self.width + self.margin.left + self.margin.right)

        self.state_size = self.width / 10;
        self.state_padding = 2;

        self.map = self.svg.append('g')
            .attr('transform', 'translate(' + self.margin.left + ','
                  + self.margin.top + ')')

        self.drawMap();
    },

    drawMap: function() {
        var self = this;

        var states = self.map.selectAll('.states')
            .data(self.state_pos_co2)
            .enter().append('g')
            .attr('class', 'state-groups');

        var state = states.append('rect')
            .attr("id", function(d) { var str = geo + "_" + d.state_postal; return str.replace(new RegExp(" ", "g"),"-"); })
            .attr('class', 'state')
            .attr('class', function(d) {
                for (var i=0; i < dataCompare.length; i++){
                  if (dataCompare[i].district == d.state_postal){
                    if (dataCompare[i].party == "GOP") { return "r3";}
                    else if (dataCompare[i].party == "DFL") { return "d3"; }
                  }
                } 
            })
            .attr('rx', 0)
            .attr('ry', 0)
            .attr('x', function(d) {
                return d.column * (self.state_size + self.state_padding);
            })
            .attr('y', function(d) {
                return d.row * (self.state_size + self.state_padding);
            })
            .attr('width', self.state_size)
            .attr('height', self.state_size)
            .on('click', function(d) {
              d3.selectAll(".map rect").classed('faded', true); 
              d3.selectAll(".map rect").classed('active', false); 
              d3.select(this).classed('faded', false); 
              d3.select(this).classed('active', true); 
              cfBuilder(d.state_postal);

                      // $(document).bind('DOMNodeInserted', function(event) {
        $("#infobox").show();
        $(".rightSide").hide();
        $(".district").removeClass("selected");
        $("#d" + d.state_postal).addClass("selected");
        $("#profile").show();
        cfBuilder(d.state_postal);
      // });
      for (var i=0; i < dataCompare.length; i++){
        if (Number(dataCompare[i].district) == Number(d.state_postal) && dataCompare[i].chamber == "senate"){
            $(".stat").removeClass("gray1,gray2,gray3,gray4,gray5");
            $("#chatter").html(dataCompare[i].chatter);
            $("#districtName").html(dataCompare[i].district);
            $("#districtRow, #moreTop").removeClass("r1,r2,r3,r4,d1,d2,d3,d4,repbulican,democrat");
            $("#districtRow, #moreTop").attr("class",mapColor(d.state_postal, "margins", dataCompare));
            $("#incumbant").html(dataCompare[i].candidate);
            $("#status").html(dataCompare[i].incumbant);
            $("#terms").html(dataCompare[i].tenure);
            $("#winpct").removeClass("r1,r2,r3,r4,d1,d2,d3,d4,repbulican,democrat");
            $("#winpct").html(Math.round(dataCompare[i].PCT2014) + "%");
            $("#winpct").attr("class",mapColor(d.state_postal, "margins", dataCompare));
            $("#winpct").addClass("stat");
            $("#lean").html(dataCompare[i].lean);
            $("#lean").attr("class",mapColor(d.state_postal, "lean", dataCompare));
            $("#lean").addClass("stat");
            $("#from").html(dataCompare[i].from);
            $("#party").html(dataCompare[i].party);
            $("#voting").html(dataCompare[i].voter_amend);
            $("#marriage").html(dataCompare[i].marriage_amend);
            $("#rheld").html(dataCompare[i].GOP_held);
            $("#dheld").html(dataCompare[i].dfl_held);
            $("#population").html(d3.format(",")(dataCompare[i].population));
            $("#votingage").html(dataCompare[i].F_H18_POP);
            $("#maleyoung").html(dataCompare[i].male_18_to_34_pct + dataCompare[i].female_18_to_34_pct);
            $("#malemiddle").html(dataCompare[i].male_35_to_49_pct + dataCompare[i].female_35_to_49_pct);
            $("#maleold").html(dataCompare[i].male_50_to_64_pct + dataCompare[i].female_50_to_64_pct);
            $("#maleoldest").html(d3.format("%")(dataCompare[i].male_65_over_pct + dataCompare[i].female_65_over_pct));
            // $("#femaleyoung").html(dataCompare[i].female_18_to_34_pct);
            // $("#femalemiddle").html(dataCompare[i].female_35_to_49_pct);
            // $("#femaleold").html(dataCompare[i].female_50_to_64_pct);
            // $("#femaleoldest").html(dataCompare[i].female_65_over_pct);
            $("#whites").html(d3.format("%")(dataCompare[i].whites_18_pct));
            $("#minorities").html(d3.format("%")(dataCompare[i].minority_18_pct));
            $("#income").html(d3.format("$,")(dataCompare[i].median_income));
            $("#p2008").html(dataCompare[i].PresWin2008);
            $("#p2012").html(dataCompare[i].PresWin2012);
            $("#thisdistrict").html(dataCompare[i].district);
            $("#wasdistrict").html(dataCompare[i].old_district);
            var mIncome = dataCompare[i].median_income;
            $("#income").removeClass("gray5");
            $("#income").removeClass("gray4");
            $("#income").removeClass("gray3");
            $("#income").removeClass("gray2");
            $("#income").removeClass("gray1");
            if (dataCompare[i].chatter != "#") { $("#analysis").html(dataCompare[i].chatter); }
            else { $("#analysis").html(""); }
            if (mIncome >= 70000) { $("#income").addClass("gray5"); }
            else if (mIncome >= 50000) { $("#income").addClass("gray4"); } 
            else if (mIncome >= 40000) { $("#income").addClass("gray3"); }
            else if (mIncome >= 32000) { $("#income").addClass("gray2"); }
            else if (mIncome > 25000) { $("#income").addClass("gray1"); }
        }
      }
         $('.statNum').removeClass("gray5, gray4, gray3, gray2, gray1");

         $('.statNum').each(function() {
      $(this).removeClass("gray5");
      $(this).removeClass("gray4");
      $(this).removeClass("gray3");
      $(this).removeClass("gray2");
      $(this).removeClass("gray1");
    var num = $(this).text();
      if (num >= .80) { $(this).addClass("gray5"); $(this).html(d3.format("%")(num)); }
      else if (num >= .60) { $(this).addClass("gray4"); $(this).html(d3.format("%")(num)); } 
      else if (num >= .30) { $(this).addClass("gray3"); $(this).html(d3.format("%")(num)); }
      else if (num >= .10) { $(this).addClass("gray2"); $(this).html(d3.format("%")(num)); }
      else if (num > 0) { $(this).addClass("gray1"); $(this).html(d3.format("%")(num)); }
    });

        })
           .call(d3.helper.tooltip(function(d, i){
            for (var i=0; i < dataCompare.length; i++){
  if (Number(dataCompare[i].district) == Number(d.state_postal)){
      if (dataCompare[i].party == "GOP") { 
        if  (dataCompare[i].PCT2014 > 80) { return "<div><strong>" + d.state_full + "</strong></div><div>" + dataCompare[i].candidate + " (" + dataCompare[i].party + ")" + "</div><div class='r4'>" +  Math.round(dataCompare[i].PCT2014) + "% 2012 WIN</div>"; }
        else if  (dataCompare[i].PCT2014 > 70) { return "<div><strong>" + d.state_full + "</strong></div><div>" + dataCompare[i].candidate + " (" + dataCompare[i].party + ")" + "</div><div class='r3'>" +  Math.round(dataCompare[i].PCT2014) + "% 2012 WIN</div>"; }
        else if  (dataCompare[i].PCT2014 > 60) { return "<div><strong>" + d.state_full + "</strong></div><div>" + dataCompare[i].candidate + " (" + dataCompare[i].party + ")" + "</div><div class='r2'>" +  Math.round(dataCompare[i].PCT2014) + "% 2012 WIN</div>"; }
        else if  (dataCompare[i].PCT2014 > 50) { return "<div><strong>" + d.state_full + "</strong></div><div>" + dataCompare[i].candidate + " (" + dataCompare[i].party + ")" + "</div><div class='r1'>" +  Math.round(dataCompare[i].PCT2014) + "% 2012 WIN</div>"; }
      }
      else if (dataCompare[i].party == "DFL") { 
        if  (dataCompare[i].PCT2014 > 80) { return "<div><strong>" + d.state_full + "</strong></div><div>" + dataCompare[i].candidate + " (" + dataCompare[i].party + ")" + "</div><div class='d4'>" +  Math.round(dataCompare[i].PCT2014) + "% 2012 WIN</div>"; }
        else if  (dataCompare[i].PCT2014 > 70) { return "<div><strong>" + d.state_full + "</strong></div><div>" + dataCompare[i].candidate + " (" + dataCompare[i].party + ")" + "</div><div class='d3'>" +  Math.round(dataCompare[i].PCT2014) + "% 2012 WIN</div>"; }
        else if  (dataCompare[i].PCT2014 > 60) { return "<div><strong>" + d.state_full + "</strong></div><div>" + dataCompare[i].candidate + " (" + dataCompare[i].party + ")" + "</div><div class='d2'>" +  Math.round(dataCompare[i].PCT2014) + "% 2012 WIN</div>"; }
        else if  (dataCompare[i].PCT2014 > 50) { return "<div><strong> " + d.state_full + "</strong></div><div>" + dataCompare[i].candidate + " (" + dataCompare[i].party + ")" + "</div><div class='d1'>" +  Math.round(dataCompare[i].PCT2014) + "% 2012 WIN</div>"; }
      }
    }
  }
            }));

        var text = states.append('text')
            .attr('class', 'state-label')
            .attr('class', function(d) {
                 return "text"; 
            })
            .attr('dominant-baseline', 'central')
            .attr('x', function(d) {
                return (d.column * (self.state_size + self.state_padding))
                        + self.state_size / 2; })
            .attr('y', function(d) {
                return (d.row * (self.state_size + self.state_padding))
                    + self.state_size / 2; })
            .style('text-anchor', 'middle')
            .on('click', function(d) { 
              d3.selectAll(".map rect").classed('faded', true); 
              d3.selectAll(".map rect").classed('active', false); 
              d3.select(this.parentNode).select("rect").classed('faded', false); 
              d3.select(this.parentNode).select("rect").classed('active', true); 

                      // $(document).bind('DOMNodeInserted', function(event) {
        $("#infobox").show();
        $(".rightSide").hide();
        $(".district").removeClass("selected");
        $("#profile").show();
        cfBuilder(d.state_postal);
        $("#d" + d.state_postal).addClass("selected");
      // });
      for (var i=0; i < dataCompare.length; i++){
        if (Number(dataCompare[i].district) == Number(d.state_postal) && dataCompare[i].chamber == "senate"){
            $(".stat").removeClass("gray1,gray2,gray3,gray4,gray5");
            $("#chatter").html(dataCompare[i].chatter);
            $("#districtName").html(dataCompare[i].district);
            $("#districtRow, #moreTop").removeClass("r1,r2,r3,r4,d1,d2,d3,d4,repbulican,democrat");
            $("#districtRow, #moreTop").attr("class",mapColor(d.state_postal, "margins", dataCompare));
            $("#incumbant").html(dataCompare[i].candidate);
            $("#status").html(dataCompare[i].incumbant);
            $("#terms").html(dataCompare[i].tenure);
            $("#winpct").removeClass("r1,r2,r3,r4,d1,d2,d3,d4,repbulican,democrat");
            $("#winpct").html(Math.round(dataCompare[i].PCT2014) + "%");
            $("#winpct").attr("class",mapColor(d.state_postal, "margins", dataCompare));
            $("#winpct").addClass("stat");
            $("#lean").html(dataCompare[i].lean);
            $("#lean").attr("class",mapColor(d.state_postal, "lean", dataCompare));
            $("#lean").addClass("stat");
            $("#from").html(dataCompare[i].from);
            $("#party").html(dataCompare[i].party);
            $("#voting").html(dataCompare[i].voter_amend);
            $("#marriage").html(dataCompare[i].marriage_amend);
            $("#rheld").html(dataCompare[i].GOP_held);
            $("#dheld").html(dataCompare[i].dfl_held);
            $("#population").html(d3.format(",")(dataCompare[i].population));
            $("#votingage").html(dataCompare[i].F_H18_POP);
            $("#maleyoung").html(dataCompare[i].male_18_to_34_pct);
            $("#malemiddle").html(dataCompare[i].male_35_to_49_pct);
            $("#maleold").html(dataCompare[i].male_50_to_64_pct);
            $("#maleoldest").html(d3.format("%")(dataCompare[i].male_65_over_pct));
            $("#femaleyoung").html(dataCompare[i].female_18_to_34_pct);
            $("#femalemiddle").html(dataCompare[i].female_35_to_49_pct);
            $("#femaleold").html(dataCompare[i].female_50_to_64_pct);
            $("#femaleoldest").html(dataCompare[i].female_65_over_pct);
            $("#whites").html(d3.format("%")(dataCompare[i].whites_18_pct));
            $("#minorities").html(d3.format("%")(dataCompare[i].minority_18_pct));
            $("#income").html(d3.format("$,")(dataCompare[i].median_income));
            $("#p2008").html(dataCompare[i].PresWin2008);
            $("#p2012").html(dataCompare[i].PresWin2012);
            $("#thisdistrict").html(dataCompare[i].district);
            $("#wasdistrict").html(dataCompare[i].old_district);
            var mIncome = dataCompare[i].median_income;
            $("#income").removeClass("gray5");
            $("#income").removeClass("gray4");
            $("#income").removeClass("gray3");
            $("#income").removeClass("gray2");
            $("#income").removeClass("gray1");
            if (dataCompare[i].chatter != "#") { $("#analysis").html(dataCompare[i].chatter); }
            else { $("#analysis").html(""); }
            if (mIncome >= 70000) { $("#income").addClass("gray5"); }
            else if (mIncome >= 50000) { $("#income").addClass("gray4"); } 
            else if (mIncome >= 40000) { $("#income").addClass("gray3"); }
            else if (mIncome >= 32000) { $("#income").addClass("gray2"); }
            else if (mIncome > 25000) { $("#income").addClass("gray1"); }
        }
      }

$('.statNum').removeClass("gray5, gray4, gray3, gray2, gray1");

         $('.statNum').each(function() {
      $(this).removeClass("gray5");
      $(this).removeClass("gray4");
      $(this).removeClass("gray3");
      $(this).removeClass("gray2");
      $(this).removeClass("gray1");
    var num = $(this).text();
      if (num >= .80) { $(this).addClass("gray5"); $(this).html(d3.format("%")(num)); }
      else if (num >= .60) { $(this).addClass("gray4"); $(this).html(d3.format("%")(num)); } 
      else if (num >= .30) { $(this).addClass("gray3"); $(this).html(d3.format("%")(num)); }
      else if (num >= .10) { $(this).addClass("gray2"); $(this).html(d3.format("%")(num)); }
      else if (num > 0) { $(this).addClass("gray1"); $(this).html(d3.format("%")(num)); }
    });

            })
            .text(function(d) {
                return d.state_postal;
            })
            .call(d3.helper.tooltip(function(d, i){
              for (var i=0; i < dataCompare.length; i++){
  if (Number(dataCompare[i].district) == Number(d.state_postal) && dataCompare[i].chamber == "senate"){
      if (dataCompare[i].party == "GOP") { 
        if  (dataCompare[i].PCT2014 > 80) { return "<div><strong>" + d.state_full + "</strong></div><div>" + dataCompare[i].candidate + " (" + dataCompare[i].party + ")" + "</div><div class='r4'>" +  Math.round(dataCompare[i].PCT2014) + "% 2012 WIN</div>"; }
        else if  (dataCompare[i].PCT2014 > 70) { return "<div><strong>" + d.state_full + "</strong></div><div>" + dataCompare[i].candidate + " (" + dataCompare[i].party + ")" + "</div><div class='r3'>" +  Math.round(dataCompare[i].PCT2014) + "% 2012 WIN</div>"; }
        else if  (dataCompare[i].PCT2014 > 60) { return "<div><strong>" + d.state_full + "</strong></div><div>" + dataCompare[i].candidate + " (" + dataCompare[i].party + ")" + "</div><div class='r2'>" +  Math.round(dataCompare[i].PCT2014) + "% 2012 WIN</div>"; }
        else if  (dataCompare[i].PCT2014 > 50) { return "<div><strong>" + d.state_full + "</strong></div><div>" + dataCompare[i].candidate + " (" + dataCompare[i].party + ")" + "</div><div class='r1'>" +  Math.round(dataCompare[i].PCT2014) + "% 2012 WIN</div>"; }
      }
      else if (dataCompare[i].party == "DFL") { 
        if  (dataCompare[i].PCT2014 > 80) { return "<div><strong>" + d.state_full + "</strong></div><div>" + dataCompare[i].candidate + " (" + dataCompare[i].party + ")" + "</div><div class='d4'>" +  Math.round(dataCompare[i].PCT2014) + "% 2012 WIN</div>"; }
        else if  (dataCompare[i].PCT2014 > 70) { return "<div><strong>" + d.state_full + "</strong></div><div>" + dataCompare[i].candidate + " (" + dataCompare[i].party + ")" + "</div><div class='d3'>" +  Math.round(dataCompare[i].PCT2014) + "% 2012 WIN</div>"; }
        else if  (dataCompare[i].PCT2014 > 60) { return "<div><strong>" + d.state_full + "</strong></div><div>" + dataCompare[i].candidate + " (" + dataCompare[i].party + ")" + "</div><div class='d2'>" +  Math.round(dataCompare[i].PCT2014) + "% 2012 WIN</div>"; }
        else if  (dataCompare[i].PCT2014 > 50) { return "<div><strong>" + d.state_full + "</strong></div><div>" + dataCompare[i].candidate + " (" + dataCompare[i].party + ")" + "</div><div class='d1'>" +  Math.round(dataCompare[i].PCT2014) + "% 2012 WIN</div>"; }
      }
    }
  }
     
            }));
    },

    state_pos_co2: data

};

$(document).ready(function() {
cartogram[index].init();
});

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


}

function cartoData(race,geo){
var usCarto = [{'state_full':'Alabama','state_postal':'AL','row':5,'column':6,'state_total_old':'32','state_total_new':'25','state_change':'-63%','color':'dq1'},
        {'state_full':'Alaska','state_postal':'AK','row':6,'column':0,'state_total_old':'0','state_total_new':'0','state_change':'Insufficient data','color':'none'},
        {'state_full':'Arizona','state_postal':'AZ','row':4,'column':1,'state_total_old':'14','state_total_new':'36','state_change':'+36%','color':'dq7'},
        {'state_full':'Arkansas','state_postal':'AR','row':4,'column':4,'state_total_old':'36','state_total_new':'43','state_change':'-33%','color':'dq3'},
        {'state_full':'California','state_postal':'CA','row':3,'column':0,'state_total_old':'358','state_total_new':'267','state_change':'-25%','color':'dq3'},
        {'state_full':'Colorado','state_postal':'CO','row':3,'column':2,'state_total_old':'124','state_total_new':'93','state_change':'-33%','color':'dq3'},
        {'state_full':'Connecticut','state_postal':'CT','row':2,'column':9,'state_total_old':'0','state_total_new':'6','state_change':'Insufficient data','color':'none'},
        {'state_full':'D.C.','state_postal':'DC','row':4,'column':8,'state_total_old':'0','state_total_new':'0','state_change':'Insufficient data','color':'none'},
        {'state_full':'Delaware','state_postal':'DE','row':3,'column':9,'state_total_old':'3','state_total_new':'3','state_change':'-100%','color':'dq1'},
        {'state_full':'Florida','state_postal':'FL','row':6,'column':8,'state_total_old':'150','state_total_new':'136','state_change':'-14%','color':'dq4'},
        {'state_full':'Georgia','state_postal':'GA','row':5,'column':7,'state_total_old':'77','state_total_new':'59','state_change':'-38%','color':'dq3'},
        {'state_full':'Hawaii','state_postal':'HI','row':6,'column':-1,'state_total_old':'0','state_total_new':'11','state_change':'Insufficient data','color':'none'},
        {'state_full':'Idaho','state_postal':'ID','row':1,'column':1,'state_total_old':'71','state_total_new':'68','state_change':'-21%','color':'dq3'},
        {'state_full':'Illinois','state_postal':'IL','row':1,'column':6,'state_total_old':'251','state_total_new':'221','state_change':'-14%','color':'dq4'},
        {'state_full':'Indiana','state_postal':'IN','row':2,'column':5,'state_total_old':'216','state_total_new':'220','state_change':'0%','color':'mid'},
        {'state_full':'Iowa','state_postal':'IA','row':2,'column':4,'state_total_old':'228','state_total_new':'295','state_change':'+29%','color':'dq6'},
        {'state_full':'Kansas','state_postal':'KS','row':4,'column':3,'state_total_old':'215','state_total_new':'205','state_change':'-6%','color':'dq4'},
        {'state_full':'Kentucky','state_postal':'KY','row':3,'column':5,'state_total_old':'308','state_total_new':'162','state_change':'-49%','color':'dq2'},
        {'state_full':'Louisiana','state_postal':'LA','row':5,'column':4,'state_total_old':'30','state_total_new':'26','state_change':'-53%','color':'dq1'},
        {'state_full':'Maine','state_postal':'ME','row':-1,'column':10,'state_total_old':'0','state_total_new':'14','state_change':'Insufficient data','color':'none'},
        {'state_full':'Maryland','state_postal':'MD','row':3,'column':8,'state_total_old':'26','state_total_new':'27','state_change':'-46%','color':'dq2'},
        {'state_full':'Massachusetts','state_postal':'MA','row':1,'column':9,'state_total_old':'0','state_total_new':'11','state_change':'Insufficient data','color':'none'},
        {'state_full':'Michigan','state_postal':'MI','row':1,'column':7,'state_total_old':'102','state_total_new':'179','state_change':'+74%','color':'dq8'},
        {'state_full':'Minnesota','state_postal':'MN','row':1,'column':4,'state_total_old':'153','state_total_new':'210','state_change':'+37%','color':'dq7'},
        {'state_full':'Mississippi','state_postal':'MS','row':5,'column':5,'state_total_old':'65','state_total_new':'46','state_change':'-57%','color':'dq1'},
        {'state_full':'Missouri','state_postal':'MO','row':3,'column':4,'state_total_old':'264','state_total_new':'288','state_change':'+5%','color':'dq5'},
        {'state_full':'Montana','state_postal':'MT','row':1,'column':2,'state_total_old':'145','state_total_new':'139','state_change':'-10%','color':'dq4'},
        {'state_full':'Nebraska','state_postal':'NE','row':3,'column':3,'state_total_old':'199','state_total_new':'179','state_change':'-11%','color':'dq4'},
        {'state_full':'Nevada','state_postal':'NV','row':2,'column':1,'state_total_old':'0','state_total_new':'11','state_change':'Insufficient data','color':'none'},
        {'state_full':'New Hampshire','state_postal':'NH','row':0,'column':10,'state_total_old':'0','state_total_new':'4','state_change':'Insufficient data','color':'none'},
        {'state_full':'New Jersey','state_postal':'NJ','row':2,'column':8,'state_total_old':'8','state_total_new':'19','state_change':'+50%','color':'dq8'},
        {'state_full':'New Mexico','state_postal':'NM','row':4,'column':2,'state_total_old':'24','state_total_new':'14','state_change':'-100%','color':'dq1'},
        {'state_full':'New York','state_postal':'NY','row':1,'column':8,'state_total_old':'203','state_total_new':'135','state_change':'-38%','color':'dq3'},
        {'state_full':'North Carolina','state_postal':'NC','row':4,'column':6,'state_total_old':'156','state_total_new':'111','state_change':'-35%','color':'dq3'},
        {'state_full':'North Dakota','state_postal':'ND','row':1,'column':3,'state_total_old':'84','state_total_new':'117','state_change':'+36%','color':'dq7'},
        {'state_full':'Ohio','state_postal':'OH','row':2,'column':6,'state_total_old':'258','state_total_new':'217','state_change':'-18%','color':'dq4'},
        {'state_full':'Oklahoma','state_postal':'OK','row':5,'column':3,'state_total_old':'46','state_total_new':'53','state_change':'-30%','color':'dq3'},
        {'state_full':'Oregon','state_postal':'OR','row':2,'column':0,'state_total_old':'40','state_total_new':'61','state_change':'+20%','color':'dq6'},
        {'state_full':'Pennsylvania','state_postal':'PA','row':2,'column':7,'state_total_old':'276','state_total_new':'182','state_change':'-34%','color':'dq3'},
        {'state_full':'Rhode Island','state_postal':'RI','row':2,'column':10,'state_total_old':'0','state_total_new':'0','state_change':'Insufficient data','color':'none'},
        {'state_full':'South Carolina','state_postal':'SC','row':4,'column':7,'state_total_old':'16','state_total_new':'30','state_change':'+38%','color':'dq7'},
        {'state_full':'South Dakota','state_postal':'SD','row':2,'column':3,'state_total_old':'88','state_total_new':'108','state_change':'+17%','color':'dq6'},
        {'state_full':'Tennessee','state_postal':'TN','row':4,'column':5,'state_total_old':'244','state_total_new':'147','state_change':'-42%','color':'dq2'},
        {'state_full':'Texas','state_postal':'TX','row':6,'column':3,'state_total_old':'223','state_total_new':'159','state_change':'+29%','color':'dq3'},
        {'state_full':'Utah','state_postal':'UT','row':3,'column':1,'state_total_old':'24','state_total_new':'24','state_change':'-67%','color':'dq1'},
        {'state_full':'Vermont','state_postal':'VT','row':0,'column':9,'state_total_old':'7','state_total_new':'15','state_change':'-57%','color':'dq1'},
        {'state_full':'Virginia','state_postal':'VA','row':3,'column':7,'state_total_old':'130','state_total_new':'123','state_change':'-10%','color':'dq4'},
        {'state_full':'Washington','state_postal':'WA','row':1,'column':0,'state_total_old':'88','state_total_new':'63','state_change':'-39%','color':'dq3'},
        {'state_full':'West Virginia','state_postal':'WV','row':3,'column':6,'state_total_old':'9','state_total_new':'22','state_change':'0%','color':'mid'},
        {'state_full':'Wisconsin','state_postal':'WI','row':1,'column':5,'state_total_old':'279','state_total_new':'242','state_change':'-15%','color':'dq4'},
        {'state_full':'Wyoming','state_postal':'WY','row':2,'column':2,'state_total_old':'33','state_total_new':'37','state_change':'-21%','color':'dq3'}]

var usCDCarto = [{'state_full':'Alabama','state_postal':'AL','row':5,'column':6,'state_total_old':'32','state_total_new':'25','state_change':'-63%','color':'dq1'},
        {'state_full':'Alaska','state_postal':'AK','row':6,'column':0,'state_total_old':'0','state_total_new':'0','state_change':'Insufficient data','color':'none'},
        {'state_full':'Arizona','state_postal':'AZ','row':4,'column':1,'state_total_old':'14','state_total_new':'36','state_change':'+36%','color':'dq7'},
        {'state_full':'Arkansas','state_postal':'AR','row':4,'column':4,'state_total_old':'36','state_total_new':'43','state_change':'-33%','color':'dq3'},
        {'state_full':'California','state_postal':'CA','row':3,'column':0,'state_total_old':'358','state_total_new':'267','state_change':'-25%','color':'dq3'},
        {'state_full':'Colorado','state_postal':'CO','row':3,'column':2,'state_total_old':'124','state_total_new':'93','state_change':'-33%','color':'dq3'},
        {'state_full':'Connecticut','state_postal':'CT','row':2,'column':9,'state_total_old':'0','state_total_new':'6','state_change':'Insufficient data','color':'none'},
        {'state_full':'D.C.','state_postal':'DC','row':4,'column':8,'state_total_old':'0','state_total_new':'0','state_change':'Insufficient data','color':'none'},
        {'state_full':'Delaware','state_postal':'DE','row':3,'column':9,'state_total_old':'3','state_total_new':'3','state_change':'-100%','color':'dq1'},
        {'state_full':'Florida','state_postal':'FL','row':6,'column':8,'state_total_old':'150','state_total_new':'136','state_change':'-14%','color':'dq4'},
        {'state_full':'Georgia','state_postal':'GA','row':5,'column':7,'state_total_old':'77','state_total_new':'59','state_change':'-38%','color':'dq3'},
        {'state_full':'Hawaii','state_postal':'HI','row':6,'column':-1,'state_total_old':'0','state_total_new':'11','state_change':'Insufficient data','color':'none'},
        {'state_full':'Idaho','state_postal':'ID','row':1,'column':1,'state_total_old':'71','state_total_new':'68','state_change':'-21%','color':'dq3'},
        {'state_full':'Illinois','state_postal':'IL','row':1,'column':6,'state_total_old':'251','state_total_new':'221','state_change':'-14%','color':'dq4'},
        {'state_full':'Indiana','state_postal':'IN','row':2,'column':5,'state_total_old':'216','state_total_new':'220','state_change':'0%','color':'mid'},
        {'state_full':'Iowa','state_postal':'IA','row':2,'column':4,'state_total_old':'228','state_total_new':'295','state_change':'+29%','color':'dq6'},
        {'state_full':'Kansas','state_postal':'KS','row':4,'column':3,'state_total_old':'215','state_total_new':'205','state_change':'-6%','color':'dq4'},
        {'state_full':'Kentucky','state_postal':'KY','row':3,'column':5,'state_total_old':'308','state_total_new':'162','state_change':'-49%','color':'dq2'},
        {'state_full':'Louisiana','state_postal':'LA','row':5,'column':4,'state_total_old':'30','state_total_new':'26','state_change':'-53%','color':'dq1'},
        {'state_full':'Maine','state_postal':'ME','row':-1,'column':10,'state_total_old':'0','state_total_new':'14','state_change':'Insufficient data','color':'none'},
        {'state_full':'Maryland','state_postal':'MD','row':3,'column':8,'state_total_old':'26','state_total_new':'27','state_change':'-46%','color':'dq2'},
        {'state_full':'Massachusetts','state_postal':'MA','row':1,'column':9,'state_total_old':'0','state_total_new':'11','state_change':'Insufficient data','color':'none'},
        {'state_full':'Michigan','state_postal':'MI','row':1,'column':7,'state_total_old':'102','state_total_new':'179','state_change':'+74%','color':'dq8'},
        {'state_full':'Minnesota','state_postal':'MN','row':1,'column':4,'state_total_old':'153','state_total_new':'210','state_change':'+37%','color':'dq7'},
        {'state_full':'Mississippi','state_postal':'MS','row':5,'column':5,'state_total_old':'65','state_total_new':'46','state_change':'-57%','color':'dq1'},
        {'state_full':'Missouri','state_postal':'MO','row':3,'column':4,'state_total_old':'264','state_total_new':'288','state_change':'+5%','color':'dq5'},
        {'state_full':'Montana','state_postal':'MT','row':1,'column':2,'state_total_old':'145','state_total_new':'139','state_change':'-10%','color':'dq4'},
        {'state_full':'Nebraska','state_postal':'NE','row':3,'column':3,'state_total_old':'199','state_total_new':'179','state_change':'-11%','color':'dq4'},
        {'state_full':'Nevada','state_postal':'NV','row':2,'column':1,'state_total_old':'0','state_total_new':'11','state_change':'Insufficient data','color':'none'},
        {'state_full':'New Hampshire','state_postal':'NH','row':0,'column':10,'state_total_old':'0','state_total_new':'4','state_change':'Insufficient data','color':'none'},
        {'state_full':'New Jersey','state_postal':'NJ','row':2,'column':8,'state_total_old':'8','state_total_new':'19','state_change':'+50%','color':'dq8'},
        {'state_full':'New Mexico','state_postal':'NM','row':4,'column':2,'state_total_old':'24','state_total_new':'14','state_change':'-100%','color':'dq1'},
        {'state_full':'New York','state_postal':'NY','row':1,'column':8,'state_total_old':'203','state_total_new':'135','state_change':'-38%','color':'dq3'},
        {'state_full':'North Carolina','state_postal':'NC','row':4,'column':6,'state_total_old':'156','state_total_new':'111','state_change':'-35%','color':'dq3'},
        {'state_full':'North Dakota','state_postal':'ND','row':1,'column':3,'state_total_old':'84','state_total_new':'117','state_change':'+36%','color':'dq7'},
        {'state_full':'Ohio','state_postal':'OH','row':2,'column':6,'state_total_old':'258','state_total_new':'217','state_change':'-18%','color':'dq4'},
        {'state_full':'Oklahoma','state_postal':'OK','row':5,'column':3,'state_total_old':'46','state_total_new':'53','state_change':'-30%','color':'dq3'},
        {'state_full':'Oregon','state_postal':'OR','row':2,'column':0,'state_total_old':'40','state_total_new':'61','state_change':'+20%','color':'dq6'},
        {'state_full':'Pennsylvania','state_postal':'PA','row':2,'column':7,'state_total_old':'276','state_total_new':'182','state_change':'-34%','color':'dq3'},
        {'state_full':'Rhode Island','state_postal':'RI','row':2,'column':10,'state_total_old':'0','state_total_new':'0','state_change':'Insufficient data','color':'none'},
        {'state_full':'South Carolina','state_postal':'SC','row':4,'column':7,'state_total_old':'16','state_total_new':'30','state_change':'+38%','color':'dq7'},
        {'state_full':'South Dakota','state_postal':'SD','row':2,'column':3,'state_total_old':'88','state_total_new':'108','state_change':'+17%','color':'dq6'},
        {'state_full':'Tennessee','state_postal':'TN','row':4,'column':5,'state_total_old':'244','state_total_new':'147','state_change':'-42%','color':'dq2'},
        {'state_full':'Texas','state_postal':'TX','row':6,'column':3,'state_total_old':'223','state_total_new':'159','state_change':'+29%','color':'dq3'},
        {'state_full':'Utah','state_postal':'UT','row':3,'column':1,'state_total_old':'24','state_total_new':'24','state_change':'-67%','color':'dq1'},
        {'state_full':'Vermont','state_postal':'VT','row':0,'column':9,'state_total_old':'7','state_total_new':'15','state_change':'-57%','color':'dq1'},
        {'state_full':'Virginia','state_postal':'VA','row':3,'column':7,'state_total_old':'130','state_total_new':'123','state_change':'-10%','color':'dq4'},
        {'state_full':'Washington','state_postal':'WA','row':1,'column':0,'state_total_old':'88','state_total_new':'63','state_change':'-39%','color':'dq3'},
        {'state_full':'West Virginia','state_postal':'WV','row':3,'column':6,'state_total_old':'9','state_total_new':'22','state_change':'0%','color':'mid'},
        {'state_full':'Wisconsin','state_postal':'WI','row':1,'column':5,'state_total_old':'279','state_total_new':'242','state_change':'-15%','color':'dq4'},
        {'state_full':'Wyoming','state_postal':'WY','row':2,'column':2,'state_total_old':'33','state_total_new':'37','state_change':'-21%','color':'dq3'}]


var mnCountyCarto = [{'state_full':'Kittson','state_postal':'KITT','row':0,'column':0,'color_value':34},
        {'state_full':'Lake of the Woods','state_postal':'LW','row':-1,'column':1,'color_value':38},
        {'state_full':'Roseau','state_postal':'ROS','row':0,'column':1,'color_value':67},
        {'state_full':'Koochiching','state_postal':'KOO','row':0,'column':2,'color_value':35},
        {'state_full':'Saint Louis','state_postal':'STL','row':0,'column':3,'color_value':71},
        {'state_full':'Lake','state_postal':'LAKE','row':0,'column':4,'color_value':37},
        {'state_full':'Cook','state_postal':'COOK','row':0,'column':5,'color_value':15},
        {'state_full':'Marshall','state_postal':'MAR','row':1,'column':0,'color_value':43},
        {'state_full':'Beltrami','state_postal':'BEL','row':1,'column':1,'color_value':3},
        {'state_full':'Itasca','state_postal':'ITAS','row':1,'column':2,'color_value':30},
        {'state_full':'Aitkin','state_postal':'AITK','row':1,'column':3,'color_value':0},
        {'state_full':'Carlton','state_postal':'CARL','row':1,'column':4,'color_value':8},
        {'state_full':'Polk','state_postal':'POLK','row':2,'column':0,'color_value':59},
        {'state_full':'Pennington','state_postal':'PENN','row':2,'column':1,'color_value':56},
        {'state_full':'Red Lake','state_postal':'RL','row':2,'column':2,'color_value':62},
        {'state_full':'Clearwater','state_postal':'CW','row':2,'column':3,'color_value':14},
        {'state_full':'Hubbard','state_postal':'HUB','row':2,'column':4,'color_value':28},
        {'state_full':'Norman','state_postal':'NORM','row':3,'column':0,'color_value':53},
        {'state_full':'Mahnomen','state_postal':'MAHN','row':3,'column':1,'color_value':42},
        {'state_full':'Cass','state_postal':'CASS','row':3,'column':2,'color_value':10},
        {'state_full':'Crow Wing','state_postal':'CROW','row':3,'column':3,'color_value':17},
        {'state_full':'Pine','state_postal':'PINE','row':3,'column':4,'color_value':57},
        {'state_full':'Clay','state_postal':'CLAY','row':4,'column':0,'color_value':13},
        {'state_full':'Becker','state_postal':'BECK','row':4,'column':1,'color_value':2},
        {'state_full':'Wadena','state_postal':'WAD','row':4,'column':2,'color_value':79},
        {'state_full':'Mille Lacs','state_postal':'ML','row':4,'column':3,'color_value':47},
        {'state_full':'Kanabec','state_postal':'KANA','row':4,'column':4,'color_value':32},
        {'state_full':'Wilkin','state_postal':'WILK','row':5,'column':0,'color_value':83},
        {'state_full':'Ottertail','state_postal':'OT','row':5,'column':1,'color_value':44},
        {'state_full':'Todd','state_postal':'TODD','row':5,'column':2,'color_value':76},
        {'state_full':'Morrison','state_postal':'MORR','row':5,'column':3,'color_value':48},
        {'state_full':'Benton','state_postal':'BEN','row':5,'column':4,'color_value':4},
        {'state_full':'Traverse','state_postal':'TRAV','row':6,'column':0,'color_value':77},
        {'state_full':'Grant','state_postal':'GRANT','row':6,'column':1,'color_value':25},
        {'state_full':'Douglas','state_postal':'DOUG','row':6,'column':2,'color_value':20},
        {'state_full':'Stearns','state_postal':'STRNS','row':6,'column':3,'color_value':72},
        {'state_full':'Isanti','state_postal':'ISA','row':6,'column':4,'color_value':29},
        {'state_full':'Big Stone','state_postal':'BIG','row':7,'column':0,'color_value':5},
        {'state_full':'Stevens','state_postal':'STEVE','row':7,'column':1,'color_value':74},
        {'state_full':'Pope','state_postal':'POP','row':7,'column':2,'color_value':60},
        {'state_full':'Sherburne','state_postal':'SB','row':7,'column':3,'color_value':69},
        {'state_full':'Anoka','state_postal':'AK','row':7,'column':4,'color_value':1},
        {'state_full':'Chisago','state_postal':'CHIS','row':7,'column':5,'color_value':12},
        {'state_full':'Swift','state_postal':'SWIFT','row':8,'column':0,'color_value':75},
        {'state_full':'Kandiyohi','state_postal':'KAN','row':8,'column':1,'color_value':33},
        {'state_full':'Meeker','state_postal':'MEEK','row':8,'column':2,'color_value':46},
        {'state_full':'Wright','state_postal':'WR','row':8,'column':3,'color_value':85},
        {'state_full':'Hennepin','state_postal':'HENN','row':8,'column':4,'color_value':26},
        {'state_full':'Ramsey','state_postal':'RAM','row':8,'column':5,'color_value':61},
        {'state_full':'Washington','state_postal':'WA','row':8,'column':6,'color_value':81},
        {'state_full':'Yellow Medicine','state_postal':'YM','row':9,'column':0,'color_value':86},
        {'state_full':'Renville','state_postal':'REN','row':9,'column':1,'color_value':64},
        {'state_full':'McLeod','state_postal':'MCL','row':9,'column':2,'color_value':45},
        {'state_full':'Sibley','state_postal':'SIB','row':9,'column':3,'color_value':70},
        {'state_full':'Carver','state_postal':'CV','row':9,'column':4,'color_value':9},
        {'state_full':'Scott','state_postal':'SCT','row':9,'column':5,'color_value':68},
        {'state_full':'Dakota','state_postal':'DAK','row':9,'column':6,'color_value':18},
        {'state_full':'Goodhue','state_postal':'GOOD','row':9,'column':7,'color_value':24},
        {'state_full':'Lincoln','state_postal':'LIN','row':10,'column':0,'color_value':40},
        {'state_full':'Lyon','state_postal':'LYON','row':10,'column':1,'color_value':41},
        {'state_full':'Redwood','state_postal':'RW','row':10,'column':2,'color_value':63},
        {'state_full':'Brown','state_postal':'BR','row':10,'column':3,'color_value':7},
        {'state_full':'Nicollet','state_postal':'NIC','row':10,'column':4,'color_value':51},
        {'state_full':'Blue Earth','state_postal':'BLUE','row':10,'column':5,'color_value':6},
        {'state_full':'Le Sueur','state_postal':'LS','row':10,'column':6,'color_value':39},
        {'state_full':'Rice','state_postal':'RICE','row':10,'column':7,'color_value':65},
        {'state_full':'Wabasha','state_postal':'WAB','row':10,'column':8,'color_value':78},
        {'state_full':'Pipestone','state_postal':'PS','row':11,'column':0,'color_value':58},
        {'state_full':'Murray','state_postal':'MURR','row':11,'column':1,'color_value':50},
        {'state_full':'Cottonwood','state_postal':'CW','row':11,'column':2,'color_value':16},
        {'state_full':'Watonwan','state_postal':'WTW','row':11,'column':3,'color_value':82},
        {'state_full':'Waseca','state_postal':'WAS','row':11,'column':4,'color_value':80},
        {'state_full':'Steele','state_postal':'ST','row':11,'column':5,'color_value':73},
        {'state_full':'Dodge','state_postal':'DG','row':11,'column':6,'color_value':19},
        {'state_full':'Olmsted','state_postal':'OLM','row':11,'column':7,'color_value':54},
        {'state_full':'Winona','state_postal':'WIN','row':11,'column':8,'color_value':84},
        {'state_full':'Rock','state_postal':'ROCK','row':12,'column':0,'color_value':66},
        {'state_full':'Nobles','state_postal':'NOB','row':12,'column':1,'color_value':52},
        {'state_full':'Jackson','state_postal':'JACK','row':12,'column':2,'color_value':31},
        {'state_full':'Martin','state_postal':'MART','row':12,'column':3,'color_value':44},
        {'state_full':'Faribault','state_postal':'FB','row':12,'column':4,'color_value':21},
        {'state_full':'Freeborn','state_postal':'FREE','row':12,'column':5,'color_value':23},
        {'state_full':'Mower','state_postal':'MOW','row':12,'column':6,'color_value':49},
        {'state_full':'Fillmore','state_postal':'FILL','row':12,'column':7,'color_value':22},
        {'state_full':'Houston','state_postal':'HOU','row':12,'column':8,'color_value':27}
        ]

var mnlegMetroCarto = [{'state_full':'Distirct 30A','state_postal':'30A','row':0,'column':2,'color_value':53},
        {'state_full':'District 30B','state_postal':'30B','row':0,'column':3,'color_value':54},
        {'state_full':'District 35A','state_postal':'35A','row':0,'column':4,'color_value':61},
        {'state_full':'District 35B','state_postal':'35B','row':0,'column':5,'color_value':62},
        {'state_full':'District 31B','state_postal':'31B','row':0,'column':6,'color_value':55},
        {'state_full':'District 32B','state_postal':'32B','row':0,'column':7,'color_value':57},
        {'state_full':'District 34A','state_postal':'34A','row':1,'column':1,'color_value':0},
        {'state_full':'District 36A','state_postal':'36A','row':1,'column':2,'color_value':63},
        {'state_full':'District 36B','state_postal':'36B','row':1,'column':3,'color_value':64},
        {'state_full':'District 37A','state_postal':'37A','row':1,'column':4,'color_value':65},
        {'state_full':'District 37B','state_postal':'37B','row':1,'column':5,'color_value':66},
        {'state_full':'District 38A','state_postal':'38A','row':1,'column':6,'color_value':67},
        {'state_full':'District 38B','state_postal':'38B','row':1,'column':7,'color_value':68},
        {'state_full':'District 39A','state_postal':'39A','row':1,'column':8,'color_value':69},
        {'state_full':'District 34B','state_postal':'34B','row':2,'column':1,'color_value':60},
        {'state_full':'District 40A','state_postal':'40A','row':2,'column':2,'color_value':71},
        {'state_full':'District 40B','state_postal':'40B','row':2,'column':3,'color_value':72},
        {'state_full':'District 41A','state_postal':'41A','row':2,'column':4,'color_value':73},
        {'state_full':'District 41B','state_postal':'41B','row':2,'column':5,'color_value':74},
        {'state_full':'District 42A','state_postal':'42A','row':2,'column':6,'color_value':75},
        {'state_full':'District 42B','state_postal':'42B','row':2,'column':7,'color_value':76},
        {'state_full':'District 43A','state_postal':'43A','row':2,'column':8,'color_value':77},
        {'state_full':'District 44A','state_postal':'44A','row':3,'column':0,'color_value':79},
        {'state_full':'District 45A','state_postal':'45A','row':3,'column':1,'color_value':81},
        {'state_full':'District 45B','state_postal':'45B','row':3,'column':2,'color_value':82},
        {'state_full':'District 59A','state_postal':'59A','row':3,'column':3,'color_value':108},
        {'state_full':'District 60A','state_postal':'60A','row':3,'column':4,'color_value':110},
        {'state_full':'District 66A','state_postal':'66A','row':3,'column':5,'color_value':122},
        {'state_full':'District 66B','state_postal':'66B','row':3,'column':6,'color_value':123},
        {'state_full':'District 67A','state_postal':'67A','row':3,'column':7,'color_value':124},
        {'state_full':'District 43B','state_postal':'43B','row':3,'column':8,'color_value':78},
        {'state_full':'District 39B','state_postal':'39B','row':3,'column':9,'color_value':70},
        {'state_full':'District 44B','state_postal':'44B','row':4,'column':1,'color_value':80},
        {'state_full':'District 46A','state_postal':'46A','row':4,'column':2,'color_value':83},
        {'state_full':'District 59B','state_postal':'59B','row':4,'column':3,'color_value':109},
        {'state_full':'District 60B','state_postal':'60B','row':4,'column':4,'color_value':111},
        {'state_full':'District 64A','state_postal':'64A','row':4,'column':5,'color_value':118},
        {'state_full':'District 65A','state_postal':'65A','row':4,'column':6,'color_value':120},
        {'state_full':'District 67B','state_postal':'67B','row':4,'column':7,'color_value':125},
        {'state_full':'District 53A','state_postal':'53A','row':4,'column':8,'color_value':96},
        {'state_full':'District 33B','state_postal':'33B','row':5,'column':1,'color_value':59},
        {'state_full':'District 46B','state_postal':'46B','row':5,'column':2,'color_value':84},
        {'state_full':'District 61A','state_postal':'61A','row':5,'column':3,'color_value':112},
        {'state_full':'District 62A','state_postal':'62A','row':5,'column':4,'color_value':114},
        {'state_full':'District 63A','state_postal':'63A','row':5,'column':5,'color_value':116},
        {'state_full':'District 65B','state_postal':'65B','row':5,'column':6,'color_value':121},
        {'state_full':'District 53B','state_postal':'53B','row':5,'column':7,'color_value':96},
        {'state_full':'District 54B','state_postal':'54B','row':5,'column':8,'color_value':99},
        {'state_full':'District 48A','state_postal':'48A','row':6,'column':1,'color_value':86},
        {'state_full':'District 49A','state_postal':'49A','row':6,'column':2,'color_value':88},
        {'state_full':'District 61B','state_postal':'61B','row':6,'column':3,'color_value':113},
        {'state_full':'District 62B','state_postal':'62B','row':6,'column':4,'color_value':115},
        {'state_full':'District 63B','state_postal':'63B','row':6,'column':5,'color_value':117},
        {'state_full':'District 64B','state_postal':'64B','row':6,'column':6,'color_value':119},
        {'state_full':'District 52A','state_postal':'52A','row':6,'column':7,'color_value':94},
        {'state_full':'District 54A','state_postal':'54A','row':6,'column':8,'color_value':98},
        {'state_full':'District 47B','state_postal':'47B','row':7,'column':1,'color_value':0},
        {'state_full':'District 48B','state_postal':'48B','row':7,'column':2,'color_value':87},
        {'state_full':'District 49B','state_postal':'49B','row':7,'column':3,'color_value':89},
        {'state_full':'District 50A','state_postal':'50A','row':7,'column':4,'color_value':90},
        {'state_full':'District 50B','state_postal':'50B','row':7,'column':5,'color_value':91},
        {'state_full':'District 51A','state_postal':'51A','row':7,'column':6,'color_value':92},
        {'state_full':'District 51B','state_postal':'51B','row':7,'column':7,'color_value':93},
        {'state_full':'District 52B','state_postal':'52B','row':7,'column':8,'color_value':95},
        {'state_full':'District 55A','state_postal':'55A','row':8,'column':2,'color_value':100},
        {'state_full':'District 55B','state_postal':'55B','row':8,'column':3,'color_value':101},
        {'state_full':'District 56A','state_postal':'56A','row':8,'column':4,'color_value':102},
        {'state_full':'District 56B','state_postal':'56B','row':8,'column':5,'color_value':103},
        {'state_full':'District 58A','state_postal':'58A','row':8,'column':6,'color_value':109},
        {'state_full':'District 57A','state_postal':'57A','row':8,'column':7,'color_value':104},
        {'state_full':'District 57B','state_postal':'57B','row':8,'column':8,'color_value':105}
        ]

var mnlegMNCarto = [{'state_full':'District 1A','state_postal':'01A','row':0,'column':0,'color_value':1},
        {'state_full':'District 2A','state_postal':'02A','row':-1,'column':1,'color_value':3},
        {'state_full':'District 1B','state_postal':'01B','row':0,'column':1,'color_value':2},
        {'state_full':'District 2B','state_postal':'02B','row':0,'column':2,'color_value':4},
        {'state_full':'District 6A','state_postal':'06A','row':0,'column':3,'color_value':11},
        {'state_full':'District 6B','state_postal':'06B','row':0,'column':4,'color_value':12},
        {'state_full':'District 3B','state_postal':'03B','row':0,'column':5,'color_value':6},
        {'state_full':'District 3A','state_postal':'03A','row':0,'column':6,'color_value':5},
        {'state_full':'District 4A','state_postal':'04A','row':1,'column':0,'color_value':7},
        {'state_full':'District 4B','state_postal':'04B','row':1,'column':1,'color_value':8},
        {'state_full':'District 5A','state_postal':'05A','row':1,'column':2,'color_value':9},
        {'state_full':'District 5B','state_postal':'05B','row':1,'column':3,'color_value':10},
        {'state_full':'District 7B','state_postal':'07B','row':1,'column':4,'color_value':14},
        {'state_full':'District 7A','state_postal':'07A','row':1,'column':5,'color_value':13},
        {'state_full':'District 8A','state_postal':'08A','row':2,'column':0,'color_value':15},
        {'state_full':'District 8B','state_postal':'08B','row':2,'column':1,'color_value':16},
        {'state_full':'District 10A','state_postal':'10A','row':2,'column':2,'color_value':19},
        {'state_full':'District 10B','state_postal':'10B','row':2,'column':3,'color_value':20},
        {'state_full':'District 11A','state_postal':'11A','row':2,'column':4,'color_value':21},
        {'state_full':'District 12A','state_postal':'12A','row':3,'column':0,'color_value':23},
        {'state_full':'District 9A','state_postal':'09A','row':3,'column':1,'color_value':17},
        {'state_full':'District 9B','state_postal':'09B','row':3,'column':2,'color_value':18},
        {'state_full':'District 15B','state_postal':'15B','row':3,'column':3,'color_value':29},
        {'state_full':'District 11B','state_postal':'11B','row':3,'column':4,'color_value':22},
        {'state_full':'District 12B','state_postal':'12B','row':4,'column':0,'color_value':24},
        {'state_full':'District 13A','state_postal':'13A','row':4,'column':1,'color_value':25},
        {'state_full':'District 13B','state_postal':'13B','row':4,'column':2,'color_value':0},
        {'state_full':'District 15A','state_postal':'15A','row':4,'column':3,'color_value':28},
        {'state_full':'District 32A','state_postal':'32A','row':4,'column':4,'color_value':56},
        {'state_full':'District 17A','state_postal':'17A','row':5,'column':0,'color_value':32},
        {'state_full':'District 17B','state_postal':'17B','row':5,'column':1,'color_value':33},
        {'state_full':'District 14A','state_postal':'14A','row':5,'column':2,'color_value':26},
        {'state_full':'District 14B','state_postal':'14B','row':5,'column':3,'color_value':27},
        {'state_full':'District 31A','state_postal':'31A','row':5,'column':4,'color_value':0},
        {'state_full':'District 15A','state_postal':'15A','row':6,'column':0,'color_value':28},
        {'state_full':'District 18A','state_postal':'18A','row':6,'column':1,'color_value':34},
        {'state_full':'District 29A','state_postal':'29A','row':6,'column':2,'color_value':0},
        {'state_full':'District 29B','state_postal':'29B','row':6,'column':3,'color_value':0},
        {'state_full':'District 16B','state_postal':'16B','row':7,'column':0,'color_value':31},
        {'state_full':'District 18B','state_postal':'18B','row':7,'column':1,'color_value':35},
        {'state_full':'District 47A','state_postal':'47A','row':7,'column':2,'color_value':85},
        {'state_full':'District 33A','state_postal':'33A','row':7,'column':3,'color_value':58},
        {'state_full':'District 19A','state_postal':'19A','row':8,'column':0,'color_value':36},
        {'state_full':'District 20A','state_postal':'20A','row':8,'column':1,'color_value':38},
        {'state_full':'District 20B','state_postal':'20B','row':8,'column':2,'color_value':39},
        {'state_full':'District 58B','state_postal':'58B','row':8,'column':3,'color_value':103},
        {'state_full':'District 21A','state_postal':'21A','row':8,'column':4,'color_value':40},
        {'state_full':'District 21B','state_postal':'21B','row':8,'column':5,'color_value':41},
        {'state_full':'District 22B','state_postal':'22B','row':9,'column':0,'color_value':43},
        {'state_full':'District 19B','state_postal':'19B','row':9,'column':1,'color_value':37},
        {'state_full':'District 23B','state_postal':'23B','row':9,'column':2,'color_value':0},
        {'state_full':'District 25B','state_postal':'25B','row':9,'column':3,'color_value':0},
        {'state_full':'District 24B','state_postal':'24B','row':9,'column':4,'color_value':46},
        {'state_full':'District 25A','state_postal':'25A','row':9,'column':5,'color_value':0},
        {'state_full':'District 28A','state_postal':'28A','row':9,'column':6,'color_value':51},
        {'state_full':'District 22A','state_postal':'22A','row':10,'column':0,'color_value':42},
        {'state_full':'District 22B','state_postal':'22B','row':10,'column':1,'color_value':43},
        {'state_full':'District 24A','state_postal':'24A','row':10,'column':2,'color_value':45},
        {'state_full':'District 26B','state_postal':'26B','row':10,'column':3,'color_value':48},
        {'state_full':'District 26A','state_postal':'26A','row':10,'column':4,'color_value':47},
        {'state_full':'District 27A','state_postal':'27A','row':10,'column':5,'color_value':49},
        {'state_full':'District 27B','state_postal':'27B','row':10,'column':6,'color_value':50},
        {'state_full':'District 28B','state_postal':'28B','row':10,'column':7,'color_value':52}
        ]

var mnsenMetroCarto = [{'state_full':'District 30','state_postal':'30','row':0,'column':2,'color_value':53},
        {'state_full':'District 30','state_postal':'30','row':0,'column':3,'color_value':54},
        {'state_full':'District 35','state_postal':'35','row':0,'column':4,'color_value':61},
        {'state_full':'District 35','state_postal':'35','row':0,'column':5,'color_value':62},
        {'state_full':'District 31','state_postal':'31','row':0,'column':6,'color_value':55},
        {'state_full':'District 32','state_postal':'32','row':0,'column':7,'color_value':57},
        {'state_full':'District 34','state_postal':'34','row':1,'column':1,'color_value':0},
        {'state_full':'District 36','state_postal':'36','row':1,'column':2,'color_value':63},
        {'state_full':'District 36','state_postal':'36','row':1,'column':3,'color_value':64},
        {'state_full':'District 37','state_postal':'37','row':1,'column':4,'color_value':65},
        {'state_full':'District 37','state_postal':'37','row':1,'column':5,'color_value':66},
        {'state_full':'District 38','state_postal':'38','row':1,'column':6,'color_value':67},
        {'state_full':'District 38','state_postal':'38','row':1,'column':7,'color_value':68},
        {'state_full':'District 39','state_postal':'39','row':1,'column':8,'color_value':69},
        {'state_full':'District 34','state_postal':'34','row':2,'column':1,'color_value':60},
        {'state_full':'District 40','state_postal':'40','row':2,'column':2,'color_value':71},
        {'state_full':'District 40','state_postal':'40','row':2,'column':3,'color_value':72},
        {'state_full':'District 41','state_postal':'41','row':2,'column':4,'color_value':73},
        {'state_full':'District 41','state_postal':'41','row':2,'column':5,'color_value':74},
        {'state_full':'District 42','state_postal':'42','row':2,'column':6,'color_value':75},
        {'state_full':'District 42','state_postal':'42','row':2,'column':7,'color_value':76},
        {'state_full':'District 43','state_postal':'43','row':2,'column':8,'color_value':77},
        {'state_full':'District 44','state_postal':'44','row':3,'column':0,'color_value':79},
        {'state_full':'District 45','state_postal':'45','row':3,'column':1,'color_value':81},
        {'state_full':'District 45','state_postal':'45','row':3,'column':2,'color_value':82},
        {'state_full':'District 59','state_postal':'59','row':3,'column':3,'color_value':108},
        {'state_full':'District 60','state_postal':'60','row':3,'column':4,'color_value':110},
        {'state_full':'District 66','state_postal':'66','row':3,'column':5,'color_value':122},
        {'state_full':'District 66','state_postal':'66','row':3,'column':6,'color_value':123},
        {'state_full':'District 67','state_postal':'67','row':3,'column':7,'color_value':124},
        {'state_full':'District 43','state_postal':'43','row':3,'column':8,'color_value':78},
        {'state_full':'District 39','state_postal':'39','row':3,'column':9,'color_value':70},
        {'state_full':'District 44','state_postal':'44','row':4,'column':1,'color_value':80},
        {'state_full':'District 46','state_postal':'46','row':4,'column':2,'color_value':83},
        {'state_full':'District 59','state_postal':'59','row':4,'column':3,'color_value':109},
        {'state_full':'District 60','state_postal':'60','row':4,'column':4,'color_value':111},
        {'state_full':'District 64','state_postal':'64','row':4,'column':5,'color_value':118},
        {'state_full':'District 65','state_postal':'65','row':4,'column':6,'color_value':120},
        {'state_full':'District 67','state_postal':'67','row':4,'column':7,'color_value':125},
        {'state_full':'District 53','state_postal':'53','row':4,'column':8,'color_value':96},
        {'state_full':'District 33','state_postal':'33','row':5,'column':1,'color_value':59},
        {'state_full':'District 46','state_postal':'46','row':5,'column':2,'color_value':84},
        {'state_full':'District 61','state_postal':'61','row':5,'column':3,'color_value':112},
        {'state_full':'District 62','state_postal':'62','row':5,'column':4,'color_value':114},
        {'state_full':'District 63','state_postal':'63','row':5,'column':5,'color_value':116},
        {'state_full':'District 65','state_postal':'65','row':5,'column':6,'color_value':121},
        {'state_full':'District 53','state_postal':'53','row':5,'column':7,'color_value':96},
        {'state_full':'District 54','state_postal':'54','row':5,'column':8,'color_value':99},
        {'state_full':'District 48','state_postal':'48','row':6,'column':1,'color_value':86},
        {'state_full':'District 49','state_postal':'49','row':6,'column':2,'color_value':88},
        {'state_full':'District 61','state_postal':'61','row':6,'column':3,'color_value':113},
        {'state_full':'District 62','state_postal':'62','row':6,'column':4,'color_value':115},
        {'state_full':'District 63','state_postal':'63','row':6,'column':5,'color_value':117},
        {'state_full':'District 64','state_postal':'64','row':6,'column':6,'color_value':119},
        {'state_full':'District 52','state_postal':'52','row':6,'column':7,'color_value':94},
        {'state_full':'District 54','state_postal':'54','row':6,'column':8,'color_value':98},
        {'state_full':'District 47','state_postal':'47','row':7,'column':1,'color_value':0},
        {'state_full':'District 48','state_postal':'48','row':7,'column':2,'color_value':87},
        {'state_full':'District 49','state_postal':'49','row':7,'column':3,'color_value':89},
        {'state_full':'District 50','state_postal':'50','row':7,'column':4,'color_value':90},
        {'state_full':'District 50','state_postal':'50','row':7,'column':5,'color_value':91},
        {'state_full':'District 51','state_postal':'51','row':7,'column':6,'color_value':92},
        {'state_full':'District 51','state_postal':'51','row':7,'column':7,'color_value':93},
        {'state_full':'District 52','state_postal':'52','row':7,'column':8,'color_value':95},
        {'state_full':'District 55','state_postal':'55','row':8,'column':2,'color_value':100},
        {'state_full':'District 55','state_postal':'55','row':8,'column':3,'color_value':101},
        {'state_full':'District 56','state_postal':'56','row':8,'column':4,'color_value':102},
        {'state_full':'District 56','state_postal':'56','row':8,'column':5,'color_value':103},
        {'state_full':'District 58','state_postal':'58','row':8,'column':6,'color_value':109},
        {'state_full':'District 57','state_postal':'57','row':8,'column':7,'color_value':104},
        {'state_full':'District 57','state_postal':'57','row':8,'column':8,'color_value':105}
        ]

var mnsenMNCarto = [{'state_full':'District 1','state_postal':'1','row':0,'column':0,'color_value':1},
        {'state_full':'District 2','state_postal':'2','row':-1,'column':1,'color_value':3},
        {'state_full':'District 1','state_postal':'1','row':0,'column':1,'color_value':2},
        {'state_full':'District 2','state_postal':'2','row':0,'column':2,'color_value':4},
        {'state_full':'District 6','state_postal':'6','row':0,'column':3,'color_value':11},
        {'state_full':'District 6','state_postal':'6','row':0,'column':4,'color_value':12},
        {'state_full':'District 3','state_postal':'3','row':0,'column':5,'color_value':6},
        {'state_full':'District 3','state_postal':'3','row':0,'column':6,'color_value':5},
        {'state_full':'District 4','state_postal':'4','row':1,'column':0,'color_value':7},
        {'state_full':'District 4','state_postal':'4','row':1,'column':1,'color_value':8},
        {'state_full':'District 5','state_postal':'5','row':1,'column':2,'color_value':9},
        {'state_full':'District 5','state_postal':'5','row':1,'column':3,'color_value':10},
        {'state_full':'District 7','state_postal':'7','row':1,'column':4,'color_value':14},
        {'state_full':'District 7','state_postal':'7','row':1,'column':5,'color_value':13},
        {'state_full':'District 8','state_postal':'8','row':2,'column':0,'color_value':15},
        {'state_full':'District 8','state_postal':'8','row':2,'column':1,'color_value':16},
        {'state_full':'District 10','state_postal':'10','row':2,'column':2,'color_value':19},
        {'state_full':'District 10','state_postal':'10','row':2,'column':3,'color_value':20},
        {'state_full':'District 11','state_postal':'11','row':2,'column':4,'color_value':21},
        {'state_full':'District 12','state_postal':'12','row':3,'column':0,'color_value':23},
        {'state_full':'District 9','state_postal':'9','row':3,'column':1,'color_value':17},
        {'state_full':'District 9','state_postal':'9','row':3,'column':2,'color_value':18},
        {'state_full':'District 15','state_postal':'15','row':3,'column':3,'color_value':29},
        {'state_full':'District 11','state_postal':'11','row':3,'column':4,'color_value':22},
        {'state_full':'District 12','state_postal':'12','row':4,'column':0,'color_value':24},
        {'state_full':'District 13','state_postal':'13','row':4,'column':1,'color_value':25},
        {'state_full':'District 13','state_postal':'13','row':4,'column':2,'color_value':0},
        {'state_full':'District 15','state_postal':'15','row':4,'column':3,'color_value':28},
        {'state_full':'District 32','state_postal':'32','row':4,'column':4,'color_value':56},
        {'state_full':'District 17','state_postal':'17','row':5,'column':0,'color_value':32},
        {'state_full':'District 17','state_postal':'17','row':5,'column':1,'color_value':33},
        {'state_full':'District 14','state_postal':'14','row':5,'column':2,'color_value':26},
        {'state_full':'District 14','state_postal':'14','row':5,'column':3,'color_value':27},
        {'state_full':'District 31','state_postal':'31','row':5,'column':4,'color_value':0},
        {'state_full':'District 16','state_postal':'16','row':6,'column':0,'color_value':28},
        {'state_full':'District 18','state_postal':'18','row':6,'column':1,'color_value':34},
        {'state_full':'District 29','state_postal':'29','row':6,'column':2,'color_value':0},
        {'state_full':'District 29','state_postal':'29','row':6,'column':3,'color_value':0},
        {'state_full':'District 16','state_postal':'16','row':7,'column':0,'color_value':31},
        {'state_full':'District 18','state_postal':'18','row':7,'column':1,'color_value':35},
        {'state_full':'District 47','state_postal':'47','row':7,'column':2,'color_value':85},
        {'state_full':'District 33','state_postal':'33','row':7,'column':3,'color_value':58},
        {'state_full':'District 19','state_postal':'19','row':8,'column':0,'color_value':36},
        {'state_full':'District 20','state_postal':'20','row':8,'column':1,'color_value':38},
        {'state_full':'District 20','state_postal':'20','row':8,'column':2,'color_value':39},
        {'state_full':'District 58','state_postal':'58','row':8,'column':3,'color_value':103},
        {'state_full':'District 21','state_postal':'21','row':8,'column':4,'color_value':40},
        {'state_full':'District 21','state_postal':'21','row':8,'column':5,'color_value':41},
        {'state_full':'District 22','state_postal':'22','row':9,'column':0,'color_value':43},
        {'state_full':'District 19','state_postal':'19','row':9,'column':1,'color_value':37},
        {'state_full':'District 23','state_postal':'23','row':9,'column':2,'color_value':0},
        {'state_full':'District 24','state_postal':'24','row':9,'column':3,'color_value':0},
        {'state_full':'District 25','state_postal':'25','row':9,'column':4,'color_value':46},
        {'state_full':'District 25','state_postal':'25','row':9,'column':5,'color_value':0},
        {'state_full':'District 28','state_postal':'28','row':9,'column':6,'color_value':51},
        {'state_full':'District 22','state_postal':'22','row':10,'column':0,'color_value':42},
        {'state_full':'District 23','state_postal':'23','row':10,'column':1,'color_value':43},
        {'state_full':'District 24','state_postal':'24','row':10,'column':2,'color_value':45},
        {'state_full':'District 26','state_postal':'26','row':10,'column':3,'color_value':48},
        {'state_full':'District 26','state_postal':'26','row':10,'column':4,'color_value':47},
        {'state_full':'District 27','state_postal':'27','row':10,'column':5,'color_value':49},
        {'state_full':'District 27','state_postal':'27','row':10,'column':6,'color_value':50},
        {'state_full':'District 28','state_postal':'28','row':10,'column':7,'color_value':52}
        ]

var mnCDCarto = [{'state_full':'Congressional District 7','state_postal':'7','row':0,'column':0,'color_value':6},
        {'state_full':'Congressional District 8','state_postal':'8','row':0,'column':1,'color_value':7},
        {'state_full':'Congressional District 6','state_postal':'6','row':1,'column':0,'color_value':5},
        {'state_full':'Congressional District 3','state_postal':'3','row':1,'column':1,'color_value':2},
        {'state_full':'Congressional District 5','state_postal':'5','row':2,'column':0,'color_value':4},
        {'state_full':'Congressional District 4','state_postal':'4','row':2,'column':1,'color_value':3},
        {'state_full':'Congressional District 1','state_postal':'1','row':3,'column':0,'color_value':0},
        {'state_full':'Congressional District 2','state_postal':'2','row':3,'column':1,'color_value':1}
        ]

if (race=="president" && geo=="us"){ return usCarto; }
if (race=="president" && geo=="mn"){ return mnCarto; }

if (race=="ushouse" && geo=="us"){ return usCDCarto; }
if (race=="ushouse" && geo=="mn"){ return mnCDCarto; }

if (race=="ussenate" && geo=="us"){ return usCarto; }
if (race=="ussenate" && geo=="mn"){ return mnCarto; }

if (race=="mnhouse" && geo=="mn"){ return mnlegMNCarto; }
if (race=="mnhouse" && geo=="metro"){ return mnlegMetroCarto; }

if (race=="mnsenate" && geo=="mn"){ return mnsenMNCarto; }
if (race=="mnsenate" && geo=="metro"){ return mnsenMetroCarto; }

if (race=="governors" && geo=="us"){ return usCarto; }
}

function cartoReshade(container, shape, subject, race, dataCompare, dataCarto) {
  // $(".district").removeClass("selected,fadeBox");
  // $(".district").addClass("fadeBox");

d3.selectAll(container + " svg rect")
      .data(dataCarto)
      .attr("class", function(d){
    if (subject == "current") { 
      // $(".district").removeClass("fadeBox");
  for (var i=0; i < dataCompare.length; i++){
    if (Number(dataCompare[i].district) == Number(d.state_postal) && dataCompare[i].chamber == "senate"){
      if (dataCompare[i].party == "GOP") { return "r3";}
      else if (dataCompare[i].party == "DFL") { return "d3"; }
    }
  }
   return "mid";
}

  else if (subject == "hot") { 
    for (var i=0; i < dataCompare.length; i++){
      if (Number(d.state_postal) == Number(dataCompare[i].district) && dataCompare[i].chamber == "senate"){
    if (dataCompare[i].HotDistrict == "x"){

        $("#d" + d.state_postal).removeClass("fadeBox");
        $("#d" + d.state_postal).addClass("selected,thisBox");

      if (dataCompare[i].party == "GOP") { 
        if  (dataCompare[i].PCT2014 > 70) { return "r3"; }
        else if  (dataCompare[i].PCT2014 > 60) { return "r2"; }
        else if  (dataCompare[i].PCT2014 > 50) { return "r1"; }
      }
      else if (dataCompare[i].party == "DFL") { 
        if  (dataCompare[i].PCT2014 > 70) { return "d3"; }
        else if  (dataCompare[i].PCT2014 > 60) { return "d2"; }
        else if  (dataCompare[i].PCT2014 > 50) { return "d1"; }
      }
    }
     
  }
}
 return "mid";
}
        else if (subject == "open") { 
    for (var i=0; i < dataCompare.length; i++){
      if (Number(d.state_postal) == Number(dataCompare[i].district) && dataCompare[i].chamber == "senate"){
    if (dataCompare[i].incumbant == "Open"){

        // $("#d" + d.state_postal).removeClass("fadeBox");
        // $("#d" + d.state_postal).addClass("selected,thisBox");


      if (dataCompare[i].party == "GOP") { 
        if  (dataCompare[i].PCT2014 > 70) { return "r3"; }
        else if  (dataCompare[i].PCT2014 > 60) { return "r2"; }
        else if  (dataCompare[i].PCT2014 > 50) { return "r1"; }
      }
      else if (dataCompare[i].party == "DFL") { 
        if  (dataCompare[i].PCT2014 > 70) { return "d3"; }
        else if  (dataCompare[i].PCT2014 > 60) { return "d2"; }
        else if  (dataCompare[i].PCT2014 > 50) { return "d1"; }
      }
    }
     
  }
}
 return "mid";
         }
        else if (subject == "rematch") { 
    for (var i=0; i < dataCompare.length; i++){
      if (Number(d.state_postal) == Number(dataCompare[i].district) && dataCompare[i].chamber == "senate"){
    if (dataCompare[i].incumbant == "Rematch"){

        // $("#d" + d.state_postal).removeClass("fadeBox");
        // $("#d" + d.state_postal).addClass("selected,thisBox");

      if (dataCompare[i].party == "GOP") { 
        if  (dataCompare[i].PCT2014 > 70) { return "r3"; }
        else if  (dataCompare[i].PCT2014 > 60) { return "r2"; }
        else if  (dataCompare[i].PCT2014 > 50) { return "r1"; }
      }
      else if (dataCompare[i].party == "DFL") { 
        if  (dataCompare[i].PCT2014 > 70) { return "d3"; }
        else if  (dataCompare[i].PCT2014 > 60) { return "d2"; }
        else if  (dataCompare[i].PCT2014 > 50) { return "d1"; }
      }
    }
     
  }
}
 return "mid";
         }
         else if (subject == "margins"){
          // $(".district").removeClass("fadeBox");
    for (var i=0; i < dataCompare.length; i++){
    if (Number(dataCompare[i].district) == Number(d.state_postal) && dataCompare[i].chamber == "senate"){
      if (dataCompare[i].party == "GOP") { 
        if  (dataCompare[i].PCT2014 > 70) { return "r3"; }
        else if  (dataCompare[i].PCT2014 > 60) { return "r2"; }
        else if  (dataCompare[i].PCT2014 > 48) { return "r1"; }
      }
      else if (dataCompare[i].party == "DFL") { 
        if  (dataCompare[i].PCT2014 > 70) { return "d3"; }
        else if  (dataCompare[i].PCT2014 > 60) { return "d2"; }
        else if  (dataCompare[i].PCT2014 > 48) { return "d1"; }
      }
    }
  }
         }
        else if (subject == "lean"){
        //   $(".district").removeClass("fadeBox");
    for (var i=0; i < dataCompare.length; i++){
    if (Number(dataCompare[i].district) == Number(d.state_postal) && dataCompare[i].chamber == "senate"){
     var rank = dataCompare[i].lean;
  if (rank == "DFL Stronghold") { color = "d3"; }
  if (rank == "DFL Lean") { color = "d2"; }
  if (rank == "Competitive") { var color = "mid" }
  if (rank == "GOP Lean") { color = "r2"; }
  if (rank == "GOP Stronghold") { color = "r3"; }
    return color;

    }
  }
         }
      });
}

$(".step").click(function() {
  $(".step").removeClass("selected");
  $(this).addClass("selected");
  $(".districtList").removeClass("selected");
  maths($(this).attr("data"),false);
  $("#infobox").hide();
  $(".rightSide").show();
  $("#profile").hide();
  // $(".district").removeClass("selected");
  $(".layer").hide();
  $("#" + $(this).attr("layer")).show();
  $(".mapSwitch").removeClass("selected2");
  $(".mapSwitch[data='" + $(this).attr("view") + "']").addClass("selected2");
  $(".maps").hide();
  $("#" + $(this).attr("view")).show();
  mapReshade("#mapState", "mnsenate.json", $(this).attr("data"), "senate", data);
  mapReshade("#mapMetro", "mnsenate_metro.json", $(this).attr("data"), "senate", data);
  cartoReshade("#cartoState", "mnsenate.json", $(this).attr("data"), "senate", data, cartoData("mnsenate","mn"));
  cartoReshade("#cartoMetro", "mnsenate_metro.json", $(this).attr("data"), "senate", data, cartoData("mnsenate","metro"));
  for (var i=0; i<dataChatter.length; i++){
    if ($(this).attr("index") == dataChatter[i].index){
      $(".chatterBox").html("<div class='chartTitle'>" + dataChatter[i].headline + "</div><div class='chatter'>" + dataChatter[i].chatter + "</div>");
      break;
    }
  }
  if ($(this).attr("data") == "history") { $("#changeView").css("visibility","hidden"); $("#legendMain").hide(); $("#legendMap").show(); }
  else if ($(this).attr("data") == "current") { $("#changeView").css("visibility","visible"); $("#legendMain").hide(); $("#legendMap").show(); }
  else { $("#changeView").css("visibility","visible"); $("#legendMain").show(); }
});

  mapBuild("#mapMetro", "#infobox", "#chart", "mnsenate_metro.json", "senate", "metro", data, 0);
  mapBuild("#mapState", "#infobox", "#chart", "mnsenate.json", "senate", "mn", data, 0);
  spitRankings("#dStrong","DFL Stronghold",false);
  spitRankings("#dump","DFL Stronghold",false);
  spitRankings("#dLean","DFL Lean",false);
  spitRankings("#dump","DFL Stronghold",false);
  spitRankings("#tossup","Competitive",false);
  spitRankings("#dump","DFL Stronghold",false);
  spitRankings("#rLean","GOP Lean",false);
  spitRankings("#dump","DFL Stronghold",false);
  spitRankings("#rStrong","GOP Stronghold",false);
  function maths(step,first){
  if (step == "current" || step == "history"){
  $("#dStrongCount").html(39);
  $("#dLeanCount").html(0);
  $("#tossupCount").html(0);
  $("#rLeanCount").html(0);
  $("#rStrongCount").html(28);

  $(".column").css({"display":"block",
    "width":"100%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});

  $("#legendMain").hide();

  $("#dLeanCount").parent().parent().hide();
  $("#tossupCount").parent().parent().hide();
  $("#rLeanCount").parent().parent().hide();
  $("#dStrongCount").parent().find(".describe").html(" GOP Seats");
  $("#dLeanCount").parent().find(".describe").html("");
  $("#tossupCount").parent().find(".describe").html("");
  $("#rLeanCount").parent().find(".describe").html("");
  $("#rStrongCount").parent().find(".describe").html(" GOP Seats");
  $(".gopCount").html(28);
  $(".dflCount").html(39);
  $(".midCount").html("");

  $(".half.d0").css({"width":"58%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.d0").attr("title","39 seats");
  $(".half.d2").css({"width":"0",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.d1").css({"width":"0",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.mid").css({"width":"0",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.r1").css({"width":"0",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.r2").css({"width":"0",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.r0").css({"width":"41%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.d0").attr("title","28 seats");
  if (first == true) { spitRankings("#dStrong","DFL","first"); spitRankings("#rStrong","GOP","first"); }
  else { spitRankings("#dStrong","DFL","all"); spitRankings("#rStrong","GOP","all"); }
  }
  if (step == "margins"){
  $("#dStrongCount").html(39);
  $("#dLeanCount").html(0);
  $("#tossupCount").html(0);
  $("#rLeanCount").html(0);
  $("#rStrongCount").html(28); 

  $("#legendMap").hide();

 $(".column").css({"display":"block",
    "width":"100%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});

  $("#dLeanCount").parent().parent().hide();
  $("#tossupCount").parent().parent().hide();
  $("#rLeanCount").parent().parent().hide();
  $("#dStrongCount").parent().find(".describe").html(" DFL Seats");
  $("#dLeanCount").parent().find(".describe").html("");
  $("#tossupCount").parent().find(".describe").html("");
  $("#rLeanCount").parent().find(".describe").html("");
  $("#rStrongCount").parent().find(".describe").html(" GOP Seats");
  $(".gopCount").html(28);
  $(".dflCount").html(39);
  $(".midCount").html("");

  $(".half.d0").css({"width":"18%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.d0").attr("title","12 seats");
  $(".half.d2").css({"width":"18%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.d2").attr("title","13 seats");
  $(".half.d1").css({"width":"22%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.d1").attr("title","15 seats");
  $(".half.mid").css({"width":"0",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.mid").attr("title","0 seats");
  $(".half.r1").css({"width":"32%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.r1").attr("title","22 seats");
  $(".half.r2").css({"width":"9%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.r2").attr("title","6 seats");
  $(".half.r0").css({"width":"0",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.r0").attr("title","0 seats");
  spitRankings("#dStrong","DFL","split");
  spitRankings("#dump","DFL","split");
  spitRankings("#dLean","DFL","split");
  spitRankings("#dump","DFL","split");
  spitRankings("#tossup","DFL","split");
  spitRankings("#dump","GOP","split");
  spitRankings("#rLean","GOP","split");
  spitRankings("#dump","GOP","split");
  spitRankings("#rStrong","GOP","split");
  }
  if (step == "lean"){
  $("#dStrongCount").html(20);
  $("#dLeanCount").html(6);
  $("#tossupCount").html(19);
  $("#rLeanCount").html(17);
  $("#rStrongCount").html(5); 
  $("#dLeanCount").parent().parent().show();
  $("#tossupCount").parent().parent().show();
  $("#rLeanCount").parent().parent().show();
  $("#dStrongCount").parent().find(".describe").html(" DFL Strongholds");
  $("#dLeanCount").parent().find(".describe").html(" DFL Leaning");
  $("#tossupCount").parent().find(".describe").html("Competitive");
  $("#rLeanCount").parent().find(".describe").html(" GOP Leaning");
  $("#rStrongCount").parent().find(".describe").html(" GOP Strongholds"); 
  $(".gopCount").html(22);
  $(".dflCount").html(26);
  $(".midCount").html("");

  $("#legendMap").hide();

  $(".column").css({"display":"inline-block",
    "width":"48%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});


  $(".half.d0").css({"width":"29%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.d0").attr("title","20 seats");
  $(".half.d2").css({"width":"0",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.d2").attr("title","0 seats");
  $(".half.d1").css({"width":"10%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.d1").attr("title","6 seats");
  $(".half.mid").css({"width":"28%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.mid").attr("title","19 seats");
  $(".half.r1").css({"width":"22%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.r1").attr("title","17 seats");
  $(".half.r2").css({"width":"0",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.r2").attr("title","0 seats");
  $(".half.r0").css({"width":"10%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.r0").attr("title","5 seats");
  spitRankings("#dStrong","DFL Stronghold",true);
  spitRankings("#dump","DFL Stronghold",true);
  spitRankings("#dLean","DFL Lean",true);
  spitRankings("#dump","DFL Stronghold",true);
  spitRankings("#tossup","Competitive",true);
  spitRankings("#dump","DFL Stronghold",true);
  spitRankings("#rLean","GOP Lean",true);
  spitRankings("#dump","DFL Stronghold",true);
  spitRankings("#rStrong","GOP Stronghold",true);
  }
  if (step == "hot"){
  $("#dStrongCount").html(0);
  $("#dLeanCount").html(0);
  $("#tossupCount").html(19);
  $("#rLeanCount").html(0);
  $("#rStrongCount").html(0); 
  $("#dLeanCount").parent().parent().show();
  $("#tossupCount").parent().parent().show();
  $("#rLeanCount").parent().parent().show();
  $("#dStrongCount").parent().find(".describe").html(" DFL Strongholds");
  $("#dLeanCount").parent().find(".describe").html(" DFL Leaning");
  $("#tossupCount").parent().find(".describe").html(" Competitive");
  $("#rLeanCount").parent().find(".describe").html(" GOP Leaning");
  $("#rStrongCount").parent().find(".describe").html(" GOP Strongholds"); 
  $(".gopCount").html(22);
  $(".dflCount").html(26);
  $(".midCount").html("");

  $("#legendMap").hide();

  $(".column").css({"display":"inline-block",
    "width":"48%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});

  $(".half.d0").css({"width":"29%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.d0").attr("title","20 seats");
  $(".half.d2").css({"width":"0",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.d2").attr("title","0 seats");
  $(".half.d1").css({"width":"10%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.d1").attr("title","6 seats");
  $(".half.mid").css({"width":"28%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.mid").attr("title","19 seats");
  $(".half.r1").css({"width":"22%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.r1").attr("title","17 seats");
  $(".half.r2").css({"width":"0",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.r2").attr("title","0 seats");
  $(".half.r0").css({"width":"10%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.r0").attr("title","5 seats");
  // spitRankings("#dStrong","DFL Stronghold",true);
  // // spitRankings("#dump","DFL Stronghold",true);
  spitRankings("#dLean","DFL Lean",true);
  spitRankings("#dump","DFL Stronghold",true);
  spitRankings("#tossup","Competitive",true);
  spitRankings("#dump","DFL Stronghold",true);
  spitRankings("#rLean","GOP Lean",true);
  spitRankings("#dump","DFL Stronghold",true);
  spitRankings("#rStrong","GOP Stronghold",true);
  }
  if (step == "open"){
  $("#dStrongCount").html(3);
  $("#dLeanCount").html(3);
  $("#tossupCount").html(5);
  $("#rLeanCount").html(1);
  $("#rStrongCount").html(1); 
  $("#dLeanCount").parent().parent().show();
  $("#tossupCount").parent().parent().show();
  $("#rLeanCount").parent().parent().show();
  $("#dStrongCount").parent().find(".describe").html(" DFL Strongholds");
  $("#dLeanCount").parent().find(".describe").html(" DFL Leaning");
  $("#tossupCount").parent().find(".describe").html("Competitive");
  $("#rLeanCount").parent().find(".describe").html(" GOP Leaning");
  $("#rStrongCount").parent().find(".describe").html(" GOP Strongholds"); 
  $(".gopCount").html(22);
  $(".dflCount").html(26);
  $(".midCount").html("");

  $("#legendMap").hide();

  $(".column").css({"display":"inline-block",
    "width":"48%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});

  $(".half.d0").css({"width":"29%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.d0").attr("title","20 seats");
  $(".half.d2").css({"width":"0",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.d2").attr("title","0 seats");
  $(".half.d1").css({"width":"10%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.d1").attr("title","6 seats");
  $(".half.mid").css({"width":"28%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.mid").attr("title","19 seats");
  $(".half.r1").css({"width":"22%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.r1").attr("title","17 seats");
  $(".half.r2").css({"width":"0",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.r2").attr("title","0 seats");
  $(".half.r0").css({"width":"10%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.r0").attr("title","5 seats");
  spitRankings("#dStrong","DFL Stronghold",true);
  spitRankings("#dump","DFL Stronghold",true);
  spitRankings("#dLean","DFL Lean",true);
  spitRankings("#dump","DFL Stronghold",true);
  spitRankings("#tossup","Competitive",true);
  spitRankings("#dump","DFL Stronghold",true);
  spitRankings("#rLean","GOP Lean",true);
  spitRankings("#dump","DFL Stronghold",true);
  spitRankings("#rStrong","GOP Stronghold",true);
  }
  if (step == "rematch"){
  $("#dStrongCount").html(0);
  $("#dLeanCount").html(0);
  $("#tossupCount").html(0);
  $("#rLeanCount").html(0);
  $("#rStrongCount").html(0); 
  $("#dLeanCount").parent().parent().show();
  $("#tossupCount").parent().parent().show();
  $("#rLeanCount").parent().parent().show();
  $("#dStrongCount").parent().find(".describe").html(" DFL Strongholds");
  $("#dLeanCount").parent().find(".describe").html(" DFL Leaning");
  $("#tossupCount").parent().find(".describe").html("Competitive");
  $("#rLeanCount").parent().find(".describe").html(" GOP Leaning");
  $("#rStrongCount").parent().find(".describe").html(" GOP Strongholds"); 
  $(".gopCount").html(22);
  $(".dflCount").html(26);
  $(".midCount").html("");

  $("#legendMap").hide();

  $(".half.d0").css({"width":"29%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.d0").attr("title","20 seats");
  $(".half.d2").css({"width":"0",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.d2").attr("title","0 seats");
  $(".half.d1").css({"width":"10%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.d1").attr("title","6 seats");
  $(".half.mid").css({"width":"28%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.mid").attr("title","19 seats");
  $(".half.r1").css({"width":"22%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.r1").attr("title","17 seats");
  $(".half.r2").css({"width":"0",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.r2").attr("title","0 seats");
  $(".half.r0").css({"width":"10%",
    WebkitTransition : 'width 0.3s ease-in-out',
    MozTransition    : 'width 0.3s ease-in-out',
    MsTransition     : 'width 0.3s ease-in-out',
    OTransition      : 'width 0.3s ease-in-out',
    transition       : 'width 0.3s ease-in-out'});
  $(".half.r0").attr("title","5 seats");
  spitRankings("#dStrong","DFL Stronghold",true);
  spitRankings("#dump","DFL Stronghold",true);
  spitRankings("#dLean","DFL Lean",true);
  spitRankings("#dump","DFL Stronghold",true);
  spitRankings("#tossup","Competitive",true);
  spitRankings("#dump","DFL Stronghold",true);
  spitRankings("#rLean","GOP Lean",true);
  spitRankings("#dump","DFL Stronghold",true);
  spitRankings("#rStrong","GOP Stronghold",true);
  }
}
  maths("current",true);
  cartoBuild("#cartoState", "#infobox", "#chart", null, "mnsenate", data, "mn", 0, cartoData("mnsenate","mn"));
  cartoBuild("#cartoMetro", "#infobox", "#chart", null, "mnsenate", data, "metro", 1, cartoData("mnsenate","metro"));

  // var targetWidth = chart.parent().width();
  // chart.attr("width", targetWidth);
  // chart.attr("height", targetWidth / aspect);
  // var targetWidth2 = chart2.parent().width();
  // chart2.attr("width", targetWidth2);
  // chart2.attr("height", targetWidth2 / aspect);

var dataFilings = rows00;

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

$(container).html("<div class='bigNum'>" + d3.format("$,.2f")(amount[0]) + "</div><div class='bigBar'><div class='inBar' style='height:" + pct + "'><div class='ind' title='"  + d3.format("$,.2f")(amount[1]) +  " independent contributions' style='height:" + indPCT + "'></div><div class='pp' title='"  + d3.format("$,.2f")(amount[2]) +  " political party' style='height:" + ppPCT + "'></div><div class='pf' title='" + d3.format("$,.2f")(amount[3]) +  " political committees' style='height:" + pfPCT + "'></div><div class='lb' title='"  + d3.format("$,.2f")(amount[4]) +  " lobbyist contributions' style='height:" + lbPCT + "'></div><div class='public financing' title='"  + d3.format("$,.2f")(amount[5]) +  " pubfin' style='height:" + pubfinPCT + "'></div><div class='misc' title='"  + d3.format("$,.2f")(amount[6]) +  " miscellaneous' style='height:" + miscPCT + "'></div><div class='notepay' title='"  + d3.format("$,.2f")(amount[7]) +  " receipts loans payable' style='height:" + notepayPCT + "'></div><div class='noterec' title='"  + d3.format("$,.2f")(amount[8]) +  " noterec' style='height:" + noterecPCT + "'></div></div></div><div class='subtotal'><div class='left'>Beginning</div><div class='right'>" +  d3.format("$,.2f")(amount[11]) + "</div></div><div class='subtotal'><div class='left'>Raised</div><div class='right'>+" +  d3.format("$,.2f")(amount[0]) + "</div></div><div class='subtotal'><div class='left'>Expenditures</div><div class='right'>-" + d3.format("$,.2f")(amount[9]) + "</div></div><div class='subtotal'><div class='left'>End</div><div class='right'>" + d3.format("$,.2f")(amount[10]) + "</div></div>");

 $( function() {
    $( document ).tooltip();
  } );

}

//LOAD CANDIDATES INFO
function getCandidates(district, party){
  var first, last, city, party, chamber, endcash, indcontrib, ppcontrib, pfcontrib, lbcontrib;
    for (var i=0; i < dataFilings.length; i++){
      if (Number(dataFilings[i].district) == Number(district) && dataFilings[i].party == party){
        party = dataFilings[i].party;
        first = dataFilings[i].first;
        last = dataFilings[i].last;
      }
    }

    if (party == "DFL"){ 
      $("#partyD").html(party); $("#candD").html("<div>" + first + " " + last + " (" + party + ")</div>"); 
    } 
    else if (party == "GOP"){ 
      $("#partyR").html(party); $("#candR").html("<div>" + first + " " + last + " (" + party + ")</div>");
    }
}

function getCandidateTotals(district,party){
 var total = [];
 var endcash, indcontrib, ppcontrib, pfcontrib, lbcontrib;
 for (var i=0; i < dataFilings.length; i++){
  
    if (Number(dataFilings[i].district) == Number(district) && dataFilings[i].party == party){  
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


//POPULATE DATA
function dataSpill(race,chamber){

if (chamber == "house" || chamber == "senate"){
$(".results").hide();
$("#races").show();

getCandidates(race,"DFL");
getCandidates(race,"GOP");

var bigTotal = getCandidateTotals(race,"DFL")[0] + getCandidateTotals(race,"GOP")[0];

drawChart("#chartD", getCandidateTotals(race,"DFL"), bigTotal);
drawChart("#chartR", getCandidateTotals(race,"GOP"), bigTotal);

}
}

});
});
});


//FINDIT MAP
d3.json('./shapefiles/mnsenate.json', function(error, mnleg) {
mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhZG93ZmxhcmUiLCJhIjoiS3pwY1JTMCJ9.pTSXx_LFgR3XBpCNNxWPKA';
var map = new mapboxgl.Map({
    container: 'findMap',
    style: 'mapbox://styles/shadowflare/cilea5110001ra8ktm7409xze',
    center: [-92.541389, 47.517222],
    zoom: 6,
    minZoom: 2
});

map.scrollZoom.disable();
map.addControl(new mapboxgl.Navigation());

map.on('load', function() {

//BLOCKS
  var shapeObj3 = new mapboxgl.GeoJSONSource({
   data: mnleg
});

  map.addSource('mnleg', shapeObj3);

   map.addLayer({
        'id': 'mnleg-layer',
        'interactive': true,
        'source': 'mnleg',
        'type': 'fill',
            'paint': {
                  'fill-antialias' : true,
                  'fill-opacity': 0.08,
                  'fill-color': '#904E55',
                  'fill-outline-color': 'rgba(51, 51, 51, 1)'
              }
    });

var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

map.on('mousemove', function(e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['mnleg-layer'] });
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

    if (!features.length) {
        popup.remove();
        return;
    }

    var feature = features[0];

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(e.lngLat)
        .setHTML("District " + feature.properties.DISTRICT)
        .addTo(map);
});

});
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
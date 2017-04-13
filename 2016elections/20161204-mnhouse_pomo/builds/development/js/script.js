(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
d3.csv("./data/mnhouse2016.csv", function(d) {
  return {
    district: d.district,
    gop: +d.gop,
    dfl: +d.dfl   
  };
}, function(error, rows1) {

d3.csv("./data/mnhouse2012.csv", function(d) {
  return {
    district: d.district,
    gop: +d.gop,
    dfl: +d.dfl      
  };
}, function(error, rows2) {

d3.csv("./data/mnhouse2008.csv", function(d) {
  return {
    district: d.district,
    gop: +d.gop,
    dfl: +d.dfl      
  };
}, function(error, rows3) {


var data2008 = rows3;
var data2012 = rows2;
var data2016 = rows1;

$.urlParam = function(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results != null) { return results[1] || 0; }
  else { return null; }
}

var selected = $.urlParam('chart');

if (selected != null){
$(".chart").hide();
$("#" + selected).show();
} else { $(".chart").show(); }

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
            ['x',2002,2004,2006,2008,2010,2012,2014,2016],
            ['DFL seats',52,66,85,87,62,73,62,57],
            ['GOP seats',81,68,49,47,72,61,72,76]
        ],
        type: 'line'
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
             values: [0,67,96],
             count: 3,
             format: d3.format('.0f')
            }
        },
        x: {
            tick: {
                values: ['2002', '2004', '2008', '2012', '2016'],
                count: 5,
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
                {value: 67, text: '', position: 'start', class:'powerline'}
          ]

        },
        x: {
            lines: [
                {value: 2002, text: 'Midterm', position: 'start'},
                {value: 2004, text: 'Bush (R) Win', position: 'start'},
                {value: 2006, text: 'Midterm', position: 'start'},
                {value: 2008, text: 'Obama (D) Win', position: 'start'},
                {value: 2010, text: 'Midterm', position: 'start'},
                {value: 2012, text: 'Obama (D) Win', position: 'start'},
                {value: 2014, text: 'Midterm', position: 'start'},
                {value: 2016, text: 'Trump (R) Win', position: 'start'},
            ]
        }
    }
});


    path = d3.selectAll("#chart path");

      var totalLength = path.node().getTotalLength();

    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
        .duration(1500)
        .ease("linear")
        .attr("stroke-dashoffset", 0);
}

function mapColor(d, race, dataCompare){
   // if (race != "redistrict"){ 
    for (var i=0; i < dataCompare.length; i++){
        if (d.properties.DISTRICT == dataCompare[i].district){
            if (dataCompare[i].gop > dataCompare[i].dfl) { return "r3"; }
            else if (dataCompare[i].gop < dataCompare[i].dfl) { return "d3"; }
        }
    } 
   // }
   // else { 
   //  for (var i=0; i < dataCompare.length; i++){
   //      if (d.properties.NAME == dataCompare[i].district){
   //          if (dataCompare[i].gop > dataCompare[i].dfl) { return "r3"; }
   //          else if (dataCompare[i].gop < dataCompare[i].dfl) { return "d3"; }
   //      }
   //  }
   // }
}

function mapTips(d, subject, dataCompare){
   // if (subject != "redistrict"){ 
    for (var i=0; i < dataCompare.length; i++){
        if (d.properties.DISTRICT == dataCompare[i].district){
            if (dataCompare[i].gop > dataCompare[i].dfl) { return "<div class='districtName'>District " + d.properties.DISTRICT + "</div><div class='republican'>" + d3.format(".1f")(dataCompare[i].gop) + "% GOP</div><div class='democrat'>" + d3.format(".1f")(dataCompare[i].dfl) + "% DFL</div>"; }
            else if (dataCompare[i].gop < dataCompare[i].dfl) { return "<div class='districtName'>District " + d.properties.DISTRICT + "</div><div class='democrat'>" + d3.format(".1f")(dataCompare[i].dfl) + "% DFL</div><div class='republican'>" + d3.format(".1f")(dataCompare[i].gop) + "% GOP</div>"; }
        }
    } 
    return "<div class='districtName'>District " + d.properties.DISTRICT + "</div>"
   // }
   // else { 
   //  for (var i=0; i < dataCompare.length; i++){
   //      if (d.properties.NAME == dataCompare[i].district){
   //          if (dataCompare[i].gop > dataCompare[i].dfl) { return "<div class='districtName'>District " + d.properties.NAME + "</div><div class='republican'>" + d3.format(".1f")(dataCompare[i].gop) + "% GOP</div><div class='democrat'>" + d3.format(".1f")(dataCompare[i].dfl) + "% DFL</div>"; }
   //          else if (dataCompare[i].gop < dataCompare[i].dfl) { return "<div class='districtName'>District " + d.properties.NAME + "</div><div class='democrat'>" + d3.format(".1f")(dataCompare[i].dfl) + "% DFL</div><div class='republican'>" + d3.format(".1f")(dataCompare[i].gop) + "% GOP</div>"; }
   //      }
   //  }
   //  return "<div class='districtName'>District " + d.properties.NAME + "</div>"
   // }
       
}

function mapBuild(container, boxContainer, chartContainer, shape, race, geo, dataCompare, index) {

var width = 320,
    height = 400,
    centered;

if (geo=="us") { var projection = d3.geo.albersUsa().scale(700).translate([330, 200]); }
else if (geo=="mn") { var projection = d3.geo.albersUsa().scale(5037).translate([50, 970]); }
else if (geo=="metro") { var projection = d3.geo.mercator().scale([16800]).center([-92.384033,45.209134]); }

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
      // .on("click", clicked)
      .attr("id", function(d) { var str = geo + "_" + d.properties.DISTRICT; return str.replace(new RegExp(" ", "g"),"-"); })
      .attr("precinctName", function(d){ return d.properties.DISTRICT })
      .attr("class", function(d){
         return mapColor(d, race, dataCompare);
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

  chartBuilder();

  mapBuild("#mapMetro", "#infobox", "#chart", "mnleg_metro.json", "house", "metro", data2016, 0);
  mapBuild("#mapState", "#infobox", "#chart", "mnleg.json", "house", "mn", data2016, 0);

  mapBuild("#mapMetro2012", "#infobox", "#chart", "mnleg_metro.json", "house", "metro", data2012, 0);
  mapBuild("#mapState2012", "#infobox", "#chart", "mnleg.json", "house", "mn", data2012, 0);

  mapBuild("#mapMetro2008", "#infobox", "#chart", "mnleg2008_metro.json", "redistrict", "metro", data2008, 0);
  mapBuild("#mapState2008", "#infobox", "#chart", "mnleg2002.json", "redistrict", "mn", data2008, 0);

});
});
});
},{}]},{},[1])
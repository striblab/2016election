(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

d3.csv("./data/votes.csv", function(d) {
  return {
    votes: +d.votes,
    vtd: d.vtdcode
  };
}, function(error, rows) {

d3.csv("./data/counties.csv", function(d) {
  return {
    pct: +d.pct,
    county: d.county
  };
}, function(error, rows2) {

var data = rows;
var dataC = rows2;

function mapBuild(container, boxContainer, chartContainer, shape, race, geo, dataCompare, index) {

var width = 600,
    height = 800,
    centered;

if (geo=="us") { var projection = d3.geo.albersUsa().scale(700).translate([330, 200]); }
else if (geo=="mn") { var projection = d3.geo.albersUsa().scale(5037).translate([50, 970]); }
else if (geo=="metro") { var projection = d3.geo.mercator().scale([21000]).center([-92.7,45.059134]); }

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
      .attr("id", function(d) { return d.properties.county_id; })
      .attr("class", function(d){
        if (race == "counties"){
        for (var i=0; i < dataC.length; i++){
          if (dataC[i].county == d.properties.COUNTYNAME){
            if (dataC[i].pct >= .40){ return "purple5"; }
            else if (dataC[i].pct >= .30){ return "purple4"; }
            else if (dataC[i].pct >= .20){ return "purple3"; }
            else if (dataC[i].pct >= .10){ return "purple2"; }
            else if (dataC[i].pct >= 0){ return "purple1"; }
          }
        }   
        }
        if (race == "precinct"){
        for (var i=0; i<data.length; i++){
          if (data[i].vtd == d.properties.VTDID){
            if (data[i].votes >= 400){ return "purple5"; }
            else if (data[i].votes >= 320){ return "purple4"; }
            else if (data[i].votes >= 240){ return "purple3"; }
            else if (data[i].votes >= 160){ return "purple2"; }
            else if (data[i].votes >= 0){ return "purple1"; }
          }
        }
       }
        return "null";
       })
      .style("stroke-width", function(d, i){
        if (race == "counties"){ return "0.5px" }
        else { return "0"; }
        })
      .style("stroke", "#bbb")
      .call(d3.helper.tooltip(function(d, i){
        if (race == "counties"){
        for (var i=0; i < dataC.length; i++){
            if (dataC[i].pct >= .18){ var color = "purple5"; }
            else if (dataC[i].pct >= .15){ var color = "purple4"; }
            else if (dataC[i].pct >= .10){ var color = "purple3"; }
            else if (dataC[i].pct >= .05){ var color = "purple2"; }
            else if (dataC[i].pct >= 0){ var color = "purple1"; }

          if (dataC[i].county == d.properties.COUNTYNAME){
            return "<div class='countyName'>" + d.properties.COUNTYNAME + " County</div><div class='" + color + "'>" + d3.format("%")(dataC[i].pct) + " absentee voters</div>"
          }
        }  
        return "<div class='countyName'>" + d.properties.COUNTYNAME + " County</div><div>No data</div>"; 
        }
      }));

  g.append("path")
      //.datum(topojson.mesh(us, us.features, function(a, b) { return a !== b; }))
      .attr("id", "state-borders")
      .attr("d", path);

});

// d3.json("shapefiles/counties.json", function(error, us) {

//   g.append("g")
//       .attr("class", "states")
//     .selectAll("path")
//       .data(us.features)
//     .enter().append("path")
//       .attr("d", path)
//       .attr("class", "null")
//       .style("stroke-width", "2px")
//       .style("stroke", "#000");

//   g.append("path")
//       .attr("id", "state-borders")
//       .attr("d", path);

// });

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


var aspect = 600 / 800, chart = $(container + " svg"); //, chart2 = $(".carto svg")
$(document).ready(function() {
  var targetWidth = chart.parent().width();
  chart.attr("width", targetWidth);
  chart.attr("height", targetWidth / aspect);
});

$(window).on("resize", function() {
  chart.attr("style","");
  var targetWidth = chart.parent().width();
  chart.attr("width", targetWidth);
  chart.attr("height", targetWidth / aspect);
});

}



mapBuild("#mapPrecinct", "#infobox", "#chart", "mnprecincts.json", "precinct", "mn", data, 0);
mapBuild("#mapMetro", "#infobox", "#chart", "metro_precincts.json", "precinct", "metro", data, 0);
mapBuild("#mapCounties", "#infobox", "#chart", "counties.json", "counties", "mn", dataC, 0);

//region
function chartRegion(){

var  padding = {
        top: 20,
        right: 60,
        bottom: 20,
        left: 120,
    };

var chartPop = c3.generate({
      bindto: "#regionChart",
      padding: padding,
      data: {
            columns: [
                ['Presidential Voting 2012', .33, .23, .10, .09, .25],
                ['Absentee Ballots 2016', .41, .23, .07, .07, .23]
            ],
        type: 'bar'
        },
        // legend: {
        //     show: false
        // },
            color: {
              pattern: ['#333','#865f67']
            },
        axis: {
              rotated: true,
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
                categories: ['Hennepin/Ramsey counties','Rest of 7 county','Outer suburbs','Rochester-St.Cloud-Duluth','Remainder of outstate']
            }
        }
});

}

chartRegion();

//age
function chartAge(){

var  padding = {
        top: 20,
        right: 60,
        bottom: 20,
        left: 120,
    };

var chartPop = c3.generate({
      bindto: "#ageChart",
      padding: padding,
      data: {
            columns: [
                ['Registered Voters', .08, .16, .16, .18, .19, .13, .10, 0,],
                ['Absentee Voters 9/1-10/30', .05, .07, .07, .10, .21, .25, .22, .04,],
                ['Absentee Voters 10/31-11/7', .06, .11, .12, .16, .21, .16, .11, .08,]
            ],
        type: 'bar'
        },
        // legend: {
        //     show: false
        // },
            color: {
              pattern: ['#333','#865f67',"#C1ACB1"]
            },
        axis: {
              rotated: true,
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
                categories: ['18-24','25-34','35-44','45-54','55-64','65-74','75+','No age available']
            }
        }
});

}

chartAge();

//when
function chartDate(){

var  padding = {
        top: 20,
        right: 60,
        bottom: 20,
        left: 60,
    };

var chartPop = c3.generate({
      bindto: "#dateChart",
      padding: padding,
      data: {
            columns: [
                ['Ballots Accepted', 1425, 19693, 35324, 45298, 98057, 124844, 206871]
            ],
        type: 'line'
        },
        // legend: {
        //     show: false
        // },
            color: {
              pattern: ['#865f67']
            },
        axis: {
              // rotated: true,
              y: {
                    min: 0,
                    padding: {bottom: 0},
                    tick: {
                     count: 4,
                     format: d3.format(',.0f')
                    }
                },
            x: {
                type: 'category',
                categories: ['Sep. 1-25','Sep 26-30','Oct. 1-8','Oct. 9-15', 'Oct 16-24', 'Oct 25-31', 'Nov 1-7']
            }
        }
});

}

chartDate();

//lean
function chartCompare(){

var  padding = {
        top: 20,
        right: 60,
        bottom: 20,
        left: 60,
    };

var chartPop = c3.generate({
      bindto: "#compareChart",
      padding: padding,
      data: {
            x: 'x',
            columns: [
                ['x',1902,1903,1906,1908,1919,1920,1930,1932,1934,1936,1938,1940,1941,1942,1944,1945,1946,1947,1948,1949,1950,1951,1952,1953,1954,1955,1956,1957,1958,1959,1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016],
                ['Voter Registrations', 2,1,3,1,1,1,1,1,1,2,1,1,2,2,10,2,14,4,39,2,21,16,119,11,32,27,198,18,111,43,309,37,155,69,372,77,299,79,594,89,321,198,802,492,2427,842,2050,368,1655,348,2044,274,1466,367,2952,477,1939,789,5429,3172,2952,1114,3849,1265,3482,1316,4368,1589,5019,1799,5678,2035,5616,1754,8971,2031,7040,3163,9616,2370,7377,3463,14506,5761,16824,13963,25313]
            ],
            type: 'line'
        },
        // legend: {
        //     show: false
        // },
            color: {
              pattern: ['#865f67']
            },
        axis: {
              y: {
                    min: 0,
                    padding: {bottom: 0},
                    tick: {
                     count: 4,
                     format: d3.format(',.0f')
                    }
                },
            x: {
                tick: {
                values: [1902, 1925, 1950, 1975, 2000, 2016],
                count: 6,
                multiline: false
                }
            }
        }
});

}

chartCompare();


});
});
},{}]},{},[1])
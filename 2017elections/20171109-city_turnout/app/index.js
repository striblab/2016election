/**
 * Main JS file for project.
 */

// Define globals that are added through the config.json file, here like this:
// /* global _ */
'use strict';

// Dependencies
import utilsFn from './utils.js';

// Import local ES6 modules like this:
//import utilsFn from './utils.js';

// Or import libraries installed with npm like this:
// import module from 'module';

// Setup utils function
utilsFn({ });

$.urlParam = function(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results != null) { return results[1] || 0; }
  else { return null; }
}

var selected = $.urlParam('chart');

if (selected != null){
$(".slide").hide();
$("#" + selected).show();
}

//CHARTS
  function chartTrend(){

    var  padding = {
            top: 20,
            right: 60,
            bottom: 20,
            left: 40,
        };

    var chartTrend = c3.generate({
          bindto: "#chartTrend",
          padding: padding,
          data: {
          		x: 'x',
                columns: [
                	['x',1993,1997,2001,2005,2009,2013,2017],
                  ['Minneapolis',0.45,0.46,0.41,0.30,0.20,0.33,0.42],
                  ['St. Paul',0.43,0.43,0.41,0.36,0.22,0.20,0.27]
                ],
            type: 'line',
            labels: {
                format: {
                    // '2006': d3.format('%'),
                    // '2017': d3.format('%')
                }
            }
            },
            legend: {
                show: false
            },
            point: {
                show: false
            },
                color: {
                  pattern: ['#333',"#bbb"]
                },
            axis: {
                  // rotated: true,
                  y: {
                  		max: 1,
                        min: 0,
                        padding: {bottom: 0, top: 0},
                        tick: {
                         count: 5,
                         values: [0,0.25,0.50,0.75,1],
                         format: d3.format('%')
                        }
                    },
                x: {
                    padding: {right: 0, left: 0},
                    tick: {
                        count: 6,
                        values: [1993,1997,2001,2005,2009,2013,2017],
                        multiline: false,
                        format: d3.format('.0f')
                    }
                }
            },
          grid: {
              x: {
              lines: [
                    {value: 2009, text: 'Ranked choice introduced', position: 'end', class:'powerline'}
              ]
              }
          }

    });
}

chartTrend();


  function chartReg(){

    var  padding = {
            top: 20,
            right: 60,
            bottom: 20,
            left: 80,
        };

    var chartReg = c3.generate({
          bindto: "#chartReg",
          padding: padding,
          data: {
              x: 'x',
                columns: [
                  ['x',1993,1997,2001,2005,2009,2013,2017],
                  ['Minneapolis',222101,200311,217802,229593,231078,233351,239750],
                  ['St. Paul',143878,138198,144213,160414,157859,154672,156543]
                ],
            type: 'bar',
            labels: {
                format: {
                    // '2006': d3.format('%'),
                    // '2017': d3.format('%')
                }
            }
            },
            legend: {
                show: false
            },
            point: {
                show: false
            },
                color: {
                  pattern: ['#333',"#bbb"]
                },
            axis: {
                  // rotated: true,
                  y: {
                        max: 250000,
                        min: 0,
                        padding: {bottom: 0, top: 0},
                        tick: {
                         count: 6,
                         values: [0,50000,100000,150000,200000,250000],
                         format: d3.format(',.0f')
                        }
                    },
                x: {
                    // padding: {right: 0, left: 0},
                    tick: {
                        count: 6,
                        values: [1993,1997,2001,2005,2009,2013,2017],
                        multiline: false,
                        format: d3.format('.0f')
                    }
                }
            },
          grid: {
              x: {
              lines: [
                    {value: 2009, text: 'Ranked choice introduced', position: 'end', class:'powerline'}
              ]
              }
          }

    });
}

chartReg();

  function chartCandidates(){

    var  padding = {
            top: 20,
            right: 60,
            bottom: 20,
            left: 80,
        };

    var chartCandidates = c3.generate({
          bindto: "#chartCandidates",
          padding: padding,
          data: {
              x: 'x',
                columns: [
                  ['x',1993,1997,2001,2005,2009,2013,2017],
                  ['Minneapolis',2,2,2,2,11,35,15],
                  ['St. Paul',2,2,2,2,2,4,10]
                ],
            type: 'bar',
            labels: {
                format: {
                    // '2006': d3.format('%'),
                    // '2017': d3.format('%')
                }
            }
            },
            legend: {
                show: false
            },
            point: {
                show: false
            },
                color: {
                  pattern: ['#333',"#bbb"]
                },
            axis: {
                  // rotated: true,
                  y: {
                        min: 0,
                        padding: {bottom: 0, top: 0},
                        tick: {
                         count: 6,
                         values: [0,7,14,21,28,35],
                         format: d3.format('.0f')
                        }
                    },
                x: {
                    // padding: {right: 0, left: 0},
                    tick: {
                        count: 6,
                        values: [1993,1997,2001,2005,2009,2013,2017],
                        multiline: false,
                        format: d3.format('.0f')
                    }
                }
            },
          grid: {
              x: {
              lines: [
                    {value: 2009, text: 'Ranked choice introduced', position: 'end', class:'powerline'}
              ]
              }
          }

    });
}

chartCandidates();


  function chartMPLS(){

    var  padding = {
            top: 20,
            right: 60,
            bottom: 20,
            left: 40,
        };

    var chartMPLS = c3.generate({
          bindto: "#chartMPLS",
          padding: padding,
          data: {
          		x: 'x',
                columns: [
                	['x',1993,1997,2001,2005,2009,2013,2017],
                    ["Ward 1",0.51,0.48,0.41,0.31,0.23,0.3,0.45],
          					["Ward 2",0.3,0.29,0.27,0.26,0.14,0.27,0.40],
          					["Ward 3",0.42,0.41,0.35,0.22,0.14,0.31,0.40],
          					["Ward 4",0.49,0.47,0.39,0.24,0.21,0.23,0.31],
          					["Ward 5",0.37,0.4,0.37,0.24,0.17,0.24,0.28],
          					["Ward 6",0.32,0.35,0.26,0.21,0.14,0.34,0.47],
          					["Ward 7",0.44,0.46,0.39,0.28,0.19,0.34,0.45],
          					["Ward 8",0.47,0.45,0.41,0.35,0.2,0.35,0.46],
          					["Ward 9",0.48,0.49,0.43,0.32,0.21,0.34,0.43],
          					["Ward 10",0.4,0.45,0.37,0.28,0.18,0.3,0.38],
          					["Ward 11",0.54,0.54,0.5,0.35,0.21,0.39,0.47],
          					["Ward 12",0.53,0.54,0.49,0.38,0.23,0.4,0.47],
          					["Ward 13",0.56,0.6,0.51,0.41,0.27,0.46,0.50]
                ],
            type: 'line',
            labels: {
                format: {
                    // '2006': d3.format('%'),
                    // '2017': d3.format('%')
                }
            }
            },
            legend: {
                show: false
            },
            point: {
                show: false
            },
                color: {
                  pattern: ['#333']
                },
            axis: {
                  // rotated: true,
                  y: {
                  		max: 1,
                        min: 0,
                        padding: {bottom: 0, top: 0},
                        tick: {
                         count: 5,
                         values: [0,0.25,0.50,0.75,1],
                         format: d3.format('%')
                        }
                    },
                x: {
                    padding: {right: 0, left: 0},
                    tick: {
                        count: 6,
                        values: [1993,1997,2001,2005,2009,2013],
                        multiline: false,
                        format: d3.format('.0f')
                    }
                }
            },
          grid: {
              x: {
              lines: [
                    {value: 2009, text: 'Ranked choice introduced', position: 'end', class:'powerline'}
              ]
              }
          }

    });
}

chartMPLS();


  function chartSTP(){

    var  padding = {
            top: 20,
            right: 60,
            bottom: 20,
            left: 40,
        };

    var chartSTP = c3.generate({
          bindto: "#chartSTP",
           padding: padding,
          data: {
          		x: 'x',
                columns: [
                	['x',1993,1997,2001,2005,2009,2013,2017],
                  ["Ward 1",0.40,0.37,0.33,0.31,0.18,0.24,0],
                  ["Ward 2",0.44,0.43,0.34,0.38,0.22,0.20,0],
                  ["Ward 3",0.53,0.52,0.34,0.49,0.31,0.26,0],
                  ["Ward 4",0.46,0.43,0.32,0.41,0.24,0.22,0],
                  ["Ward 5",0.39,0.43,0.33,0.32,0.18,0.16,0],
                  ["Ward 6",0.40,0.41,0.36,0.31,0.17,0.14,0],
                  ["Ward 7",0.38,0.47,0.35,0.31,0.16,0.14,0]
                ],
            type: 'line',
            labels: {
                format: {
                    // '2006': d3.format('%'),
                    // '2017': d3.format('%')
                }
            }
            },
            legend: {
                show: false
            },
            point: {
                show: false
            },
                color: {
                  pattern: ['#333']
                },
            axis: {
                  // rotated: true,
                  y: {
                  		max: 1,
                        min: 0,
                        padding: {bottom: 0, top: 0},
                        tick: {
                         count: 5,
                         values: [0,0.25,0.50,0.75,1],
                         format: d3.format('%')
                        }
                    },
                x: {
                    padding: {right: 0, left: 0},
                    tick: {
                        count: 6,
                        values: [1993,1997,2001,2005,2009,2013],
                        multiline: false,
                        format: d3.format('.0f')
                    }
                }
            },
          grid: {
              x: {
              lines: [
                    {value: 2009, text: 'Ranked choice introduced', position: 'end', class:'powerline'}
              ]
              }
          }

    });
}

chartSTP();


d3.csv("data/turnoutDIFF.csv", function(d) {
  return {
    city: d.city,
    ward: +d.ward,
    vt1993: +d.vt1993,
    vt1997: +d.vt1997,
    vt2001: +d.vt2001,
    vt2005: +d.vt2005,
    vt2009: +d.vt2009,
    vt2013: +d.vt2013,
	  vt2017: +d.vt2017,
	  vtDIFF: +d.vtDIFF,
    vtAVG: +d.vtAVG
  };
}, function(error, rows2) {

var dataDIFF = rows2;

//MAPPAGE
function mapColor(d, race, dataCompare){
  if (race == "diff"){ 
    for (var i=0; i < dataCompare.length; i++){
      if (String(d.properties.city).toUpperCase() == String(dataCompare[i].city).toUpperCase() && d.properties.ward == String("Ward " + dataCompare[i].ward)) {
        if (dataCompare[i].vtDIFF >= 0.13) { return "gray5"; }
        else if (dataCompare[i].vtDIFF >= 0.11) { return "gray4"; }
        else if (dataCompare[i].vtDIFF >= 0.06) { return "gray3"; }
        else if (dataCompare[i].vtDIFF > 0) { return "gray1"; }
      }
  }

  } else if (race == "turnout") {
      for (var i=0; i < dataCompare.length; i++){
        if (String(d.properties.city).toUpperCase() == String(dataCompare[i].city).toUpperCase() && d.properties.ward == String("Ward " + dataCompare[i].ward)) {
          if (dataCompare[i].vt2017 >= 0.45) { return "gray5"; }
          else if (dataCompare[i].vt2017 >= 0.35) { return "gray4"; }
          else if (dataCompare[i].vt2017 >= 0.30) { return "gray3"; }
          else if (dataCompare[i].vt2017 > 0) { return "gray2"; }
        }
    }
  } else if (race == "average") {
      for (var i=0; i < dataCompare.length; i++){
        if (String(d.properties.city).toUpperCase() == String(dataCompare[i].city).toUpperCase() && d.properties.ward == String("Ward " + dataCompare[i].ward)) {
          if (dataCompare[i].vtAVG >= 0.40) { return "gray5"; }
          else if (dataCompare[i].vtAVG >= 0.30) { return "gray4"; }
          else if (dataCompare[i].vtAVG >= 0.2) { return "gray3"; }
          else if (dataCompare[i].vtAVG > 0) { return "gray2"; }
        }
    }
  }
  
}

function mapTips(d, subject, dataCompare){

  if (subject == "diff"){ 
    var diff = 0;
    var color = "";

    for (var i=0; i < dataCompare.length; i++){
      if (String(d.properties.city).toUpperCase() == String(dataCompare[i].city).toUpperCase() && d.properties.ward == String("Ward " + dataCompare[i].ward)) {
        if (dataCompare[i].vtDIFF >= 0.13) { color = "gray4"; }
        else if (dataCompare[i].vtDIFF >= 0.11) { color = "gray4"; }
        else if (dataCompare[i].vtDIFF >= 0.06) { color = "gray3"; }
        else if (dataCompare[i].vtDIFF > 0) { color = "gray1"; }
        diff = dataCompare[i].vtDIFF;
      }
  }

    return "<div class='districtName'>" + d.properties.city + " - " + d.properties.ward + "</div><div class='districtName " + color + "'>" + d3.format("+%")(diff)  + " change</div>";

  } else if (subject == "turnout") {
      for (var i=0; i < dataCompare.length; i++){
        if (String(d.properties.city).toUpperCase() == String(dataCompare[i].city).toUpperCase() && d.properties.ward == String("Ward " + dataCompare[i].ward)) {
          if (dataCompare[i].vt2017 >= 0.45) { color = "gray5"; }
          else if (dataCompare[i].vt2017 >= 0.35) { color = "gray4"; }
          else if (dataCompare[i].vt2017 >= 0.30) { color = "gray3"; }
          else if (dataCompare[i].vt2017 > 0) { color = "gray2"; }
          diff = dataCompare[i].vt2017;
        }
    }
    return "<div class='districtName'>" + d.properties.city + " - " + d.properties.ward + "</div><div class='districtName " + color + "'>" + d3.format("%")(diff)  + " turnout</div>";

  } else if (subject == "average") {
      for (var i=0; i < dataCompare.length; i++){
        if (String(d.properties.city).toUpperCase() == String(dataCompare[i].city).toUpperCase() && d.properties.ward == String("Ward " + dataCompare[i].ward)) {
          if (dataCompare[i].vtAVG >= 0.40) { color = "gray5"; }
          else if (dataCompare[i].vtAVG >= 0.30) { color = "gray4"; }
          else if (dataCompare[i].vtAVG >= 0.20) { color = "gray3"; }
          else if (dataCompare[i].vtAVG > 0) { color = "gray2"; }
          diff = dataCompare[i].vtAVG;
        }
    }
    return "<div class='districtName'>" + d.properties.city + " - " + d.properties.ward + "</div><div class='districtName " + color + "'>" + d3.format("%")(diff)  + " average turnout</div>";  
  }

}

function mapBuild(container, boxContainer, chartContainer, shape, race, geo, dataCompare, index) {

var width = 320,
    height = 300,
    centered;

if (geo=="us") { var projection = d3.geo.albersUsa().scale(700).translate([330, 200]); }
else if (geo=="mn") { var projection = d3.geo.albersUsa().scale(5037).translate([50, 970]); }
else if (geo=="metro") { var projection = d3.geo.mercator().scale([80000]).center([-93.070335,44.930977]); }

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select(container + " svg")
    .attr("width", width)
    .attr("height", height);

// svg.append("rect")
    // .attr("class", "background")
    // .attr("width", width)
    // .attr("height", height);

var g = svg.append("g");

d3.json("data/" + shape, function(error, us) {

  g.append("g")
      .attr("class", "states")
    .selectAll("path")
      .data(us.features)
    .enter().append("path")
      .attr("d", path)
      // .on("click", clicked)
      .attr("id", function(d) { var str = geo + "_" + d.properties.ward; return str.replace(new RegExp(" ", "g"),"-"); })
      .attr("precinctName", function(d){ return d.properties.ward })
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


mapBuild("#map2017", "#infobox", "#chart", "mpls_wards.geojson", "turnout", "metro", dataDIFF, 0);
// mapBuild("#map2017", "#infobox", "#chart", "stp_wards.geojson", "turnout", "metro", dataDIFF, 0);
mapBuild("#mapPCT", "#infobox", "#chart", "mpls_wards.geojson", "diff", "metro", dataDIFF, 0);
// mapBuild("#mapPCT", "#infobox", "#chart", "stp_wards.geojson", "diff", "metro", dataDIFF, 0);
mapBuild("#mapAVG", "#infobox", "#chart", "mpls_wards.geojson", "average", "metro", dataDIFF, 0);
// mapBuild("#mapAVG", "#infobox", "#chart", "stp_wards.geojson", "average", "metro", dataDIFF, 0);

});
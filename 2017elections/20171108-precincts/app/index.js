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


//MAPPAGE
function mapColor(d, race, dataCompare){

  
}

function mapTips(d, subject, dataCompare){



}

function mapBuild(container, boxContainer, chartContainer, shape, race, geo, dataCompare, index) {

var width = 260,
    height = 300,
    centered;

if (geo=="us") { var projection = d3.geo.albersUsa().scale(700).translate([330, 200]); }
else if (geo=="mn") { var projection = d3.geo.albersUsa().scale(5037).translate([50, 970]); }
else if (geo=="metro") { var projection = d3.geo.mercator().scale([80000]).center([-92.877045,44.907867]); }
else if (geo=="metro2") { var projection = d3.geo.mercator().scale([80000]).center([-92.877045,44.907867]); }

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


mapBuild("#mpls1", "#infobox", "#chart", "minneapolis-precincts-results.geo.json", "round1", "metro", null, 0);
mapBuild("#mpls2", "#infobox", "#chart", "minneapolis-precincts-results.geo.json", "round2", "metro", null, 0);
mapBuild("#mpls3", "#infobox", "#chart", "minneapolis-precincts-results.geo.json", "round3", "metro", null, 0);
mapBuild("#stp", "#infobox", "#chart", "st-paul-precincts-results.geo.json", "stp", "metro", null, 0);


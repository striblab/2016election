d3.json("./data/mnleg_spending.json", function(error, json) {

var data2016 = json.expenses;

console.log(json)

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

function totals(){
   for (var i=0; i < data2016.length; i++){
   if ("Total Senate" == String(data2016[i].name)){
    $("#infoBoxS" + " .district").html("<div>" + data2016[i].name + " expenses</div>");
    $("#infoBoxS" + " .perdiem").html("<div>" + d3.format("$,.0f")(Number(data2016[i].perdiem)) + "</div>");
    $("#infoBoxS" + " .communications").html("<div>" + d3.format("$,.0f")(Number(data2016[i].communications)) + "</div>");
    $("#infoBoxS" + " .lodging").html("<div>" + d3.format("$,.0f")(Number(data2016[i].lodging)) + "</div>");
    $("#infoBoxS" + " .mileage").html("<div>" + d3.format("$,.0f")(Number(data2016[i].mileage)) + "</div>");
    $("#infoBoxS" + " .othertravel").html("<div>" + d3.format("$,.0f")(Number(data2016[i].other_travel)) + "</div>");
    $("#infoBoxS" + " .other").html("<div>" + d3.format("$,.0f")(Number(data2016[i].other_expenses)) + "</div>");
    $("#infoBoxS" + " .districtX").html("<div>" + d3.format("$,.0f")(Number(data2016[i].district_expenses)) + "</div>");
     $("#infoBoxS" + " .total").html("<div>" + d3.format("$,.0f")(Number(data2016[i].total)) + "</div>");
     }
   }
   for (var i=0; i < data2016.length; i++){
   if ("Total House" == String(data2016[i].name)){
    $("#infoBoxH" + " .district").html("<div>" + data2016[i].name + " of Representatives expenses</div>");
    $("#infoBoxH" + " .perdiem").html("<div>" + d3.format("$,.0f")(Number(data2016[i].perdiem)) + "</div>");
    $("#infoBoxH" + " .communications").html("<div>" + d3.format("$,.0f")(Number(data2016[i].communications)) + "</div>");
    $("#infoBoxH" + " .lodging").html("<div>" + d3.format("$,.0f")(Number(data2016[i].lodging)) + "</div>");
    $("#infoBoxH" + " .mileage").html("<div>" + d3.format("$,.0f")(Number(data2016[i].mileage)) + "</div>");
    $("#infoBoxH" + " .othertravel").html("<div>" + d3.format("$,.0f")(Number(data2016[i].other_travel)) + "</div>");
    $("#infoBoxH" + " .other").html("<div>" + d3.format("$,.0f")(Number(data2016[i].other_expenses)) + "</div>");
    $("#infoBoxH" + " .districtX").html("<div>" + d3.format("$,.0f")(Number(data2016[i].district_expenses)) + "</div>");
     $("#infoBoxH" + " .total").html("<div>" + d3.format("$,.0f")(Number(data2016[i].total)) + "</div>");
     }
   }
}

totals();

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
      .on("click", clicked)
      .attr("id", function(d) { var str = geo + "_" + d.properties.DISTRICT; return str.replace(new RegExp(" ", "g"),"-"); })
      .attr("precinctName", function(d){ return d.properties.DISTRICT })
      .attr("class", function(d){
        for (var i=0; i < data2016.length; i++){

          if (d.properties.DISTRICT == data2016[i].district){

            if (Number(data2016[i].total) >= 30000){ return "purple5"; }
            else if (Number(data2016[i].total) >= 25000){ return "purple4"; }
            else if (Number(data2016[i].total) >= 20000){ return "purple3"; }
            else if (Number(data2016[i].total) >= 10000){ return "purple2"; }
            else if (Number(data2016[i].total) >= 0){ return "purple1"; }
          }
        }
        })
      .on("mousedown", function(d){
        var container = "";
        if (race == "senate") { container = "#infoBoxS"; }
        else if  (race == "house") { container = "#infoBoxH"; }         

        for (var i=0; i < data2016.length; i++){

          if (String(d.properties.DISTRICT) == String(data2016[i].district)){
         $(container + " .district").html("<div>District " + d.properties.DISTRICT + ": " + data2016[i].first + " " + data2016[i].last + " (" + data2016[i].party + ")</div>");
         $(container + " .perdiem").html("<div>" + d3.format("$,.0f")(Number(data2016[i].perdiem)) + "</div>");
         $(container + " .communications").html("<div>" + d3.format("$,.0f")(Number(data2016[i].communications)) + "</div>");
         $(container + " .lodging").html("<div>" + d3.format("$,.0f")(Number(data2016[i].lodging)) + "</div>");
         $(container + " .mileage").html("<div>" + d3.format("$,.0f")(Number(data2016[i].mileage)) + "</div>");
         $(container + " .othertravel").html("<div>" + d3.format("$,.0f")(Number(data2016[i].other_travel)) + "</div>");
         $(container + " .other").html("<div>" + d3.format("$,.0f")(Number(data2016[i].other_expenses)) + "</div>");
         $(container + " .districtX").html("<div>" + d3.format("$,.0f")(Number(data2016[i].district_expenses)) + "</div>");
          $(container + " .total").html("<div>" + d3.format("$,.0f")(Number(data2016[i].total)) + "</div>");
          }
        }


        })
      .style("stroke-width", "1px")
      .style("stroke", "#fff")
      .call(d3.helper.tooltip(function(d, i){
        for (var i=0; i < data2016.length; i++){
          if (d.properties.DISTRICT == data2016[i].district){
            return "<div class='district'>District " + d.properties.DISTRICT + "</div><div>" + d3.format("$,.0f")(data2016[i].total) + " spent</div>";
          }
        }


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

$(".zoom").click(function() {
  clicked2();
  totals();
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

  d3.selectAll("#mapSMetro path, #mapSState path, #mapHMetro path, #mapHState path")
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

  mapBuild("#mapHMetro", "#infobox", "#chart", "mnleg_metro.json", "house", "metro", data2016, 0);
  mapBuild("#mapHState", "#infobox", "#chart", "mnleg.json", "house", "mn", data2016, 0);
  mapBuild("#mapSMetro", "#infobox", "#chart", "mnsenate_metro.json", "senate", "metro", data2016, 0);
  mapBuild("#mapSState", "#infobox", "#chart", "mnsenate.json", "senate", "mn", data2016, 0);

});
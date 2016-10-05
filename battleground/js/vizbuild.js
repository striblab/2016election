//RESULTS TABLES
function resultsTables(container,race,data,state,county,index){

}

//SELECTION TABLES
function tableSort(container,party,data,candidate,sorted){
   
  d3.select(container).selectAll(".card").sort(function(a, b) {
          if (candidate == "candidate") { 
        if (sorted == "descend") { return d3.descending(a.candidate, b.candidate); }
        if (sorted == "ascend") { return d3.ascending(a.candidate, b.candidate); }
     }
          if (candidate == "district") { 
        if (sorted == "descend") { return d3.descending(a.district, b.district); }
        if (sorted == "ascend") { return d3.ascending(a.district, b.district); }
     }
           if (candidate == "party") { 
        if (sorted == "descend") { return d3.descending(a.party_id, b.party_id); }
        if (sorted == "ascend") { return d3.ascending(a.party_id, b.party_id); }
     }
           if (candidate == "vote") { 
        if (sorted == "descend") { return d3.descending(a.vote_pct, b.vote_pct); }
        if (sorted == "ascend") { return d3.ascending(a.vote_pct, b.vote_pct); }
     }
    })
    .transition().duration(500);
}

function tableBuild(container,race,data,state,county,index){

if (race == "senate") { var select = "districtS"; }
if (race == "house") { var select = "districtH"; }

d3.select(container).selectAll(".card")
.data(data.filter(function(d){ return d.vote_pct > 50; })).enter().append("div")
.attr("class","card")
.html(function (d){ 
    if (d.party_id == "R") { 
      var shade = "republican"; var party = "RPM";
        if  (d.vote_pct > 80) { var swatch = "r4"; }
        else if  (d.vote_pct > 70) { var swatch = "r3"; }
        else if  (d.vote_pct > 60) { var swatch = "r2"; }
        else if  (d.vote_pct > 50) { var swatch = "r1"; }
    }
    else if (d.party_id == "DFL") { 
      var party = "DFL"; var shade="democrat";
        if  (d.vote_pct > 80) { var swatch = "d4"; }
        else if  (d.vote_pct > 70) { var swatch = "d3"; }
        else if  (d.vote_pct > 60) { var swatch = "d2"; }
        else if  (d.vote_pct > 50) { var swatch = "d1"; }
     }
    return "<div class='tableCell candidate'>" + d.candidate + "</div><div class='tableCell " + select + "' region='mn'>" + d.district + "</div><div class='tableCell party " + shade + "'>" + party + "</div><div class='tableCell votes "  + swatch +  "'>" + Math.round(d.vote_pct) + "%</div>";
});

$("." + select).click(function() {
 $("." + select).removeClass("selected");
 $(".district").removeClass("selected");
 $(this).addClass("selected");

  $(".districtName").html("District " + $(this).text());

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

  $("#tableHouse, #filterHouse").slideToggle( "slow", function() {});
  $("#tableSenate").slideToggle( "slow", function() {});
  $("#analysisHouse").slideToggle( "slow", function() {});
  $("#analysisSenate, #filterSenate").slideToggle( "slow", function() {});

    // clicked2();
    var findDistrict = $(this).text() + "_" + $(this).attr("region");
    $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Down();
    $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Up();
    $("[id='" + findDistrict.replace(new RegExp(" ", "g"),"-") + "']").d3Click();
});

}

//STATS COLOR
$(document).bind('DOMNodeInserted', function(event) {

   $('.raceRow .cell .statNum').each(function() {
    var num = $(this).text();
      if (num >= .80) { $(this).addClass("gray5"); $(this).html(d3.format("%")(num)); }
      else if (num >= .60) { $(this).addClass("gray4"); $(this).html(d3.format("%")(num)); } 
      else if (num >= .40) { $(this).addClass("gray3"); $(this).html(d3.format("%")(num)); }
      else if (num >= .20) { $(this).addClass("gray2"); $(this).html(d3.format("%")(num)); }
      else if (num > 0) { $(this).addClass("gray1"); $(this).html(d3.format("%")(num)); }
    });
   $('.schoolRow .cell .statNum').each(function() {
    var num = $(this).text();
      if (num >= .35) { $(this).addClass("gray5"); $(this).html(d3.format("%")(num)); }
      else if (num >= .30) { $(this).addClass("gray4"); $(this).html(d3.format("%")(num)); } 
      else if (num >= .20) { $(this).addClass("gray3"); $(this).html(d3.format("%")(num)); }
      else if (num >= .10) { $(this).addClass("gray2"); $(this).html(d3.format("%")(num)); }
      else if (num > 0) { $(this).addClass("gray1"); $(this).html(d3.format("%")(num)); }
    });
   $('.incomeRow .cell .statNum').each(function() {
    var num = $(this).text();
      if (num >= .35) { $(this).addClass("gray5"); $(this).html(d3.format("%")(num)); }
      else if (num >= .30) { $(this).addClass("gray4"); $(this).html(d3.format("%")(num)); } 
      else if (num >= .20) { $(this).addClass("gray3"); $(this).html(d3.format("%")(num)); }
      else if (num >= .10) { $(this).addClass("gray2"); $(this).html(d3.format("%")(num)); }
      else if (num > 0) { $(this).addClass("gray1"); $(this).html(d3.format("%")(num)); }
    });
   $('.maleRow .cell  .statNum').each(function() {
    var num = $(this).text();
      if (num > .10) { $(this).addClass("gray5"); $(this).html(d3.format("%")(num)); }
      else if (num >= .09) { $(this).addClass("gray4"); $(this).html(d3.format("%")(num)); } 
      else if (num >= .07) { $(this).addClass("gray3"); $(this).html(d3.format("%")(num)); }
      else if (num >= .04) { $(this).addClass("gray2"); $(this).html(d3.format("%")(num)); }
      else if (num > 0) { $(this).addClass("gray1"); $(this).html(d3.format("%")(num)); }
    });
   $('.femaleRow .cell .statNum').each(function() {
    var num = $(this).text();
      if (num > .10) { $(this).addClass("gray5"); $(this).html(d3.format("%")(num)); }
      else if (num >= .09) { $(this).addClass("gray4"); $(this).html(d3.format("%")(num)); } 
      else if (num >= .07) { $(this).addClass("gray3"); $(this).html(d3.format("%")(num)); }
      else if (num >= .04) { $(this).addClass("gray2"); $(this).html(d3.format("%")(num)); }
      else if (num > 0) { $(this).addClass("gray1"); $(this).html(d3.format("%")(num)); }
    });
});

//MAPS
function mapReshade(container, shape, subject, race, dataCompare) {


}

function mapStats(d, race, dataCompare){


}

function mapColor(d, race, dataCompare){
  return "r2";
}

function mapTips(d, subject, dataCompare){
  return d.properties.DISTRICT;
}

function mapBuild(container, boxContainer, chartContainer, shape, race, geo, dataCompare, index) {

var width = $("#mapHouse").width(),
    height = 400,
    centered;

if (geo=="us") { var projection = d3.geo.albersUsa().scale(700).translate([330, 200]); }
else if (geo=="mn") { var projection = d3.geo.albersUsa().scale(5037).translate([50, 970]); }
else if (geo=="metro") { var projection = d3.geo.mercator().scale([16800]).center([-92.263184,44.863656]); }

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
      .attr("id", function(d) { var str = d.properties.DISTRICT + "_" + geo; return str.replace(new RegExp(" ", "g"),"-"); })
      .attr("precinctName", function(d){ return d.properties.DISTRICT })
      .attr("class", function(d){
         return mapColor(d.properties.DISTRICT, race, dataCompare);
        })
       .on("mousedown", function(d, i){ 

       })
      .style("stroke-width", "0")
      // .style("stroke", "#fff")
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

$(".zoom").click(function() {
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

  g.selectAll("path")
      .classed("faded", true)
      .classed("active", centered && function(d) { return d === centered; });

  g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
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
      .classed("active", centered && function(d) { return d === centered; });

  g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
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

}
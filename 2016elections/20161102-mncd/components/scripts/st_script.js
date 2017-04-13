d3.json("./data/ushouse2014.json", function(error, dataLoad) {

  var data = dataLoad.mn2014;

$.urlParam = function(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results != null) { return results[1] || 0; }
  else { return null; }
}

var selected = $.urlParam('chart');

if (selected != null){
$(".slide").hide();
$("#" + selected).show();
} else { $(".slide").show(); }

$(".cd").hide();
$("#cd1").show();

//SEARCH FILTER TABLE
  $( document ).ready(function() {
     $('#filter_box').keyup(function(i){
        $('.cd').hide();
        var txt = $('#filter_box').val();
        $('.cd').each(function(){
           if($(this).text().toUpperCase().indexOf(txt.toUpperCase()) != -1){
               $(this).show();
           }
        });
        var count = $('.cd:visible').length;
        $('#results').html(count);
        if (count == 8) { $('#results').html(""); }
    });

// });
});

$(".rank").click(function() {
    $(".rank div, .rank").removeClass("selected3");
    $(this).addClass("selected3");
    $('.cd').hide();
    $("#" + $(this).find(".mainbar").attr("data")).show();
    count = Number($(this).attr("index"));
});

$(".zoom").click(function() {
  $(".rank").removeClass("selected3");
  $('.cd').show();
});

var count = 1;

$("#leftArrow").click(function() {
    if (count != 1) { count--; }
    $(".rank div, .rank").removeClass("selected3");
    $("[data=cd" + count + "]").addClass("selected3");
    $('.cd').hide();
    $("#cd" + count).show();
});

$("#rightArrow").click(function() {
    if (count != 8) { count++; }
    $(".rank div, .rank").removeClass("selected3");
    $("[data=cd" + count + "]").addClass("selected3");
    $('.cd').hide();
    $("#cd" + count).show();
});

// MAPPAGE
d3.json('./shapefiles/us_cd_mn_2012.json', function(error, cd) {
d3.json('./shapefiles/cdpct.json', function(error, blocks) {

mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhZG93ZmxhcmUiLCJhIjoiS3pwY1JTMCJ9.pTSXx_LFgR3XBpCNNxWPKA';
var map = new mapboxgl.Map({
    container: 'dMap',
    style: 'mapbox://styles/shadowflare/cilea5110001ra8ktm7409xze',
    center: [-93.2175,44.731944],
    zoom: 7,
    minZoom: 2
});

map.scrollZoom.disable();
map.addControl(new mapboxgl.Navigation());

map.on('load', function() {

//PRECINCTS
  var shapeObj3 = new mapboxgl.GeoJSONSource({
   data: blocks
});

  map.addSource('blocks', shapeObj3);

   map.addLayer({
        'id': 'blocks-layer',
        'interactive': true,
        'source': 'blocks',
        'type': 'fill',
        // "filter": [
        // "==",
        // "COUNTYNAME",
        // layer[0]
        // ],
             'paint': {
            'fill-color':{
            // property: 'B19113e1',
            property: 'CDPCT', 
            stops: [
                [0, '#8C1B17'],
                [0.20, '#A52129'],
                [0.30, '#A5484D'],
                [0.40, '#C68985'],
                [0.50, '#ABCEE8'],
                [0.60, '#5ca5c3'],
                [0.70, '#4f97c4'],
                [0.80, '#3f88c5']
            ]
        },
             'fill-opacity': 0.75
      }
    });

//CD
  var shapeObj2 = new mapboxgl.GeoJSONSource({
   data: cd
});

  map.addSource('cd', shapeObj2);

  var layers = [
  ["1", "#3F88C5"],
  ["2", "#333"],
  ["3", "#A52129"],
  ["4", "#3F88C5"],
  ["5", "#3F88C5"],
  ["6", "#A52129"],
  ["7", "#3F88C5"],
  ["8", "#3F88C5"]
];

layers.forEach(function(layer, i) {
   map.addLayer({
        'id': 'cd-layer-' + i,
        'interactive': true,
        'source': 'cd',
        'type': 'fill',
        "filter": [
        "==",
        "DISTRICT",
        layer[0]
        ],
        'paint': {
            'fill-antialias' : true,
            'fill-opacity': 1,
            'fill-color': 'rgba(51, 51, 51, 0)',
            'fill-outline-color': 'rgba(51, 51, 51, 1)'
        }
    });
   });

var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

map.on('mousemove', function(e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['cd-layer-0','cd-layer-1','cd-layer-2','cd-layer-3','cd-layer-4','cd-layer-5','cd-layer-6','cd-layer-7','cd-layer-8'] });
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
        .setHTML("Congressional District " + feature.properties.DISTRICT)
        .addTo(map);
});

});




});
});


function mapColor(d, race, dataCompare){
  if (race == "house"){
    for (var i=0; i < dataCompare.length; i++){
    if ((dataCompare[i].STATEFP + dataCompare[i].district) == d.properties.GEOID){

      if (dataCompare[i].party_id == "R" && dataCompare[i].since >= 2010) { return "republican"; }
      if (dataCompare[i].party_id == "R") { return "rlean"; }
      else if (dataCompare[i].party_id == "D" && dataCompare[i].since >= 2010) { return "democrat"; }
      else if (dataCompare[i].party_id == "D") { return "dlean"; }
    }
} 
 } else if (race == "lean") {
    for (var i=0; i < dataCompare.length; i++){
    if ((dataCompare[i].STATEFP + dataCompare[i].district) == d.properties.GEOID){
      if (dataCompare[i].party_id == "R" && dataCompare[i].vote_pct >= .50) { 
        if (dataCompare[i].vote_pct >= .80) { return "r4"; }
        if (dataCompare[i].vote_pct >= .70) { return "r3"; }
        if (dataCompare[i].vote_pct >= .60) { return "r2"; }
        if (dataCompare[i].vote_pct >= .45) { return "r1"; }
      }
      else if (dataCompare[i].party_id == "D" && dataCompare[i].vote_pct >= .50) { 
        if (dataCompare[i].vote_pct >= .80) { return "d4"; }
        else if (dataCompare[i].vote_pct >= .70) { return "d3"; }
        else if (dataCompare[i].vote_pct >= .60) { return "d2"; }
        else if (dataCompare[i].vote_pct >= .45) { return "d1"; }
      }
    }
} 
      } else if (race == "margins") {
    for (var i=0; i < dataCompare.length; i++){
    if ((dataCompare[i].STATEFP + dataCompare[i].district) == d.properties.GEOID){
      if (dataCompare[i].party_id == "R" && dataCompare[i].vote_pct >= .50) { 
        if (dataCompare[i].vote_pct >= .80) { return "r4"; }
        if (dataCompare[i].vote_pct >= .70) { return "r3"; }
        if (dataCompare[i].vote_pct >= .60) { return "r2"; }
        if (dataCompare[i].vote_pct >= .45) { return "r1"; }
      }
      else if (dataCompare[i].party_id == "D" && dataCompare[i].vote_pct >= .50) { 
        if (dataCompare[i].vote_pct >= .80) { return "d4"; }
        else if (dataCompare[i].vote_pct >= .70) { return "d3"; }
        else if (dataCompare[i].vote_pct >= .60) { return "d2"; }
        else if (dataCompare[i].vote_pct >= .45) { return "d1"; }
      }
    }
} 
      }
}

function mapTips(d, subject, dataCompare){ 
  if (subject == "state") { d.properties.NAME; }
  else {
  for (var i=0; i < dataCompare.length; i++){
    if ((dataCompare[i].STATEFP + dataCompare[i].district) == d.properties.GEOID){
      // if (dataCompare[i].party_id == "R" && dataCompare[i].vote_pct >= .48) { 

        // if (dataCompare[i].vote_pct >= .80) { return "<div>" + dataCompare[i].state + " " + dataCompare[i].district + "</div><div> " + partyString + "</div>"; }
        // if (dataCompare[i].vote_pct >= .70) { return "<div>" + dataCompare[i].state + " " + dataCompare[i].district + " (" + partyString + ")</div>"; }
        // if (dataCompare[i].vote_pct >= .60) { return "<div>" + dataCompare[i].state + " " + dataCompare[i].district + " (" + partyString + ")</div>"; }
        // if (dataCompare[i].vote_pct >= .45) { 

        if (dataCompare[i].party_id == "D") { var partyString = dataCompare[i].candidate  + " <span class='democrat'>(" + dataCompare[i].party_id + ")</span>"; }
        else if (dataCompare[i].party_id == "R") { var partyString = dataCompare[i].candidate  + " <span class='republican'>(" + dataCompare[i].party_id + ")</span>"; }

          return "<div>" + dataCompare[i].state + " " + dataCompare[i].district + "</div><div>" + partyString + "</div><div>Since " + dataCompare[i].since + "</div>"; 
        // }
      // }
      // else if (dataCompare[i].party_id == "D" && dataCompare[i].vote_pct >= .48) { 
      //   if (dataCompare[i].vote_pct >= .80) { return "<div>" + dataCompare[i].state + " " + dataCompare[i].district + "</div>"; }
      //   else if (dataCompare[i].vote_pct >= .70) { return "<div>" + dataCompare[i].state + " " + dataCompare[i].district + "</div>"; }
      //   else if (dataCompare[i].vote_pct >= .60) { return "<div>" + dataCompare[i].state + " " + dataCompare[i].district + "</div>"; }
      //   else if (dataCompare[i].vote_pct >= .48) { return "<div>" + dataCompare[i].state + " " + dataCompare[i].district + "</div>"; }
      // }
      }
    }      
  }
}

function mapBuild(container, boxContainer, chartContainer, shape, race, geo, dataCompare, index) {

var width = 700,
    height = 400,
    centered;

if (geo=="us") { var projection = d3.geo.albersUsa().scale(700).translate([330, 200]); 
    var width = 700,
    height = 400,
    centered; }
else if (geo=="mn") { var projection = d3.geo.albersUsa().scale(5037).translate([50, 970]);
    var width = 320,
    height = 350,
    centered; }
else if (geo=="mnBig") { var projection = d3.geo.albersUsa().scale(5037).translate([50, 970]);
    var width = 400,
    height = 460,
    centered; }
else if (geo=="metro") { var projection = d3.geo.mercator().scale([16800]).center([-92.403259,44.988113]); }

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
      .attr("precinctName", function(d){ return d.properties.DISTRICT; })
      .attr("class", function(d){
        if (race == "state"){ 
          if (d.properties.DISTRICT == 1) { return "d4"; }
          if (d.properties.DISTRICT == 2) { return "none"; }
          if (d.properties.DISTRICT == 3) { return "r4"; }
          if (d.properties.DISTRICT == 4) { return "d4"; }
          if (d.properties.DISTRICT == 5) { return "d4"; }
          if (d.properties.DISTRICT == 6) { return "r4"; }
          if (d.properties.DISTRICT == 7) { return "d4"; }
          if (d.properties.DISTRICT == 8) { return "d4"; }
         }
        else { return mapColor(d, race, dataCompare); }
         
        })
       .on("mousedown", function(d, i){  

       })
      .style("stroke-width", ".5px")
      .style("stroke", "#fff")
      .call(d3.helper.tooltip(function(d, i){
        if (race == "state"){ 
          if (d.properties.DISTRICT == 1) { return "<div class='districtLabel'>Congressional District " + d.properties.DISTRICT + "</div><div>Rep. Tim Walz (<span class='d4'>DFL</span>)</div>"; }
          if (d.properties.DISTRICT == 2) { return "<div class='districtLabel'>Congressional District " + d.properties.DISTRICT + "</div><div>Open Seat</div>"; }
          if (d.properties.DISTRICT == 3) { return "<div class='districtLabel'>Congressional District " + d.properties.DISTRICT + "</div><div>Rep. Erik Paulsen (<span class='r4'>R</span>)</div>"; }
          if (d.properties.DISTRICT == 4) { return "<div class='districtLabel'>Congressional District " + d.properties.DISTRICT + "</div><div>Rep. Betty McCollum (<span class='d4'>DFL</span>)</div>"; }
          if (d.properties.DISTRICT == 5) { return "<div class='districtLabel'>Congressional District " + d.properties.DISTRICT + "</div><div>Rep. Keith Ellison (<span class='d4'>DFL</span>)</div>"; }
          if (d.properties.DISTRICT == 6) { return "<div class='districtLabel'>Congressional District " + d.properties.DISTRICT + "</div><div>Rep. Tom Emmer (<span class='r4'>R</span>)</div>"; }
          if (d.properties.DISTRICT == 7) { return "<div class='districtLabel'>Congressional District " + d.properties.DISTRICT + "</div><div>Rep. Collin Peterson (<span class='d4'>DFL</span>)</div>"; }
          if (d.properties.DISTRICT == 8) { return "<div class='districtLabel'>Congressional District " + d.properties.DISTRICT + "</div><div>Rep. Rick Nolan (<span class='d4'>DFL</span>)</div>"; } 
        }
        else { return mapTips(d, race, dataCompare); }
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

  g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");

}

function mnzoom(d) {
  var x, y, k;

    var centroid = path.centroid(d);
    x = 429.8542649319006;
    y = 76.27472769218944;
    k = 5;

  g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", "0.5px");

  g.selectAll("path").style("stroke-width", "0.5px");
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

        g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width","0.5px");
}

$(window).on("resize", function() {
var aspect = 650 / 400, chart = $("#mapFull svg");
  var targetWidth = chart.parent().width();
  chart.attr("width", targetWidth);
  chart.attr("height", targetWidth / aspect);
  });
var aspect = 650 / 400, chart = $("#mapFull svg");
  var targetWidth = chart.parent().width();
  chart.attr("width", targetWidth);
  chart.attr("height", targetWidth / aspect);

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
  $(".district").removeClass("selected,fadeBox");
  $(".district").addClass("fadeBox");

d3.json("shapefiles/" + shape, function(error, us) {
d3.selectAll(container + " svg g path")
      .data(us.features)
      .attr("class", function(d){
    if (subject == "current") { 
      $(".district").removeClass("fadeBox");
    for (var i=0; i < dataCompare.length; i++){
    if ((dataCompare[i].STATEFP + dataCompare[i].district) == d.properties.GEOID){
      if (dataCompare[i].party_id == "R" && dataCompare[i].vote_pct >= .48) { return "r4"; }
      else if (dataCompare[i].party_id == "D" && dataCompare[i].vote_pct >= .48) { return "d4"; }
    }
  } 
}

  else if (subject == "hot") { 
    for (var i=0; i < dataCompare.length; i++){
      if (d.properties.DISTRICT == dataCompare[i].district){
    if (dataCompare[i].HotDistrict == "x"){

        $("#d" + d.properties.DISTRICT).removeClass("fadeBox");
        $("#d" + d.properties.DISTRICT).addClass("selected,thisBox");

      if (dataCompare[i].party == "RPM") { 
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
      if (d.properties.DISTRICT == dataCompare[i].district){
    if (d.properties.DISTRICT == "25B" || d.properties.DISTRICT == "42B" || d.properties.DISTRICT == "52B" || d.properties.DISTRICT == "54A"){

        $("#d" + d.properties.DISTRICT).removeClass("fadeBox");
        $("#d" + d.properties.DISTRICT).addClass("selected,thisBox");


      if (dataCompare[i].party == "RPM") { 
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
      if (d.properties.DISTRICT == dataCompare[i].district){
    if (d.properties.DISTRICT == "02A" || d.properties.DISTRICT == "10A" || d.properties.DISTRICT == "10B" || d.properties.DISTRICT == "11B" || d.properties.DISTRICT == "12A" || d.properties.DISTRICT == "14B" || d.properties.DISTRICT == "17A" || d.properties.DISTRICT == "17B" || d.properties.DISTRICT == "24B" || d.properties.DISTRICT == "56B" || d.properties.DISTRICT == "50B" || d.properties.DISTRICT == "27A"){

        $("#d" + d.properties.DISTRICT).removeClass("fadeBox");
        $("#d" + d.properties.DISTRICT).addClass("selected,thisBox");

      if (dataCompare[i].party == "RPM") { 
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
          $(".district").removeClass("fadeBox");
    for (var i=0; i < dataCompare.length; i++){
    if ((dataCompare[i].STATEFP + dataCompare[i].district) == d.properties.GEOID){
      if (dataCompare[i].party_id == "R" && dataCompare[i].vote_pct >= .50) { 
        if (dataCompare[i].vote_pct >= .80) { return "r4"; }
        if (dataCompare[i].vote_pct >= .70) { return "r3"; }
        if (dataCompare[i].vote_pct >= .60) { return "r2"; }
        if (dataCompare[i].vote_pct >= .48) { return "r1"; }
      }
      else if (dataCompare[i].party_id == "D" && dataCompare[i].vote_pct >= .50) { 
        if (dataCompare[i].vote_pct >= .80) { return "d4"; }
        else if (dataCompare[i].vote_pct >= .70) { return "d3"; }
        else if (dataCompare[i].vote_pct >= .60) { return "d2"; }
        else if (dataCompare[i].vote_pct >= .48) { return "d1"; }
      }
    }
}    }
        else if (subject == "lean"){
          $(".district").removeClass("fadeBox");
  for (var i=0; i < dataCompare.length; i++){
    if ((dataCompare[i].STATEFP + dataCompare[i].district) == d.properties.GEOID){
      if (dataCompare[i].party_id == "R" && dataCompare[i].vote_pct >= .48) { 
        if (dataCompare[i].vote_pct >= .80) { return "<div>" + dataCompare[i].state + " " + dataCompare[i].district + "</div>"; }
        if (dataCompare[i].vote_pct >= .70) { return "<div>" + dataCompare[i].state + " " + dataCompare[i].district + "</div>"; }
        if (dataCompare[i].vote_pct >= .60) { return "<div>" + dataCompare[i].state + " " + dataCompare[i].district + "</div>"; }
        if (dataCompare[i].vote_pct >= .48) { return "<div>" + dataCompare[i].state + " " + dataCompare[i].district + "</div>"; }
      }
      else if (dataCompare[i].party_id == "D" && dataCompare[i].vote_pct >= .48) { 
        if (dataCompare[i].vote_pct >= .80) { return "<div>" + dataCompare[i].state + " " + dataCompare[i].district + "</div>"; }
        else if (dataCompare[i].vote_pct >= .70) { return "<div>" + dataCompare[i].state + " " + dataCompare[i].district + "</div>"; }
        else if (dataCompare[i].vote_pct >= .60) { return "<div>" + dataCompare[i].state + " " + dataCompare[i].district + "</div>"; }
        else if (dataCompare[i].vote_pct >= .48) { return "<div>" + dataCompare[i].state + " " + dataCompare[i].district + "</div>"; }
      }
    }
} 
         }
      });
});
}

function houseChart(){

d3.csv("./data/house.csv", function(d) {
  return {
    year: +d.year,
    dem: +d.dem,
    rep: +d.rep,
    ind: +d.ind
  };
}, function(error, rows) {

var dataT = rows;

var x = [];
var rep = [];
var dem = [];
var ind = [];

x[0] = "x";
rep[0] = "GOP Seats";
dem[0] = "DEM Seats";
ind[0] = "IND Seats";

for (var i=1; i <= dataT.length; i++){
  x[i] = dataT[i-1].year;
  rep[i] = dataT[i-1].rep;
  dem[i] = dataT[i-1].dem;
  ind[i] = dataT[i-1].ind;
}

var  padding = {
        top: 20,
        right: 60,
        bottom: 20,
        left: 60,
    };

var houseChart = c3.generate({
      bindto: "#chart",
      padding: padding,
      data: {
            x: 'x',
            columns: [
                x,
                dem,
                rep,
                ind
            ],
        types: {
          'DEM Seats':'line',
          'GOP Seats':'line',
          'IND Seats':'line'
         }
        },        
        color: {
              pattern: ['#3F88C5','#8C1B17',"#bbbbbb"]
            },
        axis: {
              y: {
                    // max: 1,
                    // min: 0,
                    padding: {bottom: 0, top: 0},
                    tick: {
                     count: 4,
                     format: d3.format('.0f')
                    }
                },
            x: {
                 tick: {
                     values: [1854,1880,1900,1920,1940,1960,1980,2000,2014],
                     count: 9
                }
            }
        },
        grid: {
        x: {
             lines: [
                {value: 1954, text: '1954', position: 'start', class: 'dfade'},
                {value: 1994, text: '1994', position: 'start', class: 'rfade'}
            ]
        }
    },
         regions: [
        {axis: 'x', start: 2010, end: 2014, class: 'hottest'},
    ]
// subchart: {
// show: true
// }
});

});

}

houseChart();

//VOTING HISTORY
function chartV(){
var  padding = {
        top: 20,
        right: 40,
        bottom: 20,
        left: 60,
    };

var chartV = c3.generate({
        bindto: '#chartV',
        padding: padding,
    data: {
        x: 'x',
        columns: [
            ['x',2000,2002,2004,2006,2008,2010,2012,2014],
            ['DEM Vote %',212,205,202,236,257,193,201,188],
            ['GOP Vote %',221,229,231,199,178,242,234,247]
        ],
        type: 'line'
    },
    color:  {  pattern: ["#4192A1","#9C0004"] },
    axis: {
      y: {
            min: 0,
            padding: {bottom: 0},
            tick: {
             count: 4,
             format: d3.format('.0f')
            }
        },
        x: {
            tick: {
                values: ['2000', '2004', '2008', '2012', '2014'],
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
        x: {
            lines: [
                {value: 2000, text: 'Bush (R) Win', position: 'start'},
                {value: 2002, text: 'Midterm', position: 'start'},
                {value: 2004, text: 'Bush (R) Win', position: 'start'},
                {value: 2006, text: 'Midterm', position: 'start'},
                {value: 2008, text: 'Obama (D) Win', position: 'start'},
                {value: 2010, text: 'Midterm', position: 'start'},
                {value: 2012, text: 'Obama (D) Win', position: 'start'},
                {value: 2014, text: 'Midterm', position: 'start'}
            ]
        }
    }
});
}

chartV();

//PVI HISTORY
function chartPVI(){
var  padding = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 70,
    };

var chart1 = c3.generate({
        bindto: '#chart1',
        padding: padding,
    data: {
        x: 'x',
        columns: [
            ['x',2006,2010,2014],
            // ['MN DEM Vote %',0.549,0.465,0.497,0.529,0.435,0.511,0.479,0.511,0.541,0.527],
            // // ['MN GOP Vote %',0.420,0.425,0.495,0.459,0.319,0.350,0.455,0.477,0.438,0.450],
            // ['National DEM Vote %',0.501,0.410,0.406,0.457,0.430,0.492,0.484,0.482,0.529,0.51]
            // ['Minnesota PVI Score',5.15,7.3,8.15,3.85,1.2,0.7,1.2,2.05,1.45]
            ['PVI',2,1,1]
        ],
        type: 'area'
    },
    legend: {
      show: false
    },
    point: {
            show: false
        },
    color:  {  pattern: ["#A52129"] },
    axis: {
      y: {
            max: 25,
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
                // values: ['1976', '1984', '1992', '2004', '2012'],
                count: 3,
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
              text += "<td class='value'>R" + value + "</td>";
              text += "</tr><tr>";
              text += "</tr>";
              
          }
          return text + "</table>";
      }
    }
});

var chart2 = c3.generate({
        bindto: '#chart2',
        padding: padding,
    data: {
        x: 'x',
        columns: [
            ['x',2006,2010,2014],
            // ['MN DEM Vote %',0.549,0.465,0.497,0.529,0.435,0.511,0.479,0.511,0.541,0.527],
            // // ['MN GOP Vote %',0.420,0.425,0.495,0.459,0.319,0.350,0.455,0.477,0.438,0.450],
            // ['National DEM Vote %',0.501,0.410,0.406,0.457,0.430,0.492,0.484,0.482,0.529,0.51]
            // ['Minnesota PVI Score',5.15,7.3,8.15,3.85,1.2,0.7,1.2,2.05,1.45]
            ['PVI',3,2,2]
        ],
        type: 'area'
    },
    legend: {
      show: false
    },
    point: {
            show: false
        },
    color:  {  pattern: ["#A52129"] },
    axis: {
      y: {
            max: 25,
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
                // values: ['1976', '1984', '1992', '2004', '2012'],
                count: 3,
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
              text += "<td class='value'>R" + value + "</td>";
              text += "</tr><tr>";
              text += "</tr>";
              
          }
          return text + "</table>";
      }
    }
});

var chart3 = c3.generate({
        bindto: '#chart3',
        padding: padding,
    data: {
        x: 'x',
        columns: [
            ['x',2006,2010,2014],
            // ['MN DEM Vote %',0.549,0.465,0.497,0.529,0.435,0.511,0.479,0.511,0.541,0.527],
            // // ['MN GOP Vote %',0.420,0.425,0.495,0.459,0.319,0.350,0.455,0.477,0.438,0.450],
            // ['National DEM Vote %',0.501,0.410,0.406,0.457,0.430,0.492,0.484,0.482,0.529,0.51]
            // ['Minnesota PVI Score',5.15,7.3,8.15,3.85,1.2,0.7,1.2,2.05,1.45]
            ['PVI',1,2,2]
        ],
        type: 'area'
    },
    legend: {
      show: false
    },
    point: {
            show: false
        },
    color:  {  pattern: ["#A52129"] },
    axis: {
      y: {
            max: 25,
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
                // values: ['1976', '1984', '1992', '2004', '2012'],
                count: 3,
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
              text += "<td class='value'>R" + value + "</td>";
              text += "</tr><tr>";
              text += "</tr>";
              
          }
          return text + "</table>";
      }
    }
});

var chart4 = c3.generate({
        bindto: '#chart4',
        padding: padding,
    data: {
        x: 'x',
        columns: [
            ['x',2006,2010,2014],
            // ['MN DEM Vote %',0.549,0.465,0.497,0.529,0.435,0.511,0.479,0.511,0.541,0.527],
            // // ['MN GOP Vote %',0.420,0.425,0.495,0.459,0.319,0.350,0.455,0.477,0.438,0.450],
            // ['National DEM Vote %',0.501,0.410,0.406,0.457,0.430,0.492,0.484,0.482,0.529,0.51]
            // ['Minnesota PVI Score',5.15,7.3,8.15,3.85,1.2,0.7,1.2,2.05,1.45]
            ['PVI',12,11,11]
        ],
        type: 'area'
    },
    legend: { 
      show: false
    },
    point: {
            show: false
        },
    color:  {  pattern: ["#3F88C5"] },
    axis: {
      y: {
            max: 25,
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
                // values: ['1976', '1984', '1992', '2004', '2012'],
                count: 3,
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

var chart5 = c3.generate({
        bindto: '#chart5',
        padding: padding,
    data: {
        x: 'x',
        columns: [
            ['x',2006,2010,2014],
            // ['MN DEM Vote %',0.549,0.465,0.497,0.529,0.435,0.511,0.479,0.511,0.541,0.527],
            // // ['MN GOP Vote %',0.420,0.425,0.495,0.459,0.319,0.350,0.455,0.477,0.438,0.450],
            // ['National DEM Vote %',0.501,0.410,0.406,0.457,0.430,0.492,0.484,0.482,0.529,0.51]
            // ['Minnesota PVI Score',5.15,7.3,8.15,3.85,1.2,0.7,1.2,2.05,1.45]
            ['PVI',21,22,22]
        ],
        type: 'area'
    },
    legend: {
      show: false
    },
    point: {
            show: false
        },
    color:  {  pattern: ["#3F88C5"] },
    axis: {
      y: {
            max: 25,
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
                // values: ['1976', '1984', '1992', '2004', '2012'],
                count: 3,
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

var chart6 = c3.generate({
        bindto: '#chart6',
        padding: padding,
    data: {
        x: 'x',
        columns: [
            ['x',2006,2010,2014],
            // ['MN DEM Vote %',0.549,0.465,0.497,0.529,0.435,0.511,0.479,0.511,0.541,0.527],
            // // ['MN GOP Vote %',0.420,0.425,0.495,0.459,0.319,0.350,0.455,0.477,0.438,0.450],
            // ['National DEM Vote %',0.501,0.410,0.406,0.457,0.430,0.492,0.484,0.482,0.529,0.51]
            // ['Minnesota PVI Score',5.15,7.3,8.15,3.85,1.2,0.7,1.2,2.05,1.45]
            ['PVI',6,8,10]
        ],
        type: 'area'
    },
    legend: {
      show: false
    },
    point: {
            show: false
        },
    color:  {  pattern: ["#A52129"] },
    axis: {
      y: {
            max: 25,
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
                // values: ['1976', '1984', '1992', '2004', '2012'],
                count: 3,
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
              text += "<td class='value'>R" + value + "</td>";
              text += "</tr><tr>";
              text += "</tr>";
              
          }
          return text + "</table>";
      }
    }
});

var chart7 = c3.generate({
        bindto: '#chart7',
        padding: padding,
    data: {
        x: 'x',
        columns: [
            ['x',2006,2010,2014],
            // ['MN DEM Vote %',0.549,0.465,0.497,0.529,0.435,0.511,0.479,0.511,0.541,0.527],
            // // ['MN GOP Vote %',0.420,0.425,0.495,0.459,0.319,0.350,0.455,0.477,0.438,0.450],
            // ['National DEM Vote %',0.501,0.410,0.406,0.457,0.430,0.492,0.484,0.482,0.529,0.51]
            // ['Minnesota PVI Score',5.15,7.3,8.15,3.85,1.2,0.7,1.2,2.05,1.45]
            ['PVI',6,5,6]
        ],
        type: 'area'
    },
    legend: {
      show: false
    },
    point: {
            show: false
        },
    color:  {  pattern: ["#A52129"] },
    axis: {
      y: {
            max: 25,
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
                // values: ['1976', '1984', '1992', '2004', '2012'],
                count: 3,
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
              text += "<td class='value'>R" + value + "</td>";
              text += "</tr><tr>";
              text += "</tr>";
              
          }
          return text + "</table>";
      }
    }
});

var chart8 = c3.generate({
        bindto: '#chart8',
        padding: padding,
    data: {
        x: 'x',
        columns: [
            ['x',2006,2010,2014],
            // ['MN DEM Vote %',0.549,0.465,0.497,0.529,0.435,0.511,0.479,0.511,0.541,0.527],
            // // ['MN GOP Vote %',0.420,0.425,0.495,0.459,0.319,0.350,0.455,0.477,0.438,0.450],
            // ['National DEM Vote %',0.501,0.410,0.406,0.457,0.430,0.492,0.484,0.482,0.529,0.51]
            // ['Minnesota PVI Score',5.15,7.3,8.15,3.85,1.2,0.7,1.2,2.05,1.45]
            ['PVI',3,3,1]
        ],
        type: 'area'
    },
    legend: {
      show: false
    },
    point: {
            show: false
        },
    color:  {  pattern: ["#3F88C5"] },
    axis: {
      y: {
            max: 25,
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
                // values: ['1976', '1984', '1992', '2004', '2012'],
                count: 3,
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
}

chartPVI();

//Campaign Finance
function chartF(){
var  padding = {
        top: 20,
        right: 40,
        bottom: 20,
        left: 70,
    };

var chartF1 = c3.generate({
      bindto: "#fChart1",
      padding: padding,
        data: {
                // x: 'x',
                columns: [
                    // ['x','Trump','Clinton'],
                    ['Money Raised', 1485417, 323485]
                    // ['Campaign', .30, .200, .30, .200, .30, .200, .30, .200, .200, .30, .200, .30, .200, .30, .200, .30, .200, .200],
                    // ['PAC', .30, .200, .30, .200, .30, .200, .30, .200, .200, .30, .200, .30, .200, .30, .200, .30, .200, .200],
                    // ['SuperPac', .30, .200, .30, .200, .30, .200, .30, .200, .200, .30, .200, .30, .200, .30, .200, .30, .200, .200]
                ],
            type: 'bar',
            colors: {
            'Money Raised': function(d) {
                return (d.index == 0 || d.index == 2 || d.index == 4 || d.index == 6 || d.index == 8 || d.index == 10 || d.index == 12 || d.index == 14) ? '#3f88c5': '#A52129';
            }
          }
            // groups: [
            //     ['Independent', 'Campaign','PAC','SuperPac']
            // ]
            },

            legend: {
              show: false
            },
            axis: {
              rotated: false,
              y: {
                    min: 0,
                    padding: {bottom: 0},
                    tick: {
                     count: 4,
                     format: d3.format('$,.0f')
                    }
                },
                x: {
                    type: 'category',
                    categories: ['Walz','Hagedorn']
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

              console.log(d)

              if (! text) {
                  title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                  text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
              }

              name = nameFormat(d[i].name);
              value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
              if (d[i].index == 0 || d[i].index == 2 || d[i].index == 4 || d[i].index == 6 || d[i].index == 8 || d[i].index == 10 || d[i].index == 12 || d[i].index == 14){
                bgcolor = "#3f88c5";
              } else {
                bgcolor = "#A52129";
              }

              // bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);

              text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
              text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
              text += "<td class='value'>" + value + "</td>";
              text += "</tr><tr>";
              text += "</tr>";
              
          }
          return text + "</table>";
      }
    }
});

var chartF2 = c3.generate({
      bindto: "#fChart2",
      padding: padding,
        data: {
                // x: 'x',
                columns: [
                    // ['x','Trump','Clinton'],
                    ['Money Raised', 3698000, 787946]
                    // ['Campaign', .30, .200, .30, .200, .30, .200, .30, .200, .200, .30, .200, .30, .200, .30, .200, .30, .200, .200],
                    // ['PAC', .30, .200, .30, .200, .30, .200, .30, .200, .200, .30, .200, .30, .200, .30, .200, .30, .200, .200],
                    // ['SuperPac', .30, .200, .30, .200, .30, .200, .30, .200, .200, .30, .200, .30, .200, .30, .200, .30, .200, .200]
                ],
            type: 'bar',
            colors: {
            'Money Raised': function(d) {
                return (d.index == 0 || d.index == 2 || d.index == 4 || d.index == 6 || d.index == 8 || d.index == 10 || d.index == 12 || d.index == 14) ? '#3f88c5': '#A52129';
            }
          }
            // groups: [
            //     ['Independent', 'Campaign','PAC','SuperPac']
            // ]
            },

            legend: {
              show: false
            },
            axis: {
              rotated: false,
              y: {
                    min: 0,
                    padding: {bottom: 0},
                    tick: {
                     count: 4,
                     format: d3.format('$,.0f')
                    }
                },
                x: {
                    type: 'category',
                    categories: ['Craig','Lewis']
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

              console.log(d)

              if (! text) {
                  title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                  text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
              }

              name = nameFormat(d[i].name);
              value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
              if (d[i].index == 0 || d[i].index == 2 || d[i].index == 4 || d[i].index == 6 || d[i].index == 8 || d[i].index == 10 || d[i].index == 12 || d[i].index == 14){
                bgcolor = "#3f88c5";
              } else {
                bgcolor = "#A52129";
              }

              // bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);

              text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
              text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
              text += "<td class='value'>" + value + "</td>";
              text += "</tr><tr>";
              text += "</tr>";
              
          }
          return text + "</table>";
      }
    }
});

var chartF3 = c3.generate({
      bindto: "#fChart3",
      padding: padding,
        data: {
                // x: 'x',
                columns: [
                    // ['x','Trump','Clinton'],
                    ['Money Raised', 1660904, 4515214]
                    // ['Campaign', .30, .200, .30, .200, .30, .200, .30, .200, .200, .30, .200, .30, .200, .30, .200, .30, .200, .200],
                    // ['PAC', .30, .200, .30, .200, .30, .200, .30, .200, .200, .30, .200, .30, .200, .30, .200, .30, .200, .200],
                    // ['SuperPac', .30, .200, .30, .200, .30, .200, .30, .200, .200, .30, .200, .30, .200, .30, .200, .30, .200, .200]
                ],
            type: 'bar',
            colors: {
            'Money Raised': function(d) {
                return (d.index == 0 || d.index == 2 || d.index == 4 || d.index == 6 || d.index == 8 || d.index == 10 || d.index == 12 || d.index == 14) ? '#3f88c5': '#A52129';
            }
          }
            // groups: [
            //     ['Independent', 'Campaign','PAC','SuperPac']
            // ]
            },

            legend: {
              show: false
            },
            axis: {
              rotated: false,
              y: {
                    min: 0,
                    padding: {bottom: 0},
                    tick: {
                     count: 4,
                     format: d3.format('$,.0f')
                    }
                },
                x: {
                    type: 'category',
                    categories: ['Bonoff','Paulsen']
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

              console.log(d)

              if (! text) {
                  title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                  text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
              }

              name = nameFormat(d[i].name);
              value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
              if (d[i].index == 0 || d[i].index == 2 || d[i].index == 4 || d[i].index == 6 || d[i].index == 8 || d[i].index == 10 || d[i].index == 12 || d[i].index == 14){
                bgcolor = "#3f88c5";
              } else {
                bgcolor = "#A52129";
              }

              // bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);

              text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
              text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
              text += "<td class='value'>" + value + "</td>";
              text += "</tr><tr>";
              text += "</tr>";
              
          }
          return text + "</table>";
      }
    }
});

var chartF4 = c3.generate({
      bindto: "#fChart4",
      padding: padding,
        data: {
                // x: 'x',
                columns: [
                    // ['x','Trump','Clinton'],
                    ['Money Raised', 866713, 53744]
                    // ['Campaign', .30, .200, .30, .200, .30, .200, .30, .200, .200, .30, .200, .30, .200, .30, .200, .30, .200, .200],
                    // ['PAC', .30, .200, .30, .200, .30, .200, .30, .200, .200, .30, .200, .30, .200, .30, .200, .30, .200, .200],
                    // ['SuperPac', .30, .200, .30, .200, .30, .200, .30, .200, .200, .30, .200, .30, .200, .30, .200, .30, .200, .200]
                ],
            type: 'bar',
            colors: {
            'Money Raised': function(d) {
                return (d.index == 0 || d.index == 2 || d.index == 4 || d.index == 6 || d.index == 8 || d.index == 10 || d.index == 12 || d.index == 14) ? '#3f88c5': '#A52129';
            }
          }
            // groups: [
            //     ['Independent', 'Campaign','PAC','SuperPac']
            // ]
            },

            legend: {
              show: false
            },
            axis: {
              rotated: false,
              y: {
                    min: 0,
                    padding: {bottom: 0},
                    tick: {
                     count: 4,
                     format: d3.format('$,.0f')
                    }
                },
                x: {
                    type: 'category',
                    categories: ['McCollum','Ryan']
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

              console.log(d)

              if (! text) {
                  title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                  text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
              }

              name = nameFormat(d[i].name);
              value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
              if (d[i].index == 0 || d[i].index == 2 || d[i].index == 4 || d[i].index == 6 || d[i].index == 8 || d[i].index == 10 || d[i].index == 12 || d[i].index == 14){
                bgcolor = "#3f88c5";
              } else {
                bgcolor = "#A52129";
              }

              // bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);

              text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
              text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
              text += "<td class='value'>" + value + "</td>";
              text += "</tr><tr>";
              text += "</tr>";
              
          }
          return text + "</table>";
      }
    }
});

var chartF5 = c3.generate({
      bindto: "#fChart5",
      padding: padding,
        data: {
                // x: 'x',
                columns: [
                    // ['x','Trump','Clinton'],
                    ['Money Raised', 2351470, 0]
                    // ['Campaign', .30, .200, .30, .200, .30, .200, .30, .200, .200, .30, .200, .30, .200, .30, .200, .30, .200, .200],
                    // ['PAC', .30, .200, .30, .200, .30, .200, .30, .200, .200, .30, .200, .30, .200, .30, .200, .30, .200, .200],
                    // ['SuperPac', .30, .200, .30, .200, .30, .200, .30, .200, .200, .30, .200, .30, .200, .30, .200, .30, .200, .200]
                ],
            type: 'bar',
            colors: {
            'Money Raised': function(d) {
                return (d.index == 0 || d.index == 2 || d.index == 4 || d.index == 6 || d.index == 8 || d.index == 10 || d.index == 12 || d.index == 14) ? '#3f88c5': '#A52129';
            }
          }
            // groups: [
            //     ['Independent', 'Campaign','PAC','SuperPac']
            // ]
            },

            legend: {
              show: false
            },
            axis: {
              rotated: false,
              y: {
                    min: 0,
                    padding: {bottom: 0},
                    tick: {
                     count: 4,
                     format: d3.format('$,.0f')
                    }
                },
                x: {
                    type: 'category',
                    categories: ['Ellison','Drake']
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

              console.log(d)

              if (! text) {
                  title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                  text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
              }

              name = nameFormat(d[i].name);
              value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
              if (d[i].index == 0 || d[i].index == 2 || d[i].index == 4 || d[i].index == 6 || d[i].index == 8 || d[i].index == 10 || d[i].index == 12 || d[i].index == 14){
                bgcolor = "#3f88c5";
              } else {
                bgcolor = "#A52129";
              }

              // bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);

              text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
              text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
              text += "<td class='value'>" + value + "</td>";
              text += "</tr><tr>";
              text += "</tr>";
              
          }
          return text + "</table>";
      }
    }
});

var chartF6 = c3.generate({
      bindto: "#fChart6",
      padding: padding,
        data: {
                // x: 'x',
                columns: [
                    // ['x','Trump','Clinton'],
                    ['Money Raised', 0, 1775298]
                    // ['Campaign', .30, .200, .30, .200, .30, .200, .30, .200, .200, .30, .200, .30, .200, .30, .200, .30, .200, .200],
                    // ['PAC', .30, .200, .30, .200, .30, .200, .30, .200, .200, .30, .200, .30, .200, .30, .200, .30, .200, .200],
                    // ['SuperPac', .30, .200, .30, .200, .30, .200, .30, .200, .200, .30, .200, .30, .200, .30, .200, .30, .200, .200]
                ],
            type: 'bar',
            colors: {
            'Money Raised': function(d) {
                return (d.index == 0 || d.index == 2 || d.index == 4 || d.index == 6 || d.index == 8 || d.index == 10 || d.index == 12 || d.index == 14) ? '#3f88c5': '#A52129';
            }
          }
            // groups: [
            //     ['Independent', 'Campaign','PAC','SuperPac']
            // ]
            },

            legend: {
              show: false
            },
            axis: {
              rotated: false,
              y: {
                    min: 0,
                    padding: {bottom: 0},
                    tick: {
                     count: 4,
                     format: d3.format('$,.0f')
                    }
                },
                x: {
                    type: 'category',
                    categories: ['Snyder','Emmer']
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

              console.log(d)

              if (! text) {
                  title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                  text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
              }

              name = nameFormat(d[i].name);
              value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
              if (d[i].index == 0 || d[i].index == 2 || d[i].index == 4 || d[i].index == 6 || d[i].index == 8 || d[i].index == 10 || d[i].index == 12 || d[i].index == 14){
                bgcolor = "#3f88c5";
              } else {
                bgcolor = "#A52129";
              }

              // bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);

              text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
              text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
              text += "<td class='value'>" + value + "</td>";
              text += "</tr><tr>";
              text += "</tr>";
              
          }
          return text + "</table>";
      }
    }
});

var chartF7 = c3.generate({
      bindto: "#fChart7",
      padding: padding,
        data: {
                // x: 'x',
                columns: [
                    // ['x','Trump','Clinton'],
                    ['Money Raised', 1127669, 17086]
                    // ['Campaign', .30, .200, .30, .200, .30, .200, .30, .200, .200, .30, .200, .30, .200, .30, .200, .30, .200, .200],
                    // ['PAC', .30, .200, .30, .200, .30, .200, .30, .200, .200, .30, .200, .30, .200, .30, .200, .30, .200, .200],
                    // ['SuperPac', .30, .200, .30, .200, .30, .200, .30, .200, .200, .30, .200, .30, .200, .30, .200, .30, .200, .200]
                ],
            type: 'bar',
            colors: {
            'Money Raised': function(d) {
                return (d.index == 0 || d.index == 2 || d.index == 4 || d.index == 6 || d.index == 8 || d.index == 10 || d.index == 12 || d.index == 14) ? '#3f88c5': '#A52129';
            }
          }
            // groups: [
            //     ['Independent', 'Campaign','PAC','SuperPac']
            // ]
            },

            legend: {
              show: false
            },
            axis: {
              rotated: false,
              y: {
                    min: 0,
                    padding: {bottom: 0},
                    tick: {
                     count: 4,
                     format: d3.format('$,.0f')
                    }
                },
                x: {
                    type: 'category',
                    categories: ['Peterson','Hughes']
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

              console.log(d)

              if (! text) {
                  title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                  text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
              }

              name = nameFormat(d[i].name);
              value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
              if (d[i].index == 0 || d[i].index == 2 || d[i].index == 4 || d[i].index == 6 || d[i].index == 8 || d[i].index == 10 || d[i].index == 12 || d[i].index == 14){
                bgcolor = "#3f88c5";
              } else {
                bgcolor = "#A52129";
              }

              // bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);

              text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
              text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
              text += "<td class='value'>" + value + "</td>";
              text += "</tr><tr>";
              text += "</tr>";
              
          }
          return text + "</table>";
      }
    }
});

var chartF8 = c3.generate({
      bindto: "#fChart8",
      padding: padding,
        data: {
                // x: 'x',
                columns: [
                    // ['x','Trump','Clinton'],
                    ['Money Raised', 2574298, 3286485]
                    // ['Campaign', .30, .200, .30, .200, .30, .200, .30, .200, .200, .30, .200, .30, .200, .30, .200, .30, .200, .200],
                    // ['PAC', .30, .200, .30, .200, .30, .200, .30, .200, .200, .30, .200, .30, .200, .30, .200, .30, .200, .200],
                    // ['SuperPac', .30, .200, .30, .200, .30, .200, .30, .200, .200, .30, .200, .30, .200, .30, .200, .30, .200, .200]
                ],
            type: 'bar',
            colors: {
            'Money Raised': function(d) {
                return (d.index == 0 || d.index == 2 || d.index == 4 || d.index == 6 || d.index == 8 || d.index == 10 || d.index == 12 || d.index == 14) ? '#3f88c5': '#A52129';
            }
          }
            // groups: [
            //     ['Independent', 'Campaign','PAC','SuperPac']
            // ]
            },

            legend: {
              show: false
            },
            axis: {
              rotated: false,
              y: {
                    min: 0,
                    padding: {bottom: 0},
                    tick: {
                     count: 4,
                     format: d3.format('$,.0f')
                    }
                },
                x: {
                    type: 'category',
                    categories: ['Nolan','Mills']
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

              console.log(d)

              if (! text) {
                  title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                  text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
              }

              name = nameFormat(d[i].name);
              value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
              if (d[i].index == 0 || d[i].index == 2 || d[i].index == 4 || d[i].index == 6 || d[i].index == 8 || d[i].index == 10 || d[i].index == 12 || d[i].index == 14){
                bgcolor = "#3f88c5";
              } else {
                bgcolor = "#A52129";
              }

              // bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);

              text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
              text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
              text += "<td class='value'>" + value + "</td>";
              text += "</tr><tr>";
              text += "</tr>";
              
          }
          return text + "</table>";
      }
    }
});
}

chartF();

mapBuild("#mapFull", "#infobox", "#chart", "us_congress.json", "house", "us", data, 0);
mapBuild("#mnmap", "#infobox", "#chart", "us_cd_mn_2012.json", "state", "mnBig", data, 0);

var aspect = 650 / 400, chart = $("#mapFull svg");
  var targetWidth = chart.parent().width();
  chart.attr("width", targetWidth);
  chart.attr("height", targetWidth / aspect);

// var aspect = 430 / 600, chart2 = $("#mnmap svg");
//   var targetWidth = chart2.parent().width();
//   chart2.attr("width", targetWidth);
//   chart2.attr("height", targetWidth / aspect);
  
});
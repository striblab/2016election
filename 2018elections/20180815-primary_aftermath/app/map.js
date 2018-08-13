import 'intersection-observer';
import * as d3 from 'd3';
import * as topojson from "topojson";
import us from '../sources/mnpct-small.json';
import mn from '../sources/mncd.json';
import mncounties from '../sources/counties.json';

import gov from '../sources/gov.json';
import ag from '../sources/ag.json';
import sen from '../sources/sen.json';
import cd1 from '../sources/cd1.json';
import cd5 from '../sources/cd5.json';
import cd8 from '../sources/cd8.json';


class Map {

  constructor(target) {
    this.target = target;
    this.svg = d3.select(target + ' svg').attr('width', $(target).outerWidth()).attr('height', $(target).outerHeight());
    this.g = this.svg.append('g');
    this.zoomed = false;
    this.scaled = $(target).width()/520;
    this.colorScale = d3.scaleOrdinal()
      .domain(['d1', 'd2', 'd3', 'd4', 'r1', 'r2', 'r3', 'r4'])
      .range(['#82BAE0','#B9EE7D','#CE91E9','#9084C3','#EB6868','#F9F37C','#FBA363','#C95B99']);

  }

  /********** PRIVATE METHODS **********/

  // Detect if the viewport is mobile or desktop, can be tweaked if necessary for anything in between
  _detect_mobile() {
    var winsize = $(window).width();

    if (winsize < 600) {
      return true;
    } else {
      return false;
    }
  }

  _clickmn(district) {
      //D3 CLICKY MAP BINDINGS
      jQuery.fn.d3Click = function () {
        this.each(function (i, e) {
          var evt = document.createEvent('MouseEvents');
          evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

          e.dispatchEvent(evt);
          return false;
        });
      };

      jQuery.fn.d3Down = function () {
        this.each(function (i, e) {
          var evt = document.createEvent('MouseEvents');
          evt.initMouseEvent('mousedown', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

          e.dispatchEvent(evt);
          return false;
        });
      };

      jQuery.fn.d3Up = function () {
        this.each(function (i, e) {
          var evt = document.createEvent('MouseEvents');
          evt.initMouseEvent('mouseup', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

          e.dispatchEvent(evt);
          return false;
        });
      };


      // Your mouse clicks are actually three events, which are simulated here to auto-zoom the map on a given id of a map path object
      $("[id='" + district + "']").d3Down();
      $("[id='" + district + "']").d3Up();
      $("[id='" + district + "']").d3Click();

  }

  _populate_colors(filtered, magnify, party, geo, race) {
    var self = this;

    var data;

    if (race == 'gov') { data = gov.results; }
    else if (race == 'ag') { data = ag.results; }
    else if (race == 'sen') { data = sen.results; }
    else if (race == '1') { data = cd1.results; }
    else if (race == '5') { data = cd5.results; }
    else if (race == '8') { data = cd8.results; }

    var index = Number(filtered);

    if (filtered != "all") {
      $(".district").addClass("faded");
      $(".county").addClass("hidden");
      $("." + filtered).removeClass("faded");
      $(".CD1, .CD2, .CD3, .CD4, .CD5, .CD6, .CD7, .CD8").addClass("infocus");
      $(".district").removeClass("hidden");
      $("#P" + race).addClass("hidden");
    } else {
      $(".CD1, .CD2, .CD3, .CD4, .CD5, .CD6, .CD7, .CD8").removeClass("infocus");
      $(".CD1, .CD2, .CD3, .CD4, .CD5, .CD6, .CD7, .CD8").removeClass("hidden");
      $(".district").addClass("hidden");
      // $(".county").addClass("hidden");
    }

    //RENDER CANDIDATE KEYS

    var candidate1 = "";
    var candidate2 = "";
    var candidate3 = "";
    var candidate4 = "";

    if (party == "GOP") {
       candidate1 = "<div class='resultRow topRow'><div class='name'><span class='key_legend' style='background-color:" + self.colorScale("r1") + ";'></span>&nbsp;" + data[0].r1_name + "</div><div class='percent'>" + d3.format(".1f")(data[0].r1) + "%</div></div>";
       if (data[0].r2_name != null) { candidate2 = "<div class='resultRow'><div class='name'><span class='key_legend' style='background-color:" + self.colorScale("r2") + ";'></span>&nbsp;" + data[0].r2_name + "</div><div class='percent'>" + d3.format(".1f")(data[0].r2) + "%</div></div>"; }
       if (data[0].r3_name != null) { candidate3 = "<div class='resultRow'><div class='name'><span class='key_legend' style='background-color:" + self.colorScale("r3") + ";'></span>&nbsp;" + data[0].r3_name + "</div><div class='percent'>" + d3.format(".1f")(data[0].r3) + "%</div></div>"; }
       if (data[0].r4_name != null) { candidate4 = "<div class='resultRow'><div class='name'><span class='legendary' style='background-color:" + self.colorScale("r4") + ";'></span>&nbsp;" + data[0].r4_name + "</div><div class='percent'>" + d3.format(".1f")(data[0].r4) + "%</div></div>"; }     
    } else if (party == "DFL") {
       candidate1 = "<div class='resultRow topRow'><div class='name'><span class='key_legend' style='background-color:" + self.colorScale("d1") + ";'></span>&nbsp;" + data[0].d1_name + "</div><div class='percent'>" + data[0].d1 + "%</div></div>";
       if (data[0].d2_name != null) { candidate2 = "<div class='resultRow'><div class='name'><span class='key_legend' style='background-color:" + self.colorScale("d2") + ";'></span>&nbsp;" + data[0].d2_name + "</div><div class='percent'>" + d3.format(".1f")(data[0].d2) + "%</div></div>"; }
       if (data[0].d3_name != null) { candidate3 = "<div class='resultRow'><div class='name'><span class='key_legend' style='background-color:" + self.colorScale("d3") + ";'></span>&nbsp;" + data[0].d3_name + "</div><div class='percent'>" + d3.format(".1f")(data[0].d3) + "%</div></div>"; }
       if (data[0].d4_name != null) { candidate4 = "<div class='resultRow'><div class='name'><span class='key_legend' style='background-color:" + self.colorScale("d4") + ";'></span>&nbsp;" + data[0].d4_name + "</div><div class='percent'>" + d3.format(".1f")(data[0].d4) + "%</div></div>"; }     
    }

    $(self.target + ' .key').html(candidate1 + candidate2 + candidate3 + candidate4);

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

    this.g.selectAll('.precincts path')
        .call(d3.helper.tooltip(function(d, i){
          var candidates = [];
          for (var i = 0; i < data.length; i++) {
            if (data[i].VTDID == Number('27' + d.properties.COUNTYCODE + '5' + d.properties.PCTCODE)) {
                if (party == 'DFL') { 
                  candidates.push([data[i].d1_name, data[i].d1, self.colorScale(data[i].dWin)]);
                  candidates.push([data[i].d2_name, data[i].d2, self.colorScale(data[i].dWin)]);
                  candidates.push([data[i].d3_name, data[i].d3, self.colorScale(data[i].dWin)]);
                  candidates.push([data[i].d4_name, data[i].d4, self.colorScale(data[i].dWin)]);
                }
                else if (party == 'GOP') { 
                  candidates.push([data[i].r1_name, data[i].r1, self.colorScale(data[i].rWin)]);
                  candidates.push([data[i].r2_name, data[i].r2, self.colorScale(data[i].rWin)]);
                  candidates.push([data[i].r3_name, data[i].r3, self.colorScale(data[i].rWin)]);
                  candidates.push([data[i].r4_name, data[i].r4, self.colorScale(data[i].rWin)]);
                }

              function sortCandidates(a, b) {
                  if (a[1] === b[1]) {
                      return 0;
                  }
                  else {
                      return (a[1] > b[1]) ? -1 : 1;
                  }
              }

                candidates.sort(sortCandidates);

                return d.properties.PCTNAME + "<div>" + candidates[0][0] + " with <span class='legendary' style='background-color:" + candidates[0][2] + "'>" + d3.format(".1f")(candidates[0][1]) + "%</span></div>";
            }
          }
            return d.properties.PCTNAME + "<div>No results</div>";
         }))
      .transition()
      .duration(600)
      .style('fill', function(d) {
          var winner = '';
          var margin = '';
          
          for (var i = 0; i < data.length; i++) {
            if (data[i].VTDID == Number('27' + d.properties.COUNTYCODE + '5' + d.properties.PCTCODE)) {
                if (party == 'DFL') { 
                  winner = self.colorScale(data[i].dWin);
                  margin = data[i].dMargin;
                }
                else if (party == 'GOP') { 
                  winner = self.colorScale(data[i].rWin); 
                  margin = data[i].rMargin;
                }
                var colorIntensity = d3.scaleLinear().domain([30, 100]).range(['#DDDDDD', winner]);
                return colorIntensity(margin);
            }
          }
              return '#dddddd';
        });

    if (magnify == "metro") {
      self._clickmn("P5");
    }

  }

  /********** PUBLIC METHODS **********/

  // Render the map
  render(filtered, magnify, party, geo, race) {
    var self = this;

    var projection = d3.geoAlbers().scale(5037).translate([50, 970]);

    var width  = 520;
    var height = 600;
    var centered;

    var path = d3.geoPath(projection);

    var states = topojson.feature(us, us.objects.convert);
    var state = states.features.filter(function(d) { return d.properties.CONGDIST == filtered; })[0];

    var b = path.bounds(state),
    s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
    t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

    // var svg = d3.select(target + " svg").attr("width", width).attr("height", height);
    // var g = svg.append("g");


    // self._render_legend();

    // Only fire resize events in the event of a width change because it prevents
    // an awful mobile Safari bug and developer rage blackouts.
    // https://stackoverflow.com/questions/9361968/javascript-resize-event-on-scroll-mobile
    var cachedWidth = window.innerWidth;
    d3.select(window).on('resize', function() {
      var newWidth = window.innerWidth;
      if(newWidth !== cachedWidth) {
        cachedWidth = newWidth;
      }
    });

    //City labels
    var marks = [{long:-93.266667, lat:44.983333, name:"Minneapolis"}, 
    {long:-92.100485, lat:46.786672, name:"Duluth"},
    {long:-95.918889, lat:45.591944, name:"Morris"},
    {long:-93.999400, lat:44.163578, name:"Mankato"},
    {long:-92.480199, lat:44.012122, name:"Rochester"},
    {long:-94.882686, lat:47.471573, name:"Bemidji"},
    {long:-94.202008, lat:46.352673, name:"Brainerd"},
    {long:-96.767804, lat:46.873765, name:"Moorhead"},
    {long:-92.5338, lat:44.5625, name:"Red Wing"},
    {long:-94.1642, lat:45.5616, name:"St. Cloud"},
    {long:-95.7884, lat:44.4469, name:"Marshall"}];


    //Draw precincts
    self.g.append('g')
        .attr('class', 'precincts')
      .selectAll('path')
      .data((topojson.feature(us, us.objects.convert).features).filter(function(d) {
        if (filtered != "all") { return d.properties.CONGDIST == race;  }
        else { return d.properties.CONGDIST != 'blarg'; }
     }))
      .enter().append('path')
        .attr('d', path)
        .attr('class', function(d) { return 'precinct CD' + d.properties.CONGDIST; })
        .attr('id', function(d) { return 'P' + d.properties.VTDID; } )
        .style('stroke-width', '0.3px')
        .style('fill', '#dddddd')
        .on('mouseover', function(d) {
          
        })
        .on('click', function(d) { 
          if (race != "5") { clicked(d, 9); }
        });

    //Draw congressional districts
    self.g.append('g')
        .attr('class', 'districts')
      .selectAll('path')
      .data(topojson.feature(mn, mn.objects.mncd).features)
      .enter().append('path')
        .attr('d', path)
        .attr('class', function(d) { return 'district CD' + d.properties.DISTRICT; })
        .attr('id', function(d) { return 'P' + d.properties.DISTRICT; } )
        .style('stroke-width', '1px')
        .on('mousedown', function(d) { })
        .on('click', function(d) { 
          if (d.properties.DISTRICT == "5") {
            clicked(d, 23);
            $(".CD1, .CD2, .CD3, .CD4, .CD5, .CD6, .CD7, .CD8").addClass("infocus");
            $("#P" + d.properties.DISTRICT).addClass("hidden");
          } else {
            if (race != "5") { clicked(d, 9); }
          }
        });


    //Draw county borders
    self.g.append('g')
        .attr('class', 'counties')
        .selectAll('path')
        .data(topojson.feature(mncounties, mncounties.objects.counties).features)
        .enter().append('path')
        .attr("class","county")
        .attr('d', path)
        .attr('fill', 'none')
        .attr('stroke-width', '1px');

    //Draw city labels
      self.svg.selectAll("circle")
        .data(marks)
        .enter()
        .append("circle")
        .attr('class','mark')
        .attr('width', 3)
        .attr('height', 3)
        .attr("r", "1.3px")
        .attr("fill", "#333")
        .attr("transform", function(d) {return "translate(" + projection([d.long,d.lat]) + ")";});

        self.g.selectAll("text")
          .data(marks)
          .enter()
          .append("text")
          .attr('class','city-label')
          .attr("transform", function(d) {return "translate(" + projection([d.long+0.05,d.lat-0.03]) + ")";})
          .text(function(d) { return " " + d.name; });

    function clicked(d, k) {
      var x, y, stroke;

      // if (d && centered !== d) {
        var centroid = path.centroid(d);
        x = centroid[0];
        y = centroid[1];
        centered = d;
        stroke = 0.2;
        $(self.target + ' .reset').show();
      // } 
      // else {
      //   x = width / 2;
      //   y = height / 2;
      //   k = 1;
      //   centered = null;
      //   stroke = 1.5;
      //   $(self.target + ' .reset').hide();
      // }

      $(".city-label").addClass("hidden");
      $(".mark").addClass("hidden");

      self.g.transition()
          .duration(300)
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')')
          .style('stroke-width', '0.2px');

          
          $('.reset').on('click', function(event){
            x = width / 2;
            y = height / 2;
            k = 1;
            centered = null;
            $(this).hide();
            stroke = 1.5;
            // self.g.selectAll('path')
            //     .classed('active', centered && function(d) { return d === centered; });
            self.g.transition()
                .duration(300)
                .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')')
                .style('stroke-width', stroke / k + 'px');
              event.stopPropagation();

            setTimeout(function(){ 
              // $(".CD1, .CD2, .CD3, .CD4, .CD5, .CD6, .CD7, .CD8").removeClass("infocus");
              // $(".district").removeClass("hidden");
              $(".city-label").removeClass("hidden");
              $(".mark").removeClass("hidden"); },400);
           });

    }


    var aspect = 520 / 600, chart = $(self.target + ' svg');
      var targetWidth = chart.parent().width();
      chart.attr('width', targetWidth);
      chart.attr('height', targetWidth / aspect);
      if ($(window).width() <= 520) { $(self.target + ' svg').attr('viewBox','0 0 500 600'); }

    $(window).on('resize', function() {
      targetWidth = chart.parent().width();
      chart.attr('width', targetWidth);
      chart.attr('height', targetWidth / aspect);
    });

    //COLOR THE MAP
    self._populate_colors(filtered, magnify, party, geo, race);

    $(".sort-link").on("click", function(event){
      event.stopPropagation();
      $("#districtList").toggle();
      $("#focus").html($(this).html());
      $(".directions").toggle();
      self._populate_colors($(this).attr("filtered"), $(this).attr("magnify"), $(this).attr("party"), $(this).attr("geo"), $(this).attr("race"));
      return 0;
    });

  }
}

export { Map as default }
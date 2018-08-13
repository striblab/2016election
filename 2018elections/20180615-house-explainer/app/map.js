import * as d3 from 'd3';
import * as topojson from "topojson";
import us from '../sources/districts-albers-d3.json';

const COLOR_SCALE = d3.scaleOrdinal()
  .domain(['GOP', 'DEM'])
  .range(['#C0272D', '#0258A0']);

class Map {

  constructor(target) {
    this.target = target;
    this.svg = d3.select(target + " svg").attr("width", $(target).outerWidth()).attr("height", $(target).outerHeight());
    this.g = this.svg.append("g");
    this.zoomed = false;
    this.scaled = $(target).width()/960;
  }

  /********** PRIVATE METHODS **********/

  // Helper method to get the ordinal suffix of a number
  _get_ordinal_suffix_of(i) {
     var j = i % 10,
         k = i % 100;
     if (j == 1 && k != 11) {
         return i + "st";
     }
     if (j == 2 && k != 12) {
         return i + "nd";
     }
     if (j == 3 && k != 13) {
         return i + "rd";
     }
     return i + "th";
 }

  // Detect if the viewport is mobile or desktop, can be tweaked if necessary for anything in between
  _detect_mobile() {
    var winsize = $(window).width();

    if (winsize < 800) {
      return true;
    } else {
      return false;
    }
  }

  _render_legend() {
    var self = this;

    var legend = self.g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(COLOR_SCALE.domain())
      .enter().append("g")
      .attr("transform", function(d, i) {
        return "translate(0," + i * 20 + ")";
      });

    //append legend colour blocks
    legend.append("rect")
      .attr("x", 900 - 400)
      .attr("y", 500 - 50)
      .attr("width", 19)
      .attr("height", 19)
      .attr('fill', function(d) {
          return COLOR_SCALE(d);
      });

    //append legend texts
    legend.append("text")
      .attr("x", 900 - 260)
      .attr("y", 500 - 40)
      .attr("dy", "0.32em")
      .text(function(d) {
        if (d == 'GOP') {
          return 'Republican-controlled seat'
        }
        if (d == 'DEM') {
          return 'Democratic-controlled seat'
        }
      });
  }

  // The zooming out interaction
  _zoom_out(viewport, d, path) {
    var x, y, k;
    var centered;
    var width = this.svg.attr('width');
    var height = this.svg.attr('height');

    if (!viewport) {
      x = width / 2;
      y = height / 2;
      k = this.scaled;
      centered = null;
    } else {
      var centroid = path.centroid(d);
      k = this.scaled;
      centered = d;
      console.log(x + " " + y);
      console.log(width + " " + height);
    }

    // Zoom using transitions
    this.g.transition()
      .duration(300)
      .attr("transform", "scale(" + k + ")")

      this.zoomed = false;
  }

  // The zooming in interaction
  _zoom_to_mn(viewport, d, path) {
    var x, y, k;
    var centered;
    var width = this.svg.attr('width');
    var height = this.svg.attr('height');

   if (d && centered !== d) {
     var centroid = path.centroid(d);
     x = centroid[0];
     y = centroid[1];
     if (viewport) { k = 3.3; }
     else { k = 4; }
     centered = d;
   } else {
     x = width / 2;
     y = height / 2;
     if (viewport) { k = 3.3; }
     else { k = 4; }
     centered = null;
   }

    // Zoom using transitions
    this.g.transition()
      .duration(300)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")

    // Make the lines skinny for consistency on zoom
    this.g.selectAll('path')
      .style("stroke-width", '0.2')

    this.zoomed = true;
  }

  // Simulate a clicky map interaction on Minnesota instead of calling the zoom functions directly
  _clickmn(district) {
      //D3 CLICKY MAP BINDINGS
      jQuery.fn.d3Click = function () {
        this.each(function (i, e) {
          var evt = document.createEvent("MouseEvents");
          evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

          e.dispatchEvent(evt);
          return false;
        });
      };

      jQuery.fn.d3Down = function () {
        this.each(function (i, e) {
          var evt = document.createEvent("MouseEvents");
          evt.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

          e.dispatchEvent(evt);
          return false;
        });
      };

      jQuery.fn.d3Up = function () {
        this.each(function (i, e) {
          var evt = document.createEvent("MouseEvents");
          evt.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

          e.dispatchEvent(evt);
          return false;
        });
      };


      // Your mouse clicks are actually three events, which are simulated here to auto-zoom the map on a given id of a map path object
      $("[id='" + district + "']").d3Down();
      $("[id='" + district + "']").d3Up();
      $("[id='" + district + "']").d3Click();

  }


  // Simulate a clicky map interaction on the nation's center instead of calling the zoom functions directly
  _clickus(district) {
      //D3 CLICKY MAP BINDINGS
      jQuery.fn.d3Mouse = function () {
        this.each(function (i, e) {
          var evt = document.createEvent("MouseEvents");
          evt.initMouseEvent("mouseover", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

          e.dispatchEvent(evt);
          return false;
        });
      };

      // Your mouse clicks are actually three events, which are simulated here to auto-zoom the map on a given id of a map path object
      $("[id='" + district + "']").d3Mouse();

  }

  _reset_colors() {
    // Resets colors to no fill
    this.g.selectAll('.districts path')
      .transition()
      .style("fill", '#DCDCDC')
  }

  _reset_opacity() {
    // Resets colors to no fill
    this.g.selectAll('.districts path')
      .transition()
      .duration(0)
      .style("opacity", '1')
  }

  _trigger_district_labels(opacity) {
    // Sets opacity to hide or reveal district labels
    this.g.selectAll('.district-label')
      .style("opacity", opacity)
  }

  _trigger_cpvi_labels(opacity) {
    // Sets opacity to hide or reveal district labels
    this.g.selectAll('.cpvi-label')
      .style("opacity", opacity)
  }

  _color_districts(filter, color_scale) {
    // Changes the colors of districts based on a list of GEOIDs and a given color
    this.g.selectAll('.districts path')
      // Quick proxy for competitive races. Swap this out.
      .filter(function(d){ return filter(d);})
      .transition()
      .style("fill", function(d) {
        return color_scale(d.properties.party);
      });
  }

  _flash_districts(filter) {
    var self = this;
    // Flash on
    this.g.selectAll('.districts path')
      .filter(function(d){ return filter(d);})
      .transition()
        .duration(400)
        .style("opacity", '0.5')
      .transition()
        .duration(400)
        .style("opacity", '1');
  }

  /********** PUBLIC METHODS **********/

  // First step in scroller. Highlight competitive districts.
  do_step_1() {
    var self = this;

    // God what have I done
    function filter_func(d) {
      return (d.properties.compete == 1);
    }

    self._color_districts(filter_func, COLOR_SCALE);
  }

  // Undo first step and reset map
  undo_step_1() {
    var self = this;
    self._reset_colors();

    // Always hide labels at this step
    self._trigger_district_labels(0);
    self._trigger_cpvi_labels(0);
  }

  // Second step in scroller. Show tossups.
  do_step_2() {
    var self = this;
    self._reset_colors();

    // God what have I done
    function filter_func(d) {
      return (d.properties.tossup == 1);
    }

    self._color_districts(filter_func, COLOR_SCALE);
  }

  // Undo second step
  undo_step_2() {
    var self = this;
    self.do_step_1();
  }

  // Third step in scroller. Zoom to MN.
  do_step_3() {
    var self = this;
    self._reset_colors();
    self._clickmn('S27'); //zoom on MN

    function filter_func(d) {
      return (d.properties.tossup == 1 && d.properties.statePostal =='MN');
    }

    self._color_districts(filter_func, COLOR_SCALE);
    self._trigger_district_labels(1);
  }

  // Undo third step. Zoom out to nation.
  undo_step_3() {
    var self = this;
    self._reset_opacity();
    self._trigger_district_labels(0);
    self._clickus('NATION');
    self.do_step_2();
  }

  // Fourth step in scroller. Flash democratic districts.
  do_step_4() {
    var self = this;
    function filter_func(d) {
      return (['2701', '2708'].indexOf(d.properties.GEOID) >= 0);
    }
    self._flash_districts(filter_func, '#0258A0');
  }

  // Flash them again on undo.
  undo_step_4() {
    var self = this;
    self.do_step_4();
  }

  // Last step in scroller. Flash Republican districts.
  do_step_5() {
    var self = this;
    function filter_func(d) {
      return (['2702', '2703'].indexOf(d.properties.GEOID) >= 0);
    }
    self._flash_districts(filter_func, '#C0272D');
  }

  // Flash again
  undo_step_5() {
    var self = this;
    self.do_step_5();
  }

  destroy() {
    console.log('destroy!');
    this.svg.selectAll('g.states').remove();
    this.svg.selectAll('g.districts').remove();
    this.svg.selectAll('g.nation-border').remove();
    this.svg.selectAll('text.district-label').remove();
  }

  // Render the map
  render() {
    var self = this;

    var path = d3.geoPath();

    // self._render_legend();

    // Only fire resize events in the event of a width change because it prevents
    // an awful mobile Safari bug and developer rage blackouts.
    // https://stackoverflow.com/questions/9361968/javascript-resize-event-on-scroll-mobile
    var cachedWidth = window.innerWidth;
    d3.select(window).on("resize", function() {
      var newWidth = window.innerWidth;
      if(newWidth !== cachedWidth) {
        sizeChange();
        cachedWidth = newWidth;
      }
    });

    // Draw the state boundaries separately, for targeting purposes
    self.g.append("g")
        .attr("class", "states")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .enter().append("path")
        .attr("d", path)
        .attr("id", function(d) { return "S" + d.properties.STATEFP; } )
        .style("stroke-width", '0')
        .on("click", function(d) {
          self._zoom_to_mn(self._detect_mobile(), d, path);
        });

    // Draw the districts based on topojson in ../sources/districts-albers-d3.json
    self.g.append("g")
        .attr("class", "districts")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.districts).features)
      .enter().append("path")
        .attr("d", path)
        .attr("id", function(d) { return d.properties.statePostal + "" + d.properties.GEOID; } )
        .style("stroke-width", '0.2');


    // Draw the national boundary separately because district mesh doesn't include it
    self.g.append("g")
        .attr("class", "nation-border")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.nation).features)
      .enter().append("path")
        .attr("d", path)
        .attr("id", "NATION")
        .on("mouseover", function(d) {
          self._zoom_out(self._detect_mobile(), d, path);
        });


    // Draws district labels, present but invisible
    self.g.selectAll("text")
        .data(topojson.feature(us, us.objects.districts).features)
        .enter()
        .append("svg:text")
        .text(function(d){
          if (d.properties.tossup == 1 && d.properties.STATEFP == "27") {
            var label = d.properties.CD115FP;
            if (label == '08') {
              label = '8th District';
            } else {
              label = self._get_ordinal_suffix_of(label.replace(/^0+/, ''));
            }
            return label;
          }
        })
        .attr("x", function(d){
            return path.centroid(d)[0] - 0.8;
        })
        .attr("y", function(d){
            return  path.centroid(d)[1] + 1.3;
        })
        .attr("class", "district-label")
        .attr("text-anchor", "middle")
        .style("fill", "#ffffff")
        .attr("font-weight", "bold")
        .style("opacity", 0)
        .attr("font-size", "2pt");


    // Draws CPVI labels, present but invisible
    self.g.selectAll("text")
        .data(topojson.feature(us, us.objects.districts).features)
        .enter()
        .append("svg:text")
        .text(function(d){
          if (d.properties.tossup == 1) {
            if (d.properties.cpvi < 0) { return "D+" (d.properties.cpvi * -1); }
            else if (d.properties.cpvi > 0) { return "R+" + d.properties.cpvi; }
            else if (d.properties.cpvi == 0) { return "EVEN"; }
          }
        })
        .attr("x", function(d){
            return path.centroid(d)[0];
        })
        .attr("y", function(d){
            return  path.centroid(d)[1];
        })
        .attr("class", "cpvi-label")
        .attr("text-anchor", "middle")
        .style("fill", "#ffffff")
        .style("opacity", 0)
        .attr("font-size", "2pt");

    function sizeChange() {
      d3.select("g").attr("transform", "scale(" + $(self.target).width()/960 + ")");
      $("#map-zoomer svg").height($("#map-zoomer svg").width()*0.618);
    }

    sizeChange();

  }
}

export { Map as default }

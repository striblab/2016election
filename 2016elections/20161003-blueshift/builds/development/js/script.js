(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

$(".step").click(function() {
$(".step").removeClass("selected");
$(this).addClass("selected");
});

$(".num").hover(function() {
$(".num").removeClass("thisThing");
$(".cartoState").removeClass("thisThing");
$("#" + $(this).attr("data")).addClass("thisThing");
});

$(".cartoState").hover(function() {
$(".cartoState").removeClass("thisThing");
$(".num").removeClass("thisThing");
$(".num[data='" + $(this).attr("id") + "']").addClass("thisThing");
});

$("#cartogram, #legendMain").mouseout(function() {
$(".cartoState").removeClass("thisThing");
$(".num").removeClass("thisThing");
});


//   var data = dataLoad.power_index;
//   var dataC = dataLoadC.mncd_chatter;

// $("#history").show();
// $(".chatterHead").html(dataC[0].headline);
// $(".chatter").html(dataC[0].chatter);

// $(".step").click(function() {
// $(".step").removeClass("selected");
// $(this).addClass("selected");
// $(".slide").hide();
// $("#" + $(this).attr("data")).show();
// $(".chatterHead").html(dataC[$(this).attr("index")].headline);
// $(".chatter").html(dataC[$(this).attr("index")].chatter);
// });

//ELECTORAL HISTORY
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
            ['x',1860,1864,1868,1872,1876,1880,1884,1888,1892,1896,1900,1904,1908,1912,1916,1920,1924,1928,1932,1936,1940,1944,1948,1952,1956,1960,1964,1968,1972,1976,1980,1984,1988,1992,1996,2000,2004,2008,2012,2016],
            ['DEM Win',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,11,11,11,11,11,null,null,11,10,10,null,10,10,10,10,10,10,10,10,10,10,10],
            ['GOP Win',4,4,4,5,5,5,7,7,9,9,9,11,11,null,12,12,12,12,null,null,null,null,null,11,11,null,null,null,10,null,null,null,null,null,null,null,null,null,null,null],
            ['PROG Win',null,null,null,null,null,null,null,null,null,null,null,null,null,12,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
        ],
        type: 'line'
    },
    color:  {  pattern: ["#3F88C5","#A52129","#3EC704"] },
    axis: {
      y: {
            min: 0,
            label: 'Minnesota Electoral Votes',
            padding: {bottom: 0},
            tick: {
             count: 4,
             format: d3.format('.0f')
            }
        },
        x: {
            tick: {
                values: ['1860', '1900', '1948', '1972', '2016'],
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
                {value: 218, text: '', position: 'start', class:'powerline'}
          ]

        },
        x: {
            lines: [
                {value: 1912, text: 'Teddy Roosevelt Bid', position: 'start', class:'fadeline'},
                {value: 1952, text: 'Eisenhower Landslide', position: 'start', class:'fadeline'},
                {value: 1956, text: 'Eisenhower Landslide', position: 'start', class:'fadeline'},
                {value: 1972, text: 'Nixon Landslide', position: 'start', class:'fadeline'},
                {value: 1980, text: 'Reagan Landslide', position: 'start', class:'fadeline'},
                {value: 1984, text: 'Reagan Landslide', position: 'start', class:'fadeline'}
            ]
        }
    }
});
}

chartBuilder();

//PVI HISTORY
function chartPVI(){
var  padding = {
        top: 20,
        right: 40,
        bottom: 20,
        left: 60,
    };

var chartH = c3.generate({
        bindto: '#chartH',
        padding: padding,
    data: {
        x: 'x',
        columns: [
            ['x',1982,1986,1990,1994,1998,2002,2006,2010,2014,2018],
            // ['MN DEM Vote %',0.549,0.465,0.497,0.529,0.435,0.511,0.479,0.511,0.541,0.527],
            // // ['MN GOP Vote %',0.420,0.425,0.495,0.459,0.319,0.350,0.455,0.477,0.438,0.450],
            // ['National DEM Vote %',0.501,0.410,0.406,0.457,0.430,0.492,0.484,0.482,0.529,0.51]
            // ['Minnesota PVI Score',5.15,7.3,8.15,3.85,1.2,0.7,1.2,2.05,1.45]
            ['Minnesota PVI',7,8,8,6,4,3,2,2,2,1]
        ],
        type: 'area'
    },
    point: {
            show: false
        },
    color:  {  pattern: ["#3F88C5"] },
    axis: {
      y: {
            // max: 1,
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
                values: [1982, 1990, 1998, 2006, 2014],
                count: 5,
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
},{}]},{},[1])
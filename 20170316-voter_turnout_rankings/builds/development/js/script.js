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
}

var aspect = 550 / 400, chart = $("#map svg");
$(window).on("resize", function() {   
  var targetWidth = chart.parent().width();   
  chart.attr("width", targetWidth);   
  chart.attr("height", targetWidth / aspect);
});

$(window).on("load", function() {   
  var targetWidth = chart.parent().width();   
  chart.attr("width", targetWidth);   
  chart.attr("height", targetWidth / aspect);
});

//NATIONAL TURNOUT OVER TIME

function chartNational(){

d3.csv("./data/nationalFinal.csv", function(d) {
  return {
    year: +d.year,
    turnout: +d.turnout
  };
}, function(error, rows) {

var dataT = rows;

var x = [];
var turnout = [];

x[0] = "x";
turnout[0] = "Voter Turnout";
// gop[0] = "DFL Vote %";
// dfl[0] = "GOP Vote %";

for (var i=1; i <= dataT.length; i++){
  x[i] = dataT[i-1].year;
  turnout[i] = dataT[i-1].turnout;
}

var  padding = {
        top: 20,
        right: 60,
        bottom: 20,
        left: 60,
    };

var chartT = c3.generate({
      bindto: "#chartNational",
      padding: padding,
      data: {
            x: 'x',
            columns: [
                x,
                turnout
            ],
        types: {
          'Voter Turnout':'line'
         }
        },        
        color: {
              pattern: ['#333']
            },
        axis: {
              y: {
                    max: 1,
                    min: 0,
                    padding: {bottom: 0, top: 0},
                    tick: {
                     count: 4,
                     format: d3.format('%')
                    }
                },
            x: {
                 tick: {
                     values: [1972,1980,1988,1996,2016],
                     count: 5
                }
            }
        }
});

});

}

chartNational();

//STATE RANKINGS

function chartStates(){

d3.csv("./data/stateRankings.csv", function(d) {
  return {
    state: d.ab,
    turnout: +d.turnout
  };
}, function(error, rows) {

var dataT = rows;

var x = [];
var turnout = [];

x[0] = "x";
turnout[0] = "2016 Turnout";

for (var i=1; i <= dataT.length; i++){
  x[i] = dataT[i-1].state;
  turnout[i] = dataT[i-1].turnout;
}

var  padding = {
        top: 20,
        right: 60,
        bottom: 20,
        left: 60,
    };

var chartT = c3.generate({
      bindto: "#chartStates",
      padding: padding,
      data: {
            x: 'x',
            columns: [
                x,
                turnout
            ],
        types: {
          '2016 Turnout':'bar'
         },
         colors: {
              '2016 Turnout': function(d) { 
              if (d.index == 0 || d.index == 1 || d.index == 2 || d.index == 3 || d.index == 4 || d.index == 5 || d.index == 8 || d.index == 14 || d.index == 15 || d.index == 18 || d.index == 22 || d.index == 24 || d.index == 25 || d.index == 27) { return "#A270A7"; }
              else { return "#333"; }
          }
            }
        },
        // legend: {
        //     show: false
        // },
        color:{
          pattern: ["#333","#aaa"]
        },
        axis: {
              rotated: true,
              y: {
                    max: 1,
                    min: 0,
                    padding: {bottom: 0, top: 0},
                    tick: {
                     count: 4,
                     format: d3.format('%')
                    }
                },
            x: {
                type: 'category'
                //  tick: {
                //      values: [1950,1965,1980,1996,2012],
                //      count: 5
                // }
            }
        }
});

});

}

chartStates();

//MN TURNOUT OVER TIME

function chartMNTurnout(){

d3.csv("./data/mnTurnout.csv", function(d) {
  return {
    year: +d.year,
    turnout: +d.turnout
  };
}, function(error, rows) {

var dataT = rows;

var x = [];
var turnout = [];

x[0] = "x";
turnout[0] = "MN Voter Turnout";

for (var i=1; i <= dataT.length; i++){
  x[i] = dataT[i-1].year;
  turnout[i] = dataT[i-1].turnout;
}

var  padding = {
        top: 20,
        right: 60,
        bottom: 20,
        left: 60,
    };

var chartPop = c3.generate({
      bindto: "#chartMN",
      padding: padding,
      data: {
            x: 'x',
            columns: [
                x,
                turnout
            ],
        types: {
          'MN Voter Turnout':'line'
         }
        },        
        color: {
              pattern: ['#333']
            },
        axis: {
              y: {
                    max: 1,
                    min: 0,
                    padding: {bottom: 0, top: 0},
                    tick: {
                     count: 4,
                     format: d3.format('%')
                    }
                },
            x: {
                 tick: {
                     values: [1992,1996,2000,2004,2008,2012,2016],
                     count: 7
                }
            }
        }
});

});

}

chartMNTurnout();

//SDR TURNOUT

function chartSDR(){

d3.csv("./data/sdrTurnout.csv", function(d) {
  return {
    year: +d.year,
    with_sdr: +d.with_sdr,
    no_sdr: +d.no_sdr
  };
}, function(error, rows) {

var dataT = rows;

var x = [];
var sdr = [];
var no_sdr = [];

x[0] = "x";
sdr[0] = "States with SDR";
no_sdr[0] = "States without SDR";
// gop[0] = "DFL Vote %";
// dfl[0] = "GOP Vote %";

for (var i=1; i <= dataT.length; i++){
  x[i] = dataT[i-1].year;
  sdr[i] = dataT[i-1].with_sdr;
  no_sdr[i] = dataT[i-1].no_sdr;
}

var  padding = {
        top: 20,
        right: 60,
        bottom: 20,
        left: 60,
    };

var chartT = c3.generate({
      bindto: "#chartSDR",
      padding: padding,
      data: {
            x: 'x',
            columns: [
                x,
                sdr,
                no_sdr
            ],
        types: {
          'States with SDR':'line',
          'States without SDR':'line'
         }
        },        
        color: {
              pattern: ['#A270A7',"#333"]
        },
        axis: {
              y: {
                    max: 1,
                    min: 0,
                    padding: {bottom: 0, top: 0},
                    tick: {
                     count: 4,
                     format: d3.format('%')
                    }
                },
            x: {
                 tick: {
                     values: [1996,2000,2004,2008,2012,2016],
                     count: 6
                }
            }
        }
});

});

}

chartSDR();


//BATTLEGROUNDS TURNOUT CHART

function chartBattlegrounds(){

d3.csv("./data/battlegroundTurnout.csv", function(d) {
  return {
    year: +d.year,
    bg: +d.bg,
    no_bg: +d.no_bg
  };
}, function(error, rows) {

var dataT = rows;

var x = [];
var bg = [];
var no_bg = [];

x[0] = "x";
bg[0] = "Battleground Turnout";
no_bg[0] = "Others Turnout";

for (var i=1; i <= dataT.length; i++){
  x[i] = dataT[i-1].year;
  bg[i] = dataT[i-1].bg;
  no_bg[i] = dataT[i-1].no_bg;
}

var  padding = {
        top: 20,
        right: 60,
        bottom: 20,
        left: 60,
    };

var chartT = c3.generate({
      bindto: "#chartBattlegrounds",
      padding: padding,
      data: {
            x: 'x',
            columns: [
                x,
                bg,
                no_bg
            ],
        types: {
          'Battleground Turnout':'line',
          'Others Turnout':'line'
         }
        },
        color: {
              pattern: ['#6CB359',"#333333"]
            },
        axis: {
              y: {
                    max: 1,
                    min: 0,
                    padding: {bottom: 0, top: 0},
                    tick: {
                     count: 4,
                     format: d3.format('%')
                    }
                },
            x: {
                 tick: {
                     values: [1996,2000,2004,2008,2012,2016],
                     count: 6
                }
            }
        }
});

});

}

chartBattlegrounds();

// TURNOUT BY AGE
function chartAge(){

d3.csv("./data/ageTurnout.csv", function(d) {
  return {
    year: +d.year,
    age_30_plus: +d.age_30_plus,
    age_18_29: +d.age_18_29
  };
}, function(error, rows) {

var dataT = rows;

var x = [];
var age_30_plus = [];
var age_18_29 = [];

x[0] = "x";
age_30_plus[0] = "30+ Turnout";
age_18_29[0] = "18-29 Turnout";

for (var i=1; i <= dataT.length; i++){
  x[i] = dataT[i-1].year;
  age_30_plus[i] = dataT[i-1].age_30_plus;
  age_18_29[i] = dataT[i-1].age_18_29;
}

var  padding = {
        top: 20,
        right: 60,
        bottom: 20,
        left: 60,
    };

var chartT = c3.generate({
      bindto: "#chartAge",
      padding: padding,
      data: {
            x: 'x',
            columns: [
                x,
                age_30_plus,
                age_18_29
            ],
        types: {
          '30+ Turnout':'line',
          '18-29 Turnout':'line'
         }
        },
        color: {
              pattern: ['#333333','#D4A26A']
            },
        axis: {
              y: {
                    max: 1,
                    min: 0,
                    padding: {bottom: 0, top: 0},
                    tick: {
                     count: 4,
                     format: d3.format('%')
                    }
                },
            x: {
                 tick: {
                     values: [1972,1984,1992,2008,2016],
                     count: 5
                }
            }
        }
});

});

}

chartAge();

// MARGIN OF VICTORY

function chartMargin(){
d3.csv("./data/margins.csv", function(d) {
  return {
    abb: d.abb,
    rDIFF: +d.margin_pct,
    county: d.state,
    votes: +d.turnout
  };
}, function(error, rows) {

var data = rows; 
var axis = [];
var votes = [];

axis[0] = 'shift_x';
votes[0] = 'Turnout';

var index = 1;

for (var i=0; i < data.length; i++){
  // if (data[i].pollster != "Google Consumer Surveys" && data[i].observations >= 500){
  // if (data[i].pollster == filter){
  axis[index] = data[i].rDIFF; //d3.time.format("%m-%d-%Y")(new Date(data[i].entry_date));
  votes[index] = data[i].votes;
  index++;
 // }
}

var  padding = {
        top: 20,
        right: 30,
        bottom: 20,
        left: 80,
    };

var chart = c3.generate({
      bindto: "#chartMargin",
      padding: padding,
      point: {
        r: 6
    },
    data: {
        xs: { "Turnout": 'shift_x' },
        columns: [
            axis,
            votes
        ],
        type: 'scatter',
        colors: {
              'Turnout': function(d) { 
              if (d.index == 2142352) { return "#6CB359"; }
              else { return "#333"; }
              }
        }
      },
    legend: { show: false },
    axis: {
      y: {
            max: 0.8,
            min: 0.4,
            padding: {bottom: 0, top:0},
            label: "Turnout",
            tick: {
             format: d3.format('%'),
             count: 3
            }
        },
        x: {
            max: 0.5,
            label: "Margin",
            tick: {
                // format: "%m-%d-%Y",
                count: 5,
                format: d3.format('%'),
                multiline: false
            }
          }
        },
        tooltip: {
      contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
          var $$ = this, config = $$.config,
              titleFormat = config.tooltip_format_title || defaultTitleFormat,
              nameFormat = config.tooltip_format_name || function (name) { return name; },
              valueFormat = config.tooltip_format_value || defaultValueFormat,
              text, i, title, value, name, bgcolor, raw;
          for (i = 0; i < d.length; i++) {
              if (! (d[i] && (d[i].value || d[i].value === 0))) { continue; }

              if (! text) {
                  title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                  raw = d[i].y;
                  text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>Margin: " + title + "</th></tr>" : "");
              }

              var county = "";

              name = nameFormat(d[i].name);
              value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
              bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);

              console.log(data[0].votes);

              for (var k=0; k < data.length; k++){
                if (data[k].votes == d[i].value){
                  county = "<td class='value pollster' colspan='2'>" + data[k].county + "</td>";
                  break;
                }
              }

              // if (name != "Undecided/Other") { pollster = ""; }

              text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
              text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
              text += "<td class='value'>" + value + "</td>";
              text += "</tr><tr>";
              text +=  county;
              text += "</tr>";
              
          }
          return text + "</table>";
      }
    }

});

});
}

chartMargin();

var cartogram2 = {
    margin: {
        top: 40,
        right: 140,
        bottom: 0,
        left: 60
    },

    selector: '#map svg',

    init: function() {
        var self = this;

        self.$el = $(self.selector);

        self.width = 550 - self.margin.left - self.margin.right;
        self.height = 400 - self.margin.top - self.margin.bottom;

        self.svg = d3.select(self.selector)
            .attr('height', self.height + self.margin.top + self.margin.bottom)
            .attr('width', self.width + self.margin.left + self.margin.right)

        self.state_size = self.width / 12;
        self.state_padding = 2;

        self.map = self.svg.append('g')
            .attr('transform', 'translate(' + self.margin.left + ','
                  + self.margin.top + ')')

        self.drawMap();
    },

    drawMap: function() {
        var self = this;

        var states = self.map.selectAll('.states')
            .data(self.state_pos_co2)
            .enter().append('g')
            .attr('class', 'state-groups');

        var state = states.append('rect')
            .attr('id', function(d) {
                return d.state_postal + "d";
            })
            .attr('class', 'state')
            .attr('class', function(d) {
              return d.color;
            })
            .attr('rx', 0)
            .attr('ry', 0)
            .attr('x', function(d) {
                return d.column * (self.state_size + self.state_padding);
            })
            .attr('y', function(d) {
                return d.row * (self.state_size + self.state_padding);
            })
            .attr('width', self.state_size)
            .attr('height', self.state_size);

        var text = states.append('text')
            .attr('class', 'state-label')
            .attr('class', function(d) {
                return "gray5";
            })
            .attr('dominant-baseline', 'central')
            .attr('x', function(d) {
                return (d.column * (self.state_size + self.state_padding))
                        + self.state_size / 2; })
            .attr('y', function(d) {
                return (d.row * (self.state_size + self.state_padding))
                    + self.state_size / 2; })
            .style('text-anchor', 'middle')
            .text(function(d) {
                return d.state_postal;
            });
    },

    state_pos_co2: [{'state_full':'Alabama','state_postal':'AL','row':5,'column':6,'state_total_old':'32','state_total_new':'25','state_change':'-63%','color':'gray2'},
        {'state_full':'Alaska','state_postal':'AK','row':6,'column':0,'state_total_old':'0','state_total_new':'0','state_change':'Insufficient data','color':'gray2'},
        {'state_full':'Arizona','state_postal':'AZ','row':4,'column':1,'state_total_old':'14','state_total_new':'36','state_change':'+36%','color':'gray2'},
        {'state_full':'Arkansas','state_postal':'AR','row':4,'column':4,'state_total_old':'36','state_total_new':'43','state_change':'-33%','color':'gray2'},
        {'state_full':'California','state_postal':'CA*','row':3,'column':0,'state_total_old':'358','state_total_new':'267','state_change':'-25%','color':'purple3'},
        {'state_full':'Colorado','state_postal':'CO','row':3,'column':2,'state_total_old':'124','state_total_new':'93','state_change':'-33%','color':'purple3'},
        {'state_full':'Connecticut','state_postal':'CT','row':2,'column':9,'state_total_old':'0','state_total_new':'6','state_change':'Insufficient data','color':'purple3'},
        {'state_full':'D.C.','state_postal':'DC','row':4,'column':8,'state_total_old':'0','state_total_new':'0','state_change':'Insufficient data','color':'purple3'},
        {'state_full':'Delaware','state_postal':'DE','row':3,'column':9,'state_total_old':'3','state_total_new':'3','state_change':'-100%','color':'gray2'},
        {'state_full':'Florida','state_postal':'FL','row':6,'column':8,'state_total_old':'150','state_total_new':'136','state_change':'-14%','color':'gray2'},
        {'state_full':'Georgia','state_postal':'GA','row':5,'column':7,'state_total_old':'77','state_total_new':'59','state_change':'-38%','color':'gray2'},
        {'state_full':'Hawaii','state_postal':'HI*','row':6,'column':-1,'state_total_old':'0','state_total_new':'11','state_change':'Insufficient data','color':'purple3'},
        {'state_full':'Idaho','state_postal':'ID','row':1,'column':1,'state_total_old':'71','state_total_new':'68','state_change':'-21%','color':'purple3'},
        {'state_full':'Illinois','state_postal':'IL','row':1,'column':6,'state_total_old':'251','state_total_new':'221','state_change':'-14%','color':'purple3'},
        {'state_full':'Indiana','state_postal':'IN','row':2,'column':5,'state_total_old':'216','state_total_new':'220','state_change':'0%','color':'gray2'},
        {'state_full':'Iowa','state_postal':'IA','row':2,'column':4,'state_total_old':'228','state_total_new':'295','state_change':'+29%','color':'purple3'},
        {'state_full':'Kansas','state_postal':'KS','row':4,'column':3,'state_total_old':'215','state_total_new':'205','state_change':'-6%','color':'gray2'},
        {'state_full':'Kentucky','state_postal':'KY','row':3,'column':5,'state_total_old':'308','state_total_new':'162','state_change':'-49%','color':'gray2'},
        {'state_full':'Louisiana','state_postal':'LA','row':5,'column':4,'state_total_old':'30','state_total_new':'26','state_change':'-53%','color':'gray2'},
        {'state_full':'Maine','state_postal':'ME','row':-1,'column':10,'state_total_old':'0','state_total_new':'14','state_change':'Insufficient data','color':'purple3'},
        {'state_full':'Maryland','state_postal':'MD','row':3,'column':8,'state_total_old':'26','state_total_new':'27','state_change':'-46%','color':'purple1'},
        {'state_full':'Massachusetts','state_postal':'MA','row':1,'column':9,'state_total_old':'0','state_total_new':'11','state_change':'Insufficient data','color':'gray2'},
        {'state_full':'Michigan','state_postal':'MI','row':1,'column':7,'state_total_old':'102','state_total_new':'179','state_change':'+74%','color':'gray2'},
        {'state_full':'Minnesota','state_postal':'MN','row':1,'column':4,'state_total_old':'153','state_total_new':'210','state_change':'+37%','color':'purple3'},
        {'state_full':'Mississippi','state_postal':'MS','row':5,'column':5,'state_total_old':'65','state_total_new':'46','state_change':'-57%','color':'gray2'},
        {'state_full':'Missouri','state_postal':'MO','row':3,'column':4,'state_total_old':'264','state_total_new':'288','state_change':'+5%','color':'gray2'},
        {'state_full':'Montana','state_postal':'MT','row':1,'column':2,'state_total_old':'145','state_total_new':'139','state_change':'-10%','color':'purple3'},
        {'state_full':'Nebraska','state_postal':'NE','row':3,'column':3,'state_total_old':'199','state_total_new':'179','state_change':'-11%','color':'gray2'},
        {'state_full':'Nevada','state_postal':'NV','row':2,'column':1,'state_total_old':'0','state_total_new':'11','state_change':'Insufficient data','color':'gray2'},
        {'state_full':'New Hampshire','state_postal':'NH','row':0,'column':10,'state_total_old':'0','state_total_new':'4','state_change':'Insufficient data','color':'purple3'},
        {'state_full':'New Jersey','state_postal':'NJ','row':2,'column':8,'state_total_old':'8','state_total_new':'19','state_change':'+50%','color':'gray2'},
        {'state_full':'New Mexico','state_postal':'NM','row':4,'column':2,'state_total_old':'24','state_total_new':'14','state_change':'-100%','color':'gray2'},
        {'state_full':'New York','state_postal':'NY','row':1,'column':8,'state_total_old':'203','state_total_new':'135','state_change':'-38%','color':'gray2'},
        {'state_full':'North Carolina','state_postal':'NC','row':4,'column':6,'state_total_old':'156','state_total_new':'111','state_change':'-35%','color':'purple1'},
        {'state_full':'North Dakota','state_postal':'ND**','row':1,'column':3,'state_total_old':'84','state_total_new':'117','state_change':'+36%','color':'gray2'},
        {'state_full':'Ohio','state_postal':'OH','row':2,'column':6,'state_total_old':'258','state_total_new':'217','state_change':'-18%','color':'gray2'},
        {'state_full':'Oklahoma','state_postal':'OK','row':5,'column':3,'state_total_old':'46','state_total_new':'53','state_change':'-30%','color':'gray2'},
        {'state_full':'Oregon','state_postal':'OR','row':2,'column':0,'state_total_old':'40','state_total_new':'61','state_change':'+20%','color':'purple2'},
        {'state_full':'Pennsylvania','state_postal':'PA','row':2,'column':7,'state_total_old':'276','state_total_new':'182','state_change':'-34%','color':'gray2'},
        {'state_full':'Rhode Island','state_postal':'RI','row':2,'column':10,'state_total_old':'0','state_total_new':'0','state_change':'Insufficient data','color':'gray2'},
        {'state_full':'South Carolina','state_postal':'SC','row':4,'column':7,'state_total_old':'16','state_total_new':'30','state_change':'+38%','color':'gray2'},
        {'state_full':'South Dakota','state_postal':'SD','row':2,'column':3,'state_total_old':'88','state_total_new':'108','state_change':'+17%','color':'gray2'},
        {'state_full':'Tennessee','state_postal':'TN','row':4,'column':5,'state_total_old':'244','state_total_new':'147','state_change':'-42%','color':'gray2'},
        {'state_full':'Texas','state_postal':'TX','row':6,'column':3,'state_total_old':'223','state_total_new':'159','state_change':'+29%','color':'gray2'},
        {'state_full':'Utah','state_postal':'UT','row':3,'column':1,'state_total_old':'24','state_total_new':'24','state_change':'-67%','color':'gray2'},
        {'state_full':'Vermont','state_postal':'VT','row':0,'column':9,'state_total_old':'7','state_total_new':'15','state_change':'-57%','color':'purple3'},
        {'state_full':'Virginia','state_postal':'VA','row':3,'column':7,'state_total_old':'130','state_total_new':'123','state_change':'-10%','color':'gray2'},
        {'state_full':'Washington','state_postal':'WA','row':1,'column':0,'state_total_old':'88','state_total_new':'63','state_change':'-39%','color':'gray2'},
        {'state_full':'West Virginia','state_postal':'WV','row':3,'column':6,'state_total_old':'9','state_total_new':'22','state_change':'0%','color':'gray2'},
        {'state_full':'Wisconsin','state_postal':'WI','row':1,'column':5,'state_total_old':'279','state_total_new':'242','state_change':'-15%','color':'purple3'},
        {'state_full':'Wyoming','state_postal':'WY','row':2,'column':2,'state_total_old':'33','state_total_new':'37','state_change':'-21%','color':'purple3'}]

};

$(document).ready(function() {
  cartogram2.init();
});
},{}]},{},[1])
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
d3.json("./data/changes.json", function(error, dataLoad) {

  var data = dataLoad.changes;

$.urlParam = function(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results != null) { return results[1] || 0; }
  else { return null; }
}

var selected = $.urlParam('chart');

if (selected != null){
$(".slide").hide();
$("#" + selected).show();
} else {
    $(".slide").show();
}

var aspect = 550 / 400, chart = $("#mapAge svg, #mapRace svg");
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

function chartNational(){

var  padding = {
        top: 20,
        right: 60,
        bottom: 20,
        left: 60,
    };

var white = ["White",66.2,66.4,64.2,70.2,60.7,61.8,67.2,66.1,64.1,65.3];
var black = ["Black",53.9,60.6,55.0,59.2,53.0,56.8,60.0,64.7,66.2,59.4];
var asian = ["Asian",null,null,null,53.9,45.0,43.4,44.1,47.6,47.3,49.0];
var hispanic = ["Hispanic",46.1,50.0,48.0,51.6,44.0,45.1,47.2,49.9,48.0,47.6];

for (var i=1; i < white.length; i++){

    white[i] = white[i] / 100;
    black[i] = black[i] / 100;
    if (asian[i] != null) { asian[i] = asian[i] / 100; }
    hispanic[i] = hispanic[i] / 100;
}

var chartT = c3.generate({
      bindto: "#chartNational",
      padding: padding,
      data: {
            x: 'x',
            columns: [
                ["x",1980,1984,1988,1992,1996,2000,2004,2008,2012,2016],
                white,
                black,
                hispanic,
                asian
            ],
        types: {
          'White':'line',
          'Black':'line',
          'Asian':'line',
          'Hispanic':'line'
         }
        },        
        color: {
              pattern: ['#C22A22','#7F98AA','#3580A3','#F2AF80']
            },
        axis: {
              y: {
                    max: 1,
                    min: 0,
                    padding: {bottom: 0, top: 0},
                    tick: {
                     count: 5,
                     format: d3.format('%.0f')
                    }
                },
            x: {
                 tick: {
                     values: [1980,1990,2000,2008,2016],
                     count: 5
                }
            }
        },
          grid: {
              y: {
              lines: [
                    {value: 0.5, text: '', position: 'start', class:'powerline'}
              ]
              }
          }
});

}

chartNational();


function chartM(){

d3.csv("./data/turnoutM.csv", function(d) {
  return {
    year: +d.year,
    all_voters: +d.all_voters,
    voted: +d.voted,
    turnout: +d.turnout,
    reg: +d.reg,
    reg_pct: d.reg_pct
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
      bindto: "#chartMidterms",
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
        legend: {
            show: false
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
                     values: [1950,1964,1980,1996,2014],
                     count: 5
                }
            }
        },
        // regions: [
        //     {axis: 'x', start: '1980', end: '1990', class: 'hottest'},
        // ],
        grid: {
        x: {
            // lines: [
            //     {value: '2000', text: 'Bush (R) Win', position: 'start'},
            //     {value: '2002', text: 'Midterm', position: 'start'},
            //     {value: '2004', text: 'Bush (R) Win', position: 'start'},
            //     {value: '2006', text: 'Midterm', position: 'start'},
            //     {value: '2008', text: 'Obama (D) Win', position: 'start'},
            //     {value: '2010', text: 'Midterm', position: 'start'},
            //     {value: '2012', text: 'Obama (D) Win', position: 'start'},
            //     {value: '2014', text: 'Midterm', position: 'start'},
            // ]
        }
    },
         regions: [
        {axis: 'x', start: 2002, end: 2014, class: 'hottest'},
    ]
});

});

}

chartM();

    function mnage(){

        var  padding = {
                top: 20,
                right: 60,
                bottom: 20,
                left: 40,
            };

        var chartPopD = c3.generate({
              bindto: "#chartMNAge",
              padding: padding,
              data: {
                    columns: [
                        ['18 to 24', .547],
                        ['25 to 34', .645],
                        ['35 to 54', .701],
                        ['45 to 64', .726],
                        ['65+', .726]
                    ],
                type: 'bar',
                labels: {
                    format: {
                        '18 to 24': d3.format('%'),
                        '25 to 34': d3.format('%'),
                        '35 to 54': d3.format('%'),
                        '45 to 64': d3.format('%'),
                        '65+': d3.format('%')
                    }
                }
            },
                    color: {
                      pattern: ['#a3858b','#865f67','#693c46','#4c1926','#1E0108']
                    },
                axis: {
                      // rotated: true,
                      y: {
                            max: 1,
                            min: 0,
                            padding: {bottom: 0, top: 0},
                            tick: {
                             count: 4,
                             values: [0,0.25,0.50,0.75,1],
                             format: d3.format('%')
                            }
                        },
                    x: {
                        type: 'category',
                        categories: ['Voter turnout']
                    }
                },
                grid: {
                    y: {
                  lines: [
                        {value: 0.5, text: '', position: 'start', class:'powerline'}
                  ]
                    }
                }

        });
}

    mnage();

    function mnrace(){

        var  padding = {
                top: 20,
                right: 60,
                bottom: 20,
                left: 40,
            };

        var chartPopD = c3.generate({
              bindto: "#chartMNRace",
              padding: padding,
              data: {
                    columns: [
                        ['White', .71],
                        ['Black', .663],
                        ['Asian', .516],
                        ['Hispanic', .366]
                    ],
                type: 'bar',
                labels: {
                    format: {
                        'White': d3.format('%'),
                        'Black': d3.format('%'),
                        'Asian': d3.format('%'),
                        'Hispanic': d3.format('%')
                    }
                }
            },
                    color: {
                      pattern: ['#a3858b','#865f67','#693c46','#4c1926','#1E0108']
                    },
                axis: {
                      // rotated: true,
                      y: {
                            max: 1,
                            min: 0,
                            padding: {bottom: 0, top: 0},
                            tick: {
                             count: 4,
                             values: [0,0.25,0.50,0.75,1],
                             format: d3.format('%')
                            }
                        },
                    x: {
                        type: 'category',
                        categories: ['Voter turnout']
                    }
                },
                grid: {
                    y: {
                  lines: [
                        {value: 0.5, text: '', position: 'start', class:'powerline'}
                  ]
                    }
                }

        });
}

    mnrace();

var cartogram1 = {
    margin: {
        top: 40,
        right: 140,
        bottom: 0,
        left: 60
    },

    selector: '#mapAge svg',

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
              for (var i=0; i<data.length; i++){
                if (data[i].ab == d.state_postal){
                  if (data[i].AGEDIFF > 0){ return "state green3"; }
                  if (data[i].AGEDIFF == 0){ return "state gray3"; }
                  if (data[i].AGEDIFF < 0){ return "state orange3"; }
                }
              }
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

    state_pos_co2: [{'state_full':'Alabama','state_postal':'AL','row':5,'column':6},
        {'state_full':'Alaska','state_postal':'AK','row':6,'column':0},
        {'state_full':'Arizona','state_postal':'AZ','row':4,'column':1},
        {'state_full':'Arkansas','state_postal':'AR','row':4,'column':4},
        {'state_full':'California','state_postal':'CA','row':3,'column':0},
        {'state_full':'Colorado','state_postal':'CO','row':3,'column':2},
        {'state_full':'Connecticut','state_postal':'CT','row':2,'column':9},
        {'state_full':'D.C.','state_postal':'DC','row':4,'column':8},
        {'state_full':'Delaware','state_postal':'DE','row':3,'column':9},
        {'state_full':'Florida','state_postal':'FL','row':6,'column':8},
        {'state_full':'Georgia','state_postal':'GA','row':5,'column':7},
        {'state_full':'Hawaii','state_postal':'HI','row':6,'column':-1},
        {'state_full':'Idaho','state_postal':'ID','row':1,'column':1},
        {'state_full':'Illinois','state_postal':'IL','row':1,'column':6},
        {'state_full':'Indiana','state_postal':'IN','row':2,'column':5},
        {'state_full':'Iowa','state_postal':'IA','row':2,'column':4},
        {'state_full':'Kansas','state_postal':'KS','row':4,'column':3},
        {'state_full':'Kentucky','state_postal':'KY','row':3,'column':5},
        {'state_full':'Louisiana','state_postal':'LA','row':5,'column':4},
        {'state_full':'Maine','state_postal':'ME','row':-1,'column':10},
        {'state_full':'Maryland','state_postal':'MD','row':3,'column':8},
        {'state_full':'Massachusetts','state_postal':'MA','row':1,'column':9},
        {'state_full':'Michigan','state_postal':'MI','row':1,'column':7},
        {'state_full':'Minnesota','state_postal':'MN','row':1,'column':4},
        {'state_full':'Mississippi','state_postal':'MS','row':5,'column':5},
        {'state_full':'Missouri','state_postal':'MO','row':3,'column':4},
        {'state_full':'Montana','state_postal':'MT','row':1,'column':2},
        {'state_full':'Nebraska','state_postal':'NE','row':3,'column':3},
        {'state_full':'Nevada','state_postal':'NV','row':2,'column':1},
        {'state_full':'New Hampshire','state_postal':'NH','row':0,'column':10},
        {'state_full':'New Jersey','state_postal':'NJ','row':2,'column':8},
        {'state_full':'New Mexico','state_postal':'NM','row':4,'column':2},
        {'state_full':'New York','state_postal':'NY','row':1,'column':8},
        {'state_full':'North Carolina','state_postal':'NC','row':4,'column':6},
        {'state_full':'North Dakota','state_postal':'ND','row':1,'column':3},
        {'state_full':'Ohio','state_postal':'OH','row':2,'column':6},
        {'state_full':'Oklahoma','state_postal':'OK','row':5,'column':3},
        {'state_full':'Oregon','state_postal':'OR','row':2,'column':0},
        {'state_full':'Pennsylvania','state_postal':'PA','row':2,'column':7},
        {'state_full':'Rhode Island','state_postal':'RI','row':2,'column':10},
        {'state_full':'South Carolina','state_postal':'SC','row':4,'column':7},
        {'state_full':'South Dakota','state_postal':'SD','row':2,'column':3},
        {'state_full':'Tennessee','state_postal':'TN','row':4,'column':5},
        {'state_full':'Texas','state_postal':'TX','row':6,'column':3},
        {'state_full':'Utah','state_postal':'UT','row':3,'column':1},
        {'state_full':'Vermont','state_postal':'VT','row':0,'column':9},
        {'state_full':'Virginia','state_postal':'VA','row':3,'column':7},
        {'state_full':'Washington','state_postal':'WA','row':1,'column':0},
        {'state_full':'West Virginia','state_postal':'WV','row':3,'column':6},
        {'state_full':'Wisconsin','state_postal':'WI','row':1,'column':5},
        {'state_full':'Wyoming','state_postal':'WY','row':2,'column':2}]

};

$(document).ready(function() {
  cartogram1.init();
});


var cartogram2 = {
    margin: {
        top: 40,
        right: 140,
        bottom: 0,
        left: 60
    },

    selector: '#mapRace svg',

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
            .attr('class', function(d) {
              for (var i=0; i<data.length; i++){
                if (data[i].ab == d.state_postal){
                  if (data[i].RACEDIFF > 0){ return "state green3"; }
                  if (data[i].RACEDIFF == 0){ return "state gray3"; }
                  if (data[i].RACEDIFF < 0){ return "state orange3"; }
                }
              }
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

    state_pos_co2: [{'state_full':'Alabama','state_postal':'AL','row':5,'column':6},
        {'state_full':'Alaska','state_postal':'AK','row':6,'column':0},
        {'state_full':'Arizona','state_postal':'AZ','row':4,'column':1},
        {'state_full':'Arkansas','state_postal':'AR','row':4,'column':4},
        {'state_full':'California','state_postal':'CA','row':3,'column':0},
        {'state_full':'Colorado','state_postal':'CO','row':3,'column':2},
        {'state_full':'Connecticut','state_postal':'CT','row':2,'column':9},
        {'state_full':'D.C.','state_postal':'DC','row':4,'column':8},
        {'state_full':'Delaware','state_postal':'DE','row':3,'column':9},
        {'state_full':'Florida','state_postal':'FL','row':6,'column':8},
        {'state_full':'Georgia','state_postal':'GA','row':5,'column':7},
        {'state_full':'Hawaii','state_postal':'HI','row':6,'column':-1},
        {'state_full':'Idaho','state_postal':'ID','row':1,'column':1},
        {'state_full':'Illinois','state_postal':'IL','row':1,'column':6},
        {'state_full':'Indiana','state_postal':'IN','row':2,'column':5},
        {'state_full':'Iowa','state_postal':'IA','row':2,'column':4},
        {'state_full':'Kansas','state_postal':'KS','row':4,'column':3},
        {'state_full':'Kentucky','state_postal':'KY','row':3,'column':5},
        {'state_full':'Louisiana','state_postal':'LA','row':5,'column':4},
        {'state_full':'Maine','state_postal':'ME','row':-1,'column':10},
        {'state_full':'Maryland','state_postal':'MD','row':3,'column':8},
        {'state_full':'Massachusetts','state_postal':'MA','row':1,'column':9},
        {'state_full':'Michigan','state_postal':'MI','row':1,'column':7},
        {'state_full':'Minnesota','state_postal':'MN','row':1,'column':4},
        {'state_full':'Mississippi','state_postal':'MS','row':5,'column':5},
        {'state_full':'Missouri','state_postal':'MO','row':3,'column':4},
        {'state_full':'Montana','state_postal':'MT','row':1,'column':2},
        {'state_full':'Nebraska','state_postal':'NE','row':3,'column':3},
        {'state_full':'Nevada','state_postal':'NV','row':2,'column':1},
        {'state_full':'New Hampshire','state_postal':'NH','row':0,'column':10},
        {'state_full':'New Jersey','state_postal':'NJ','row':2,'column':8},
        {'state_full':'New Mexico','state_postal':'NM','row':4,'column':2},
        {'state_full':'New York','state_postal':'NY','row':1,'column':8},
        {'state_full':'North Carolina','state_postal':'NC','row':4,'column':6},
        {'state_full':'North Dakota','state_postal':'ND','row':1,'column':3},
        {'state_full':'Ohio','state_postal':'OH','row':2,'column':6},
        {'state_full':'Oklahoma','state_postal':'OK','row':5,'column':3},
        {'state_full':'Oregon','state_postal':'OR','row':2,'column':0},
        {'state_full':'Pennsylvania','state_postal':'PA','row':2,'column':7},
        {'state_full':'Rhode Island','state_postal':'RI','row':2,'column':10},
        {'state_full':'South Carolina','state_postal':'SC','row':4,'column':7},
        {'state_full':'South Dakota','state_postal':'SD','row':2,'column':3},
        {'state_full':'Tennessee','state_postal':'TN','row':4,'column':5},
        {'state_full':'Texas','state_postal':'TX','row':6,'column':3},
        {'state_full':'Utah','state_postal':'UT','row':3,'column':1},
        {'state_full':'Vermont','state_postal':'VT','row':0,'column':9},
        {'state_full':'Virginia','state_postal':'VA','row':3,'column':7},
        {'state_full':'Washington','state_postal':'WA','row':1,'column':0},
        {'state_full':'West Virginia','state_postal':'WV','row':3,'column':6},
        {'state_full':'Wisconsin','state_postal':'WI','row':1,'column':5},
        {'state_full':'Wyoming','state_postal':'WY','row':2,'column':2}]

};

$(document).ready(function() {
  cartogram2.init();
});
});
},{}]},{},[1])
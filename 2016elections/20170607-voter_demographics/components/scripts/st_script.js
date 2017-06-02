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

  function chart1(){

    var  padding = {
            top: 20,
            right: 60,
            bottom: 20,
            left: 40,
        };

    var chartPopD = c3.generate({
          bindto: "#ageChart",
          padding: padding,
          data: {
                columns: [
                    ['2012', .57, .59, .68, .77, .81],
                    ['2016', .50, .61, .64, .70, .72]
                ],
            type: 'bar',
            labels: {
                format: {
                    '2012': d3.format('%'),
                    '2016': d3.format('%')
                }
            }
            },
            // legend: {
            //     show: false
            // },
                color: {
                  pattern: ['#a3858b','#865f67','#693c46','#4c1926','#1E0108']
                },
            axis: {
                  // rotated: true,
                  y: {
                        max: 1,
                        min: 0,
                        padding: {bottom: 0},
                        tick: {
                         count: 4,
                         values: [0,0.25,0.50,0.75,1],
                         format: d3.format('%')
                        }
                    },
                x: {
                    type: 'category',
                    categories: ['18-24', '25-34', '35-44', '45-64', '65+']
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

  chart1();


  function chart2(){

    var  padding = {
            top: 20,
            right: 60,
            bottom: 20,
            left: 40,
        };

    var chartPopD = c3.generate({
          bindto: "#raceChart",
          padding: padding,
          data: {
                columns: [
                    ['2012', .56, .49, .33, .74],
                    ['2016', .37, .58, .19, .71]
                ],
            type: 'bar',
            labels: {
                format: {
                    '2012': d3.format('%'),
                    '2016': d3.format('%')
                }
            }
            },
            // legend: {
            //     show: false
            // },
                color: {
                  pattern: ['#a3858b','#865f67','#693c46','#4c1926']
                },
            axis: {
                  // rotated: true,
                  y: {
                        max: 1,
                        min: 0,
                        padding: {bottom: 0},
                        tick: {
                         count: 4,
                         values: [0,0.25,0.50,0.75,1],
                         format: d3.format('%')
                        }
                    },
                x: {
                    type: 'category',
                    categories: ['Asian', 'Black', 'Hispanic', 'White']
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

  chart2();


    function chart3(){

    var  padding = {
            top: 20,
            right: 60,
            bottom: 20,
            left: 40,
        };

    var chartPopD = c3.generate({
          bindto: "#genderChart",
          padding: padding,
          data: {
                columns: [
                    ['Female', .72, .67],
                    ['Male', .69, .64]
                ],
            type: 'bar',
            labels: {
                format: {
                    'Female': d3.format('%'),
                    'Male': d3.format('%')
                }
            }
            },
            // legend: {
            //     show: false
            // },
                color: {
                  pattern: ['#a3858b','#4c1926']
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
                    categories: ['2012', '2016']
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

  chart3();


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
                  if (data[i].AGEDIFF < 0){ return "state purple3"; }
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
                  if (data[i].RACEDIFF < 0){ return "state purple3"; }
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
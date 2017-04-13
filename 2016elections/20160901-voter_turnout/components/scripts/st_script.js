
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

function chartBuild(){

d3.csv("./data/turnout.csv", function(d) {
  return {
    year: +d.year,
    all_voters: +d.all_voters,
    voted: +d.voted,
    turnout: +d.turnout,
    rpm: +d.rpm,
    dfl: +d.dfl
  };
}, function(error, rows) {

var dataT = rows;

var x = [];
var turnout = [];
var gop = [];
var dfl = [];

x[0] = "x";
turnout[0] = "Voter Turnout";
gop[0] = "DFL Seats";
dfl[0] = "GOP Seats";

for (var i=1; i <= dataT.length; i++){
  x[i] = dataT[i-1].year;
  turnout[i] = dataT[i-1].turnout;
  gop[i] = dataT[i-1].rpm;
  dfl[i] = dataT[i-1].dfl;
}

var  padding = {
        top: 20,
        right: 60,
        bottom: 20,
        left: 60,
    };

var chartPop = c3.generate({
      bindto: "#chart",
      padding: padding,
      data: {
            x: 'x',
            columns: [
                x,
                turnout
                // dfl,
                // gop
            ],
        types: {
          'Voter Turnout':'line',
          'DFL Seats':'line',
          'GOP Seats':'line'
         }
        },        
        legend: {
            show: false
        },
        color: {
              pattern: ['#333','#3F88C5','#8C1B17']
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
                     values: [1990,1996,2000,2004,2008,2012,2016],
                     count: 7
                }
            }
        },
        grid: {
        x: {
            lines: [
                {value: '1990', text: 'Midterm: DFL House', position: 'start', class: 'democrat'},
                {value: '1992', text: 'Presidential: DFL House', position: 'start', class: 'democrat'},
                {value: '1994', text: 'Midterm: DFL House', position: 'start', class: 'democrat'},
                {value: '1996', text: 'Presidential: DFL House', position: 'start', class: 'democrat'},
                {value: '1998', text: 'Midterm: GOP House', position: 'start', class: 'republican'},
                {value: '2000', text: 'Presidential: GOP House', position: 'start', class: 'republican'},
                {value: '2002', text: 'Midterm: GOP House', position: 'start', class: 'republican'},
                {value: '2004', text: 'Presidential: GOP House', position: 'start', class: 'republican'},
                {value: '2006', text: 'Midterm: DFL House', position: 'start', class: 'democrat'},
                {value: '2008', text: 'Presidential: DFL House', position: 'start', class: 'democrat'},
                {value: '2010', text: 'Midterm: GOP House', position: 'start', class: 'republican'},
                {value: '2012', text: 'Presidential: DFL House', position: 'start', class: 'democrat'},
                {value: '2014', text: 'Midterm: GOP House', position: 'start', class: 'republican'},
                {value: '2016', text: 'Presidential: GOP House', position: 'start', class: 'republican'},
            ]
        }
    }
});

});

}

chartBuild();

function chartT(){

d3.csv("./data/turnoutTrend.csv", function(d) {
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
      bindto: "#chartTrend",
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
                     values: [1950,1964,1980,1996,2016],
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
        {axis: 'x', start: 2004, end: 2012, class: 'hottest'},
    ]
});

});

}

chartT();

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
      bindto: "#chartMid",
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


function chartN(){

d3.csv("./data/turnoutNational.csv", function(d) {
  return {
    state: d.ab,
    turnout: +d.turnout,
    turnout2012: +d.turnout2012
  };
}, function(error, rows) {

var dataT = rows;

var x = [];
var turnout = [];
var turnout2012 = [];

x[0] = "x";
turnout[0] = "2016 Turnout";
turnout2012[0] = "2012 Turnout";
// gop[0] = "DFL Vote %";
// dfl[0] = "GOP Vote %";

for (var i=1; i <= dataT.length; i++){
  x[i] = dataT[i-1].state;
  turnout[i] = dataT[i-1].turnout;
  turnout2012[i] = dataT[i-1].turnout2012;
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
                turnout,
                turnout2012
            ],
        types: {
          '2016 Turnout':'bar',
          '2012 Turnout':'bar'
         },
         colors: {
              'Voter Turnout': function(d) { 

                // console.log(d);

              if (d.index == 0 || d.index == 36) { return "#000"; }
              else { return "#bbb"; }
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
    }
});

});

}

chartN();

function chartH(){

d3.csv("./data/turnoutH.csv", function(d) {
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
      bindto: "#chartHistory",
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
                     values: [1950,1964,1980,1996,2016],
                     count: 5
                }
            }
        },
        // regions: [
        //     {axis: 'x', start: '1980', end: '1990', class: 'hottest'},
        // ],
        grid: {
        x: {
            lines: [
                {value: '1952', text: 'Presidential', position: 'start'},
                {value: '1956', text: 'Presidential', position: 'start'},
                {value: '1960', text: 'Presidential', position: 'start'},
                {value: '1964', text: 'Presidential', position: 'start'},
                {value: '1968', text: 'Presidential', position: 'start'},
                {value: '1972', text: 'Presidential', position: 'start'},
                {value: '1976', text: 'Presidential', position: 'start'},
                {value: '1980', text: 'Presidential', position: 'start'},
                {value: '1984', text: 'Presidential', position: 'start'},
                {value: '1988', text: 'Presidential', position: 'start'},
                {value: '1992', text: 'Presidential', position: 'start'},
                {value: '1996', text: 'Presidential', position: 'start'},
                {value: '2000', text: 'Presidential', position: 'start'},
                {value: '2004', text: 'Presidential', position: 'start'},
                {value: '2008', text: 'Presidential', position: 'start'},
                {value: '2012', text: 'Presidential', position: 'start'},
                {value: '2016', text: 'Presidential', position: 'start'}
            ]
        }
    },
         regions: [
        {axis: 'x', start: 2004, end: 2012, class: 'hottest'},
    ]
});

});

}

chartH();
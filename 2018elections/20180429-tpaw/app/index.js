/**
 * Main JS file for project.
 */
 
// Define globals that are added through the config.json file, here like this:
// /* global _ */
'use strict';

// Dependencies
import utilsFn from './utils.js';

// Import local ES6 modules like this:
//import utilsFn from './utils.js';

// Or import libraries installed with npm like this:
// import module from 'module';

// Setup utils function
utilsFn({});

$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results != null) {
        return results[1] || 0;
    } else {
        return null;
    }
}

var selected = $.urlParam('chart');

if (selected != null) {
    $(".slide").hide();
    $("#" + selected).show();
}
if (selected == "all") {
    $(".slide").show();
}

//income chart
function chartIncome() {
    var padding = {
        top: 0,
        right: 60,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartIncome",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ['Rate', 67807,75638,71416,72898,68932,71287,66630,66914,67207,61228,62745,57597,61686,64598,66279,68172,69599,70218, null, null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1f')
                }
            }
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2016) { return 6; } }
        },
        color: {
            pattern: ['#333333']
        },
        axis: {
            // rotated: true,
            y: {
                max: 80000,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 20000, 40000, 60000, 80000],
                    format: d3.format('$,.0f')
                }
            },
            x: {
                // type: 'timeseries',
                padding: {
                    right: 0,
                    left: 0
                },
                tick: {
                    count: 4,
                    values: [1999, 2003, 2011, 2018],
                    multiline: false,
                }
            }
        },
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind','label':'Ventura', 'vertical': false},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
        grid: {
        x: {
            lines: [
                {value: '2007', text: 'Great Recession starts', position: 'start', class: 'grayline'},
                {value: '2009', text: 'Great Recession ends', position: 'start', class: 'grayline'}
            ]
        }
    },
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      }
    });
}

chartIncome();


//tax chart
function chartTaxes() {
    var padding = {
        top: 0,
        right: 60,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartTaxes",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ['Rate', 2122,2191,2192,2230,2239,2363,2444,2536,2645,2528,2454,2634,2793,3006,3128,null,null,null,null,null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1f')
                }
            }
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2013) { return 6; } }
        },
        color: {
            pattern: ['#333333']
        },
        axis: {
            // rotated: true,
            y: {
                max: 4000,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 1000, 2000, 3000, 4000],
                    format: d3.format('$,.0f')
                }
            },
            x: {
                // type: 'timeseries',
                padding: {
                    right: 0,
                    left: 0
                },
                tick: {
                    count: 4,
                    values: [1999, 2005, 2011, 2018],
                    multiline: false,
                }
            }
        },
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      }
    });
}

chartTaxes();


//unemployment chart
function chartUnemployment() {
    var padding = {
        top: 0,
        right: 60,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartUnemployment",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ['Rate', 2.5,3,3.4,4.5,4.5,4.9,4.3,4.1,4.3,4.7,7,7.7,6.9,5.8,5.3,4.6,3.8,3.7, null, null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1f')
                }
            }
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2016) { return 6; } }
        },
        color: {
            pattern: ['#333333']
        },
        axis: {
            // rotated: true,
            y: {
                max: 10,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 2, 4, 6, 8, 10],
                    format: d3.format(',.1f')
                }
            },
            x: {
                // type: 'timeseries',
                padding: {
                    right: 0,
                    left: 0
                },
                tick: {
                    count: 4,
                    values: [1999, 2003, 2011, 2018],
                    multiline: false,
                }
            }
        },
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      },
        grid: {
        x: {
            lines: [
                {value: '2007', text: 'Great Recession starts', position: 'start', class: 'grayline'},
                {value: '2009', text: 'Great Recession ends', position: 'start', class: 'grayline'}
            ]
        }
     }
    });
}

chartUnemployment();


//unemployment chart
function chartHousing() {
    var padding = {
        top: 0,
        right: 60,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartHousing",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ['Rate', null,0.22,0.26,0.26,0.27,0.29,0.31,0.33,0.33,0.34,0.33,0.33,0.33,0.30,0.28,0.28,0.27, null, null, null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1f')
                }
            }
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2015) { return 6; } }
        },
        color: {
            pattern: ['#333333']
        },
        axis: {
            // rotated: true,
            y: {
                max: 1,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 0.25, 0.50, 0.75, 1],
                    format: d3.format('%,.0f')
                }
            },
            x: {
                // type: 'timeseries',
                padding: {
                    right: 0,
                    left: 0
                },
                tick: {
                    count: 4,
                    values: [1999, 2003, 2011, 2018],
                    multiline: false,
                }
            }
        },
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      },
        grid: {
        x: {
            lines: [
                {value: '2007', text: 'Great Recession starts', position: 'end', class: 'grayline'},
                {value: '2009', text: 'Great Recession ends', position: 'end', class: 'grayline'}
            ]
        }
     }
    });
}

chartHousing();


//jobs chart chart
function chartJobs() {
    var padding = {
        top: 0,
        right: 60,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartJobs",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ['Rate', 2621400, 2683100, 2687800, 2662900, 2658400, 2678900, 2720900, 2755900, 2768900, 2760400, 2652000, 2638000, 2685000, 2727400, 2775100, 2813500, 2855900, 2895600, null, null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1f')
                }
            }
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2016) { return 6; } }
        },
        color: {
            pattern: ['#333333']
        },
        axis: {
            // rotated: true,
            y: {
                max: 3000000,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 1000000, 2000000, 3000000],
                    format: d3.format(',.0f')
                }
            },
            x: {
                // type: 'timeseries',
                padding: {
                    right: 0,
                    left: 0
                },
                tick: {
                    count: 4,
                    values: [1999, 2005, 2011, 2018],
                    multiline: false,
                }
            }
        },
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      },
        grid: {
        x: {
            lines: [
                {value: '2007', text: 'Great Recession starts', position: 'start', class: 'grayline'},
                {value: '2009', text: 'Great Recession ends', position: 'start', class: 'grayline'}
            ]
        }
     }
    });
}

chartJobs();


//health care costs chart
function chartHealthCare() {
    var padding = {
        top: 0,
        right: 60,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartHealthCare",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ['Rate', null,null,0.061,null,null,0.077,null,null,0.072,null,null,0.09,null,null,0.09,null,0.043,null, null, null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1f')
                }
            }
        },
        legend: {
            show: false
        },
       line: {
             connectNull: true
         },
        point: {
            show: true,
            r: function(d) { if (d.x == 2015) { return 6; } }
        },
        color: {
            pattern: ['#333333']
        },
        axis: {
            // rotated: true,
            y: {
                max: 0.10,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 0.02, 0.04, 0.06, 0.08, 0.10],
                    format: d3.format('%')
                }
            },
            x: {
                // type: 'timeseries',
                padding: {
                    right: 0,
                    left: 0
                },
                tick: {
                    count: 4,
                    values: [1999, 2003, 2011, 2018],
                    multiline: false,
                }
            }
        },
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      },
        grid: {
        x: {
            lines: [
                {value: '2010', text: 'Affordable Care Act', position: 'start', class: 'grayline'}
            ]
        }
     }
    });
}

chartHealthCare();

//college tuition chart
function chartCollege() {
    var padding = {
        top: 0,
        right: 60,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartCollege",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ['Rate', 5992,6133,6778,7631,8559,9449,9880,10194,10360,10701,11545,12211,12430,12606,12424,12226,12704,12800, null, null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1f')
                }
            }
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2016) { return 6; } }
        },
        color: {
            pattern: ['#333333']
        },
        axis: {
            // rotated: true,
            y: {
                max: 15000,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 3000, 6000, 9000, 12000, 15000],
                    format: d3.format('$,.0f')
                }
            },
            x: {
                // type: 'timeseries',
                padding: {
                    right: 0,
                    left: 0
                },
                tick: {
                    count: 4,
                    values: [1999, 2003, 2011, 2018],
                    multiline: false,
                }
            }
        },
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      }
    });
}

chartCollege();


//college debt chart
function chartDebt() {
    var padding = {
        top: 0,
        right: 60,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartDebt",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018],
                ['Rate', 485,null,568,null,802,null,1022,null,1216,null,1740,null,1389,null,1592,null,1383,1363,null,null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1f')
                }
            }
        },
       line: {
             connectNull: true
         },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2016) { return 6; } }
        },
        color: {
            pattern: ['#333333']
        },
        axis: {
            // rotated: true,
            y: {
                max: 2000,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 500, 1000, 1500, 2000],
                    format: d3.format('$,.0f')
                }
            },
            x: {
                // type: 'timeseries',
                padding: {
                    right: 0,
                    left: 0
                },
                tick: {
                    count: 4,
                    values: [1999, 2003, 2011, 2018],
                    multiline: false,
                }
            }
        },
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      }
    });
}

chartDebt();

//test scores chart
function chartTestScores() {
    var padding = {
        top: 0,
        right: 60,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartTestScores",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ['8th Grade Math', null, null, null, null, null, null, null, 0.57,0.59,0.58,0.60,0.59,0.53,0.62,0.59,0.60,0.58,0.58, null, null],
                ['3rd Grade Reading', null, null, null, null, null, null, null, 0.82,0.80,0.79,0.78,0.76,0.79,0.80,0.57,0.58,0.59,0.57,0.57, null, null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1f')
                }
            }
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2016) { return 6; } }
        },
        color: {
            pattern: ['#333333', '#cccccc']
        },
        axis: {
            // rotated: true,
            y: {
                max: 1,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 0.25, 0.50, 0.75, 1],
                    format: d3.format('%.0f')
                }
            },
            x: {
                // type: 'timeseries',
                padding: {
                    right: 0,
                    left: 0
                },
                tick: {
                    count: 4,
                    values: [1999, 2003, 2011, 2018],
                    multiline: false,
                }
            }
        },
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' + '<div>' + d[0].x + '</div>' + '<span class="tooltip-label">' + d[1].id + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[1].value) + '</span>' +
            '</div><div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].id + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      }
    });
}

chartTestScores();


//budget chart
function chartBudget() {
    var padding = {
        top: 0,
        right: 60,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartBudget",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ['Rate', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1f')
                }
            }
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2015) { return 6; } }
        },
        color: {
            pattern: ['#333333']
        },
        axis: {
            // rotated: true,
            y: {
                max: 50,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 25, 50],
                    format: d3.format(',.1f')
                }
            },
            x: {
                // type: 'timeseries',
                padding: {
                    right: 0,
                    left: 0
                },
                tick: {
                    count: 4,
                    values: [1999, 2005, 2011, 2018],
                    multiline: false,
                }
            }
        },
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      }
    });
}

chartBudget();


//commute time
function chartCommute() {
    var padding = {
        top: 0,
        right: 60,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartCommute",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ['Rate', 76729,80902,84119,86194,88549,90756,92387,94028,94962,95024,89757,92707,95261,96869,98477,99710,null,null, null, null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1f')
                }
            }
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2014) { return 6; } }
        },
        color: {
            pattern: ['#333333']
        },
        axis: {
            // rotated: true,
            y: {
                max: 125000,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 25000, 50000, 75000, 100000, 125000],
                    format: d3.format(',.0f')
                }
            },
            x: {
                // type: 'timeseries',
                padding: {
                    right: 0,
                    left: 0
                },
                tick: {
                    count: 4,
                    values: [1999, 2003, 2011, 2018],
                    multiline: false,
                }
            }
        },
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      }
    });
}

chartCommute();

//pavement quality
function chartPavement() {
    var padding = {
        top: 0,
        right: 60,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartPavement",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ['Principle PRQI', null,null,null,0.02,0.026,0.027,0.026,0.026,0.034,0.055,0.037,0.048,0.043,0.040,0.040,0.048,0.057,null,null,null],
                ['Non-principle PRQI', null,null,null,0.024,0.043,0.049,0.048,0.052,0.065,0.059,0.085,0.068,0.086,0.096,0.101,0.102,0.112,null,null,null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1f')
                }
            }
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2015) { return 6; } }
        },
        color: {
            pattern: ['#333333','#CCCCCC']
        },
        axis: {
            // rotated: true,
            y: {
                max: 0.20,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 0.05, 0.10, 0.15, 0.20],
                    format: d3.format('%.1f')
                }
            },
            x: {
                // type: 'timeseries',
                padding: {
                    right: 0,
                    left: 0
                },
                tick: {
                    count: 4,
                    values: [1999, 2003, 2011, 2018],
                    multiline: false,
                }
            }
        },
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' + '<div>' + d[0].x + '</div>' + '<span class="tooltip-label">' + d[1].id + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[1].value) + '</span>' +
            '</div><div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].id + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      }
    });
}

chartPavement();



    $(".topbar .gop").width($(".c3-region.gop:first rect").width() - 2);
    $(".topbar .ind").width($(".c3-region.ind:first rect").width());
    $(".topbar .dfl").width($(".c3-region.dfl:first rect").width() - 3);

// $( window ).resize(function() {
//     console.log($(".c3-region.ind:first rect").width());
//     console.log($(".c3-region.gop:first rect").width());
//     console.log($(".c3-region.dfl:first rect").width());
//     $(".topbar .gop").width($(".c3-region.gop:first rect").width());
//     $(".topbar .ind").width($(".c3-region.ind:first rect").width());
//     $(".topbar .dfl").width($(".c3-region.dfl:first rect").width());
// });

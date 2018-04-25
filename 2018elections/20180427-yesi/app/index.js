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
utilsFn({ });

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
} else {
	$(".slide").show();
}

  function chartAge() {

         var  padding = {
                top: 20,
                right: 60,
                bottom: 20,
                left: 40,
            };

        var chartAge = c3.generate({
              bindto: "#chartAge",
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
                tooltip: {
                    show: false
                },
                    color: {
                      pattern: ['#D7C4E5','#B191C9','#8B62A8','#6D3F8E','#542675']
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

      d3.selectAll(".c3-target-18-to-24")
          .selectAll(".c3-bar, .c3-texts")
          .attr("transform", "translate(-20, 0)");

      d3.selectAll(".c3-target-25-to-34")
          .selectAll(".c3-bar, .c3-texts")
          .attr("transform", "translate(-10, 0)");

      d3.selectAll(".c3-target-45-to-64")
          .selectAll(".c3-bar, .c3-texts")
          .attr("transform", "translate(10, 0)");

      d3.selectAll(".c3-target-65-")
          .selectAll(".c3-bar, .c3-texts")
          .attr("transform", "translate(20, 0)");

  }

  chartAge();

  function chartTrend(){

      var  padding = {
            top: 40,
            right: 20,
            bottom: 30,
            left: 40,
        };

      var chartTrend = c3.generate({
            bindto: '#chartTrend',
            padding: padding,
        data: {
            x: 'x',
            columns: [
                ["x",1986,1988,1990,1992,1994,1996,1998,2000,2002,2004,2006,2008,2010,2012,2014,2016,2018],
                ["Presidential",null,0.36,null,0.43,null,0.33,null,0.35,null,0.45,null,0.48,null,0.41,null,0.43,null],
                ["Midterm",0.21,null,0.20,null,0.21,null,0.18,null,0.18,null,0.20,null,0.20,null,0.16,null]
            ],
            type: 'line'
        },
        legend: {
          show:false
        },
       line: {
             connectNull: true
         },
        point: {
            show: true,
            r: function(d) { if (d.x == 2016 || d.x == 2014) { return 6;} else { return 1; } }
        },
        color:  { pattern: ['#8B62A8','#D7C4E5'] },
        axis: {
          y: {
              max: 1,
                min: 0,
                padding: {bottom: 0, top:0},
                tick: {
                 count: 4,
                 values: [0,0.25,0.50,0.75,1],
                 format: d3.format('%')
                }
            },
            x: {
               padding: {right: 0, left:0},
            tick: {
                // rotate: 75,
                multiline: false,
                values: [1972,1984,1996,2008,2018]
            }
        }
          },
        grid: {
          focus:{
                show:false
            },
            y: {
            lines: [
                  {value: 0.5, text: '', position: 'start', class:'powerline'}
            ]
            }
        }
      // tooltip: {
      //   contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
      //     return '<div class="chart-tooltip">' + '<div>' + d[0].x + '</div>' + '<span class="tooltip-label">' + d[1].id + ':</span>' +
      //       '<span class="tooltip-value">' + defaultValueFormat(d[1].value) + '</span>' +
      //       '</div><div class="chart-tooltip">' +
      //       '<span class="tooltip-label">' + d[0].id + ':</span>' +
      //       '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
      //       '</div>';
      //   }
      // }
    });
}

  chartTrend();

  function chartVote() {

      var padding = {
          top: 20,
          right: 60,
          bottom: 20,
          left: 80,
      };

      var chartVote = c3.generate({
          bindto: "#chartVote",
          padding: padding,
          data: {
              columns: [
                  ['Clinton', 0.55,0.37,0.41,0.64,0.43,0.83,0.7],
                  ['Trump', 0.37,0.53,0.5,0.26,0.48,0.09,0.24],
                  ['Other', 0.08,0.1,0.09,0.1,0.09,0.08,0.06]
              ],
              type: 'bar',
              // labels: {
              //     format: {
              //         'CLINTON': d3.format('%'),
              //         'TRUMP': d3.format('%')
              //     }
              // },
              groups: [
                  ['Trump', 'Other', 'Clinton']
              ],
              order: null
          },
          legend: {
              show: false
          },
          bar: {
              width: {
                  ratio: 0.6
              }
          },
          tooltip: {
              // show: false
          },
          color: {
              pattern: ['#3580A3','#C22A22','#CCCCCC']
          },
          axis: {
              rotated: true,
              y: {
                  max: 1,
                  min: 0,
                  padding: {
                      bottom: 0,
                      top: 0
                  },
                  tick: {
                      count: 4,
                      values: [0, 0.25, 0.50, 0.75, 1],
                      format: d3.format('%')
                  }
              },
              x: {
                  type: 'category',
                  categories: ['Overall', 'Rural', 'Suburban', 'Cities >50k', 'White', 'Black', 'Latino',],
                  tick: {
                    multiline: false
                  }
              }
          }
          // grid: {
          //     y: {
          //         lines: [{
          //             value: 0.5,
          //             text: '',
          //             position: 'start',
          //             class: 'powerline'
          //         }]
          //     }
          // }

      });

  }

  chartVote();

$("#top1").height($("#top2").height()-31);


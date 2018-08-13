import * as d3 from 'd3';


class BarChart { 

  render() {
      var padding = {
          top: -10,
          right: 60,
          bottom: 0,
          left: 60,
      };

      var chartCompare = c3.generate({
          bindto: '#chartCompare',
          padding: padding,
          data: {
              columns: [
                  ['Presidential', 15, 16, 1, -9, 31, 26, -31, -55],
                  ['Congressional', -1, -1, 2, 14, -6, 43, -47, -32]
              ],
              type: 'bar',
              groups: [
                  ['Presidential', 'Congressional']
              ],
              colors: {
                  'Presidential': function(d) { return d.value < 0 ? '#3f88c5' : '#A52129'; },
                  'Congressional': function(d) { return d.value < 0 ? '#ABCEE8' : '#C68985'; },
              },
              labels: {
                  format: {
                      // 'Presidential': d3.format('%'),
                      // 'Congressional': d3.format('%')
                  }
              }
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
              show: false
          },
          color: {
              pattern: ['#A52129']
          },
          axis: {
              rotated: true,
              y: {
                show: false,
                  max: 100,
                  min: -100,
                  padding: {
                      bottom: 0,
                      top: 0
                  },
                  tick: {
                      count: 4,
                      values: [-100, -50, 0, 50, 100],
                    format: function (d) {
                        if (d < 0) {
                            return "D+" + (d * -1);
                        } else if (d > 0) {
                            return "R+" + (d * 1);
                        } else if (d == 0) {
                            return "EVEN";
                        }
                    }
                  }
              },
              x: {
                show:false,
                  type: 'category',
                  categories: ['MN1','MN8','MN2','MN3','MN7','MN6','MN4','MN5']
              }
          },
          grid: {
              y: {
                  lines: [{
                      value: 0,
                      text: '',
                      position: 'start',
                      class: 'powerline'
                  }]
              }
          }

      });
  }
}

export { BarChart as default }
d3.json("./data/pollster.json", function(error, dataLoad) {

var data = dataLoad.pollster;

$(".filter").click(function()  { 
  $(".filter").removeClass("selected3");
  $(this).addClass("selected3");
});

$("#mn").click(function()  { 
  $(".poll").hide();
  $("#mnpolls").show();
});

$("#us").click(function()  { 
  $(".poll").hide();
  $("#uspolls").show();
});

$(".th").click(function() {
  $(".th").removeClass("selected");
  $(this).addClass("selected");
  if ($(this).hasClass("toggled")) { $(this).removeClass("toggled"); var sorted = "ascend"; }
  else if ($(this).hasClass("selected")) { $(this).addClass("toggled"); var sorted ="descend"; } 
  tableSort("#pollTable",data,$(this).attr("data"),sorted);
  tableSort("#pollTableUS",data,$(this).attr("data"),sorted);
});

//SELECTION TABLES
function tableSort(container,data,column,sorted){
   
  d3.select(container).selectAll(".card").sort(function(a, b) {
          if (column == "pollster") { 
        if (sorted == "descend") { return d3.descending(a.pollster, b.pollster); }
        if (sorted == "ascend") { return d3.ascending(a.pollster, b.pollster); }
     }
          if (column == "updated") { 
        if (sorted == "descend") { return d3.descending(a.index, b.index); }
        if (sorted == "ascend") { return d3.ascending(a.index, b.index); }
     }
          if (column == "clinton") { 
        if (sorted == "descend") { return d3.descending(a.clinton, b.clinton); }
        if (sorted == "ascend") { return d3.ascending(a.clinton, b.clinton); }
     }
          if (column == "trump") { 
        if (sorted == "descend") { return d3.descending(a.trump, b.trump); }
        if (sorted == "ascend") { return d3.ascending(a.trump, b.trump); }
     }
          if (column == "undecided") { 
        if (sorted == "descend") { return d3.descending(a.undecided, b.undecided); }
        if (sorted == "ascend") { return d3.ascending(a.undecided, b.undecided); }
     }
          if (column == "observations") { 
        if (sorted == "descend") { return d3.descending(a.observations, b.observations); }
        if (sorted == "ascend") { return d3.ascending(a.observations, b.observations); }
     }
          if (column == "spread") { 
        if (sorted == "descend") { return d3.descending(a.spread, b.spread); }
        if (sorted == "ascend") { return d3.ascending(a.spread, b.spread); }
     }
          if (column == "mode") { 
        if (sorted == "descend") { return d3.descending(a.mode, b.mode); }
        if (sorted == "ascend") { return d3.ascending(a.mode, b.mode); }
     }
    }).transition().duration(500);
}

function spillPolls(container, data){
d3.select(container).selectAll(".card")
  .data(data.sort(function(a, b) { return d3['descending'](a.entry_date, b.entry_date); })).enter().append("div")
  .attr("class",function(d) { return "card"; })
  .html(function(d){ 
     var color_scaleD = d3.scale.linear().domain([0, 1]).range(['#ABCEE8', '#3f88c5']);
     var color_scaleR = d3.scale.linear().domain([0, 1]).range(['#C68985', '#8C1B17']);
     var color_scaleU = d3.scale.linear().domain([0, 1]).range(['#CCC', '#636363']);
     var color_scaleO = d3.scale.linear().domain([0, 1]).range(['#C7E5B5', '#118241']);

     if (d.spread < 0) { var pColor = '#8C1B17'; var spread = d3.format("+.0f")(d.spread * -1) + " Trump" }
     else if (d.spread == 0) { var pColor = '#aaaaaa'; var spread = "EVEN"; }
     else { var pColor = '#3F88C5'; var spread = d3.format("+.0f")(d.spread) + " Clinton" }

    return "<div class='cell first'><a href='" + d.source_url + "' target='new_'>" + d.pollster + "</a></div><div class='cell kill first'>" + d3.time.format("%m/%d/%Y")(new Date(d.start_date)) + "-" + d3.time.format("%m/%d/%Y")(new Date(d.end_date)) + "</div><div class='cell kill'>" + d.observations + " " + d.population + "</div><div class='cell kill'>" + d.mode + "</div><div class='cell major' style='background-color:" + color_scaleD(d.clinton) + "'>" + d3.format("%")(d.clinton) + "</div><div class='cell major' style='background-color:" + color_scaleR(d.trump) + "'>" + d3.format("%")(d.trump) + "</div><div class='cell major' style='background-color:" + color_scaleU(d.undecided) + "'>" + d3.format("%")(d.undecided) + "</div><div class='cell kill spread' style='color:" + pColor + "'>" + spread + "</div>";
  });

     $('#filter_box, #filter_box2').keyup(function(i){
        $('.card').hide();
        var txt = $(this).val();
        $('.card').each(function(){
           if($(this).text().toUpperCase().indexOf(txt.toUpperCase()) != -1){
               $(this).show();
           }
        });
    });
}


function spillChart(container, data, filter){
var clintonAxis = [];
var trumpAxis = [];
var uAxis = [];
var oAxis = [];
var clintonNum = [];
var trumpNum = [];
var clintonLine = [];
var trumpLine = [];
var uNum = [];
var oNum = [];

clintonAxis[0] = 'clinton_x';
trumpAxis[0] = 'trump_x';
uAxis[0] = 'u_x';
oAxis[0] = 'o_x';
clintonNum[0] = 'Clinton';
trumpNum[0] = 'Trump';
uNum[0] = 'Undecided/Other';
oNum[0] = 'Other';

var index = 1;

for (var i=0; i < data.length; i++){
  // if (data[i].pollster != "Google Consumer Surveys" && data[i].observations >= 500){
  if (data[i].pollster == filter){
  clintonAxis[index] = new Date(data[i].entry_date); //d3.time.format("%m-%d-%Y")(new Date(data[i].entry_date));
  trumpAxis[index] = d3.time.format("%m-%d-%Y")(new Date(data[i].entry_date));
  uAxis[index] = d3.time.format("%m-%d-%Y")(new Date(data[i].entry_date));
  oAxis[index] = d3.time.format("%m-%d-%Y")(new Date(data[i].entry_date));
  clintonNum[index] = data[i].clinton;
  trumpNum[index] = data[i].trump;
  uNum[index] = data[i].undecided;
  oNum[index] = data[i].other;
  index++;
 }
}

var  padding = {
        top: 20,
        right: 30,
        bottom: 20,
        left: 40,
    };

var chart = c3.generate({
      bindto: container,
      padding: padding,
      point: {
        r: 3
    },
    data: {
        x: 'clinton_x',
        colors:  { 
          'Clinton': "#3F88C5",
          'Trump': "#8C1B17",
          'Undecided/Other': "#888888"
        },
        columns: [
            clintonAxis,
            clintonNum,
            trumpNum,
            uNum
        ],
        type: 'line'
    },
    axis: {
      y: {
            max: 0.55,
            min: 0,
            padding: {bottom: 0, top:0},
            tick: {
             count: 3,
             values: [0,0.25,0.55],
             format: d3.format('%')
            }
        },
        x: {
            type: 'timeseries',
            // categories: ['Contributions'],
            tick: {
                format: "%m-%d-%Y",
                count: 3,
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
              text, i, title, value, name, bgcolor;
          for (i = 0; i < d.length; i++) {
              if (! (d[i] && (d[i].value || d[i].value === 0))) { continue; }

              if (! text) {
                  title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                  text = "<table class='" + $$.CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
              }

              var pollster = "";

              name = nameFormat(d[i].name);
              value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
              bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);

              // console.log(title);

              for (var k=0; k < data.length; k++){
                if (d3.time.format("%m-%d-%Y")(new Date(data[k].entry_date)) == title){
                  // pollster = "<td class='value pollster' colspan='2'>" + data[k].pollster + " (" + data[k].mode + ")</td>";
                  break;
                }
              }

              if (name != "Undecided/Other") { pollster = ""; }

              text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "'>";
              text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
              text += "<td class='value'>" + value + "</td>";
              text += "</tr><tr>";
              text +=  pollster;
              text += "</tr>";
              
          }
          return text + "</table>";
      }
    }
});

      $("#clintonMN").html(d3.format("%")(data[data.length-1].clinton));
      $("#trumpMN").html(d3.format("%")(data[data.length-1].trump));
      $("#otherMN").html(d3.format("%")(data[data.length-1].undecided));

}

spillChart("#stribChart", data, "Star Tribune Minnesota Poll");
spillChart("#irChart", data, "Ipsos/Reuters");
spillChart("#mcChart", data, "Morning Consult");
spillChart("#gcsChart", data, "Google Consumer Surveys");
spillChart("#wapoChart", data, "UPI/CVOTER International");
spillChart("#kstpChart", data, "SurveyUSA/KSTP-TV");
spillPolls("#pollTable", data);
});
$(document).ready(function(){
    $("#rzip").hide();
    $("#dzip").hide();

    $("#franken").addClass("selected");
  $("#franken").click(function(){
    $("#dzip").hide();
    $("#rzip").hide();
    $("#rleg").hide();
    $("#mcfadden").removeClass("selected");
    $("#map2").show();
    $("#map").show();
    $("#rleg").show();
    $("#dleg").show();
    $("#num1").show();
    $("#num2").show();
    $("#dtotal").show();
    $("#franken").addClass("selected");
  });
  $("#mcfadden").click(function(){
    $("#map2").hide();
    $("#dzip").show();
    $("#dleg").hide();
    $("#franken").removeClass("selected");
    $("#map").hide();
    $("#rzip").show();
    $("#rleg").hide();
    $("#num1").hide();
    $("#num2").hide();
    $("#dleg").hide();
    $("#rtotal").show();
    $("#mcfadden").addClass("selected");
  });
  $("rect #MNd").click(function(){
    $("#dzip").hide();
    $("#num1").show();
  });
  $("rect #MNr").click(function(){
    $("#rzip").hide();
    $("#num2").show();
  });
});

var aspect = 440 / 300, chart = $("#map svg");
$(window).on("resize", function() {   
  var targetWidth = chart.parent().width();   
  chart.attr("width", targetWidth);   
  chart.attr("height", targetWidth / aspect);
});

var aspect2 = 440 / 300, chart2 = $("#map2 svg");
$(window).on("resize", function() {   
  var targetWidth = chart2.parent().width();   
  chart2.attr("width", targetWidth);   
  chart2.attr("height", targetWidth / aspect);
});

$(window).on("load", function() {   
  var targetWidth = chart.parent().width();   
  chart.attr("width", targetWidth);   
  chart.attr("height", targetWidth / aspect);
});


$(window).on("load", function() {   
  var targetWidth = chart2.parent().width();   
  chart2.attr("width", targetWidth);   
  chart2.attr("height", targetWidth / aspect);
});

//FRANKEN DONATION MAP
$(document).ready(function() {
    cartogram6.init();
});

var cartogram6 = {
    margin: {
        top: 40,
        right: 180,
        bottom: 0,
        left: 50
    },

    selector: '#map2 svg',

    init: function() {
        var self = this;

        self.$el = $(self.selector);

        self.width = 600 - self.margin.left - self.margin.right;
        self.height = 500 - self.margin.top - self.margin.bottom;

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
            .data(self.state_pos_co22)
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
            .attr('height', self.state_size)
            .call(d3.helper.tooltip(
        function(d, i){
          return "<div><strong>" + d.state_full + "</strong></div><div>" + d.state_total + " in contributions</div>";
       }
        ));

        var text = states.append('text')
            .attr('class', 'state-label')
            .attr('class', function(d) {
                return d.color;
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
            })
            .call(d3.helper.tooltip(
        function(d, i){
          return "<div><strong>" + d.state_full + "</strong></div><div>" + d.state_total + " in contributions</div>";
       }
        ));
    },

    state_pos_co22:  [{'state_full':'Alabama','state_postal':'AL','row':5,'column':6,'state_total':'$10,295','color':'dq1'},
        {'state_full':'Alaska','state_postal':'AK','row':6,'column':0,'state_total':'$6,387','color':'dq1'},
        {'state_full':'Arizona','state_postal':'AZ','row':4,'column':1,'state_total':'$96,491','color':'dq4'},
        {'state_full':'Arkansas','state_postal':'AR','row':4,'column':4,'state_total':'$2,600','color':'dq1'},
        {'state_full':'California','state_postal':'CA','row':2,'column':0,'state_total':'$646,819','color':'dq5'},
        {'state_full':'Colorado','state_postal':'CO','row':3,'column':2,'state_total':'$75,967','color':'dq3'},
        {'state_full':'Connecticut','state_postal':'CT','row':2,'column':9,'state_total':'$58,739','color':'dq3'},
        {'state_full':'D.C.','state_postal':'DC','row':4,'column':8,'state_total':'$448,500','color':'dq5'},
        {'state_full':'Delaware','state_postal':'DE','row':3,'column':9,'state_total':'$8,652','color':'dq1'},
        {'state_full':'Florida','state_postal':'FL','row':6,'column':8,'state_total':'$135,729','color':'dq2'},
        {'state_full':'Georgia','state_postal':'GA','row':5,'column':7,'state_total':'$24,664','color':'dq1'},
        {'state_full':'Hawaii','state_postal':'HI','row':6,'column':-1,'state_total':'$9,928','color':'dq1'},
        {'state_full':'Idaho','state_postal':'ID','row':1,'column':1,'state_total':'$8,173','color':'dq1'},
        {'state_full':'Illinois','state_postal':'IL','row':1,'column':6,'state_total':'$131,465','color':'dq4'},
        {'state_full':'Indiana','state_postal':'IN','row':2,'column':5,'state_total':'$14,571','color':'dq1'},
        {'state_full':'Iowa','state_postal':'IA','row':2,'column':4,'state_total':'$29,460','color':'dq2'},
        {'state_full':'Kansas','state_postal':'KS','row':4,'column':3,'state_total':'$17,952','color':'dq1'},
        {'state_full':'Kentucky','state_postal':'KY','row':3,'column':5,'state_total':'$12,792','color':'dq1'},
        {'state_full':'Louisiana','state_postal':'LA','row':5,'column':4,'state_total':'$13,741','color':'dq1'},
        {'state_full':'Maine','state_postal':'ME','row':-1,'column':10,'state_total':'$13,508','color':'dq1'},
        {'state_full':'Maryland','state_postal':'MD','row':3,'column':8,'state_total':'$133,228','color':'dq4'},
        {'state_full':'Massachusetts','state_postal':'MA','row':1,'column':9,'state_total':'$154,282','color':'dq5'},
        {'state_full':'Michigan','state_postal':'MI','row':1,'column':7,'state_total':'$74,118','color':'dq3'},
        {'state_full':'Minnesota','state_postal':'MN','row':1,'column':4,'state_total':'$2,324,780','color':'dq7'},
        {'state_full':'Mississippi','state_postal':'MS','row':5,'column':5,'state_total':'$1,930','color':'dq1'},
        {'state_full':'Missouri','state_postal':'MO','row':3,'column':4,'state_total':'$38,645','color':'dq2'},
        {'state_full':'Montana','state_postal':'MT','row':1,'column':2,'state_total':'$9,780','color':'dq1'},
        {'state_full':'Nebraska','state_postal':'NE','row':3,'column':3,'state_total':'$17,611','color':'dq1'},
        {'state_full':'Nevada','state_postal':'NV','row':2,'column':1,'state_total':'$23,354','color':'dq1'},
        {'state_full':'New Hampshire','state_postal':'NH','row':0,'column':10,'state_total':'$20,023','color':'dq1'},
        {'state_full':'New Jersey','state_postal':'NJ','row':2,'column':8,'state_total':'$81,588,752','color':'dq3'},
        {'state_full':'New Mexico','state_postal':'NM','row':4,'column':2,'state_total':'$27,306','color':'dq1'},
        {'state_full':'New York','state_postal':'NY','row':1,'column':8,'state_total':'$346,590','color':'dq5'},
        {'state_full':'North Carolina','state_postal':'NC','row':4,'column':6,'state_total':'$32,563','color':'dq2'},
        {'state_full':'North Dakota','state_postal':'ND','row':1,'column':3,'state_total':'$17,132','color':'dq1'},
        {'state_full':'Ohio','state_postal':'OH','row':2,'column':6,'state_total':'$74,752','color':'dq4'},
        {'state_full':'Oklahoma','state_postal':'OK','row':5,'column':3,'state_total':'$16,972','color':'dq1'},
        {'state_full':'Oregon','state_postal':'OR','row':1,'column':0,'state_total':'$77,959','color':'dq3'},
        {'state_full':'Pennsylvania','state_postal':'PA','row':2,'column':7,'state_total':'$98,622','color':'dq4'},
        {'state_full':'Rhode Island','state_postal':'RI','row':2,'column':10,'state_total':'$16,000','color':'dq3'},
        {'state_full':'South Carolina','state_postal':'SC','row':4,'column':7,'state_total':'$14,210','color':'dq1'},
        {'state_full':'South Dakota','state_postal':'SD','row':2,'column':3,'state_total':'$23,025','color':'dq2'},
        {'state_full':'Tennessee','state_postal':'TN','row':4,'column':5,'state_total':'$16,383','color':'dq1'},
        {'state_full':'Texas','state_postal':'TX','row':6,'column':3,'state_total':'$150,383','color':'dq4'},
        {'state_full':'Utah','state_postal':'UT','row':3,'column':1,'state_total':'$4,648','color':'dq1'},
        {'state_full':'Vermont','state_postal':'VT','row':0,'column':9,'state_total':'$21,163','color':'dq1'},
        {'state_full':'Virginia','state_postal':'VA','row':3,'column':7,'state_total':'$112,117','color':'dq4'},
        {'state_full':'Washington','state_postal':'WA','row':0,'column':0,'state_total':'$112,617','color':'dq4'},
        {'state_full':'West Virginia','state_postal':'WV','row':3,'column':6,'state_total':'$4,206','color':'dq1'},
        {'state_full':'Wisconsin','state_postal':'WI','row':1,'column':5,'state_total':'$54,452','color':'dq3'},
        {'state_full':'Wyoming','state_postal':'WY','row':2,'column':2,'state_total':'$2,049','color':'dq1'}]

};

//MCFADDEN DONATION MAP
$(document).ready(function() {
    cartogram5.init();
});

var cartogram5 = {
    margin: {
        top: 40,
        right: 180,
        bottom: 0,
        left: 50
    },

    selector: '#map svg',

    init: function() {
        var self = this;

        self.$el = $(self.selector);

        self.width = 600 - self.margin.left - self.margin.right;
        self.height = 500 - self.margin.top - self.margin.bottom;

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
            .data(self.state_pos_co)
            .enter().append('g')
            .attr('class', 'state-groups');

        var state = states.append('rect')
            .attr('id', function(d) {
                return d.state_postal + "r";
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
            .attr('height', self.state_size)
            .call(d3.helper.tooltip(
        function(d, i){
          return "<div><strong>" + d.state_full + "</strong></div><div>" + d.state_total + " in contributions</div>";
       }
        ));

        var text = states.append('text')
            .attr('class', 'state-label')
            .attr('class', function(d) {
                return d.color;
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
            })
            .call(d3.helper.tooltip(
        function(d, i){
          return "<div><strong>" + d.state_full + "</strong></div><div>" + d.state_total + " in contributions</div>";
       }
        ));
    },

    state_pos_co:  [{'state_full':'Alabama','state_postal':'AL','row':5,'column':6,'state_total':'$1,776','color':'rq1'},
        {'state_full':'Alaska','state_postal':'AK','row':6,'column':0,'state_total':'$11,125','color':'rq1'},
        {'state_full':'Arizona','state_postal':'AZ','row':4,'column':1,'state_total':'$20,500','color':'rq2'},
        {'state_full':'Arkansas','state_postal':'AR','row':4,'column':4,'state_total':'$2,600','color':'rq1'},
        {'state_full':'California','state_postal':'CA','row':2,'column':0,'state_total':'$78,650','color':'rq3'},
        {'state_full':'Colorado','state_postal':'CO','row':3,'column':2,'state_total':'$12,600','color':'rq1'},
        {'state_full':'Connecticut','state_postal':'CT','row':2,'column':9,'state_total':'$27,400','color':'rq2'},
        {'state_full':'D.C.','state_postal':'DC','row':4,'column':8,'state_total':'$17,150','color':'rq1'},
        {'state_full':'Delaware','state_postal':'DE','row':3,'column':9,'state_total':'$0','color':'none'},
        {'state_full':'Florida','state_postal':'FL','row':6,'column':8,'state_total':'$147,300','color':'rq4'},
        {'state_full':'Georgia','state_postal':'GA','row':5,'column':7,'state_total':'$6,950','color':'rq1'},
        {'state_full':'Hawaii','state_postal':'HI','row':6,'column':-1,'state_total':'$0','color':'none'},
        {'state_full':'Idaho','state_postal':'ID','row':1,'column':1,'state_total':'$10,900','color':'rq1'},
        {'state_full':'Illinois','state_postal':'IL','row':1,'column':6,'state_total':'$166,297','color':'rq4'},
        {'state_full':'Indiana','state_postal':'IN','row':2,'column':5,'state_total':'$2,400','color':'rq1'},
        {'state_full':'Iowa','state_postal':'IA','row':2,'column':4,'state_total':'$2,500','color':'rq1'},
        {'state_full':'Kansas','state_postal':'KS','row':4,'column':3,'state_total':'$6,455','color':'rq1'},
        {'state_full':'Kentucky','state_postal':'KY','row':3,'column':5,'state_total':'$9,375','color':'rq1'},
        {'state_full':'Louisiana','state_postal':'LA','row':5,'column':4,'state_total':'$1,250','color':'rq1'},
        {'state_full':'Maine','state_postal':'ME','row':-1,'column':10,'state_total':'$0','color':'none'},
        {'state_full':'Maryland','state_postal':'MD','row':3,'column':8,'state_total':'$8,150','color':'rq1'},
        {'state_full':'Massachusetts','state_postal':'MA','row':1,'column':9,'state_total':'$11,400','color':'rq2'},
        {'state_full':'Michigan','state_postal':'MI','row':1,'column':7,'state_total':'$67,550','color':'rq3'},
        {'state_full':'Minnesota','state_postal':'MN','row':1,'column':4,'state_total':'$2,208,134','color':'rq7'},
        {'state_full':'Mississippi','state_postal':'MS','row':5,'column':5,'state_total':'$0','color':'rq1'},
        {'state_full':'Missouri','state_postal':'MO','row':3,'column':4,'state_total':'$36,450','color':'rq2'},
        {'state_full':'Montana','state_postal':'MT','row':1,'column':2,'state_total':'$11,400','color':'rq2'},
        {'state_full':'Nebraska','state_postal':'NE','row':3,'column':3,'state_total':'$83,775','color':'rq3'},
        {'state_full':'Nevada','state_postal':'NV','row':2,'column':1,'state_total':'$1,800','color':'rq1'},
        {'state_full':'New Hampshire','state_postal':'NH','row':0,'column':10,'state_total':'$500','color':'rq1'},
        {'state_full':'New Jersey','state_postal':'NJ','row':2,'column':8,'state_total':'$30,442','color':'rq2'},
        {'state_full':'New Mexico','state_postal':'NM','row':4,'column':2,'state_total':'$200','color':'rq1'},
        {'state_full':'New York','state_postal':'NY','row':1,'column':8,'state_total':'$146,850','color':'rq4'},
        {'state_full':'North Carolina','state_postal':'NC','row':4,'column':6,'state_total':'$8,950','color':'rq1'},
        {'state_full':'North Dakota','state_postal':'ND','row':1,'column':3,'state_total':'$475','color':'rq1'},
        {'state_full':'Ohio','state_postal':'OH','row':2,'column':6,'state_total':'$71,675','color':'rq3'},
        {'state_full':'Oklahoma','state_postal':'OK','row':5,'column':3,'state_total':'$3,850','color':'rq1'},
        {'state_full':'Oregon','state_postal':'OR','row':1,'column':0,'state_total':'$1,100','color':'rq1'},
        {'state_full':'Pennsylvania','state_postal':'PA','row':2,'column':7,'state_total':'$78,132','color':'rq3'},
        {'state_full':'Rhode Island','state_postal':'RI','row':2,'column':10,'state_total':'$3,100','color':'rq1'},
        {'state_full':'South Carolina','state_postal':'SC','row':4,'column':7,'state_total':'$0','color':'none'},
        {'state_full':'South Dakota','state_postal':'SD','row':2,'column':3,'state_total':'$4,250','color':'rq1'},
        {'state_full':'Tennessee','state_postal':'TN','row':4,'column':5,'state_total':'$6,750','color':'rq1'},
        {'state_full':'Texas','state_postal':'TX','row':6,'column':3,'state_total':'$112,300','color':'rq4'},
        {'state_full':'Utah','state_postal':'UT','row':3,'column':1,'state_total':'$6,450','color':'rq1'},
        {'state_full':'Vermont','state_postal':'VT','row':0,'column':9,'state_total':'$0','color':'none'},
        {'state_full':'Virginia','state_postal':'VA','row':3,'column':7,'state_total':'$20,490','color':'rq1'},
        {'state_full':'Washington','state_postal':'WA','row':0,'column':0,'state_total':'$3,000','color':'rq1'},
        {'state_full':'West Virginia','state_postal':'WV','row':3,'column':6,'state_total':'$28,200','color':'rq2'},
        {'state_full':'Wisconsin','state_postal':'WI','row':1,'column':5,'state_total':'$28,300','color':'rq2'},
        {'state_full':'Wyoming','state_postal':'WY','row':2,'column':2,'state_total':'$3,500','color':'rq1'}]

};

//TOOLTIP STUFF
d3.helper = {};

d3.helper.tooltip = function(accessor){
    return function(selection){
        var tooltipDiv;
        var bodyNode = d3.select('body').node();
        selection.on("mouseover", function(d, i){
            // Clean up lost tooltips
            d3.select('body').selectAll('div.tooltip').remove();
            // Append tooltip
            tooltipDiv = d3.select('body').append('div').attr('class', 'tooltip');
            var absoluteMousePos = d3.mouse(bodyNode);
            tooltipDiv.style('left', (absoluteMousePos[0] + 10)+'px')
                .style('top', (absoluteMousePos[1] - 15)+'px')
                .style('position', 'absolute') 
                .style('z-index', 1001);
            // Add text using the accessor function
            var tooltipText = accessor(d, i) || '';
            // Crop text arbitrarily
            //tooltipDiv.style('width', function(d, i){return (tooltipText.length > 80) ? '300px' : null;})
            //    .html(tooltipText);
        })
        .on('mousemove', function(d, i) {
            // Move tooltip
            var absoluteMousePos = d3.mouse(bodyNode);
            tooltipDiv.style('left', (absoluteMousePos[0] + 10)+'px')
                .style('top', (absoluteMousePos[1] - 15)+'px');
            var tooltipText = accessor(d, i) || '';
            tooltipDiv.html(tooltipText);
        })
        .on("mouseout", function(d, i){
            // Remove tooltip
            tooltipDiv.remove();
        });

    };
};
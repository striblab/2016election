//CARTOPOCALYPSE
var cartogram = [];

function cartoBuild(container, boxContainer, chartContainer, shape, race, dataCompare, geo, index, data){
cartogram[index] = {
    margin: {
        top: 40,
        right: 140,
        bottom: 0,
        left: 60
    },

    selector: container + ' svg',

    init: function() {
        var self = this;

        self.$el = $(self.selector);

        self.width = 600 - self.margin.left - self.margin.right; self.height = 400 - self.margin.top - self.margin.bottom;

       if (geo == "us") { self.width = 800 - self.margin.left - self.margin.right; self.height = 500 - self.margin.top - self.margin.bottom; }
       if (geo == "mn") { self.width = 600 - self.margin.left - self.margin.right; self.height = 400 - self.margin.top - self.margin.bottom; }
       if (geo == "metro") { self.width = 600 - self.margin.left - self.margin.right; self.height = 400 - self.margin.top - self.margin.bottom; }

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
                // return mapColor(d, race, dataCompare);
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
            .on('click', function(d) {
              d3.selectAll("rect").attr('class', function(d) {

                
            }); 
              d3.select(this).attr('class', function(d) {

            });
        });

        var text = states.append('text')
            .attr('class', 'state-label')
            .attr('class', function(d) {
                // return mapColor(d, race, dataCompare);
            })
            .attr('dominant-baseline', 'central')
            .attr('x', function(d) {
                return (d.column * (self.state_size + self.state_padding))
                        + self.state_size / 2; })
            .attr('y', function(d) {
                return (d.row * (self.state_size + self.state_padding))
                    + self.state_size / 2; })
            .style('text-anchor', 'middle')
            .on('click', function(d) { 
             d3.selectAll("rect").attr('class', function(d) {

            }); 
              d3.select(this.parentNode).select("rect").attr('class', function(d) {

            });
      })
            .text(function(d) {
                return d.state_postal;
            });
    },

    state_pos_co2: data

};

$(document).ready(function() {
cartogram[index].init();
});

}

function cartoData(race,geo){
var usCarto = [{'state_full':'Alabama','state_postal':'AL','row':5,'column':6,'state_total_old':'32','state_total_new':'25','state_change':'-63%','color':'dq1'},
        {'state_full':'Alaska','state_postal':'AK','row':6,'column':0,'state_total_old':'0','state_total_new':'0','state_change':'Insufficient data','color':'none'},
        {'state_full':'Arizona','state_postal':'AZ','row':4,'column':1,'state_total_old':'14','state_total_new':'36','state_change':'+36%','color':'dq7'},
        {'state_full':'Arkansas','state_postal':'AR','row':4,'column':4,'state_total_old':'36','state_total_new':'43','state_change':'-33%','color':'dq3'},
        {'state_full':'California','state_postal':'CA','row':3,'column':0,'state_total_old':'358','state_total_new':'267','state_change':'-25%','color':'dq3'},
        {'state_full':'Colorado','state_postal':'CO','row':3,'column':2,'state_total_old':'124','state_total_new':'93','state_change':'-33%','color':'dq3'},
        {'state_full':'Connecticut','state_postal':'CT','row':2,'column':9,'state_total_old':'0','state_total_new':'6','state_change':'Insufficient data','color':'none'},
        {'state_full':'D.C.','state_postal':'DC','row':4,'column':8,'state_total_old':'0','state_total_new':'0','state_change':'Insufficient data','color':'none'},
        {'state_full':'Delaware','state_postal':'DE','row':3,'column':9,'state_total_old':'3','state_total_new':'3','state_change':'-100%','color':'dq1'},
        {'state_full':'Florida','state_postal':'FL','row':6,'column':8,'state_total_old':'150','state_total_new':'136','state_change':'-14%','color':'dq4'},
        {'state_full':'Georgia','state_postal':'GA','row':5,'column':7,'state_total_old':'77','state_total_new':'59','state_change':'-38%','color':'dq3'},
        {'state_full':'Hawaii','state_postal':'HI','row':6,'column':-1,'state_total_old':'0','state_total_new':'11','state_change':'Insufficient data','color':'none'},
        {'state_full':'Idaho','state_postal':'ID','row':1,'column':1,'state_total_old':'71','state_total_new':'68','state_change':'-21%','color':'dq3'},
        {'state_full':'Illinois','state_postal':'IL','row':1,'column':6,'state_total_old':'251','state_total_new':'221','state_change':'-14%','color':'dq4'},
        {'state_full':'Indiana','state_postal':'IN','row':2,'column':5,'state_total_old':'216','state_total_new':'220','state_change':'0%','color':'mid'},
        {'state_full':'Iowa','state_postal':'IA','row':2,'column':4,'state_total_old':'228','state_total_new':'295','state_change':'+29%','color':'dq6'},
        {'state_full':'Kansas','state_postal':'KS','row':4,'column':3,'state_total_old':'215','state_total_new':'205','state_change':'-6%','color':'dq4'},
        {'state_full':'Kentucky','state_postal':'KY','row':3,'column':5,'state_total_old':'308','state_total_new':'162','state_change':'-49%','color':'dq2'},
        {'state_full':'Louisiana','state_postal':'LA','row':5,'column':4,'state_total_old':'30','state_total_new':'26','state_change':'-53%','color':'dq1'},
        {'state_full':'Maine','state_postal':'ME','row':-1,'column':10,'state_total_old':'0','state_total_new':'14','state_change':'Insufficient data','color':'none'},
        {'state_full':'Maryland','state_postal':'MD','row':3,'column':8,'state_total_old':'26','state_total_new':'27','state_change':'-46%','color':'dq2'},
        {'state_full':'Massachusetts','state_postal':'MA','row':1,'column':9,'state_total_old':'0','state_total_new':'11','state_change':'Insufficient data','color':'none'},
        {'state_full':'Michigan','state_postal':'MI','row':1,'column':7,'state_total_old':'102','state_total_new':'179','state_change':'+74%','color':'dq8'},
        {'state_full':'Minnesota','state_postal':'MN','row':1,'column':4,'state_total_old':'153','state_total_new':'210','state_change':'+37%','color':'dq7'},
        {'state_full':'Mississippi','state_postal':'MS','row':5,'column':5,'state_total_old':'65','state_total_new':'46','state_change':'-57%','color':'dq1'},
        {'state_full':'Missouri','state_postal':'MO','row':3,'column':4,'state_total_old':'264','state_total_new':'288','state_change':'+5%','color':'dq5'},
        {'state_full':'Montana','state_postal':'MT','row':1,'column':2,'state_total_old':'145','state_total_new':'139','state_change':'-10%','color':'dq4'},
        {'state_full':'Nebraska','state_postal':'NE','row':3,'column':3,'state_total_old':'199','state_total_new':'179','state_change':'-11%','color':'dq4'},
        {'state_full':'Nevada','state_postal':'NV','row':2,'column':1,'state_total_old':'0','state_total_new':'11','state_change':'Insufficient data','color':'none'},
        {'state_full':'New Hampshire','state_postal':'NH','row':0,'column':10,'state_total_old':'0','state_total_new':'4','state_change':'Insufficient data','color':'none'},
        {'state_full':'New Jersey','state_postal':'NJ','row':2,'column':8,'state_total_old':'8','state_total_new':'19','state_change':'+50%','color':'dq8'},
        {'state_full':'New Mexico','state_postal':'NM','row':4,'column':2,'state_total_old':'24','state_total_new':'14','state_change':'-100%','color':'dq1'},
        {'state_full':'New York','state_postal':'NY','row':1,'column':8,'state_total_old':'203','state_total_new':'135','state_change':'-38%','color':'dq3'},
        {'state_full':'North Carolina','state_postal':'NC','row':4,'column':6,'state_total_old':'156','state_total_new':'111','state_change':'-35%','color':'dq3'},
        {'state_full':'North Dakota','state_postal':'ND','row':1,'column':3,'state_total_old':'84','state_total_new':'117','state_change':'+36%','color':'dq7'},
        {'state_full':'Ohio','state_postal':'OH','row':2,'column':6,'state_total_old':'258','state_total_new':'217','state_change':'-18%','color':'dq4'},
        {'state_full':'Oklahoma','state_postal':'OK','row':5,'column':3,'state_total_old':'46','state_total_new':'53','state_change':'-30%','color':'dq3'},
        {'state_full':'Oregon','state_postal':'OR','row':2,'column':0,'state_total_old':'40','state_total_new':'61','state_change':'+20%','color':'dq6'},
        {'state_full':'Pennsylvania','state_postal':'PA','row':2,'column':7,'state_total_old':'276','state_total_new':'182','state_change':'-34%','color':'dq3'},
        {'state_full':'Rhode Island','state_postal':'RI','row':2,'column':10,'state_total_old':'0','state_total_new':'0','state_change':'Insufficient data','color':'none'},
        {'state_full':'South Carolina','state_postal':'SC','row':4,'column':7,'state_total_old':'16','state_total_new':'30','state_change':'+38%','color':'dq7'},
        {'state_full':'South Dakota','state_postal':'SD','row':2,'column':3,'state_total_old':'88','state_total_new':'108','state_change':'+17%','color':'dq6'},
        {'state_full':'Tennessee','state_postal':'TN','row':4,'column':5,'state_total_old':'244','state_total_new':'147','state_change':'-42%','color':'dq2'},
        {'state_full':'Texas','state_postal':'TX','row':6,'column':3,'state_total_old':'223','state_total_new':'159','state_change':'+29%','color':'dq3'},
        {'state_full':'Utah','state_postal':'UT','row':3,'column':1,'state_total_old':'24','state_total_new':'24','state_change':'-67%','color':'dq1'},
        {'state_full':'Vermont','state_postal':'VT','row':0,'column':9,'state_total_old':'7','state_total_new':'15','state_change':'-57%','color':'dq1'},
        {'state_full':'Virginia','state_postal':'VA','row':3,'column':7,'state_total_old':'130','state_total_new':'123','state_change':'-10%','color':'dq4'},
        {'state_full':'Washington','state_postal':'WA','row':1,'column':0,'state_total_old':'88','state_total_new':'63','state_change':'-39%','color':'dq3'},
        {'state_full':'West Virginia','state_postal':'WV','row':3,'column':6,'state_total_old':'9','state_total_new':'22','state_change':'0%','color':'mid'},
        {'state_full':'Wisconsin','state_postal':'WI','row':1,'column':5,'state_total_old':'279','state_total_new':'242','state_change':'-15%','color':'dq4'},
        {'state_full':'Wyoming','state_postal':'WY','row':2,'column':2,'state_total_old':'33','state_total_new':'37','state_change':'-21%','color':'dq3'}]

var usCDCarto = [{'state_full':'Alabama','state_postal':'AL','row':5,'column':6,'state_total_old':'32','state_total_new':'25','state_change':'-63%','color':'dq1'},
        {'state_full':'Alaska','state_postal':'AK','row':6,'column':0,'state_total_old':'0','state_total_new':'0','state_change':'Insufficient data','color':'none'},
        {'state_full':'Arizona','state_postal':'AZ','row':4,'column':1,'state_total_old':'14','state_total_new':'36','state_change':'+36%','color':'dq7'},
        {'state_full':'Arkansas','state_postal':'AR','row':4,'column':4,'state_total_old':'36','state_total_new':'43','state_change':'-33%','color':'dq3'},
        {'state_full':'California','state_postal':'CA','row':3,'column':0,'state_total_old':'358','state_total_new':'267','state_change':'-25%','color':'dq3'},
        {'state_full':'Colorado','state_postal':'CO','row':3,'column':2,'state_total_old':'124','state_total_new':'93','state_change':'-33%','color':'dq3'},
        {'state_full':'Connecticut','state_postal':'CT','row':2,'column':9,'state_total_old':'0','state_total_new':'6','state_change':'Insufficient data','color':'none'},
        {'state_full':'D.C.','state_postal':'DC','row':4,'column':8,'state_total_old':'0','state_total_new':'0','state_change':'Insufficient data','color':'none'},
        {'state_full':'Delaware','state_postal':'DE','row':3,'column':9,'state_total_old':'3','state_total_new':'3','state_change':'-100%','color':'dq1'},
        {'state_full':'Florida','state_postal':'FL','row':6,'column':8,'state_total_old':'150','state_total_new':'136','state_change':'-14%','color':'dq4'},
        {'state_full':'Georgia','state_postal':'GA','row':5,'column':7,'state_total_old':'77','state_total_new':'59','state_change':'-38%','color':'dq3'},
        {'state_full':'Hawaii','state_postal':'HI','row':6,'column':-1,'state_total_old':'0','state_total_new':'11','state_change':'Insufficient data','color':'none'},
        {'state_full':'Idaho','state_postal':'ID','row':1,'column':1,'state_total_old':'71','state_total_new':'68','state_change':'-21%','color':'dq3'},
        {'state_full':'Illinois','state_postal':'IL','row':1,'column':6,'state_total_old':'251','state_total_new':'221','state_change':'-14%','color':'dq4'},
        {'state_full':'Indiana','state_postal':'IN','row':2,'column':5,'state_total_old':'216','state_total_new':'220','state_change':'0%','color':'mid'},
        {'state_full':'Iowa','state_postal':'IA','row':2,'column':4,'state_total_old':'228','state_total_new':'295','state_change':'+29%','color':'dq6'},
        {'state_full':'Kansas','state_postal':'KS','row':4,'column':3,'state_total_old':'215','state_total_new':'205','state_change':'-6%','color':'dq4'},
        {'state_full':'Kentucky','state_postal':'KY','row':3,'column':5,'state_total_old':'308','state_total_new':'162','state_change':'-49%','color':'dq2'},
        {'state_full':'Louisiana','state_postal':'LA','row':5,'column':4,'state_total_old':'30','state_total_new':'26','state_change':'-53%','color':'dq1'},
        {'state_full':'Maine','state_postal':'ME','row':-1,'column':10,'state_total_old':'0','state_total_new':'14','state_change':'Insufficient data','color':'none'},
        {'state_full':'Maryland','state_postal':'MD','row':3,'column':8,'state_total_old':'26','state_total_new':'27','state_change':'-46%','color':'dq2'},
        {'state_full':'Massachusetts','state_postal':'MA','row':1,'column':9,'state_total_old':'0','state_total_new':'11','state_change':'Insufficient data','color':'none'},
        {'state_full':'Michigan','state_postal':'MI','row':1,'column':7,'state_total_old':'102','state_total_new':'179','state_change':'+74%','color':'dq8'},
        {'state_full':'Minnesota','state_postal':'MN','row':1,'column':4,'state_total_old':'153','state_total_new':'210','state_change':'+37%','color':'dq7'},
        {'state_full':'Mississippi','state_postal':'MS','row':5,'column':5,'state_total_old':'65','state_total_new':'46','state_change':'-57%','color':'dq1'},
        {'state_full':'Missouri','state_postal':'MO','row':3,'column':4,'state_total_old':'264','state_total_new':'288','state_change':'+5%','color':'dq5'},
        {'state_full':'Montana','state_postal':'MT','row':1,'column':2,'state_total_old':'145','state_total_new':'139','state_change':'-10%','color':'dq4'},
        {'state_full':'Nebraska','state_postal':'NE','row':3,'column':3,'state_total_old':'199','state_total_new':'179','state_change':'-11%','color':'dq4'},
        {'state_full':'Nevada','state_postal':'NV','row':2,'column':1,'state_total_old':'0','state_total_new':'11','state_change':'Insufficient data','color':'none'},
        {'state_full':'New Hampshire','state_postal':'NH','row':0,'column':10,'state_total_old':'0','state_total_new':'4','state_change':'Insufficient data','color':'none'},
        {'state_full':'New Jersey','state_postal':'NJ','row':2,'column':8,'state_total_old':'8','state_total_new':'19','state_change':'+50%','color':'dq8'},
        {'state_full':'New Mexico','state_postal':'NM','row':4,'column':2,'state_total_old':'24','state_total_new':'14','state_change':'-100%','color':'dq1'},
        {'state_full':'New York','state_postal':'NY','row':1,'column':8,'state_total_old':'203','state_total_new':'135','state_change':'-38%','color':'dq3'},
        {'state_full':'North Carolina','state_postal':'NC','row':4,'column':6,'state_total_old':'156','state_total_new':'111','state_change':'-35%','color':'dq3'},
        {'state_full':'North Dakota','state_postal':'ND','row':1,'column':3,'state_total_old':'84','state_total_new':'117','state_change':'+36%','color':'dq7'},
        {'state_full':'Ohio','state_postal':'OH','row':2,'column':6,'state_total_old':'258','state_total_new':'217','state_change':'-18%','color':'dq4'},
        {'state_full':'Oklahoma','state_postal':'OK','row':5,'column':3,'state_total_old':'46','state_total_new':'53','state_change':'-30%','color':'dq3'},
        {'state_full':'Oregon','state_postal':'OR','row':2,'column':0,'state_total_old':'40','state_total_new':'61','state_change':'+20%','color':'dq6'},
        {'state_full':'Pennsylvania','state_postal':'PA','row':2,'column':7,'state_total_old':'276','state_total_new':'182','state_change':'-34%','color':'dq3'},
        {'state_full':'Rhode Island','state_postal':'RI','row':2,'column':10,'state_total_old':'0','state_total_new':'0','state_change':'Insufficient data','color':'none'},
        {'state_full':'South Carolina','state_postal':'SC','row':4,'column':7,'state_total_old':'16','state_total_new':'30','state_change':'+38%','color':'dq7'},
        {'state_full':'South Dakota','state_postal':'SD','row':2,'column':3,'state_total_old':'88','state_total_new':'108','state_change':'+17%','color':'dq6'},
        {'state_full':'Tennessee','state_postal':'TN','row':4,'column':5,'state_total_old':'244','state_total_new':'147','state_change':'-42%','color':'dq2'},
        {'state_full':'Texas','state_postal':'TX','row':6,'column':3,'state_total_old':'223','state_total_new':'159','state_change':'+29%','color':'dq3'},
        {'state_full':'Utah','state_postal':'UT','row':3,'column':1,'state_total_old':'24','state_total_new':'24','state_change':'-67%','color':'dq1'},
        {'state_full':'Vermont','state_postal':'VT','row':0,'column':9,'state_total_old':'7','state_total_new':'15','state_change':'-57%','color':'dq1'},
        {'state_full':'Virginia','state_postal':'VA','row':3,'column':7,'state_total_old':'130','state_total_new':'123','state_change':'-10%','color':'dq4'},
        {'state_full':'Washington','state_postal':'WA','row':1,'column':0,'state_total_old':'88','state_total_new':'63','state_change':'-39%','color':'dq3'},
        {'state_full':'West Virginia','state_postal':'WV','row':3,'column':6,'state_total_old':'9','state_total_new':'22','state_change':'0%','color':'mid'},
        {'state_full':'Wisconsin','state_postal':'WI','row':1,'column':5,'state_total_old':'279','state_total_new':'242','state_change':'-15%','color':'dq4'},
        {'state_full':'Wyoming','state_postal':'WY','row':2,'column':2,'state_total_old':'33','state_total_new':'37','state_change':'-21%','color':'dq3'}]


var mnCountyCarto = [{'state_full':'Kittson','state_postal':'KITT','row':0,'column':0,'color_value':34},
        {'state_full':'Lake of the Woods','state_postal':'LW','row':-1,'column':1,'color_value':38},
        {'state_full':'Roseau','state_postal':'ROS','row':0,'column':1,'color_value':67},
        {'state_full':'Koochiching','state_postal':'KOO','row':0,'column':2,'color_value':35},
        {'state_full':'Saint Louis','state_postal':'STL','row':0,'column':3,'color_value':71},
        {'state_full':'Lake','state_postal':'LAKE','row':0,'column':4,'color_value':37},
        {'state_full':'Cook','state_postal':'COOK','row':0,'column':5,'color_value':15},
        {'state_full':'Marshall','state_postal':'MAR','row':1,'column':0,'color_value':43},
        {'state_full':'Beltrami','state_postal':'BEL','row':1,'column':1,'color_value':3},
        {'state_full':'Itasca','state_postal':'ITAS','row':1,'column':2,'color_value':30},
        {'state_full':'Aitkin','state_postal':'AITK','row':1,'column':3,'color_value':0},
        {'state_full':'Carlton','state_postal':'CARL','row':1,'column':4,'color_value':8},
        {'state_full':'Polk','state_postal':'POLK','row':2,'column':0,'color_value':59},
        {'state_full':'Pennington','state_postal':'PENN','row':2,'column':1,'color_value':56},
        {'state_full':'Red Lake','state_postal':'RL','row':2,'column':2,'color_value':62},
        {'state_full':'Clearwater','state_postal':'CW','row':2,'column':3,'color_value':14},
        {'state_full':'Hubbard','state_postal':'HUB','row':2,'column':4,'color_value':28},
        {'state_full':'Norman','state_postal':'NORM','row':3,'column':0,'color_value':53},
        {'state_full':'Mahnomen','state_postal':'MAHN','row':3,'column':1,'color_value':42},
        {'state_full':'Cass','state_postal':'CASS','row':3,'column':2,'color_value':10},
        {'state_full':'Crow Wing','state_postal':'CROW','row':3,'column':3,'color_value':17},
        {'state_full':'Pine','state_postal':'PINE','row':3,'column':4,'color_value':57},
        {'state_full':'Clay','state_postal':'CLAY','row':4,'column':0,'color_value':13},
        {'state_full':'Becker','state_postal':'BECK','row':4,'column':1,'color_value':2},
        {'state_full':'Wadena','state_postal':'WAD','row':4,'column':2,'color_value':79},
        {'state_full':'Mille Lacs','state_postal':'ML','row':4,'column':3,'color_value':47},
        {'state_full':'Kanabec','state_postal':'KANA','row':4,'column':4,'color_value':32},
        {'state_full':'Wilkin','state_postal':'WILK','row':5,'column':0,'color_value':83},
        {'state_full':'Ottertail','state_postal':'OT','row':5,'column':1,'color_value':44},
        {'state_full':'Todd','state_postal':'TODD','row':5,'column':2,'color_value':76},
        {'state_full':'Morrison','state_postal':'MORR','row':5,'column':3,'color_value':48},
        {'state_full':'Benton','state_postal':'BEN','row':5,'column':4,'color_value':4},
        {'state_full':'Traverse','state_postal':'TRAV','row':6,'column':0,'color_value':77},
        {'state_full':'Grant','state_postal':'GRANT','row':6,'column':1,'color_value':25},
        {'state_full':'Douglas','state_postal':'DOUG','row':6,'column':2,'color_value':20},
        {'state_full':'Stearns','state_postal':'STRNS','row':6,'column':3,'color_value':72},
        {'state_full':'Isanti','state_postal':'ISA','row':6,'column':4,'color_value':29},
        {'state_full':'Big Stone','state_postal':'BIG','row':7,'column':0,'color_value':5},
        {'state_full':'Stevens','state_postal':'STEVE','row':7,'column':1,'color_value':74},
        {'state_full':'Pope','state_postal':'POP','row':7,'column':2,'color_value':60},
        {'state_full':'Sherburne','state_postal':'SB','row':7,'column':3,'color_value':69},
        {'state_full':'Anoka','state_postal':'AK','row':7,'column':4,'color_value':1},
        {'state_full':'Chisago','state_postal':'CHIS','row':7,'column':5,'color_value':12},
        {'state_full':'Swift','state_postal':'SWIFT','row':8,'column':0,'color_value':75},
        {'state_full':'Kandiyohi','state_postal':'KAN','row':8,'column':1,'color_value':33},
        {'state_full':'Meeker','state_postal':'MEEK','row':8,'column':2,'color_value':46},
        {'state_full':'Wright','state_postal':'WR','row':8,'column':3,'color_value':85},
        {'state_full':'Hennepin','state_postal':'HENN','row':8,'column':4,'color_value':26},
        {'state_full':'Ramsey','state_postal':'RAM','row':8,'column':5,'color_value':61},
        {'state_full':'Washington','state_postal':'WA','row':8,'column':6,'color_value':81},
        {'state_full':'Yellow Medicine','state_postal':'YM','row':9,'column':0,'color_value':86},
        {'state_full':'Renville','state_postal':'REN','row':9,'column':1,'color_value':64},
        {'state_full':'McLeod','state_postal':'MCL','row':9,'column':2,'color_value':45},
        {'state_full':'Sibley','state_postal':'SIB','row':9,'column':3,'color_value':70},
        {'state_full':'Carver','state_postal':'CV','row':9,'column':4,'color_value':9},
        {'state_full':'Scott','state_postal':'SCT','row':9,'column':5,'color_value':68},
        {'state_full':'Dakota','state_postal':'DAK','row':9,'column':6,'color_value':18},
        {'state_full':'Goodhue','state_postal':'GOOD','row':9,'column':7,'color_value':24},
        {'state_full':'Lincoln','state_postal':'LIN','row':10,'column':0,'color_value':40},
        {'state_full':'Lyon','state_postal':'LYON','row':10,'column':1,'color_value':41},
        {'state_full':'Redwood','state_postal':'RW','row':10,'column':2,'color_value':63},
        {'state_full':'Brown','state_postal':'BR','row':10,'column':3,'color_value':7},
        {'state_full':'Nicollet','state_postal':'NIC','row':10,'column':4,'color_value':51},
        {'state_full':'Blue Earth','state_postal':'BLUE','row':10,'column':5,'color_value':6},
        {'state_full':'Le Sueur','state_postal':'LS','row':10,'column':6,'color_value':39},
        {'state_full':'Rice','state_postal':'RICE','row':10,'column':7,'color_value':65},
        {'state_full':'Wabasha','state_postal':'WAB','row':10,'column':8,'color_value':78},
        {'state_full':'Pipestone','state_postal':'PS','row':11,'column':0,'color_value':58},
        {'state_full':'Murray','state_postal':'MURR','row':11,'column':1,'color_value':50},
        {'state_full':'Cottonwood','state_postal':'CW','row':11,'column':2,'color_value':16},
        {'state_full':'Watonwan','state_postal':'WTW','row':11,'column':3,'color_value':82},
        {'state_full':'Waseca','state_postal':'WAS','row':11,'column':4,'color_value':80},
        {'state_full':'Steele','state_postal':'ST','row':11,'column':5,'color_value':73},
        {'state_full':'Dodge','state_postal':'DG','row':11,'column':6,'color_value':19},
        {'state_full':'Olmsted','state_postal':'OLM','row':11,'column':7,'color_value':54},
        {'state_full':'Winona','state_postal':'WIN','row':11,'column':8,'color_value':84},
        {'state_full':'Rock','state_postal':'ROCK','row':12,'column':0,'color_value':66},
        {'state_full':'Nobles','state_postal':'NOB','row':12,'column':1,'color_value':52},
        {'state_full':'Jackson','state_postal':'JACK','row':12,'column':2,'color_value':31},
        {'state_full':'Martin','state_postal':'MART','row':12,'column':3,'color_value':44},
        {'state_full':'Faribault','state_postal':'FB','row':12,'column':4,'color_value':21},
        {'state_full':'Freeborn','state_postal':'FREE','row':12,'column':5,'color_value':23},
        {'state_full':'Mower','state_postal':'MOW','row':12,'column':6,'color_value':49},
        {'state_full':'Fillmore','state_postal':'FILL','row':12,'column':7,'color_value':22},
        {'state_full':'Houston','state_postal':'HOU','row':12,'column':8,'color_value':27}
        ]

var mnlegMetroCarto = [{'state_full':'Distirct 30A','state_postal':'30A','row':0,'column':2,'color_value':53},
        {'state_full':'District 30B','state_postal':'30B','row':0,'column':3,'color_value':54},
        {'state_full':'District 35A','state_postal':'35A','row':0,'column':4,'color_value':61},
        {'state_full':'District 35B','state_postal':'35B','row':0,'column':5,'color_value':62},
        {'state_full':'District 31B','state_postal':'31B','row':0,'column':6,'color_value':55},
        {'state_full':'District 32B','state_postal':'32B','row':0,'column':7,'color_value':57},
        {'state_full':'District 34A','state_postal':'34A','row':1,'column':1,'color_value':0},
        {'state_full':'District 36A','state_postal':'36A','row':1,'column':2,'color_value':63},
        {'state_full':'District 36B','state_postal':'36B','row':1,'column':3,'color_value':64},
        {'state_full':'District 37A','state_postal':'37A','row':1,'column':4,'color_value':65},
        {'state_full':'District 37B','state_postal':'37B','row':1,'column':5,'color_value':66},
        {'state_full':'District 38A','state_postal':'38A','row':1,'column':6,'color_value':67},
        {'state_full':'District 38B','state_postal':'38B','row':1,'column':7,'color_value':68},
        {'state_full':'District 39A','state_postal':'39A','row':1,'column':8,'color_value':69},
        {'state_full':'District 34B','state_postal':'34B','row':2,'column':1,'color_value':60},
        {'state_full':'District 40A','state_postal':'40A','row':2,'column':2,'color_value':71},
        {'state_full':'District 40B','state_postal':'40B','row':2,'column':3,'color_value':72},
        {'state_full':'District 41A','state_postal':'41A','row':2,'column':4,'color_value':73},
        {'state_full':'District 41B','state_postal':'41B','row':2,'column':5,'color_value':74},
        {'state_full':'District 42A','state_postal':'42A','row':2,'column':6,'color_value':75},
        {'state_full':'District 42B','state_postal':'42B','row':2,'column':7,'color_value':76},
        {'state_full':'District 43A','state_postal':'43A','row':2,'column':8,'color_value':77},
        {'state_full':'District 44A','state_postal':'44A','row':3,'column':0,'color_value':79},
        {'state_full':'District 45A','state_postal':'45A','row':3,'column':1,'color_value':81},
        {'state_full':'District 45B','state_postal':'45B','row':3,'column':2,'color_value':82},
        {'state_full':'District 59A','state_postal':'59A','row':3,'column':3,'color_value':108},
        {'state_full':'District 60A','state_postal':'60A','row':3,'column':4,'color_value':110},
        {'state_full':'District 66A','state_postal':'66A','row':3,'column':5,'color_value':122},
        {'state_full':'District 66B','state_postal':'66B','row':3,'column':6,'color_value':123},
        {'state_full':'District 67A','state_postal':'67A','row':3,'column':7,'color_value':124},
        {'state_full':'District 43B','state_postal':'43B','row':3,'column':8,'color_value':78},
        {'state_full':'District 39B','state_postal':'39B','row':3,'column':9,'color_value':70},
        {'state_full':'District 44B','state_postal':'44B','row':4,'column':1,'color_value':80},
        {'state_full':'District 46A','state_postal':'46A','row':4,'column':2,'color_value':83},
        {'state_full':'District 59B','state_postal':'59B','row':4,'column':3,'color_value':109},
        {'state_full':'District 60B','state_postal':'60B','row':4,'column':4,'color_value':111},
        {'state_full':'District 64A','state_postal':'64A','row':4,'column':5,'color_value':118},
        {'state_full':'District 65A','state_postal':'65A','row':4,'column':6,'color_value':120},
        {'state_full':'District 67B','state_postal':'67B','row':4,'column':7,'color_value':125},
        {'state_full':'District 53A','state_postal':'53A','row':4,'column':8,'color_value':96},
        {'state_full':'District 33B','state_postal':'33B','row':5,'column':1,'color_value':59},
        {'state_full':'District 46B','state_postal':'46B','row':5,'column':2,'color_value':84},
        {'state_full':'District 61A','state_postal':'61A','row':5,'column':3,'color_value':112},
        {'state_full':'District 62A','state_postal':'62A','row':5,'column':4,'color_value':114},
        {'state_full':'District 63A','state_postal':'63A','row':5,'column':5,'color_value':116},
        {'state_full':'District 65B','state_postal':'65B','row':5,'column':6,'color_value':121},
        {'state_full':'District 53B','state_postal':'53B','row':5,'column':7,'color_value':96},
        {'state_full':'District 54B','state_postal':'54B','row':5,'column':8,'color_value':99},
        {'state_full':'District 48A','state_postal':'48A','row':6,'column':1,'color_value':86},
        {'state_full':'District 49A','state_postal':'49A','row':6,'column':2,'color_value':88},
        {'state_full':'District 61B','state_postal':'61B','row':6,'column':3,'color_value':113},
        {'state_full':'District 62B','state_postal':'62B','row':6,'column':4,'color_value':115},
        {'state_full':'District 63B','state_postal':'63B','row':6,'column':5,'color_value':117},
        {'state_full':'District 64B','state_postal':'64B','row':6,'column':6,'color_value':119},
        {'state_full':'District 52A','state_postal':'52A','row':6,'column':7,'color_value':94},
        {'state_full':'District 54A','state_postal':'54A','row':6,'column':8,'color_value':98},
        {'state_full':'District 47B','state_postal':'47B','row':7,'column':1,'color_value':0},
        {'state_full':'District 48B','state_postal':'48B','row':7,'column':2,'color_value':87},
        {'state_full':'District 49B','state_postal':'49B','row':7,'column':3,'color_value':89},
        {'state_full':'District 50A','state_postal':'50A','row':7,'column':4,'color_value':90},
        {'state_full':'District 50B','state_postal':'50B','row':7,'column':5,'color_value':91},
        {'state_full':'District 51A','state_postal':'51A','row':7,'column':6,'color_value':92},
        {'state_full':'District 51B','state_postal':'51B','row':7,'column':7,'color_value':93},
        {'state_full':'District 52B','state_postal':'52B','row':7,'column':8,'color_value':95},
        {'state_full':'District 55A','state_postal':'55A','row':8,'column':2,'color_value':100},
        {'state_full':'District 55B','state_postal':'55B','row':8,'column':3,'color_value':101},
        {'state_full':'District 56A','state_postal':'56A','row':8,'column':4,'color_value':102},
        {'state_full':'District 56B','state_postal':'56B','row':8,'column':5,'color_value':103},
        {'state_full':'District 58A','state_postal':'58A','row':8,'column':6,'color_value':109},
        {'state_full':'District 57A','state_postal':'57A','row':8,'column':7,'color_value':104},
        {'state_full':'District 57B','state_postal':'57B','row':8,'column':8,'color_value':105}
        ]

var mnlegMNCarto = [{'state_full':'District 1A','state_postal':'1A','row':0,'column':0,'color_value':1},
        {'state_full':'District 2A','state_postal':'2A','row':-1,'column':1,'color_value':3},
        {'state_full':'District 1B','state_postal':'1B','row':0,'column':1,'color_value':2},
        {'state_full':'District 2B','state_postal':'2B','row':0,'column':2,'color_value':4},
        {'state_full':'District 6A','state_postal':'6A','row':0,'column':3,'color_value':11},
        {'state_full':'District 6B','state_postal':'6B','row':0,'column':4,'color_value':12},
        {'state_full':'District 3B','state_postal':'3B','row':0,'column':5,'color_value':6},
        {'state_full':'District 3A','state_postal':'3A','row':0,'column':6,'color_value':5},
        {'state_full':'District 4A','state_postal':'4A','row':1,'column':0,'color_value':7},
        {'state_full':'District 4B','state_postal':'4B','row':1,'column':1,'color_value':8},
        {'state_full':'District 5A','state_postal':'5A','row':1,'column':2,'color_value':9},
        {'state_full':'District 5B','state_postal':'5B','row':1,'column':3,'color_value':10},
        {'state_full':'District 7B','state_postal':'7B','row':1,'column':4,'color_value':14},
        {'state_full':'District 7A','state_postal':'7A','row':1,'column':5,'color_value':13},
        {'state_full':'District 8A','state_postal':'8A','row':2,'column':0,'color_value':15},
        {'state_full':'District 8B','state_postal':'8B','row':2,'column':1,'color_value':16},
        {'state_full':'District 10A','state_postal':'10A','row':2,'column':2,'color_value':19},
        {'state_full':'District 10B','state_postal':'10B','row':2,'column':3,'color_value':20},
        {'state_full':'District 11A','state_postal':'11A','row':2,'column':4,'color_value':21},
        {'state_full':'District 12A','state_postal':'12A','row':3,'column':0,'color_value':23},
        {'state_full':'District 9A','state_postal':'9A','row':3,'column':1,'color_value':17},
        {'state_full':'District 9B','state_postal':'9B','row':3,'column':2,'color_value':18},
        {'state_full':'District 15B','state_postal':'15B','row':3,'column':3,'color_value':29},
        {'state_full':'District 11B','state_postal':'11B','row':3,'column':4,'color_value':22},
        {'state_full':'District 12B','state_postal':'12B','row':4,'column':0,'color_value':24},
        {'state_full':'District 13A','state_postal':'13A','row':4,'column':1,'color_value':25},
        {'state_full':'District 13B','state_postal':'13B','row':4,'column':2,'color_value':0},
        {'state_full':'District 15A','state_postal':'15A','row':4,'column':3,'color_value':28},
        {'state_full':'District 32A','state_postal':'32A','row':4,'column':4,'color_value':56},
        {'state_full':'District 17A','state_postal':'17A','row':5,'column':0,'color_value':32},
        {'state_full':'District 17B','state_postal':'17B','row':5,'column':1,'color_value':33},
        {'state_full':'District 14A','state_postal':'14A','row':5,'column':2,'color_value':26},
        {'state_full':'District 14B','state_postal':'14B','row':5,'column':3,'color_value':27},
        {'state_full':'District 31A','state_postal':'31A','row':5,'column':4,'color_value':0},
        {'state_full':'District 15A','state_postal':'15A','row':6,'column':0,'color_value':28},
        {'state_full':'District 18A','state_postal':'18A','row':6,'column':1,'color_value':34},
        {'state_full':'District 29A','state_postal':'29A','row':6,'column':2,'color_value':0},
        {'state_full':'District 29B','state_postal':'29B','row':6,'column':3,'color_value':0},
        {'state_full':'District 16B','state_postal':'16B','row':7,'column':0,'color_value':31},
        {'state_full':'District 18B','state_postal':'18B','row':7,'column':1,'color_value':35},
        {'state_full':'District 47A','state_postal':'47A','row':7,'column':2,'color_value':85},
        {'state_full':'District 33A','state_postal':'33A','row':7,'column':3,'color_value':58},
        {'state_full':'District 19A','state_postal':'19A','row':8,'column':0,'color_value':36},
        {'state_full':'District 20A','state_postal':'20A','row':8,'column':1,'color_value':38},
        {'state_full':'District 20B','state_postal':'20B','row':8,'column':2,'color_value':39},
        {'state_full':'District 58B','state_postal':'58B','row':8,'column':3,'color_value':103},
        {'state_full':'District 21A','state_postal':'21A','row':8,'column':4,'color_value':40},
        {'state_full':'District 21B','state_postal':'21B','row':8,'column':5,'color_value':41},
        {'state_full':'District 22B','state_postal':'22B','row':9,'column':0,'color_value':43},
        {'state_full':'District 19B','state_postal':'19B','row':9,'column':1,'color_value':37},
        {'state_full':'District 23B','state_postal':'23B','row':9,'column':2,'color_value':0},
        {'state_full':'District 25B','state_postal':'25B','row':9,'column':3,'color_value':0},
        {'state_full':'District 24B','state_postal':'24B','row':9,'column':4,'color_value':46},
        {'state_full':'District 25A','state_postal':'25A','row':9,'column':5,'color_value':0},
        {'state_full':'District 28A','state_postal':'28A','row':9,'column':6,'color_value':51},
        {'state_full':'District 22A','state_postal':'22A','row':10,'column':0,'color_value':42},
        {'state_full':'District 22B','state_postal':'22B','row':10,'column':1,'color_value':43},
        {'state_full':'District 24A','state_postal':'24A','row':10,'column':2,'color_value':45},
        {'state_full':'District 26B','state_postal':'26B','row':10,'column':3,'color_value':48},
        {'state_full':'District 26A','state_postal':'26A','row':10,'column':4,'color_value':47},
        {'state_full':'District 27A','state_postal':'27A','row':10,'column':5,'color_value':49},
        {'state_full':'District 27B','state_postal':'27B','row':10,'column':6,'color_value':50},
        {'state_full':'District 28B','state_postal':'28B','row':10,'column':7,'color_value':52}
        ]

var mnsenMetroCarto = [{'state_full':'District 30','state_postal':'30','row':0,'column':2,'color_value':53},
        {'state_full':'District 30','state_postal':'30','row':0,'column':3,'color_value':54},
        {'state_full':'District 35','state_postal':'35','row':0,'column':4,'color_value':61},
        {'state_full':'District 35','state_postal':'35','row':0,'column':5,'color_value':62},
        {'state_full':'District 31','state_postal':'31','row':0,'column':6,'color_value':55},
        {'state_full':'District 32','state_postal':'32','row':0,'column':7,'color_value':57},
        {'state_full':'District 34','state_postal':'34','row':1,'column':1,'color_value':0},
        {'state_full':'District 36','state_postal':'36','row':1,'column':2,'color_value':63},
        {'state_full':'District 36','state_postal':'36','row':1,'column':3,'color_value':64},
        {'state_full':'District 37','state_postal':'37','row':1,'column':4,'color_value':65},
        {'state_full':'District 37','state_postal':'37','row':1,'column':5,'color_value':66},
        {'state_full':'District 38','state_postal':'38','row':1,'column':6,'color_value':67},
        {'state_full':'District 38','state_postal':'38','row':1,'column':7,'color_value':68},
        {'state_full':'District 39','state_postal':'39','row':1,'column':8,'color_value':69},
        {'state_full':'District 34','state_postal':'34','row':2,'column':1,'color_value':60},
        {'state_full':'District 40','state_postal':'40','row':2,'column':2,'color_value':71},
        {'state_full':'District 40','state_postal':'40','row':2,'column':3,'color_value':72},
        {'state_full':'District 41','state_postal':'41','row':2,'column':4,'color_value':73},
        {'state_full':'District 41','state_postal':'41','row':2,'column':5,'color_value':74},
        {'state_full':'District 42','state_postal':'42','row':2,'column':6,'color_value':75},
        {'state_full':'District 42','state_postal':'42','row':2,'column':7,'color_value':76},
        {'state_full':'District 43','state_postal':'43','row':2,'column':8,'color_value':77},
        {'state_full':'District 44','state_postal':'44','row':3,'column':0,'color_value':79},
        {'state_full':'District 45','state_postal':'45','row':3,'column':1,'color_value':81},
        {'state_full':'District 45','state_postal':'45','row':3,'column':2,'color_value':82},
        {'state_full':'District 59','state_postal':'59','row':3,'column':3,'color_value':108},
        {'state_full':'District 60','state_postal':'60','row':3,'column':4,'color_value':110},
        {'state_full':'District 66','state_postal':'66','row':3,'column':5,'color_value':122},
        {'state_full':'District 66','state_postal':'66','row':3,'column':6,'color_value':123},
        {'state_full':'District 67','state_postal':'67','row':3,'column':7,'color_value':124},
        {'state_full':'District 43','state_postal':'43','row':3,'column':8,'color_value':78},
        {'state_full':'District 39','state_postal':'39','row':3,'column':9,'color_value':70},
        {'state_full':'District 44','state_postal':'44','row':4,'column':1,'color_value':80},
        {'state_full':'District 46','state_postal':'46','row':4,'column':2,'color_value':83},
        {'state_full':'District 59','state_postal':'59','row':4,'column':3,'color_value':109},
        {'state_full':'District 60','state_postal':'60','row':4,'column':4,'color_value':111},
        {'state_full':'District 64','state_postal':'64','row':4,'column':5,'color_value':118},
        {'state_full':'District 65','state_postal':'65','row':4,'column':6,'color_value':120},
        {'state_full':'District 67','state_postal':'67','row':4,'column':7,'color_value':125},
        {'state_full':'District 53','state_postal':'53','row':4,'column':8,'color_value':96},
        {'state_full':'District 33','state_postal':'33','row':5,'column':1,'color_value':59},
        {'state_full':'District 46','state_postal':'46','row':5,'column':2,'color_value':84},
        {'state_full':'District 61','state_postal':'61','row':5,'column':3,'color_value':112},
        {'state_full':'District 62','state_postal':'62','row':5,'column':4,'color_value':114},
        {'state_full':'District 63','state_postal':'63','row':5,'column':5,'color_value':116},
        {'state_full':'District 65','state_postal':'65','row':5,'column':6,'color_value':121},
        {'state_full':'District 53','state_postal':'53','row':5,'column':7,'color_value':96},
        {'state_full':'District 54','state_postal':'54','row':5,'column':8,'color_value':99},
        {'state_full':'District 48','state_postal':'48','row':6,'column':1,'color_value':86},
        {'state_full':'District 49','state_postal':'49','row':6,'column':2,'color_value':88},
        {'state_full':'District 61','state_postal':'61','row':6,'column':3,'color_value':113},
        {'state_full':'District 62','state_postal':'62','row':6,'column':4,'color_value':115},
        {'state_full':'District 63','state_postal':'63','row':6,'column':5,'color_value':117},
        {'state_full':'District 64','state_postal':'64','row':6,'column':6,'color_value':119},
        {'state_full':'District 52','state_postal':'52','row':6,'column':7,'color_value':94},
        {'state_full':'District 54','state_postal':'54','row':6,'column':8,'color_value':98},
        {'state_full':'District 47','state_postal':'47','row':7,'column':1,'color_value':0},
        {'state_full':'District 48','state_postal':'48','row':7,'column':2,'color_value':87},
        {'state_full':'District 49','state_postal':'49','row':7,'column':3,'color_value':89},
        {'state_full':'District 50','state_postal':'50','row':7,'column':4,'color_value':90},
        {'state_full':'District 50','state_postal':'50','row':7,'column':5,'color_value':91},
        {'state_full':'District 51','state_postal':'51','row':7,'column':6,'color_value':92},
        {'state_full':'District 51','state_postal':'51','row':7,'column':7,'color_value':93},
        {'state_full':'District 52','state_postal':'52','row':7,'column':8,'color_value':95},
        {'state_full':'District 55','state_postal':'55','row':8,'column':2,'color_value':100},
        {'state_full':'District 55','state_postal':'55','row':8,'column':3,'color_value':101},
        {'state_full':'District 56','state_postal':'56','row':8,'column':4,'color_value':102},
        {'state_full':'District 56','state_postal':'56','row':8,'column':5,'color_value':103},
        {'state_full':'District 58','state_postal':'58','row':8,'column':6,'color_value':109},
        {'state_full':'District 57','state_postal':'57','row':8,'column':7,'color_value':104},
        {'state_full':'District 57','state_postal':'57','row':8,'column':8,'color_value':105}
        ]

var mnsenMNCarto = [{'state_full':'District 1','state_postal':'1','row':0,'column':0,'color_value':1},
        {'state_full':'District 2','state_postal':'2','row':-1,'column':1,'color_value':3},
        {'state_full':'District 1','state_postal':'1','row':0,'column':1,'color_value':2},
        {'state_full':'District 2','state_postal':'2','row':0,'column':2,'color_value':4},
        {'state_full':'District 6','state_postal':'6','row':0,'column':3,'color_value':11},
        {'state_full':'District 6','state_postal':'6','row':0,'column':4,'color_value':12},
        {'state_full':'District 3','state_postal':'3','row':0,'column':5,'color_value':6},
        {'state_full':'District 3','state_postal':'3','row':0,'column':6,'color_value':5},
        {'state_full':'District 4','state_postal':'4','row':1,'column':0,'color_value':7},
        {'state_full':'District 4','state_postal':'4','row':1,'column':1,'color_value':8},
        {'state_full':'District 5','state_postal':'5','row':1,'column':2,'color_value':9},
        {'state_full':'District 5','state_postal':'5','row':1,'column':3,'color_value':10},
        {'state_full':'District 7','state_postal':'7','row':1,'column':4,'color_value':14},
        {'state_full':'District 7','state_postal':'7','row':1,'column':5,'color_value':13},
        {'state_full':'District 8','state_postal':'8','row':2,'column':0,'color_value':15},
        {'state_full':'District 8','state_postal':'8','row':2,'column':1,'color_value':16},
        {'state_full':'District 10','state_postal':'10','row':2,'column':2,'color_value':19},
        {'state_full':'District 10','state_postal':'10','row':2,'column':3,'color_value':20},
        {'state_full':'District 11','state_postal':'11','row':2,'column':4,'color_value':21},
        {'state_full':'District 12','state_postal':'12','row':3,'column':0,'color_value':23},
        {'state_full':'District 9','state_postal':'9','row':3,'column':1,'color_value':17},
        {'state_full':'District 9','state_postal':'9','row':3,'column':2,'color_value':18},
        {'state_full':'District 15','state_postal':'15','row':3,'column':3,'color_value':29},
        {'state_full':'District 11','state_postal':'11','row':3,'column':4,'color_value':22},
        {'state_full':'District 12','state_postal':'12','row':4,'column':0,'color_value':24},
        {'state_full':'District 13','state_postal':'13','row':4,'column':1,'color_value':25},
        {'state_full':'District 13','state_postal':'13','row':4,'column':2,'color_value':0},
        {'state_full':'District 15','state_postal':'15','row':4,'column':3,'color_value':28},
        {'state_full':'District 32','state_postal':'32','row':4,'column':4,'color_value':56},
        {'state_full':'District 17','state_postal':'17','row':5,'column':0,'color_value':32},
        {'state_full':'District 17','state_postal':'17','row':5,'column':1,'color_value':33},
        {'state_full':'District 14','state_postal':'14','row':5,'column':2,'color_value':26},
        {'state_full':'District 14','state_postal':'14','row':5,'column':3,'color_value':27},
        {'state_full':'District 31','state_postal':'31','row':5,'column':4,'color_value':0},
        {'state_full':'District 15','state_postal':'15','row':6,'column':0,'color_value':28},
        {'state_full':'District 18','state_postal':'18','row':6,'column':1,'color_value':34},
        {'state_full':'District 29','state_postal':'29','row':6,'column':2,'color_value':0},
        {'state_full':'District 29','state_postal':'29','row':6,'column':3,'color_value':0},
        {'state_full':'District 16','state_postal':'16','row':7,'column':0,'color_value':31},
        {'state_full':'District 18','state_postal':'18','row':7,'column':1,'color_value':35},
        {'state_full':'District 47','state_postal':'47','row':7,'column':2,'color_value':85},
        {'state_full':'District 33','state_postal':'33','row':7,'column':3,'color_value':58},
        {'state_full':'District 19','state_postal':'19','row':8,'column':0,'color_value':36},
        {'state_full':'District 20','state_postal':'20','row':8,'column':1,'color_value':38},
        {'state_full':'District 20','state_postal':'20','row':8,'column':2,'color_value':39},
        {'state_full':'District 58','state_postal':'58','row':8,'column':3,'color_value':103},
        {'state_full':'District 21','state_postal':'21','row':8,'column':4,'color_value':40},
        {'state_full':'District 21','state_postal':'21','row':8,'column':5,'color_value':41},
        {'state_full':'District 22','state_postal':'22','row':9,'column':0,'color_value':43},
        {'state_full':'District 19','state_postal':'19','row':9,'column':1,'color_value':37},
        {'state_full':'District 23','state_postal':'23','row':9,'column':2,'color_value':0},
        {'state_full':'District 25','state_postal':'25','row':9,'column':3,'color_value':0},
        {'state_full':'District 24','state_postal':'24','row':9,'column':4,'color_value':46},
        {'state_full':'District 25','state_postal':'25','row':9,'column':5,'color_value':0},
        {'state_full':'District 28','state_postal':'28','row':9,'column':6,'color_value':51},
        {'state_full':'District 22','state_postal':'22','row':10,'column':0,'color_value':42},
        {'state_full':'District 22','state_postal':'22','row':10,'column':1,'color_value':43},
        {'state_full':'District 24','state_postal':'24','row':10,'column':2,'color_value':45},
        {'state_full':'District 26','state_postal':'26','row':10,'column':3,'color_value':48},
        {'state_full':'District 26','state_postal':'26','row':10,'column':4,'color_value':47},
        {'state_full':'District 27','state_postal':'27','row':10,'column':5,'color_value':49},
        {'state_full':'District 27','state_postal':'27','row':10,'column':6,'color_value':50},
        {'state_full':'District 28','state_postal':'28','row':10,'column':7,'color_value':52}
        ]

var mnCDCarto = [{'state_full':'Congressional District 7','state_postal':'7','row':0,'column':0,'color_value':6},
        {'state_full':'Congressional District 8','state_postal':'8','row':0,'column':1,'color_value':7},
        {'state_full':'Congressional District 6','state_postal':'6','row':1,'column':0,'color_value':5},
        {'state_full':'Congressional District 3','state_postal':'3','row':1,'column':1,'color_value':2},
        {'state_full':'Congressional District 5','state_postal':'5','row':2,'column':0,'color_value':4},
        {'state_full':'Congressional District 4','state_postal':'4','row':2,'column':1,'color_value':3},
        {'state_full':'Congressional District 1','state_postal':'1','row':3,'column':0,'color_value':0},
        {'state_full':'Congressional District 2','state_postal':'2','row':3,'column':1,'color_value':1}
        ]

if (race=="president" && geo=="us"){ return usCarto; }
if (race=="president" && geo=="mn"){ return mnCarto; }

if (race=="ushouse" && geo=="us"){ return usCDCarto; }
if (race=="ushouse" && geo=="mn"){ return mnCDCarto; }

if (race=="ussenate" && geo=="us"){ return usCarto; }
if (race=="ussenate" && geo=="mn"){ return mnCarto; }

if (race=="mnhouse" && geo=="mn"){ return mnlegMNCarto; }
if (race=="mnhouse" && geo=="metro"){ return mnlegMetroCarto; }

if (race=="mnsenate" && geo=="mn"){ return mnsenMNCarto; }
if (race=="mnsenate" && geo=="metro"){ return mnsenMetroCarto; }

if (race=="governors" && geo=="us"){ return usCarto; }
}

(function(){
    var margin = {top: 10, left: 10, bottom: 50, right: 10}
    , width = 800
    , width = width - margin.left - margin.right
    , mapRatio = .5
    , height = 800;

    var projection = d3.geo.equirectangular()
              .scale(width/1.3)//this makes it larger or smaller for the space you have
              .translate([width / 4, height / 2.5]) 
              .center([-102, 47 ]); //move the map center to fit in the spsace

    var path = d3.geo.path()
          .projection(projection);

    var svg = d3.select("#ushouseCarto svg")
          .attr("width", width)
          .attr("height", height);

    var g = svg.append("g").attr('transform',"translate(150,25)").attr('class','house-group-g');

    makeCartogram();

function makeCartogram() {
        d3.json("shapefiles/usdistricts_cartogram.json", function(error, us) {

            g.append("g").attr("id", "districts").selectAll("path")
            .data(topojson.feature(us, us.objects['cart113']).features)
            .enter().append("path")
                .attr("d", path)
                .attr("class", function(d){return 'district ' + d.properties.State,false,null + '-' + d.properties['d'] + '-House'})
                .attr('data-hash-key',function(d){ return d.properties.State + '-' + d.properties['d']});
            g.append("g")
            .attr("id", "states")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.states).features)
            .enter().append("path")
            .attr("d", path)
            .attr('class', function(d){return 'state ' + d.properties.State.replace(/ /g,'')})
            .attr('data-hash-key', function(d){ return d.properties.State});      
        })
    }
})();
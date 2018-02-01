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

$("#districtSelectS, #districtSelectH, #districtSelectUS").click(function() {
    $(this).parent().find(".dropdown, .filter").slideToggle();
    $(this).parent().find(".filter_box").val("");
    $(this).parent().find(".dropdown").find(".thisSwitch").show();
    $(this).find(".directions").toggle();
});

d3.csv("./data/races.csv", function(d) {
    return {
        race: d.district,
        chamber: d.chamber,
        district: d.district,
        democrat: d.democrat,
        dLast: d.dLast,
        dI: d.dI,
        republican: d.republican,
        rLast: d.rLast,
        rI: d.rI,
        candX: d.cand_xpend,
        indX: d.ind_xpend,
        totalX: d.total,
        control: d.control,
        incumbant: d.incumbant,
        party: d.party
    };
}, function(error, rows00) {
    d3.csv("./data/candidates_master.csv", function(d) {
        return {
            id: d.CandRegistrationNumber,
            district: d.District,
            out: +d.out,
            party: d.Party,
            first: d.CandFirstName,
            last: d.CandLastName,
            total: +d.TotReceipts,
            office: d.OfficeSought,
            endcash: +d.EndCash,
            indcontrib: +d.IndContrib,
            ppcontrib: +d.PPContrib,
            pfcontrib: +d.PFContrib,
            lbcontrib: +d.LbContrib,
            pubfin: +d.PubFin,
            miscinc: +d.MiscInc,
            notepayinc: +d.NotePayInc,
            noterecinc: +d.NoteRecInc,
            expend: +d.TotalExpend,
            begin: +d.BeginCash,
            photo: d.photo
        };
    }, function(error, rows1) {

        var dataRaces = rows00;
        var dataFilings = rows1;

        function listSpill(race) {

            for (var i = 0; i < dataRaces.length; i++) {
                if (race == "senate" && dataRaces[i].chamber == "Senate") {
                    $("#listedS").append("<li class='thisSwitch " + dataRaces[i].control + "' district='" + dataRaces[i].district + "' chamber='" + dataRaces[i].chamber + "'>District " + dataRaces[i].district + "</li>");
                } else if (race == "house" && dataRaces[i].chamber == "House") {
                    $("#listedH").append("<li class='thisSwitch " + dataRaces[i].control + "' district='" + dataRaces[i].district + "' chamber='" + dataRaces[i].chamber + "'>District " + dataRaces[i].district + "</li>");
                } else if (race == "us" && dataRaces[i].chamber == "US") {
                    $("#listedUS").append("<li class='thisSwitch " + dataRaces[i].control + "' district='" + dataRaces[i].district + "' chamber='" + dataRaces[i].chamber + "'>U.S. District MN" + dataRaces[i].district + "</li>");
                }
            }
        }


        function legSpill(container, party, chamber) {

            //spill dropdowns


            //dropdown triggers

            //spill cartogram

        }

        function raceSpill(container, district, chamber) {

            var bigTotal = 0;

            for (var i = 0; i < dataFilings.length; i++) {
                 if (String(dataFilings[i].office).toUpperCase() == chamber.toUpperCase()){
                    if (dataFilings[i].district == district && dataFilings[i].out == 0) {
                        bigTotal = bigTotal + dataFilings[i].total;
                    }
                }
            }


            $(container + " .divide").html("");


            $(container + " .d").append('<div class="topline democrat">DFL</div>');
            $(container + " .r").append('<div class="topline republican">GOP</div>');

            for (var i = 0; i < dataFilings.length; i++) {
                var divide = "";
                var topline = "";
                var line = "";
                var incumbant = "";
                var fill = "";
                if (String(dataFilings[i].office).toUpperCase() == chamber.toUpperCase()){
                    if (dataFilings[i].district == district && dataFilings[i].out == 0) {
                        if (dataFilings[i].party == "DFL") {
                            divide = "d";
                            topline = "democrat";
                            line = "dfl";
                            fill = "dem";
                        } else if (dataFilings[i].party == "GOP") {
                            divide = "r";
                            topline = "republican";
                            line = "gop";
                            fill = "rep";
                        } else {
                            divide = "i";
                            topline = "independent";
                            line = "ind";
                            fill = "indy";
                        }

                                    var total = [];
                                    total[0] = Number(dataFilings[i].total);
                                    total[1] = Number(dataFilings[i].indcontrib);
                                    total[2] = Number(dataFilings[i].ppcontrib);
                                    total[3] = Number(dataFilings[i].pfcontrib);
                                    total[4] = Number(dataFilings[i].lbcontrib);
                                    total[5] = Number(dataFilings[i].pubfin);
                                    total[6] = Number(dataFilings[i].miscinc);
                                    total[7] = Number(dataFilings[i].notepayinc);
                                    total[8] = Number(dataFilings[i].noterecinc);
                                    total[9] = Number(dataFilings[i].expend);
                                    total[10] = Number(dataFilings[i].endcash);
                                    total[11] = Number(dataFilings[i].begin);


                                    var pct = d3.format("%")((total[0] / bigTotal) + 0.20);
                                    var indPCT = d3.format("%")((total[1] / total[0]));
                                    var ppPCT = d3.format("%")(total[2] / total[0]);
                                    var pfPCT = d3.format("%")(total[3] / total[0]);
                                    var lbPCT = d3.format("%")((total[4] / total[0]) - 0.1);
                                    var pubfinPCT = d3.format("%")(total[5] / total[0]);
                                    var miscPCT = d3.format("%")(total[6] / total[0]);
                                    var notepayPCT = d3.format("%")(total[7] / total[0]);
                                    var noterecPCT = d3.format("%")(total[8] / total[0]);

                            $(container + ' .' + divide).append('<div class="topline ' + topline + '"><span class="hideMe">' + dataFilings[i].party + ': +' + d3.format("$,")(dataFilings[i].total) + '</span></div> \
                                <div class="label">' + dataFilings[i].first + ' ' + dataFilings[i].last + ' ' + incumbant + '</div>\
                                <div class="line ' + line + '"><div class="photo"><img src="img/' + dataFilings[i].photo + '" width="98%" /></div><div class="bar"><div class="bigBar"><div class="inBar" style="width:' + pct + '"><div class="ind" title="'  + d3.format("$,.0f")(total[1]) +  ' independent contributions" style="width:' + indPCT + '"></div><div class="pp" title="'  + d3.format("$,.0f")(total[2]) +  ' political party" style="width:' + ppPCT + '"></div><div class="pf" title="' + d3.format("$,.0f")(total[3]) +  ' PAC contributions" style="width:' + pfPCT + '"></div><div class="lb" title="'  + d3.format("$,.0f")(total[4]) +  ' lobbyist contributions" style="width:' + lbPCT + '"></div><div class="pubfin" title="'  + d3.format("$,.0f")(total[5]) +  ' public financing" style="width:' + pubfinPCT + '"></div><div class="misc" title="'  + d3.format("$,.0f")(total[6]) +  ' miscellaneous" style="width:' + miscPCT + '"></div><div class="notepay" title="'  + d3.format("$,.0f")(total[7]) +  ' receipts loans payable" style="width:' + notepayPCT + '"></div><div class="noterec" title="'  + d3.format("$,.0f")(total[8]) +  ' noterec" style="width:' + noterecPCT + '"></div></div></div></div></div>\
                                <div class="subtotal">\
                                    <div class="begin">' + d3.format("$,")(dataFilings[i].begin) + '</div>\
                                    <div class="raised ' + fill + '">+' + d3.format("$,")(dataFilings[i].total) + '</div>\
                                    <div class="spent">-' + d3.format("$,")(dataFilings[i].expend) + '</div>\
                                    <div class="end">' + d3.format("$,")(dataFilings[i].endcash) + '</div>\
                            </div><div class="spacer"></div>');
                        
                    }
                }

            }

             $( function() {
                $( document ).tooltip({tooltipClass: "tooltip",});
              } );

        }

        //map things
        function mapBuild(container, boxContainer, chartContainer, shape, race, geo, dataCompare, index) {

            var width = 400,
                height = 400,
                centered;

            if (geo == "us") {
                var projection = d3.geo.albersUsa().scale(700).translate([330, 200]);
            } else if (geo == "mn") {
                var projection = d3.geo.albersUsa().scale(5037).translate([20, 970]);
            } else if (geo == "metro") {
                var projection = d3.geo.mercator().scale([14800]).center([-92.384033, 45.209134]);
            }

            var path = d3.geo.path()
                .projection(projection);

            var svg = d3.select(container + " svg")
                .attr("width", width)
                .attr("height", height);

            svg.append("rect")
                .attr("class", "background")
                .attr("width", width)
                .attr("height", height);

            var g = svg.append("g");

            d3.json("shapefiles/" + shape, function(error, us) {

                g.append("g")
                    .attr("class", "states")
                    .selectAll("path")
                    .data(us.features)
                    .enter().append("path")
                    .attr("d", path)
                    .on("click", clicked)
                    .attr("id", function(d) {
                        var str = geo + "_" + d.properties.DISTRICT;
                        return str.replace(new RegExp(" ", "g"), "-");
                    })
                    .attr("precinctName", function(d) {
                        return d.properties.DISTRICT;
                    })
                    .attr("class", function(d) {
                        var select = "";

                        if (d.properties.DISTRICT == "01") {
                            select = "activeB ";
                        }
                        if (d.properties.DISTRICT == "01A") {
                            select = "activeB ";
                        }

                        var control = "";
                        var district = "";

                        if (race == "house") {
                            district = d.properties.DISTRICT;
                        } else if (race == "senate") {
                            district = Number(d.properties.DISTRICT);
                        } else if (race == "us") {
                            district = Number(d.properties.DISTRICT);
                        }

                        for (var i = 0; i < dataRaces.length; i++) {
                            if (dataRaces[i].district == district) {
                                control = dataRaces[i].control;
                            }
                        }

                        return select + " " + control;

                    })
                    .on("mousedown", function(d, i) {

                        var chartTarget = "";
                        var district = "";

                        if (race == "house") {
                            $("#districtSelectH .thisDistrict").html("District " + d.properties.DISTRICT);
                            district = d.properties.DISTRICT;
                            chartTarget = "#houseChart";
                        } else if (race == "senate") {
                            $("#districtSelectS .thisDistrict").html("District " + d.properties.DISTRICT);
                            chartTarget = "#senateChart";
                            district = Number(d.properties.DISTRICT);
                        } else if (race == "us") {
                            $("#districtSelectUS .thisDistrict").html("U.S. District MN" + d.properties.DISTRICT);
                            chartTarget = "#usChart";
                            district = Number(d.properties.DISTRICT);
                        }
                        raceSpill(chartTarget, district, race);
                    })
                    .style("stroke-width", function(d, i) {
                        if (geo == "mn") {
                            return "0.5px";
                        } else if (geo == "metro") {
                            return "0.3px";
                        }
                    })
                    .style("stroke", "#fff")
                    .call(d3.helper.tooltip(function(d, i) {
                        var color = "";
                        var total = 0;
                        var control = "";
                        var incumbant = "";
                        var party = "";
                        var district = "";

                        if (race == "house") {
                            district = d.properties.DISTRICT;
                        } else if (race == "senate") {
                            district = Number(d.properties.DISTRICT);
                        } else if (race == "us") {
                            district = Number(d.properties.DISTRICT);
                        }

                        for (var i = 0; i < dataRaces.length; i++) {
                            if (dataRaces[i].district == district && race.toUpperCase() == String(dataRaces[i].chamber).toUpperCase()) {
                                control = dataRaces[i].control;
                                incumbant = dataRaces[i].incumbant;
                                party = dataRaces[i].party;
                            }
                        }

                        return "<div class='districtName'> District " + d.properties.DISTRICT + "</div><div class='" + control + "'>" + incumbant  + " (" + party + ")</div>";
                    }));

                g.append("path")
                    //.datum(topojson.mesh(us, us.features, function(a, b) { return a !== b; }))
                    .attr("id", "state-borders")
                    .attr("d", path);

            });

            var zoom = d3.behavior.zoom()
                .on("zoom", function() {
                    g.attr("transform", "translate(" +
                        d3.event.translate.join(",") + ")scale(" + d3.event.scale + ")");
                    g.selectAll("circle")
                        .attr("d", path.projection(projection));
                    g.selectAll("path")
                        .attr("d", path.projection(projection));

                });

            $(".mapSwitch").click(function() {
                $(".filter input").val("");
            });

            function clicked(d) {
                var x, y, k;

                if (d && centered !== d) {
                    var centroid = path.centroid(d);
                    x = centroid[0];
                    y = centroid[1];
                    k = 6;
                    centered = d;
                } else {
                    x = width / 2;
                    y = height / 2;
                    k = 3;
                    centered = null;
                }

                if (race == "house") {
                    d3.selectAll("#mapMetroH path, #mapStateH path")
                        .classed("activeB", false);
                }
                if (race == "senate") {
                    d3.selectAll("#mapMetroS path, #mapStateS path")
                        .classed("activeB", false);
                }

                g.selectAll("path")
                    .classed("activeB", centered && function(d) {
                        return d === centered;
                    });
            }

            function clicked2(d) {
                var x, y, k;

                if (d && centered !== d) {
                    var centroid = path.centroid(d);
                    x = centroid[0];
                    y = centroid[1];
                    k = 1;
                    centered = d;
                } else {
                    x = width / 2;
                    y = height / 2;
                    k = 1;
                    centered = null;
                }

                g.selectAll("path")
                    .classed("faded", false)
                    .classed("active", centered && function(d) {
                        return d === centered;
                    });
            }

        }

        d3.helper = {};

        d3.helper.tooltip = function(accessor) {
            return function(selection) {
                var tooltipDiv;
                var bodyNode = d3.select('body').node();
                selection.on("mouseover", function(d, i) {
                        // Clean up lost tooltips
                        d3.select('body').selectAll('div.tooltip').remove();
                        // Append tooltip
                        tooltipDiv = d3.select('body').append('div').attr('class', 'tooltip');
                        var absoluteMousePos = d3.mouse(bodyNode);
                        tooltipDiv.style('left', (absoluteMousePos[0] + 10) + 'px')
                            .style('top', (absoluteMousePos[1] - 15) + 'px')
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
                        tooltipDiv.style('left', (absoluteMousePos[0] + 10) + 'px')
                            .style('top', (absoluteMousePos[1] - 15) + 'px');
                        var tooltipText = accessor(d, i) || '';
                        tooltipDiv.html(tooltipText);
                    })
                    .on("mouseout", function(d, i) {
                        // Remove tooltip
                        tooltipDiv.remove();
                    });

            };
        };




        listSpill("senate");
        listSpill("house");
        listSpill("us");

        jQuery.fn.d3Click = function() {
            this.each(function(i, e) {
                var evt = document.createEvent("MouseEvents");
                evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

                e.dispatchEvent(evt);
            });
        };

        jQuery.fn.d3Down = function() {
            this.each(function(i, e) {
                var evt = document.createEvent("MouseEvents");
                evt.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

                e.dispatchEvent(evt);
            });
        };

        jQuery.fn.d3Up = function() {
            this.each(function(i, e) {
                var evt = document.createEvent("MouseEvents");
                evt.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

                e.dispatchEvent(evt);
            });
        };

        $(".thisSwitch").click(function() {
            $(".thisSwitch").removeClass("selected");
            $(this).addClass("selected");
            $(this).parent().parent().find(".dropdown, .filter").slideToggle();
            $(this).parent().parent().find(".thisDistrict").html($(this).text());
            $(this).parent().parent().find(".directions").toggle();
            var findDistrict = "mn_" + $(this).attr("district");
            var findMetro = "metro_" + $(this).attr("district");

            raceSpill("#" + $(this).parent().parent().parent().find(".chart").attr("id"), $(this).attr("district"), $(this).attr("chamber"));

            $("[id='" + findDistrict.replace(new RegExp(" ", "g"), "-") + "']").d3Down();
            $("[id='" + findDistrict.replace(new RegExp(" ", "g"), "-") + "']").d3Up();
            $("[id='" + findDistrict.replace(new RegExp(" ", "g"), "-") + "']").d3Click();
            $("[id='" + findMetro.replace(new RegExp(" ", "g"), "-") + "']").d3Down();
            $("[id='" + findMetro.replace(new RegExp(" ", "g"), "-") + "']").d3Up();
            $("[id='" + findMetro.replace(new RegExp(" ", "g"), "-") + "']").d3Click();
            return null;
        });

        $('.filter_box').keyup(function(i) {
            $(this).parent().parent().find('.dropdown .thisSwitch').hide();
            var txt = $(this).val();
            $(this).parent().parent().find('.dropdown .thisSwitch').each(function() {
                if ($(this).text().toUpperCase().indexOf(txt.toUpperCase()) != -1) {
                    $(this).show();
                }
            });
        });

        raceSpill("#govChart", "mn", "GC");
        // raceSpill("#senChart", "mn", "sen");
        // raceSpill("#senChart2", "mn", "sen2");
        // raceSpill("#partyChart", "mn", "party");
        raceSpill("#agChart", "mn", "AG");
        raceSpill("#sosChart", "mn", "SS");
        raceSpill("#saChart", "mn", "sa");
        raceSpill("#usChart", "1", "US");
        raceSpill("#houseChart", "01A", "House");
        raceSpill("#senateChart", "1", "Senate");


        mapBuild("#mapState", "#infobox", "#chart", "us_cd_mn_2012.json", "us", "mn", dataRaces, 0);
        mapBuild("#mapMetroS", "#infobox", "#chart", "mnsenate_metro.json", "senate", "metro", dataRaces, 0);
        mapBuild("#mapStateS", "#infobox", "#chart", "mnsenate.json", "senate", "mn", dataRaces, 0);
        mapBuild("#mapMetroH", "#infobox", "#chart", "mnleg_metro.json", "house", "metro", dataRaces, 0);
        mapBuild("#mapStateH", "#infobox", "#chart", "mnleg.json", "house", "mn", dataRaces, 0);

    });
});

function partyChart(){

        var  padding = {
                top: 20,
                right: 0,
                bottom: 20,
                left: 0,
            };

        var partyChart = c3.generate({
              bindto: "#partyChart",
              padding: padding,
                data: {
                    x: 'x',
                    columns:
                    [
                        ['x', 'DFL', 'GOP'],
                        ['Fundraising', 2779469, 564541]
                    ],
                    type: 'bar',
                labels: {
                    format: {
                        'Fundraising': d3.format('$,')
                    }
                },
                colors: {
                  'Fundraising': function(d) { 
                  if (d.index == 0 ) { return "#3585BC"; }
                  else { return "#d34A44"; }
                }
                }
                },
                legend: {
                    show: false
                },
                 tooltip: {
                    show: false
                },
                axis: {
                    // rotated: true,
                     y: {
                            max: 3000000,
                            min: 0,
                            padding: {bottom: 0, top:0},
                            tick: {
                             count: 4,
                             values: [0,1000000,2000000,3000000],
                             format: d3.format('$,')
                            }
                        },
                    x: {
                        type: 'category',
                        tick: {
                            multiline:false
                        }
                    }
                }
        });

}

    partyChart();
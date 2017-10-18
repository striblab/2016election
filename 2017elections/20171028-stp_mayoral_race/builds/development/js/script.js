(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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


d3.json('./shapefiles/stp_wards.geojson', function(error, wards) {
d3.json('./shapefiles/zip_summary.json', function(error, zip) {

mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhZG93ZmxhcmUiLCJhIjoiS3pwY1JTMCJ9.pTSXx_LFgR3XBpCNNxWPKA';

//STP MAP
var map = new mapboxgl.Map({
    container: 'mapSTP',
    style: 'mapbox://styles/shadowflare/ciqzo0bu20004bknkbrhrm6wf',
    // center: [-93.179770, 44.877039],
    center: [-93.089958, 44.953703],
    zoom: 9,
    minZoom: 2
});

map.addControl(new mapboxgl.NavigationControl());
map.scrollZoom.disable();

map.on('load', function() {
$(".mapboxgl-ctrl-geocoder input").attr("placeholder","Search by city or address");

// geocoder2.on('result', function(ev) {
//   map2.flyTo({ center: ev.result.geometry.coordinates, zoom: 14 });
//     });

    map.addSource("zip", {
        type: "geojson",
        data: zip
    });

      map.addLayer({
       'id': 'overall-layer',
       'interactive': true,
       'source': 'zip',
       'layout': {},
       'type': 'fill',
          'paint': {
           'fill-color': {
            "property": "zip_summary_total",
            "stops": [
              [0, "#fefefe"],
              [500, "#f0f0f0"],
              [1000, "#d9d9d9"],
              [5000, "#bdbdbd"],
              [10000, "#969696"],
              [15000, "#737373"],
              [20000, "#525252"],
              [50000, "#252525"]
           ]
        },
           'fill-opacity': 1,
           'fill-outline-color': 'rgba(255, 255, 255, 0)'
            }
   }, 'place-neighbourhood');

      map.addLayer({
       'id': 'carter-layer',
       'interactive': true,
       'source': 'zip',
       'layout': {},
       'type': 'fill',
          'paint': {
           'fill-color': {
            "property": "zip_summary_carter",
            "stops": [
              [0, "#fefefe"],
              [300, "#e5f5e0"],
              [675, "#c7e9c0"],
              [1250, "#a1d99b"],
              [2500, "#74c476"],
              [5000, "#41ab5d"],
              [10000, "#238b45"],
              [15000, "#005a32"]
           ]
        },
           'fill-opacity': 1,
           'fill-outline-color': 'rgba(255, 255, 255, 0)'
            }
   }, 'place-neighbourhood');

      map.addLayer({
       'id': 'dickenson-layer',
       'interactive': true,
       'source': 'zip',
       'layout': {},
       'type': 'fill',
          'paint': {
           'fill-color': {
            "property": "zip_summary_dickenson",
            "stops": [
              [0, "#fefefe"],
              [50, "#fee8c8"],
              [1000, "#fdd49e"],
              [2000, "#fdbb84"],
              [2500, "#fc8d59"],
              [3000, "#ef6548"],
              [3500, "#d7301f"],
              [4000, "#990000"]
           ]
        },
           'fill-opacity': 1,
           'fill-outline-color': 'rgba(255, 255, 255, 0)'
            }
   }, 'place-neighbourhood');

      map.addLayer({
       'id': 'goldstein-layer',
       'interactive': true,
       'source': 'zip',
       'layout': {},
       'type': 'fill',
          'paint': {
           'fill-color': {
            "property": "zip_summary_goldstein",
            "stops": [
              [0, "#fefefe"],
              [50, "#ece7f2"],
              [100, "#d0d1e6"],
              [4000, "#a6bddb"],
              [6000, "#74a9cf"],
              [7000, "#3690c0"],
              [8000, "#0570b0"],
              [9000, "#034e7b"]
           ]
        },
           'fill-opacity': 1,
           'fill-outline-color': 'rgba(255, 255, 255, 0)'
            }
   }, 'place-neighbourhood');

      map.addLayer({
       'id': 'harris-layer',
       'interactive': true,
       'source': 'zip',
       'layout': {},
       'type': 'fill',
          'paint': {
           'fill-color': {
            "property": "zip_summary_harris",
            "stops": [
              [0, "#fefefe"],
              [500, "#fee0d2"],
              [1000, "#fcbba1"],
              [5000, "#fc9272"],
              [10000, "#fb6a4a"],
              [15000, "#ef3b2c"],
              [20000, "#cb181d"],
              [40000, "#99000d"]
           ]
        },
           'fill-opacity': 1,
           'fill-outline-color': 'rgba(255, 255, 255, 0)'
            }
   }, 'place-neighbourhood');

      map.addLayer({
       'id': 'thao-layer',
       'interactive': true,
       'source': 'zip',
       'layout': {},
       'type': 'fill',
          'paint': {
           'fill-color': {
            "property": "zip_summary_thao",
            "stops": [
              [0, "#fefefe"],
              [500, "#efedf5"],
              [1000, "#dadaeb"],
              [2500, "#bcbddc"],
              [5000, "#9e9ac8"],
              [6000, "#807dba"],
              [8000, "#6a51a3"],
              [10000, "#4a1486"]
           ]
        },
           'fill-opacity': 1,
           'fill-outline-color': 'rgba(255, 255, 255, 0)'
            }
   }, 'place-neighbourhood');

    map.addSource("wards", {
        type: "geojson",
        data: wards
    });

   //    map.addLayer({
   //     'id': 'wards-layer',
   //     'interactive': true,
   //     'source': 'wards',
   //     'layout': {},
   //     'type': 'fill',
   //        'paint': {
   //         'fill-color': "#ffffff",
   //         'fill-opacity': 0.3,
   //         'fill-outline-color': 'rgba(0, 0, 0, 1)'
   //          }
   // }, 'place-neighbourhood');

  map.setLayoutProperty('carter-layer', 'visibility', 'none');
  map.setLayoutProperty('dickenson-layer', 'visibility', 'none');
  map.setLayoutProperty('goldstein-layer', 'visibility', 'none');
  map.setLayoutProperty('harris-layer', 'visibility', 'none');
  map.setLayoutProperty('thao-layer', 'visibility', 'none');
  map.setLayoutProperty('overall-layer', 'visibility', 'visible');

$(".clicky").click(function() {
  $(".clicky").removeClass("clickSelect");
  $(this).addClass("clickSelect");

  map.setLayoutProperty('overall-layer', 'visibility', 'none');
  map.setLayoutProperty('carter-layer', 'visibility', 'none');
  map.setLayoutProperty('dickenson-layer', 'visibility', 'none');
  map.setLayoutProperty('goldstein-layer', 'visibility', 'none');
  map.setLayoutProperty('harris-layer', 'visibility', 'none');
  map.setLayoutProperty('thao-layer', 'visibility', 'none');
  map.setLayoutProperty($(this).attr("data") + '-layer', 'visibility', 'visible');
});

var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: true
});

map.on('mousemove', function(e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['overall-layer','carter-layer','dickenson-layer','goldstein-layer','harris-layer','thao-layer'] });
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

    if (!features.length) {
        popup.remove();
        return;
    }

    var feature = features[0];

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(e.lngLat)
        .setHTML("<div>" + feature.properties.ZCTA5CE10 + "</div><div class='legend gray3'><div class='label'>Total</div><div class='total'>" + d3.format("$,")(feature.properties.zip_summary_total) + "</div></div><div class='legend green3'><div class='label'>Carter</div><div class='total'>" + d3.format("$,")(feature.properties.zip_summary_carter) + "</div></div><div class='legend orange3'><div class='label'>Dickenson</div><div class='total'>" + d3.format("$,")(feature.properties.zip_summary_dickenson) + "</div></div><div class='legend blue3'><div class='label'>Goldstein</div><div class='total'>" + d3.format("$,")(feature.properties.zip_summary_goldstein) + "</div></div><div class='legend red4'><div class='label'>Harris</div><div class='total'>" + d3.format("$,")(feature.properties.zip_summary_harris) + "</div></div><div class='legend purple3'><div class='label'>Thao</div><div class='total'>" + d3.format("$,")(feature.properties.zip_summary_thao) + "</div></div>")
        .addTo(map);
});

});



//populate charts
  function chartTotals(){

    var  padding = {
            top: 20,
            right: 60,
            bottom: 20,
            left: 100,
        };

    var chartTotals = c3.generate({
          bindto: "#chartTotals",
          padding: padding,
          data: {
                columns: [
                  ['Contributions',256742,14957,15654,292113,141902]
                ],
            type: 'bar',
            labels: {
                format: {
                    'Contributions': d3.format('$,')
                }
            }
            },
            legend: {
                show: false
            },
            point: {
                show: false
            },
                color: {
                  pattern: ['#333333']
                },
            axis: {
                  y: {
                        min: 0,
                        padding: {bottom: 0, top: 15},
                        tick: {
                        format: d3.format('$,')
                        }
                    },
                 x: {
                    type: 'category',
                    categories: ['Carter','Dickenson','Goldstein','Harris','Thao'],
                    tick: {
                        // count: 4,
                        multiline: false,
                        // format: d3.format('.0f')
                    }
                 }
            }
    });
}

chartTotals();

  function chartState(){

    var  padding = {
            top: 20,
            right: 60,
            bottom: 20,
            left: 100,
        };

    var chartState = c3.generate({
          bindto: "#chartState",
          padding: padding,
          data: {
                columns: [
                  ['Minnesota',203412,11208,14854,279188,75037],
                  ['Out-of-state',53330,3750,800,12925,66865]
                ],
            type: 'bar',
            groups: [
                ['Minnesota', 'Out-of-state']
            ],
            },
            legend: {
                show: false
            },
            point: {
                show: false
            },
                color: {
                  pattern: ['#333333','#aaaaaa']
                },
            axis: {
                  y: {
                        min: 0,
                        padding: {bottom: 0, top: 15},
                        tick: {
                        format: d3.format('$,')
                        }
                    },
                 x: {
                    type: 'category',
                    categories: ['Carter','Dickenson','Goldstein','Harris','Thao'],
                    tick: {
                        // count: 4,
                        multiline: false,
                        // format: d3.format('.0f')
                    }
                 }
            }
    });
}

chartState();


  function chartRegion(){

    var  padding = {
            top: 20,
            right: 60,
            bottom: 20,
            left: 100,
        };

    var chartRegion = c3.generate({
          bindto: "#chartRegion",
          padding: padding,
          data: {
                columns: [
                  ["St. Paul",0.532827592,0.660617466,0.859464432,0.57128978,0.261934588],
                  ["Minneapolis",0.098148958,0.015748868,0.038327882,0.066755089,0.019626243],
                  ["Metro",0.156982129,0.066244593,0.051103843,0.285785863,0.246529573],
                  ["Outstate",0.006270877,0.00668543,0,0.031922626,0.000704712],
                  ["Elsewhere",0.205770445,0.250703642,0.051103843,0.044246642,0.471204884]
                ],
            type: 'bar',
            // groups: [
            //     ['St. Paul', 'Minneapolis','Metro','Outstate','Elsewhere']
            // ]
            },
            legend: {
                show: false
            },
            point: {
                show: false
            },
                color: {
                  pattern: ['#1b9e77','#d95f02','#7570b3','#e7298a',"#66a61e"]
                },
            axis: {
                  y: {
                        max: 1,
                        min: 0,
                        padding: {bottom: 0, top: 0},
                        tick: {
                        values: [0,0.25,0.50,0.75,1],
                        format: d3.format('%')
                        }
                    },
                 x: {
                    type: 'category',
                    categories: ['Carter','Dickenson','Goldstein','Harris','Thao'],
                    tick: {
                        // count: 4,
                        multiline: false,
                        // format: d3.format('.0f')
                    }
                 }
            }
    });
}

chartRegion();

});
});
},{}]},{},[1])
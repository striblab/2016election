!function e(o,i,a){function t(l,s){if(!i[l]){if(!o[l]){var n="function"==typeof require&&require;if(!s&&n)return n(l,!0);if(r)return r(l,!0);throw new Error("Cannot find module '"+l+"'")}var d=i[l]={exports:{}};o[l][0].call(d.exports,function(e){var i=o[l][1][e];return t(i||e)},d,d.exports,e,o,i,a)}return i[l].exports}for(var r="function"==typeof require&&require,l=0;l<a.length;l++)t(a[l]);return t}({1:[function(e,o,i){$.urlParam=function(e){var o=new RegExp("[?&]"+e+"=([^&#]*)").exec(window.location.href);return null!=o?o[1]||0:null};var a=$.urlParam("chart");null!=a&&($(".slide").hide(),$("#"+a).show()),d3.json("./shapefiles/stp_wards.geojson",function(e,o){d3.json("./shapefiles/zip_summary.json",function(e,i){mapboxgl.accessToken="pk.eyJ1Ijoic2hhZG93ZmxhcmUiLCJhIjoiS3pwY1JTMCJ9.pTSXx_LFgR3XBpCNNxWPKA";var a=new mapboxgl.Map({container:"mapSTP",style:"mapbox://styles/shadowflare/ciqzo0bu20004bknkbrhrm6wf",center:[-93.089958,44.953703],zoom:9,minZoom:2});a.addControl(new mapboxgl.NavigationControl),a.on("load",function(){$(".mapboxgl-ctrl-geocoder input").attr("placeholder","Search by city or address"),a.addSource("zip",{type:"geojson",data:i}),a.addLayer({id:"overall-layer",interactive:!0,source:"zip",layout:{},type:"fill",paint:{"fill-color":{property:"zip_summary_total",stops:[[0,"#fefefe"],[500,"#f0f0f0"],[1e3,"#d9d9d9"],[5e3,"#bdbdbd"],[1e4,"#969696"],[15e3,"#737373"],[2e4,"#525252"],[5e4,"#252525"]]},"fill-opacity":1,"fill-outline-color":"rgba(255, 255, 255, 0)"}},"place-neighbourhood"),a.addLayer({id:"carter-layer",interactive:!0,source:"zip",layout:{},type:"fill",paint:{"fill-color":{property:"zip_summary_carter",stops:[[0,"#fefefe"],[300,"#e5f5e0"],[675,"#c7e9c0"],[1250,"#a1d99b"],[2500,"#74c476"],[5e3,"#41ab5d"],[1e4,"#238b45"],[15e3,"#005a32"]]},"fill-opacity":1,"fill-outline-color":"rgba(255, 255, 255, 0)"}},"place-neighbourhood"),a.addLayer({id:"dickenson-layer",interactive:!0,source:"zip",layout:{},type:"fill",paint:{"fill-color":{property:"zip_summary_dickenson",stops:[[0,"#fefefe"],[50,"#fee8c8"],[1e3,"#fdd49e"],[2e3,"#fdbb84"],[2500,"#fc8d59"],[3e3,"#ef6548"],[3500,"#d7301f"],[4e3,"#990000"]]},"fill-opacity":1,"fill-outline-color":"rgba(255, 255, 255, 0)"}},"place-neighbourhood"),a.addLayer({id:"goldstein-layer",interactive:!0,source:"zip",layout:{},type:"fill",paint:{"fill-color":{property:"zip_summary_goldstein",stops:[[0,"#fefefe"],[50,"#ece7f2"],[100,"#d0d1e6"],[4e3,"#a6bddb"],[6e3,"#74a9cf"],[7e3,"#3690c0"],[8e3,"#0570b0"],[9e3,"#034e7b"]]},"fill-opacity":1,"fill-outline-color":"rgba(255, 255, 255, 0)"}},"place-neighbourhood"),a.addLayer({id:"harris-layer",interactive:!0,source:"zip",layout:{},type:"fill",paint:{"fill-color":{property:"zip_summary_harris",stops:[[0,"#fefefe"],[500,"#fee0d2"],[1e3,"#fcbba1"],[5e3,"#fc9272"],[1e4,"#fb6a4a"],[15e3,"#ef3b2c"],[2e4,"#cb181d"],[4e4,"#99000d"]]},"fill-opacity":1,"fill-outline-color":"rgba(255, 255, 255, 0)"}},"place-neighbourhood"),a.addLayer({id:"thao-layer",interactive:!0,source:"zip",layout:{},type:"fill",paint:{"fill-color":{property:"zip_summary_thao",stops:[[0,"#fefefe"],[500,"#efedf5"],[1e3,"#dadaeb"],[2500,"#bcbddc"],[5e3,"#9e9ac8"],[6e3,"#807dba"],[8e3,"#6a51a3"],[1e4,"#4a1486"]]},"fill-opacity":1,"fill-outline-color":"rgba(255, 255, 255, 0)"}},"place-neighbourhood"),a.addSource("wards",{type:"geojson",data:o}),a.addLayer({id:"wards-layer",interactive:!0,source:"wards",layout:{},type:"fill",paint:{"fill-color":"#ffffff","fill-opacity":.3,"fill-outline-color":"rgba(0, 0, 0, 1)"}},"place-neighbourhood"),a.setLayoutProperty("carter-layer","visibility","none"),a.setLayoutProperty("dickenson-layer","visibility","none"),a.setLayoutProperty("goldstein-layer","visibility","none"),a.setLayoutProperty("harris-layer","visibility","none"),a.setLayoutProperty("thao-layer","visibility","none"),a.setLayoutProperty("overall-layer","visibility","visible"),$(".clicky").click(function(){$(".clicky").removeClass("clickSelect"),$(this).addClass("clickSelect"),a.setLayoutProperty("overall-layer","visibility","none"),a.setLayoutProperty("carter-layer","visibility","none"),a.setLayoutProperty("dickenson-layer","visibility","none"),a.setLayoutProperty("goldstein-layer","visibility","none"),a.setLayoutProperty("harris-layer","visibility","none"),a.setLayoutProperty("thao-layer","visibility","none"),a.setLayoutProperty($(this).attr("data")+"-layer","visibility","visible")});var e=new mapboxgl.Popup({closeButton:!1,closeOnClick:!0});a.on("mousemove",function(o){var i=a.queryRenderedFeatures(o.point,{layers:["overall-layer","carter-layer","dickenson-layer","goldstein-layer","harris-layer","thao-layer"]});if(a.getCanvas().style.cursor=i.length?"pointer":"",!i.length)return void e.remove();var t=i[0];e.setLngLat(o.lngLat).setHTML("<div>"+t.properties.ZCTA5CE10+"</div><div class='legend gray3'><div class='label'>Total</div><div class='total'>"+d3.format("$,")(t.properties.zip_summary_total)+"</div></div><div class='legend green3'><div class='label'>Carter</div><div class='total'>"+d3.format("$,")(t.properties.zip_summary_carter)+"</div></div><div class='legend orange3'><div class='label'>Dickenson</div><div class='total'>"+d3.format("$,")(t.properties.zip_summary_dickenson)+"</div></div><div class='legend blue3'><div class='label'>Goldstein</div><div class='total'>"+d3.format("$,")(t.properties.zip_summary_goldstein)+"</div></div><div class='legend red4'><div class='label'>Harris</div><div class='total'>"+d3.format("$,")(t.properties.zip_summary_harris)+"</div></div><div class='legend purple3'><div class='label'>Thao</div><div class='total'>"+d3.format("$,")(t.properties.zip_summary_thao)+"</div></div>").addTo(a)})}),function(){var e={top:20,right:60,bottom:20,left:100};c3.generate({bindto:"#chartTotals",padding:e,data:{columns:[["Contributions",256742,14957,15654,292113,141902]],type:"bar",labels:{format:{Contributions:d3.format("$,")}}},legend:{show:!1},point:{show:!1},color:{pattern:["#333333"]},axis:{y:{min:0,padding:{bottom:0,top:15},tick:{format:d3.format("$,")}},x:{type:"category",categories:["Carter","Dickenson","Goldstein","Harris","Thao"],tick:{multiline:!1}}}})}(),function(){var e={top:20,right:60,bottom:20,left:100};c3.generate({bindto:"#chartState",padding:e,data:{columns:[["Minnesota",203412,11208,14854,279188,75037],["Out-of-state",53330,3750,800,12925,66865]],type:"bar",groups:[["Minnesota","Out-of-state"]]},legend:{show:!1},point:{show:!1},color:{pattern:["#333333","#aaaaaa"]},axis:{y:{min:0,padding:{bottom:0,top:15},tick:{format:d3.format("$,")}},x:{type:"category",categories:["Carter","Dickenson","Goldstein","Harris","Thao"],tick:{multiline:!1}}}})}()})})},{}]},{},[1]);
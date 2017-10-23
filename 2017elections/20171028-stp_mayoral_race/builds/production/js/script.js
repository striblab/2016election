!function e(i,a,t){function r(l,s){if(!a[l]){if(!i[l]){var d="function"==typeof require&&require;if(!s&&d)return d(l,!0);if(o)return o(l,!0);throw new Error("Cannot find module '"+l+"'")}var n=a[l]={exports:{}};i[l][0].call(n.exports,function(e){var a=i[l][1][e];return r(a||e)},n,n.exports,e,i,a,t)}return a[l].exports}for(var o="function"==typeof require&&require,l=0;l<t.length;l++)r(t[l]);return r}({1:[function(e,i,a){$.urlParam=function(e){var i=new RegExp("[?&]"+e+"=([^&#]*)").exec(window.location.href);return null!=i?i[1]||0:null};var t=$.urlParam("chart");null!=t&&($(".slide").hide(),$("#"+t).show()),d3.json("./shapefiles/stp_wards.geojson",function(e,i){d3.json("./shapefiles/zip_summary.json",function(e,a){mapboxgl.accessToken="pk.eyJ1Ijoic2hhZG93ZmxhcmUiLCJhIjoiS3pwY1JTMCJ9.pTSXx_LFgR3XBpCNNxWPKA";var t=new mapboxgl.Map({container:"mapSTP",style:"mapbox://styles/shadowflare/ciqzo0bu20004bknkbrhrm6wf",center:[-93.089958,44.953703],zoom:8.8,minZoom:2});t.addControl(new mapboxgl.NavigationControl),t.scrollZoom.disable(),t.on("load",function(){$(".mapboxgl-ctrl-geocoder input").attr("placeholder","Search by city or address"),t.addSource("zip",{type:"geojson",data:a}),t.addLayer({id:"overall-layer",interactive:!0,source:"zip",layout:{},type:"fill",paint:{"fill-color":{property:"zip_summary_total",stops:[[0,"#fefefe"],[500,"#f0f0f0"],[1e3,"#d9d9d9"],[5e3,"#bdbdbd"],[1e4,"#969696"],[15e3,"#737373"],[2e4,"#525252"],[5e4,"#252525"]]},"fill-opacity":1,"fill-outline-color":"rgba(255, 255, 255, 0)"}},"place-neighbourhood"),t.addLayer({id:"carter-layer",interactive:!0,source:"zip",layout:{},type:"fill",paint:{"fill-color":{property:"zip_summary_carter",stops:[[0,"#fefefe"],[300,"#e5f5e0"],[675,"#c7e9c0"],[1250,"#a1d99b"],[2500,"#74c476"],[5e3,"#41ab5d"],[1e4,"#238b45"],[15e3,"#005a32"]]},"fill-opacity":1,"fill-outline-color":"rgba(255, 255, 255, 0)"}},"place-neighbourhood"),t.addLayer({id:"dickinson-layer",interactive:!0,source:"zip",layout:{},type:"fill",paint:{"fill-color":{property:"zip_summary_dickenson",stops:[[0,"#fefefe"],[50,"#fee8c8"],[1e3,"#fdd49e"],[2e3,"#fdbb84"],[2500,"#fc8d59"],[3e3,"#ef6548"],[3500,"#d7301f"],[4e3,"#990000"]]},"fill-opacity":1,"fill-outline-color":"rgba(255, 255, 255, 0)"}},"place-neighbourhood"),t.addLayer({id:"goldstein-layer",interactive:!0,source:"zip",layout:{},type:"fill",paint:{"fill-color":{property:"zip_summary_goldstein",stops:[[0,"#fefefe"],[50,"#ece7f2"],[100,"#d0d1e6"],[4e3,"#a6bddb"],[6e3,"#74a9cf"],[7e3,"#3690c0"],[8e3,"#0570b0"],[9e3,"#034e7b"]]},"fill-opacity":1,"fill-outline-color":"rgba(255, 255, 255, 0)"}},"place-neighbourhood"),t.addLayer({id:"harris-layer",interactive:!0,source:"zip",layout:{},type:"fill",paint:{"fill-color":{property:"zip_summary_harris",stops:[[0,"#fefefe"],[500,"#fee0d2"],[1e3,"#fcbba1"],[5e3,"#fc9272"],[1e4,"#fb6a4a"],[15e3,"#ef3b2c"],[2e4,"#cb181d"],[4e4,"#99000d"]]},"fill-opacity":1,"fill-outline-color":"rgba(255, 255, 255, 0)"}},"place-neighbourhood"),t.addLayer({id:"thao-layer",interactive:!0,source:"zip",layout:{},type:"fill",paint:{"fill-color":{property:"zip_summary_thao",stops:[[0,"#fefefe"],[500,"#efedf5"],[1e3,"#dadaeb"],[2500,"#bcbddc"],[5e3,"#9e9ac8"],[6e3,"#807dba"],[8e3,"#6a51a3"],[1e4,"#4a1486"]]},"fill-opacity":1,"fill-outline-color":"rgba(255, 255, 255, 0)"}},"place-neighbourhood"),t.addSource("wards",{type:"geojson",data:i}),t.setLayoutProperty("carter-layer","visibility","none"),t.setLayoutProperty("dickinson-layer","visibility","none"),t.setLayoutProperty("goldstein-layer","visibility","none"),t.setLayoutProperty("harris-layer","visibility","none"),t.setLayoutProperty("thao-layer","visibility","none"),t.setLayoutProperty("overall-layer","visibility","visible"),$(".clicky").click(function(){$(".clicky").removeClass("clickSelect"),$(this).addClass("clickSelect"),t.setLayoutProperty("overall-layer","visibility","none"),t.setLayoutProperty("carter-layer","visibility","none"),t.setLayoutProperty("dickinson-layer","visibility","none"),t.setLayoutProperty("goldstein-layer","visibility","none"),t.setLayoutProperty("harris-layer","visibility","none"),t.setLayoutProperty("thao-layer","visibility","none"),t.setLayoutProperty($(this).attr("data")+"-layer","visibility","visible")});var e=new mapboxgl.Popup({closeButton:!1,closeOnClick:!0});t.on("mousemove",function(i){var a=t.queryRenderedFeatures(i.point,{layers:["overall-layer","carter-layer","dickinson-layer","goldstein-layer","harris-layer","thao-layer"]});if(t.getCanvas().style.cursor=a.length?"pointer":"",!a.length)return void e.remove();var r=a[0];e.setLngLat(i.lngLat).setHTML("<div class='districtName'>"+r.properties.ZCTA5CE10+"</div><div class='legend gray3'><div class='label'>Total</div><div class='total'>"+d3.format("$,")(r.properties.zip_summary_total)+"</div></div><div class='legend green3'><div class='label'>Carter</div><div class='total'>"+d3.format("$,")(r.properties.zip_summary_carter)+"</div></div><div class='legend orange3'><div class='label'>Dickinson</div><div class='total'>"+d3.format("$,")(r.properties.zip_summary_dickenson)+"</div></div><div class='legend blue3'><div class='label'>Goldstein</div><div class='total'>"+d3.format("$,")(r.properties.zip_summary_goldstein)+"</div></div><div class='legend red4'><div class='label'>Harris</div><div class='total'>"+d3.format("$,")(r.properties.zip_summary_harris)+"</div></div><div class='legend purple3'><div class='label'>Thao</div><div class='total'>"+d3.format("$,")(r.properties.zip_summary_thao)+"</div></div>"),$("#tooltip").html("<div class='districtName'>"+r.properties.ZCTA5CE10+"</div><div class='legend gray3'><div class='label'>Total</div><div class='total'>"+d3.format("$,")(r.properties.zip_summary_total)+"</div></div><div class='legend green3'><div class='label'>Carter</div><div class='total'>"+d3.format("$,")(r.properties.zip_summary_carter)+"</div></div><div class='legend orange3'><div class='label'>Dickinson</div><div class='total'>"+d3.format("$,")(r.properties.zip_summary_dickenson)+"</div></div><div class='legend blue3'><div class='label'>Goldstein</div><div class='total'>"+d3.format("$,")(r.properties.zip_summary_goldstein)+"</div></div><div class='legend red4'><div class='label'>Harris</div><div class='total'>"+d3.format("$,")(r.properties.zip_summary_harris)+"</div></div><div class='legend purple3'><div class='label'>Thao</div><div class='total'>"+d3.format("$,")(r.properties.zip_summary_thao)+"</div></div>")})}),function(){var e={top:20,right:60,bottom:20,left:100};c3.generate({bindto:"#chartTotals",padding:e,data:{columns:[["Contributions",264643,15744,19954,287608,171542]],type:"bar",labels:{format:{Contributions:d3.format("$,")}}},legend:{show:!1},point:{show:!1},color:{pattern:["#2C3942"]},axis:{y:{min:0,padding:{bottom:0,top:15},tick:{format:d3.format("$,")}},x:{type:"category",categories:["Carter","Dickinson","Goldstein","Harris","Thao"],tick:{rotate:-75,multiline:!1},height:50}}})}(),function(){var e={top:20,right:60,bottom:20,left:100};c3.generate({bindto:"#chartRegion",padding:e,data:{columns:[["St. Paul",.509423433,.622317712,.877222684,.476449686,.297095515],["Minneapolis",.090105877,.018059783,.033183058,.066852939,.027732177],["Metro",.188429368,.072131801,.036501364,.388635617,.253947509],["Outstate",.006270877,.007666419,0,.012964144,.004952175],["Other States",.205770445,.203160098,.053092893,.05457204,.411990799]],type:"bar"},legend:{show:!1},point:{show:!1},color:{pattern:["#2C3942","#556E7F","#7F98AA","#A8B9C5","#DAE1E7"]},axis:{y:{max:1,min:0,padding:{bottom:0,top:0},tick:{values:[0,.25,.5,.75,1],format:d3.format("%")}},x:{type:"category",categories:["Carter","Dickinson","Goldstein","Harris","Thao"],tick:{rotate:-75,multiline:!1},height:50}}})}()})})},{}]},{},[1]);
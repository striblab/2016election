<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Minnesota Voter Turnout</title>
  <meta name="description" content="Minnesota Voter Turnout">
  <meta name="author" content="Jeff Hargarten - StarTribune">

  <link rel="stylesheet" href="../_common_resources/interfaces/d3.slider-master/d3.slider.css" />
  <link rel="stylesheet" href="../_common_resources/styles/startribune_dataviz_styles.css" />
  <link href="../_common_resources/charts/nvd3-master/build/nv.d3.css" rel="stylesheet" type="text/css">

<!-- load common cdn script and css calls -->
  <?php
  readfile('../_common_resources/cdn.php');
  ?>
  
  <style>
    .republican { background-color:#a50f15; fill:#a50f15 !important; color:white !important; pointer-events: all; font-weight:bold; }
    .mid { background-color:#777; fill:#777 !important; color:white !important; pointer-events: all; font-weight:bold; }
    .democrat { background-color:#082659; fill:#082659 !important; color:white !important; pointer-events: all; font-weight:bold; }
   
    #back { float:left; font-size:1.7em; font-weight:bold; }
    #forward { float:right; font-size:1.7em; font-weight:bold; }
    #back:hover, #forward:hover { cursor:pointer; }

    .background { fill: none; pointer-events: all; }
    .states { fill: #aaa; }
    #state-borders { fill: none; stroke: #fff; stroke-width: 2px; stroke-linejoin: round; stroke-linecap: round; pointer-events: none; } 
    .tooltip{ background-color:rgba(255,255,255,1); height: auto; width: auto; padding:10px; -webkit-border-radius:10px; -moz-border-radius:10px; border-radius:0; border: 1px solid black; font-size:13px; font-family:Arial; }
    .states .active { fill: #333 !important; fill-opacity: 1 !important; }
    .faded { fill-opacity: 0.5 !important; }

/*    .metro { float:right; }
    .mn { float:left; }*/

    #precinctName { float:left; }
    #raceName { float:right; }

    #filter input { width:100% !important; }

    .map path:hover { fill:#333 !important; cursor:pointer; }

    .swatch { height:50px; width:50px; }

    .yearSection { width:100%; }

    #chart { width:100%; }

    .tableHead { display:inline-block; padding:10px; border-bottom:1px solid #ddd; width:18%; font-weight:900; font-family:"Poynter Serif RE"; }
    .tableCell { display:inline-block; padding:10px; border-bottom:1px solid #ddd; width:18%; font-family:"Benton Sans"; }
    .partyBar { width:50px !important; border-bottom:none !important; }
    .tableBreak { clear:both; display:block; }
    .table { text-align:center; }

    .t1 { fill:#6c7f8c !important; background-color:#6c7f8c; }
    .t2 { fill:#404b52 !important; background-color:#404b52; }
    .t3 { fill:#22282c !important; background-color:#22282c; }
    .t4 { fill:#131719 !important; background-color:#131719; }

    .pSelect { background-color:#333 !important; color:#fff !important; }
    .precinct:hover  { background-color:#333 !important; color:#fff !important; cursor:pointer; }

    .votes, .pct { font-family:"Popular" !important; font-weight:900; }
    .category { font-weight:900;  font-size:1.5em; text-align:center; }
    .question { font-size:1em; text-align:center;  }
    #infobox { font-family:"Poynter Serif RE"; font-weight:900;  font-size:1.7em; }

    #leftPane { float:left; width:35%; }
    #rightPane { float:right; width:60%; text-align:center; }

     @media only screen and (max-width:720px) {
     .map { width:100%; text-align:center; }
     .tableHead { display:inline-block; padding:10px; border-bottom:1px solid #ddd; width:17%; font-size:.8em; }
     .tableCell { display:inline-block; padding:10px; border-bottom:1px solid #ddd; width:17%; font-size:.8em; }
     }
     @media only screen and (max-width:870px) {
      #rightPane, #leftPane { width:100%; float:none; }

     }
  </style> 
</head>

<body>
  <div id="wrapper">

<!-- <div id="resultsMenu">
  <button class="myButton2" id="presidentB" data="president">President</button>
  <button class="myButton2" id="ushouseB" data="ushouse">US House</button>
  <button class="myButton2" id="ussenateB" data="ussenate">US Senate</button>
  <button class="myButton2" id="mnhouseB" data="mnhouse">MN House</button>
  <button class="myButton2" id="mnsenateB" data="mnsenate">MN Senate</button>
  <button class="myButton2" id="governorsB" data="governor">Governor</button>
</div> -->

<div class="breaker"></div>

<!--     <div id="sliderDiv"><div id="slider"></div></div>
    <div class="breaker"></div>
    <div id="back"><<</div><div id="forward">>></div>

<div class="breaker"></div> -->

<div id="leftPane">

      <div class="legendContainer">
      <span class='legend'>
        <nav class='legend clearfix'>
          <span style='background:#fff;'>GOP</span>
          <span class='republican'></span>
          <span class='mid'></span>
          <span class='democrat'></span>
          <span style='background:#fff;'>DFL</span>
        </nav>
      </span>
    </div> 

    <div class="legendContainer">
      <span class='legend'>
        <nav class='legend clearfix'>
          <span style='background:#fff;'>Less</span>
          <span class='t1'></span>
          <span class='t2'></span>
          <span class='t3'></span>
          <span class='t4'></span>
          <span style='background:#fff;'>More</span>
        </nav>
      </span>
    </div> 

    <div class="zoom">Reset View</div> 

<div class="breaker"></div>


<div class="yearSection y2014 maps">
    <div class="map governor mn" id="mapGovMN2014"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map governor metro" id="mapGovMetro2014"><svg></svg></div>
    <div class="map ussenate mn" id="mapSenMN2014"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map ussenate metro" id="mapSenMetro2014"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map ushouse mn" id="mapHouseMN2014"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map ushouse metro" id="mapHouseMetro2014"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map mnhouse mn" id="mapMNHouse2014"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map mnhouse metro" id="mapMNHouseMetro2014"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
</div>

<div class="yearSection y2012 maps">
    <div class="map ussenate mn" id="mapSenMN2012"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map ussenate metro" id="mapSenMetro2012"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map ushouse mn" id="mapHouseMN2012"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map ushouse metro" id="mapHouseMetro2012"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map mnsenate mn" id="mapMNSen2012"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map mnsenate metro" id="mapMNSenMetro2012"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map mnhouse mn" id="mapMNHouse2012"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map mnhouse metro" id="mapMNHouseMetro2012"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map president mn" id="mapPrezMN2012"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map president metro" id="mapPrezMetro2012"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
</div>

<div class="yearSection y2010 maps">
    <div class="map governor mn" id="mapGovMN2010"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map governor metro" id="mapGovMetro2010"><svg></svg></div>
    <div class="map ussenate mn" id="mapSenMN2010"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map ussenate metro" id="mapSenMetro2010"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map ushouse mn" id="mapHouseMN2010"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map ushouse metro" id="mapHouseMetro2014"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map mnhouse mn" id="mapMNHouse2010"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map mnhouse metro" id="mapMNHouseMetro2010"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
</div>

<div class="yearSection y2008 maps">
    <div class="map ussenate mn" id="mapSenMN2008"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map ussenate metro" id="mapSenMetro2008"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map ushouse mn" id="mapHouseMN2008"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map ushouse metro" id="mapHouseMetro2008"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map mnsenate mn" id="mapMNSen2008"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map mnsenate metro" id="mapMNSenMetro2008"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map mnhouse mn" id="mapMNHouse2008"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map mnhouse metro" id="mapMNHouseMetro2008"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map president mn" id="mapPrezMN2008"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
    <div class="map president metro" id="mapPrezMetro2008"><svg width="320" height="350" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid"></svg></div>
</div>

</div>


<div id="rightPane">


    <div id="infobox">
      <div id="precinctName">Minnesota</div>
      <div id="raceName">Governor</div>
    </div>
    <div id="chart"><svg></svg></div>

<div class="breaker"></div>

    <div id="filter"><input type="search" id="filter_box" placeholder="Search by keyword"></input></div>

    <div class="yearSection y2014 tables">
      <div class="table governor" data="governor" id="tableGov2014"><div class='tableHead partyBar'>W</div><div class='tableHead'>Precinct</div><div class='tableHead'>County</div><div class='tableHead'>GOP Votes</div><div class='tableHead'>DFL Votes</div><div class='tableHead'>Turnout</div></div>
      <div class="table ussenate" data="ussenate" id="tableUSSENATE2014"><div class='tableHead partyBar'>W</div><div class='tableHead'>Precinct</div><div class='tableHead'>County</div><div class='tableHead'>GOP Votes</div><div class='tableHead'>DFL Votes</div><div class='tableHead'>Turnout</div></div>
      <div class="table ushouse" data="ushouse" id="tableUSHOUSE2014"><div class='tableHead partyBar'>W</div><div class='tableHead'>Precinct</div><div class='tableHead'>County</div><div class='tableHead'>GOP Votes</div><div class='tableHead'>DFL Votes</div><div class='tableHead'>Turnout</div></div>
      <div class="table mnhouse" data="mnhouse" id="tableMNHOUSE2014"><div class='tableHead partyBar'>W</div><div class='tableHead'>Precinct</div><div class='tableHead'>County</div><div class='tableHead'>GOP Votes</div><div class='tableHead'>DFL Votes</div><div class='tableHead'>Turnout</div></div>
      <div class="table mnsenate" data="mnsenate" id="tableMNSEN2014"><div class='tableHead partyBar'>W</div><div class='tableHead'>Precinct</div><div class='tableHead'>County</div><div class='tableHead'>GOP Votes</div><div class='tableHead'>DFL Votes</div><div class='tableHead'>Turnout</div></div>
    </div>

    <div class="yearSection y2012 tables">
      <div class="table governor" data="governor" id="tableGov2012"><div class='tableHead partyBar'>W</div><div class='tableHead'>Precinct</div><div class='tableHead'>County</div><div class='tableHead'>GOP Votes</div><div class='tableHead'>DFL Votes</div><div class='tableHead'>Turnout</div></div>
      <div class="table ussenate" data="ussenate" id="tableUSSENATE2012"><div class='tableHead partyBar'>W</div><div class='tableHead'>Precinct</div><div class='tableHead'>County</div><div class='tableHead'>GOP Votes</div><div class='tableHead'>DFL Votes</div><div class='tableHead'>Turnout</div></div>
      <div class="table ushouse" data="ushouse" id="tableUSHOUSE2012"><div class='tableHead partyBar'>W</div><div class='tableHead'>Precinct</div><div class='tableHead'>County</div><div class='tableHead'>GOP Votes</div><div class='tableHead'>DFL Votes</div><div class='tableHead'>Turnout</div></div>
      <div class="table mnhouse" data="mnhouse" id="tableMNHOUSE2012"><div class='tableHead partyBar'>W</div><div class='tableHead'>Precinct</div><div class='tableHead'>County</div><div class='tableHead'>GOP Votes</div><div class='tableHead'>DFL Votes</div><div class='tableHead'>Turnout</div></div>
      <div class="table mnsenate" data="mnsenate" id="tableMNSEN2012"><div class='tableHead partyBar'>W</div><div class='tableHead'>Precinct</div><div class='tableHead'>County</div><div class='tableHead'>GOP Votes</div><div class='tableHead'>DFL Votes</div><div class='tableHead'>Turnout</div></div>
      <div class="table president" data="president" id="tablePrez2012"><div class='tableHead partyBar'>W</div><div class='tableHead'>Precinct</div><div class='tableHead'>County</div><div class='tableHead'>GOP Votes</div><div class='tableHead'>DFL Votes</div><div class='tableHead'>Turnout</div></div>
    </div>

    <div class="yearSection y2010 tables">
      <div class="table governor" data="governor" id="tableGov2010"><div class='tableHead partyBar'>W</div><div class='tableHead'>Precinct</div><div class='tableHead'>County</div><div class='tableHead'>GOP Votes</div><div class='tableHead'>DFL Votes</div><div class='tableHead'>Turnout</div></div>
      <div class="table ussenate" data="ussenate" id="tableUSSENATE2010"><div class='tableHead partyBar'>W</div><div class='tableHead'>Precinct</div><div class='tableHead'>County</div><div class='tableHead'>GOP Votes</div><div class='tableHead'>DFL Votes</div><div class='tableHead'>Turnout</div></div>
      <div class="table ushouse" data="ushouse" id="tableUSHOUSE2010"><div class='tableHead partyBar'>W</div><div class='tableHead'>Precinct</div><div class='tableHead'>County</div><div class='tableHead'>GOP Votes</div><div class='tableHead'>DFL Votes</div><div class='tableHead'>Turnout</div></div>
      <div class="table mnhouse" data="mnhouse" id="tableMNHOUSE2010"><div class='tableHead partyBar'>W</div><div class='tableHead'>Precinct</div><div class='tableHead'>County</div><div class='tableHead'>GOP Votes</div><div class='tableHead'>DFL Votes</div><div class='tableHead'>Turnout</div></div>
      <div class="table mnsenate" data="mnsenate" id="tableMNSEN2010"><div class='tableHead partyBar'>W</div><div class='tableHead'>Precinct</div><div class='tableHead'>County</div><div class='tableHead'>GOP Votes</div><div class='tableHead'>DFL Votes</div><div class='tableHead'>Turnout</div></div>
    </div>

    <div class="yearSection y2008 tables">
      <div class="table governor" data="governor" id="tableGov2008"><div class='tableHead partyBar'>W</div><div class='tableHead'>Precinct</div><div class='tableHead'>County</div><div class='tableHead'>GOP Votes</div><div class='tableHead'>DFL Votes</div><div class='tableHead'>Turnout</div></div>
      <div class="table ussenate" data="ussenate" id="tableUSSENATE2008"><div class='tableHead partyBar'>W</div><div class='tableHead'>Precinct</div><div class='tableHead'>County</div><div class='tableHead'>GOP Votes</div><div class='tableHead'>DFL Votes</div><div class='tableHead'>Turnout</div></div>
      <div class="table ushouse" data="ushouse" id="tableUSHOUSE2008"><div class='tableHead partyBar'>W</div><div class='tableHead'>Precinct</div><div class='tableHead'>County</div><div class='tableHead'>GOP Votes</div><div class='tableHead'>DFL Votes</div><div class='tableHead'>Turnout</div></div>
      <div class="table mnhouse" data="mnhouse" id="tableMNHOUSE2008"><div class='tableHead partyBar'>W</div><div class='tableHead'>Precinct</div><div class='tableHead'>County</div><div class='tableHead'>GOP Votes</div><div class='tableHead'>DFL Votes</div><div class='tableHead'>Turnout</div></div>
      <div class="table mnsenate" data="mnsenate" id="tableMNSEN2008"><div class='tableHead partyBar'>W</div><div class='tableHead'>Precinct</div><div class='tableHead'>County</div><div class='tableHead'>GOP Votes</div><div class='tableHead'>DFL Votes</div><div class='tableHead'>Turnout</div></div>
      <div class="table president" data="president" id="tablePrez2008"><div class='tableHead partyBar'>W</div><div class='tableHead'>Precinct</div><div class='tableHead'>County</div><div class='tableHead'>GOP Votes</div><div class='tableHead'>DFL Votes</div><div class='tableHead'>Turnout</div></div>
    </div>
  </div>
</div>
</body>

<script src="../_common_resources/interfaces/d3.slider-master/d3.slider.js"></script>
<script src="../_common_resources/charts/nvd3-master/build/nv.d3.js"></script>
<script src="../_common_resources/charts/nvd3-master/src/utils.js"></script>
<script src="../_common_resources/charts/nvd3-master/src/tooltip.js"></script>
<script src="../_common_resources/charts/nvd3-master/src/models/legend.js"></script>
<script src="../_common_resources/charts/nvd3-master/src/models/axis.js"></script>
<script src="../_common_resources/charts/nvd3-master/test/stream_layers.js"></script>
<script src="//d3js.org/topojson.v1.min.js"></script>

<script>
// $("#headerDiv").sticky({topSpacing:1});

</script>
<script>
//LIVE JSON MAGIC

//https://script.google.com/macros/s/AKfycbwG7mX6qPZaIhkwY2AJ2lU7kNarbm6OWIkWVfnmYZGYruIl40cu/exec?id=1qNwLNcSP2D8l8iTEemF9JC4lvpKp-UogxP4htDFwFA0&sheet=mn_voter_turnout
//https://script.google.com/macros/s/AKfycbwG7mX6qPZaIhkwY2AJ2lU7kNarbm6OWIkWVfnmYZGYruIl40cu/exec?id=1qNwLNcSP2D8l8iTEemF9JC4lvpKp-UogxP4htDFwFA0&sheet=mn_voter_turnout2012
//https://script.google.com/macros/s/AKfycbwG7mX6qPZaIhkwY2AJ2lU7kNarbm6OWIkWVfnmYZGYruIl40cu/exec?id=1qNwLNcSP2D8l8iTEemF9JC4lvpKp-UogxP4htDFwFA0&sheet=mn_voter_turnout2010
//https://script.google.com/macros/s/AKfycbwG7mX6qPZaIhkwY2AJ2lU7kNarbm6OWIkWVfnmYZGYruIl40cu/exec?id=1qNwLNcSP2D8l8iTEemF9JC4lvpKp-UogxP4htDFwFA0&sheet=mn_voter_turnout2008

//THESE LOAD DIFFERENT TABS OF THE GOOGLE SHEET INTO SEPERATE JSON STRINGS, USING THE ACTUAL URLS
<?php

$jsonData = file_get_contents("https://script.googleusercontent.com/macros/echo?user_content_key=63uCDLvwmjMmm55YXw67F6Dfm-CYq_m-NoS4PZtIBRQWzP2lCaYT2FhxtMusX59Tg0ATsn9s_xy5fyDFmlEIs6YX5T2moIGAOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHaxCoMjMSmZWLp6XAShvjQj50JtCfh4yP7n1RnEoDeOH7XqmOXgX8RYIyMAhIAtjnF9UDzNXGLr6To3J9D8RNlRL0zgWNJzVDkWV4a9wKICNpTa8dfWNHYIymLIb4r3T2k2KsIDjhQ9px35iDyrfKhrpfHEAafmo-G5HS3VZadLm9&lib=MVcLnEUipyThKZcpmQKyqT_CoSfd4egCX");
// $jsonData2012 = file_get_contents("https://script.googleusercontent.com/macros/echo?user_content_key=-WfH2VECxPnQW9NG617H_ES8pfzZ3NP34S-5wndAvEg3pHKmos1HMJzzaZ7FHTRTJ_bCZBI8ocqvlXv7CsUs2ozlzt5jj4rNOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHaxCoMjMSmZWLp6XAShvjQj50JtCfh4yP7n1RnEoDeOH7XqmOXgX8RYIyMAhIAtjnF9UDzNXGLr6To3J9D8RNlRL0zgWNJzVDkWV4a9wKICNpTa8dfWNHYIymLIb4r3T2k2KsIDjhQ9px35iDyrfKhrpfHEAafmo-G7KvhpuM7o4yMfRx0rq-JN8&lib=MVcLnEUipyThKZcpmQKyqT_CoSfd4egCX");
// $jsonData2010 = file_get_contents("https://script.googleusercontent.com/macros/echo?user_content_key=T5hheoLXbuKyJEaXOjzazrLD8VIu2k4ZmQJkG8yagBYUS4le-SdjdsCfsu3hezumbigB3LBp4hmvlXv7CsUs2nQ4fTfLCu6DOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHaxCoMjMSmZWLp6XAShvjQj50JtCfh4yP7n1RnEoDeOH7XqmOXgX8RYIyMAhIAtjnF9UDzNXGLr6To3J9D8RNlRL0zgWNJzVDkWV4a9wKICNpTa8dfWNHYIymLIb4r3T2k2KsIDjhQ9px35iDyrfKhrpfHEAafmo-G7KvhpuM7o4yBNKgcA2Ujsc&lib=MVcLnEUipyThKZcpmQKyqT_CoSfd4egCX");
// $jsonData2008 = file_get_contents("https://script.googleusercontent.com/macros/echo?user_content_key=7kibv71nrGuWuFXz0KYggAQMeJMqP1zT_rzaKbfunHisiu02scQmATuZ5sRNJ9qo8wXEWi-BtfGJjDoJs_KUmt3KV3Is6hzvOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHaxCoMjMSmZWLp6XAShvjQj50JtCfh4yP7n1RnEoDeOH7XqmOXgX8RYIyMAhIAtjnF9UDzNXGLr6To3J9D8RNlRL0zgWNJzVDkWV4a9wKICNpTa8dfWNHYIymLIb4r3T2k2KsIDjhQ9px35iDyrfKhrpfHEAafmo-G7KvhpuM7o4yCzXgIH8EaI8&lib=MVcLnEUipyThKZcpmQKyqT_CoSfd4egCX");

?>

//THESE ADD THEM TO JAVASCRIPT VARIABLES WE CAN ACCESS THROUGHOUT THE DOCUMENT
var dataLoad = <?php echo $jsonData; ?>;
// var dataLoad2012 = <?php echo $jsonData2012; ?>;
// var dataLoad2010 = <?php echo $jsonData2010; ?>;
// var dataLoad2008 = <?php echo $jsonData2008; ?>;

data = dataLoad.mn_voter_turnout;
// data2012 = dataLoad2012.mn_voter_turnout2012;
// data2010 = dataLoad2010.mn_voter_turnout2010;
// data2008 = dataLoad2008.mn_voter_turnout2008;
</script>

<script>
//MENUS
$('.map').hide();
$('.table').hide();
$('.governor').show();

$(".myButton2").click(function() {
  $('.map').hide();
  $('.table').hide();
  $("." + $(this).attr("data")).show();
  // if ($(this).attr("data") == "governor") { redrawChart(chart,"#chart","governor",data,"Minnesota",0); }
  // if ($(this).attr("data") == "president") { redrawChart(chart,"#chart","president",data,"Minnesota",0); }
  // if ($(this).attr("data") == "mnsenate") { redrawChart(chart,"#chart","mnsenate",data,"Minnesota",0); }
  // if ($(this).attr("data") == "mnleg") { redrawChart(chart,"#chart","mnhouse",data,"Minnesota",0); }
  // if ($(this).attr("data") == "ussenate") { redrawChart(chart,"#chart","ussenate",data,"Minnesota",0); }
  // if ($(this).attr("data") == "uscongress") { redrawChart(chart,"#chart","ushouse",data,"Minnesota",0); } 
});
</script>

<script>
//TABLECALYPSE
function tableBuild(container,race,data,state,county,index){

d3.select(container).selectAll(".card")
.data(data).enter().append("div")
.attr("class","card")
.html(function (d){ 
  if (race = "governor"){
    if (d.MNGOVR > d.MNGOVDFL) { var swatch = "republican"; var party = "GOP"; }
    else if (d.MNGOVR < d.MNGOVDFL) { var swatch = "democrat"; var party = "DFL"; }
    else { var swatch = "democrat"; var party = "IP"; }
    return "<div class='tableBreak'></div><div class='tableCell partyBar " + swatch + "'>" + party + "</div><div class='tableCell precinct'>" + d.PCTNAME + "</div><div class='tableCell county'>" + d.COUNTYNAME + "</div><div class='tableCell votes'>" + d3.format(',')(d.MNGOVR) + "</div><div class='tableCell votes'>" + d3.format(',')(d.MNGOVDFL) + "</div><div class='tableCell pct'>" + d3.format('%')(d.TOTVOTING / d.REG7AM) + "</div><div class='tableBreak'></div>";
  }
});

}
</script>

<script>
//YEAR SLIDER
var slider = d3.slider().axis(true);

var steps = 4;

d3.select('#slider').call(slider.min(2008).max(2014).value(2014).axis(d3.svg.axis().tickValues([2008,2010,2012,2014]).tickFormat(d3.format("")).orient("top").ticks(4)).step(1).on("slide", function(evt, value) {
  $(".yearSection").hide();
  $(".y" + value).show();
  }));

$(".yearSection").hide();
$(".y2014").show();
$("#back").click(function() {
  if ((slider.value()-2) >= 2008){
  slider.value(slider.value()-2);
  $(".yearSection").hide();
  $(".y" + slider.value()).show();
}
});
$("#forward").click(function() {
  if ((slider.value()+2) <= 2014){
  slider.value(slider.value()+2);
  $(".yearSection").hide();
  $(".y" + slider.value()).show();
}
});
</script>
<script>
var chart = [];
var index = 0;
//CHARTAGGEDON
// function chartBuild(container,subject,data,county,index){
  var colorArray = ['#a50f15','#082659','#777']; 
  var formatter = d3.format('%');

nv.addGraph(function() {
  chart[index] = nv.models.multiBarHorizontalChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .margin({top: 30, right: 30, bottom: 20, left: 80})
      .showValues(true)
      .tooltips(true)
      .stacked(false)
      .showLegend(false)
      .color(colorArray)
      // .width($(container).width()).height($(container).height())
      .showControls(false);

  chart[index].forceY([0,1]);

   chart[index].yAxis
      .tickFormat(formatter);

  d3.select('#chart svg')
      .datum(chartData("governor",data,"Minnesota"))
      .transition().duration(500)
      .call(chart[index]);

  nv.utils.windowResize(chart[index].update);

  return chart[index];
});

// }

function redrawChart(chart,container,subject,data,county,index){
  var colorArray = ['#a50f15','#082659','#777']; 
  var formatter = d3.format('%');

    d3.select(container + ' svg').datum(chartData(subject,data,county)).transition().duration(300).call(chart[index].color(colorArray));
    // chart[index].yAxistickFormat(formatter);
    nv.utils.windowResize(chart[index].update);
}

function chartData(subject,data,county) {
if (subject == "ussenate"){
  for (var i=0; i < data.length; i++){
    if (data[i].PCTNAME == county) { 
      return [{
        "key": "Vote %",
        "values": [
          { 
            "label" : "GOP" ,
            "value" : data[i].USSENR / data[i].USSENTOTAL
          } , 
          { 
            "label" : "DFL" ,
            "value" : data[i].USSENDFL / data[i].USSENTOTAL
          } , 
          { 
            "label" : "Other" ,
            "value" : (data[i].USSENIP + data[i].USSENLIB + data[i].USSENWI) / data[i].USSENTOTAL
          } , 
          { 
            "label" : "Turnout" ,
            "value" : data[i].TOTVOTING / data[i].REG7AM
          } 
        ]
      }]
    }
  }
}

if (subject == "uscongress"){
  for (var i=0; i < data.length; i++){
    if (data[i].PCTNAME == county) { 
      return [{
        "key": "GOP Vote %",
        "values": [
          { 
            "label" : "GOP" ,
            "value" : data[i].USREPR / data[i].USREPTOTAL
          } 
        ]
      },{
        "key": "DFL Vote %",
        "values": [
          { 
            "label" : "DFL" ,
            "value" : data[i].USREPDFL / data[i].USREPTOTAL
          } 
        ]
      },{
        "key": "Other Vote %",
        "values": [
          { 
            "label" : "Other" ,
            "value" : (data[i].USREPIP + data[i].USREPR + data[i].USREPWI) / data[i].USREPTOTAL
          }
        ]
      },{
        "key": "Turnout %",
        "values": [
          { 
            "label" : "Turnout" ,
            "value" : data[i].TOTVOTING / data[i].REG7AM
          }  
        ]
      }]
    }
  }
}

if (subject == "mnleg"){
  for (var i=0; i < data.length; i++){
    if (data[i].PCTNAME == county) { 
      return [{
        "key": "GOP Vote %",
        "values": [
          { 
            "label" : "GOP" ,
            "value" : data[i].MNLEGR / data[i].MNLEGTOTAL
          }
        ]
      },{
        "key": "DFL Vote %",
        "values": [ 
          { 
            "label" : "DFL" ,
            "value" : data[i].MNLEGDFL / data[i].MNLEGTOTAL
          } 
        ]
      },{
        "key": "Other Vote %",
        "values": [
          { 
            "label" : "Other" ,
            "value" : (data[i].MNLEGIP + data[i].MNLEGWI) / data[i].MNLEGTOTAL
          } 
        ]
      },{
        "key": "Turnout %",
        "values": [
          { 
            "label" : "Turnout" ,
            "value" : data[i].TOTVOTING / data[i].REG7AM
          } 
        ]
      }]
    }
  }
}

if (subject == "governor"){
  for (var i=0; i < data.length; i++){
    if (data[i].PCTNAME == county) { 
      return [{
        "key": "GOP Vote %",
        "values": [
          { 
            "label" : "GOP" ,
            "value" : data[i].MNGOVR / data[i].MNGOVTOTAL
          } 
        ]
      },{
        "key": "DFL Vote %",
        "values": [
          { 
            "label" : "DFL" ,
            "value" : data[i].MNGOVDFL / data[i].MNGOVTOTAL
          }
        ]
      },{
        "key": "Other Vote %",
        "values": [ 
          { 
            "label" : "Other" ,
            "value" : (data[i].MNGOVIP + data[i].MNGOVLIB + data[i].MNGOVGLC + data[i].MNGOVWI) / data[i].MNGOVTOTAL
          }
        ]
      },{
        "key": "Turnout %",
        "values": [
          { 
            "label" : "Turnout" ,
            "value" : data[i].TOTVOTING / data[i].REG7AM
          } 
        ]
      }]
    }
  }
}

}
</script>

<script>
//MAPAGGEDON
function mapColor(d, race, dataCompare){
  if (d == "Minnesota") { var where = "Minnesota"; }
  else { var where = d; }

  if (race == "turnout"){
  for (var i = 0; i < dataCompare.length; i++) {
  if (dataCompare[i].PCTNAME == where){
    if ((dataCompare[i].TOTVOTING / dataCompare[i].REG7AM) >= .90) { return "t4"; }
    if ((dataCompare[i].TOTVOTING / dataCompare[i].REG7AM) >= .70) { return "t3"; }
    if ((dataCompare[i].TOTVOTING / dataCompare[i].REG7AM) >= .50) { return "t2"; }
    if ((dataCompare[i].TOTVOTING / dataCompare[i].REG7AM) >= .30) { return "t1"; }
    }
  }
}
  if (race == "ussenate"){
  for (var i = 0; i < dataCompare.length; i++) {
  if (dataCompare[i].PCTNAME == where){
    if (dataCompare[i].USSENDFL > dataCompare[i].USSENR) { return "democrat"; }
    else if (dataCompare[i].USSENDFL < dataCompare[i].USSENR) { return "republican"; }
    else { return "other"; }
    }
  }
}
  if (race == "uscongress"){
  for (var i = 0; i < dataCompare.length; i++) {
  if (dataCompare[i].PCTNAME == where){
    if (dataCompare[i].USREPDFL > dataCompare[i].USREPR) { return "democrat"; }
    else if (dataCompare[i].USREPDFL < dataCompare[i].USREPR) { return "republican"; }
    else { return "other"; }
    }
  }
}
  if (race == "governor"){
  for (var i = 0; i < dataCompare.length; i++) {
  if (dataCompare[i].PCTNAME == where){
    if (dataCompare[i].MNGOVDFL > dataCompare[i].MNGOVR) { return "democrat"; }
    else if (dataCompare[i].MNGOVDFL < dataCompare[i].MNGOVR) { return "republican"; }
    else { return "other"; } 
    }
  }
}
  if (race == "mnleg"){
  for (var i = 0; i < dataCompare.length; i++) {
  if (dataCompare[i].PCTNAME == where){
    if (dataCompare[i].MNLEGDFL > dataCompare[i].MNLEGR) { return "democrat"; }
    else if (dataCompare[i].MNLEGDFL < dataCompare[i].MNLEGR) { return "republican"; }
    else { return "other"; }
    }
  }
}
 
}

function mapTips(d, subject, dataCompare){
  if (d == "Minnesota") { var where = "Minnesota"; }
  else { var where = d.properties.PCTNAME; }

  if (subject == "turnout"){
    for (var i = 0; i < dataCompare.length; i++){
  if (dataCompare[i].PCTNAME == where){
    var color = "t1";
    return "<span class='swatch " + color + "'></span><span class='countyName'>" + where + "</span><div class='turnout'>" + d3.format('%')(dataCompare[i].TOTVOTING / dataCompare[i].REG7AM) + " turnout</div>";       }
     }
    }

  if (subject == "ussenate"){
    for (var i = 0; i < dataCompare.length; i++){
  if (dataCompare[i].PCTNAME == where){
    if (dataCompare[i].USSENDFL > dataCompare[i].USSENR) { var color = "democrat"; }
    else if (dataCompare[i].USSENDFL < dataCompare[i].USSENR) { var color = "republican"; }
    else { var color = "other"; }
    return "<span class='swatch " + color + "'></span><span class='countyName'>" + where + "</span>";       }
     }
    }
  if (subject == "uscongress"){
    if (dataCompare[i].USREPDFL > dataCompare[i].USREPR) { var color = "democrat"; }
    else if (dataCompare[i].USREPDFL < dataCompare[i].USREPR) { var color = "republican"; }
    else { var color = "other"; }
    for (var i = 0; i < dataCompare.length; i++){
  if (dataCompare[i].PCTNAME == where){
    return "<span class='swatch " + color + "'></span><span class='countyName'>" + where + "</span>";       }
     }
    }
  if (subject == "governor"){
    for (var i = 0; i < dataCompare.length; i++){
  if (dataCompare[i].PCTNAME == where){
    if (dataCompare[i].MNGOVDFL > dataCompare[i].MNGOVR) { var color = "democrat"; }
    else if (dataCompare[i].MNGOVDFL < dataCompare[i].MNGOVR) { var color = "republican"; }
    else { var color = "other"; }
    return "<span class='swatch " + color + "'></span><span class='countyName'>" + where + "</span>";       }
     }
    }
  if (subject == "mnleg"){
    for (var i = 0; i < dataCompare.length; i++){
    if (dataCompare[i].MNLEGDFL > dataCompare[i].MNLEGR) { var color = "democrat"; }
    else if (dataCompare[i].MNLEGDFL < dataCompare[i].MNLEGR) { var color = "republican"; }
    else { var color = "other"; }
  if (dataCompare[i].PCTNAME == where){
    return "<span class='swatch " + color + "'></span><span class='countyName'>" + where + "</span>";       }
     }
    }
}

function mapBuild(container, boxContainer, chartContainer, shape, race, geo, dataCompare, index) {

var width = 350,
    height = 400,
    centered;

if (geo=="us") { var projection = d3.geo.albersUsa().scale(700).translate([330, 200]); }
else if (geo=="mn") { var projection = d3.geo.albersUsa().scale(5037).translate([50, 970]); }
else if (geo=="metro") { var projection = d3.geo.mercator().scale([16800]).center([-92.263184,44.863656]); }

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
      .attr("id", function(d) { var str = d.properties.PCTNAME; return str.replace(new RegExp(" ", "g"),"-"); })
      .attr("precinctName", function(d){ return d.properties.PCTNAME })
      .attr("class", function(d){
         return mapColor(d.properties.PCTNAME, race, dataCompare);
        })
       .on("mousedown", function(d, i){   
          $('.precinct').removeClass("pSelect");
          $('.card').hide();
        var txt = d.properties.PCTNAME;
        $('.card').each(function(){
           if($(this).text().toUpperCase().indexOf(txt.toUpperCase()) != -1){
               $(this).show();
           }
        });
          $("#precinctName").html(d.properties.PCTNAME + ", " + d.properties.COUNTYNAME + " County");
          redrawChart(chart,"#chart",race,dataCompare,d.properties.PCTNAME,0);
       })
      .style("stroke-width", "0")
      // .style("stroke", "#fff")
      .call(d3.helper.tooltip(function(d, i){
        return mapTips(d, race, dataCompare);
      }));

  g.append("path")
      //.datum(topojson.mesh(us, us.features, function(a, b) { return a !== b; }))
      .attr("id", "state-borders")
      .attr("d", path);
});

var zoom = d3.behavior.zoom()
    .on("zoom",function() {
        g.attr("transform","translate("+ 
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        g.selectAll("circle")
            .attr("d", path.projection(projection));
        g.selectAll("path")  
            .attr("d", path.projection(projection)); 

  });

$(".zoom, .myButton2").click(function() {
  clicked2();
  $('.precinct').removeClass("pSelect");
  $("#precinctName").html("Minnesota");
  $(".card").show();
  redrawChart(chart,"#chart",race,dataCompare,"Minnesota",0);
});

function clicked(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 10;
    centered = null;
  }

  g.selectAll("path")
      .classed("faded", true)
      .classed("active", centered && function(d) { return d === centered; });

  g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
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
      .classed("active", centered && function(d) { return d === centered; });

  g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}

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

}

$( document ).ready(function() {
     $('#filter_box').keyup(function(i){
        $('.card').hide();
        var txt = $('#filter_box').val();
        $('.card').each(function(){
           if($(this).text().toUpperCase().indexOf(txt.toUpperCase()) != -1){
               $(this).show();
           }
        });
    });

  $(".precinct").click(function() {

jQuery.fn.d3Click = function () {
  this.each(function (i, e) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    e.dispatchEvent(evt);
  });
};

jQuery.fn.d3Down = function () {
  this.each(function (i, e) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    e.dispatchEvent(evt);
  });
};

jQuery.fn.d3Up = function () {
  this.each(function (i, e) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    e.dispatchEvent(evt);
  });
};
    
    $('.precinct').removeClass("pSelect");
    $(this).addClass("pSelect");
    $("#precinctName").html($(this).text() + ", " + $(this).parent().find('.county').text() + " County");

    redrawChart(chart,"#chart",$(this).parent().parent().attr("data"),data,$(this).text(),0);

    $("[id='" + $(this).text().replace(new RegExp(" ", "g"),"-") + "']").d3Down();
    $("[id='" + $(this).text().replace(new RegExp(" ", "g"),"-") + "']").d3Up();
    $("[id='" + $(this).text().replace(new RegExp(" ", "g"),"-") + "']").d3Click();
  });

});
</script>
<script>
  tableBuild("#tableGov2014","governor",data,"Minnesota","All",0)
  mapBuild("#mapGovMetro2014", "#infobox", "#chart", "mnprecincts_metro.json", "turnout", "metro", data, 0);
  mapBuild("#mapGovMN2014", "#infobox", "#chart", "mnprecincts.json", "turnout", "mn", data, 0);
  // mapBuild("#mapGovMetro2010", "#infobox", "#chart", "mnprecincts_metro.json", "governor", "metro", data2010, 0);
  // mapBuild("#mapGovMN2010", "#infobox", "#chart", "mnprecincts.json", "governor", "mn", data2010, 0);
  // chartBuild("#chart","governor",data,"Minnesota",0);
  // nv.utils.windowResize(chart[0].update);

  // mapBuild("#mapSenMetro2014", "#infobox", "#chart", "mnprecincts_metro.json", "ussenate", "metro", data, 0);
  // mapBuild("#mapSenMN2014", "#infobox", "#chart", "mnprecincts.json", "ussenate", "mn", data, 0);
  // mapBuild("#mapSenMetro2012", "#infobox", "#chart", "mnprecincts_metro.json", "ussenate", "metro", data2012, 0);
  // mapBuild("#mapSenMN2012", "#infobox", "#chart", "mnprecincts.json", "ussenate", "mn", data2012, 0);
  // mapBuild("#mapSenMetro2010", "#infobox", "#chart", "mnprecincts_metro.json", "ussenate", "metro", data2010, 0);
  // mapBuild("#mapSenMN2010", "#infobox", "#chart", "mnprecincts.json", "ussenate", "mn", data2010, 0);
  // mapBuild("#mapSenMetro2008", "#infobox", "#chart", "mnprecincts_metro.json", "ussenate", "metro", data2008, 0);
  // mapBuild("#mapSenMN2008", "#infobox", "#chart", "mnprecincts.json", "ussenate", "mn", data2008, 0);

  // mapBuild("#mapHouseMetro2014", "#infobox", "#chart", "mnprecincts_metro.json", "ushouse", "metro", data, 0);
  // mapBuild("#mapHouseMN2014", "#infobox", "#chart", "mnprecincts.json", "ushouse", "mn", data, 0);
  // mapBuild("#mapHouseMetro2012", "#infobox", "#chart", "mnprecincts_metro.json", "ushouse", "metro", data2012, 0);
  // mapBuild("#mapHouseMN2012", "#infobox", "#chart", "mnprecincts.json", "ushouse", "mn", data2012, 0);
  // mapBuild("#mapHouseMetro2010", "#infobox", "#chart", "mnprecincts_metro.json", "ushouse", "metro", data2010, 0);
  // mapBuild("#mapHouseMN2010", "#infobox", "#chart", "mnprecincts.json", "ushouse", "mn", data2010, 0);
  // mapBuild("#mapHouseMetro2008", "#infobox", "#chart", "mnprecincts_metro.json", "ushouse", "metro", data2008, 0);
  // mapBuild("#mapHouseMN2008", "#infobox", "#chart", "mnprecincts.json", "ushouse", "mn", data2008, 0);

  // mapBuild("#mapMNHouseMetro2014", "#infobox", "#chart", "mnprecincts_metro.json", "mnhouse", "metro", data, 0);
  // mapBuild("#mapMNHouseMN2014", "#infobox", "#chart", "mnprecincts.json", "mnhouse", "mn", data, 0);
  // mapBuild("#mapMNHouseMetro2012", "#infobox", "#chart", "mnprecincts_metro.json", "mnhouse", "metro", data2012, 0);
  // mapBuild("#mapMNHouseMN2012", "#infobox", "#chart", "mnprecincts.json", "mnhouse", "mn", data2012, 0);
  // mapBuild("#mapMNHouseMetro2010", "#infobox", "#chart", "mnprecincts_metro.json", "mnhouse", "metro", data2010, 0);
  // mapBuild("#mapMNHouseMN2010", "#infobox", "#chart", "mnprecincts.json", "mnhouse", "mn", data2010, 0);
  // mapBuild("#mapMNHouseMetro2008", "#infobox", "#chart", "mnprecincts_metro.json", "mnhouse", "metro", data2008, 0);
  // mapBuild("#mapMNHouseMN2008", "#infobox", "#chart", "mnprecincts.json", "mnhouse", "mn", data2008, 0);

  // mapBuild("#mapMNSenMetro2012", "#infobox", "#chart", "mnprecincts_metro.json", "mnsenate", "metro", data2012, 0);
  // mapBuild("#mapMNSenMN2012", "#infobox", "#chart", "mnprecincts.json", "mnsenate", "mn", data2012, 0);
  // mapBuild("#mapMNSenMetro2008", "#infobox", "#chart", "mnprecincts_metro.json", "mnsenate", "metro", data2008, 0);
  // mapBuild("#mapMNSenMN2008", "#infobox", "#chart", "mnprecincts.json", "mnsenate", "mn", data2008, 0);
</script>

</html>
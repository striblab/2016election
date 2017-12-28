<?php 
$row = 0;
$districtsR = 0;
$districtsD = 0;
$districtsRcount = 0;
$districtDcount = 0;
$districtScount = 0;
$results = "split";
$repTal = array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
$demTal = array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

if (($handle = fopen("tallies.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {

       for ($c=0; $c < 29; $c++) {
	   if ($data[$c] == '1'){
	    $demTal[$c]++;
	    $districtsD++;
}
	else if ($data[$c] == '2'){
	    $repTal[$c]++;
	    $districtsR++;
}
        }

        $row++;
    }
    fclose($handle);
}

       for ($c=0; $c < 29; $c++) {
if ($demTal[$c] > $repTal[$c]){
	    $districtsDcount++;
}
	else if ($demTal[$c] < $repTal[$c]){
	    $districtsRcount++;
}
	else if ($demTal[$c] == $repTal[$c]){
	    $districtsScount++;
}
        }

$total = count(file('tallies.csv')) - 1;

if ($districtsRcount >= 11) {
$results = "GOP";
$shade = "#a7706b";
}
else if ($districtsRcount == 10)  {
$results = "split";
$shade = "#6ba78e";
}
else {
$results = "DFL";
$shade = "#79B0C5";
}
    $data1 = $_POST['02A']; 
    $data2 = $_POST['04A']; 
    $data3 = $_POST['10B']; 
    $data4 = $_POST['11B']; 
    $data5 = $_POST['12A']; 
    $data6 = $_POST['13A'];
    $data7 = $_POST['14B']; 
    $data8 = $_POST['17B']; 
    $data9 = $_POST['24A']; 
    $data10 = $_POST['24B']; 
    $data11 = $_POST['05A']; 
    $data12 = $_POST['27A']; 
    $data13 = $_POST['36A']; 
    $data14 = $_POST['42B']; 
    $data15 = $_POST['44A']; 
    $data16 = $_POST['48A']; 
    $data17 = $_POST['49A']; 
    $data18 = $_POST['49B']; 
    $data19 = $_POST['51A']; 
    $data20 = $_POST['51B']; 
    $data21 = $_POST['54A']; 
    $data22 = $_POST['56B']; 
    $data23 = $_POST['01B'];
    $data24 = $_POST['02B'];
    $data25 = $_POST['04B'];
    $data26 = $_POST['10A'];
    $data27 = $_POST['15A'];
    $data28 = $_POST['17A'];
    $data29 = $_POST['32B'];
    $data = $data1 . "," . $data2 . "," . $data3 . "," . $data4 . "," . $data5 . "," . $data6 . "," . $data7 . "," . $data8 . "," .$data9 . "," . $data10 . "," . $data11 . "," . $data12 . "," . $data13 . "," . $data14 . "," . $data15 . "," . $data16 . "," . $data17 . "," . $data18 . "," . $data19 . "," . $data20 . "," . $data21 . "," . $data22 ."," . $data23 . "," . $data24 . "," . $data25 . "," . $data26 . "," . $data27 . "," . $data28 . "," . $data29 . "\n"; 
$file = fopen("tallies.csv", "a");
if(isset($_POST['Vote'])){
fwrite($file,$data); // Write information to the file     
fclose($file); // Close the file
//echo "<script type='text/javascript'>alert('submitted successfully!')</script>";
}

?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<meta property="og:title" content="Control of the Minnesota House"/>
	<meta property="og:type" content="website"/>
	<meta property="og:image" content="./tileserver/mnleg.png"/>
	<meta property="og:description" content="I predicted a <?php echo $results; ?> Minnesota House majority after the 2014 midterm elections. Take the quiz and make your prediction!"/>
	<link rel="image_src" href="mnleg.png" />
	<script async="" src="http://www.google-analytics.com/analytics.js"></script>
    <title>Minnesota 2014 Midterm Elections</title>

<!--STYLESHEETS-->
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
<link href='https://api.tiles.mapbox.com/mapbox.js/v1.6.3/mapbox.css' rel='stylesheet' />
<link href='https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v0.0.2/leaflet.fullscreen.css' rel='stylesheet' />
<link href="./js/nvd3-master/src/nv.d3.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css">
<link href='//cdn.datatables.net/1.10.2/css/jquery.dataTables.min.css' rel='stylesheet' />
<link rel="stylesheet" href="../_common_resources/styles/startribune_dataviz_styles.css" />

<style type="text/css">
    #wrapper { width:100%; }
	body { overflow-x: hidden; }
	input[type=radio].css-checkbox { border: 0; clip: rect(0 0 0 0); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; width: 1px; }
	input[type=radio].css-checkbox + label.css-label { background-position: 0 0; background-repeat: no-repeat; cursor: pointer; display: inline-block; float: left; font-size: 15px; height: 15px; line-height: 15px; padding-left: 20px; vertical-align: middle; }
	input[type=radio].css-checkbox + label.css-label2 { background-position: 0 0; background-repeat: no-repeat; cursor: pointer; display: inline-block; float: left; font-size: 15px; height: 15px; line-height: 15px; padding-left: 20px; vertical-align: middle; }
	input[type=radio].css-checkbox:checked + label.css-label { background-position: 0 -15px; }
	input[type=radio].css-checkbox:checked + label.css-label2 { background-position: 0 -15px; }
	.css-label { background-image: url(lite-blue-check.png); }
	.css-label2 { background-image: url(lite-red-check.png); }
	#menu_main { margin-left: -1px !important; position: relative; width:100%; z-index: 10003; }
	.btn-primary { background-color: #e0e0e0 !important; color:#000 !important; background-image: linear-gradient(to bottom,#e0e0e0 0,#e0e0e0 100%) !important; border-color: #fff !important; border-radius: 0 !important; box-shadow: none !important; color: #000; font-size: 1em; line-height: 130%; padding: 6px !important; text-align: center !important; width:120px; }
	.last-btn { width: 128px; }
	.first-btn { }
	.btn-primary input[type=radio] { display: none !important; }
	.btn-primary:hover { background-color: #378f00 !important; background-image: linear-gradient(to bottom,#378f00 0,#378f00 100%) !important; border-color: #fff !important; border-radius: 0 !important; border-size: 2px; box-shadow: none !important; color: #eee !important; }
	.btn-primary:checked { background-color: #999 !important; background-image: linear-gradient(to bottom,#999 0,#999 100%) !important; border-color: #fff !important; border-radius: 0 !important; border-size: 2px; box-shadow: none !important; color: #fff !important; }
	.active { background-color:#fff !important; background-image: linear-gradient(to bottom,#000 0,#000 100%) !important; border-color: none !important; color: #fff !important; font-weight: bold; }
	.label { padding: 10%; }
	a:hover { color: #000 !important; }
	.round { background-color: #61bd1a !important; background-image: linear-gradient(to bottom,#61bd1a 0,#61bd1a 100%) !important; border-radius: 6px !important; padding: 24px; }
	.round:hover { background-color: #378f00 !important; border-radius: 6px !important; }
	circle:hover { opacity: .8; stroke: black; stroke-width: 2px; }
	.label { fill: black; font-size: 16px; }
	.leaflet-control-layers-list { right: 0; top: 0; }
	body { margin: 0; overflow-y: hidden; padding: 0; }
	#map { background: transparent; cursor: pointer; height: 510px; width: 476px; }
	.outerMap { background: #efefef; height: 547px; margin-top: 7%; position: relative; width: 476px; z-index: 1; }
	.leaflet-container { }
	#wrapper { border: 0 solid #d7d7d7; bottom: 0; height: 100%; left: 0; position: absolute; top: 0; }
	#captureMe { border-color: black; border-style: none; height: 100%; margin: auto; width: 60%; }
	#chart { background: transparent; cursor: pointer; height: 400px; position: absolute; right: 5%; top: 30%; width: 460px; z-index: 1; }
	.leaflet-control-zoom { display: none; visibility: hidden; }
	.table { display: table; width: 100%; }
	.header { display: table-header-group; font-weight: bold; }
	.rowGroup { display: table-row-group; }
	.row { display: table-row; }
	.cell { display: table-cell; width: 25%; }
	input[type=reset] { background: transparent; border: 0; border-radius: 18px; color: #000; color: #0b478d !important; font-family: Arial; font-size: 1em; moz-border-radius: 28; padding: 8px 20px 10px 20px; text-decoration: none; webkit-border-radius: 28; }
	input[type=reset]:hover { background: transparent; border: 0; text-decoration: underline; }
	input[type=submit]:hover { background: #378f00; border: 0; text-decoration: none; }
	input[type=submit] { background: #61bd1a; border: 0; border-radius: 6px; color: #fff; font-family: Arial; font-size: 1em; moz-border-radius: 6; padding: 12px; text-decoration: none; webkit-border-radius: 6; width: 50%; }
	#tracker { background: #fff; display: none; height: 800px; position: absolute; top: 64px; width: 100%; z-index: 5; }
	#thanks { background: white; display: none; float: right; font-size: 22px; height: 300px; position: absolute; right: 10%; top: 10%; width: 35%; }
	#tally { background: white; bottom: 0; display: none; float: right; font-size: 22px; left: 10%; position: absolute; width: 35%; }
	#paint_me { background: transparent; cursor: pointer; display: none; height: 550px; padding: 0 0 0 24px; position: absolute; right: 1px; top: 64px; width: 483px; z-index: 1; }
	#paint_me label { font-size: 1em !important; }
	#tallyMeR { color: #a7706b; }
	#tallyMeD { color: #79B0C5; }
	#tallyMeR2 { color: #a7706b; }
	#tallyMeD2 { color: #79B0C5; }
	.partyR { color: #a7706b; font-weight: bold; }
	.partyD { color: #79B0C5; font-weight: bold; }
	circle { stroke: none; }
	.explain_text { background: transparent; height: 600px; padding: 0 0 0 24px; position: absolute; right: 1px; top: 64px; width: 483px; z-index: 1; }
	#text_2004 { display: none; }
	#text_2006 { display: none; }
	#text_2008 { display: none; }
	#text_2010 { display: none; }
	#text_2012 { display: block; }
	#lean_text { display: none; }
	#unopposed_text { display: none; }
	#rematch_text { display: none; }
	#open_text { display: none; }
	#vul_text { display: none; }
	#marriage_text { display: none; }
	#prez_text { display: none; }
	#gov_text { display: none; }
	#survey { background: #efefef; clear: right; cursor: pointer; display: inline; float: right; left: 0px; padding: 18px; position: absolute; top: 0px; width: 476px; z-index: 1; }
	#survey label { border: none; }
	label.vote { background-color: #61bd1a; padding: 12px !important; width: 310px; }
	label.results { background: none !important; color: #0b478d !important; float: right; padding: 12px !important; }
	label.results:hover { background: none !important; color: #0b478d !important; float: right; padding: 12px !important; text-decoration: underline; }
	label.round { background-color: transparent; background-image: none !important; }
	label.round.vote { background-color: #61bd1a !important; background-image: none !important; color: #fff; }
	label.round.vote:hover { background-color: #378f00 !important; background-image: none !important; color: #efefef !important; }
	label.round:hover { background-color: transparent; background-image: none !important; color: #fff; }
	#survey div { display: inline; font-weight: bold; width: 160px; }
	svg { margin: 0 !important; }
	small { font-size: 14px; line-height: 50% !important; }
	#zoomMe { bottom: -9px !important; cursor: pointer; position: absolute !important; right: 0px !important; z-index: 10006; }
	.zoomCheckbox input[type="checkbox"] { cursor: pointer; display: none; }
	.zoomCheckbox input[type="checkbox"]+label { background: url('img/see-metro-zoom.png') no-repeat 12px 8px; cursor: pointer; font-weight: normal !important; height: 36px; padding: 9px 18px 9px 42px; width: 170px; }
	.zoomCheckbox input[type="checkbox"]:checked + label { background: url('img/see-all-zoom.png') no-repeat 12px 8px; color: #fff; cursor: pointer; font-weight: normal !important; width: 170px; }
	.zoomCheckbox input[type="checkbox"]:checked + label.metroOn { display: none; }
	.zoomCheckbox input[type="checkbox"]:checked + label.metroOff { display: inline; }
	.zoomCheckbox input[type="checkbox"]:checked + label.metroOn { display: inline; }
	.zoomCheckbox input[type="checkbox"]:checked + label.metroOff { display: none; }
	h1, h3, h5, h6 { font-family: "Popular"; margin-top: 0; }
	h4 { font-size: 14px !important; }
	.container { display: table; font-size: 10px !important; width: 100%; }
	.row { display: table-row; font-size: 10px !important; }
	.left, .right, .middle { display: table-cell; font-size: 1.1em !important; }
	.candidates { left: 0; position: absolute; top: 635px; width: 100%; z-index: 9998; }
	.hidden_candidates { display: none; font-size: .85em !important; }
	td { font-size: .85em !important; }
	#ballot_filter { display: none; }
	#ballot_length { display: none; }
	.DFL-cell { width: 25% !important; }
	.GOP-cell { width: 25% !important; }
	.dataTables_scroll { overflow-x: hidden !important; }
	.dataTables_scrollBody { overflow-x: hidden !important; }
	.District-cell { width: 10% !important; }
	.dataTables_info { display: none !important; }
	.dataTables_scrollBody { border-bottom: 1px solid #ccc !important; border-top: 1px solid #ccc; }
	.dataTables_scrollHeadInner { box-sizing: border-box !important; display: none !important; padding: 0 !important; padding-right: 0 !important; width: 100% !important; }
	.GOP-cell { text-transform: capitalize !important; text-transform: lowercase !important; }
	.DFL-cell { text-transform: capitalize !important; text-transform: lowercase !important; }
	.leaflet-popup-pane { position: relative; z-index: 3 !important; }
	.leaflet-popup-content { font-size: .9em; }
	.leaflet-popup-content h3 { font-family: helvetica,arial,sans-serif; font-size: 1.2em; font-weight: bold; line-height: 120%; margin-bottom: 0; padding-right: 18px; padding-top: 0px; }
	.headLink { color: #0b478d; font-family: helvetica,arial,sans-serif; font-size: .65em; }
	.active, li.active { background-color:#fff !important; border-color: none !important; color: #fff !important; font-weight: bold; }

    </style>
  </head>

<body>

<div id="fb-root"></div>

<div id="wrapper">
	<div class="btn-group" id="menu_main" data-toggle="buttons">
		<label class="btn btn-primary first-btn active" id="2012HouseWin"><input type="radio" id="2012HouseWin2" name="options" onchange="map.removeLayer(party);party.addTo(map);setVisibility('paint_me', 'none');setVisibility('map', 'block');setVisibility('chart', 'block');setVisibility('tracker', 'none');setVisibility('tally', 'none');map.setView([46.8527,-93.5595], 6);dataGrid.addTo(map);dataControl.addTo(map);map.removeLayer(marriageControl);map.removeLayer(marriageGrid);setVisibility('text_2006', 'none');setVisibility('text_2008', 'none');setVisibility('text_2010', 'none');setVisibility('text_2004', 'none');setVisibility('lean_text', 'none');setVisibility('unopposed_text', 'none');setVisibility('rematch_text', 'none');setVisibility('open_text', 'none');setVisibility('marriage_text', 'none');setVisibility('prez_text', 'none');setVisibility('gov_text', 'none');setVisibility('text_2012', 'block');setVisibility('thanks', 'none');document.getElementById('metro').checked = false;setVisibility('zoomMe', 'block');setVisibility('now', 'block');setVisibility('safe_can', 'none');setVisibility('rematch_can', 'none');setVisibility('open_can', 'none');setVisibility('marriage_can', 'none');setVisibility('prez_can', 'none');setVisibility('gov_can', 'none');setVisibility('vul_can', 'none');map.removeLayer(prezControl);map.removeLayer(prezGrid);map.removeLayer(govControl);map.removeLayer(govGrid);map.removeLayer(rematchControl);map.removeLayer(rematchGrid);map.removeLayer(marriageControl);map.removeLayer(marriageGrid);map.removeLayer(flipControl);map.removeLayer(flipGrid);">Current<br>Standing</label>
		<label class="btn btn-primary" id="lean"><input type="radio" id="unopposed2" name="options" onchange="map.removeLayer(lean);lean.addTo(map);setVisibility('paint_me', 'none');setVisibility('map', 'block');setVisibility('chart', 'block');setVisibility('tracker', 'none');setVisibility('tally', 'none');map.setView([46.8527,-93.5595], 6);flipGrid.addTo(map);flipControl.addTo(map);map.removeLayer(marriageControl);map.removeLayer(marriageGrid);setVisibility('text_2006', 'none');setVisibility('text_2008', 'none');setVisibility('text_2010', 'none');setVisibility('text_2012', 'none');setVisibility('lean_text', 'none');setVisibility('text_2004', 'none');setVisibility('rematch_text', 'none');setVisibility('open_text', 'none');setVisibility('marriage_text', 'none');setVisibility('prez_text', 'none');setVisibility('gov_text', 'none');setVisibility('unopposed_text', 'block');setVisibility('thanks', 'none');setVisibility('vul_text', 'none');document.getElementById('metro').checked = false;setVisibility('zoomMe', 'block');setVisibility('now', 'none');setVisibility('safe_can', 'block');setVisibility('rematch_can', 'none');setVisibility('open_can', 'none');setVisibility('marriage_can', 'none');setVisibility('prez_can', 'none');setVisibility('gov_can', 'none');setVisibility('vul_can', 'none');map.removeLayer(prezControl);map.removeLayer(prezGrid);map.removeLayer(govControl);map.removeLayer(govGrid);map.removeLayer(rematchControl);map.removeLayer(rematchGrid);map.removeLayer(marriageControl);map.removeLayer(marriageGrid);map.removeLayer(dataControl);map.removeLayer(dataGrid);">Swing<br>Seats</label>
		<label class="btn btn-primary" id="RaceStatus"><input type="radio" id="lean2" name="options" onchange="map.removeLayer(vulnerable);vulnerable.addTo(map);setVisibility('paint_me', 'none');setVisibility('map', 'block');setVisibility('chart', 'block');setVisibility('tracker', 'none');setVisibility('tally', 'none');map.setView([46.8527,-93.5595], 6);dataGrid.addTo(map);dataControl.addTo(map);map.removeLayer(marriageControl);map.removeLayer(marriageGrid);setVisibility('text_2006', 'none');setVisibility('text_2008', 'none');setVisibility('text_2010', 'none');setVisibility('text_2012', 'none');setVisibility('text_2004', 'none');setVisibility('unopposed_text', 'none');setVisibility('rematch_text', 'none');setVisibility('open_text', 'none');setVisibility('marriage_text', 'none');setVisibility('prez_text', 'none');setVisibility('gov_text', 'none');setVisibility('lean_text', 'none');setVisibility('thanks', 'none');setVisibility('vul_text', 'block');document.getElementById('metro').checked = false;setVisibility('zoomMe', 'block');setVisibility('now', 'none');setVisibility('safe_can', 'none');setVisibility('rematch_can', 'none');setVisibility('open_can', 'none');setVisibility('marriage_can', 'none');setVisibility('prez_can', 'none');setVisibility('gov_can', 'none');setVisibility('vul_can', 'block');map.removeLayer(prezControl);map.removeLayer(prezGrid);map.removeLayer(govControl);map.removeLayer(govGrid);map.removeLayer(rematchControl);map.removeLayer(rematchGrid);map.removeLayer(marriageControl);map.removeLayer(marriageGrid);map.removeLayer(flipControl);map.removeLayer(flipGrid);">Seat<br>Vulnerability</label>
		<label class="btn btn-primary" id="rematch"><input type="radio" id="rematch3" name="options" onchange="map.removeLayer(rematch);rematch.addTo(map);setVisibility('paint_me', 'none');setVisibility('map', 'block');setVisibility('chart', 'block');setVisibility('tracker', 'none');setVisibility('tally', 'none');map.setView([46.8527,-93.5595], 6);rematchGrid.addTo(map);rematchControl.addTo(map);map.removeLayer(marriageControl);map.removeLayer(marriageGrid);setVisibility('text_2006', 'none');setVisibility('text_2008', 'none');setVisibility('text_2010', 'none');setVisibility('text_2012', 'none');setVisibility('lean_text', 'none');setVisibility('unopposed_text', 'none');setVisibility('text_2004', 'none');setVisibility('open_text', 'none');setVisibility('marriage_text', 'none');setVisibility('prez_text', 'none');setVisibility('gov_text', 'none');setVisibility('rematch_text', 'block');setVisibility('thanks', 'none');setVisibility('vul_text', 'none');document.getElementById('metro').checked = false;setVisibility('zoomMe', 'block');setVisibility('now', 'none');setVisibility('safe_can', 'none');setVisibility('rematch_can', 'block');setVisibility('open_can', 'none');setVisibility('marriage_can', 'none');setVisibility('prez_can', 'none');setVisibility('gov_can', 'none');setVisibility('vul_can', 'none');map.removeLayer(prezControl);map.removeLayer(prezGrid);map.removeLayer(govControl);map.removeLayer(govGrid);map.removeLayer(dataControl);map.removeLayer(dataGrid);map.removeLayer(marriageControl);map.removeLayer(marriageGrid);map.removeLayer(flipControl);map.removeLayer(flipGrid);">Political<br>Rematches</label>
		<label class="btn btn-primary" id="openseat"><input type="radio" id="openseat2" name="options" onchange="map.removeLayer(openseat);openseat.addTo(map);setVisibility('paint_me', 'none');setVisibility('map', 'block');setVisibility('chart', 'block');setVisibility('tracker', 'none');setVisibility('tally', 'none');map.setView([46.8527,-93.5595], 6);dataGrid.addTo(map);dataControl.addTo(map);map.removeLayer(marriageControl);map.removeLayer(marriageGrid);setVisibility('text_2006', 'none');setVisibility('text_2008', 'none');setVisibility('text_2010', 'none');setVisibility('text_2012', 'none');setVisibility('lean_text', 'none');setVisibility('unopposed_text', 'none');setVisibility('rematch_text', 'none');setVisibility('text_2004', 'none');setVisibility('marriage_text', 'none');setVisibility('prez_text', 'none');setVisibility('gov_text', 'none');setVisibility('open_text', 'block');setVisibility('thanks', 'none');setVisibility('vul_text', 'none');document.getElementById('metro').checked = false;setVisibility('zoomMe', 'block');setVisibility('now', 'none');setVisibility('safe_can', 'none');setVisibility('rematch_can', 'none');setVisibility('open_can', 'block');setVisibility('marriage_can', 'none');setVisibility('prez_can', 'none');setVisibility('gov_can', 'none');setVisibility('vul_can', 'none');map.removeLayer(prezControl);map.removeLayer(prezGrid);map.removeLayer(govControl);map.removeLayer(govGrid);map.removeLayer(rematchControl);map.removeLayer(rematchGrid);map.removeLayer(marriageControl);map.removeLayer(marriageGrid);map.removeLayer(flipControl);map.removeLayer(flipGrid);">Open<br>Seats</label>
		<label class="btn btn-primary" id="MarriageFlags"><input type="radio" id="marriage2" name="options" onchange="map.removeLayer(marriage);map.removeLayer(dataGrid);map.removeLayer(dataControl);marriage.addTo(map);marriageGrid.addTo(map);marriageControl.addTo(map);setVisibility('paint_me', 'none');setVisibility('map', 'block');setVisibility('chart', 'block');setVisibility('tracker', 'none');setVisibility('tally', 'none');map.setView([46.8527,-93.5595], 6);setVisibility('text_2006', 'none');setVisibility('text_2008', 'none');setVisibility('text_2010', 'none');setVisibility('text_2012', 'none');setVisibility('lean_text', 'none');setVisibility('unopposed_text', 'none');setVisibility('rematch_text', 'none');setVisibility('open_text', 'none');setVisibility('text_2004', 'none');setVisibility('prez_text', 'none');setVisibility('gov_text', 'none');setVisibility('marriage_text', 'block');setVisibility('thanks', 'none');setVisibility('vul_text', 'none');document.getElementById('metro').checked = false;setVisibility('zoomMe', 'block');setVisibility('now', 'none');setVisibility('safe_can', 'none');setVisibility('rematch_can', 'none');setVisibility('open_can', 'none');setVisibility('marriage_can', 'block');setVisibility('prez_can', 'none');setVisibility('gov_can', 'none');setVisibility('vul_can', 'none');map.removeLayer(prezControl);map.removeLayer(prezGrid);map.removeLayer(govControl);map.removeLayer(govGrid);map.removeLayer(rematchControl);map.removeLayer(rematchGrid);map.removeLayer(flipControl);map.removeLayer(flipGrid);">Marriage<br>Amendment</label>
		<label class="btn btn-primary" id="PresFlag"><input type="radio" id="pres" name="options" onchange="map.removeLayer(prez);prez.addTo(map);setVisibility('paint_me', 'none');setVisibility('map', 'block');setVisibility('chart', 'block');setVisibility('tracker', 'none');setVisibility('tally', 'none');map.setView([46.8527,-93.5595], 6);prezGrid.addTo(map);prezControl.addTo(map);map.removeLayer(marriageControl);map.removeLayer(marriageGrid);setVisibility('text_2006', 'none');setVisibility('text_2008', 'none');setVisibility('text_2010', 'none');setVisibility('text_2012', 'none');setVisibility('lean_text', 'none');setVisibility('unopposed_text', 'none');setVisibility('rematch_text', 'none');setVisibility('open_text', 'none');setVisibility('marriage_text', 'none');setVisibility('text_2004', 'none');setVisibility('gov_text', 'none');setVisibility('prez_text', 'block');setVisibility('thanks', 'none');setVisibility('vul_text', 'none');document.getElementById('metro').checked = false;setVisibility('zoomMe', 'block');setVisibility('now', 'none');setVisibility('safe_can', 'none');setVisibility('rematch_can', 'none');setVisibility('open_can', 'none');setVisibility('marriage_can', 'none');setVisibility('prez_can', 'block');setVisibility('gov_can', 'none');setVisibility('vul_can', 'none');map.removeLayer(dataControl);map.removeLayer(dataGrid);map.removeLayer(govControl);map.removeLayer(govGrid);map.removeLayer(rematchControl);map.removeLayer(rematchGrid);map.removeLayer(marriageControl);map.removeLayer(marriageGrid);map.removeLayer(flipControl);map.removeLayer(flipGrid);">Presidential<br>Factors</label>
		<label class="btn btn-primary last-btn" id="GovFlag"><input type="radio" id="gov" name="options" onchange="map.removeLayer(gov);gov.addTo(map);setVisibility('paint_me', 'none');setVisibility('map', 'block');setVisibility('chart', 'block');setVisibility('tracker', 'none');setVisibility('tally', 'none');map.setView([46.8527,-93.5595], 6);govGrid.addTo(map);govControl.addTo(map);map.removeLayer(marriageControl);map.removeLayer(marriageGrid);setVisibility('text_2006', 'none');setVisibility('text_2008', 'none');setVisibility('text_2010', 'none');setVisibility('text_2012', 'none');setVisibility('lean_text', 'none');setVisibility('unopposed_text', 'none');setVisibility('rematch_text', 'none');setVisibility('open_text', 'none');setVisibility('marriage_text', 'none');setVisibility('text_2004', 'none');setVisibility('gov_text', 'block');setVisibility('prez_text', 'none');setVisibility('thanks', 'none');setVisibility('vul_text', 'none');document.getElementById('metro').checked = false;setVisibility('zoomMe', 'block');setVisibility('now', 'none');setVisibility('safe_can', 'none');setVisibility('rematch_can', 'none');setVisibility('open_can', 'none');setVisibility('marriage_can', 'none');setVisibility('prez_can', 'none');setVisibility('gov_can', 'block');setVisibility('vul_can', 'none');map.removeLayer(prezControl);map.removeLayer(prezGrid);map.removeLayer(dataControl);map.removeLayer(dataGrid);map.removeLayer(rematchControl);map.removeLayer(rematchGrid);map.removeLayer(marriageControl);map.removeLayer(marriageGrid);map.removeLayer(flipControl);map.removeLayer(flipGrid);">Gubernatorial<br>Factors</label>
	</div>

<div class="breaker"></div>

<div id="paint_me">
<h3>Make a prediction &nbsp;&nbsp;<a class="headLink" href="#" onclick="map.setView([46.8527,-93.5595], 6);">zoom back</a></h3> 
<form id="form1" name="form1" action="<?=$_SERVER['PHP_SELF'];?>" method="post">
<div id="casting">
<table id="ballot" cellspacing="0" width="100%">
  <thead>
    <tr>
      <th class="District-cell">District</th>
      <th class="DFL-cell">DFL</th>
      <th class="-cell"></th>
      <th class="GOP-cell">GOP</th>
      <th class="-cell"></th>
      <th class="Type-cell">Type</th>
    </tr>
  </thead>
  <tbody>
    <tr style="display:none;">
      <td class="District-cell">-</td>
      <td class="DFL-cell"></td>
      <td class="-cell"></td>
      <td class="GOP-cell"></td>
      <td class="-cell"></td>
      <td class="Type-cell"></td>
    </tr>
    <tr>
      <td class="District-cell">15A</td>
      <td class="DFL-cell">JAMES RITTENOUR</td>
      <td class="-cell"><input type="radio" value="1" name="15A" id="15Ad" class="d css-checkbox" onclick="map.removeLayer(dem27);dem27.addTo(map);map.setView([46.8527,-93.5595], 6);" checked="true"><label for="15Ad" class="css-label"></label></td>
      <td class="GOP-cell">SONDRA ERICKSON</td>
      <td class="-cell"><input type="radio" value="2" name="15A" id="15Ar" class="r css-checkbox" onclick="map.removeLayer(rep27);rep27.addTo(map);map.setView([46.8527,-93.5595], 6);"><label for="15Ar" class="css-label2"></label></td>
      <td class="Type-cell">Watch</td>
    </tr>
    <tr>
      <td class="District-cell">17A</td>
      <td class="DFL-cell">ANDREW FALK</td>
      <td class="-cell"><input type="radio" value="1" name="17A" id="17Ad" class="d css-checkbox" onclick="map.removeLayer(dem28);dem28.addTo(map);map.setView([46.8527,-93.5595], 6);" checked><label for="17Ad" class="css-label"></label></td>
      <td class="GOP-cell">TIM MILLER</td>
      <td class="-cell"><input type="radio" value="2" name="17A" id="17Ar" class="r css-checkbox" onclick="map.removeLayer(rep28);rep28.addTo(map);map.setView([46.8527,-93.5595], 6);"><label for="17Ar" class="css-label2"></label></td>
      <td class="Type-cell">Watch</td>
    </tr>
    <tr>
      <td class="District-cell">32B</td>
      <td class="DFL-cell">LAURIE J. WARNER</td>
      <td class="-cell"><input type="radio" value="1" name="32B" id="32Bd" class="d css-checkbox" onclick="map.removeLayer(dem29);dem29.addTo(map);map.setView([46.8527,-93.5595], 6);"><label for="32Bd" class="css-label" checked></label></td>
      <td class="GOP-cell">BOB BARRETT</td>
      <td class="-cell"><input type="radio" value="2" name="32B" id="32Br" class="r css-checkbox" onclick="map.removeLayer(rep29);rep29.addTo(map);map.setView([46.8527,-93.5595], 6);" ><label for="32Br" class="css-label2"></label></td>
      <td class="Type-cell">Watch</td>
    </tr>
    <tr>
      <td class="District-cell">10A</td>
      <td class="DFL-cell">JOHN WARD</td>
      <td class="-cell"><input type="radio" value="1" name="10A" id="10Ad" class="d css-checkbox" onclick="map.removeLayer(dem26);dem26.addTo(map);map.setView([46.8527,-93.5595], 6);" checked><label for="10Ad" class="css-label"></label></td>
      <td class="GOP-cell">JOSHUA HEINTZEMAN</td>
      <td class="-cell"><input type="radio" value="2" name="10A" id="10Ar" class="r css-checkbox" onclick="map.removeLayer(rep26);rep26.addTo(map);map.setView([46.8527,-93.5595], 6);"><label for="10Ar" class="css-label2"></label></td>
      <td class="Type-cell">Watch</td>
    </tr>
    <tr>
      <td class="District-cell">04B</td>
      <td class="DFL-cell">PAUL MARQUART</td>
      <td class="-cell"><input type="radio" value="1" name="04B" id="04Bd" class="d css-checkbox" onclick="map.removeLayer(dem25);dem25.addTo(map);map.setView([46.8527,-93.5595], 6);" checked><label for="04Bd" class="css-label"></label></td>
      <td class="GOP-cell">JARED LADUKE</td>
      <td class="-cell"><input type="radio" value="2" name="04B" id="04Br" class="r css-checkbox" onclick="map.removeLayer(rep25);rep25.addTo(map);map.setView([46.8527,-93.5595], 6);"><label for="04Br" class="css-label2"></label></td>
      <td class="Type-cell">Watch</td>
    </tr>
    <tr>
      <td class="District-cell">02B</td>
      <td class="DFL-cell">DAVID SOBIESKI</td>
      <td class="-cell"><input type="radio" value="1" name="02B" id="02Bd" class="d css-checkbox" onclick="map.removeLayer(dem24);dem24.addTo(map);map.setView([46.8527,-93.5595], 6);" checked><label for="02Bd" class="css-label"></label></td>
      <td class="GOP-cell">STEVE GREEN</td>
      <td class="-cell"><input type="radio" value="2" name="02B" id="02Br" class="r css-checkbox" onclick="map.removeLayer(rep24);rep24.addTo(map);map.setView([46.8527,-93.5595], 6);"><label for="02Br" class="css-label2"></label></td>
      <td class="Type-cell">Watch</td>
    </tr>
    <tr>
      <td class="District-cell">01B</td>
      <td class="DFL-cell">ERIC BERGESON</td>
      <td class="-cell"><input type="radio" value="1" name="01B" id="01Bd" class="d css-checkbox" onclick="map.removeLayer(dem23);dem23.addTo(map);map.setView([46.8527,-93.5595], 6);" checked><label for="01Bd" class="css-label"></label></td>
      <td class="GOP-cell">DEBRA (DEB) KIEL</td>
      <td class="-cell"><input type="radio" value="2" name="01B" id="01Br" class="r css-checkbox" onclick="map.removeLayer(rep23);rep23.addTo(map);map.setView([46.8527,-93.5595], 6);"><label for="01Br" class="css-label2"></label></td>
      <td class="Type-cell">Watch</td>
    </tr>
    <tr>
      <td class="District-cell">56B</td>
      <td class="DFL-cell">WILL MORGAN</td>
      <td class="-cell"><input type="radio" value="1" name="56B" id="56Bd" class="d css-checkbox" onclick="map.removeLayer(dem22);dem22.addTo(map);map.setView([44.7548,-93.347], 10);" checked><label for="56Bd" class="css-label"></label></td>
      <td class="GOP-cell">ROZ PETERSON</td>
      <td class="-cell"><input type="radio" value="2" name="56B" id="56Br" class="r css-checkbox" onclick="map.removeLayer(rep22);rep22.addTo(map);map.setView([44.7548,-93.347], 10);"><label for="56Br" class="css-label2"></label></td>
      <td class="Type-cell">Swing</td>
    </tr>
    <tr>
      <td class="District-cell">54A</td>
      <td class="DFL-cell">DAN SCHOEN</td>
      <td class="-cell"><input type="radio" value="1" name="54A" id="54Ad" class="d css-checkbox" onclick="map.removeLayer(dem21);dem21.addTo(map);map.setView([44.8271,-92.9731], 10);" checked><label for="54Ad" class="css-label"></label></td>
      <td class="GOP-cell">MATTHEW KOWALSKI</td>
      <td class="-cell"><input type="radio" value="2" name="54A" id="54Ar" class="r css-checkbox" onclick="map.removeLayer(rep21);rep21.addTo(map);map.setView([44.8271,-92.9731], 10);"><label for="54Ar" class="css-label2"></label> </td>
      <td class="Type-cell">Swing</td>
    </tr>
    <tr>
      <td class="District-cell">51B</td>
      <td class="DFL-cell">LAURIE HALVERSON</td>
      <td class="-cell"><input type="radio" value="1" name="51B" id="51Bd" class="d css-checkbox" onclick="map.removeLayer(dem20);dem20.addTo(map);map.setView([44.8042,-93.1379], 10);" checked><label for="51Bd" class="css-label"></label></td>
      <td class="GOP-cell">JEN WILSON</td>
      <td class="-cell"><input type="radio" value="2" name="51B" id="51Br" class="r css-checkbox" onclick="map.removeLayer(rep20);rep20.addTo(map);map.setView([44.8042,-93.1379], 10);"><label for="51Br" class="css-label2"></label> </td>
      <td class="Type-cell">Swing</td>
    </tr>
    <tr>
      <td class="District-cell">51A</td>
      <td class="DFL-cell">SANDRA MASIN</td>
      <td class="-cell"><input type="radio" value="1" name="51A" id="51Ad" class="d css-checkbox" onclick="map.removeLayer(dem19);dem19.addTo(map);map.setView([44.8130,-93.2217], 10);" checked><label for="51Ad" class="css-label"></label></td>
      <td class="GOP-cell">ANDREA TODD-HARLIN</td>
      <td class="-cell"><input type="radio" value="2" name="51A" id="51Ar" class="r css-checkbox" onclick="map.removeLayer(rep19);rep19.addTo(map);map.setView([44.8130,-93.2217], 10);"><label for="51Ar" class="css-label2"></label> </td>
      <td class="Type-cell">Swing</td>
    </tr>
    <tr>
      <td class="District-cell">49B</td>
      <td class="DFL-cell">PAUL ROSENTHAL</td>
      <td class="-cell"><input type="radio" value="1" name="49B" id="49Bd" class="d css-checkbox" onclick="map.removeLayer(dem18);dem18.addTo(map);map.setView([44.8498,-93.3779], 10);" checked><label for="49Bd" class="css-label"></label></td>
      <td class="GOP-cell">BARB SUTTER</td>
      <td class="-cell"><input type="radio" value="2" name="49B" id="49Br" class="r css-checkbox" onclick="map.removeLayer(rep18);rep18.addTo(map);map.setView([44.8498,-93.3779], 10);"><label for="49Br" class="css-label2"></label></td>
      <td class="Type-cell">Swing</td>
    </tr>
    <tr>
      <td class="District-cell">49A</td>
      <td class="DFL-cell">RON ERHARDT</td>
      <td class="-cell"><input type="radio" value="1" name="49A" id="49Ad" class="d css-checkbox" onclick="map.removeLayer(dem17);dem17.addTo(map);map.setView([44.8975,-93.3601], 10);" checked><label for="49Ad" class="css-label"></label></td>
      <td class="GOP-cell">DARIO ANSELMO</td>
      <td class="-cell"><input type="radio" value="2" name="49A" id="49Ar" class="r css-checkbox" onclick="map.removeLayer(rep17);rep17.addTo(map);map.setView([44.8975,-93.3601], 10);"><label for="49Ar" class="css-label2"></label> </td>
      <td class="Type-cell">Swing</td>
    </tr>
    <tr>
      <td class="District-cell">48A</td>
      <td class="DFL-cell">YVONNE SELCER</td>
      <td class="-cell"><input type="radio" value="1" name="48A" id="48Ad" class="d css-checkbox" onclick="map.removeLayer(dem16);dem16.addTo(map);map.setView([44.8919,-93.4771], 10);" checked><label for="48Ad" class="css-label"></label></td>
      <td class="GOP-cell">KIRK STENSRUD</td>
      <td class="-cell"><input type="radio" value="2" name="48A" id="48Ar" class="r css-checkbox" onclick="map.removeLayer(rep16);rep16.addTo(map);map.setView([44.8919,-93.4771], 10);"><label for="48Ar" class="css-label2"></label> </td>
      <td class="Type-cell">Swing</td>
    </tr>
    <tr>
      <td class="District-cell">44A</td>
      <td class="DFL-cell">AUDREY BRITTON</td>
      <td class="-cell"><input type="radio" value="1" name="44A" id="44Ad" class="d css-checkbox" onclick="map.removeLayer(dem15);dem15.addTo(map);map.setView([45.0396,-93.4716], 10);"><label for="44Ad" class="css-label"></label></td>
      <td class="GOP-cell">SARAH ANDERSON</td>
      <td class="-cell"><input type="radio" value="2" name="44A" id="44Ar" class="r css-checkbox" onclick="map.removeLayer(rep15);rep15.addTo(map);map.setView([45.0396,-93.4716], 10);" checked><label for="44Ar" class="css-label2"></label> </td>
      <td class="Type-cell">Swing</td>
    </tr>
    <tr>
      <td class="District-cell">42B</td>
      <td class="DFL-cell">BARB YARUSSO</td>
      <td class="-cell"><input type="radio" value="1" name="42B" id="42Bd" class="d css-checkbox" onclick="map.removeLayer(dem14);dem14.addTo(map);map.setView([45.0502,-93.1015], 10);" checked><label for="42Bd" class="css-label"></label></td>
      <td class="GOP-cell">RANDY JESSUP</td>
      <td class="-cell"><input type="radio" value="2" name="42B" id="42Br" class="r css-checkbox" onclick="map.removeLayer(rep14);rep14.addTo(map);map.setView([45.0502,-93.1015], 10);"><label for="42Br" class="css-label2"></label> </td>
      <td class="Type-cell">Swing</td>
    </tr>
    <tr>
      <td class="District-cell">36A</td>
      <td class="DFL-cell">JEFFERSON FIETEK</td>
      <td class="-cell"><input type="radio" value="1" name="36A" id="36Ad"  class="d css-checkbox" onclick="map.removeLayer(dem13);dem13.addTo(map);map.setView([45.1656,-93.3687], 10);"><label for="36Ad" class="css-label"></label></td>
      <td class="GOP-cell">MARK W. UGLEM</td>
      <td class="-cell"><input type="radio" value="2" name="36A" id="36Ar" class="r css-checkbox" onclick="map.removeLayer(rep13);rep13.addTo(map);map.setView([45.1656,-93.3687], 10);" checked><label for="36Ar" class="css-label2"></label> </td>
      <td class="Type-cell">Swing</td>
    </tr>
    <tr>
      <td class="District-cell">27A</td>
      <td class="DFL-cell">SHANNON SAVICK</td>
      <td class="-cell"><input type="radio" value="1" name="27A" id="27Ad" class="d css-checkbox" onclick="map.removeLayer(dem12);dem12.addTo(map);map.setView([46.8527,-93.5595], 6);" checked><label for="27Ad" class="css-label"></label></td>
      <td class="GOP-cell">PEGGY BENNETT</td>
      <td class="-cell"><input type="radio" value="2" name="27A" id="27Ar" class="r css-checkbox" onclick="map.removeLayer(rep12);rep12.addTo(map);map.setView([46.8527,-93.5595], 6);"><label for="27Ar" class="css-label2"></label></td>
      <td class="Type-cell">Swing</td>
    </tr>
    <tr>
      <td class="District-cell">24B</td>
      <td class="DFL-cell">PATTI FRITZ</td>
      <td class="-cell"><input type="radio" value="1" name="24B" id="24Bd" class="d css-checkbox" onclick="map.removeLayer(dem10);dem10.addTo(map);map.setView([46.8527,-93.5595], 6);" checked><label for="24Bd" class="css-label"></label></td>
      <td class="GOP-cell">BRIAN DANIELS</td>
      <td class="-cell"><input type="radio" value="2" name="24B" id="24Br" class="r css-checkbox" onclick="map.removeLayer(rep10);rep10.addTo(map);map.setView([46.8527,-93.5595], 6);"><label for="24Br" class="css-label2"></label></td>
      <td class="Type-cell">Swing</td>
    </tr>
    <tr>
      <td class="District-cell">24A</td>
      <td class="DFL-cell">BEVERLY CASHMAN</td>
      <td class="-cell"><input type="radio" value="1" name="24A" id="24Ad" class="d css-checkbox" onclick="map.removeLayer(dem9);dem9.addTo(map);map.setView([46.8527,-93.5595], 6);"><label for="24Ad" class="css-label"></label></td>
      <td class="GOP-cell">JOHN PETERSBURG</td>
      <td class="-cell"><input type="radio" value="2" name="24A" id="24Ar" class="r css-checkbox" onclick="map.removeLayer(rep9);rep9.addTo(map);map.setView([46.8527,-93.5595], 6);" checked><label for="24Ar" class="css-label2"></td>
      <td class="Type-cell">Swing</td>
    </tr>
    <tr>
      <td class="District-cell">17B</td>
      <td class="DFL-cell">MARY SAWATZKY</td>
      <td class="-cell"><input type="radio" value="1" name="17B" id="17Bd" class="d css-checkbox" onclick="map.removeLayer(dem8);dem8.addTo(map);map.setView([46.8527,-93.5595], 6);" checked><label for="17Bd" class="css-label"></label></td>
      <td class="GOP-cell">DAVE BAKER</td>
      <td class="-cell"><input type="radio" value="2" name="17B" id="17Br" class="r css-checkbox" onclick="map.removeLayer(rep8);rep8.addTo(map);map.setView([46.8527,-93.5595], 6);"><label for="17Br" class="css-label2"></label></td>
      <td class="Type-cell">Swing</td>
    </tr>
    <tr>
      <td class="District-cell">14B</td>
      <td class="DFL-cell">ZACHARY </td>
      <td class="-cell"><input type="radio" value="1" name="14B" id="14Bd" class="d css-checkbox" onclick="map.removeLayer(dem7);dem7.addTo(map);map.setView([46.8527,-93.5595], 6);" checked><label for="14Bd" class="css-label"></label></td>
      <td class="GOP-cell">JIM KNOBLACH</td>
      <td class="-cell"><input type="radio" value="2" name="14B" id="14Br" class="r css-checkbox" onclick="map.removeLayer(rep7);rep7.addTo(map);map.setView([46.8527,-93.5595], 6);"><label for="14Br" class="css-label2"></label></td>
      <td class="Type-cell">Swing</td>
    </tr>
    <tr>
      <td class="District-cell">13A</td>
      <td class="DFL-cell">EMILY JENSEN</td>
      <td class="-cell"><input type="radio" value="1" name="13A" id="13Ad" class="d css-checkbox" onclick="map.removeLayer(dem6);dem6.addTo(map);map.setView([46.8527,-93.5595], 6);"><label for="13Ad" class="css-label"></label></td>
      <td class="GOP-cell">JEFF HOWE</td>
      <td class="-cell"><input type="radio" value="2" name="13A" id="13Ar" class="r css-checkbox" onclick="map.removeLayer(rep6);rep6.addTo(map);map.setView([46.8527,-93.5595], 6);" checked><label for="13Ar" class="css-label2"></label>  </td>
      <td class="Type-cell">Swing</td>
    </tr>
    <tr>
      <td class="District-cell">12A</td>
      <td class="DFL-cell">JAY MCNAMAR</td>
      <td class="-cell"><input type="radio" value="1" name="12A" id="12Ad" class="d css-checkbox" onclick="map.removeLayer(dem5);dem5.addTo(map);map.setView([46.8527,-93.5595], 6);" checked><label for="12Ad" class="css-label"></label></td>
      <td class="GOP-cell">JEFF BACKER</td>
      <td class="-cell"><input type="radio" value="2" name="12A" id="12Ar" class="r css-checkbox" onclick="map.removeLayer(rep5);rep5.addTo(map);map.setView([46.8527,-93.5595], 6);"><label for="12Ar" class="css-label2"></label></td>
      <td class="Type-cell">Swing</td>
    </tr>
    <tr>
      <td class="District-cell">11B</td>
      <td class="DFL-cell">TIM FAUST</td>
      <td class="-cell"><input type="radio" value="1" name="11B" id="11Bd" class="d css-checkbox" onclick="map.removeLayer(dem4);dem4.addTo(map);map.setView([46.8527,-93.5595], 6);" checked><label for="11Bd" class="css-label"></label></td>
      <td class="GOP-cell">JASON RARICK</td>
      <td class="-cell"><input type="radio" value="2" name="11B" id="11Br" class="r css-checkbox" onclick="map.removeLayer(rep4);rep4.addTo(map);map.setView([46.8527,-93.5595], 6);"><label for="11Br" class="css-label2"></label></td>
      <td class="Type-cell">Swing</td>
    </tr>
    <tr>
      <td class="District-cell">10B</td>
      <td class="DFL-cell">JOE RADINOVICH</td>
      <td class="-cell"><input type="radio" value="1" name="10B" id="10Bd" class="d css-checkbox" onclick="map.removeLayer(dem3);dem3.addTo(map);map.setView([46.8527,-93.5595], 6);" checked><label for="10Bd" class="css-label"></label></td>
      <td class="GOP-cell">DALE K LUECK</td>
      <td class="-cell"><input type="radio" value="2" name="10B" id="10Br" class="r css-checkbox" onclick="map.removeLayer(rep3);rep3.addTo(map);map.setView([46.8527,-93.5595], 6);"><label for="10Br" class="css-label2"></label></td>
      <td class="Type-cell">Swing</td>
    </tr>
    <tr>
      <td class="District-cell">05A</td>
      <td class="DFL-cell">JOHN PERSELL</td>
      <td class="-cell"><input type="radio" value="1" name="05A" id="05Ad" class="d css-checkbox" onclick="map.removeLayer(dem11);dem11.addTo(map);map.setView([46.8527,-93.5595], 6);" checked><label for="05Ad" class="css-label"></label></td>
      <td class="GOP-cell">PHILLIP NELSON</td>
      <td class="-cell"><input type="radio" value="2" name="05A" id="05Ar" class="r css-checkbox" onclick="map.removeLayer(rep11);rep11.addTo(map);map.setView([46.8527,-93.5595], 6);"><label for="05Ar" class="css-label2"></label></td>
      <td class="Type-cell">Swing</td>
    </tr>
    <tr>
      <td class="District-cell">04A</td>
      <td class="DFL-cell">BEN LIEN</td>
      <td class="-cell"><input type="radio" value="1" name="04A" id="04Ad" class="d css-checkbox" onclick="map.removeLayer(dem2);dem2.addTo(map);map.setView([46.8527,-93.5595], 6);" checked><label for="04Ad" class="css-label"></label></td>
      <td class="GOP-cell">BRIAN E. GRAMER</td>
      <td class="-cell"><input type="radio" value="2" name="04A" id="04Ar" class="r css-checkbox" onclick="map.removeLayer(rep2);rep2.addTo(map);map.setView([46.8527,-93.5595], 6);"><label for="04Ar" class="css-label2"></label></td>
      <td class="Type-cell">Swing</td>
    </tr>
    <tr>
      <td class="District-cell">02A</td>
      <td class="DFL-cell">DAVE ERICKSON</td>
      <td class="-cell"><input type="radio" value="1" name="02A" id="02Ad" class="d css-checkbox" onclick="map.removeLayer(dem1);dem1.addTo(map);map.setView([46.8527,-93.5595], 6);" checked><label for="02Ad" class="css-label"></label></td>
      <td class="GOP-cell">ROGER HANCOCK</td>
      <td class="-cell"><input type="radio" value="2" name="02A" id="02Ar" class="r css-checkbox" onclick="map.removeLayer(rep1);rep1.addTo(map);map.setView([46.8527,-93.5595], 6);"><label for="02Ar" class="css-label2"></label></td>
      <td class="Type-cell">Swing</td>
    </tr>
  </tbody>
</table>
</div>
<div class="predictThis" style="width:100%;position:absolute;bottom:0;padding-left:30%;"><input type="submit" id="Vote" name="Vote" value="Vote!" onclick="setVisibility('paint_me', 'none');setVisibility('chart', 'none');setVisibility('tracker', 'none');setVisibility('tally', 'none');map.setView([46.8527,-93.5595], 6);dataGrid.addTo(map);dataControl.addTo(map);map.removeLayer(marriageControl);map.removeLayer(marriageGrid);setVisibility('text_2006', 'none');setVisibility('text_2008', 'none');setVisibility('text_2010', 'none');setVisibility('text_2012', 'none');setVisibility('lean_text', 'none');setVisibility('unopposed_text', 'none');setVisibility('rematch_text', 'none');setVisibility('open_text', 'none');setVisibility('marriage_text', 'none');setVisibility('text_2004', 'none');setVisibility('gov_text', 'none');setVisibility('prez_text', 'none');setVisibility('thanks', 'block');"><input type="reset" onclick="map.removeLayer(paint_me);paint_me.addTo(map);map.setView([46.8527,-93.5595], 6);" value="Reset"></div>
</form>
</div>


<div id="text_2010" class="explain_text">
</div>
<div id="text_2008" class="explain_text">
</div>
<div id="text_2006" class="explain_text">
</div>
<div id="text_2004" class="explain_text">
</div>
<div id="text_2012" class="explain_text">
<h3>The Upcoming Election</h3>
The 2012 election gave Democrats control of the Minnesota House and Senate, in a year that saw heavy turnout for Democratic President Obama. With only the 134-seat House up for election this year, Republicans need a net increase of seven seats to regain House control. Currently the DFL holds 73 seats and the GOP has 61 seats.
</div>
<div id="lean_text" class="explain_text">
<h3>Current Leanings</h3>
All but three of the 22 swing districts during this midterm campaign are in DFL-held districts.
</div>
<div id="unopposed_text" class="explain_text">
<h3>Shifting Between Parties</h3>
Only 22 of the 134 House seats are in swing districts where the member elected in 2012 was of a different party than the one voters picked in 2010.  Some of these 22 districts have changed parties frequently: 11 districts have changed party hands in each of the last two elections and four districts have seesawed between party picks in three of the last elections.  Apart from the swing seats, most seats have been either historic party strongholds or have leaned towards one party in recent elections.
</div>
<div id="rematch_text" class="explain_text">
<h3>Political Rematches</h3>
In 23 districts voters will choose from the same candidates that faced off two years ago.  Thirteen of these seats are currently held by a DFL member, including three seats that were won by a margin of 2 percent or less. Ten incumbent Republicans will face the same challenger, including two seats where the margin of victory was less than 5 percent.
</div>
<div id="open_text" class="explain_text">
<h3>Filling the Empty Seats</h3>
Most of the 15 open seats are in Republican-leaning districts, presenting an uphill battle to Democrats trying add seats to their House majority.
</div>
<div id="marriage_text" class="explain_text">
<h3>Marriage Amendment Fallout</h3>
In 17 House districts where the majority of voters approved a constitutional amendment to constitutionally ban sex-marriage in 2012, the House member voted to legalize same sex marriage in 2013. Fifteen of those members are Democrats.
</div>
<div id="prez_text" class="explain_text">
<h3>Presidential Election Factors</h3>
In nine House districts, 2012 voters opted for Republican presidential candidate Mitt Romney and a Democratic state House member. In four House districts, voters picked Democratic President Obama and a Republican House member.
</div>
<div id="gov_text" class="explain_text">
<h3>Gubernatorial Leanings</h3>
Only one Republican House member represents a district that backed Democratic Gov. Mark Dayton in 2010. But 20 DFL House members currently represent districts Republican gubernatorial candidate Tom Emmer won in 2010.
</div>
<div id="vul_text" class="explain_text">
<h3>Seat Vulnerability</h3>
The most vulnerable seats this election cycle are in DFL-held districts.
</div>


</div>


		
<div class="candidates">
<div id="prez_can" class="hidden_candidates">
<h3>Races to watch for effects of presidential leanings</h3>
<div class="container">
  <div class="row">

  	<div class="left">
  		<h4 class="partyR">21A</h4>
  		<p><strong>Kelly(R)</strong><br />Schoen(D)</p>
  	</div>

  	<div class="middle">
  		<h4 class="partyR">28B</h4>
  		<p><strong>Davids(R)</strong><br />Pieper(D)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyR">57A</h4>
    	<p><strong>Mack(R)</strong><br />Slaten(D)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyR">54B</h4>
    	<p><strong>McNamara(R)</strong><br />Folken(D)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">02A</h4>
    	<p><strong>Erickson(D)</strong><br />Hancock(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">10B</h4>
    	<p><strong>Radinovich(D)</strong><br />Lueck(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">11B</h4>
    	<p><strong>Faust(D)</strong><br />Rarick(R)</p>
  	</div>

	</div>
 <div class="row">

  	<div class="left">
  		<h4 class="partyD">17B</h4>
  		<p><strong>Sawatzky(D)</strong><br />Baker(R)</p>
  	</div>

  	<div class="middle">
  		<h4 class="partyD">24B</h4>
  		<p><strong>Fritz(D)</strong><br />Daniels(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">04B</h4>
    	<p><strong>Marquart(D)</strong><br />Laduke(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">10A</h4>
    	<p><strong>Ward(D)</strong><br />Heintzeman(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">12A</h4>
    	<p><strong>McNamar(D)</strong><br />Backer(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">17A</h4>
    	<p><strong>Falk(D)</strong><br />Miller(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD"></h4>
    	<p></p>
  	</div>

	</div>
</div>
</div>

<div id="vul_can" class="hidden_candidates">
<h3>Races for vulnerable seats</h3>
<div class="container">
  <div class="row">

  	<div class="left">
  		<h4 class="partyD">48A</h4>
  		<p><strong>Selcer(D)</strong><br />Stensrud(R)</p>
  	</div>

  	<div class="middle">
  		<h4 class="partyD">11B</h4>
  		<p><strong>Faust(D)</strong><br />Rarick(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">42A</h4>
    	<p><strong>Yarusso(D)</strong><br />Jessup(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">51A</h4>
    	<p><strong>Masin(D)</strong><br />Harlin(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">54A</h4>
    	<p><strong>Schoen(D)</strong><br />Kowalski(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">49B</h4>
    	<p><strong>Sutter(D)</strong><br />Rosenthal(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">10B</h4>
    	<p><strong>Lueck(D)</strong><br />Radinovich(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">56B</h4>
    	<p><strong>Peterson(D)</strong><br />Morgan(R)</p>
  	</div>

	</div>

  <div class="row">

  	<div class="left">
  		<h4 class="partyD">27A</h4>
  		<p><strong>Savick(D)</strong><br />Bennett(R)</p>
  	</div>

  	<div class="middle">
  		<h4 class="partyD">02A</h4>
  		<p><strong>Erickson(D)</strong><br />Hancock(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">02A</h4>
    	<p><strong>Erickson(D)</strong><br />Hancock(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">05B</h4>
    	<p><strong>Anzelc(D)</strong><br />Eichorn(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">14B</h4>
    	<p><strong>Dorholt(D)</strong><br />Knoblach(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">17B</h4>
    	<p><strong>Baker(D)</strong><br />Sawatzky(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">24B</h4>
    	<p><strong>Fritz(D)</strong><br />Daniels(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD"></h4>
    	<p></p>
  	</div>

	</div>
</div>

</div>

<div id="marriage_can" class="hidden_candidates">
<h3>Races to watch for effects of the marriage amendment</h3>
<div class="container">
  <div class="row">

  	<div class="left">
  		<h4 class="partyD">02A</h4>
  		<p><strong>Erickson(D)</strong><br />Hancock(R)</p>
  	</div>

  	<div class="middle">
  		<h4 class="partyD">03A</h4>
  		<p><strong>Dill(D)</strong><br />Johnson(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">05A</h4>
    	<p>Nelson(R)<br />Persell(D)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">05B</h4>
    	<p><strong>Anzelc(D)</strong><br />Eichorn(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">06A</h4>
    	<p>Melin(D)<br />Weber(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">06B</h4>
    	<p><strong>Metsa(D)</strong><br />Matasich(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">11A</h4>
    	<p><strong>Sundin(D)</strong><br />Hafvenstein(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">10B</h4>
    	<p><strong>Radinovich(D)</strong><br />Lueck(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">10A</h4>
    	<p><strong>Ward(D)</strong><br />Heintzeman(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">11B</h4>
    	<p><strong>Faust(D)</strong><br />Rarick(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">04B</h4>
    	<p><strong>Marquart(D)</strong><br />Laduke(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">12A</h4>
    	<p><strong>McNamar(D)</strong><br />Backer(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyD">17A</h4>
    	<p><strong>Falk(D)</strong><br />Miller(R)</p>
  	</div>

	</div>
 <div class="row">

  	<div class="left">
  		<h4 class="partyD">27A</h4>
  		<p><strong>Savick(D)</strong><br />Bennett(R)</p>
  	</div>

  	<div class="middle">
  		<h4 class="partyD">27B</h4>
  		<p><strong>Poppe(D)</strong><br />Schminke(R)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyR">55B</h4>
    	<p><strong>Albright(R)</strong><br />Burkart(D)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyR">58A</h4>
    	<p><strong>Koznick(R)</strong><br />Willingham(D)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyR">57A</h4>
    	<p><strong>Folken(R)</strong><br />Mack(D)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyR">58B</h4>
    	<p><strong>Garofalo(R)</strong><br />Vagts(D)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyR">57B</h4>
    	<p><strong>Wills(R)</strong><br />Packard(D)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyR">54BA</h4>
    	<p><strong>McNamara(R)</strong><br />Slaten(D)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyR">39B</h4>
    	<p><strong>Lohmer(R)</strong><br />Degree(D)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyR">39A</h4>
    	<p><strong>Dettmer(R)</strong><br />Stender(D)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyR">37B</h4>
    	<p><strong>Sanders(R)</strong><br />Witt(D)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyR">38B</h4>
    	<p><strong>Dean(R)</strong><br />Pariseau(D)</p>
  	</div>

  	<div class="right">
    	<h4 class="partyR">14A</h4>
    	<p><strong>Erickson(R)</strong><br />Wolgamott(D)</p>
  	</div>

	</div>
</div>
</div>

<div id="safe_can" class="hidden_candidates">
<h3>Races for swings seats</h3>
<div class="container">
  <div class="row">

  	<div class="left">
  		<h4 class="partyD">02A</h4>
  		<p><strong>Erickson(D)</strong><br />Hancock(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">04A</h4>
  		<p><strong>Lien(D)</strong><br />Gramer(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">05A</h4>
  		<p><strong>Nelson(D)</strong><br />Persell(D)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">10B</h4>
  		<p><strong>Radinovich(D)</strong><br />Lueck(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">11B</h4>
  		<p><strong>Rarick(D)</strong><br />Faust(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">12A</h4>
  		<p><strong>McNamar(D)</strong><br />Backer(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">13A</h4>
  		<p><strong>Jensen(D)</strong><br />Home(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">14B</h4>
  		<p><strong>Zachary(D)</strong><br />Knoblach(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">17B</h4>
  		<p><strong>Sawatzky(D)</strong><br />Baker(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">24A</h4>
  		<p><strong>Petersburg(R)</strong><br />Cashman(D)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">24B</h4>
  		<p><strong>Fritz(D)</strong><br />Daniels(R)</p>
  	</div>

  </div>
 <div class="row">

  	<div class="left">
  		<h4 class="partyD">27A</h4>
  		<p><strong>Savick(D)</strong><br />Bennett(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">32B</h4>
  		<p><strong>Warner(D)</strong><br />Barrett(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">36A</h4>
  		<p><strong>Uglem(R)</strong><br />Fietek(D)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">42B</h4>
  		<p><strong>Yarusso(D)</strong><br />Jessup(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">44A</h4>
  		<p><strong>Britton(D)</strong><br />Anderson(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">48A</h4>
  		<p><strong>Selcer(D)</strong><br />Stensrud(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">49A</h4>
  		<p><strong>Erhardt(D)</strong><br />Anselmo(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">51A</h4>
    	<p><strong>Masin(D)</strong><br />Harlin(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">51B</h4>
  		<p><strong>Halverson(D)</strong><br />Wilson(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">54A</h4>
  		<p><strong>Schoen(D)</strong><br />Kowalski(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">56B</h4>
  		<p><strong>Morgan(D)</strong><br />Peterson(R)</p>
  	</div>

	</div>
</div>
</div>

<div id="gov_can" class="hidden_candidates">
<h3>Races to watch for effects of gubernatorial leanings</h3>
<div class="container">
  <div class="row">
  	<div class="right">
    	<h4 class="partyR">01B</h4>
    	<p><strong>Kiel(R)</strong><br />Bergeson(D)</p>
  	</div>
  	<div class="right">
    	<h4 class="partyD">02A</h4>
    	<p><strong>Erickson(D)</strong><br />Hancock(R)</p>
  	</div>
  	<div class="right">
    	<h4 class="partyD">04B</h4>
    	<p><strong>Marquart(D)</strong><br />Laduke(R)</p>
  	</div>
  	<div class="right">
    	<h4 class="partyD">12A</h4>
    	<p><strong>Mcnamar(D)</strong><br />Backer(R)</p>
  	</div>
  	<div class="right">
    	<h4 class="partyD">17A</h4>
    	<p><strong>Falk(D)</strong><br />Miller(R)</p>
  	</div>
  	<div class="right">
    	<h4 class="partyD">17B</h4>
    	<p><strong>Sawatzky(D)</strong><br />Baker(R)</p>
  	</div>
  	<div class="right">
    	<h4 class="partyD">25B</h4>
    	<p><strong>Norton(D)</strong><br /></p>
  	</div>
  	<div class="right">
    	<h4 class="partyD">48A</h4>
    	<p><strong>Selcer(D)</strong><br />Stensrud(R)</p>
  	</div>
  	<div class="right">
    	<h4 class="partyD">36B</h4>
    	<p><strong>Hortman(D)</strong><br />Crema(R)</p>
  	</div>
  	<div class="right">
    	<h4 class="partyD">42A</h4>
    	<p><strong>Yarusso(D)</strong><br />Jessup(R)</p>
  	</div>
  	<div class="right">
    	<h4 class="partyD">44B</h4>
    	<p>Rutzick(R)<br />Applebaum(D)</p>
  	</div>

	</div>
 <div class="row">

  	<div class="right">
    	<h4 class="partyD">49B</h4>
    	<p><strong>Rosenthal(D)</strong><br />Sutter(R)</p>
  	</div>
  	<div class="right">
    	<h4 class="partyD">51A</h4>
    	<p><strong>Masin(D)</strong><br />Harlin(R)</p>
  	</div>
  	<div class="right">
    	<h4 class="partyD">51B</h4>
    	<p><strong>Halverson(D)</strong><br />Wilson(R)</p>
  	</div>
  	<div class="right">
    	<h4 class="partyD">56B</h4>
    	<p><strong>Morgan(D)</strong><br />Peterson(R)</p>
  	</div>
  	<div class="right">
    	<h4 class="partyD">52B</h4>
    	<p><strong>Atkins(D)</strong><br />Lee(R)</p>
  	</div>
  	<div class="right">
    	<h4 class="partyD">24B</h4>
    	<p><strong>Fritz(D)</strong><br />Daniels(R)</p>
  	</div>
  	<div class="right">
    	<h4 class="partyD">11B</h4>
    	<p><strong>Faust(D)</strong><br />Rarick(R)</p>
  	</div>
  	<div class="right">
    	<h4 class="partyD">10B</h4>
    	<p><strong>Lueck(D)</strong><br />Radinovich(R)</p>
  	</div>
  	<div class="right">
    	<h4 class="partyD">10A</h4>
    	<p><strong>Ward(D)</strong><br />Heintzeman(R)</p>
  	</div>
  	<div class="right">
    	<h4 class="partyD"></h4>
    	<p></p>
  	</div>

	</div>
</div>
</div>

<div id="now">
<div class="container">
  <div class="row">

	</div>
  <div class="row">


	</div>
</div>
</div>

<div id="open_can" class="hidden_candidates">
<h3>Races for open seats</h3>
<div class="container">
  <div class="row">

  	<div class="left">
  		<h4 class="partyR">20A</h4>
  		<p>Vogel(R)<br />Lofgren(D)</p>
  	</div>
  	<div class="left">
  		<h4 class="partyR">26B</h4>
  		<p>Pierson(R)</strong><br />Wright(D)</p>
  	</div>
  	<div class="left">
  		<h4 class="partyR">47A</h4>
  		<p>Gieseke(D)<br />Nash(R)</p>
  	</div>
  	<div class="left">
  		<h4 class="partyR">58A</h4>
  		<p>Koznick(R)</strong><br />Willingham(D)</p>
  	</div>
  	<div class="left">
  		<h4 class="partyR">56A</h4>
  		<p>Christensen(R)<br />Kimmel(D)</p>
  	</div>
  	<div class="left">
  		<h4 class="partyR">35A</h4>
  		<p>Perovich(D)<br />Whelan(R)</p>
  	</div>
  	<div class="left">
  		<h4 class="partyR">30B</h4>
  		<p>Shimek(D)<br />Lucero(D)</p>
  	</div>
  	<div class="left">
  		<h4 class="partyR">53BA</h4>
  		<p><strong>Fenton(R)</strong><br />Hendrikson(D)</p>
  	</div>

  </div>
 <div class="row">
  	<div class="left">
  		<h4 class="partyR">55A</h4>
  		<p><strong>Loonan(R)</strong><br />Whiting(D)</p>
  	</div>
  	<div class="left">
  		<h4 class="partyD">64B</h4>
  		<p>Pinto(D)<br />Surman(R)</p>
  	</div>
  	<div class="left">
  		<h4 class="partyD">46B</h4>
  		<p>Youakim(D)<br />Bjornson(R)</p>
  	</div>
  	<div class="left">
  		<h4 class="partyD">19B</h4>
  		<p>Considine(D)<br />Kruse(R)</p>
  	</div>
  	<div class="left">
  		<h4 class="partyD">07A</h4>
  		<p>Schultz(D)<br />Hall(R)</p>
  	</div>
  	<div class="left">
  		<h4 class="partyD">40B</h4>
  		<p><strong>Hilstrom(D)</strong><br />Marvin(R)</p>
  	</div>
  	<div class="left">
  		<h4 class="partyD">44B</h4>
  		<p>Rutzick(D)<br />Applebaum(D)</p>
  	</div>
  	<div class="left">
  		<h4 class="partyD"></h4>
  		<p></p>
  	</div>

</div>
</div>
</div>

<div id="unopposed_can" class="hidden_candidates">

</div>

<div id="rematch_can" class="hidden_candidates">
<h3>Races featuring political rematches</h3>
<div class="container">
  <div class="row">

  	<div class="left">
  		<h4 class="partyR">38A</h4>
  		<p><strong>Runbeck(R)</strong><br />Davern(D)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyR">38B</h4>
  		<p><strong>Dean(R)</strong><br />Pariseau(D)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyR">33A</h4>
  		<p><strong>Hertaus(R)</strong><br />Mikkelson(D)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyR">39B</h4>
  		<p><strong>Lohmer(R)</strong><br />Degree(D)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyR">44A</h4>
  		<p><strong>Anderson(R)</strong><br />Britton(D)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyR">32A</h4>
  		<p><strong>Johnson(R)</strong><br />Gammel(D)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyR">22B</h4>
  		<p><strong>Hamilton(R)</strong><br />Avenel-Navara(D)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyR">35B</h4>
  		<p><strong>Scott(R)</strong><br />Beard(D)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyR">01A</h4>
  		<p><strong>Fabian(R)</strong><br />Patterson(D)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyR">15B</h4>
  		<p><strong>Newburger(R)</strong><br />Johnson(D)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">02A</h4>
  		<p><strong>Erickson(D)</strong><br />Hancock(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">06A</h4>
  		<p>Melin(D)<br />Weber(R)</p>
  	</div>


  </div>
  <div class="row">

  	<div class="left">
  		<h4 class="partyD">10B</h4>
  		<p><strong>Lueck(D)</strong><br />Radinovich(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">37A</h4>
  		<p><strong>Benz(D)</strong><br />Newton(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">60A</h4>
  		<p><strong>Millsop(D)</strong><br />Loeffler(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">67B</h4>
  		<p><strong>Quinn(D)</strong><br />Johnson(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">56B</h4>
  		<p><strong>Peterson(D)</strong><br />Morgan(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">17A</h4>
  		<p><strong>Miller(D)</strong><br />Falk(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">43A</h4>
  		<p><strong>Fischer(D)</strong><br />Stout(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">26A</h4>
  		<p><strong>Leibling(D)</strong><br />Bly(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">07B</h4>
  		<p><strong>Simonson(D)</strong><br />Silvers(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">52A</h4>
  		<p><strong>Hansen(D)</strong><br />Blum(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD">48A</h4>
  		<p><strong>Selcer(D)</strong><br />Stensrud(R)</p>
  	</div>

  	<div class="left">
  		<h4 class="partyD"></h4>
  		<p></p>
  	</div>

	</div>
</div>
</div>
</div>

<div id="chart"></div>

<div class="outerMap">
	<div id="survey">
	<label class="btn btn-primary round vote" id="Predict">
	<input type="radio" id="predict2" name="options" onchange="setVisibility('paint_me', 'block');map.removeLayer(paint_me);paint_me.addTo(map);setVisibility('chart', 'none');setVisibility('tracker', 'none');setVisibility('map', 'block');setVisibility('tracker', 'none');setVisibility('tally', 'block');map.setView([46.8527,-93.5595], 6);dataGrid.addTo(map);dataControl.addTo(map);map.removeLayer(marriageControl);map.removeLayer(marriageGrid);setVisibility('text_2006', 'none');setVisibility('text_2008', 'none');setVisibility('text_2010', 'none');setVisibility('text_2012', 'none');setVisibility('lean_text', 'none');setVisibility('unopposed_text', 'none');setVisibility('rematch_text', 'none');setVisibility('open_text', 'none');setVisibility('marriage_text', 'none');setVisibility('prez_text', 'none');setVisibility('text_2004', 'none');setVisibility('gov_text', 'none');setVisibility('thanks', 'none');setVisibility('vul_text', 'none');document.getElementById('metro').checked = false;setVisibility('zoomMe', 'none');setVisibility('now', 'none');setVisibility('safe_can', 'none');setVisibility('rematch_can', 'none');setVisibility('open_can', 'none');setVisibility('marriage_can', 'none');setVisibility('prez_can', 'none');setVisibility('gov_can', 'none');setVisibility('vul_can', 'none');"> Make Your Election 2014 Predictions
	</label>
	<label class="btn btn-primary round results" id="Results">
	<input type="radio" id="predict2" name="options" onchange="setVisibility('map', 'none');setVisibility('paint_me', 'none');setVisibility('chart', 'none');setVisibility('tally', 'none');setVisibility('tracker', 'block');setVisibility('text_2006', 'none');setVisibility('text_2008', 'none');setVisibility('text_2010', 'none');setVisibility('text_2012', 'none');setVisibility('lean_text', 'none');setVisibility('unopposed_text', 'none');setVisibility('rematch_text', 'none');setVisibility('open_text', 'none');setVisibility('marriage_text', 'none');setVisibility('prez_text', 'none');setVisibility('text_2004', 'none');setVisibility('gov_text', 'none');setVisibility('thanks', 'none');setVisibility('vul_text', 'none');setVisibility('zoomMe', 'none');document.getElementById('metro').checked = false;setVisibility('now', 'none');setVisibility('safe_can', 'none');setVisibility('rematch_can', 'none');setVisibility('open_can', 'none');setVisibility('marriage_can', 'none');setVisibility('prez_can', 'none');setVisibility('gov_can', 'none');setVisibility('vul_can', 'none');"> See Results
	</label>
	</div>
	
	
	<div id="zoomMe" class="zoomCheckbox"><input type="checkbox" id="metro" name="zoomMetro" onclick="if (document.getElementById('metro').checked) {map.setView([44.9648,-93.2519], 9);} else {map.setView([46.8527,-93.5595], 6);}" value="1" /><label for="metro"></label></div><div id="map"></div></div>
<div id="thanks"><h3>Thanks for submitting your prediction. Your data have been tabulated into the overall <a href="#" onclick="setVisibility('map', 'none');setVisibility('paint_me', 'none');setVisibility('chart', 'none');setVisibility('tally', 'none');setVisibility('tracker', 'block');setVisibility('text_2006', 'none');setVisibility('text_2008', 'none');setVisibility('text_2010', 'none');setVisibility('text_2012', 'none');setVisibility('lean_text', 'none');setVisibility('unopposed_text', 'none');setVisibility('rematch_text', 'none');setVisibility('open_text', 'none');setVisibility('marriage_text', 'none');setVisibility('prez_text', 'none');setVisibility('text_2004', 'none');setVisibility('gov_text', 'none');setVisibility('thanks', 'none');setVisibility('vul_text', 'none');document.getElementById('Results').className = 'active btn btn-primary round';document.getElementById('Predict').className = 'btn btn-primary round';">survey results</a>.</h3>
<br />
You predicted <label for="61" id="tallyMeR2">61</label> GOP seats and <label for="73" id="tallyMeD2">73</label> DFL seats resulting in <label id="house_control2" for="DFL">DFL Control</label> of the Minnesota House of Representatives. <br />

<div class="fb-share-button" data-href="./tileserver/index.php" data-type="button_count" data-width="300"></div>
</div>

<div id='tally'>
<center>134 House Seats - <label id="house_control" for="DFL">DFL Control</label><br />
DFL Seats <label for="73" id="tallyMeD">73</label> | <label for="61" id="tallyMeR">61</label> GOP Seats</center>
<br />
</div>

<div id="tracker">
<center><h3>Readers predict a <font color="<?php echo $shade; ?>"><strong><?php echo $results; ?></strong></font> majority in the Minnesota House of Representatives</h3>
<svg style="height:460px;width:800px;"> </svg>
<h4>Among vulnerable districts, totals from <?php echo $total; ?> readers project <font color="#79B0C5"><strong><?php echo $districtsDcount; ?></strong></font> DFL wins and <font color="#a7706b"><strong><?php echo $districtsRcount; ?></strong></font> GOP wins.<br />
<h4>If all other races go as expected, the chamber would be broken down by <font color="#79B0C5"><strong><?php echo $districtsDcount + 48; ?></strong></font> DFL seats and <font color="#a7706b"><strong><?php echo $districtsRcount + 57; ?></strong></font> GOP seats.</h4>
</center>
</div>


</div>
</div>

<!--SCRIPTS-->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.4.9/d3.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.4.9/d3.min.js"></script>
<script src="//cdn.jsdelivr.net/underscorejs/1.6.0/underscore-min.map"></script>
<script src="//cdn.jsdelivr.net/underscorejs/1.6.0/underscore-min.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<script src='https://api.tiles.mapbox.com/mapbox.js/v1.6.3/mapbox.js'></script>
<script src='https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v0.0.2/Leaflet.fullscreen.min.js'></script>
<script src='https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-omnivore/v0.2.0/leaflet-omnivore.min.js'></script>
<script src="./js/nvd3-master/lib/d3.v3.js"></script>
<script src="./js/nvd3-master/nv.d3.js"></script>
<script src="./js/nvd3-master/src/utils.js"></script>
<script src="./js/nvd3-master/src/tooltip.js"></script>
<script src="./js/nvd3-master/src/models/legend.js"></script>
<script src="./js/nvd3-master/src/models/axis.js"></script>
<script src="./js/nvd3-master/src/models/multiBarHorizontal.js"></script>
<script src="./js/nvd3-master/src/models/multiBarHorizontalChart.js"></script>
<script src="./js/nvd3-master/examples/stream_layers.js"></script>
<script src="http://malsup.github.com/jquery.form.js"></script> 
<script src="//cdn.datatables.net/1.10.2/js/jquery.dataTables.min.js"></script> 

<script language="JavaScript">
$('#32Bd').attr('checked','checked');

function setVisibility(id, visibility) {
document.getElementById(id).style.display = visibility;
}


$(document).ready(function() {
    $("input").click(function(event) {
        updateTotal();
    });
});

function updateTotal() {
    var totalR = 57;
    var totalD = 48;
    $("input:checked.r").each(function() {
       totalR += parseFloat(this.value) - 1;
    });
    $('#tallyMeR').text(totalR);
    $('#tallyMeR2').text(totalR);

    $("input:checked.d").each(function() {
       totalD += parseFloat(this.value);
    });
    $('#tallyMeD').text(totalD);
    $('#tallyMeD2').text(totalD);

if (totalR > totalD){
    $('#house_control').text("GOP control");
    $('#house_control2').text("GOP control");
var rep = "GOP";
return rep;
}
else if (totalR == totalD){
    $('#house_control').text("Even Split");
    $('#house_control2').text("Even Split");
}
else {
    $('#house_control').text("DFL Control");
    $('#house_control2').text("DFL Control");
var dfl = "DFL";
return dfl;
}
}

</script>

    <script type="text/javascript">
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-45101494-1']);
    _gaq.push(['_setDomainName', 'delimited.io']);
    _gaq.push(['_trackPageview']);
    (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
    </script>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<script> 
    $(document).ready(function() { 
        $('#form1').ajaxForm(function() { 
           //alert('form was submitted');
        }); 
    }); 

$(document).ready(function(){
    $('#ballot').dataTable({"iDisplayLength":134,"scrollY":"450px","scrollCollapse":true,"paging":false,"scrollx":false});
});
</script> 

    <script>
      d3.csv('data/race.csv', function (error, data) {

        var width = 800, height = 500;
        var fill = d3.scale.ordinal().range(['#79B0C5','#a7706b'])
        var svg = d3.select("#chart").append("svg")
            .attr("width", width)
            .attr("height", height);

        for (var j = 0; j < data.length; j++) {
          data[j].radius = +data[j].comb / 4;
          data[j].x = Math.random() * width;
          data[j].y = Math.random() * height;
        }

        var padding = 4;
        var maxRadius = d3.max(_.pluck(data, 'radius'));


        var getCenters = function (vname, size) {
          var centers, map;
          centers = _.uniq(_.pluck(data, vname)).map(function (d) {
            return {name: d, value: 1};
          });

          map = d3.layout.pack().size(size);
          map.nodes({children: centers});

          return centers;
        };

        var nodes = svg.selectAll("circle")
          .data(data);

        nodes.enter().append("circle")
          .attr("class", "node")
          .attr("cx", function (d) { return d.x; })
          .attr("cy", function (d) { return d.y; })
          .attr("r", 2)
          .style("fill", function (d) { return fill(d.party); })
          .on("mouseover", function (d) { showPopover.call(this, d); })
          .on("mouseout", function (d) { removePopovers(); })

        nodes.transition().duration(1000)
          .attr("r", function (d) { return d.radius; })

        var force = d3.layout.force();

        draw('party');

        $( ".btn" ).click(function() {
          draw(this.id);
        });

        function draw (varname) {
          var centers = getCenters(varname, [530, 375]);
          force.on("tick", tick(centers, varname));
          labels(centers)
          force.start();
        }

        function tick (centers, varname) {
          var foci = {};
          for (var i = 0; i < centers.length; i++) {
            foci[centers[i].name] = centers[i];
          }
          return function (e) {
            for (var i = 0; i < data.length; i++) {
              var o = data[i];
              var f = foci[o[varname]];
              o.y += (f.y - o.y) * e.alpha;
              o.x += (f.x - o.x) * e.alpha;
            }
            nodes.each(collide(.11))
              .attr("cx", function (d) { return d.x; })
              .attr("cy", function (d) { return d.y; });
          }
        }

        function labels (centers) {
          svg.selectAll(".label").remove();

          svg.selectAll(".label")
          .data(centers).enter().append("text")
          .attr("class", "label")
          .text(function (d) { return d.name })
          .attr("transform", function (d) {
            return "translate(" + (d.x - ((d.name.length)*3)) + ", " + (d.y - d.r) + ")";
          });
        }

        function removePopovers () {
          $('.popover').each(function() {
            $(this).remove();
          }); 
        }

        function showPopover (d) {
          $(this).popover({
            placement: 'auto top',
            container: 'body',
            trigger: 'manual',
            html : true,
            content: function() { 
              return "District " + d.district + "<br/>" + d.leg + "<br/>" + d.unopposed +
                     "<br/>Party: " + d.party + "<br/>Term: " + d.term; }
          });
          $(this).popover('show')
        }

        function collide(alpha) {
          var quadtree = d3.geom.quadtree(data);
          return function(d) {
            var r = d.radius + maxRadius + padding,
                nx1 = d.x - r,
                nx2 = d.x + r,
                ny1 = d.y - r,
                ny2 = d.y + r;
            quadtree.visit(function(quad, x1, y1, x2, y2) {
              if (quad.point && (quad.point !== d)) {
                var x = d.x - quad.point.x,
                    y = d.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y),
                    r = d.radius + quad.point.radius + padding;
                if (l < r) {
                  l = (l - r) / l * alpha;
                  d.x -= x *= l;
                  d.y -= y *= l;
                  quad.point.x += x;
                  quad.point.y += y;
                }
              }
              return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
          };
        }
      });
    </script>

<script>
//Set the map boundaries
var southWest = L.latLng(-94.2957,44.5239),
    northEast = L.latLng(-92.5488,45.7177),
    bounds = L.latLngBounds(southWest, northEast);

//Make the map object
var map = L.mapbox.map('map', {
      attributionControl: false,
      infoControl: 'Jeff Hargarten',
        maxBounds: bounds,
gridControl: false // Disable default gridControl interactivity.
    });

map.setView([46.8527,-93.5595], 6);

var openseat = L.mapbox.tileLayer('./tileserver/mnleg_open.tilejson', {format: 'png'});
var lean = L.mapbox.tileLayer('./tileserver/mnleg_lean.tilejson', {format: 'png'});
var prez = L.mapbox.tileLayer('./tileserver/mnleg_prez.tilejson', {format: 'png'});
var gov = L.mapbox.tileLayer('./tileserver/mnleg_gov.tilejson', {format: 'png'});
var marriage = L.mapbox.tileLayer('./tileserver/mnleg_marriage.tilejson', {format: 'png'});
var unopposed = L.mapbox.tileLayer('./tileserver/mnleg_unopposed.tilejson', {format: 'png'});
var rematch = L.mapbox.tileLayer('./tileserver/mnleg_rematch.tilejson', {format: 'png'});
var now = L.mapbox.tileLayer('./tileserver/mnleg_2012.tilejson', {format: 'png'});
var now2 = L.mapbox.tileLayer('./tileserver/mnleg_2010.tilejson', {format: 'png'});
var now3 = L.mapbox.tileLayer('./tileserver/mnleg_2008.tilejson', {format: 'png'});
var now4 = L.mapbox.tileLayer('./tileserver/mnleg_2006.tilejson', {format: 'png'});
var now5 = L.mapbox.tileLayer('./tileserver/mnleg_2004.tilejson', {format: 'png'});
var party = L.mapbox.tileLayer('./tileserver/mnleg_2012.tilejson', {format: 'png'}).addTo(map);
var paint_me = L.mapbox.tileLayer('./tileserver/mnleg_predict.tilejson', {format: 'png'});
var vulnerable = L.mapbox.tileLayer('./tileserver/mnleg_vul.tilejson', {format: 'png'});

var dem1 = L.mapbox.tileLayer('./tileserver/02Ad.tilejson', {format: 'png'});
var rep1 = L.mapbox.tileLayer('./tileserver/02Ar.tilejson', {format: 'png'});
var dem2 = L.mapbox.tileLayer('./tileserver/04Ad.tilejson', {format: 'png'});
var rep2 = L.mapbox.tileLayer('./tileserver/04Ar.tilejson', {format: 'png'});
var dem3 = L.mapbox.tileLayer('./tileserver/10Bd.tilejson', {format: 'png'});
var rep3 = L.mapbox.tileLayer('./tileserver/10Br.tilejson', {format: 'png'});
var dem4 = L.mapbox.tileLayer('./tileserver/11Bd.tilejson', {format: 'png'});
var rep4 = L.mapbox.tileLayer('./tileserver/11Br.tilejson', {format: 'png'});
var dem5 = L.mapbox.tileLayer('./tileserver/12Ad.tilejson', {format: 'png'});
var rep5 = L.mapbox.tileLayer('./tileserver/12Ar.tilejson', {format: 'png'});
var dem6 = L.mapbox.tileLayer('./tileserver/13Ad.tilejson', {format: 'png'});
var rep6 = L.mapbox.tileLayer('./tileserver/13Ar.tilejson', {format: 'png'});
var dem7 = L.mapbox.tileLayer('./tileserver/14Bd.tilejson', {format: 'png'});
var rep7 = L.mapbox.tileLayer('./tileserver/14Br.tilejson', {format: 'png'});
var dem8 = L.mapbox.tileLayer('./tileserver/17Bd.tilejson', {format: 'png'});
var rep8 = L.mapbox.tileLayer('./tileserver/17Br.tilejson', {format: 'png'});
var dem9 = L.mapbox.tileLayer('./tileserver/24Ad.tilejson', {format: 'png'});
var rep9 = L.mapbox.tileLayer('./tileserver/24Ar.tilejson', {format: 'png'});
var dem10 = L.mapbox.tileLayer('./tileserver/24Bd.tilejson', {format: 'png'});
var rep10 = L.mapbox.tileLayer('./tileserver/24Br.tilejson', {format: 'png'});
var dem11 = L.mapbox.tileLayer('./tileserver/05Ad.tilejson', {format: 'png'});
var rep11 = L.mapbox.tileLayer('./tileserver/05Ar.tilejson', {format: 'png'});
var dem12 = L.mapbox.tileLayer('./tileserver/27Ad.tilejson', {format: 'png'});
var rep12 = L.mapbox.tileLayer('./tileserver/27Ar.tilejson', {format: 'png'});
var dem13 = L.mapbox.tileLayer('./tileserver/36Ad.tilejson', {format: 'png'});
var rep13 = L.mapbox.tileLayer('./tileserver/36Ar.tilejson', {format: 'png'});
var dem14 = L.mapbox.tileLayer('./tileserver/42Bd.tilejson', {format: 'png'});
var rep14 = L.mapbox.tileLayer('./tileserver/42Br.tilejson', {format: 'png'});
var dem15 = L.mapbox.tileLayer('./tileserver/44Ad.tilejson', {format: 'png'});
var rep15 = L.mapbox.tileLayer('./tileserver/44Ar.tilejson', {format: 'png'});
var dem16 = L.mapbox.tileLayer('./tileserver/48Ad.tilejson', {format: 'png'});
var rep16 = L.mapbox.tileLayer('./tileserver/48Ar.tilejson', {format: 'png'});
var dem17 = L.mapbox.tileLayer('./tileserver/49Ad.tilejson', {format: 'png'});
var rep17 = L.mapbox.tileLayer('./tileserver/49Ar.tilejson', {format: 'png'});
var dem18 = L.mapbox.tileLayer('./tileserver/49Bd.tilejson', {format: 'png'});
var rep18 = L.mapbox.tileLayer('./tileserver/49Br.tilejson', {format: 'png'});
var dem19 = L.mapbox.tileLayer('./tileserver/51Ad.tilejson', {format: 'png'});
var rep19 = L.mapbox.tileLayer('./tileserver/51Ar.tilejson', {format: 'png'});
var dem20 = L.mapbox.tileLayer('./tileserver/51Bd.tilejson', {format: 'png'});
var rep20 = L.mapbox.tileLayer('./tileserver/51Br.tilejson', {format: 'png'});
var dem21 = L.mapbox.tileLayer('./tileserver/54Ad.tilejson', {format: 'png'});
var rep21 = L.mapbox.tileLayer('./tileserver/54Ar.tilejson', {format: 'png'});
var dem22 = L.mapbox.tileLayer('./tileserver/56Bd.tilejson', {format: 'png'});
var rep22 = L.mapbox.tileLayer('./tileserver/56Br.tilejson', {format: 'png'});
var dem23 = L.mapbox.tileLayer('./tileserver/01Bd.tilejson', {format: 'png'});
var rep23 = L.mapbox.tileLayer('./tileserver/01Br.tilejson', {format: 'png'});
var dem24 = L.mapbox.tileLayer('./tileserver/02Bd.tilejson', {format: 'png'});
var rep24 = L.mapbox.tileLayer('./tileserver/02Br.tilejson', {format: 'png'});
var dem25 = L.mapbox.tileLayer('./tileserver/04Bd.tilejson', {format: 'png'});
var rep25 = L.mapbox.tileLayer('./tileserver/04Br.tilejson', {format: 'png'});
var dem26 = L.mapbox.tileLayer('./tileserver/10Ad.tilejson', {format: 'png'});
var rep26 = L.mapbox.tileLayer('./tileserver/10Ar.tilejson', {format: 'png'});
var dem27 = L.mapbox.tileLayer('./tileserver/15Ad.tilejson', {format: 'png'});
var rep27 = L.mapbox.tileLayer('./tileserver/15Ar.tilejson', {format: 'png'});
var dem28 = L.mapbox.tileLayer('./tileserver/17Ad.tilejson', {format: 'png'});
var rep28 = L.mapbox.tileLayer('./tileserver/17Ar.tilejson', {format: 'png'});
var dem29 = L.mapbox.tileLayer('./tileserver/32Bd.tilejson', {format: 'png'});
var rep29 = L.mapbox.tileLayer('./tileserver/32Br.tilejson', {format: 'png'});



//Pull interactive, data-infused vector layers from the .mbtiles hosted on the server
var dataTiles = L.mapbox.tileLayer('./tileserver/main_grid.tilejson');
var dataGrid = L.mapbox.gridLayer('./tileserver/main_grid.tilejson').addTo(map);
var dataControl = L.mapbox.gridControl(dataGrid).addTo(map);

var prezGrid = L.mapbox.gridLayer('./tileserver/prez_grid.tilejson');
var prezControl = L.mapbox.gridControl(prezGrid);

var rematchGrid = L.mapbox.gridLayer('./tileserver/rematch_grid.tilejson');
var rematchControl = L.mapbox.gridControl(rematchGrid);

var flipGrid = L.mapbox.gridLayer('./tileserver/flip_grid.tilejson');
var flipControl = L.mapbox.gridControl(flipGrid);

var govGrid = L.mapbox.gridLayer('./tileserver/gov_grid.tilejson');
var govControl = L.mapbox.gridControl(govGrid);

//Pull interactive, data-infused vector layers from the .mbtiles hosted on the server
var marriageGrid = L.mapbox.gridLayer('./tileserver/marriage_grid.tilejson');
var marriageControl = L.mapbox.gridControl(marriageGrid);


//dataTiles.addTo(map);

//Add the legend to the map
//map.legendControl.addLegend(document.getElementById('wrapper').innerHTML);

//Make the tooltip follow the mouse
dataControl.options.follow = true;
marriageControl.options.follow = true;
prezControl.options.follow = true;
govControl.options.follow = true;
flipControl.options.follow = true;
rematchControl.options.follow = true;

function addLayer(layer) {
openseat.addTo(map);
//var box = document.getElementById(layer);
//map.removeLayer(layer);
//if (!box.checked){ map.removeLayer(layer); }
//if (box.checked) { layer.addTo(map); }
}

map.dragging.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();
if (map.tap) map.tap.disable();

</script>

<script>
var chart;
nv.addGraph(function() {
  chart = nv.models.multiBarHorizontalChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .margin({top: 30, right: 20, bottom: 30, left: 30})
      //.showValues(true)
      .tooltips(false)
      //.barColor(#a7706b,#ff0000)
      .transitionDuration(250)
      .stacked(true)
      //.showControls(false);

  chart.yAxis
      .tickFormat(d3.format(',.0%'));

  d3.select('#tracker svg')
      .datum(rep_data)
      .call(chart);

  nv.utils.windowResize(chart.update);

  chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

  return chart;
});
</script>

<script>
rep_data = [ 
  {
    key: 'GOP',
    color: '#a7706b',
    values: [
      { 
        "label" : "01B" ,
        "value" : <?php echo ($repTal[22] / $total) ?>
      } ,
      { 
        "label" : "02A" ,
        "value" : <?php echo ($repTal[0] / $total) ?>
      } , 
      { 
        "label" : "02B" ,
        "value" : <?php echo ($repTal[23] / $total) ?>
      } ,
      { 
        "label" : "04A" ,
        "value" : <?php echo ($repTal[1] / $total) ?>
      } , 
      { 
        "label" : "04B" ,
        "value" : <?php echo ($repTal[24] / $total) ?>
      } , 
      { 
        "label" : "10A" ,
        "value" : <?php echo ($repTal[25] / $total) ?>
      } , 
      { 
        "label" : "10B" ,
        "value" : <?php echo ($repTal[2] / $total) ?>
      } , 
      { 
        "label" : "11B" ,
        "value" : <?php echo ($repTal[3] / $total) ?>
      } , 
      {
        "label" : "12A" ,
        "value" : <?php echo ($repTal[4] / $total) ?>
      } , 
      { 
        "label" : "13A" ,
        "value" : <?php echo ($repTal[5] / $total) ?>
      } , 
      { 
        "label" : "14B" ,
        "value" : <?php echo ($repTal[6] / $total) ?>
      } , 
      { 
        "label" : "15A" ,
        "value" : <?php echo ($repTal[26] / $total) ?>
      } , 
      {
        "label" : "17A" ,
        "value" : <?php echo ($repTal[27] / $total) ?>
      } , 
      {
        "label" : "17B" ,
        "value" : <?php echo ($repTal[7] / $total) ?>
      } , 
      { 
        "label" : "24A" ,
        "value" : <?php echo ($repTal[8] / $total) ?>
      },
      { 
        "label" : "24B" ,
        "value" : <?php echo ($repTal[9] / $total) ?>
      },
      { 
        "label" : "05A" ,
        "value" : <?php echo ($repTal[10] / $total) ?>
      },
      { 
        "label" : "27A" ,
        "value" : <?php echo ($repTal[11] / $total) ?>
      },
      { 
        "label" : "32B" ,
        "value" : <?php echo ($repTal[28] / $total) ?>
      },
      { 
        "label" : "36A" ,
        "value" : <?php echo ($repTal[12] / $total) ?>
      },
      { 
        "label" : "42B" ,
        "value" : <?php echo ($repTal[13] / $total) ?>
      },
      { 
        "label" : "44A" ,
        "value" : <?php echo ($repTal[14] / $total) ?>
      },
      { 
        "label" : "48A" ,
        "value" : <?php echo ($repTal[15] / $total) ?>
      },
      { 
        "label" : "49A" ,
        "value" : <?php echo ($repTal[16] / $total) ?>
      },
      { 
        "label" : "49B" ,
        "value" : <?php echo ($repTal[17] / $total) ?>
      },
      { 
        "label" : "51A" ,
        "value" : <?php echo ($repTal[18] / $total) ?>
      },
      { 
        "label" : "51B" ,
        "value" : <?php echo ($repTal[19] / $total) ?>
      },
      { 
        "label" : "54A" ,
        "value" : <?php echo ($repTal[20] / $total) ?>
      },
      { 
        "label" : "56B" ,
        "value" : <?php echo ($repTal[21] / $total) ?>
      }
    ]
  },
  {
    key: 'DFL',
    color: '#79B0C5',
    values: [
      { 
        "label" : "01B" ,
        "value" : <?php echo ($demTal[22] / $total) ?>
      } ,
      { 
        "label" : "02A" ,
        "value" : <?php echo ($demTal[0] / $total) ?>
      } , 
      { 
        "label" : "02B" ,
        "value" : <?php echo ($demTal[23] / $total) ?>
      } ,
      { 
        "label" : "04A" ,
        "value" : <?php echo ($demTal[1] / $total) ?>
      } , 
      { 
        "label" : "04B" ,
        "value" : <?php echo ($demTal[24] / $total) ?>
      } , 
      { 
        "label" : "10A" ,
        "value" : <?php echo ($demTal[25] / $total) ?>
      } , 
      { 
        "label" : "10B" ,
        "value" : <?php echo ($demTal[2] / $total) ?>
      } , 
      { 
        "label" : "11B" ,
        "value" : <?php echo ($demTal[3] / $total) ?>
      } , 
      {
        "label" : "12A" ,
        "value" : <?php echo ($demTal[4] / $total) ?>
      } , 
      { 
        "label" : "13A" ,
        "value" : <?php echo ($demTal[5] / $total) ?>
      } , 
      { 
        "label" : "14B" ,
        "value" : <?php echo ($demTal[6] / $total) ?>
      } , 
      { 
        "label" : "15A" ,
        "value" : <?php echo ($demTal[26] / $total) ?>
      } , 
      {
        "label" : "17A" ,
        "value" : <?php echo ($demTal[27] / $total) ?>
      } , 
      {
        "label" : "17B" ,
        "value" : <?php echo ($demTal[7] / $total) ?>
      } , 
      { 
        "label" : "24A" ,
        "value" : <?php echo ($demTal[8] / $total) ?>
      },
      { 
        "label" : "24B" ,
        "value" : <?php echo ($demTal[9] / $total) ?>
      },
      { 
        "label" : "05A" ,
        "value" : <?php echo ($demTal[10] / $total) ?>
      },
      { 
        "label" : "27A" ,
        "value" : <?php echo ($demTal[11] / $total) ?>
      },
      { 
        "label" : "32B" ,
        "value" : <?php echo ($demTal[28] / $total) ?>
      },
      { 
        "label" : "36A" ,
        "value" : <?php echo ($demTal[12] / $total) ?>
      },
      { 
        "label" : "42B" ,
        "value" : <?php echo ($demTal[13] / $total) ?>
      },
      { 
        "label" : "44A" ,
        "value" : <?php echo ($demTal[14] / $total) ?>
      },
      { 
        "label" : "48A" ,
        "value" : <?php echo ($demTal[15] / $total) ?>
      },
      { 
        "label" : "49A" ,
        "value" : <?php echo ($demTal[16] / $total) ?>
      },
      { 
        "label" : "49B" ,
        "value" : <?php echo ($demTal[17] / $total) ?>
      },
      { 
        "label" : "51A" ,
        "value" : <?php echo ($demTal[18] / $total) ?>
      },
      { 
        "label" : "51B" ,
        "value" : <?php echo ($demTal[19] / $total) ?>
      },
      { 
        "label" : "54A" ,
        "value" : <?php echo ($demTal[20] / $total) ?>
      },
      { 
        "label" : "56B" ,
        "value" : <?php echo ($demTal[21] / $total) ?>
      }
    ]
  }
];

</script>
  </body>
</html>
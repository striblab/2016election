<!-- <!DOCTYPE html>
<html>
<head> -->

<?php
  $blog_path = "http://apps.startribune.com/news/datalab/index.php";
  readfile('http://www.startribune.com/partner/header/309069391/');
  $shareURL = "http://strib.mn/1MwRGOL";
  $clickabilityID = "327423181";
  $shareTitle = "StarTribune Election 2016 Lab";
  $shareDescription = "Our one-stop shop for Election 2016 coverage, polls and data analysis";
  $shareImage = "http://apps.startribune.com/news/election2016/img/st2016.png";
?>

<script>
var titleString = "<a class='nav-section-link' href='http://wwww.startribune.com/politics'' data-linkname='Politics' data-linktype='logo navigation' data-modulename='Page Navigation Top' data-moduletype='header-page-nav' data-position='0-13'>Politics</a>";

$(".nav-section-mod.col-2 li").html(titleString);

$(".edgetoedge li").removeClass("highlight");

document.title = 'StarTribune.com: Election 2016 Lab';
</script>

    <meta property="og:url" content="<?php echo $blog_path; ?>" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="<?php echo $shareTitle; ?>" />
    <meta property="og:description" content="<?php echo $shareDescription; ?>" />
    <meta property="og:image" content="<?php echo $shareImage; ?>" />

    <title>StarTribune.com: News, weather, sports from Minneapolis, St. Paul and Minnesota</title>
    
    <meta charset="utf-8"><script type="text/javascript">(window.NREUM||(NREUM={})).loader_config={xpid:"VQcCVV9UGwQHUFhQBwY="};window.NREUM||(NREUM={}),__nr_require=function(t,e,n){function r(n){if(!e[n]){var o=e[n]={exports:{}};t[n][0].call(o.exports,function(e){var o=t[n][1][e];return r(o?o:e)},o,o.exports)}return e[n].exports}if("function"==typeof __nr_require)return __nr_require;for(var o=0;o<n.length;o++)r(n[o]);return r}({QJf3ax:[function(t,e){function n(t){function e(e,n,a){t&&t(e,n,a),a||(a={});for(var c=s(e),f=c.length,u=i(a,o,r),d=0;f>d;d++)c[d].apply(u,n);return u}function a(t,e){f[t]=s(t).concat(e)}function s(t){return f[t]||[]}function c(){return n(e)}var f={};return{on:a,emit:e,create:c,listeners:s,_events:f}}function r(){return{}}var o="nr@context",i=t("gos");e.exports=n()},{gos:"7eSDFh"}],ee:[function(t,e){e.exports=t("QJf3ax")},{}],3:[function(t){function e(t){try{i.console&&console.log(t)}catch(e){}}var n,r=t("ee"),o=t(1),i={};try{n=localStorage.getItem("__nr_flags").split(","),console&&"function"==typeof console.log&&(i.console=!0,-1!==n.indexOf("dev")&&(i.dev=!0),-1!==n.indexOf("nr_dev")&&(i.nrDev=!0))}catch(a){}i.nrDev&&r.on("internal-error",function(t){e(t.stack)}),i.dev&&r.on("fn-err",function(t,n,r){e(r.stack)}),i.dev&&(e("NR AGENT IN DEVELOPMENT MODE"),e("flags: "+o(i,function(t){return t}).join(", ")))},{1:23,ee:"QJf3ax"}],4:[function(t){function e(t,e,n,i,s){try{c?c-=1:r("err",[s||new UncaughtException(t,e,n)])}catch(f){try{r("ierr",[f,(new Date).getTime(),!0])}catch(u){}}return"function"==typeof a?a.apply(this,o(arguments)):!1}function UncaughtException(t,e,n){this.message=t||"Uncaught error with no additional information",this.sourceURL=e,this.line=n}function n(t){r("err",[t,(new Date).getTime()])}var r=t("handle"),o=t(6),i=t("ee"),a=window.onerror,s=!1,c=0;t("loader").features.err=!0,t(5),window.onerror=e;try{throw new Error}catch(f){"stack"in f&&(t(1),t(2),"addEventListener"in window&&t(3),window.XMLHttpRequest&&XMLHttpRequest.prototype&&XMLHttpRequest.prototype.addEventListener&&window.XMLHttpRequest&&XMLHttpRequest.prototype&&XMLHttpRequest.prototype.addEventListener&&!/CriOS/.test(navigator.userAgent)&&t(4),s=!0)}i.on("fn-start",function(){s&&(c+=1)}),i.on("fn-err",function(t,e,r){s&&(this.thrown=!0,n(r))}),i.on("fn-end",function(){s&&!this.thrown&&c>0&&(c-=1)}),i.on("internal-error",function(t){r("ierr",[t,(new Date).getTime(),!0])})},{1:10,2:9,3:7,4:11,5:3,6:24,ee:"QJf3ax",handle:"D5DuLP",loader:"G9z0Bl"}],5:[function(t){t("loader").features.ins=!0},{loader:"G9z0Bl"}],6:[function(t){function e(){}if(window.performance&&window.performance.timing&&window.performance.getEntriesByType){var n=t("ee"),r=t("handle"),o=t(1),i=t(2);t("loader").features.stn=!0,t(3),n.on("fn-start",function(t){var e=t[0];e instanceof Event&&(this.bstStart=Date.now())}),n.on("fn-end",function(t,e){var n=t[0];n instanceof Event&&r("bst",[n,e,this.bstStart,Date.now()])}),o.on("fn-start",function(t,e,n){this.bstStart=Date.now(),this.bstType=n}),o.on("fn-end",function(t,e){r("bstTimer",[e,this.bstStart,Date.now(),this.bstType])}),i.on("fn-start",function(){this.bstStart=Date.now()}),i.on("fn-end",function(t,e){r("bstTimer",[e,this.bstStart,Date.now(),"requestAnimationFrame"])}),n.on("pushState-start",function(){this.time=Date.now(),this.startPath=location.pathname+location.hash}),n.on("pushState-end",function(){r("bstHist",[location.pathname+location.hash,this.startPath,this.time])}),"addEventListener"in window.performance&&(window.performance.addEventListener("webkitresourcetimingbufferfull",function(){r("bstResource",[window.performance.getEntriesByType("resource")]),window.performance.webkitClearResourceTimings()},!1),window.performance.addEventListener("resourcetimingbufferfull",function(){r("bstResource",[window.performance.getEntriesByType("resource")]),window.performance.clearResourceTimings()},!1)),document.addEventListener("scroll",e,!1),document.addEventListener("keypress",e,!1),document.addEventListener("click",e,!1)}},{1:10,2:9,3:8,ee:"QJf3ax",handle:"D5DuLP",loader:"G9z0Bl"}],7:[function(t,e){function n(t){i.inPlace(t,["addEventListener","removeEventListener"],"-",r)}function r(t){return t[1]}var o=t("ee").create(),i=t(1)(o),a=t("gos");if(e.exports=o,n(window),"getPrototypeOf"in Object){for(var s=document;s&&!s.hasOwnProperty("addEventListener");)s=Object.getPrototypeOf(s);s&&n(s);for(var c=XMLHttpRequest.prototype;c&&!c.hasOwnProperty("addEventListener");)c=Object.getPrototypeOf(c);c&&n(c)}else XMLHttpRequest.prototype.hasOwnProperty("addEventListener")&&n(XMLHttpRequest.prototype);o.on("addEventListener-start",function(t){if(t[1]){var e=t[1];"function"==typeof e?this.wrapped=t[1]=a(e,"nr@wrapped",function(){return i(e,"fn-",null,e.name||"anonymous")}):"function"==typeof e.handleEvent&&i.inPlace(e,["handleEvent"],"fn-")}}),o.on("removeEventListener-start",function(t){var e=this.wrapped;e&&(t[1]=e)})},{1:25,ee:"QJf3ax",gos:"7eSDFh"}],8:[function(t,e){var n=t("ee").create(),r=t(1)(n);e.exports=n,r.inPlace(window.history,["pushState"],"-")},{1:25,ee:"QJf3ax"}],9:[function(t,e){var n=t("ee").create(),r=t(1)(n);e.exports=n,r.inPlace(window,["requestAnimationFrame","mozRequestAnimationFrame","webkitRequestAnimationFrame","msRequestAnimationFrame"],"raf-"),n.on("raf-start",function(t){t[0]=r(t[0],"fn-")})},{1:25,ee:"QJf3ax"}],10:[function(t,e){function n(t,e,n){t[0]=o(t[0],"fn-",null,n)}var r=t("ee").create(),o=t(1)(r);e.exports=r,o.inPlace(window,["setTimeout","setInterval","setImmediate"],"setTimer-"),r.on("setTimer-start",n)},{1:25,ee:"QJf3ax"}],11:[function(t,e){function n(){f.inPlace(this,p,"fn-")}function r(t,e){f.inPlace(e,["onreadystatechange"],"fn-")}function o(t,e){return e}function i(t,e){for(var n in t)e[n]=t[n];return e}var a=t("ee").create(),s=t(1),c=t(2),f=c(a),u=c(s),d=window.XMLHttpRequest,p=["onload","onerror","onabort","onloadstart","onloadend","onprogress","ontimeout"];e.exports=a,window.XMLHttpRequest=function(t){var e=new d(t);try{a.emit("new-xhr",[],e),u.inPlace(e,["addEventListener","removeEventListener"],"-",o),e.addEventListener("readystatechange",n,!1)}catch(r){try{a.emit("internal-error",[r])}catch(i){}}return e},i(d,XMLHttpRequest),XMLHttpRequest.prototype=d.prototype,f.inPlace(XMLHttpRequest.prototype,["open","send"],"-xhr-",o),a.on("send-xhr-start",r),a.on("open-xhr-start",r)},{1:7,2:25,ee:"QJf3ax"}],12:[function(t){function e(t){var e=this.params,r=this.metrics;if(!this.ended){this.ended=!0;for(var i=0;c>i;i++)t.removeEventListener(s[i],this.listener,!1);if(!e.aborted){if(r.duration=(new Date).getTime()-this.startTime,4===t.readyState){e.status=t.status;var a=t.responseType,f="arraybuffer"===a||"blob"===a||"json"===a?t.response:t.responseText,u=n(f);if(u&&(r.rxSize=u),this.sameOrigin){var d=t.getResponseHeader("X-NewRelic-App-Data");d&&(e.cat=d.split(", ").pop())}}else e.status=0;r.cbTime=this.cbTime,o("xhr",[e,r,this.startTime])}}}function n(t){if("string"==typeof t&&t.length)return t.length;if("object"!=typeof t)return void 0;if("undefined"!=typeof ArrayBuffer&&t instanceof ArrayBuffer&&t.byteLength)return t.byteLength;if("undefined"!=typeof Blob&&t instanceof Blob&&t.size)return t.size;if("undefined"!=typeof FormData&&t instanceof FormData)return void 0;try{return JSON.stringify(t).length}catch(e){return void 0}}function r(t,e){var n=i(e),r=t.params;r.host=n.hostname+":"+n.port,r.pathname=n.pathname,t.sameOrigin=n.sameOrigin}if(window.XMLHttpRequest&&XMLHttpRequest.prototype&&XMLHttpRequest.prototype.addEventListener&&!/CriOS/.test(navigator.userAgent)){t("loader").features.xhr=!0;var o=t("handle"),i=t(2),a=t("ee"),s=["load","error","abort","timeout"],c=s.length,f=t(1);t(4),t(3),a.on("new-xhr",function(){this.totalCbs=0,this.called=0,this.cbTime=0,this.end=e,this.ended=!1,this.xhrGuids={}}),a.on("open-xhr-start",function(t){this.params={method:t[0]},r(this,t[1]),this.metrics={}}),a.on("open-xhr-end",function(t,e){"loader_config"in NREUM&&"xpid"in NREUM.loader_config&&this.sameOrigin&&e.setRequestHeader("X-NewRelic-ID",NREUM.loader_config.xpid)}),a.on("send-xhr-start",function(t,e){var r=this.metrics,o=t[0],i=this;if(r&&o){var f=n(o);f&&(r.txSize=f)}this.startTime=(new Date).getTime(),this.listener=function(t){try{"abort"===t.type&&(i.params.aborted=!0),("load"!==t.type||i.called===i.totalCbs&&(i.onloadCalled||"function"!=typeof e.onload))&&i.end(e)}catch(n){try{a.emit("internal-error",[n])}catch(r){}}};for(var u=0;c>u;u++)e.addEventListener(s[u],this.listener,!1)}),a.on("xhr-cb-time",function(t,e,n){this.cbTime+=t,e?this.onloadCalled=!0:this.called+=1,this.called!==this.totalCbs||!this.onloadCalled&&"function"==typeof n.onload||this.end(n)}),a.on("xhr-load-added",function(t,e){var n=""+f(t)+!!e;this.xhrGuids&&!this.xhrGuids[n]&&(this.xhrGuids[n]=!0,this.totalCbs+=1)}),a.on("xhr-load-removed",function(t,e){var n=""+f(t)+!!e;this.xhrGuids&&this.xhrGuids[n]&&(delete this.xhrGuids[n],this.totalCbs-=1)}),a.on("addEventListener-end",function(t,e){e instanceof XMLHttpRequest&&"load"===t[0]&&a.emit("xhr-load-added",[t[1],t[2]],e)}),a.on("removeEventListener-end",function(t,e){e instanceof XMLHttpRequest&&"load"===t[0]&&a.emit("xhr-load-removed",[t[1],t[2]],e)}),a.on("fn-start",function(t,e,n){e instanceof XMLHttpRequest&&("onload"===n&&(this.onload=!0),("load"===(t[0]&&t[0].type)||this.onload)&&(this.xhrCbStart=(new Date).getTime()))}),a.on("fn-end",function(t,e){this.xhrCbStart&&a.emit("xhr-cb-time",[(new Date).getTime()-this.xhrCbStart,this.onload,e],e)})}},{1:"XL7HBI",2:13,3:11,4:7,ee:"QJf3ax",handle:"D5DuLP",loader:"G9z0Bl"}],13:[function(t,e){e.exports=function(t){var e=document.createElement("a"),n=window.location,r={};e.href=t,r.port=e.port;var o=e.href.split("://");return!r.port&&o[1]&&(r.port=o[1].split("/")[0].split("@").pop().split(":")[1]),r.port&&"0"!==r.port||(r.port="https"===o[0]?"443":"80"),r.hostname=e.hostname||n.hostname,r.pathname=e.pathname,r.protocol=o[0],"/"!==r.pathname.charAt(0)&&(r.pathname="/"+r.pathname),r.sameOrigin=!e.hostname||e.hostname===document.domain&&e.port===n.port&&e.protocol===n.protocol,r}},{}],14:[function(t,e){function n(t){return function(){r(t,[(new Date).getTime()].concat(i(arguments)))}}var r=t("handle"),o=t(1),i=t(2);"undefined"==typeof window.newrelic&&(newrelic=window.NREUM);var a=["setPageViewName","addPageAction","setCustomAttribute","finished","addToTrace","inlineHit","noticeError"];o(a,function(t,e){window.NREUM[e]=n("api-"+e)}),e.exports=window.NREUM},{1:23,2:24,handle:"D5DuLP"}],gos:[function(t,e){e.exports=t("7eSDFh")},{}],"7eSDFh":[function(t,e){function n(t,e,n){if(r.call(t,e))return t[e];var o=n();if(Object.defineProperty&&Object.keys)try{return Object.defineProperty(t,e,{value:o,writable:!0,enumerable:!1}),o}catch(i){}return t[e]=o,o}var r=Object.prototype.hasOwnProperty;e.exports=n},{}],D5DuLP:[function(t,e){function n(t,e,n){return r.listeners(t).length?r.emit(t,e,n):void(r.q&&(r.q[t]||(r.q[t]=[]),r.q[t].push(e)))}var r=t("ee").create();e.exports=n,n.ee=r,r.q={}},{ee:"QJf3ax"}],handle:[function(t,e){e.exports=t("D5DuLP")},{}],XL7HBI:[function(t,e){function n(t){var e=typeof t;return!t||"object"!==e&&"function"!==e?-1:t===window?0:i(t,o,function(){return r++})}var r=1,o="nr@id",i=t("gos");e.exports=n},{gos:"7eSDFh"}],id:[function(t,e){e.exports=t("XL7HBI")},{}],G9z0Bl:[function(t,e){function n(){var t=p.info=NREUM.info,e=f.getElementsByTagName("script")[0];if(t&&t.licenseKey&&t.applicationID&&e){s(d,function(e,n){e in t||(t[e]=n)});var n="https"===u.split(":")[0]||t.sslForHttp;p.proto=n?"https://":"http://",a("mark",["onload",i()]);var r=f.createElement("script");r.src=p.proto+t.agent,e.parentNode.insertBefore(r,e)}}function r(){"complete"===f.readyState&&o()}function o(){a("mark",["domContent",i()])}function i(){return(new Date).getTime()}var a=t("handle"),s=t(1),c=window,f=c.document;t(2);var u=(""+location).split("?")[0],d={beacon:"bam.nr-data.net",errorBeacon:"bam.nr-data.net",agent:"js-agent.newrelic.com/nr-686.min.js"},p=e.exports={offset:i(),origin:u,features:{}};f.addEventListener?(f.addEventListener("DOMContentLoaded",o,!1),c.addEventListener("load",n,!1)):(f.attachEvent("onreadystatechange",r),c.attachEvent("onload",n)),a("mark",["firstbyte",i()])},{1:23,2:14,handle:"D5DuLP"}],loader:[function(t,e){e.exports=t("G9z0Bl")},{}],23:[function(t,e){function n(t,e){var n=[],o="",i=0;for(o in t)r.call(t,o)&&(n[i]=e(o,t[o]),i+=1);return n}var r=Object.prototype.hasOwnProperty;e.exports=n},{}],24:[function(t,e){function n(t,e,n){e||(e=0),"undefined"==typeof n&&(n=t?t.length:0);for(var r=-1,o=n-e||0,i=Array(0>o?0:o);++r<o;)i[r]=t[e+r];return i}e.exports=n},{}],25:[function(t,e){function n(t){return!(t&&"function"==typeof t&&t.apply&&!t[i])}var r=t("ee"),o=t(1),i="nr@wrapper",a=Object.prototype.hasOwnProperty;e.exports=function(t){function e(t,e,r,a){function nrWrapper(){var n,i,s,f;try{i=this,n=o(arguments),s=r&&r(n,i)||{}}catch(d){u([d,"",[n,i,a],s])}c(e+"start",[n,i,a],s);try{return f=t.apply(i,n)}catch(p){throw c(e+"err",[n,i,p],s),p}finally{c(e+"end",[n,i,f],s)}}return n(t)?t:(e||(e=""),nrWrapper[i]=!0,f(t,nrWrapper),nrWrapper)}function s(t,r,o,i){o||(o="");var a,s,c,f="-"===o.charAt(0);for(c=0;c<r.length;c++)s=r[c],a=t[s],n(a)||(t[s]=e(a,f?s+o:o,i,s))}function c(e,n,r){try{t.emit(e,n,r)}catch(o){u([o,e,n,r])}}function f(t,e){if(Object.defineProperty&&Object.keys)try{var n=Object.keys(t);return n.forEach(function(n){Object.defineProperty(e,n,{get:function(){return t[n]},set:function(e){return t[n]=e,e}})}),e}catch(r){u([r])}for(var o in t)a.call(t,o)&&(e[o]=t[o]);return e}function u(e){try{t.emit("internal-error",e)}catch(n){}}return t||(t=r),e.inPlace=s,e.flag=i,e}},{1:24,ee:"QJf3ax"}]},{},["G9z0Bl",4,12,6,5]);</script>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <meta name="google-site-verification" content="bLXTXkzm4dJ8hcJy1LXawtxXxGP3JhInARj69uCiMiM" />
    <meta http-equiv="Set-Cookie" content="section=News; expires=Sun, 04 Sep 2016 15:06:59 GMT; path=/">
    <meta http-equiv="Set-Cookie" content="sectionPath=/; expires=Sun, 04 Sep 2016 15:06:59 GMT; path=/">
    <meta http-equiv="Set-Cookie" content="sectionInfo=; expires=Sun, 04 Sep 2016 15:06:59 GMT; path=/">
    <meta http-equiv="Set-Cookie" content="sectionIndex=; expires=Sun, 04 Sep 2016 15:06:59 GMT; path=/">
    
    <link href="js/nvd3-master/build/nv.d3.css" rel="stylesheet" type="text/css">
    <link rel="canonical" href="http://www.startribune.com/"/>
    <link rel="shortcut icon" href="http://stmedia.startribune.com/designimages/favicon.ico" type="image/x-icon"/>
    <link rel="apple-touch-icon" href="http://stmedia.startribune.com/designimages/apple-touch-icon.png"/>
    <link rel="stylesheet" href="http://m.startribune.com/packages/star-tribune/www-startribune-com/css/main.css?d=1441050022"/>
    <link rel="stylesheet" href="http://assets.startribune.com/static/css/screen.css?d=1441910795">
    <link rel="stylesheet" href="http://apps.startribune.com/news/dataviz-css-master/startribune_dataviz_styles.css" /> 

<!-- CUSTOM STYLE TWEAKS -->
    <style>
      .native-ad { display:none !important; }
      #js-navigation-menu { display:block !important; }
      .one-half { display:inline-block !important; float:left; }
      #testDiv { height:400px; background-color:#ddd; width:85%; float:right; }

    #navigate { display:none; width:190px; padding:2px; text-align:center; background:white; float:left; margin-top:18px; background:transparent; }
    #navigate h2 { font-size:1.2em; font-family:"Whitman Display"; }
    .f-nav{ position:fixed; top:21px;  }
    .myButton2 { background-color: #ddd; border: 0; border-radius: 0; color: #000; cursor: pointer; display:inline-block; font-family: "Benton Sans",Helvetica,Arial,sans-serif; font-size: 16px; font-weight: 900; moz-border-radius:0; padding:5px; text-decoration: none; webkit-border-radius:0; width:15%; margin:1px;}
    .myButton2:hover { background-color: #333 !important; color:#fff; }
    .myButton2:active { background-color: #333; }
    button:focus { outline: 0 !important; }
    .selected { background-color:#333; color:#fff; }
    .background { fill:#fff !important; background-color:#fff !important; }

    #right_bar { width:100%; float:right; }
    #wrapper { width:85%; padding:5px; float:right; }

    .trackerModule { width:100%; padding:20px; }
    .moduleHead h1 { font-size:2em; font-family:"Whitman Display"; }
    .moduleHead h1:after { content:""; display:block; margin-top:6px; margin-bottom:10px; width:100px; height:7px; background:#61bd1a; }
    .contentField { width:100%; height:auto; background:#fff; }

    #search-criteria { margin:0; width:100%; height:30px; line-height:120%; font-size: 1em; -webkit-appearance: none;
    -webkit-border-radius:0; border-radius:0; box-shadow: inset 0 1px 2px rgba(0,0,0,0.1); color: rgba(0,0,0,0.75);   -webkit-transition: all 0.30s ease-in-out; -moz-transition: all 0.30s ease-in-out; -ms-transition: all 0.30s ease-in-out; -o-transition: all 0.30s ease-in-out; background-color: #fff !important; font-family: inherit; border: 1px solid #ddd !important; }
    input:focus {outline:0 !important;}
    #search-criteria:focus { box-shadow: 0 0 5px #61bd1a; padding: 3px 0px 3px 3px; border: 1px solid #61bd1a; }
    td { padding: 8.88px !important; font-family:Arial; font-size:10px !important; }
    
    .legend { float:right; width:50%; text-align:right; }
    .buttons { float:left; width:50%; }
    #overview, #polls, #finance, #coverage { display:none !important; }
    .buttons, .legend { height:45px; }
    .nerdbox { height:150px; }
    </style>

  <style type="text/css"> 
/*page template styles*/
    .specialContentWrapper{ width:100% !important; }
    .l-container { text-align:left !important; width:970px; margin-left:auto; margin-right:auto; }
    .nav-section-mod.col-2 li { text-align:center !important; }
    .nav-shortcuts-inner { text-align:center !important; }
    .l-container:nth-child(2) { width:100%; }
    .l-navigation-shortnav-container { width:100%; min-width:100%; }
    .l-section-right { display:none; }
    .l-section-inner { width:95%; border-right:0;}
    .l-footer-inner, .l-section-container { width:90% !important; }
    .nav-branding-mod, .nav-shortcuts-mod { width:100% !important;  }
    .nav-utility-mod {  width: 100%; margin: 0 auto; max-width: 100% !important; min-width: 100% !important; }
    #zone-none-block-1-leaderboard iframe { width:100% !important; }
    #zone-none-block-1-leaderboard, #zone-none-block-3-leaderboard { display: none !important; }
    #zone-none-block-3-leaderboard div iframe { width:100% !important; }
    .navbar-fixed-top { display:none !important; }
    .site-footer { display:none !important; }
    .nav-menu .menu-left, .nav-menu .menu-right { visibility:hidden !important; display:none !important; }
    .l-section-inner { padding-right: 0; width:100%; } 
    a { color: #333; text-decoration: none; }
    a:hover { text-decoration:none !important; color:inherit !important; }
    .article-share { position:relative !important; float:left !important; margin-left:0 !important; }
    .fyre .fyre-comment-head .fyre-comment-username { cursor: default !important; font-size: 12px !important; line-height: 25px !important; text-decoration: none !important; color: #000 !important; }
    .fyre-post-button { border-radius:0 !important; }
    .fyre { background-color:#fff !important; }
    .fyre .fyre-comment-article .fyre-comment-wrapper section p, .fyre .fyre-comment-stream .fyre-comment-wrapper section p { font-size:1em !important; }
    .fyre .fyre-comment-article .fyre-comment-head {  margin-top:0 !important; }
    .fyre .fyre-auth { margin:0px 0 0 0 !important; }
    .fyre .fyre-auth .fyre-login-bar, .fyre .fyre-auth .fyre-user-loggedout { color:#61bf1a !important; text-decoration:none !important; }
     #mobileMenu { display:none !important; }

    @media only screen and (min-width:650px) {
      .git:hover { background-color:#378f00 !important; }
      .sort-link-mid:hover, .sort-link:hover { background-color:#eee !important; cursor:pointer; }
    }

    @media (max-width: 970px) {
      .l-container { text-align:left !important; width:100% !important; margin:0; }
      .footer-navigation-mod { display:block !important; margin-top:30px; }
    }

    @media (max-width: 933px) {
      #mobileMenu { display:block !important; }
      #articleHeader {margin-top:40px;}
      .nav-shortcuts-inner { display:none !important; }
      .nav-utility-btn:before { width:30px; height:30px; }
      .nav-utility-mod { height:50px; }
      .nav-utility-inner-right { float: right !important;  width:auto !important}
      .nav-utility-inner-center { float:right !important; text-align: right; width:auto !important; margin-top:10px !important; }
      .nav-utility-mod { width:100% !important; min-width:auto !important; max-width:auto!important; float:left !important; border-bottom: 1px solid #000; }
      .nav-branding-mod {/* margin-top:0 !important;*/ display:none !important; }
      .nav-utility-inner { width:auto; }
      .nav-utility-inner .btn-subscribe { display:none !important; }
      .btn-eedition { display:none !important; }
      .js-nav-subscriptions-dropdown { display:none !important; }
      .dpp, .navigation-shortnav-ad { display:none !important; }
      .show-divider { border-left:0 !important; }
      .nav-logo-link { height: 38px !important; width: 260px !important; }
      .nav-utility-btn.show-divider:after { display:none; }
      #wrapper { padding:0; }
      /*.nav-utility-btn { text-indent:-5000px; }
      .nav-utility-btn::before { text-indent:2px; }*/
      .nav-weather-mod, .nav-section-mod { margin-top:40px !important; }
      .logInBtn { display:none !important; }
      .navbar-fixed-top { display:block !important; }
      .site-footer { display:block !important; }
      .global-nav-mod { display:none !important; } 
      #specialContentWrapper { margin-top:50px !important; width:100%; }
      .l-section-container { width:100% !important; }
      .l-section-inner { padding-right: 0; width:100%; } 
      .grid, .nav-menu .menu-left { visibility:visible !important; display:block !important; }
    }
    
    @media (max-width: 740px) {
        .article-share { display:none; }
        #wrapper { width:100%; }
    }

    #chart { width:100%; height:200px; }

    #states { fill: #aaa; }
    #state-borders { fill: none; stroke: #fff; stroke-width: .5px; stroke-linejoin: round; stroke-linecap: round; pointer-events: none; }
    .tooltip{ background-color:rgba(255,255,255,1); height: auto; width: auto; padding:10px; -webkit-border-radius:0; -moz-border-radius:0; border-radius:0; border: 1px solid black; font-size:13px; font-family:Arial; }
    #states .active { fill: #fff !important; fill-opacity: 1 !important; }
    .faded { fill-opacity: 0.5 !important; }
    path:hover{ fill:#378f00 !important; cursor:pointer; }
    #states .active:hover { fill:#fff !important; }
    .downloadButton:hover { background-color:#378f00 !important; }

    .mn{ fill:#44c767; pointer-events: all; } 
    .state-groups:hover{ opacity:.5 !important; cursor:pointer; }
    .state-groups text{ font-size: 9px !important; fill:#fff !important; }
    .state-groups text:hover{ cursor:pointer; pointer-events: all; }
    text { font-family: sans-serif; font-size: 9px; font-color:#fff !important; fill:#000 !important; cursor:default; }
   
    .viewer { display:inline-block; margin:5px; }
    .viewer:hover { background-color:#fff; cursor:pointer; }
    .carto, .table { display:none; }
   </style>

<!-- HEADER SCRIPTS 
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>-->

    <!-- Optimizely -->
    <script src="//cdn.optimizely.com/js/3084170745.js"></script>
    <!-- End Optimizely --> 

    <!-- START Amazon Match Buy (header) -->
    <script type='text/javascript' src='http://c.amazon-adsystem.com/aax2/amzn_ads.js'></script><script type='text/javascript'>
    try {
        amznads.getAds('3151');
    } catch(e) { /*ignore*/}
    </script>
    <!-- END Amazon Match Buy (header) -->        
   
    <script>document.domain = window.location.host.replace(/:\d+/, '').split('.')[window.location.host.replace(/:\d+/, '').split('.').length - 2] + '.' + window.location.host.replace(/:\d+/, '').split('.')[window.location.host.replace(/:\d+/, '').split('.').length - 1];</script>
    <script src="http://m.startribune.com/packages/star-tribune/www-startribune-com/js/libs/modernizr.js?d=1441050019"></script>
    <script type="text/javascript">var _sf_startpt = (new Date()).getTime()</script>
    <script>window.jQuery || document.write( '<script src="http://m.startribune.com/packages/star-tribune/www-startribune-com/js/libs/jquery.min.js?d=1441050019"><\/script>' )</script>
    <script src="http://m.startribune.com/packages/star-tribune/www-startribune-com/js/libs/jquery.onAppear.min.js?d=1441050019"></script>
    
    <!-- Google DFP ad library -->
    <script type='text/javascript'>
    (function() {
    var useSSL = 'https:' == document.location.protocol;
    var src = (useSSL ? 'https:' : 'http:') +
    '//www.googletagservices.com/tag/js/gpt_mobile.js';
    document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
    })();
    </script>

    <!-- START Amazon Match Buy (targeting) -->
    <script type='text/javascript'>
    var key = 'amznslots';
    if (typeof amznads !== 'undefined') { var values = amznads.getTokens(); }  
    </script>
    <script type='text/javascript'>
    try { amznads.setTargetingForGPTAsync('amznslots'); } catch(e) { /*ignore*/}
    </script>
    <!-- END Amazon Match Buy (targeting) -->    
    
                
    <!-- BEGIN Krux Control Tag -->
    <script class="kxct" data-id="JmCjGa6h" data-timing="async" data-version="1.9" type="text/javascript">
      window.Krux||((Krux=function(){Krux.q.push(arguments)}).q=[]);
      (function(){
        var k=document.createElement('script');k.type='text/javascript';k.async=true;
        var m,src=(m=location.href.match(/\bkxsrc=([^&]+)/))&&decodeURIComponent(m[1]);
        k.src = /^https?:\/\/([a-z0-9_\-\.]+\.)?krxd\.net(:\d{1,5})?\//i.test(src) ? src : src === "disable" ? "" :
          (location.protocol==="https:"?"https:":"http:")+"//cdn.krxd.net/controltag?confid=JmCjGa6h";
        var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(k,s);
      }());
    </script>
    <!-- END Krux control tag -->

    <!-- BEGIN Krux interchange tag -->
    <script>
    window.Krux||((Krux=function(){Krux.q.push(arguments);}).q=[]);
    (function(){
      function retrieve(n){
        var m, k='kx'+n;
        if (window.localStorage) {
            return window.localStorage[k] || "";
        } else if (navigator.cookieEnabled) {
            m = document.cookie.match(k+'=([^;]*)');
            return (m && unescape(m[1])) || "";
        } else {
            return '';
        }
      }
      Krux.user = retrieve('user');
    })();
    </script>
    <!-- END Krux interchange tag -->

    <script type="text/javascript">
    var gptadslots = [];
    googletag.cmd.push( function() { gptadslots[0] = googletag.defineSlot('/7932/mobile/mob_startribune.com/mob_homepage', [[162,30]],'div-gpt-ad-localAdsPageLink').setTargeting('pos', '1').addService(googletag.pubads()); });
    </script>

    <script type="text/javascript">
        var dartSlotString = '/7932/mobile/mob_startribune.com/mob_homepage';
        var adType = 'home';

        if ( jQuery( window ).width() <= 320 && jQuery( window ).height() <= 459 ) {
            var instreamAdSizes = [ [ 1, 3 ], [ 234, 60 ], [ 320, 50 ] ];
        }
        else {
            var instreamAdSizes = [ [ 1, 3 ], [ 234, 60 ], [ 320, 50 ], [ 300, 250 ] ];
        }
        googletag.cmd.push( function () {
            googletag.pubads().disableInitialLoad();
            googletag.pubads().enableAsyncRendering();
            googletag.pubads().collapseEmptyDivs( true );
            googletag.enableServices();
        } );
    </script>
      
    <!-- Grunticon script -->
    <script>
        window.grunticon = function ( e ) {
            if ( e && 3 === e.length ) {
                var t = window, n = !!t.document.createElementNS && !!t.document.createElementNS( "http://www.w3.org/2000/svg", "svg" ).createSVGRect && !!document.implementation.hasFeature( "http://www.w3.org/TR/SVG11/feature#Image", "1.1" ), A = function ( A ) {
                    var o = t.document.createElement( "link" ), r = t.document.getElementsByTagName( "script" )[ 0 ];
                    o.rel = "stylesheet", o.href = e[ A && n ? 0 : A ? 1 : 2 ], r.parentNode.insertBefore( o, r )
                }, o = new t.Image;
                o.onerror = function () {
                    A( !1 )
                }, o.onload = function () {
                    A( 1 === o.width && 1 === o.height )
                }, o.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
            }
        };
        grunticon( [ "http://m.startribune.com/packages/star-tribune/www-startribune-com/css/icons.data.svg.css?d=1441049953", "http://m.startribune.com/packages/star-tribune/www-startribune-com/css/icons.data.png.css?d=1441049953", "http://m.startribune.com/packages/star-tribune/www-startribune-com/css/icons.fallback.css?d=1441049953" ] );</script>
    <noscript>
        <link href="http://m.startribune.com/packages/star-tribune/www-startribune-com/css/icons.fallback.css?d=1441049953" rel="stylesheet">
    </noscript>
    <!-- End Grunticon script -->

    <script>
      var domain = "http\x3A\x2F\x2Fm.startribune.com";
      var zipCode = 55488;
      var articleId = '324180431';
    </script>
 
    <script src="http://m.startribune.com/packages/star-tribune/www-startribune-com/js/libs/AppMeasurement.js?d=1441050019" type="text/javascript"></script>

    <script>
        dataLayer = [];
        dataLayer.push( { 'login2': '' } );
        dataLayer.push( { 'contentType': 'section\x20front' } );
        dataLayer.push( { 'pageName': 'm.startribune.com\x20Front' } );
        dataLayer.push( { 'ch': 'mobile\x20homepage' } );
        dataLayer.push( { 'subsection': 'StarTribune.com' } );
    </script>
<!-- </head>
<body> -->
<header class="site-header navbar navbar-default navbar-fixed-top sb-slide">
  <div class="nav-btn-left icon-button icon-nav-button"></div>
  <div class="nav-btn-right icon-button icon-nav-user"></div>
  <a id="header-logo" class="icon-startribune-logo" href="http://m.startribune.com"></a>
</header> 

<div id="specialContentWrapper">
<!-- mark me bro -->

<div id="wrapper">

<div id="right_bar">

<button id="presidentialB" rel="presidential" class="myButton2">President</button>
<button id="mnhouseB" rel="mnhouse" class="myButton2">MN House</button>
<button id="mnsenateB" rel="mnsenate" class="myButton2">MN Senate</button>
<button id="houseB" rel="house" class="myButton2">U.S. House</button>
<button id="senateB" rel="senate" class="myButton2">U.S. Senate</button>
<button id="governorsB" rel="governors" class="myButton2">Governors</button>

<input type="text" id="search-criteria" placeholder="Search" />

<div class="trackerModule" id="overview">
<div class="moduleHead"><h1>Elections Overview</h1></div>

<div class="contentField"></div>

<!--close overview-->
</div>

<div class="trackerModule" id="polls">
<div class="moduleHead"><h1>Reader Polling</h1></div>

<div class="contentField">
  
</div>

<!--close polls-->
</div>

<div class="trackerModule" id="finance">
<div class="moduleHead"><h1>Campaign Finance Analysis</h1></div>

<div class="contentField">
  <div id="finance_charts" class="map"><svg width="100%" height="400" viewBox="0 0 650 400" preserveAspectRatio="xMidYMid"></svg></div>

  <div id="finance_menu" class="buttons">
  <div class="viewer" rel="map">Map</div><div class="viewer" rel="carto">Carto</div><div class="viewer" rel="table">Table</div></div>
  <div id="finance_legend" class="legend">Legend</div>

  <div id="finance_box" class="nerdbox">Nerdbox</div>
</div>

</div>

<div class="trackerModule" id="coverage">
<div class="moduleHead"><h1>Recent Coverage</h1></div>

<div class="contentField"></div>

<!--close finance-->
</div>

<div class="trackerModule" id="presidential">
<div class="moduleHead"><h1>Presidential Race</h1></div>

<div class="contentField">
  <div class="viewer" rel="map">Map</div><div class="viewer" rel="carto">Carto</div><div class="viewer" rel="table">Table</div></div>

  <div id="presidential_map" class="map"><svg width="100%" height="400" viewBox="0 0 650 400" preserveAspectRatio="xMidYMid"></svg></div>
  <div id="presidential_carto" class="carto"><svg width="100%" height="400" viewBox="0 0 650 400" preserveAspectRatio="xMidYMid"></svg></div>
  <div id="presidential_table" class="table"></div>

  <div id="presidential_menu" class="buttons">
  <div id="presidential_legend" class="legend">Legend</div>

  <div id="presidential_box" class="nerdbox">Nerdbox</div>
</div>

<!--close presidential-->
</div>

<div class="trackerModule" id="mnhouse">
<div class="moduleHead"><h1>Minnesota House Races</h1></div>

<div class="contentField">
  <div class="viewer" rel="map">Map</div><div class="viewer" rel="carto">Carto</div><div class="viewer" rel="table">Table</div></div>

  <div id="mnhouse_map" class="map"><svg width="100%" height="400" viewBox="0 0 650 400" preserveAspectRatio="xMidYMid"></svg></div>
  <div id="mnhouse_carto" class="carto"><svg width="100%" height="400" viewBox="0 0 650 400" preserveAspectRatio="xMidYMid"></svg></div>
  <div id="mnhouse_carto2" class="map"><svg width="100%" height="400" viewBox="0 0 650 400" preserveAspectRatio="xMidYMid"></svg></div>
  <div id="mnhouse_table" class="table"></div>

  <div id="mnhouse_menu" class="buttons">
  <div id="mnhouse_legend" class="legend">Legend</div>

  <div id="mnhouse_box" class="nerdbox">Nerdbox</div>
</div>

<!--close mnhouse-->
</div>

<div class="trackerModule" id="mnsenate">
<div class="moduleHead"><h1>Minnesota Senate Races</h1></div>

<div class="contentField">
  <div class="viewer" rel="map">Map</div><div class="viewer" rel="carto">Carto</div><div class="viewer" rel="table">Table</div></div>

  <div id="mnsenate_map" class="map"><svg width="100%" height="400" viewBox="0 0 650 400" preserveAspectRatio="xMidYMid"></svg></div>
  <div id="mnsenate_carto" class="carto"><svg width="100%" height="400" viewBox="0 0 650 400" preserveAspectRatio="xMidYMid"></svg></div>
  <div id="mnsenate_carto2" class="map"><svg width="100%" height="400" viewBox="0 0 650 400" preserveAspectRatio="xMidYMid"></svg></div>
  <div id="mnsenate_table" class="table"></div>

  <div id="mnsenate_menu" class="buttons">
  <div id="mnsenate_legend" class="legend">Legend</div>

  <div id="mnsenate_box" class="nerdbox">Nerdbox</div>
</div>

<!--close mnsenate-->
</div>

<div class="trackerModule" id="house">
<div class="moduleHead"><h1>U.S. House Races</h1></div>

<div class="contentField">
  <div class="viewer" rel="map">Map</div><div class="viewer" rel="carto">Carto</div><div class="viewer" rel="table">Table</div></div>

  <div id="house_map" class="map"><svg width="100%" height="400" viewBox="0 0 650 400" preserveAspectRatio="xMidYMid"></svg></div>
  <div id="house_carto" class="carto"><svg width="100%" height="400" viewBox="0 0 650 400" preserveAspectRatio="xMidYMid"></svg></div>
  <div id="house_table" class="table"></div>

  <div id="house_menu" class="buttons">
  <div id="house_legend" class="legend">Legend</div>

  <div id="house_box" class="nerdbox">Nerdbox</div>
</div>

<!--close house-->
</div>

<div class="trackerModule" id="senate">
<div class="moduleHead"><h1>U.S. Senate Races</h1></div>

<div class="contentField">
  <div class="viewer" rel="map">Map</div><div class="viewer" rel="carto">Carto</div><div class="viewer" rel="table">Table</div></div>

  <div id="senate_map" class="map"><svg width="100%" height="400" viewBox="0 0 650 400" preserveAspectRatio="xMidYMid"></svg></div>
  <div id="senate_carto" class="carto"><svg width="100%" height="400" viewBox="0 0 650 400" preserveAspectRatio="xMidYMid"></svg></div>
  <div id="senate_table" class="table"></div>

  <div id="senate_menu" class="buttons">
  <div id="senate_legend" class="legend">Legend</div>

  <div id="senate_box" class="nerdbox">Nerdbox</div>
</div>

<!--close senate-->
</div>

<div class="trackerModule" id="governors">
<div class="moduleHead"><h1>State Governor Races</h1></div>

<div class="contentField">
  <div class="viewer" rel="map">Map</div><div class="viewer" rel="carto">Carto</div><div class="viewer" rel="table">Table</div></div>

  <div id="governors_map" class="map"><svg width="100%" height="400" viewBox="0 0 650 400" preserveAspectRatio="xMidYMid"></svg></div>
  <div id="governors_carto" class="carto"><svg width="100%" height="400" viewBox="0 0 650 400" preserveAspectRatio="xMidYMid"></svg></div>
  <div id="governors_table" class="table"><svg width="100%" height="400" viewBox="0 0 650 400" preserveAspectRatio="xMidYMid"></svg></div>

  <div id="governors_menu" class="buttons">
  <div id="governors_legend" class="legend">Legend</div>

  <div id="governors_box" class="nerdbox">Nerdbox</div>
</div>

<!--close governors-->
</div>

<div id="chart"><svg></svg></div>

<a href='javascript:void(0);' class='zoom'>Reset View</a>
<!--close right_bar-->
</div>

<!--close wrapper-->
</div>

</div>
<!--close specialContentWrapper-->


<!-- SHARE BUTTONS -->

<aside class="article-share">
<!--   <div class="share__textsize">
    <a id="js-textsize-btn" data-linkname="Text size" data-linktype="text-resize" data-modulename="Article" data-moduletype="zone1-content" data-position="0-1-share">
      <div class="share-icon"></div>
      <div class="share-label">
        <span>Text size</span>
      </div>
    </a>
      </div> -->
  
  <div class="share__comments clickQS">
      <a href="#comments" data-linkname="Comment on this story" data-linktype="share-comment" data-modulename="Article" data-moduletype="zone1-content" data-position="0-2-share">
        <div class="share-icon"></div>
        <div class="share-label">
          <span class="share-txt">comment</span><span class="share-count">0</span>
        </div>
      </a>
            </div>
      
  <div class="share__facebook clickQS">
      <a class="st-share-link" data-st-share-count-selector=".share-count-facebook" data-st-share-service="facebook" data-st-share-url="<? echo $shareURL; ?>" target="_blank" data-linkname="Share on Facebook" data-linktype="share-facebook" data-modulename="Article" data-moduletype="zone1-content" data-position="0-2-share" href="https://www.facebook.com/sharer/sharer.php?u=<?php echo $shareURL; ?>">
      <div class="share-icon"></div>
      <div class="share-label">
        <span class="share-txt">share</span><span class="share-count-facebook">0</span>
      </div>
    </a>
      </div>
  <div class="share__twitter clickQS">
      <a class="st-share-link" data-st-share-count-selector=".share-count-twitter" data-st-share-image="<? echo $shareImage; ?>" data-st-share-service="twitter" data-st-share-url="<? echo $shareURL; ?>" data-st-count-url="<? echo $shareURL; ?>" target="_blank" data-linkname="Share on Twitter" data-linktype="share-twitter" data-modulename="Article" data-moduletype="zone1-content" data-position="0-3-share" href="<? echo $shareURL; ?>">
      <div class="share-icon"></div>
      <div class="share-label">
        <span class="share-txt">tweet</span><span class="share-count-twitter">0</span>
      </div>
    </a>
      </div>
  
      <div class="share__email clickQS">
      <a href="http://scripts.startribune.com/email_article/?section=%2F<?php echo $shareSection; ?>&amp;story_id=<?php echo $clickabilityID; ?>&amp;headline=<?php echo $shareTitle; ?>"id="js-email-share-btn" data-id="<? echo $clickabilityID; ?>" data-linkname="Email" data-linktype="share-email" data-modulename="Article" data-moduletype="zone1-content" data-position="0-4-share">
        <div class="share-icon"></div>
        <div class="share-label">
          <span>email</span>
        </div>
      </a>
          </div>
    
      <div class="share__print clickQS">
      <a id="js-print-btn" data-linkname="Print" data-linktype="share-comment" data-modulename="Article" data-moduletype="zone1-content" data-position="0-4-share" href="#" onclick="window.print();return false;">
        <div class="share-icon"></div>
        <div class="share-label">
          <span>Print</span>
        </div>
      </a>
          </div>
  
      <div class="share-more">
      <div class="share-label">more</div>
      <div class="share-more-popover">
        <div class="share-more-group">
          <span class="share-more-label">Share on:</span>
          <a class="st-share-link linkedin-pw-placeholder" data-st-share-service="linkedin" data-st-share-url="<?php echo $shareURL; ?>" data-st-share-title="<?php echo $shareTitle; ?>" data-st-share-summary="<?php $shareDescription; ?>" data-st-share-source="Star Tribune" target="_blank" data-linkname="Share on LinkedIn" data-linktype="share-linkedin" data-modulename="Article" data-moduletype="zone1-content" data-position="0-4-share" href="http://www.linkedin.com/shareArticle?mini=true&amp;url=<?php echo $shareURL ?>&amp;title=<?php echo $shareTitle ?>summary=<?php echo $shareDescription; ?>&amp;source=Star+Tribune"><span class="share-more-icon share__linkedin">Share on LinkedIn</span></a>
                    <a class="st-share-link googleplus-pw-placeholder" data-st-share-service="googleplus" data-st-share-url="<?php echo $shareURL; ?>" target="_blank" data-linkname="Share on Google+" data-linktype="share-linkedin" data-modulename="Article" data-moduletype="zone1-content" data-position="0-5-share" href="https://plus.google.com/share?url=<?php echo $shareURL; ?>"><span class="share-more-icon share__googleplus">Share on Google+</span></a>
                    <a class="st-share-link pinterest-pw-placeholder" data-st-share-service="pinterest" data-st-share-image="<?php echo $shareImage; ?>" data-st-share-description="<?php echo $shareDescription; ?>" data-st-share-url="<?php echo $shareTitle; ?>" target="_blank" data-linkname="Share on Pinterest" data-linktype="share-pinterest" data-modulename="Article" data-moduletype="zone1-content" data-position="0-6-share" href="http://www.pinterest.com/pin/create/button/?url=<?php echo $shareURL; ?>&amp;media=<?php echo $shareImage; ?>&amp;description=<?php echo $shareDescription; ?>"><span class="share-more-icon share__pinterest">Share on Pinterest</span></a>
                  </div>
        <div class="share-more-group">
          <span class="share-more-label">Copy shortlink:</span>
          <input class="share-more-link-input" id="MoreShortlink" type="text" value="<?php echo $shareURL; ?>">
        </div>
        <div class="share-more-group">
          <span class="share-more-label">Purchase:</span>
                   <a href="http://reprints.ygsgroup.com/m/startribune/" target="_blank" class="share-more-tool tool__orderreprint" data-linkname="Order Reprint" data-linktype="share-reprint" data-modulename="Article" data-moduletype="zone1-content" data-position="0-7-share">Order Reprint</a>
                  </div>
      </div>
    </div>
  
</aside>

<script src="http://i.po.st/share/script/post-widget.js#publisherKey=56d2hkmk6d6lmd6llqb2" type="text/javascript"></script>

<p style="clear:both"></p>

<!-- COMMENTS -->

<section class="comments-section" id="comments">
    <script type="text/javascript">
        if (typeof commentQueryStrings === 'undefined') {
            var commentQueryStrings = {};
        }
    </script>
    
    <script type="text/javascript">
        commentQueryStrings[window.location.pathname] = JSON.parse('{"pageName":"pageName=Medtronic%20buys%20name%20rights%20to%20plaza%20in%20front%20of%20new%20stadium","channel":"channel=business","server":"server=startribune.com","prop1":"c1=D%3Dg","prop2":"c2=V20150914","prop3":"c3=story","prop5":"c5=","prop7":"c7=comments","prop16":"c16="}');
    </script>

    <div class="comments">
        <a href="#" class="js-comments-show comments-count-link">
            <div class="comments-count"></div>
            <span class="comments-show js-comments-show-txt" data-analytics-url="http://metrics.startribune.com/b/ss/nmminneapolis/1/JS-1.4.2/46900">View Comments</span>
        </a>
    </div>

    <script src='http://zor.livefyre.com/wjs/v3.0/javascripts/livefyre.js'></script>
    <script type="text/javascript">
        var networkConfig = {"network": "startribune.fyre.co"}
        networkConfig.authDelegate = new fyre.conv.RemoteAuthDelegate();

        var convConfig = {"siteId":"356396","articleId":<? echo "" + $clickabilityID + ""; ?>,"el":"livefyre","collectionMeta":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0aXRsZSI6Ik1lZHRyb25pYyBidXlzIG5hbWUgcmlnaHRzIHRvIHBsYXphIGluIGZyb250IG9mIG5ldyBWaWtpbmdzIHN0YWRpdW0iLCJ1cmwiOiJodHRwOlwvXC93d3cuc3RhcnRyaWJ1bmUuY29tXC9idXNpbmVzc1wvMzI3NDMwMzMxLmh0bWwiLCJ0YWdzIjoiXC9idXNpbmVzcyIsImNoZWNrc3VtIjoiMjk3YjIxYjg3ZTc2N2M2NDYwNWYwZmVhZDJkODU0Y2UiLCJhcnRpY2xlSWQiOiIzMjc0MzAzMzEifQ.Om6J9gsfho3unG8iLoU9tE9UPoyLfjmhgVfPriV0h20","datetimeFormat":{"minutesUntilAbsoluteTime":1,"absoluteFormat":"MMM. d, yy<br>h:mm a"}};
        var commentLoginText = "Log in/register to comment";
        var commentEmailOnly = 0;
        var commentPage = {};
        commentPage.userToken = null;
        commentPage.userAuth = false;
        commentPage.registerUsername = false;

        networkConfig.authDelegate.login = function (handlers) {
            window.location.href = 'http://' + document.domain + '/login?commentRedirect=true&path=' + encodeURIComponent( document.URL );
        };

        commentPage.onCommentCountUpdated = function (number) {
            commentCount.checkLivefyreLoaded(number);
        };

        var checkUserToken = function (cb) {
            if (jQuery.cookie('st_usr_livefyre_token')) {
                commentPage.userAuth = true;
                commentPage.userToken = jQuery.cookie('st_usr_livefyre_token');
            }
            cb();
        };

        if (jQuery.cookie('register_st_user_name')) {
            commentPage.registerUsername = true;
        }
        if (jQuery.cookie('register_st_user_name') && jQuery.cookie('st_usr_livefyre_token')) {
            jQuery.removeCookie('register_st_user_name');
            commentPage.registerUsername = false;
        }

        if (commentPage.registerUsername) {
            commentLoginText = "Please create a username for your account.";
            actionUrl = "http://users.startribune.com/";
            networkConfig.authDelegate.login = function (handlers) {
                window.location.href = 'http://users.startribune.com';
            }
        }

        var customStrings = {
            signIn: commentLoginText,
            postButton: "Post your comment",
            postReplyButton: "Post your comment",
            flagButton: "Report as inappropriate"
        };

        networkConfig["strings"] = customStrings;

        fyre.conv.load(networkConfig, [convConfig], function (sdk) {
            checkUserToken(
                    function () {
                        if (commentPage.userToken) {
                            fyre.conv.login(commentPage.userToken);
                        }
                    }
            );
            sdk.on('commentCountUpdated', commentPage.onCommentCountUpdated);
            sdk.on('initialRenderComplete', function () {
                jQuery('.fyre-comment a').contents().unwrap();
                commentCount.checkLivefyreLoaded(false, false);
            });
        });
    </script>
    <div id='livefyre-cont'>
        <div id='livefyre'>
            <div class="comment-standards-mod">
                <a href="#" class="comment-standards-btn js-show-comment-standards">Read our comment standards</a>
                <div class="comment-standards-txt">
                    <p>StarTribune.com welcomes and encourages readers to comment and engage in substantive, mutually
                        respectful exchanges over news topics. Commenters must follow our <a
                                href="http://www.startribune.com/terms/">Terms of Use</a>.</p>
                    <ol>
                        <li>Keep it civil and stay on topic.</li>
                        <li>No profanity, vulgarity, racial slurs or personal attacks.</li>
                        <li>Comments with web links are not permitted.</li>
                        <li>Comments that violate the above will be removed. Repeat violators may lose their commenting
                            privileges on StarTribune.com.
                        </li>
                    </ol>
                    <p>Comments will be reviewed before being published.</p>
                </div>
                <!--eo comment-standards-txt-->
            </div>
            <!--eo comments-standards-mod-->
                        <!--LiveFyre gets injected here-->
        </div>
        <div id="powered_by_livefyre_new"><a href="http://livefyre.com/" target="_blank">Powered by Livefyre</a></div>
        <img class="comments-image-tracking" style="height: 0px;" alt=""
             src="http://apps.startribune.com/circulars/images/blank.gif"/>
        <script type="text/javascript">
        <!--if(navigator.appVersion.indexOf('MSIE')>=0)document.write(unescape('%3C')+'\!-'+'-')//-->
        </script>
        <noscript>
                        <img src="http://metrics.startribune.com/b/ss/nmminneapolis/1/JS-1.4.2--NS/92466?pageName=Medtronic%20buys%20name%20rights%20to%20plaza%20in%20front%20of%20new%20stadium&channel=business&server=startribune.com&c1=D%3Dg&c2=V20150914&c3=story&c5=noscript&c7=comments&c16="
                 height="1" width="1" border="0" alt=""/>
            }
        </noscript>
        <!--/DO NOT REMOVE/-->
    </div>
</section>

<div id="mobileMenu">
<!-- MENUS -->
<div class="nav-menu menu-left">
<!-- Your left Slidebar content. -->
<div class="grid"><!-- Weather Module -->
<div class="grid__item one-whole">
<div class="weather-loading islet" style="display:block;"><div class="spinner"></div></div>

<div class="weather-container islet" style="display:none;">
<a href="http://m.startribune.com/weather" class="link-complex">
<div id="weather-location" class="weather-location flexbox__item five-twelfths">
<div class="milli">Currently in <strong class="weather-location-name">.</strong> <span class="link-complex__target go">More weather</span></div>
</div>
<div id="weather-info" class="weather seven-twelfths media"><div class="weather-icon weather-icon--medium media__img"></div>
<p class="weather-temp temp media__body"></p>
</div>
</a> 
</div>
</div>

<!-- Search Module -->
<div class="grid__item one-whole">
<div class="search-container">
<form method="get" action="http://m.startribune.com/search" class="search islet">
<input type="search" name="q" value="" class="search-input" placeholder="Search…">
</form>
</div>
</div>

<!-- Sections Menus Module -->
<div class="grid__item">
<div class="grid">
<nav class="sections-menu-container islet">
<h5 class="grid__item one-whole">News</h5>
<div class="grid__item one-half">
<ul class="block-list">
<li data-item="1">
<a href="http://m.startribune.com/local/" title="Local">Local</a>
</li>
<li data-item="2">
<a href="http://m.startribune.com/sports/" title="Sports">Sports</a>
</li>
<li data-item="3">
<a href="http://m.startribune.com/business/" title="Business">Business</a>
</li>
<li data-item="4">
<a href="http://m.startribune.com/opinion/" title="Opinion">Opinion</a>
</li>
<li data-item="5">
<a href="http://m.startribune.com/variety/" title="Variety">Variety</a>
</li>
<li data-item="6">
<a href="http://m.startribune.com/politics/" title="Politics">Politics</a>
</li>
</ul>
</div>
<div class="grid__item one-half">
<ul class="block-list">
<li data-item="7">
<a href="http://m.startribune.com/obituaries/" title="Obituaries">Obituaries</a>
</li>
<li data-item="8">
<a href="http://weeklyads.startribune.com/" title="Weekly Ads">Weekly Ads</a>
</li>
<li data-item="9">
<a href="http://m.Homes.Startribune.Com/" title="Homes">Homes</a>
</li>
<li data-item="10">
<a href="http://m.Homes.Startribune.Com/eng/rentals/search" title="Rentals">Rentals</a>
</li>
<li data-item="11">
<a href="http://jobs.Startribune.Com/" title="Jobs">Jobs</a>
</li>
</ul>
</div>
<h5 class="grid__item one-whole">Featured</h5>
<div class="grid__item one-half">
<ul class="block-list">
<li><a href="http://m.startribune.com/nation" title="Nation">Nation</a></li>
<li><a href="http://m.startribune.com/world" title="World">World</a></li>
<li><a href="http://m.startribune.com/science" title="Science">Science</a></li>
<li><a href="http://m.startribune.com/variety/bestofmn2015/302782981.html" title="Best of MN">Best of MN</a></li>
<li><a href="http://m.startribune.com/jobs/topworkplaces" title="Top Workplaces">Top Workplaces</a></li>
</ul>
</div>
<div class="grid__item one-half">
<ul class="block-list">
<li><a href="http://m.startribune.com/sports/twins" title="Twins">Twins</a></li>
<li><a href="http://m.startribune.com/sports/wild" title="Wild">Wild</a></li>
<li><a href="http://m.startribune.com/sports/scoreboard" title="Scoreboard">Scoreboard</a></li>
<li><a href="http://m.startribune.com/sports/vikings" title="Vikings">Vikings</a></li>
<li><a href="http://m.startribune.com/sports/wolves" title="Wolves">Wolves</a></li>
</ul>
</div>
</nav>
</div>
</div>
        
<!-- Connect Menu Module -->
<div class="grid__item one-whole">
<div class="nav-connect-container islet">
<h5>Connect</h5>
<ul class="nav nav--fit">
<li>
<a id="facebook" href="https://www.facebook.com/startribune" title="Facebook"><i class="social-icon icon-facebook-light"></i></a>
</li>
<li>
<a id="twitter" href="http://twitter.com/startribune" title="Twitter"><i class="social-icon icon-twitter-light"></i></a>
</li>
<li>
<a id="pinterest" href="http://www.pinterest.com/startribune/" title="Pinterest"><i class="social-icon icon-pinterest-light"></i></a>
</li>
<li>
<a id="googleplus" href="http://plus.google.com/+startribune/" title="Googleplus"><i class="social-icon icon-googleplus-light"></i></a>
</li>
<li>
<a id="instagram" href="http://instagram.com/startribune" title="Instagram"><i class="social-icon icon-instagram-light"></i></a>
</li>
</ul>
</div>
</div>

<!-- Additional Links Menu Module -->
<div class="grid__item one-whole">
<div class="additional-links-container islet">
<ul class="block-list">
<li><a href="http://m.startribune.com/help" title="Help Page">Help</a></li>
<li><a href="http://www.startribune.com/eedition" title="eEdition">eEdition</a></li>
<li><a href="http://apps.startribune.com/news/mobile-products/" title="Mobile and Tablet Appss">Mobile and Tablet Apps</a></li>
<li><a href="http://steals.startribune.com/" title="Daily Deals">Daily Deals</a></li>
<li><a href="http://www.startribunecompany.com" title="About the Star Tribune">About the Star
Tribune</a></li>
</ul>
</div>
</div>
<!-- Info Module -->
</div>
<!-- Close Grid -->
</div>

<div class="nav-menu menu-right">
<div class="grid">
<div class="grid__item one--whole">
<div class="islet user-state">

<!-- Your right Slidebar content. -->
<div id="signed-out">
<div>
<a href="https://m.startribune.com/signin?path=http%3A%2F%2Fm.startribune.com%2F" class="signin btn btn--primary btn--full" title="Sign In">Sign In</a>
</div>
<div class="additional-links-container">
  <ul class="block-list">
<li>
  <a href="http://www.startribune.com/subscriptionservices" class="manage" id="manage-subscription">Manage Subscription</a>
</li>
  </ul>
</div>
</div>

<div id="signed-in" style="display: none;">
<h5>Welcome, <span id="the_username"></span></h5>
<div id="user-options">
<div>
<a href="https://m.startribune.com/signout?path=http%3A%2F%2Fm.startribune.com%2F" class="signout btn btn--primary btn--full" title="Sign Out">Sign Out</a>
</div>
</div>

<div class="additional-links-container">
<ul class="block-list">
<li>
  <a href="http://www.startribune.com/subscriptionservices" class="manage" id="manage-subscription">Manage Subscription</a>
</li>
</ul>
</div>
</div>

</div>
</div>
</div>
</div>
</div>
</div>

<!-- FOOTER SCRIPTS -->
<script src="http://m.startribune.com/packages/star-tribune/www-startribune-com/js/main.min.js?d=1441050019"></script>
<script type="text/javascript">window.NREUM||(NREUM={});NREUM.info={"beacon":"bam.nr-data.net","licenseKey":"f550207221","applicationID":"7749207","transactionName":"M1JaYBQAVhVYW0cPWwoYeVcSCFcIFlVSD1o=","queueTime":0,"applicationTime":2036,"atts":"HxVZFlwaRRs=","errorBeacon":"bam.nr-data.net","agent":"js-agent.newrelic.com\/nr-686.min.js"}</script></body>

<script src='//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js'></script>
<script src="http://d3js.org/d3.v3.min.js"></script>
<!-- <script src="//code.jquery.com/jquery-1.11.1.min.js"></script> -->
<script src="js/waypoints/lib/noframework.waypoints.min.js"></script>
<script src="js/jquery.sticky.js"></script>
<script src="js/nvd3-master/build/nv.d3.js"></script>
<script src="js/nvd3-master/src/utils.js"></script>
<script src="js/nvd3-master/src/tooltip.js"></script>
<script src="js/nvd3-master/src/models/legend.js"></script>
<script src="js/nvd3-master/src/models/axis.js"></script>
<script src="js/nvd3-master/test/stream_layers.js"></script>

<script>
//LIVE JSON MAGIC

//https://script.google.com/macros/s/AKfycbwG7mX6qPZaIhkwY2AJ2lU7kNarbm6OWIkWVfnmYZGYruIl40cu/exec?id=1qNwLNcSP2D8l8iTEemF9JC4lvpKp-UogxP4htDFwFA0&sheet=president
//https://script.google.com/macros/s/AKfycbwG7mX6qPZaIhkwY2AJ2lU7kNarbm6OWIkWVfnmYZGYruIl40cu/exec?id=1qNwLNcSP2D8l8iTEemF9JC4lvpKp-UogxP4htDFwFA0&sheet=us_senate
//https://script.google.com/macros/s/AKfycbwG7mX6qPZaIhkwY2AJ2lU7kNarbm6OWIkWVfnmYZGYruIl40cu/exec?id=1qNwLNcSP2D8l8iTEemF9JC4lvpKp-UogxP4htDFwFA0&sheet=us_house
//https://script.google.com/macros/s/AKfycbwG7mX6qPZaIhkwY2AJ2lU7kNarbm6OWIkWVfnmYZGYruIl40cu/exec?id=1qNwLNcSP2D8l8iTEemF9JC4lvpKp-UogxP4htDFwFA0&sheet=mn_house
//https://script.google.com/macros/s/AKfycbwG7mX6qPZaIhkwY2AJ2lU7kNarbm6OWIkWVfnmYZGYruIl40cu/exec?id=1qNwLNcSP2D8l8iTEemF9JC4lvpKp-UogxP4htDFwFA0&sheet=mn_senate
//https://script.google.com/macros/s/AKfycbwG7mX6qPZaIhkwY2AJ2lU7kNarbm6OWIkWVfnmYZGYruIl40cu/exec?id=1qNwLNcSP2D8l8iTEemF9JC4lvpKp-UogxP4htDFwFA0&sheet=governors
<?php
$jsonDataPresident = file_get_contents("https://script.googleusercontent.com/macros/echo?user_content_key=0OatNAcRIuRHPHPp0C_1Mh6GN52URA9gfObD60v2vp7oRP5G1WwzEfGQHZNWQvYAJSl4T8mFz2OeyQQvLd4KyCLO01UT0WPMOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHaxCoMjMSmZWLp6XAShvjQj50JtCfh4yP7n1RnEoDeOH7XqmOXgX8RYIyMAhIAtjnF9UDzNXGLr6To3J9D8RNlRL0zgWNJzVDkWV4a9wKICNpTa8dfWNHYIymLIb4r3T2k2KsIDjhQ9pxvl7IGsXAM8mcEkwDuNwtPQ&lib=MVcLnEUipyThKZcpmQKyqT_CoSfd4egCX");
$jsonDataSenate = file_get_contents("https://script.googleusercontent.com/macros/echo?user_content_key=viB_TjSj2Hc7CUM0M6JDNSslkYVGdlGtlw8hjaiX943WdaqIbB3_G5CDIYp9XLwerWuMhNnHLUL18YhcOq3Tp1MkmwLgrjKeOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHaxCoMjMSmZWLp6XAShvjQj50JtCfh4yP7n1RnEoDeOH7XqmOXgX8RYIyMAhIAtjnF9UDzNXGLr6To3J9D8RNlRL0zgWNJzVDkWV4a9wKICNpTa8dfWNHYIymLIb4r3T2k2KsIDjhQ9pxUFd-GmD5L_wedkWKbkTGcg&lib=MVcLnEUipyThKZcpmQKyqT_CoSfd4egCX");
$jsonDataHouse = file_get_contents("https://script.googleusercontent.com/macros/echo?user_content_key=5L1eYqvavosDqU0fLm84BnA5yWYCHN2zMPh9A15hSFS08BZYPWt_PE4oq4iojaP4naDOp-XYHeL18YhcOq3Tp9ykatiS4Dw7OJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHaxCoMjMSmZWLp6XAShvjQj50JtCfh4yP7n1RnEoDeOH7XqmOXgX8RYIyMAhIAtjnF9UDzNXGLr6To3J9D8RNlRL0zgWNJzVDkWV4a9wKICNpTa8dfWNHYIymLIb4r3T2k2KsIDjhQ9pxUFd-GmD5L_xh2xWdXOyAIw&lib=MVcLnEUipyThKZcpmQKyqT_CoSfd4egCX");
$jsonDataMNHouse = file_get_contents("https://script.googleusercontent.com/macros/echo?user_content_key=zbs5yevN3CBBqC7pN02vlvkCj2blmmKeChe566vddDxnQzjAEPO56bBFu9psERm-dSeYHbTAjgow6T5cU3PaRRyb6fq-momFOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHaxCoMjMSmZWLp6XAShvjQj50JtCfh4yP7n1RnEoDeOH7XqmOXgX8RYIyMAhIAtjnF9UDzNXGLr6To3J9D8RNlRL0zgWNJzVDkWV4a9wKICNpTa8dfWNHYIymLIb4r3T2k2KsIDjhQ9px35iDyrfKhrq59nomqYSNlw&lib=MVcLnEUipyThKZcpmQKyqT_CoSfd4egCX");
$jsonDataMNSenate = file_get_contents("https://script.googleusercontent.com/macros/echo?user_content_key=KslB51EcemAOhBhUPWABY4ruAnzpOstRJSzYEfzLZ2Zsl3labSkiVeMB-Oia6yYzDNyIBBKFf7HGJU6fCltJSDxOeKLe2lahOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHaxCoMjMSmZWLp6XAShvjQj50JtCfh4yP7n1RnEoDeOH7XqmOXgX8RYIyMAhIAtjnF9UDzNXGLr6To3J9D8RNlRL0zgWNJzVDkWV4a9wKICNpTa8dfWNHYIymLIb4r3T2k2KsIDjhQ9px35iDyrfKhroTxpqANe6Fyw&lib=MVcLnEUipyThKZcpmQKyqT_CoSfd4egCX");
$jsonDataGovenor = file_get_contents("https://script.googleusercontent.com/macros/echo?user_content_key=Z2KLMHGu4H4s_eJgM7DtKYSuSlIoO9jotshCxhOcxKSJFncYRBJ7orDylmLvFl798nstdmp24gl2vo6kCmZX9DmD_BvcV3kROJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHaxCoMjMSmZWLp6XAShvjQj50JtCfh4yP7n1RnEoDeOH7XqmOXgX8RYIyMAhIAtjnF9UDzNXGLr6To3J9D8RNlRL0zgWNJzVDkWV4a9wKICNpTa8dfWNHYIymLIb4r3T2k2KsIDjhQ9pxbpduxq8Fudh74FwhOrKGdQ&lib=MVcLnEUipyThKZcpmQKyqT_CoSfd4egCX");
?>

var dataPresidentLoad = <?php echo $jsonDataPresident; ?>;
var dataSenateLoad = <?php echo $jsonDataSenate; ?>;
var dataHouseLoad = <?php echo $jsonDataHouse; ?>;
var dataMNHouseLoad = <?php echo $jsonDataMNHouse; ?>;
var dataMNSenateLoad = <?php echo $jsonDataMNSenate; ?>;
var dataGovenorLoad = <?php echo $jsonDataGovenor; ?>;

var dataPresident = dataPresidentLoad.president;
var dataSenate = dataSenateLoad.us_senate;
var dataHouse = dataHouseLoad.us_house;
var dataMNHouse = dataMNHouseLoad.mn_house;
var dataMNSenate = dataMNSenateLoad.mn_senate;
var dataGovenor = dataGovenorLoad.governors;

$(document).bind('DOMNodeInserted', function(event) {
 $(".agency").click(function() {
 console.log(aggregateGear($(this).text(),firearmsStuff));
  $(".agency").removeClass("selected");
  $(this).addClass("selected");
  aggregateGear($(this).text(),gear);
 });

  $('#search-criteria').keyup(function(){
    $('.agency').hide();
    $(".agency").removeClass("selected");
    var txt = $('#search-criteria').val();
    $('.agency').each(function(){
       if($(this).text().toUpperCase().indexOf(txt.toUpperCase()) != -1){
           $(this).show();
       }
    });
});
});

$(".viewer").click(function() {
  $(".map").hide();
  $(".carto").hide();
  $(".table").hide();

  $("." + $(this).attr("rel")).show();
  });

function printHouseRaces(state,district){
  if (state == null || state == ""){
  var data = dataHouse;
  var count = d3.nest()
  .key(function(d) { return d.office_id; })
  .key(function(d) { return d.candidate; })
  .entries(data);

  for (var i = 0; i < count.length; i++){
    $("#house_table").append("<div class='race'><div>" + count[i].key + "</div>");
    for (var j = 0; j < count[i].values.length; j++){
      $("#house_table").append("<div class='candidate'>" + count[i].values[j].key + "</div>");
      $("#house_table").append("<div class='party'>" + count[i].values[j].values[0].party_id + "</div>");
      $("#house_table").append("<div class='votes'>Votes: " + count[i].values[j].values[0].votes + "</div>");
      $("#house_table").append("<div class='vote_pct'>Percent: " + count[i].values[j].values[0].vote_pct + "</div>");
      $("#house_table").append("<div class='vote_total'>Total: " + count[i].values[j].values[0].total_votes + "</div>");
      $("#house_table").append("<div class='precincts'>Precincts: " + count[i].values[j].values[0].precincts_reporting + "/" + count[i].values[j].values[0].precincts_total + "</div>");

    }
    $("#house_table").append("</div>");
  }

  return count;
} else {
  var data = dataHouse;
  var count = d3.nest()
  .key(function(d) { return d.state == state && d.district == district; })
  .key(function(d) { return d.candidate; })
  .entries(data);

  return count[1].values;
}

}

function printSenateRaces(state){
  if (state == null || state == ""){
  var data = dataSenate;
  var count = d3.nest()
  .key(function(d) { return d.office_id; })
  .key(function(d) { return d.candidate; })
  .entries(data);

    for (var i = 0; i < count.length; i++){
    $("#senate_table").append("<div class='race'><div>" + count[i].key + "</div>");
    for (var j = 0; j < count[i].values.length; j++){
      $("#senate_table").append("<div class='candidate'>" + count[i].values[j].key + "</div>");
      $("#senate_table").append("<div class='party'>" + count[i].values[j].values[0].party_id + "</div>");
      $("#senate_table").append("<div class='votes'>Votes: " + count[i].values[j].values[0].votes + "</div>");
      $("#senate_table").append("<div class='vote_pct'>Percent: " + count[i].values[j].values[0].vote_pct + "</div>");
      $("#senate_table").append("<div class='vote_total'>Total: " + count[i].values[j].values[0].total_votes + "</div>");
      $("#senate_table").append("<div class='precincts'>Precincts: " + count[i].values[j].values[0].precincts_reporting + "/" + count[i].values[j].values[0].precincts_total + "</div>");

    }
    $("#senate_table").append("</div>");
  }
  return count;
} else {
  var data = dataSenate;
  var count = d3.nest()
  .key(function(d) { return d.state == state; })
  .key(function(d) { return d.candidate; })
  .entries(data);

  return count[1].values;
  }

}

function printPrezRaces(state){
  if (state == null || state == ""){
  var data = dataPresident;
  var count = d3.nest()
  .key(function(d) { return d.office_id; })
  .key(function(d) { return d.candidate; })
  .entries(data);
  console.log(count);

  for (var i = 0; i < count.length; i++){
    $("#presidential_table").append("<div class='race'><div>" + count[i].key + "</div>");
    for (var j = 0; j < count[i].values.length; j++){
      $("#presidential_table").append("<div class='candidate'>" + count[i].values[j].key + "</div>");
      $("#presidential_table").append("<div class='party'>" + count[i].values[j].values[0].party_id + "</div>");
      $("#presidential_table").append("<div class='votes'>Votes: " + count[i].values[j].values[0].votes + "</div>");
      $("#presidential_table").append("<div class='vote_pct'>Percent: " + count[i].values[j].values[0].vote_pct + "</div>");
      $("#presidential_table").append("<div class='vote_total'>Total: " + count[i].values[j].values[0].total_votes + "</div>");
      $("#presidential_table").append("<div class='precincts'>Precincts: " + count[i].values[j].values[0].precincts_reporting + "/" + count[i].values[j].values[0].precincts_total + "</div>");

    }
    $("#senate_table").append("</div>");
  }
    return count;
} else {
  var data = dataPresident;
  var count = d3.nest()
  .key(function(d) { return d.state == state; })
  .key(function(d) { return d.candidate; })
  .entries(data);
  console.log(count);
 
  return count[1].values;
}

}

function printMNHouseRaces(district){
  if (district == null || district == ""){
  var data = dataMNHouse;
  var count = d3.nest()
  .key(function(d) { return d.district; })
  .key(function(d) { return d.candidate; })
  // .rollup(function(v) { return {"party_id": v.party_id, "precincts_reporting": v.precincts_reporting, "precincts_total": v.precincts_total, "votes": v.votes, "vote_pct": v.vote_pct, "total_votes": v.total_votes } })
  .entries(data);

  for (var i = 0; i < count.length; i++){
    $("#mnhouse_table").append("<div class='race'><div>" + count[i].key + "</div>");
    for (var j = 0; j < count[i].values.length; j++){
      $("#mnhouse_table").append("<div class='candidate'>" + count[i].values[j].key + "</div>");
      $("#mnhouse_table").append("<div class='party'>" + count[i].values[j].values[0].party_id + "</div>");
      $("#mnhouse_table").append("<div class='votes'>Votes: " + count[i].values[j].values[0].votes + "</div>");
      $("#mnhouse_table").append("<div class='vote_pct'>Percent: " + count[i].values[j].values[0].vote_pct + "</div>");
      $("#mnhouse_table").append("<div class='vote_total'>Total: " + count[i].values[j].values[0].total_votes + "</div>");
      $("#mnhouse_table").append("<div class='precincts'>Precincts: " + count[i].values[j].values[0].precincts_reporting + "/" + count[i].values[j].values.precincts_total + "</div>");

    }
    $("#mnhouse_table").append("</div>");
  }

  return count;
}
  else {
  var data = dataMNHouse;
  var count = d3.nest()
  .key(function(d) { return d.district == district; })
  .key(function(d) { return d.candidate; })
  // .rollup(function(v) { return {"party_id": v.party_id, "precincts_reporting": v.precincts_reporting, "precincts_total": v.precincts_total, "votes": v.votes, "vote_pct": v.vote_pct, "total_votes": v.total_votes } })
  .entries(data);

  return count[1].values;
}

}

function printMNSenateRaces(district){
  if (district == null || district == ""){
  var data = dataMNSenate;
  var count = d3.nest()
  .key(function(d) { return d.office_id; })
  .key(function(d) { return d.candidate; })
  .entries(data);

  for (var i = 0; i < count.length; i++){
    $("#mnsenate_table").append("<div class='race'><div>" + count[i].key + "</div>");
    for (var j = 0; j < count[i].values.length; j++){
      $("#mnsenate_table").append("<div class='candidate'>" + count[i].values[j].key + "</div>");
      $("#mnsenate_table").append("<div class='party'>" + count[i].values[j].values[0].party_id + "</div>");
      $("#mnsenate_table").append("<div class='votes'>Votes: " + count[i].values[j].values[0].votes + "</div>");
      $("#mnsenate_table").append("<div class='vote_pct'>Percent: " + count[i].values[j].values[0].vote_pct + "</div>");
      $("#mnsenate_table").append("<div class='vote_total'>Total: " + count[i].values[j].values[0].total_votes + "</div>");
      $("#mnsenate_table").append("<div class='precincts'>Precincts: " + count[i].values[j].values[0].precincts_reporting + "/" + count[i].values[j].values[0].precincts_total + "</div>");

    }
    $("#mnsenate_table").append("</div>");
  }

    return count;
} else {
  var data = dataMNSenate;
  var count = d3.nest()
  .key(function(d) { return d.district == district; })
  .key(function(d) { return d.candidate; })
  .entries(data);

  return count[1].values;
}

}

function printGovRaces(state){
  if (state == null || state == ""){
  var data = dataGovenor;
  var count = d3.nest()
  .key(function(d) { return d.office_id; })
  .key(function(d) { return d.candidate; })
  .entries(data);

  for (var i = 0; i < count.length; i++){
    $("#governors_table").append("<div class='race'><div>" + count[i].key + "</div>");
    for (var j = 0; j < count[i].values.length; j++){
      $("#governors_table").append("<div class='candidate'>" + count[i].values[j].key + "</div>");
      $("#governors_table").append("<div class='party'>" + count[i].values[j].values[0].party_id + "</div>");
      $("#governors_table").append("<div class='votes'>Votes: " + count[i].values[j].values[0].votes + "</div>");
      $("#governors_table").append("<div class='vote_pct'>Percent: " + count[i].values[j].values[0].vote_pct + "</div>");
      $("#governors_table").append("<div class='vote_total'>Total: " + count[i].values[j].values[0].total_votes + "</div>");
      $("#governors_table").append("<div class='precincts'>Precincts: " + count[i].values[j].values[0].precincts_reporting + "/" + count[i].values[j].values[0].precincts_total + "</div>");

    }
    $("#governors_table").append("</div>");
  }

  return count;
} else {
  var data = dataGovenor;
  var count = d3.nest()
  .key(function(d) { return d.office_id; })
  .key(function(d) { return d.candidate; })
  .entries(data);

  return count[1].values;
}

}

console.log(printHouseRaces());
console.log(printGovRaces());
console.log(printMNSenateRaces());
console.log(printMNHouseRaces());
console.log(printPrezRaces());
console.log(printSenateRaces());
</script>

<script>
// $("#navigate").sticky({topSpacing:18});

$(".trackerModule").hide();
$("#presidential").show();

//RESPONSIVE SVG
var aspect = 650 / 400;
maps = $(".map svg");
cartos = $(".carto svg");
$(window).on("resize", function() {   
  var targetWidth = map1.parent().width();   
  maps.attr("width", targetWidth);   
  maps.attr("height", targetWidth / aspect);
  cartos.attr("width", targetWidth);   
  cartos.attr("height", targetWidth / aspect);
});

//DYNAMIC SEARCH
$( document ).ready(function() {
  $(".carto").hide();
  $(".table").hide();

 $('#search-criteria').keyup(function(){
    $('.trackerModule').hide();
    $(".sort-link").css("background-color","#fff");
    var txt = $('#search-criteria').val();
    $('.trackerModule, .moduleHead').each(function(){
       if($(this).text().toUpperCase().indexOf(txt.toUpperCase()) != -1){
           $(this).parent().show();
           $(this).show();
       }
    });
});

});


jQuery("document").ready(function($){

$("#overviewB").addClass("selected");

  $( ".myButton2" ).click(function() {
    $('.trackerModule').hide();
    $("#" + $(this).attr("rel")).show();
    $('#search-criteria').val('');
    $(".myButton2").removeClass("selected");
    $(this).addClass("selected");
  }); 

// var waypoint1 = new Waypoint({
//   element: document.getElementById('overview'),
//   handler: function(direction) {
//   $(".myButton2").removeClass("selected");
//   $("#overviewB").addClass("selected");
//   }
// })
// var waypoint2 = new Waypoint({
//   element: document.getElementById('presidential'),
//   handler: function(direction) {
//   $(".myButton2").removeClass("selected");
//   $("#presidentialB").addClass("selected");
//   }
// })
// var waypoint3 = new Waypoint({
//   element: document.getElementById('house'),
//   handler: function(direction) {
//   $(".myButton2").removeClass("selected");
//   $("#houseB").addClass("selected");
//   }
// })
// var waypoint4 = new Waypoint({
//   element: document.getElementById('senate'),
//   handler: function(direction) {
//   $(".myButton2").removeClass("selected");
//   $("#senateB").addClass("selected");
//   }
// })
// var waypoint5 = new Waypoint({
//   element: document.getElementById('governors'),
//   handler: function(direction) {
//   $(".myButton2").removeClass("selected");
//   $("#governorsB").addClass("selected");
//   }
// })
// var waypoint6 = new Waypoint({
//   element: document.getElementById('mnhouse'),
//   handler: function(direction) {
//   $(".myButton2").removeClass("selected");
//   $("#mnhouseB").addClass("selected");
//   }
// })
// var waypoint7 = new Waypoint({
//   element: document.getElementById('mnsenate'),
//   handler: function(direction) {
//   $(".myButton2").removeClass("selected");
//   $("#mnsenateB").addClass("selected");
//   }
// })
// var waypoint8 = new Waypoint({
//   element: document.getElementById('finance'),
//   handler: function(direction) {
//   $(".myButton2").removeClass("selected");
//   $("#financeB").addClass("selected");
//   }
// })
// var waypoint9 = new Waypoint({
//   element: document.getElementById('polls'),
//   handler: function(direction) {
//   $(".myButton2").removeClass("selected");
//   $("#pollsB").addClass("selected");
//   }
// })
// var waypoint10 = new Waypoint({
//   element: document.getElementById('coverage'),
//   handler: function(direction) {
//   $(".myButton2").removeClass("selected");
//   $("#coverageB").addClass("selected");
//   }
// })

});
</script>

<script>
dfl_safe = "#506fb3";
gop_safe = "#d46354";
dfl_lean = "#8493c8";
gop_lean = "#f48072";
basecolor = "#ddd";

d3.json("data/mngov.json", function(json) {
nv.addGraph(function() {
  var chart0 = nv.models.pieChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .showLegend(false)
      .showLabels(false)     //Display pie labels
      .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
      .labelType("value") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
      .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
      .donutRatio(0.35)     //Configure how big you want the donut hole size to be.
      // .tooltipContent(function(key, y, e, graph) { return  '<strong>' + key + ': ' + y + '</strong>' ; })
      .color(['#506fb3', '#ddd', '#d46354', '#666','#8493c8', '#f48072'])
      ;

chart0.pie
    .startAngle(function(d) { return d.startAngle/2 -Math.PI/2; })
    .endAngle(function(d) { return d.endAngle/2 -Math.PI/2 ;});

    d3.select("#chart svg")
        .datum(json)
        .transition().duration(350)
        .call(chart0);

nv.utils.windowResize(chart0.update)

  return chart0;
});
});
</script>

<script>
//PRESIDENTIAL MAP
var width = 525,
    height = 600,
    centered;

var projectionPresident = d3.geo.albersUsa()
    .scale(800);

var pathPresident = d3.geo.path()
    .projection(projectionPresident);

var svgPresident = d3.select("#presidential_map svg")
    .attr("width", width)
    .attr("height", height);

svgPresident.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height);

var gPresident = svgPresident.append("g");

d3.json("shapefiles/states_sen.json", function(error, us) {

  gPresident.append("g")
      .attr("id", "states")
    .selectAll("path")
      .data(us.features)
    .enter().append("path")
      .attr("d", pathPresident)
      .on("click", clicked)
      .style("fill", "#ddd")
       .on("mousedown", function(d, i){ console.log("clicky!"); })
      .style("stroke-width", "1.5px")
      .style("stroke", "#fff")
      .call(d3.helper.tooltip(function(d, i){return "<b>" + d.properties.NAME + "</b>";}));

  gPresident.append("path")
      //.datum(topojson.mesh(us, us.features, function(a, b) { return a !== b; }))
      .attr("id", "state-borders")
      .attr("d", pathPresident);

function clicked(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = pathPresident.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  gPresident.selectAll("path")
      .classed("faded", true)
      .classed("active", centered && function(d) { return d === centered; });

  gPresident.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}

function clicked2(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = pathPresident.centroid(d);
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

  gPresident.selectAll("path")
      .classed("faded", false)
      .classed("active", centered && function(d) { return d === centered; });

  gPresident.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}

var zoom = d3.behavior.zoom()
    .on("zoom",function() {
        gPresident.attr("transform","translate("+ 
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        gPresident.selectAll("circle")
            .attr("d", pathPresident.projection(projectionPresident));
        gPresident.selectAll("path")  
            .attr("d", pathPresident.projection(projectionPresident)); 

  });

$(".zoom").click(function() {
  clicked2();
});

});

//PRESIDENTIAL CARTOGRAM
var cartogramPresident = {
    margin: {
        top: 70,
        right: 0,
        bottom: 0,
        left: 90
    },

    selector: '#presidential_carto svg',

    init: function() {
        var self = this;

        self.$el = $(self.selector);

        self.width = 500 - self.margin.left - self.margin.right;
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
            .data(self.state_president)
            .enter().append('g')
            .attr('class', 'state-groups');

        var state = states.append('rect')
            .attr('id', function(d) {
                return d.state_postal + "-ussen";
            })
            .attr('class', 'state')
            .attr('rx', 2)
            .attr('ry', 2)
            .attr('x', function(d) {
                return d.column * (self.state_size + self.state_padding);
            })
            .attr('y', function(d) {
                return d.row * (self.state_size + self.state_padding);
            })
            .attr('width', self.state_size)
            .attr('height', self.state_size) 
             .call(d3.helper.tooltip(
        function(d){
            return "<div class='districts'><b>" + d.state_full + "</b></div><hr>No races";
                      }));

        var text = states.append('text')
            .attr('class', 'state-label')
            .attr('dominant-baseline', 'central')
            .attr('x', function(d) {
                return (d.column * (self.state_size + self.state_padding))
                        + self.state_size / 2; })
            .attr('y', function(d) {
                return (d.row * (self.state_size + self.state_padding))
                    + self.state_size / 2; })
            .style('text-anchor', 'middle')
          //  .text(function(d) {
          //      return d.state_postal;
         //   });
    },

    state_president: [{'state_full':'Alabama','state_postal':'AL','row':5,'column':6,'color_value':0},
        {'state_full':'Alaska','state_postal':'AK','row':6,'column':0,'color_value':1},
        {'state_full':'Arizona','state_postal':'AZ','row':4,'column':1,'color_value':0},
        {'state_full':'Arkansas','state_postal':'AR','row':4,'column':4,'color_value':2},
        {'state_full':'California','state_postal':'CA','row':2,'column':0,'color_value':0},
        {'state_full':'Colorado','state_postal':'CO','row':3,'column':2,'color_value':3},
        {'state_full':'Connecticut','state_postal':'CT','row':2,'column':9,'color_value':0},
        {'state_full':'D.C.','state_postal':'DC','row':4,'column':8,'color_value':0},
        {'state_full':'Delaware','state_postal':'DE','row':3,'column':9,'color_value':4},
        {'state_full':'Florida','state_postal':'FL','row':6,'column':8,'color_value':0},
        {'state_full':'Georgia','state_postal':'GA','row':5,'column':7,'color_value':5},
        {'state_full':'Hawaii','state_postal':'HI','row':6,'column':-1,'color_value':6},
        {'state_full':'Idaho','state_postal':'ID','row':1,'column':1,'color_value':7},
        {'state_full':'Illinois','state_postal':'IL','row':1,'column':6,'color_value':8},
        {'state_full':'Indiana','state_postal':'IN','row':2,'column':5,'color_value':0},
        {'state_full':'Iowa','state_postal':'IA','row':2,'column':4,'color_value':9},
        {'state_full':'Kansas','state_postal':'KS','row':4,'column':3,'color_value':10},
        {'state_full':'Kentucky','state_postal':'KY','row':3,'column':5,'color_value':11},
        {'state_full':'Louisiana','state_postal':'LA','row':5,'column':4,'color_value':12},
        {'state_full':'Maine','state_postal':'ME','row':-1,'column':10,'color_value':13},
        {'state_full':'Maryland','state_postal':'MD','row':3,'column':8,'color_value':0},
        {'state_full':'Massachusetts','state_postal':'MA','row':1,'column':9,'color_value':14},
        {'state_full':'Michigan','state_postal':'MI','row':1,'column':7,'color_value':15},
        {'state_full':'Minnesota','state_postal':'MN','row':1,'column':4,'color_value':16},
        {'state_full':'Mississippi','state_postal':'MS','row':5,'column':5,'color_value':17},
        {'state_full':'Missouri','state_postal':'MO','row':3,'column':4,'color_value':0},
        {'state_full':'Montana','state_postal':'MT','row':1,'column':2,'color_value':18},
        {'state_full':'Nebraska','state_postal':'NE','row':3,'column':3,'color_value':19},
        {'state_full':'Nevada','state_postal':'NV','row':2,'column':1,'color_value':0},
        {'state_full':'New Hampshire','state_postal':'NH','row':0,'column':10,'color_value':20},
        {'state_full':'New Jersey','state_postal':'NJ','row':2,'column':8,'color_value':21},
        {'state_full':'New Mexico','state_postal':'NM','row':4,'column':2,'color_value':22},
        {'state_full':'New York','state_postal':'NY','row':1,'column':8,'color_value':0},
        {'state_full':'North Carolina','state_postal':'NC','row':4,'column':6,'color_value':23},
        {'state_full':'North Dakota','state_postal':'ND','row':1,'column':3,'color_value':0},
        {'state_full':'Ohio','state_postal':'OH','row':2,'column':6,'color_value':0},
        {'state_full':'Oklahoma','state_postal':'OK','row':5,'column':3,'color_value':24},
        {'state_full':'Oregon','state_postal':'OR','row':1,'column':0,'color_value':25},
        {'state_full':'Pennsylvania','state_postal':'PA','row':2,'column':7,'color_value':0},
        {'state_full':'Rhode Island','state_postal':'RI','row':2,'column':10,'color_value':26},
        {'state_full':'South Carolina','state_postal':'SC','row':4,'column':7,'color_value':27},
        {'state_full':'South Dakota','state_postal':'SD','row':2,'column':3,'color_value':28},
        {'state_full':'Tennessee','state_postal':'TN','row':4,'column':5,'color_value':29},
        {'state_full':'Texas','state_postal':'TX','row':6,'column':3,'color_value':30},
        {'state_full':'Utah','state_postal':'UT','row':3,'column':1,'color_value':0},
        {'state_full':'Vermont','state_postal':'VT','row':0,'column':9,'color_value':0},
        {'state_full':'Virginia','state_postal':'VA','row':3,'column':7,'color_value':31},
        {'state_full':'Washington','state_postal':'WA','row':0,'column':0,'color_value':0},
        {'state_full':'West Virginia','state_postal':'WV','row':3,'column':6,'color_value':32},
        {'state_full':'Wisconsin','state_postal':'WI','row':1,'column':5,'color_value':0},
        {'state_full':'Wyoming','state_postal':'WY','row':2,'column':2,'color_value':33}]
};

$(document).ready(function() {
    cartogramPresident.init();
});
</script>

<script>
//SENATE MAP
var width = 525,
    height = 600,
    centered;

var projectionUSSenate = d3.geo.albersUsa()
    .scale(800);

var pathUSSenate = d3.geo.path()
    .projection(projectionUSSenate);

var svgUSSenate = d3.select("#senate_map svg")
    .attr("width", width)
    .attr("height", height);

svgUSSenate.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height);

var gUSSenate = svgUSSenate.append("g");

d3.json("shapefiles/states_sen.json", function(error, us) {

  gUSSenate.append("g")
      .attr("id", "states")
    .selectAll("path")
      .data(us.features)
    .enter().append("path")
      .attr("d", pathUSSenate)
      .on("click", clicked)
      .style("fill", "#ddd")
       .on("mousedown", function(d, i){ console.log("clicky!"); })
      .style("stroke-width", "1.5px")
      .style("stroke", "#fff")
      .call(d3.helper.tooltip(function(d, i){return "<b>" + d.properties.NAME + " County</b>";}));

  gUSSenate.append("path")
      //.datum(topojson.mesh(us, us.features, function(a, b) { return a !== b; }))
      .attr("id", "state-borders")
      .attr("d", pathUSSenate);

function clicked(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = pathUSSenate.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  gUSSenate.selectAll("path")
      .classed("faded", true)
      .classed("active", centered && function(d) { return d === centered; });

  gUSSenate.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}

function clicked2(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = pathUSSenate.centroid(d);
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

  gUSSenate.selectAll("path")
      .classed("faded", false)
      .classed("active", centered && function(d) { return d === centered; });

  gUSSenate.transition()
      .duration(750)
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}

var zoom = d3.behavior.zoom()
    .on("zoom",function() {
        gUSSenate.attr("transform","translate("+ 
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        gUSSenate.selectAll("circle")
            .attr("d", pathUSSenate.projection(projectionUSSenate));
        gUSSenate.selectAll("path")  
            .attr("d", pathUSSenate.projection(projectionUSSenate)); 

  });

$(".zoom").click(function() {
  clicked2();
});

});

//SENATE CARTOGRAM
var cartogramUSSenate = {
    margin: {
        top: 70,
        right: 0,
        bottom: 0,
        left: 90
    },

    selector: '#senate_carto svg',

    init: function() {
        var self = this;

        self.$el = $(self.selector);

        self.width = 500 - self.margin.left - self.margin.right;
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
            .data(self.state_ussenate)
            .enter().append('g')
            .attr('class', 'state-groups');

        var state = states.append('rect')
            .attr('id', function(d) {
                return d.state_postal + "-ussen";
            })
            .attr('class', 'state')
            .attr('rx', 2)
            .attr('ry', 2)
            .attr('x', function(d) {
                return d.column * (self.state_size + self.state_padding);
            })
            .attr('y', function(d) {
                return d.row * (self.state_size + self.state_padding);
            })
            .attr('width', self.state_size)
            .attr('height', self.state_size)   
             .call(d3.helper.tooltip(
        function(d){
            return "<div class='districts'><b>" + d.state_full + "</b></div><hr>No races";
                      }));

        var text = states.append('text')
            .attr('class', 'state-label')
            .attr('dominant-baseline', 'central')
            .attr('x', function(d) {
                return (d.column * (self.state_size + self.state_padding))
                        + self.state_size / 2; })
            .attr('y', function(d) {
                return (d.row * (self.state_size + self.state_padding))
                    + self.state_size / 2; })
            .style('text-anchor', 'middle')
          //  .text(function(d) {
          //      return d.state_postal;
         //   });
    },

    state_ussenate: [{'state_full':'Alabama','state_postal':'AL','row':5,'column':6,'color_value':0},
        {'state_full':'Alaska','state_postal':'AK','row':6,'column':0,'color_value':1},
        {'state_full':'Arizona','state_postal':'AZ','row':4,'column':1,'color_value':0},
        {'state_full':'Arkansas','state_postal':'AR','row':4,'column':4,'color_value':2},
        {'state_full':'California','state_postal':'CA','row':2,'column':0,'color_value':0},
        {'state_full':'Colorado','state_postal':'CO','row':3,'column':2,'color_value':3},
        {'state_full':'Connecticut','state_postal':'CT','row':2,'column':9,'color_value':0},
        {'state_full':'D.C.','state_postal':'DC','row':4,'column':8,'color_value':0},
        {'state_full':'Delaware','state_postal':'DE','row':3,'column':9,'color_value':4},
        {'state_full':'Florida','state_postal':'FL','row':6,'column':8,'color_value':0},
        {'state_full':'Georgia','state_postal':'GA','row':5,'column':7,'color_value':5},
        {'state_full':'Hawaii','state_postal':'HI','row':6,'column':-1,'color_value':6},
        {'state_full':'Idaho','state_postal':'ID','row':1,'column':1,'color_value':7},
        {'state_full':'Illinois','state_postal':'IL','row':1,'column':6,'color_value':8},
        {'state_full':'Indiana','state_postal':'IN','row':2,'column':5,'color_value':0},
        {'state_full':'Iowa','state_postal':'IA','row':2,'column':4,'color_value':9},
        {'state_full':'Kansas','state_postal':'KS','row':4,'column':3,'color_value':10},
        {'state_full':'Kentucky','state_postal':'KY','row':3,'column':5,'color_value':11},
        {'state_full':'Louisiana','state_postal':'LA','row':5,'column':4,'color_value':12},
        {'state_full':'Maine','state_postal':'ME','row':-1,'column':10,'color_value':13},
        {'state_full':'Maryland','state_postal':'MD','row':3,'column':8,'color_value':0},
        {'state_full':'Massachusetts','state_postal':'MA','row':1,'column':9,'color_value':14},
        {'state_full':'Michigan','state_postal':'MI','row':1,'column':7,'color_value':15},
        {'state_full':'Minnesota','state_postal':'MN','row':1,'column':4,'color_value':16},
        {'state_full':'Mississippi','state_postal':'MS','row':5,'column':5,'color_value':17},
        {'state_full':'Missouri','state_postal':'MO','row':3,'column':4,'color_value':0},
        {'state_full':'Montana','state_postal':'MT','row':1,'column':2,'color_value':18},
        {'state_full':'Nebraska','state_postal':'NE','row':3,'column':3,'color_value':19},
        {'state_full':'Nevada','state_postal':'NV','row':2,'column':1,'color_value':0},
        {'state_full':'New Hampshire','state_postal':'NH','row':0,'column':10,'color_value':20},
        {'state_full':'New Jersey','state_postal':'NJ','row':2,'column':8,'color_value':21},
        {'state_full':'New Mexico','state_postal':'NM','row':4,'column':2,'color_value':22},
        {'state_full':'New York','state_postal':'NY','row':1,'column':8,'color_value':0},
        {'state_full':'North Carolina','state_postal':'NC','row':4,'column':6,'color_value':23},
        {'state_full':'North Dakota','state_postal':'ND','row':1,'column':3,'color_value':0},
        {'state_full':'Ohio','state_postal':'OH','row':2,'column':6,'color_value':0},
        {'state_full':'Oklahoma','state_postal':'OK','row':5,'column':3,'color_value':24},
        {'state_full':'Oregon','state_postal':'OR','row':1,'column':0,'color_value':25},
        {'state_full':'Pennsylvania','state_postal':'PA','row':2,'column':7,'color_value':0},
        {'state_full':'Rhode Island','state_postal':'RI','row':2,'column':10,'color_value':26},
        {'state_full':'South Carolina','state_postal':'SC','row':4,'column':7,'color_value':27},
        {'state_full':'South Dakota','state_postal':'SD','row':2,'column':3,'color_value':28},
        {'state_full':'Tennessee','state_postal':'TN','row':4,'column':5,'color_value':29},
        {'state_full':'Texas','state_postal':'TX','row':6,'column':3,'color_value':30},
        {'state_full':'Utah','state_postal':'UT','row':3,'column':1,'color_value':0},
        {'state_full':'Vermont','state_postal':'VT','row':0,'column':9,'color_value':0},
        {'state_full':'Virginia','state_postal':'VA','row':3,'column':7,'color_value':31},
        {'state_full':'Washington','state_postal':'WA','row':0,'column':0,'color_value':0},
        {'state_full':'West Virginia','state_postal':'WV','row':3,'column':6,'color_value':32},
        {'state_full':'Wisconsin','state_postal':'WI','row':1,'column':5,'color_value':0},
        {'state_full':'Wyoming','state_postal':'WY','row':2,'column':2,'color_value':33}]
};

$(document).ready(function() {
    cartogramUSSenate.init();
});
</script>

<script>
//HOUSE STUFF
var width = 525,
    height = 600,
    centered;

var projectionUSHouse = d3.geo.albersUsa()
    .scale(800);

var pathUSHouse = d3.geo.path()
    .projection(projectionUSHouse);

var svgUSHouse = d3.select("#house_map svg")
    .attr("width", width)
    .attr("height", height);

svgUSHouse.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height);

var gUSHouse = svgUSHouse.append("g");

d3.json("shapefiles/usdistricts.json", function(error, us) {

  gUSHouse.append("g")
      .attr("id", "states")
    .selectAll("path")
      .data(us.features)
    .enter().append("path")
      .attr("d", pathUSHouse)
      .on("click", clicked)
      .style("fill", "#ddd")
       .on("mousedown", function(d, i){ console.log("clicky!"); })
      .style("stroke-width", "1.5px")
      .style("stroke", "#fff")
      .call(d3.helper.tooltip(function(d, i){return "<b>" + d.properties.NAMELSAD + "</b>";}));

  gUSHouse.append("path")
      //.datum(topojson.mesh(us, us.features, function(a, b) { return a !== b; }))
      .attr("id", "state-borders")
      .attr("d", pathUSHouse);

function clicked(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = pathUSHouse.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  gUSHouse.selectAll("path")
      .classed("faded", true)
      .classed("active", centered && function(d) { return d === centered; });

  gUSHouse.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}

function clicked2(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = pathUSHouse.centroid(d);
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

  gUSHouse.selectAll("path")
      .classed("faded", false)
      .classed("active", centered && function(d) { return d === centered; });

  gUSHouse.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}

var zoom = d3.behavior.zoom()
    .on("zoom",function() {
        gUSHouse.attr("transform","translate("+ 
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        gUSHouse.selectAll("circle")
            .attr("d", pathUSHouse.projection(projectionUSHouse));
        gUSHouse.selectAll("path")  
            .attr("d", pathUSHouse.projection(projectionUSHouse)); 

  });

$(".zoom").click(function() {
  clicked2();
});

});
</script>

<script>
//GOVERNORS STUFF
var width = 525,
    height = 600,
    centered;

var projectionGovernors = d3.geo.albersUsa()
    .scale(800);

var pathGovernors = d3.geo.path()
    .projection(projectionGovernors);

var svgGovernors = d3.select("#governors_map svg")
    .attr("width", width)
    .attr("height", height);

svgGovernors.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height);

var gGovernors = svgGovernors.append("g");

d3.json("shapefiles/states_sen.json", function(error, us) {

  gGovernors.append("g")
      .attr("id", "states")
    .selectAll("path")
      .data(us.features)
    .enter().append("path")
      .attr("d", pathGovernors)
      .on("click", clicked)
      .style("fill", "#ddd")
       .on("mousedown", function(d, i){ console.log("clicky!"); })
      .style("stroke-width", "1.5px")
      .style("stroke", "#fff")
      .call(d3.helper.tooltip(function(d, i){return "<b>" + d.properties.NAME + "</b>";}));

  gGovernors.append("path")
      //.datum(topojson.mesh(us, us.features, function(a, b) { return a !== b; }))
      .attr("id", "state-borders")
      .attr("d", pathGovernors);

function clicked(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = pathGovernors.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  gGovernors.selectAll("path")
      .classed("faded", true)
      .classed("active", centered && function(d) { return d === centered; });

  gGovernors.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}

function clicked2(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = pathGovernors.centroid(d);
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

  gGovernors.selectAll("path")
      .classed("faded", false)
      .classed("active", centered && function(d) { return d === centered; });

  gGovernors.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}

var zoom = d3.behavior.zoom()
    .on("zoom",function() {
        gGovernors.attr("transform","translate("+ 
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        gGovernors.selectAll("circle")
            .attr("d", pathGovernors.projection(projectionGovernors));
        gGovernors.selectAll("path")  
            .attr("d", pathGovernors.projection(projectionGovernors)); 

  });

$(".zoom").click(function() {
  clicked2();
});

});

//GOVERNORS CARTOGRAM
var cartogramGovernors = {
    margin: {
        top: 70,
        right: 0,
        bottom: 0,
        left: 90
    },

    selector: '#governors_carto svg',

    init: function() {
        var self = this;

        self.$el = $(self.selector);

        self.width = 500 - self.margin.left - self.margin.right;
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
            .data(self.state_governors)
            .enter().append('g')
            .attr('class', 'state-groups');

        var state = states.append('rect')
            .attr('id', function(d) {
                return d.state_postal + "-ussen";
            })
            .attr('class', 'state')
            .attr('rx', 2)
            .attr('ry', 2)
            .attr('x', function(d) {
                return d.column * (self.state_size + self.state_padding);
            })
            .attr('y', function(d) {
                return d.row * (self.state_size + self.state_padding);
            })
            .attr('width', self.state_size)
            .attr('height', self.state_size) 
             .call(d3.helper.tooltip(
        function(d){
            return "<div class='districts'><b>" + d.state_full + "</b></div><hr>No races";
                      }));

        var text = states.append('text')
            .attr('class', 'state-label')
            .attr('dominant-baseline', 'central')
            .attr('x', function(d) {
                return (d.column * (self.state_size + self.state_padding))
                        + self.state_size / 2; })
            .attr('y', function(d) {
                return (d.row * (self.state_size + self.state_padding))
                    + self.state_size / 2; })
            .style('text-anchor', 'middle')
          //  .text(function(d) {
          //      return d.state_postal;
         //   });
    },

    state_governors: [{'state_full':'Alabama','state_postal':'AL','row':5,'column':6,'color_value':0},
        {'state_full':'Alaska','state_postal':'AK','row':6,'column':0,'color_value':1},
        {'state_full':'Arizona','state_postal':'AZ','row':4,'column':1,'color_value':0},
        {'state_full':'Arkansas','state_postal':'AR','row':4,'column':4,'color_value':2},
        {'state_full':'California','state_postal':'CA','row':2,'column':0,'color_value':0},
        {'state_full':'Colorado','state_postal':'CO','row':3,'column':2,'color_value':3},
        {'state_full':'Connecticut','state_postal':'CT','row':2,'column':9,'color_value':0},
        {'state_full':'D.C.','state_postal':'DC','row':4,'column':8,'color_value':0},
        {'state_full':'Delaware','state_postal':'DE','row':3,'column':9,'color_value':4},
        {'state_full':'Florida','state_postal':'FL','row':6,'column':8,'color_value':0},
        {'state_full':'Georgia','state_postal':'GA','row':5,'column':7,'color_value':5},
        {'state_full':'Hawaii','state_postal':'HI','row':6,'column':-1,'color_value':6},
        {'state_full':'Idaho','state_postal':'ID','row':1,'column':1,'color_value':7},
        {'state_full':'Illinois','state_postal':'IL','row':1,'column':6,'color_value':8},
        {'state_full':'Indiana','state_postal':'IN','row':2,'column':5,'color_value':0},
        {'state_full':'Iowa','state_postal':'IA','row':2,'column':4,'color_value':9},
        {'state_full':'Kansas','state_postal':'KS','row':4,'column':3,'color_value':10},
        {'state_full':'Kentucky','state_postal':'KY','row':3,'column':5,'color_value':11},
        {'state_full':'Louisiana','state_postal':'LA','row':5,'column':4,'color_value':12},
        {'state_full':'Maine','state_postal':'ME','row':-1,'column':10,'color_value':13},
        {'state_full':'Maryland','state_postal':'MD','row':3,'column':8,'color_value':0},
        {'state_full':'Massachusetts','state_postal':'MA','row':1,'column':9,'color_value':14},
        {'state_full':'Michigan','state_postal':'MI','row':1,'column':7,'color_value':15},
        {'state_full':'Minnesota','state_postal':'MN','row':1,'column':4,'color_value':16},
        {'state_full':'Mississippi','state_postal':'MS','row':5,'column':5,'color_value':17},
        {'state_full':'Missouri','state_postal':'MO','row':3,'column':4,'color_value':0},
        {'state_full':'Montana','state_postal':'MT','row':1,'column':2,'color_value':18},
        {'state_full':'Nebraska','state_postal':'NE','row':3,'column':3,'color_value':19},
        {'state_full':'Nevada','state_postal':'NV','row':2,'column':1,'color_value':0},
        {'state_full':'New Hampshire','state_postal':'NH','row':0,'column':10,'color_value':20},
        {'state_full':'New Jersey','state_postal':'NJ','row':2,'column':8,'color_value':21},
        {'state_full':'New Mexico','state_postal':'NM','row':4,'column':2,'color_value':22},
        {'state_full':'New York','state_postal':'NY','row':1,'column':8,'color_value':0},
        {'state_full':'North Carolina','state_postal':'NC','row':4,'column':6,'color_value':23},
        {'state_full':'North Dakota','state_postal':'ND','row':1,'column':3,'color_value':0},
        {'state_full':'Ohio','state_postal':'OH','row':2,'column':6,'color_value':0},
        {'state_full':'Oklahoma','state_postal':'OK','row':5,'column':3,'color_value':24},
        {'state_full':'Oregon','state_postal':'OR','row':1,'column':0,'color_value':25},
        {'state_full':'Pennsylvania','state_postal':'PA','row':2,'column':7,'color_value':0},
        {'state_full':'Rhode Island','state_postal':'RI','row':2,'column':10,'color_value':26},
        {'state_full':'South Carolina','state_postal':'SC','row':4,'column':7,'color_value':27},
        {'state_full':'South Dakota','state_postal':'SD','row':2,'column':3,'color_value':28},
        {'state_full':'Tennessee','state_postal':'TN','row':4,'column':5,'color_value':29},
        {'state_full':'Texas','state_postal':'TX','row':6,'column':3,'color_value':30},
        {'state_full':'Utah','state_postal':'UT','row':3,'column':1,'color_value':0},
        {'state_full':'Vermont','state_postal':'VT','row':0,'column':9,'color_value':0},
        {'state_full':'Virginia','state_postal':'VA','row':3,'column':7,'color_value':31},
        {'state_full':'Washington','state_postal':'WA','row':0,'column':0,'color_value':0},
        {'state_full':'West Virginia','state_postal':'WV','row':3,'column':6,'color_value':32},
        {'state_full':'Wisconsin','state_postal':'WI','row':1,'column':5,'color_value':0},
        {'state_full':'Wyoming','state_postal':'WY','row':2,'column':2,'color_value':33}]
};

$(document).ready(function() {
    cartogramGovernors.init();
});
</script>

<script>
//MNHOUSE MAP
var width = 525,
    height = 600,
    centered;

var projectionHouse = d3.geo.albersUsa()
    .scale(5037)
    .translate([100, 970]);

var pathHouse = d3.geo.path()
    .projection(projectionHouse);

var svgHouse = d3.select("#mnhouse_map svg")
    .attr("width", width)
    .attr("height", height);

svgHouse.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height);

var gHouse = svgHouse.append("g");

d3.json("shapefiles/mnleg.json", function(error, us) {

  gHouse.append("g")
      .attr("id", "states")
    .selectAll("path")
      .data(us.features)
    .enter().append("path")
      .attr("d", pathHouse)
      .on("click", clicked)
      .style("fill", "#ddd")
       .on("mousedown", function(d, i){ console.log("clicky!"); })
      .style("stroke-width", "1.5px")
      .style("stroke", "#fff")
      .call(d3.helper.tooltip(function(d, i){return "<b>" + d.properties.DISTRICT + " County</b>";}));

  gHouse.append("path")
      //.datum(topojson.mesh(us, us.features, function(a, b) { return a !== b; }))
      .attr("id", "state-borders")
      .attr("d", pathHouse);

function clicked(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = pathHouse.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  gHouse.selectAll("path")
      .classed("faded", true)
      .classed("active", centered && function(d) { return d === centered; });

  gHouse.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}

function clicked2(d) {
  var x, y, k;



  if (d && centered !== d) {
    var centroid = pathHouse.centroid(d);
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

  gHouse.selectAll("path")
      .classed("faded", false)
      .classed("active", centered && function(d) { return d === centered; });

  gHouse.transition()
      .duration(750)
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}

var zoom = d3.behavior.zoom()
    .on("zoom",function() {
        gHouse.attr("transform","translate("+ 
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        gHouse.selectAll("circle")
            .attr("d", pathHouse.projection(projectionHouse));
        gHouse.selectAll("path")  
            .attr("d", pathHouse.projection(projectionHouse)); 

  });

$(".zoom").click(function() {
  clicked2();
});

});

var cartogramHouse = {
    margin: {
        top: 60,
        right: 0,
        bottom: 0,
        left: 60
    },

    selector: '#mnhouse_carto svg',

    init: function() {
        var self = this;

        self.$el = $(self.selector);

        self.width = 350 - self.margin.left - self.margin.right;
        self.height = 350 - self.margin.top - self.margin.bottom;

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
            .data(self.state_house)
            .enter().append('g')
            .attr('class', 'state-groups');

        var state = states.append('rect')
            .attr('id', function(d) {
                return d.state_postal + "-mnleg";
            })
            .attr('class', 'state')
            .attr('rx', 2)
            .attr('ry', 2)
            .attr('x', function(d) {
                return d.column * (self.state_size + self.state_padding);
            })
            .attr('y', function(d) {
                return d.row * (self.state_size + self.state_padding);
            })
            .attr('width', self.state_size)
            .attr('height', self.state_size)
             .call(d3.helper.tooltip(
        function(d){
                   return "<div class='district'>"+ d.state_full + "</div>";
        }));

        var text = states.append('text')
            .attr('class', 'state-label')
            .attr('dominant-baseline', 'central')
            .attr('x', function(d) {
                return (d.column * (self.state_size + self.state_padding))
                        + self.state_size / 2; })
            .attr('y', function(d) {
                return (d.row * (self.state_size + self.state_padding))
                    + self.state_size / 2; })
            .style('text-anchor', 'middle')
            //.text(function(d) {
           //     return d.state_postal;
           // });
    },

    state_house: [{'state_full':'District 1A','state_postal':'1A','row':0,'column':0,'color_value':1},
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

};

//METRO AREA MNLEG CARTOGRAM
var cartogramHouse2 = {
    margin: {
        top: 60,
        right: 0,
        bottom: 0,
        left: 60
    },

    selector: '#mnhouse_carto2 svg',

    init: function() {
        var self = this;

        self.$el = $(self.selector);

        self.width = 350 - self.margin.left - self.margin.right;
        self.height = 350 - self.margin.top - self.margin.bottom;

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
            .data(self.state_house2)
            .enter().append('g')
            .attr('class', 'state-groups');

        var state = states.append('rect')
            .attr('id', function(d) {
                return d.state_postal + "-metleg";
            })
            .attr('class', 'state')
            .attr('rx', 2)
            .attr('ry', 2)
            .attr('x', function(d) {
                return d.column * (self.state_size + self.state_padding);
            })
            .attr('y', function(d) {
                return d.row * (self.state_size + self.state_padding);
            })
            .attr('width', self.state_size)
            .attr('height', self.state_size)
             .call(d3.helper.tooltip(
        function(d){
         return "<div class='district'>"+ d.state_full + "</div>";
        }));

        var text = states.append('text')
            .attr('class', 'state-label')
            .attr('dominant-baseline', 'central')
            .attr('x', function(d) {
                return (d.column * (self.state_size + self.state_padding))
                        + self.state_size / 2; })
            .attr('y', function(d) {
                return (d.row * (self.state_size + self.state_padding))
                    + self.state_size / 2; })
            .style('text-anchor', 'middle')
            //.text(function(d) {
            //    return d.state_postal;
           // });
    },

    state_house2: [{'state_full':'30A','state_postal':'30A','row':0,'column':2,'color_value':53},
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

};

$(document).ready(function() {
    cartogramHouse.init();
    cartogramHouse2.init();
});
</script>

<script>
//MNSENATE MAP
var width = 525,
    height = 600,
    centered;

var projectionSenate = d3.geo.albersUsa()
    .scale(5037)
    .translate([100, 970]);

var pathSenate = d3.geo.path()
    .projection(projectionSenate);

var svgSenate = d3.select("#mnsenate_map svg")
    .attr("width", width)
    .attr("height", height);

svgSenate.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height);

var gSenate = svgSenate.append("g");

d3.json("shapefiles/mnleg.json", function(error, us) {

  gSenate.append("g")
      .attr("id", "states")
    .selectAll("path")
      .data(us.features)
    .enter().append("path")
      .attr("d", pathSenate)
      .on("click", clicked)
      .style("fill", "#ddd")
       .on("mousedown", function(d, i){ console.log("clicky!"); })
      .style("stroke-width", "1.5px")
      .style("stroke", "#fff")
      .call(d3.helper.tooltip(function(d, i){return "<b>" + d.properties.NAME + " </b>";}));

  gSenate.append("path")
      //.datum(topojson.mesh(us, us.features, function(a, b) { return a !== b; }))
      .attr("id", "state-borders")
      .attr("d", pathSenate);

function clicked(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = pathSenate.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  gSenate.selectAll("path")
      .classed("faded", true)
      .classed("active", centered && function(d) { return d === centered; });

  gSenate.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}

function clicked2(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = pathSenate.centroid(d);
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

  gSenate.selectAll("path")
      .classed("faded", false)
      .classed("active", centered && function(d) { return d === centered; });

  gSenate.transition()
      .duration(750)
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}

var zoom = d3.behavior.zoom()
    .on("zoom",function() {
        gSenate.attr("transform","translate("+ 
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        gSenate.selectAll("circle")
            .attr("d", pathSenate.projection(projectionSenate));
        gSenate.selectAll("path")  
            .attr("d", pathSenate.projection(projectionSenate)); 

  });

$(".zoom").click(function() {
  clicked2();
});

});

var cartogramSenate = {
    margin: {
        top: 60,
        right: 0,
        bottom: 0,
        left: 60
    },

    selector: '#mnsenate_carto svg',

    init: function() {
        var self = this;

        self.$el = $(self.selector);

        self.width = 350 - self.margin.left - self.margin.right;
        self.height = 350 - self.margin.top - self.margin.bottom;

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
            .data(self.state_senate)
            .enter().append('g')
            .attr('class', 'state-groups');

        var state = states.append('rect')
            .attr('id', function(d) {
                return d.state_postal + "-mnleg";
            })
            .attr('class', 'state')
            .attr('rx', 2)
            .attr('ry', 2)
            .attr('x', function(d) {
                return d.column * (self.state_size + self.state_padding);
            })
            .attr('y', function(d) {
                return d.row * (self.state_size + self.state_padding);
            })
            .attr('width', self.state_size)
            .attr('height', self.state_size)
             .call(d3.helper.tooltip(
        function(d){
                   return "<div class='district'>"+ d.state_full + "</div>";
        }));

        var text = states.append('text')
            .attr('class', 'state-label')
            .attr('dominant-baseline', 'central')
            .attr('x', function(d) {
                return (d.column * (self.state_size + self.state_padding))
                        + self.state_size / 2; })
            .attr('y', function(d) {
                return (d.row * (self.state_size + self.state_padding))
                    + self.state_size / 2; })
            .style('text-anchor', 'middle')
            //.text(function(d) {
           //     return d.state_postal;
           // });
    },

    state_senate: [{'state_full':'District 1A','state_postal':'1A','row':0,'column':0,'color_value':1},
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

};

//METRO AREA MNLEG CARTOGRAM
var cartogramSenate2 = {
    margin: {
        top: 60,
        right: 0,
        bottom: 0,
        left: 60
    },

    selector: '#mnsenate_carto2 svg',

    init: function() {
        var self = this;

        self.$el = $(self.selector);

        self.width = 350 - self.margin.left - self.margin.right;
        self.height = 350 - self.margin.top - self.margin.bottom;

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
            .data(self.state_senate2)
            .enter().append('g')
            .attr('class', 'state-groups');

        var state = states.append('rect')
            .attr('id', function(d) {
                return d.state_postal + "-metleg";
            })
            .attr('class', 'state')
            .attr('rx', 2)
            .attr('ry', 2)
            .attr('x', function(d) {
                return d.column * (self.state_size + self.state_padding);
            })
            .attr('y', function(d) {
                return d.row * (self.state_size + self.state_padding);
            })
            .attr('width', self.state_size)
            .attr('height', self.state_size)
             .call(d3.helper.tooltip(
        function(d){
         return "<div class='district'>"+ d.state_full + "</div>";
        }));

        var text = states.append('text')
            .attr('class', 'state-label')
            .attr('dominant-baseline', 'central')
            .attr('x', function(d) {
                return (d.column * (self.state_size + self.state_padding))
                        + self.state_size / 2; })
            .attr('y', function(d) {
                return (d.row * (self.state_size + self.state_padding))
                    + self.state_size / 2; })
            .style('text-anchor', 'middle')
            //.text(function(d) {
            //    return d.state_postal;
           // });
    },

    state_senate2: [{'state_full':'30A','state_postal':'30A','row':0,'column':2,'color_value':53},
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

};

$(document).ready(function() {
    cartogramSenate2.init();
    cartogramSenate.init();
});
</script>

<script>
//CLICKY FEATURES

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
</script>

<?php
readfile('http://www.startribune.com/partner/footer/294420061/');
?>

<footer class="site-footer milli cf">
<ul class="nav nav--fit footer-menu">
<li>&copy; <?php echo date("Y"); ?> Star Tribune</li>
<li><a class="btn btn--info btn--link open-nav">Menu</a></li>
<li><a class="btn btn--info btn--link" id="star-tribune-desktop-url"
   href="http://www.startribune.com/templates/full_site_redirect?rurl=http%3A%2F%2Fwww.startribune.com%2F">View desktop site</a></li>
</ul>
</footer>
</body>

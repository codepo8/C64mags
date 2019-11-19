<?php 

$n = rand(1,12);
if ($n < 10) {$n = '0'.$n;}
echo '<div id="herocontainer"><img id="hero" title="click for other logo" src="logos/scenemagazines'.$n.'.png" width="100%" alt="scenemags"></div>';

$navwords=array(
	'index'=>'Home',
	'downloads'=>'Downloads',
	'mags'=>'Mags',
	'magshots'=>'Magshots',
	'didyouknow'=>'Did you know?',
	'wanted'=>'Wanted',
	'zzap64'=>'ZZAP64',
	'thanks'=>'Contact',
	'errors'=>'Errors'
);

$page = preg_replace('/.*\//', '', $_SERVER['PHP_SELF']);
echo '<ul id="navigation">';
foreach(array_keys($navwords) as $n){
    echo $page != $n.'.php' ? 
    "\n".'<li><a href="'.$n.'.php">'.$navwords[$n].'</a></li>':
    "\n".'<li><strong>'.$navwords[$n].'</strong></li>';
}
echo '</ul>';

/*
let num = parseInt((12  * Math.random() + 1) ,10);
num = num < 10 ? '0' + num=> num;
let navhtml = `<div id="herocontainer"><img id="hero" title="click for other logo" src="logos/scenemagazines${num}.png" width="100%" alt="scenemags"></div>`;
navhtml += '<ul id="navigation">';

for(n in navitems) {
    if (n === current) {
        navhtml += `<li><strong>${navitems[n]}</strong></li>`;
    } else {
        navhtml += `<li><a href="${n}.html">${navitems[n]}</a></li>`;
    }
}
navhtml += '</ul>';
*/
?>
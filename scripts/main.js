const navitems = {
    'index':'Home',
    'downloads':'Downloads',
    'mags':'Mags',
    'magshots':'Magshots',
    'didyouknow':'Did you know?',
    'wanted':'Wanted',
    'zzap64':'ZZAP64',
    'thanks':'Contact',
    'errors':'Errors'
}
let urlitems = document.location.href.split('/');
let current = urlitems[urlitems.length-1].replace('.html','');

let num = parseInt((12  * Math.random() + 1) ,10);
num = num < 10 ? '0' + num: num;
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

document.querySelector('#nav').innerHTML = navhtml;

const hero = document.querySelector('#herocontainer');
hero.style.height = window.innerWidth * 0.18 + 'px'

document.querySelector('#hero').addEventListener('click',(ev) => {
    let num = parseInt((12  * Math.random() + 1) ,10);
    num = num < 10 ? '0' + num: num;
    document.querySelector('#hero').src = `logos/scenemagazines${num}.png`;
});

if (document.querySelector('#content')) {
    if (current === '') { current = "index"; }
    fetch(`content/${current}.html`).then(function(response) {
        return response.text();
    }).then(function(text) {
        document.querySelector('#content').innerHTML = text + document.querySelector('#content').innerHTML;
    });
}
fetch(`content/footer.html`).then(function(response) {
    return response.text();
}).then(function(text) {
    document.querySelector('#footer').innerHTML = text;
});

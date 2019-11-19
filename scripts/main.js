const hero = document.querySelector('#herocontainer');
hero.style.height = window.innerWidth * 0.18 + 'px'

document.querySelector('#hero').addEventListener('click',(ev) => {
    let num = parseInt((12  * Math.random() + 1) ,10);
    num = num < 10 ? '0' + num: num;
    document.querySelector('#hero').src = `logos/scenemagazines${num}.png`;
});

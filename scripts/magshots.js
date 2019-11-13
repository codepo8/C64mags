fetch('data/mags.json').then(function(response) {
    return response.text();
  }).then(function(text) {
    let magdata = JSON.parse(text);
    let filtered = magdata.mags.filter(m => m.i!=='');
    let html = '<ul id="shots" class="contentlist">';
    filtered.forEach(m => {
        html += `<li><a href="http://c64.rulez.org/onslaught/archive/${m.i}">${m.n} - ${m.t} by ${m.g}</a></li>`;
    });
    html += '<ul>';
    document.querySelector('#content').innerHTML += html;
    document.querySelector('#shots').addEventListener('click', (ev) => {
      ev.preventDefault();
      let t = ev.target;
      if (t.nodeName.toLowerCase() === 'a') {
        console.log('x');
        if (t.parentNode.hasimg) {
          t.parentNode.lastChild.remove();
          t.parentNode.hasimg = false;
        } else {
          let i = document.createElement('img');
          i.setAttribute('src', t.href);
          i.setAttribute('alt', t.innerText);
          t.parentNode.appendChild(i);
          t.parentNode.hasimg = true;
        }
      }
    });
});
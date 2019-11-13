fetch('data/mags.json').then(function(response) {
    return response.text();
  }).then(function(text) {
    let magdata = JSON.parse(text);
    let filtered = magdata.mags.filter(m => m.i!=='');
    let html = '<ul class="contentlist">';
    filtered.forEach(m => {
        html += `<li><a href="${m.i}">${m.n} - ${m.t} by ${m.g}</a></li>`;
    });
    html += '<ul>';
    document.querySelector('#content').innerHTML += html;
});
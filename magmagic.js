let magdata = {};
let datatypes = {};
function makedatasets(makedata){
    let groups = new Set();
    magdata.mags.forEach(m => {
        if(m.g) { groups.add(m.g); }
    });
    let mags = new Set();
    magdata.mags.forEach(m => {
        let realname = (m.n);
        realname = realname.replace(/ #.*/,'');
        realname = realname.replace(/ \d\d\d?\d?-.*/,'');
        mags.add(realname);
    });
    let types = new Set();
    magdata.mags.forEach(m => {
        types.add(m.t);
    });
    datatypes.types = Array.from(types).sort();
    datatypes.mags = Array.from(mags).sort();
    datatypes.groups = Array.from(groups).sort();
    let options = '';
    document.querySelector('#type').innerHTML += `
        <option>
            ${datatypes.types.join('</option><option>')}
        </option>
    `;
    function checkname(name) {
        let searchterm = document.querySelector('#name').value.toLowerCase();
        return (name.n.toLowerCase().match(new RegExp('^'+searchterm)));
    }
    function checkgroup(name) {
        let searchterm = document.querySelector('#group').value.toLowerCase();
        return (name.g.toLowerCase().match(new RegExp('^'+searchterm)));
    }
    function checktype(name) {
        let searchterm = document.querySelector('#type').value;
        return (name.t === searchterm);
    }
    function populatetable(ev) {
        let html = '';
        let dataset = magdata.mags;
        if(document.querySelector('#name').value!=='') {
            dataset = dataset.filter(checkname);
        }
        if(document.querySelector('#group').value!=='') {
            dataset = dataset.filter(checkgroup);
        }
        if(document.querySelector('#type').value!=='all') {
            dataset = dataset.filter(checktype);
        }
        document.querySelector('#results').innerText = `
            Found ${dataset.length} result${dataset.length!==1?'s':''}
        `;
        dataset.forEach(m => {
            html += `
                <tr>
                    <td><a href="${m.l}">${m.n}</a></td>
                    <td>${m.g}</td>
                    <td>${m.t}</td>
                    <td class="photo">${(m.i!=='')?'<a href="'+m.i+'">📸</a>':''}</td>
                    <td>${m.c}</td>
                </tr>                
            `;
        });
        document.querySelector('tbody').innerHTML = html;
        ev.preventDefault();
    }
    document.querySelector('form').addEventListener('submit', populatetable);
    document.querySelector('#name').addEventListener('keyup', populatetable);
    document.querySelector('#group').addEventListener('keyup', populatetable);
    document.querySelector('#type').addEventListener('change', populatetable);
}
fetch('mags.json').then(function(response) {
    return response.text();
  }).then(function(text) {
    magdata = JSON.parse(text);
    makedatasets(magdata);
});
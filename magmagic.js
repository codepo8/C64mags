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
        realname = realname.replace(/ -.*/,'');
        mags.add(realname);
    });
    let types = new Set();
    magdata.mags.forEach(m => {
        types.add(m.t);
    });
    datatypes.types = Array.from(types).sort();
    datatypes.products = Array.from(mags).sort();
    datatypes.groups = Array.from(groups).sort();
    let options = '';
    document.querySelector('#type').innerHTML += `
        <option>
            ${datatypes.types.join('</option><option>')}
        </option>
    `;
    document.querySelector('#numbers').innerHTML = `
        Currently serving ${datatypes.products.length} <a href="index.html?products">products</a> of ${datatypes.types.length} types from ${datatypes.groups.length} <a href="index.html?groups">groups</a>. Overall ${magdata.mags.length} products.
    `;
    document.querySelector('#numbers').addEventListener('click',(ev) => {
        hideall();
        if (ev.target.nodeName === "A") {
            let target = ev.target.href.split('?')[1];
            let listdata = datatypes[target];
            let html = '<li>';

            listdata.forEach(item => {
                html += `<a href="index.html?${target.substr(0,1)}=${item}">
                ${item}</a></li><li>`;
            });
            html += '</li>';
            document.querySelector('#'+target).classList.remove('hide');
            document.querySelector('#'+target).innerHTML = html;
            ev.preventDefault();
        }
    });
    document.querySelector('#groups').addEventListener('click',(ev) => {
        if (ev.target.nodeName === "A") {
            let target = ev.target.href.split('?g=')[1];
            target = decodeURIComponent(target);
            document.querySelector('#group').value = target;
            document.querySelector('#name').value = '';
            document.querySelector('#type').value = "all"
            populatetable(null);
            ev.preventDefault();
        }
    });
    document.querySelector('#products').addEventListener('click',(ev) => {
        if (ev.target.nodeName === "A") {
            let target = ev.target.href.split('?p=')[1];
            target = decodeURIComponent(target);
            document.querySelector('#name').value = target;
            document.querySelector('#group').value = '';
            document.querySelector('#type').value = "all"
            populatetable(null);
            ev.preventDefault();
        }
    });
    function hideall() {
        document.querySelector('#results').classList.add('hide');
        document.querySelector('#resultstable').classList.add('hide');
        document.querySelector('#groups').classList.add('hide');
        document.querySelector('#products').classList.add('hide');
    }
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
        hideall();
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
        document.querySelector('#resultstable').classList.remove('hide');
        document.querySelector('#results').classList.remove('hide');
        if (ev) {
            ev.preventDefault();
        }
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
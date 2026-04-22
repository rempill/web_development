// handles classic and vertical table rendering and sorting
function sortTableData(data, key, asc) {
    function parsePret(val) {
        // Extract number from '35 lei', '1200 lei', etc.
        if (typeof val === 'string') {
            const m = val.match(/(\d+)/);
            return m ? parseInt(m[1], 10) : 0;
        }
        return val;
    }
    function parseGramaj(val) {
        // Convert '1kg', '250g', '40g', etc. to grams
        if (typeof val === 'string') {
            let m = val.match(/(\d+(?:\.\d+)?)(kg|g)/);
            if (m) {
                let num = parseFloat(m[1]);
                if (m[2] === 'kg') return num * 1000;
                return num;
            }
        }
        return val;
    }
    return data.slice().sort((a, b) => {
        let va = a[key];
        let vb = b[key];
        if (key === 'pret') {
            va = parsePret(va);
            vb = parsePret(vb);
        } else if (key === 'gramaj') {
            va = parseGramaj(va);
            vb = parseGramaj(vb);
        }
        if (va < vb) return asc ? -1 : 1;
        if (va > vb) return asc ? 1 : -1;
        return 0;
    });
}

function renderClassicTable(container, data, sortKey, asc) {
    const keys = Object.keys(data[0]);
    let html = '<table><thead><tr>';
    keys.forEach(k => {
        html += `<th class="sortable${sortKey===k?' sorted':''}" data-key="${k}">${k}</th>`;
    });
    html += '</tr></thead><tbody>';
    data.forEach(row => {
        html += '<tr>' + keys.map(k => `<td>${row[k]}</td>`).join('') + '</tr>';
    });
    html += '</tbody></table>';
    container.innerHTML = html;
    container.querySelectorAll('th.sortable').forEach(th => {
        th.onclick = function() {
            const key = th.getAttribute('data-key');
            renderClassicTable(container, sortTableData(data, key, sortKey===key?!asc:true), key, sortKey===key?!asc:true);
        };
    });
}

function renderVerticalTable(container, data, sortKey, asc) {
    const keys = Object.keys(data[0]);
    let html = '<table><tbody>';
    keys.forEach(k => {
        html += `<tr><th class="sortable${sortKey===k?' sorted':''}" data-key="${k}">${k}</th>`;
        data.forEach(row => {
            html += `<td>${row[k]}</td>`;
        });
        html += '</tr>';
    });
    html += '</tbody></table>';
    container.innerHTML = html;
    container.querySelectorAll('th.sortable').forEach(th => {
        th.onclick = function() {
            const key = th.getAttribute('data-key');
            renderVerticalTable(container, sortTableData(data, key, sortKey===key?!asc:true), key, sortKey===key?!asc:true);
        };
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Classic table (menu)
    if (typeof menuTableData !== 'undefined') {
        const classic = document.getElementById('classic-menu-table');
        if (classic) renderClassicTable(classic, menuTableData, null, true);
    }
    // Vertical table (lots)
    if (typeof lotsTableData !== 'undefined') {
        const vertical = document.getElementById('vertical-comparison-table');
        if (vertical) renderVerticalTable(vertical, lotsTableData, null, true);
    }
});

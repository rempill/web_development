// handles collapsible nested lists
function createList(data) {
    const ul = document.createElement('ul');
    data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.title;
        if (item.children && item.children.length) {
            li.classList.add('expandable');
            const sub = createList(item.children);
            sub.classList.add('nested');
            li.appendChild(sub);
            li.onclick = function(e) {
                e.stopPropagation();
                sub.classList.toggle('visible');
                li.classList.toggle('expanded');
            };
        }
        ul.appendChild(li);
    });
    return ul;
}

document.addEventListener('DOMContentLoaded', function() {
    if (typeof nestedListData === 'undefined') return;
    const container = document.getElementById('nested-about-list');
    if (container) {
        container.appendChild(createList(nestedListData));
    }
});


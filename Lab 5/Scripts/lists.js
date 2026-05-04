// handles collapsible nested lists
function createList(data) {
    const $ul = $('<ul>');
    data.forEach(item => {
        const $li = $('<li>');
        $li.text(item.title);
        if (item.children && item.children.length) {
            $li.addClass('expandable');
            const $sub = createList(item.children);
            $sub.addClass('nested');
            $li.append($sub);
            $li.on('click',function(e) {
                e.stopPropagation();
                $sub.toggleClass('visible');
                $li.toggleClass('expanded');
            });
        }
        $ul.append($li);
    });
    return $ul;
}

$(function() {
    if (typeof nestedListData === 'undefined') return;
    const $container = $('#nested-about-list');
    if ($container.length>0) {
        $container.append(createList(nestedListData));
    }
});


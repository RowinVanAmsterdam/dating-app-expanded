var tagList = document.getElementsByClassName('deleteButton');
for (var i = 0; i < tagList.length; i++) {
    var remove = tagList[i].getElementsByClassName('remove');
    if (remove.length) {
        remove[0].addEventListener('click', onremove);
    }
}

function onremove(ev) {
    var node = ev.target;
    var id = node.dataset.id || node.parentElement.dataset.id;
    var res = new XMLHttpRequest();

    res.open('DELETE', '/' + id);
    res.onload = onload;
    res.send();

    function onload() {
        if (res.status !== 200) {
            throw new Error('Kan de tag niet verwijderen!');
        }
        window.location = '/personalTag';
    }
}
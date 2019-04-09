
var tagList = document.getElementsByClassName('deleteButton');
// This is for every element with the class 'del', so all the games on the profile
for(var i = 0; i < tagList.length; i++) {
    // gets the cross
    var remove = tagList[i].getElementsByClassName('remove');
    // Another check for the crosses to be sure
    if(remove.length) {
        // add the event handler for each cross. All the crosses needs to be looped
        // over so that its not only one. Error fixed by changing it up to class
        // instead of IDs.
        remove[0].addEventListener('click', onremove);
    }			
}

function onremove(ev) {
    let node = ev.target;
    let id = node.dataset.id || node.parentElement.dataset.id;
    let res = new XMLHttpRequest();

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
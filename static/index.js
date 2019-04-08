const remove = document.getElementById("deleteButton");

if (remove) {
    remove.addEventListener("click", onremove);
}

function onremove(ev) {
    let node = ev.target;
    let userId = node.dataset.id;
    let res = new XMLHttpRequest();

    res.open("DELETE",  "/" + userId);
    res.onload = onload;
    res.send();

    function onload() {
        if (res.status !== 200) {
            throw new Error("Kan de tag niet verwijderen!");
        }
        window.location = "/searchLocation";
    }
}
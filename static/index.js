var remove = document.getElementById('deleteButton')

if (remove) {
  remove.addEventListener('click', onremove)
}

function onremove(ev) {
  var node = ev.target
  var id = node.dataset.id
  var res = new XMLHttpRequest()

  res.open('DELETE', '/' + id)
  res.onload = onload
  res.send()

  function onload() {
    if (res.status !== 200) {
      throw new Error('Kan de gebruiker niet verwijderen!')
    }
    window.location = '/users'
  }
}
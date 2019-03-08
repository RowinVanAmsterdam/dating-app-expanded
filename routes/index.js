const express = require('express');
var router = express.Router(); 


router.get('/', onHome)
router.post('/', add)
router.put('/', update)
router.delete('/', remove)


function onHome(req, res) {
    res.send({
        type: 'GET'
    })
}

function add(req, res) {
    res.send({
        type: 'POST'
    });
}

function update(req, res) {
    res.send({
        type: 'PUT'
    })
}

function remove(req, res) {
    res.send({
        type: 'DELETE'
    })
}

module.exports = router;
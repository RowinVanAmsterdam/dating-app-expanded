const express = require('express');
var router = express.Router(); 


router.get('/login', get)
router.post('/login', add)
router.put('/login', update)
router.delete('/login', remove)


function get(req, res) {
    res.render('login.ejs')
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
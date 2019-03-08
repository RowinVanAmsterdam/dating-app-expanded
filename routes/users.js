const express = require('express');
var router = express.Router(); 

var data = [{
    id: '1',
    name: 'Hailey Felton',
    age: '20',
    gender: 'female'
},
{
    id: '2',
    name: 'John Marton',
    age: '22',
    gender: 'male'
}
]

router.get('/users', get)
router.post('/users', add)
router.put('/users', update)
router.delete('/users', remove)


function get(req, res) {
    res.render('allUsers.ejs', {
        data: data
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
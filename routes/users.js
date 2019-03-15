const express = require('express');
var router = express.Router();
var find = require('array-find');
const slug = require('slug');
const bodyParser = require('body-parser');
var multer = require('multer')

var upload = multer({dest: 'static/upload/'})
var data = [{
        id: 'hailey-felton',
        name: 'Hailey Felton',
        age: '20',
        description: 'Hallo dit is Hailey'
    },
    {
        id: 'johan-marton',
        name: 'John Marton',
        age: '22',
        description: 'Hallo dit is John'
    }
]

router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json());
router.get('/users', get)
router.post('/users', upload.single('cover'), add)
router.put('/users', update)
router.delete('/:id', remove)
router.get('/add', form)
router.get('/:id', user)

function user(req, res, next) {
    var id = req.params.id
    var user = find(data, function (value) {
        return value.id === id
    })

    if (!user) {
        next()
        return
    }
    res.render('detail.ejs', {
        data: user
    })
}


function get(req, res) {
    res.render('allUsers.ejs', {
        data: data
    })
}

function add(req, res) {
    var id = slug(req.body.name).toLowerCase()

    data.push({
        id: id,
        cover: req.file ? req.file.filename : null,
        name: req.body.name,
        age: req.body.age,
        description: req.body.description
    })

    res.redirect('/' + id)
}

function update(req, res) {
    res.send({
        type: 'PUT'
    })
}

function remove(req, res) {
    var id = req.params.id

  data = data.filter(function (value) {
    return value.id !== id
  })

  res.json({status: 'ok'})

}

function form(req, res) {
    res.render('add.ejs')
}


module.exports = router;
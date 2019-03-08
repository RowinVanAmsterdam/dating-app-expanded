// bron: https://github.com/cmda-bt/be-course-18-19/tree/master/examples/express-server
const express = require('express');
const app = express();
var routes = require('./routes');

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


    app.use(express.static('static'))
    app.use('/', routes)
    app.set('view engine', 'ejs')
    app.set('views', 'view')
    app.get('/login', loginGet)
    app.get('/allUsers', allUsersGet)
    app.use(notFound)
    app.listen(8000)


function loginGet(req, res) {
    res.render('login.ejs')
}

function allUsersGet(req, res) {
    res.render('allUsers.ejs', {
        data: data
    })
}

function notFound(req, res) {
    res.status(404).render('not-found.ejs')
}

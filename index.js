// bron: https://github.com/cmda-bt/be-course-18-19/tree/master/examples/express-server
const express = require('express');

// Require Routes
var routes = require('./routes');
var aboutRouter = require('./routes/about');
var login = require('./routes/login');
var users = require('./routes/users');

// Use Routes
express()
.use(routes)
.use(aboutRouter)
.use(login)
.use(users)

.use(express.static('static'))
.use('/static/images/', express.static('./static/images'))
.set('view engine', 'ejs')
.set('views', 'view')
.use(notFound)
.listen(8000)


function notFound(req, res) {
    res.status(404).render('not-found.ejs');
}
// bron: https://github.com/cmda-bt/be-course-18-19/tree/master/examples/express-server
const express = require('express');
const app = express();

// Require Routes
var routes = require('./routes');
var aboutRouter = require('./routes/about')
var login = require('./routes/login')
var users = require('./routes/users')

// Use Routes
app.use(routes)
app.use(aboutRouter)
app.use(login)
app.use(users)

app.use(express.static('static'))
app.set('view engine', 'ejs')
app.set('views', 'view')
app.use(notFound)
app.listen(8000)

function notFound(req, res) {
    res.status(404).render('not-found.ejs')
}
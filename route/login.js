var express = require('express');
var session = require('express-session');
var router = express.Router();
var bodyParser = require('body-parser');
var mongo = require('mongodb');

require('dotenv').config();

var db = null;
var url = process.env.MONGODB_URI;

mongo.MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, client) {
    if (err) throw err;
    db = client.db('MatchTag');
});

router
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(bodyParser.json())
    .use(session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET
    }))
    .get('/login', renderPage)
    .post('/login', checkUser);

function checkUser(req, res) {
    var email = req.body.email;
    db.collection('members').findOne({
        email: email
    }, done);

    function done(err, user) {
        if (user && user.password === req.body.password) {
            req.session.user = user;
            res.redirect('searchLocation');
        } else {
            res.redirect('login');
        }
    }
}

function renderPage(req, res, data) {
    if (req.session.user) {
        res.render('login.ejs', {
            data: data,
            user: req.session.user
        });
    } else {
        res.render('login.ejs', {
            data: data,
            user: req.session.user
        });
    }
}

module.exports = router;
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const mongo = require('mongodb');

require('dotenv').config();

let db = null;
let url = process.env.MONGODB_URI;

mongo.MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, client) {
    if (err) throw err;
    db = client.db('MatchTag');
});

var upload = multer({
    dest: 'static/upload/'
});

router
    .use(express.static('static'))
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(bodyParser.json())
    .get('/register', renderPage)
    .get('/register', register)
    .post('/register', upload.single('cover'), register);

function renderPage(req, res) {
    res.render('register.ejs');
}

function register(req, res, next) {
    db.collection('members').insertOne({
        cover: req.file ? req.file.filename : null,
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        age: req.body.age,
        pickupline: req.body.pickupline,
        description: req.body.description
    }, done);

    function done(err) {
        if (err) {
            next(err);
        } else {
            res.redirect('/login');
        }
    }
}

module.exports = router;
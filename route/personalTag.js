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
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .post('/register', upload.single('cover'), get)
    .get('/personalTag', get);

function get(req, res, next) {
    if (req.session.user) {
        let user = req.session.user;
        db.collection('red_dead_redemption_2').findOne(user, done);

        function done(err, data) {
            if (err) {
                next(err);

            } else {
                res.render('personalTag.ejs', {
                    data: data,
                    user: req.session.user
                });
            }
        }} else {
        res.status(401).render('credsrequired.ejs');
    }
}

module.exports = router;
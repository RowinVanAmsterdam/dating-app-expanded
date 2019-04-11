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
    .post('/register', upload.single('cover'), showList)
    .get('/personalTag', showList)
    .delete('/:id', remove);

function showList(req, res, next) {
    if (req.session.user) {
        let user = req.session.user;

        db.collection('Red Dead Redemption 2').find({
            'name': user.name
        }, done);
    } else {
        res.status(401).render('credsrequired.ejs');
    }

    async function done(err, data) {
        if (err) {
            next(err);

        } else {
            let tagData = await data.toArray();
            res.render('personalTag.ejs', {
                data: tagData,
                user: req.session.user
            });
        }
    }
}

function remove(req, res, next) {
    let id = req.params.id;

    db.collection('Red Dead Redemption 2').deleteOne({
        _id: mongo.ObjectID(id)
    }, done);

    function done(err) {
        if (err) {
            next(err);
        } else {
            res.json({
                status: 'ok'
            });
        }
    }
}

module.exports = router;
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const mongo = require('mongodb');
const methodOverride = require('method-override');

require('dotenv').config();

let db = null;
let url = process.env.MONGODB_URI;

mongo.MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, client) {
    if (err) throw err;
    db = client.db('MatchTag');
});

const upload = multer({
    dest: 'static/upload/'
});

router
    .use(express.static('static'))
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(methodOverride('_method'))
    .get('/droppedTags', get)
    .post('/droppedTags', upload.single('cover'), add)
    .get('/add', form)
    .get('/:id', finduser)
    .put('/:id/like', superlikeProfile)
    .delete('/:id', remove);



function finduser(req, res, next) {
    let id = req.params.id;
    db.collection('red_dead_redemption_2').findOne({
        _id: mongo.ObjectID(id)
    }, done);

    function done(err, data) {
        if (err) {
            next(err);

        } else {
            res.render('detail.ejs', {
                data: data,
                user: req.session.user
            });
        }
    }
}

function get(req, res, next) {
    if (req.session.user) {
        db.collection('red_dead_redemption_2').find().toArray(done);

        function done(err, data) {
            if (err) {
                next(err);
            } else {
                res.render('droppedTags.ejs', {
                    data: data,
                    user: req.session.user
                });
            }
        }} else {
        res.status(404).render('credsrequired.ejs');
    }
}

function add(req, res, next) {
    db.collection('red_dead_redemption_2').insertOne({
        name: req.body.name,
        cover: req.file ? req.file.filename : null,
        age: req.body.age,
        pickupline: req.body.pickupline,
        description: req.body.description
    }, done);

    function done(err, data) {
        if (err) {
            next(err);
        } else {
            res.redirect('/' + data.insertedId);
        }
    }
}

function remove(req, res, next) {
    let id = req.params.id;
    db.collection('red_dead_redemption_2').deleteOne({
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

function form(req, res, next) {
    if (req.session.user) {
        let user = req.session.user;
        db.collection('members').findOne(user, done);

        function done(err, data) {
            if (err) {
                next(err);

            } else {
                res.render('add.ejs', {
                    data: data,
                    user: req.session.user
                });
            }
        }
    } else {
        res.status(401).render('credsrequired.ejs');
    }
}

function superlikeProfile(req, res, next) {
    var id = req.params.id;

    db.collection('red_dead_redemption_2').updateOne({
        _id: mongo.ObjectID(id)
    }, {
        $set: {
            likes: [
                mongo.ObjectID(req.session.user._id), //gives the user.id of the superliker
            ]
        },
    }, {
        upsert: true
    }, done);

    function done(err) {
        if (err) {
            next(err);
        } else {
            res.redirect('/' + id);
        }
    }
}

module.exports = router;
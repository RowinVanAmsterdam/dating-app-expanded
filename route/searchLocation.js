/* eslint-disable no-inner-declarations */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var mongo = require('mongodb');
var methodOverride = require('method-override');

require('dotenv').config();

var db = null;
var url = process.env.MONGODB_URI;

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
    .use(methodOverride('_method'))
    .get('/searchLocation', renderPage)
    .post('/:id', upload.single('cover'), add)
    .get('/:id/add', dropTag)
    .get('/:id', finduser)
    .get('/:id/:userId', detailUser)
    .put('/:id/:userId/like', superlikeProfile)
    .delete('/:id/:userId/unlike', unlikeProfile)
    .post('/delete/:id/:userId', remove);


function renderPage(req, res, next) {
    db.listCollections({
        name: {
            $ne: 'members'
        }
    }).toArray(done);

    function done(err, data) {
        if (err) {
            next(err);
        } else {
            res.render('searchLocation.ejs', {
                data: data,
                user: req.session.user
            });
        }
    }
}

function finduser(req, res) {
    db.collection(req.params.id).find().toArray(done);

    function done(err, data) {

        if (err) {
            res.render('not-found.ejs');

        } else {
            res.render('collPage.ejs', {
                data: data,
                collTitle: req.params.id,
                user: req.session.user
            });
        }
    }
}

function detailUser(req, res, next) {
    var id = req.params.userId;
    db.collection(req.params.id).findOne({
        _id: mongo.ObjectID(id)
    }, done);

    function done(err, data) {
        if (err) {
            next(err);

        } else {
            res.render('detail.ejs', {
                data: data,
                collTitle: req.params.id,
                userId: req.params.userId,
                user: req.session.user
            });
        }
    }
}

function add(req, res, next) {
    db.collection(req.params.id).insertOne({
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
            res.redirect('/' + req.params.id + '/' + data.insertedId);
        }
    }
}

function dropTag(req, res, next) {
    if (req.session.user) {
        var user = req.session.user;
        db.collection('members').findOne(user, done);

        function done(err, data) {
            if (err) {
                next(err);

            } else {
                res.render('add.ejs', {
                    data: data,
                    collTitle: req.params.id,
                    user: req.session.user
                });
            }
        }
    } else {
        res.status(401).render('credsrequired.ejs');
    }
}

function remove(req, res, next) {
    db.collection(req.params.id).deleteOne({
        _id: mongo.ObjectID(req.params.userId)
    }, done);

    function done(err) {
        if (err) {
            next(err);
        } else {
            res.redirect('/' + req.params.id);
        }
    }
}

function superlikeProfile(req, res, next) {
    var userId = req.params.userId;
    db.collection(req.params.id).updateOne({
        _id: mongo.ObjectID(userId),
        'likes': {
            $ne: mongo.ObjectID(req.session.user._id)
        }
    }, {
        $push: {
            likes: mongo.ObjectID(req.session.user._id),
        },
    }, done);

    function done(err) {
        if (err) {
            next(err);
        } else {
            res.redirect('/' + req.params.id + '/' + userId);
        }
    }
}

function unlikeProfile(req, res, next) {
    var userId = req.params.userId;
    db.collection(req.params.id).updateOne({
        _id: mongo.ObjectID(userId)
    }, {
        $pull: {
            likes: mongo.ObjectID(req.session.user._id),
        },
    }, done);

    function done(err) {
        if (err) {
            next(err);
        } else {
            res.redirect('/' + req.params.id + '/' + userId);
        }
    }
}

module.exports = router;
/* eslint-disable no-inner-declarations */
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
    .get('/personalTag', get)
    .delete('/:id', remove);

function get(req, res, next) {

    if (req.session && req.session.user) {
        let user = req.session.user;
        db.collection('red_dead_redemption_2').aggregate([
            {$lookup: {from: 'Apex Legends',localField: 'name',foreignField: 'name', as: 'userData'}},
            {$match: {'name': user.name}},
            /*{
                $replaceRoot: { newRoot: { $mergeObjects: [ {$arrayElemAt: ['$userData', 0]}, '$ROOT']}}
            },
            { $project: { userData: 0 } }*/
        ], done);

        async function done(err, data) {
            if (err) {
                next(err);
    
            } else {
                let tagData = await data.toArray();

                tagData = [...tagData, ...tagData[0].userData];

                res.render('personalTag.ejs', {
                    data: tagData,
                    user: req.session.user
                });
            }
        }
    }
    else {
        res.status(401).render('credsrequired.ejs');
    }
}

// function get(req, res, next) {
//     if (req.session.user) {
//         let user = req.session.user;

//         db.collection('red_dead_redemption_2').find(
//             {'name': user.name}, done);
//     } else {
//         res.status(401).render('credsrequired.ejs');
//     }

//     async function done(err, data) {
//         if (err) {
//             next(err);

//         } else {
//             let tagData = await data.toArray();
//             console.log(tagData);
//             res.render('personalTag.ejs', {
//                 data: tagData,
//                 user: req.session.user
//             });
//         }
//     }
// }

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

module.exports = router;
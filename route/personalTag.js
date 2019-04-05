const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const multer = require("multer");
const mongo = require("mongodb");

require("dotenv").config();

let db = null;
let url = process.env.MONGODB_URI;

mongo.MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, client) {
    if (err) throw err;
    db = client.db("MatchTag");
});

var upload = multer({
    dest: "static/upload/"
});

router
    .use(express.static("static"))
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .post("/register", upload.single("cover"), get)
    .get("/personalTag", get)
    .get('/:id', findTag);

function get(req, res, next) {
    if (req.session.user) {
        let user = req.session.user;
        db.collection("red_dead_redemption_2").findOne(user, done);

        function done(err, data) {
            if (err) {
                next(err);

            } else {
                res.render("personalTag.ejs", {
                    data: data,
                    user: req.session.user
                });
            }
        }} else {
        res.status(401).render("credsrequired.ejs");
    }
}

function findTag(req, res, next) {
    let id = req.params.id;
    db.collection("red_dead_redemption_2").findOne({
        _id: mongo.ObjectID(id)
    }, done);

    function done(err, data) {
        if (err) {
            next(err);

        } else {
            res.render("detail.ejs", {
                data: data,
                user: req.session.user
            });
        }
    }
}

// function showTag(req, res) {
//     // Query that was made to find the profile with _id: 1
//     db.collection('red_dead_redemption_2').findOne({
//         _id: 1,
//         // Runs the done function after the query
//     }, done);
//     function done(err, data) {
//         if (err) {
//             next(err);
//         }
//         else {
//             // Giving data through with the res.render
//             res.render('profile/profile.pug', {data: data});
//         }
//     }
// }



module.exports = router;
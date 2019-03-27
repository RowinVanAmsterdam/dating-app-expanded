const express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
var multer = require("multer");
var mongo = require("mongodb");

require("dotenv").config();

var db = null;
var url = process.env.MONGODB_URI;

mongo.MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, client) {
    if (err) throw err;
    db = client.db("DatingApp");
});

var upload = multer({
    dest: "static/upload/"
});

router
    .use(express.static("static"))
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .post("/register", upload.single("cover"), get)

    .get("/personalTag", get);

// function get(req, res, next) {

//     var user = req.session.user;
//     db.collection("pretparken").findOne(user, done);

//     function done(err, data) {
//         if (err) {
//             next(err);

//         } else {
//             res.render("personalTag.ejs", {
//                 data: data,
//                 user: req.session.user
//             });
//         }
//     }
// }

function get(req, res, next) {
    if (req.session.user) {
        var user = req.session.user;
        db.collection("pretparken").findOne(user, done);

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

module.exports = router;
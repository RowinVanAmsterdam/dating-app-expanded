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

const upload = multer({
    dest: "static/upload/"
});

router
    .use(express.static("static"))
    .use(bodyParser.urlencoded({
        extended: true
    }))

    .get("/searchLocation", get)
    .get("/red_dead_redemption_2", finduser)
    .get("/:id", finduser);

function get(req, res, next) {
    db.listCollections().toArray(done);
    
    function done(err, data) {
        if (err) {
            next(err);
        } else {
            res.render("searchLocation.ejs", {
                data: data,
                user: req.session.user
            });
            console.log(data)
        }
    }
}

function finduser(req, res, next) {

    console.log("test of dit wordt uitgevoerd.")
    // let id = req.params.id;
    // db.collection("red_dead_redemption_2").findOne({
    //     _id: mongo.ObjectID(id)
    // }, done);


    // db.listCollections().toArray(done);
    db.collection("red_dead_redemption_2").find().toArray(done);
    function done(err, data) {
        if (err) {
            next(err);

        } else {
            res.render("collPage.ejs", {
                data: data,
                user: req.session.user
            });
            console.log(data.name)
        }
    }
}

// function get(req, res) {
//     res.render("searchLocation.ejs");
// }

module.exports = router;
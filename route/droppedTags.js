const express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
var multer = require("multer");
var mongo = require("mongodb");

require("dotenv").config();

// const dbuser = process.env.DB_USER;
// const dbpassword = process.env.DB_PASSWORD;
// const dbcluster = process.env.DB_CLUSTER;
// const dbhost = process.env.HOST;
// const dbname = process.env.DB_NAME;

const dbuser = "Rowin";
const dbpassword = "rowin";
const dbcluster = "datingapp";
const dbhost = "bhe3v.azure.mongodb.net";
const dbname = "DatingApp";

var db = null;
var url = `mongodb+srv://${dbuser}:${dbpassword}@${dbcluster}-${dbhost}/${dbname}`;
// process.env.MONGODB_URI

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
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .get("/droppedTags", get)
    .post("/droppedTags", upload.single("cover"), add)
    .get("/add", form)
    .get("/:id", finduser)
    .delete("/:id", remove);


function finduser(req, res, next) {
    var id = req.params.id;
    db.collection("pretparken").findOne({
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

function get(req, res, next) {
    if (req.session.user) {
        db.collection("pretparken").find().toArray(done);

        function done(err, data) {
            if (err) {
                next(err);
            } else {
                res.render("droppedTags.ejs", {
                    data: data,
                    user: req.session.user
                });
            }
        }} else {
        res.status(404).render("credsrequired.ejs");
    }
}

function add(req, res, next) {
    db.collection("pretparken").insertOne({
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
            res.redirect("/" + data.insertedId);
        }
    }
}

function remove(req, res, next) {
    var id = req.params.id;
    db.collection("pretparken").deleteOne({
        _id: mongo.ObjectID(id)
    }, done);

    function done(err) {
        if (err) {
            next(err);
        } else {
            res.json({
                status: "ok"
            });
        }
    }
}

function form(req, res, next) {
    if (req.session.user) {
        var user = req.session.user;
        db.collection("members").findOne(user, done);

        function done(err, data) {
            if (err) {
                next(err);

            } else {
                res.render("add.ejs", {
                    data: data,
                    user: req.session.user
                });
            }
        }
    } else {
        res.status(401).render("credsrequired.ejs");
    }
}

module.exports = router;
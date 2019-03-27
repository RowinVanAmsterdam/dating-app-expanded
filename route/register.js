const express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
var multer = require("multer");
var mongo = require("mongodb");

require("dotenv").config();

var db = null;
var url = process.env.DB_HOST;

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
    .get("/register", get)
    .get("/register", add)
    .post("/register", upload.single("cover"), add);


function get(req, res) {
    res.render("register.ejs");
}


function add(req, res, next) {
    db.collection("members").insertOne({
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
            res.redirect("/login");
        }
    }
}

module.exports = router;
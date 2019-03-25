const express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
var multer = require("multer");
var mongo = require("mongodb");

require("dotenv").config();

var db = null;
var url = "mongodb://" + process.env.DB_HOST + ":" + process.env.DB_PORT;

mongo.MongoClient.connect(url, {useNewUrlParser: true }, function (err, client) {
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
    .get("/droppedTags", get)
    .post("/droppedTags", upload.single("cover"), add)
    .put("/droppedTags", update)
    .get("/add", form)
    .get("/:id", user)
    .delete("/:id", remove);

    
function user(req, res, next) {
    var id = req.params.id;
    db.collection("pretparken").findOne({
        _id: mongo.ObjectID(id)
    }, done);
    
    function done(err, data) {
        if (err) {
            next(err);
            
        } 
        else {
            res.render("detail.ejs", {data: data,
                user: req.session.user});
        }
    }
}



function get(req, res, next) {
    db.collection("pretparken").find().toArray(done);
  
    function done(err, data) {
        if (err) {
            next(err);
        } else {
            res.render("droppedTags.ejs", {data: data,
                user: req.session.user});
        }
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

function update(req, res) {
    res.send({
        type: "PUT"
    });
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
            res.json({status: "ok"});
        }
    }
}

function form(req, res) {
    res.render("add.ejs");
}

module.exports = router;
const express = require("express");
var router = express.Router();
// var find = require("array-find");
// const slug = require("slug");
const bodyParser = require("body-parser");
var multer = require("multer");
var mongo = require("mongodb");

require("dotenv").config();

var db = null;
var url = "mongodb://" + process.env.DB_HOST + ":" + process.env.DB_PORT;

mongo.MongoClient.connect(url, {useNewUrlParser: true }, function (err, client) {
    if (err) throw err;
    db = client.db(process.env.DB_NAME);
});

var upload = multer({
    dest: "static/upload/"
});

// var data = [{
//     id: "hailey-felton",
//     name: "Hailey Felton",
//     age: "20",
//     description: "Hallo dit is Hailey"
// },
// {
//     id: "johan-marton",
//     name: "John Marton",
//     age: "22",
//     description: "Hallo dit is John"
// }
// ];

router
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())

    .get("/users", get)
    .post("/users", upload.single("cover"), add)
    .put("/users", update)
    .get("/add", form)
    .get("/:id", user)
    .delete("/:id", remove);
    

function user(req, res, next) {
    var id = req.params.id;
    db.collection("movie").findOne({
        _id: mongo.ObjectID(id)
    }, done);
    
    function done(err, data) {
        if (err) {
            next(err);
        } else {
            res.render("detail.ejs", {data: data});
        }
    }
    
    // var user = find(data, function (value) {
    //     return value.id === id;
    // });

    // if (!user) {
    //     next();
    //     return;
    // }
    // res.render("detail.ejs", {
    //     data: user
    // });
}


// function get(req, res) {
//     res.render("allUsers.ejs", {
//         data: data
//     });
// }

function get(req, res, next) {
    db.collection("movie").find().toArray(done);
  
    function done(err, data) {
        if (err) {
            next(err);
        } else {
            res.render("allUsers.ejs", {data: data});
        }
    }
}
  

function add(req, res, next) {
    db.collection("movie").insertOne({
        title: req.body.title,
        cover: req.file ? req.file.filename : null,
        plot: req.body.plot,
        description: req.body.description
    }, done);
    
    function done(err, data) {
        if (err) {
            next(err);
        } else {
            res.redirect("/" + data.insertedId);
        }
    }
    
    // var id = slug(req.body.name).toLowerCase();

    // data.push({
    //     id: id,
    //     cover: req.file ? req.file.filename : null,
    //     name: req.body.name,
    //     age: req.body.age,
    //     description: req.body.description
    // });

    // res.redirect("/" + id);
}

function update(req, res) {
    res.send({
        type: "PUT"
    });
}

function remove(req, res, next) {
    var id = req.params.id;
    db.collection("movie").deleteOne({
        _id: mongo.ObjectID(id)
    }, done);
    
    function done(err) {
        if (err) {
            next(err);
        } else {
            res.json({status: "ok"});
        }
    }
    

    // data = data.filter(function (value) {
    //     return value.id !== id;
    // });

    // res.json({
    //     status: "ok"
    // });

}

function form(req, res) {
    res.render("add.ejs");
}


module.exports = router;
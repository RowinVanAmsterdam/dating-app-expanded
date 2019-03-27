const express = require("express");
var session = require("express-session");
var router = express.Router();
const bodyParser = require("body-parser");
var mongo = require("mongodb");
const MongoStore = require("connect-mongo")(session);

require("dotenv").config();

var db = null;
var url = process.env.MONGODB_URI;


mongo.MongoClient.connect(url, 
     {
      user:'Rowin',
      password:'rowin'
    }, {useNewUrlParser: true }, function (err, client) {
    if (err) throw err;
    db = client.db("DatingApp");
});

router
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .use(session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        store: new MongoStore({ url: "mongodb://localhost:27017/DatingApp"})
    }))
    .get("/login", get)
    .post("/login", checkUser);

    

//https://stackoverflow.com/questions/39759287/mongodb-express-how-to-verify-login-credentials-using-db-collection-findone

function checkUser(req, res) {
    var email = req.body.email;
    db.collection("members").findOne({
        email: email
    }, done);

    function done(err, user) {
        if(err) {
            console.log("THIS IS ERROR RESPONSE");
            res.json(err);
        } 
        if (user && user.password === req.body.password){
            console.log("User and password is correct");
            console.log(user._id);
            req.session.user = user;
            console.log("next rule");
            console.log(req.session.user);
            res.redirect("searchLocation");
        } else {
            console.log("Credentials wrong");
            res.json({err});
        }         
    }
}

function get(req, res, data) {
    if (req.session.user) {
        res.render("login.ejs", {
            data: data,
            user: req.session.user
        }
        );
    } else {
        res.render("login.ejs",  {
            data: data,
            user: req.session.user
        }
        );
    }
}

module.exports = router;
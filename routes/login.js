const express = require("express");
var router = express.Router();
var session = require("express-session");

router
    .get("/login", get)
    .post("/login", add)
    .put("/login", update)
    .delete("/login", remove)

    .use(session({
        resave: false,
        saveUninitialized: false,
        secret: "ilikedogsmore"
    }));


function get(req, res) {
    res.render("login.ejs");
}

function add(req, res) {
    res.send({
        type: "POST"
    });
}

function update(req, res) {
    res.send({
        type: "PUT"
    });
}

function remove(req, res) {
    res.send({
        type: "DELETE"
    });
}

module.exports = router;
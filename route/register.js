const express = require("express");
var router = express.Router(); 

router
    .get("/register", get)
    .post("/register", add)
    .put("/register", update)
    .delete("/register", remove);


function get(req, res) {
    res.render("register.ejs");
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
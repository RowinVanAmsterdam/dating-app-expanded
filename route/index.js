const express = require("express");
var router = express.Router();

router
    .get("/", get)
    .post("/", add)
    .put("/", update)
    .delete("/", remove);


function get(req, res) {
    res.render("index.ejs");
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
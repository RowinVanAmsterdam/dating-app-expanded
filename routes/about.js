const express = require("express");
var router = express.Router(); 

router
    .get("/about", get)
    .post("/about", add)
    .put("/about", update)
    .delete("/about", remove);

function get(req, res) {
    res.send({
        type: "GET"
    });
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
const express = require("express");
var router = express.Router(); 

router
    .get("/searchLocation", get)
    .post("/searchLocation", add)
    .put("/searchLocation", update)
    .delete("/searchLocation", remove);


function get(req, res) {
    res.render("searchLocation.ejs");
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
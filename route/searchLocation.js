const express = require("express");
var router = express.Router(); 

router
    .get("/searchLocation", get)
    .post("/searchLocation", add)
    .put("/searchLocation", update)
    .delete("/searchLocation", remove);


function get(req, res) {
    if (req.session.user) {
        res.render("searchLocation.ejs");
    } else {
        res.status(401).send("Credentials required");
    }
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
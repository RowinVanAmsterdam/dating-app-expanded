const express = require("express");
var router = express.Router(); 

router
    .get("/logout", logout)
    .post("/logout", add)
    .put("/logout", update)
    .delete("/logout", remove);

function get(req, res) {
    res.send({
        type: "GET"
    });
}

function logout(req, res, next) {
    req.session.destroy(function (err) {
        if (err) {
            next(err);
        } else {
            res.redirect("/");
        }
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
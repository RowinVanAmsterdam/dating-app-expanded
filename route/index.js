const express = require("express");
var router = express.Router();

router
    .get("/", get)


function get(req, res) {
    res.render("index.ejs");
}

module.exports = router;
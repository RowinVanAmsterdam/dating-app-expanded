const express = require("express");
const router = express.Router(); 

router
    .get("/searchLocation", get);

function get(req, res) {
    res.render("searchLocation.ejs");
}

module.exports = router;
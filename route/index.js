var express = require('express');
var router = express.Router();

router
    .get('/', renderPage);

function renderPage(req, res) {
    res.render('index.ejs');
}

module.exports = router;
var express = require('express');
var router = express.Router();

router
    .get('/credsrequired', renderPage);


function renderPage(req, res) {
    res.render('credsrequired.ejs');
}

module.exports = router;
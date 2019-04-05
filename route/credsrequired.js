const express = require('express');
const router = express.Router();

router
    .get('/credsrequired', get);


function get(req, res) {
    res.render('credsrequired.ejs');
}

module.exports = router;
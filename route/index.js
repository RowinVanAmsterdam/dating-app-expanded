const express = require('express');
const router = express.Router();

router
    .get('/', get);

function get(req, res) {
    res.render('index.ejs');
}

module.exports = router;
const express = require('express');
const router = express.Router(); 

router
    .get('/logout', logout);

function logout(req, res, next) {
    req.session.destroy(function (err) {
        if (err) {
            next(err);
        } else {
            res.redirect('/');
        }
    });
}

module.exports = router;
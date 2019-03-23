const express = require("express");
var router = express.Router();
var session = require("express-session");

router
    .get("/login", get)
    .post("/login", add)
    .put("/login", update)
    .delete("/login", remove)

    .use(session({
        resave: false,
        saveUninitialized: false,
        secret: "ilikedogsmore"
    }))

    // .get("/:id", user);

// function user(req, res, next) {
//     var id = req.params.id;
//     db.collection("members").findOne({
//         _id: id
//     }, done);
        
//     function done(err, data) {
//         if (err) {
//             next(err);
//         } else {
//             res.render("detail.ejs", {data: data});
//         }

//         function onverify(match) {
//             if (match) {
//                 req.session.user = {username: user.username};
//                 res.redirect("/");
//             } else {
//                 res.status(401).send("Password incorrect");
//             }
//         }
//     }
// }

function get(req, res) {
    res.render("login.ejs");
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
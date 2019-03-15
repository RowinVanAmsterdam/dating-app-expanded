// bron: https://github.com/cmda-bt/be-course-18-19/tree/master/examples/express-server
const express = require("express");

// Use Routes
express()
    .use(require("./routes"))
    .use(require("./routes/about"))
    .use(require("./routes/login"))
    .use(require("./routes/users"))

    .use(express.static("static"))
    .use("/static/images/", express.static("./static/images"))
    .set("view engine", "ejs")
    .set("views", "view")
    .use(notFound)
    .listen(8000);

function notFound(req, res) {
    res.status(404).render("not-found.ejs");
}
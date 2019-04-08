const express = require("express");

require("dotenv").config();

express()

    .use(require("./route"))
    .use(require("./route/credsrequired"))
    .use(require("./route/login"))
    .use(require("./route/register"))
    .use(require("./route/personalTag"))
    .use(require("./route/logout"))
    .use(require("./route/searchLocation"))


    .use(express.static("static"))
    .use("/static/images/", express.static("./static/images"))
    .use(notFound)
    .set("view engine", "ejs")
    .set("views", "view")
    .listen(process.env.PORT || 8000);


function notFound(req, res) {
    res.status(404).render("not-found.ejs");
}
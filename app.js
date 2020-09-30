var express = require("express");
var app = express();
var exphbs = require("express-handlebars");
var path = require("path");

app.use(express.static(path.join(__dirname, "/public")));

app.set("views", path.join(__dirname, "views"));
app.engine(".hbs", exphbs({
    extname: ".hbs",
    defaultLayout: false
}));

app.set("view engine", ".hbs");

app.get("/", function(req, res) {
    res.render("home.hbs");
});




var port = process.env.PORT || 8080;
app.listen(port);
console.log("Express started. Listening on port %s", port);
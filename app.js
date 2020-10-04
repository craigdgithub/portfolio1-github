var express = require("express");
var app = express();
var exphbs = require("express-handlebars");
var path = require("path");
var bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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
app.get("/contact", function(req, res) {
    res.render("contact");
});

app.post("/contact"), function(req, res, next) {
    console.log("Contact form posted");
    console.log("req.body");
    console.log("req.body.fullname");
    console.log("req.body.email");
}



var port = process.env.PORT || 8080;
app.listen(port);
console.log("Express started. Listening on port %s", port);
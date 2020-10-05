require('dotenv').config();
const nodemailer = require("nodemailer");
var express = require("express");
var app = express();
var exphbs = require("express-handlebars");
var path = require("path");
var bodyParser = require("body-parser");


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

//step 1 - transporter
let transporter = nodemailer.createTransport ({
    service:"gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

app.post("/contact", function(req, res, next) {
    console.log("contact form posted");
    console.log("req.body");
    var name = req.body.fullname;
    var email = req.body.email;
    var note = req.body.note;
    var subject = req.body.subject;
    //step 2
    let mailOptions = {
        from: "devdixon658@gmail.com",
        to: "devdixon658@gmail.com",
        subject: req.body.subject,
        text: req.body.note,
        html: "<b>Full Name</b>" + name + "<br><b>Email </b>" + email + "<br><b>Message </b>" + note
    };
    //step 3
    transporter.sendMail(mailOptions, function(err, data) {
        if(err) {
            console.log("Error Sending Email.");
        }else {
            console.log("Email Sent")
            res.render("contact", {submitted: "yes"})
        }
    });
});



var PORT = process.env.PORT || 8080;

app.set("port, PORT");
app.listen(port);
console.log("Express started. Listening on port %s", port);
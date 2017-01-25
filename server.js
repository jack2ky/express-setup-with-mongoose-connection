const express = require("express");
const ejs = require("ejs")
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("mongoose");
const app = express();

const User = require("./database/models/user");


const port = process.env.port || 3000;

mongoose.connect("mongodb://localhost/passport-ajax");
//Make sure capital P for promise.
mongoose.Promise = global.Promise;


app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
// app.use(multer({dest : "./uploads"}));

app.set("view engine", "ejs");

//file will be served like http://localhost:4000/style.css
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) =>{
    var query = req.query.message;
    res.render("index", {
        query
    })
})

app.post("/formTest", (req, res) => {
    console.log(req.body);
    var newUser = new User(req.body)
    // Removing from the DB first so there won't be multiple records while testing.
    User.remove({})
    .then(() =>{
        newUser.save()
            .then(() =>{console.log("user saved"); res.redirect("/?message=" + req.body.fullname + "Saved")})
            .catch((err) => console.log(err));
    })

});

app.listen(port, function(){
    console.log(`Listening on port ${port}`);
})

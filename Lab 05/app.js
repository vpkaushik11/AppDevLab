const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const userModel = require("./userDetails");

const app = express();
const dbURI = "mongodb://localhost:27017/AppDevLab";
// mongodb+srv://vpk11:<password>@appdevlab.qw4vdjw.mongodb.net/?retryWrites=true&w=majority
const PORT = 8000;

/**
 * Latest versions of Express (4.x) has unbundled the middleware from the core framework. 
 * If you need body parser, you need to install it separately
 */
// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "static")));
app.use(express.static(__dirname + '/public')); // For the CSS and JS to work

// Setting up the view engine
app.set('views');
app.set('view engine', 'ejs');

// Connect to DB
mongoose.set('strictQuery', false);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("MongoDB Database Connected...");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        });
    })
    .catch((err) => {
        console.log("Error connecting to DB");
    });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/home.html'));
})

app.post('/signup', (req, res) => {
    uname = req.body.uname;
    password = req.body.pswd;
    age = req.body.age;
    email = req.body.email;
    console.log(`Usr Name: ${uname}; Pwd: ${password}; Age: ${age}; Email: ${email};`);
    userModel.find({ uname: uname })
        .then((foundDetails) => {
            if (foundDetails.length === 0) {
                const details = new userModel({
                    uname: uname,
                    pass: password,
                    age: age,
                    email: email
                })
                console.log(details);
                details.save();
                console.log("New details saved!");
                res.redirect('/')
            }
            else {
                console.log("User already exists!")
                res.redirect('/');
            }
        })
})

app.post('/login', (req, res) => {
    enteredUname = req.body.uname;
    enteredPass = req.body.pswd;
    // console.log(enteredUname + "-" + enteredPass);
    userModel.findOne({ uname: enteredUname })
        .then((detail) => {
            if (detail.pass == enteredPass) {
                res.render("details", { detail });
                // res.send(detail.uname + " " + detail.age);
            }
            else {
                console.log("Wrong Password!");
                // res.redirect('/');
            }
        })
        .catch((err) => {
            console.log(err + "\nUser not found!")
        });
});

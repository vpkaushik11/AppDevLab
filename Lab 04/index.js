const express = require("express")
const path = require("path")
const hitModel = require("./hitModel");
const mongoose = require("mongoose")

mongoose.set('strictQuery', false);
const { update } = require("./hitModel.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// view engine setup
app.set('views');
app.set('view engine', 'ejs');

const id = "63fd6bd42791cf778872f864";

const dbURI = "mongodb://localhost:27017/AppDevLab";
mongoose.connect(dbURI, {useNewUrlParser : true, useUnifiedTopology : true})
    .then((result)=>{
        console.log("MongoDB Database Connected....");
        app.listen(8000);
    })
    .catch((err)=>{
         console.log("Error connecting to DB");
    });

app.get('/', (req,res)=>{
    hitModel.findById(id)
        .then((hitVal)=>{
            hitModel.findByIdAndUpdate(id, {hit: hitVal.hit+1}, {new: true})
                .then((hitVal)=>{
                    //console.log(updatedval);
                    res.render("home", {hitVal});
                    console.log("Logged!");
                });
        })
        .catch(()=>{
            hitVal = new hitModel({
                hit: 1
            })
            hitVal.save();
            res.render("home", {hitVal});
            console.log("Welcome to the site!");
        });
})
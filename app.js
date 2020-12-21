const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Etudiant =require("./Controleur/Routers/Users_CRUD/Etudiant");
const sendmail = require("./Controleur/Routers/mail");

const administartion=require("./Controleur/Routers/Users_CRUD/Adminstation");

//The bodyParser object exposes various factories to create middlewares.
// All middlewares will populate the req.body property with the parsed body when the Content-Type request header matches the type option,
// or an empty object ({}) if there was no body to parse, the Content-Type was not matched, or an error occurred.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: "10mb", extended: true }));

//conneted with database mongo  DB
//base de donne  local  a la faine application intergre application sous  web 
//
mongoose.connect(
    "mongodb://localhost:27017/revesli",
  { useNewUrlParser: true ,useUnifiedTopology:true},
    () => console.log("Connected to DB!")
);
//Returns middleware that parses both json and urlencoded
app.use(express.json());


//import  routes 
app.use("/api/etudiant",Etudiant);
app.use("/api/admin",administartion);
app.use('/api/email',sendmail);

    
/// PORT NODE  JS
app.listen(5000, () => console.log("server up and runnig"));
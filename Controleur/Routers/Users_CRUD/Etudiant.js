const router = require("express").Router();
/// creation de rest api  de  client  
// import  model  user  
const User = require("../../../model/Etudiant");


const { registationValidation, loginValidation} = require("../../../Services/Auth/Validation");
//A library to help you hash passwords.
const bcrypt = require("bcryptjs");
//json web token  to  code json with scurite
const jwt = require("jsonwebtoken");
//Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
const dotenv = require("dotenv");
//Create a session middleware with the given options
const session = require("express-session");

require('dotenv').config();
// registation client
router.post("/register", async (req, res) => {
    //validation of Data
    const { error } = registationValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
 
    // email desn't exist
    const emailExist = await User.findOne({ Email: req.body.Email });
    if (emailExist) return res.status(400).send("email already exists");

    //hash the passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.Password, salt);

    //  declaration  de  donne 
    const newUser = new User({

        Name: req.body.Name,
        Email: req.body.Email,
        Role:req.body.Role,
        Phone: req.body.Phone,
        Password: hashPassword,

    });
    //affiche  sous  terminale  le  resultat  pour le  teste 
    console.log(newUser);
    // save  in data  base  mongo  db 
    newUser.save().then(
        (req) => {

            res.status(200).json(req);
        }, (err) => {
            res.status(500).json({ error: err });
        }
    );
});
//
router.post("/login", async (req, res) => {
    //validation of Data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // email dosn't exist
    const client= await User.findOne({ Email: req.body.Email });
    if (!client) return res.status(400).send("email  doesn't exists");

    //check the password
    const validPassword= await bcrypt.compare(req.body.Password,client.Password);
    if(!validPassword)return res.status(400).send("Invalide password");

    //create the token 
    const token =jwt.sign({_id:client._id},process.env.TOKEN_SECRET);
    res.header("auth-token",token).send(token);
    console.log (" connected  :",client.Role,);

  
});


// get all  users
router.get("/", (req, res) => {
    User.find().then(req => {
        if (req) {
            res.status(200).json(req);


        } else {
            res.status(500).json({ message: "user not found" });
        }


    });
});
//logout user
  router.get('/logout',async (req, res) => {
    res.status(200).send({ auth: false, token: null });
  });
  
// get user with id
router.get("/:id", (req, res) => {

    User.findOne({ _id: req.params.id }, (err, rec) => {

        if (err) {
            res.status(500).json({ message: "user not found", err: err });
            console.log(err)

        } else {
            res.status(200).json({ users: rec });
            console.log(rec)
        }

    });
});

//update  user  
router.put("/:id", (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body).then(rec => {
        if (rec) {
            res.status(200).json({ message: "event was updated" });

        }
        else {
            res.status(500).json({ error: "error " });
        }


    });
});
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete({ _id: req.params.id }, (err, req) => {
        if (req) {
            res.status(200).json({ message: "user deleted successfully" });
        } else {
            res.status(500).json({ error: "error" });
        }


    });
});
// final  creation rest api  client
 

module.exports = router;
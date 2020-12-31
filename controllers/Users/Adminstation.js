const router = require("express").Router();
const Administartion = require("../../models/administartion");
const {registationValidation_admin,loginValidation} = require("../../middlewares/Validation");
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
    const { error } = registationValidation_admin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // email desn't exist
    const emailExist = await Administartion.findOne({ Email: req.body.Email });
    if (emailExist) return res.status(400).send("email already exists");

    //hash the passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.Password, salt);

    //  declaration  de  donne 
    const newAdmin = new Administartion({ 
        Email: req.body.Email,
        Role:req.body.Role,
        Password: hashPassword,
    });
    //affiche  sous  terminale  le  resultat  pour le  teste 
    console.log(newAdmin);
    // save  in data  base  mongo  db 
    newAdmin.save().then(
        (req) => {

            res.status(200).json(req);
        }, (err) => {
            res.status(500).json({ error: err });
        }
    );
});
////////test  verif = true
router.post("/login", async (req, res) => {
    //validation of Data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // email dosn't exist
    const admin= await Administartion.findOne({ Email: req.body.Email });
    if (!admin) return res.status(400).send("email  doesn't exists");

    //check the password
    const validPassword= await bcrypt.compare(req.body.Password,admin.Password);
    if(!validPassword)return res.status(400).send("Invalide password");

    //create the token 
    const token =jwt.sign({_id:admin._id},process.env.TOKEN_SECRET);
    res.header("auth-token",token).send(token);
    console.log (" connected  :",admin.Role,);
  
});
///  test =true<
//update  user  
router.put("/:id", (req, res) => {
    Administartion.findOneAndUpdate({ _id: req.params.id }, req.body).then(rec => {
        if (rec) {
            res.status(200).json({ message: " user_adminstration  was updated" });

        }
        else {
            res.status(500).json({ error: "error " });
        }


    });
});
module.exports = router;
//TODO import  acces  to  adminstration 
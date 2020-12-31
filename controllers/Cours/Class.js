const router =require("express").Router();
const Class = require("../../model/Class");
//add class
router.post("/add/",async(rec,res)=>{
    const  ClassExist =await Class.findOne({Nom_Class:req.body.Nom_Class});
    if(ClassExist)return res.status(400).send("Class already exists");
    const newClass = new  Class({
        
        Nom_Class:req.body.Nom_Class,
        QR_Code_Class:req.body.QR_Code_Class,
    });
    console.log ("add");
    newClass.save().then(
        (req) =>{
            res.status(200).json(req);
           
        },(err)=>{
            res.status(400).json({error:err});
        }
    );
});


const router =require("express").Router();
const Departement=require("../../model/Departement");
  // ID_department desn't exist
  //add  departement
router.post("/add/",async(req,res)=>{
  const  departementExist =await Departement.findOne({Nom_Departement:req.body.Nom_Departement});
  if(departementExist)return res.status(400).send("Departement already exists");
    const newDepartement = new  Departement({
        
        Nom_Departement:req.body.Nom_Departement,
    });
    console.log ("add");
    newDepartement.save().then(
        (req) =>{
            res.status(200).json(req);
           
        },(err)=>{
            res.status(400).json({error:err});
        }
    );
});
// TODO get all  departements
router.get("/",(req,res)=>{
    Departement.find().then(req =>{
        if(req){
            res.status(200).json(req);

        }else{
            res.status(400).json({ message: "depatements not found" });
        }
    });
});

//TODO  DELETE DEPARTEMENT 
//TODO get department with id 


module.exports =router;
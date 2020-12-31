    
const router =require("express").Router();
const Departement=require("../../models/Departement");
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
// get all  departements
router.get("/",(req,res)=>{
    Departement.find().then(req =>{
        if(req){
            res.status(200).json(req);

        }else{
            res.status(400).json({ message: "depatements not found" });
        }
    });
});


//TODO get department with id 
router.get("/:id", (req,res)=>{
    Departement.findOne({_id:req.params.id},(err,rec)=>{
        if  (err){
            res.status(400).json({message: "Departement  not found"});

        }else {
            res.status(200).json(rec);
            console.log(rec)

        }
    });
});



//update  depatement  
router.put("/:id", (req, res) => {
    Departement.findOneAndUpdate({ _id: req.params.id }, req.body).then(rec => {
        if (rec) {
            res.status(200).json({ message: "Departement was updated" });

        }
        else {
            res.status(500).json({ error: "error " });
        }


    });
});
// delate  etudiant
router.delete('/:id', (req, res) => {
Departement.findByIdAndDelete({ _id: req.params.id }, (err, req) => {
        if (req) {
            res.status(200).json({ message: "Departement deleted successfully" });
        } else {
            res.status(500).json({ error: "error" });
        }


    });
});
// final  creation rest api  Depatement

module.exports =router;
const router = require("express").Router();
const Class = require("../../models/Class");
const dep = require("../../models/Departement");
//add class
router.post("/add", async (req, res) => {
  const ClassExist = await Class.findOne({ Nom_Class: req.body.Nom_Class });
  if (ClassExist) return res.status(400).send("Class already exists");
  const newClass = new Class({
    Nom_Class: req.body.Nom_Class,
    QR_Code_Class: req.body.QR_Code_Class,
    department: req.body.department,
  });
  console.log("add");
  newClass.save();

  const departement = await dep.findById(req.body.department);
  departement.classes.push(newClass);
  departement.save();

  return res.status(200).json(newClass);
  // .then(
  //     (req) =>{
  //         res.status(200).json(req);

  //     },(err)=>{
  //         res.status(400).json({error:err});
  //     }
  // );
});



module.exports = router;

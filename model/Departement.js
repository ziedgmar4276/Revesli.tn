const  monogoose =require ("mongoose");
const Class = require("./Class");
const  DepartementSchema =new  monogoose.Schema({
 
    Nom_Departement:{
        type :String,
        required:true,
    },
    Departement_class:Class._id,
});
module.exports =monogoose.model('Departement',DepartementSchema);

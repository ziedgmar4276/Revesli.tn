const  monogoose =require ("mongoose");
const  DepartementSchema =new  monogoose.Schema({
   
    Nom_Departement:{
        type :String,
        required:true,
    }
});
module.exports =monogoose.model('Departement',DepartementSchema);

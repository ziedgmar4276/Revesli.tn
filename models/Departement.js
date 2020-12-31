const  mongoose =require ("mongoose");

const  DepartementSchema =new  mongoose.Schema({
 
    Nom_Departement:{
        type :String,
        required:true,
    },
    classes : [
        {type: mongoose.Schema.Types.ObjectId,ref:'Class'}
    ]
   
});
module.exports =mongoose.model('Departement',DepartementSchema);

const  monogoose =require ("mongoose");
const  DepartementSchema =new  monogoose.Schema({
    id_departement:{
        type :String,
        required:true,
    },
    nom_departement:{
        type :String,
        required:true,
    }
});
const  ClassSchema =new  monogoose.Schema({
    id_class:{
        type:String,
        required:true, 
    },
    nom_class:{
        type:String,
        required:true,
    },
    QR_code_Class:{
        type :String,
        required:true,
    },
    id_departement:{DepartementSchema},
    

});
module.exports =mongoose.model('Departement',DepartementSchema);
module.exports =mongoose.model('Class',ClassSchema);


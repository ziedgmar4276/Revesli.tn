//TODO ADD  department  shema
const  ClassSchema =new  monogoose.Schema({
    id_Class:{
        type:String,
        required:true, 
    },
    nom_Class:{
        type:String,
        required:true,
    },
    QR_Code_Class:{
        type :String,
        required:true,
    },
   //TODO add object id id_departement:{},
    

});
module.exports =monogoose.model('Class',ClassSchema);


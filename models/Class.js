const mongoose = require ('mongoose');
const  ClassSchema =new  mongoose.Schema({
    Nom_Class:{
        type:String,
        required:true,
    },
    QR_Code_Class:{
        type :String,
        required:true,
    },
    department :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Departement'
    }
  
    

});
module.exports =mongoose.model('Class',ClassSchema);


const mongoose = require ('mongoose');
const  ClassSchema =new  mongoose.Schema({
    _id: new mongoose.Types.ObjectId(),
    Nom_Class:{
        type:String,
        required:true,
    },
    QR_Code_Class:{
        type :String,
        required:true,
    },
  
    

});
module.exports =mongoose.model('Class',ClassSchema);


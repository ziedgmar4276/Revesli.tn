const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({

Name:{
    type:String,
    required:true,
},
Email:{
    type:String,
    required:true,
},
Phone:{
    type:Number,
    required:true
},

Password:{
    type:String,
    required:true,
}
});
module.exports =mongoose.model('Etudiant',UserSchema);

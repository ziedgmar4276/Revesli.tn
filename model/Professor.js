const mongoose = require ('mongoose');
const  professorSchema = new  mongoose.Schema({

    
    Email:{
        type:String,
        require:true
    },
    Role:{
        type:String,
        require:true
    },
    Password:{
        type:String,
        require :true
    }

});
module.exports =mongoose.model('User_Professor',professorSchema);

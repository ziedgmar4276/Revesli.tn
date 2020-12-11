const mongoose = require("mongoose");
const AdminSchema =new  mongoose.Schema({

    Email:{
        type:String,
        require:true
    },
    Password:{
        type:String,
        require :true
    }

});
module.exports =mongoose.model('User_Administration',AdminSchema);
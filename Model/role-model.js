const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({

    roleName:{
        type:String,
        required:true,
        maxlength:12  
    }
})

const RoleModel =mongoose.model("role",RoleSchema);

module.exports = RoleModel;
const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    firstName:String,
    email:String,
    password:String,
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"role"
    }
})

const EmployeeModel = mongoose.model("employee",EmployeeSchema);
module.exports = EmployeeModel;
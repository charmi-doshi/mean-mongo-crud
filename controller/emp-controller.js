const EmployeeModel = require("../Model/employee-model");

exports.addEmployee = function(req,res){

    let employee = new EmployeeModel(req.body);
    employee.save(function(err,data){

        if(err){
            res.json({data:req.body,msg:"SWME",status:-1})
        }
        else{
            res.json({data:data,msg:"emp added...",status:200})
        }
    })
}

exports.getAllEmployee = function(req,res){

    EmployeeModel.find().populate("role").exec(function(err,data){

        if(err){
            res.json({data:req.body,msg:"smwe",status:-1})
        }
        else{
            res.json({data:data,msg:"emp retrieved..",status:200})
        }
    })
}
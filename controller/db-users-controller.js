const UserModel = require("../Model/user-model");
const bcrypt = require("bcrypt");

exports.signup = function(req,res){
    console.log(req.body.password);
    let encPassword = bcrypt.hashSync(req.body.password,10);

    let user = new UserModel({
        firstName:req.body.firstName,
        email:req.body.email,
        password:encPassword
    })

    user.save(function(err,data){
        if(err){
            res.json({data:err,msg:"SMWE",status:-1})
        }
        else{
            res.json({data:data,msg:"signup done",status:200})
        }
    })
}


exports.getAllUsers = function(req,res){

    UserModel.find(function(err,data){

        if(err){
            res.json({data:err,msg:"SMWE",status:-1});
        }
        else{
            res.json({data:data,msg:"users retrieved",status:200})
        }
    })
}

exports.deleteUser = function(req,res){

    console.log("body==>",req.params);
    UserModel.deleteOne({_id:req.params.userId},function(err,data){

        if(err){
            res.json({data:err,msg:"SMWE",status:-1})
        }
        else{
            console.log(data.deletedCount);
            if(data.deletedCount == 0){
                res.json({data:req.params,msg:"Invalid userId",status:-1});
            }
            else{
                res.json({data:data,msg:"user delted",status:200});
            }
        }
    })
}

exports.getUserById = function(req,res){
    UserModel.findOne({_id:req.params.userId},function(err,data){
        if(err){
            res.json({data:err,msg:"SMWE",status:-1});
        }
        else{
            if(data){
                res.json({data:data,msg:"user retrieved..",status:200});
            }else{
                res.json({data:req.params,msg:"Invalid userid",status:-1})
            }
        }
    })
}

exports.updateUser = function(req,res){

    UserModel.findByIdAndUpdate({_id:req.body.userId},{firstName:req.body.firstName},function(err,data){

        if(err){
            res.json({data:err,msg:"SWME",status:-1})
        }
        else{
            if(data){
                res.json({data:data,msg:"user retrived",status:200})
            }
            else{
                res.json({data:req.params,msg:"invalid userId",status:-1});
            }
        }
    })
}

exports.email = function(req,res){

    const send = require('gmail-send')({
        user: 'java.charmi@gmail.com',
        pass: 'Japan#0201',
        to:   'dhruvi6615@gmail.com',
        subject: 'test subject',
      });

      send({
        text:    'gmail-send example 1',  
      }, (error, result, fullResult) => {
        if (error){console.error(error)}
        else{
            res.json({msg:"email sent..."})
        
        console.log(result);
        }
      })
}
exports.authenticate = function(req,res){
    isCorrect = true;

    UserModel.findOne({email:req.body.email},function(err,data){
        if(data==null){
            isCorrect=false
        }
        else{
            isCorrect = bcrypt.compareSync(req.body.password,data.password);

        }

        if(isCorrect){
            res.json({msg:"authentication done ...",status:200,data:data})
        }else{
            res.json({msg:"invalid credentials...",status:-1,data:req.body})
        }
    })
}
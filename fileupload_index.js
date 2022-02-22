const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const apiRoutes = require("./view/api-routes");

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.use("/",apiRoutes);

//for file uploading

var storageConfig = multer.diskStorage({
    destination:function(req,file,next){
        console.log("uploads folder set");
        next(null,"uploads");//destination
    },
    filename:function(req,file,next){
        let fileName = file.originalname
        //validation extension
      
        let ext = path.extname(file.originalname);
        console.log("filename==>",fileName,ext)

        next(null,fileName);
    }
})

var upload = multer({
    storage:storageConfig,
    limits:{fileSize:1024*1000*20},
    fileFilter:function(req,file,next){
        let mime= file.mimetype
        //validation extension-mimetype
        //next("error invalid file format")

        return next(null,file.originalname);
    }
}).single("profilepic")

var multiUpload = multer({
    storage:storageConfig,
    limits:{fileSize:1024*1000*20},
    fileFilter:function(req,file,next){
        let mime= file.mimetype
        //validation extension-mimetype
        //next("error invalid file format")

        return next(null,file.originalname);
    }
}).array("multipic")

app.post("/singleupload",function(req,res,next){
    upload(req,res,function(err,data){
        if(err){
            res.json({status:-1,msg:"error",data:err})
        }
        else{
            res.json({status:200,msg:"uploaded..",data:data})
        }
    })
})

app.post("/multiupload",function(req,res,next){
    multiUpload(req,res,function(err,data){
        if(err){
            res.json({status:-1,msg:"error",data:err})
        }
        else{
            res.json({status:200,msg:"multifile uploaded..",data:data})
        }
    })
})
//
app.listen(3000,function(){
    console.log("file upload ....")
})
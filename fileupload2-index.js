//short method foe file uploading in the users email folder
//swagger

const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi =require("swagger-ui-express");  

const apiRoutes = require("./view/api-routes");

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.use("/",apiRoutes);

//swagger




//
let diskStorageObj = multer.diskStorage({
    destination:function(req,file,next){
        console.log(req.body.email);
        fs.mkdir("uploads/"+req.body.email,function(err){
            next(null,"uploads/"+req.body.email)
        })

    },
    filename:function(req,file,next){
        next(null,file.originalname);
    }
})

const upload = multer({
    storage:diskStorageObj,limits:{fieldSize:120000 * 1024}
}).single("singlepic")

//swagger
const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title:"Demo swagger API",
            version:"1.0.0"
        }
    },
    apis:['fileupload2-index.js'],

};

const swaggerDocs =swaggerJSDoc(swaggerOptions);
console.log(swaggerDocs);

app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocs))
/**
 * @swagger
 * /singlepic:
 *  post:
 *      description:upload single file
 *     
 *                
 * 
 * 
 */
app.post("/singlepic",function(req,res){

    upload(req,res,function(err){
        if(err){
            res.json({msg:err})
        }
        else{
            res.json({msg:"done"})
        }
    })
})

app.listen(3000,function(){
    console.log("short method for file upload")
})
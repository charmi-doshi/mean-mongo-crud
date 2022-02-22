const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const apiRoutes = require("./view/api-routes");

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.use("/",apiRoutes);
// 

//mongo
//atlas uri
const uri = "mongodb+srv://charmi:charmi0201@cluster0.zyp2r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri,function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("dbConnected......");
    }
})

app.listen(process.env.PORT || 3000, function(){

    console.log("server started...")
})
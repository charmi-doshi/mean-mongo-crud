const express = require("express");
var cors = require('cors')
const apiRoutes = require("./view/api-routes");
app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.use(cors())

app.use("/",apiRoutes);

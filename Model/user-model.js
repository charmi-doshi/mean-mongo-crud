const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:String,
    password:String,
    firstName:String
})

const UserModel = mongoose.model("user",UserSchema);

module.exports = UserModel
import mongoose from "mongoose";

//defining schema
const userSchema = new mongoose.Schema({
    name:{type:String, required:true, trim:true},
    email:{type:String, required:true, trim:true},
    mobileNo:{type:Number, required:true, trim:true},
    password:{type:String, required:true, trim:true},
    imageSetId:{type:mongoose.Types.ObjectId, ref:'imageSet'},
})

const UserModel = mongoose.model("user",userSchema )

export default UserModel;
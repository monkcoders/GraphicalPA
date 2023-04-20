import mongoose from "mongoose";

//defining schema
const tempUserSchema = new mongoose.Schema({
    name:{type:String, required:true, trim:true},
    email:{type:String, required:true, trim:true},
    mobileNo:{type:Number, required:true, trim:true},
    password:{type:String, trim:true},
    confirmPassword:{type:String, trim:true},
    imageSetId:{type:mongoose.Types.ObjectId, ref:'imageSet'},
    isRegistered:{type:Boolean, default:false}
})

const TempUserModel = mongoose.model("tempUser",userSchema )

export default TempUserModel;
import mongoose, { Schema } from "mongoose";

//defining schema
const imageSetSchema = new mongoose.Schema({
    imagesSet:[{type:Schema.Types.ObjectId, ref:'Image'}],//check the syntax
    allotedUserCount: {type:Number, default:0},
    isUserProvided:{type:Boolean, default:false},
    setCategory:{type:String, default:'all'}

})

const ImageSetModel = mongoose.model("imageSet",imageSetSchema )

export default ImageSetModel;
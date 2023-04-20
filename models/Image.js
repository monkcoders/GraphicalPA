import mongoose from "mongoose";

//defining schema
const imageSchema = new mongoose.Schema({
    image:{data:Buffer,contentType:String},//check the syntax
    name:String
})

const ImageModel = mongoose.model("Image",imageSchema )

export default ImageModel;
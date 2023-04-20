import multer from "multer"
import ImageModel from "../models/Image.js";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs'
import ImageSetModel from "../models/imageSet.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const index =__dirname.indexOf('/controllers')
const uploadpath = __dirname.substring(0,index) 
console.log(__dirname)
console.log(uploadpath)

class imageController{
    static storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads')
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now())
        }
    });
    
    static upload = multer({ storage: imageController.storage });

    static getImage = async (req, res) => {
        await ImageModel.find({})
        .then((data, err)=>{
            if(err){
                console.log(err);
            }
            console.log(data)

            res.render('imagepage',{items: data})
        })
    }
    
    static postImage = async (req, res, next) => {
        try {
            const fileArray = req.files;
            const promises = fileArray.map(async (file) => {
                const obj = {
                    name: req.body.name,
                    image: {
                        data: fs.readFileSync(path.join(uploadpath, 'uploads', file.filename)),
                        contentType: 'image/png'
                    }
                }
                const userImageInput = new ImageModel(obj)
                return await userImageInput.save();
            })
            await Promise.all(promises);
            res.redirect('/api/user/');
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    
    

      

}
export default imageController;
import bcrypt from "bcrypt"
import crypto from "crypto"
import UserModel from "../models/User.js";
import TempUserModel from "../models/tempUser.js";

class PasswordController{
    static generatePasswordHash = async(password,email)=>{
        try{
        const sha256Hash = crypto.createHash('sha256');

        sha256Hash.update(email, 'utf8');

        for (let index = 0; index < password.length; index++) {
            const objectId = password[index];
            sha256Hash.update(objectId,'utf8');
        }
        const hashedPassword = sha256Hash.digest('hex');
    
        // console.log('Hashed ObjectID array:', hashedId);
        const details = {email, hashedPassword}
        return details;}
        catch (error) {
            console.error("Error generating password hash: ", error);
            throw error;
          }
    }

    static setPassword = async (req,res)=>{
        const imageIds = JSON.parse(req.body.imageIds);
        console.log(imageIds)
        const userId = JSON.parse(req.body.userId);
        const tempUserData = await TempUserModel.findById(userId)
        console.log(tempUserData)
        if(tempUserData){
            const hashedPasssword = (await this.generatePasswordHash(imageIds, tempUserData.email)).hashedPassword
            console.log(hashedPasssword)
         await tempUserData.updateOne({$set:{password:hashedPasssword, isRegistered:true}})   
         
         const registerUser  = new UserModel({
            name:tempUserData.name,
            email:tempUserData.email,
            mobileNo:tempUserData.mobileNo,
            password:hashedPasssword,
            imageSetId:tempUserData.imageSetId
         })
         registerUser.save()
         console.log(registerUser)
         const userData = await UserModel.findById(registerUser._id)
         console.log(userData)
         res.render('dashboard',{userData:registerUser} )
        }

    }

    static checkLoginPassword = async(req,res)=>{
        const imageIds = JSON.parse(req.body.imageIds);
        const userId = JSON.parse(req.body.userId);
        console.log(userId)
        const userData = await UserModel.findById(userId)
        console.log(userData)
        if(userData){
            const hashedPasssword = (await this.generatePasswordHash(imageIds, userData.email)).hashedPassword
            console.log(hashedPasssword,userData.password)
            if(hashedPasssword ===userData.password){
                // const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
                const userData = await UserModel.findById(userId).select({password:0, __v:0})
                console.log(userData)
                res.render('dashboard',{userData:userData} )
            }else {
                res.send({ status: "failed", message: "wrong email or password, try again" })
            }

        }else{
            res.send({status:"failed",message:"user not registered"})
        }
    }
}

export default PasswordController;
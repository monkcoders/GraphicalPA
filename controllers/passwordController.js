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
        const userId = JSON.parse(req.body.userId);
        const tempUserData = await TempUserModel.findById(userId)
        if(tempUserData){
            const hashedPasssword = (await this.generatePasswordHash(imageIds, tempUserData.email)).hashedPassword
         await tempUserData.updateOne({$set:{password:hashedPasssword, isRegistered:true}})   
         const registerUser  = new UserModel({
            name:tempUserData.name,
            email:tempUserData.email,
            mobileNo:tempUserData.mobileNo,
            password:tempUserData.password,
            imageSetId:tempUserData.imageSetId
         })
         registerUser.save()
         const userData = await UserModel.findOne({})
         res.render('dashboard', {userData:{}})
         console.log(registerUser)
         console.log(tempUserData)
        }

    }

    static checkLoginPassword = async(req,res)=>{
        const {email} =req.params;
        const {password, confirmPassword} = req.body;
        console.log(email, password)
        const user = await UserModel.findOne({ email: email });

        if(user){
            if(password === confirmPassword){
            const passwordHash = (await this.generatePasswordHash(password,email)).hashedPassword;
            console.log(passwordHash);
            const isMatch = (passwordHash===user.password)
            if(user.email===email  && isMatch ){
                const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
                res.send({ status: "success", message: "Login Successful", "token": token });

            }else {
                res.send({ status: "failed", message: "wrong email or password, try again" })
            }

        }else{
            res.send({status:"failed",message:"user not registered"})
        }
    }


}
}
const storedHash  = await PasswordController.generatePasswordHash(["asd","bsd", "csd"], 'abhi@gmail.com')
const passwordHash  = await PasswordController.generatePasswordHash(["asd","bsd", "csd"], 'abhi@gmail.com')
console.log(storedHash,passwordHash)
const isMatch = (passwordHash.hashedPassword===storedHash.hashedPassword)

console.log(isMatch)
export default PasswordController;
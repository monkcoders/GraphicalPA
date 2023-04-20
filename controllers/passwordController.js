import bcrypt from "bcrypt"
import crypto from "crypto"
import UserModel from "../models/User.js";

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

    static registerUserPassword

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
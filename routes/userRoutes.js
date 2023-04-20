import express from "express";
import PasswordController from "../controllers/passwordController.js";
const router = express.Router();
import UserController from "../controllers/userController.js";
import checkUserAuth from "../middlewares/auth-middleware.js";
import imageController from "../controllers/imageController.js";

//route level middleware
router.use('/changepassword', checkUserAuth)
router.use('/loggeduser',checkUserAuth)



//public routes (voh routes jo bina authentication ke access kiye ja sake)(eg login register )
router.get('/',imageController.getImage )
router.post('/',imageController.upload.array('image',16), imageController.postImage);


router.post('/register', UserController.userRegistration);
router.post('/login', UserController.userLogin);
router.post('/password/:email',PasswordController.checkLoginPassword)
router.post('/send-reset-password-email',UserController.sendPasswordResetMail)
router.post('/reset-password/:id/:token',UserController.resetPassword)

//private routes (voh routes jinke liye authentication karna jaruri he ) (eg dashboard, change password)
router.post('/changepassword', UserController.changePassword )
router.get('/loggeduser', UserController.loggedUser)

export default router;
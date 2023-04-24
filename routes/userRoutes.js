import express from "express";
import PasswordController from "../controllers/passwordController.js";
const router = express.Router();
import UserController from "../controllers/userController.js";
import checkUserAuth from "../middlewares/auth-middleware.js";
import imageController from "../controllers/imageController.js";

//route level middleware
// router.use('/changepassword', checkUserAuth)
// router.use('/loggeduser',checkUserAuth)



router.get('/login', UserController.getLogin)
router.post('/login', UserController.userLogin);
//public routes (voh routes jo bina authentication ke access kiye ja sake)(eg login register )
router.get('/uploadimages',imageController.getImage )
router.post('/uploadimages',imageController.upload.array('image',16), imageController.postImage);


//for setting and checking passwords
router.post('/setpassword',PasswordController.setPassword)
router.post('/password', PasswordController.checkLoginPassword)


router.post('/register', UserController.userRegistration);
router.get('/register', UserController.getRegister)



router.post('/send-reset-password-email',UserController.sendPasswordResetMail)
router.post('/reset-password/:id/:token',UserController.resetPassword)

//private routes (voh routes jinke liye authentication karna jaruri he ) (eg dashboard, change password)
router.post('/changepassword', UserController.changePassword )
router.get('/loggeduser', UserController.loggedUser)

export default router;
import express from 'express'
import {forgotPasswordController, loginController, registerController, testController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'

// router object
const router = express.Router()

// routing

// REGISTER || METHOD POST
router.post('/register', registerController)

//  LOGIN || POST
router.post('/login', loginController);

// Forgot Password || POST
router.post('/forgot-password', forgotPasswordController)

// test controller
router.get('/test', requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
     res.status(200).send({ ok: true });
   });

//protected Admin route auth
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
     res.status(200).send({ ok: true });
   });
   

export default router
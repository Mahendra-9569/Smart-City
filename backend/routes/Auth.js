import express from 'express';
const router=express.Router();

import { Signup,Login,Logout } from '../controllers/Auth.js';
import Auth from '../middlewares/Auth.js';


router.post("/signup",Signup);
router.post("/login",Login);
router.post("/logout",Auth,Logout);

export default router;
import express from "express";
import { signUp, userLogin } from "../Controllers/user.controller.js";


const router = express.Router();

router.post("/signup",signUp)
router.post("/login" , userLogin)

export default router;
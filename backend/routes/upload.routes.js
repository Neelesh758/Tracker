import express from "express";
import upload from "../middlewares/multer.middleware.js";
import { uploadProfileImage } from "../Controllers/upload.controller.js";

const router = express.Router();

router.put("/upload/:id",upload.single("image"),uploadProfileImage);

export default router;
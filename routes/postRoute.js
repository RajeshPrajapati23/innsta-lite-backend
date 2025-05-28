import express from "express";
import { postAddCon } from "../controllers/postCon.js";
import uploadImg from "../middlewares/uploadPhoto.js";
import { verifyToken } from "../middlewares/verifyToken.js";
let router = express.Router();

router.post("/post/add", verifyToken, uploadImg.single("image"), postAddCon);

export default router;

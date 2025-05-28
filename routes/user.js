import express from "express";
import { userLoginCon, userRegistCon } from "../controllers/user.js";
let router = express.Router();

router.post("/user/register", userRegistCon);
router.post("/user/login", userLoginCon);

export default router;

import express from "express";
import { sendmessage } from "../controller/messageController.js";

const router = express.Router();

router.post("/send", sendmessage);

export default router;

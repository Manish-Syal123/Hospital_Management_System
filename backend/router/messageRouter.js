import express from "express";
import {
  getAllMessages,
  sendmessage,
} from "../controller/messageController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.post("/send", sendmessage);
router.get("/getallmessages", isAdminAuthenticated, getAllMessages); // only Admin can see all the messages

export default router;

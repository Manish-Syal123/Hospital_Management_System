import express from "express";
import {
  getAllAppointments,
  postAppointment,
} from "../controller/appointmentController.js";
import {
  isPatientAuthenticated,
  isAdminAuthenticated,
} from "../middlewares/auth.js";
const router = express.Router();

router.post("/post", isPatientAuthenticated, postAppointment);
router.get("/getallappointments", isAdminAuthenticated, getAllAppointments);

export default router;

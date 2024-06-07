import express from "express";
import {
  getAllAppointments,
  postAppointment,
  updateAppointmentStatus,
} from "../controller/appointmentController.js";
import {
  isPatientAuthenticated,
  isAdminAuthenticated,
} from "../middlewares/auth.js";
const router = express.Router();

router.post("/post", isPatientAuthenticated, postAppointment);
router.get("/getallappointments", isAdminAuthenticated, getAllAppointments);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);

export default router;

import express from "express";
import {
  deleteAppointment,
  getAllAppointments,
  getUserAppointments,
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
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);

router.get("/getuserappointments", isPatientAuthenticated, getUserAppointments);

export default router;

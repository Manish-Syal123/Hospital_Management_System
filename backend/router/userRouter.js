import express from "express";
import {
  addNewAdmin,
  addNewDoctor,
  getAllDoctors,
  getUserDetails,
  login,
  logoutAdmin,
  logoutPatient,
  patientRegister,
} from "../controller/userController.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
// only a existing admin can add(register) new admin // ie. A person has to be an Admin to add new Admin /OR/ Only a admin can add new admin
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.get("/doctors", getAllDoctors);
router.get("/admin/me", isAdminAuthenticated, getUserDetails); // only all admin details will be fetched
router.get("/patient/me", isPatientAuthenticated, getUserDetails); // only all patient details will be fetched
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);

router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor); //only an admin can add new Doctor

export default router;

// isAdminAuthenticated and isPatientAuthenticated are acting as a middlewares

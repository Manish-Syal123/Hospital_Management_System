import express from "express";
import {
  addNewAdmin,
  login,
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

export default router;

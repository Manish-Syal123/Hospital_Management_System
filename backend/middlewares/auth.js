import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  //Authentication
  const token = req.cookies.adminToken; // admintoken is the cookie name which we set while creating the token based on roles ("patient" or "Admin") in utils/jwtToken.js
  if (!token) {
    return next(new ErrorHandler("Admin Not Authenticated!", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  //Authorization
  if (req.user.role !== "Admin") {
    return next(
      new ErrorHandler(
        `${req.user.role} not authorized for this resources!`,
        400
      )
    );
  }
  next();
});

export const isPatientAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    const token = req.cookies.patientToken; // admintoken is the cookie name which we set while creating the token based on roles ("patient" or "Admin") in utils/jwtToken.js
    if (!token) {
      return next(new ErrorHandler("Patient Not Authenticated!", 400));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Patient") {
      return next(
        new ErrorHandler(
          `${req.user.role} not authorized for this resources!`,
          400
        )
      );
    }
    next();
  }
);

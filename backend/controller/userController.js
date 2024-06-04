import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";

//endPoint for registering Patients Only
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password ||
    !role
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  // check if the user is already registered in the database
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("User already Registered!", 400));
  }

  // create or store this new user
  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role,
  });

  generateToken(user, "User Registered!", 200, res);

  // res.status(200).json({
  //   success: true,
  //   message: "user Registered!",
  // });
});

//endpoint for user Login
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please fill all details!", 400));
  }

  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password and Confirm Password DO NOT MATCH!", 400)
    );
  }

  const user = await User.findOne({ email }).select("+password"); // with the help of select(+password) we can get the password of the user as we know that the user password while creating the schema is select: false
  if (!user) {
    return next(new ErrorHandler("Invalid Password or Email", 400));
  }

  const ispasswordMatched = await user.comparePassword(password); // we had already created this comparePassword() method in userSchema.js to compare the use entered password with the hashed password stored in the DB.
  if (!ispasswordMatched) {
    return next(new ErrorHandler("Invalid Password or Email", 400));
  }

  if (role !== user.role) {
    return next(new ErrorHandler("user with this role NOT Found!", 400));
  }

  // Succefull response will be send from this function along with Token and cookie will be stored
  generateToken(user, "User Logged In Successfully!", 200, res);
  // res.status(200).json({
  //   success: true,
  //   message: "User Logged In Successfully!",
  // });
});

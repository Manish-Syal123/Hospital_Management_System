import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

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
  generateToken(user, `${role} Logged In Successfully!`, 200, res);
  // res.status(200).json({
  //   success: true,
  //   message: "User Logged In Successfully!",
  // });
});

// endPoint to add(register) new Admin
export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(`${isRegistered.role} with this Email Already Exists!`) // eg: patient with this email already exists // then we cant add(register) admin with this email
    );
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Admin",
  });

  res.status(200).json({
    success: true,
    message: "New Admin Registered!",
  });
});

// endpoint to get all the docters

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

// endPoint to get User detatils
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

// endpoint to Logout dashboard Admin

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  // remove the cookie, named adminToken or make the cookie with the stored token as empty eg: adminToken=""
  res
    .status(201)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin logged Out Successfully!",
    });
});

// endpoint to Logout dashboard Admin

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  // remove the cookie, named patientToken or make the cookie with the stored token as empty eg: patientToken=""
  res
    .status(201)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient logged Out Successfully!",
    });
});

// endpoint to register(add) new Doctor

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor avatar Required", 400));
  }

  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    doctorDepartment,
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
    !doctorDepartment
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  // Check if the Doctor is already registered in our database
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} with this email Already Exists!`,
        400
      )
    );
  }

  // Now Upload the user Profile Picture (Avatar) on cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  // if we don't get any response from cloudinary or it throwed some error
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error: ",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(
      new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
    );
  }

  // Now after this create (register) a new doctor into the MongoDB database
  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Doctor",
    doctorDepartment,
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: SVGComponentTransferFunctionElement,
    message: "New Doctor Registered Succefully!",
    doctor,
  });
});

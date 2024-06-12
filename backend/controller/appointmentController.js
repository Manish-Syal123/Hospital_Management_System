import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

// endpoint to book appointment
export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isFindDoctor = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });
  if (isFindDoctor.length === 0) {
    return next(new ErrorHandler("Doctor not found", 404));
  }

  //if there are other doctors with exact same name, role and department
  if (isFindDoctor.length > 1) {
    return next(
      new ErrorHandler(
        "Doctors Conflict! Please Contact Through Email Or Phone!",
        404
      )
    );
  }

  // if there is no conflict with doctors name and department then book the appointment.
  const doctorId = isFindDoctor[0]._id;
  const patientId = req.user._id;

  //Create or store user appointment data into the database
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    hasVisited,
    address,
    doctorId,
    patientId,
  });

  res.status(200).json({
    success: true,
    appointment,
    message: "Appointment Send Succefully!",
  });
});

// endpoint to get all booked appointments for Admin DashBoard
export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});

// endpoint to Update appointments status from Admin dashboard
export const updateAppointmentStatus = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params; // we will receive an appointment ID in the url to update it's status
    let appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("Appointment not Found!", 404));
    }

    // with req.body we can access complete appointment detais and can update any detail of it(thats why we are using req.body rather than {status:"requested status"}) // it's logic will be written from frontend
    //for eg. in req.body we will receive "status":"Accepted" or "status":"Rejected"
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: "Appointment Status Updated!",
      appointment,
    });
  }
);

//endpoint to delete booked appointment
export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found!", 404));
  }

  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appointment Deleated Succefully!",
  });
});

//endpoint to get Looged In user Appointments
export const getUserAppointments = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  const userAppointments = await Appointment.find(email);
  if (!userAppointments) {
    return next(new ErrorHandler("Appointment Not Found!", 404));
  }
  res.status(200).json({
    success: true,
    userAppointments,
  });
});

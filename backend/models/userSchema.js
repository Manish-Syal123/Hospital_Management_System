import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name Is Required!"],
    minLength: [3, "First Name Must Contain At Least 3 Characters!"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name Is Required!"],
    minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Email Is Required!"],
    validate: [validator.isEmail, "Provide A Valid Email!"],
  },
  phone: {
    type: String,
    required: [true, "Phone Is Required!"],
    minLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
    maxLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
  },
  nic: {
    type: String,
    required: [true, "NIC Is Required!"],
    minLength: [5, "NIC Must Contain Only 5 Digits!"],
    maxLength: [5, "NIC Must Contain Only 5 Digits!"],
  },
  dob: {
    type: Date,
    required: [true, "DOB Is Required!"],
  },
  gender: {
    type: String,
    required: [true, "Gender Is Required!"],
    enum: ["Male", "Female"],
  },
  password: {
    type: String,
    required: [true, "Password Is Required!"],
    minLength: [8, "Password Must Contain At Least 8 Characters!"],
    select: false, // we will get the user we will get all it's details but won't get it's password
  },
  role: {
    type: String,
    required: [true, "User Role Required!"],
    enum: ["Patient", "Doctor", "Admin"],
  },
  doctorDepartment: {
    type: String,
  },
  docAvatar: {
    public_id: String,
    url: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10); // hash the user password
});

//Creating function for each user : these functions will get attach when new user is created

//Compare the user's entered password with it's hashed(encrypted) password stored in DB
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// generating the token when user will login

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);

//What is NIC
//  The government offers the National Industrial Classification Code as a form of business code to help firms classified as micro, small, and medium enterprises keep track of their commercial transactions. The NIC code is given in order to carefully and exactly track the commercial activities of the firms. The National Industrial Classification Code has been shown to be essential for various commercial transactions in the MSME sector. To aid the entrepreneurs who are the backbone of the Indian economy, the government has already announced a number of programs in this area.

// Some NIC Codes as per India
// The following companies utilize the National Industrial Classification Codes listed below:
// 1. Swine and pig farming: 0145
// 2. Retail sales of medical, orthopedic, and pharmaceutical products: 47721
// 3. Parts and accessories for motor vehicles: 45300
// 4. 55101 Hotels and Dining
// 5. Making things out of cement and plaster: 2395
// 6. Pharmaceutical and medical wholesale: 46497 (5 digit code)
// 7. Manufacturing of wool and wool-blend fabrics through weaving: 13123
// 8. Production of chemicals used in the production of textiles, paper, leather, and similar products: 20297

import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name must contain atleast 3 Characters!"],
  },
  LastName: {
    type: String,
    required: true,
    minLength: [3, "Last name must contain atleast 3 Characters!"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email address!"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone number must contain exact 10 digits!"],
    maxLength: [10, "Message must contain atleast 10 Characters!"],
  },
  message: {
    type: String,
    required: true,
    minLength: [10, "Message must contain atleast 10 Characters!"],
  },
});

export const Message = mongoose.model("Message", messageSchema);

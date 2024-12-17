const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    NIDNumber: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    otp: { type: String, default: 0 },
    bloodGroup: { type: String },
  },
  { versionKey: false, timestamps: true }
);

const UserModel = mongoose.model("users", usersSchema);
module.exports = UserModel;

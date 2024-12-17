const UserModel = require("../models/UserModel");
const mongoose = require("mongoose");
const { EncodeToken } = require("../utilities/tokenUtility");
const ObjectID = mongoose.Types.ObjectId;

const RegistrationService = async (req) => {
  try {
    const reqBody = req.body;
    const data = await UserModel.create(reqBody);
    return {
      status: "success",
      message: "User Information Successfully Saved",
      data: data,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Registration failed",
      error_message: error.message,
    };
  }
};

const LoginService = async (req) => {
  try {
    const reqBody = req.body;
    const data = await UserModel.findOne(reqBody);
    // Token Direct method
    const token = EncodeToken(data.email, data._id);

    return {
      status: "success",
      message: "User verification was successful",
      token: token,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Registration failed",
      error_message: error.message,
    };
  }
};

const UserService = async (req) => {
  try {
    const userId = new ObjectID(req.headers.user_id);
    const matchStage = {
      $match: { _id: userId },
    };
    const projectionStage = {
      $project: { _id: 0, otp: 0, createdAt: 0, updatedAt: 0, password: 0 },
    };
    const data = await UserModel.aggregate([matchStage, projectionStage]);
    return {
      status: "success",
      message: "User Information Retrieved Successfully",
      data: data,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Registration failed",
      error_message: error.message,
    };
  }
};
const UsersService = async () => {
  try {
    const matchStage = {
      $match: {},
    };
    const projectionStage = {
      $project: { _id: 0, otp: 0, createdAt: 0, updatedAt: 0, password: 0 },
    };
    const data = await UserModel.aggregate([matchStage, projectionStage]);
    return {
      status: "success",
      message: "All Users Information Retrieved Successfully",
      data: data,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Registration failed",
      error_message: error.message,
    };
  }
};
const UpdateUserService = async (req) => {
  try {
    const userId = new ObjectID(req.headers.user_id);
    const data = await UserModel.updateOne(
      { _id: userId },
      { $set: req.body },
      { upsert: false }
    );
    return {
      status: "success",
      message: "User Information Updated Successfully",
      data: data,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Registration failed",
      error_message: error.message,
    };
  }
};
const DeleteUserService = async (req) => {
  try {
    const userId = new ObjectID(req.headers.user_id);
    const data = await UserModel.deleteOne({ _id: userId });
    return {
      status: "success",
      message: "User Information Deleted Successfully",
      data: data,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Registration failed",
      error_message: error.message,
    };
  }
};

module.exports = {
  RegistrationService,
  LoginService,
  UserService,
  UsersService,
  UpdateUserService,
  DeleteUserService,
};

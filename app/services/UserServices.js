const UserModel = require("../models/UserModel");
const mongoose = require("mongoose");
const { EncodeToken } = require("../utilities/tokenUtility");
const  SendEmail  = require("../utilities/emailUtility");
const ObjectID = mongoose.Types.ObjectId;

const RegistrationService = async (req) => {
  try {
    const reqBody = req.body;
    const data = await UserModel.create(reqBody);
    if(!data) {
      return {
        status: "error",
        message: "User registration failed due to some error",

      };
    }
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
    const token = EncodeToken(data.email, data._id,data.verified);

    if(!token) {
      return {
        status: "error",
        message: "User login failed due to some error",

      };
    }

    return {
      status: "success",
      message: "User verification was successful",
      token: token,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Login failed",
      error_message: error.message,
    };
  }
};

const UserService = async (req) => {
  try {
    const verified=req.headers.verified;
    if(verified===false){
      return {
        "status": "error",
        "message": "Fetching data failed: account not verified"
      }

    }
    const userId = new ObjectID(req.headers.user_id);
    const matchStage = {
      $match: { _id: userId },
    };
    const projectionStage = {
      $project: { _id: 0, otp: 0, createdAt: 0, updatedAt: 0, password: 0,verified:0 },
    };
    const data = await UserModel.aggregate([matchStage, projectionStage]);

    if(data===null) {
      return {
        status: "error",
        message: "Fetching data failed due to some error",

      };
    }
    return {
      status: "success",
      message: "User Information Retrieved Successfully",
      data: data,

    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Fetching data failed",
      error_message: error.message,
    };
  }
};
const UsersService = async (req) => {
  try {
    const verified=req.headers.verified;
    if(verified===false){
      return {
        "status": "error",
        "message": "Fetching data failed: account not verified"
      }

    }

    const matchStage = {
      $match: {},
    };
    const projectionStage = {
      $project: { _id: 0, otp: 0, createdAt: 0, updatedAt: 0, password: 0 ,verified:0},
    };
    const data = await UserModel.aggregate([matchStage, projectionStage]);

    if(data===null) {
      return {
        status: "error",
        message: "Fetching data failed due to some error",
      };
    }
    return {
      status: "success",
      message: "All Users Information Retrieved Successfully",
      data: data,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Fetching data failed",
      error_message: error.message,
    };
  }
};
const UpdateUserService = async (req) => {
  try {
    const verified=req.headers.verified;
    if(verified===false){
      return {
        "status": "error",
        "message": "Fetching data failed: account not verified"
      }

    }

    const userId = new ObjectID(req.headers.user_id);
    const data = await UserModel.updateOne(
      { _id: userId },
      { $set: req.body },
      { upsert: false }
    );
    if(data['matchedCount']===0) {
      return {
        status: "error",
        message: "Fetching data failed due to some error",
      };
    }
    return {
      status: "success",
      message: "User Information Updated Successfully",
      matched: data['matchedCount'],
      modified: data['modifiedCount'],
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Updating data failed",
      error_message: error.message,
    };
  }
};
const DeleteUserService = async (req) => {
  try {
    const userId = new ObjectID(req.headers.user_id);
    const data = await UserModel.deleteOne({ _id: userId });
    if(data['matchedCount']===0) {
      return {
        status: "error",
        message: "Deleting data failed due to some error",
      };
    }
    return {
      status: "success",
      message: "User Information Deleted Successfully",
      matched: data['matchedCount'],

    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Deleting data failed",
      error_message: error.message,
    };
  }
};
const SendOTPService = async (req) => {
  try {
    const email=req.headers.email;
    const userId = new ObjectID(req.headers.user_id);

const otp =Math.floor(1000 + Math.random() * 9000);
   await SendEmail(email, `Your OTP is ${otp}`, "Email Verification OTP",)
  const data= await UserModel.updateOne({ email: email ,_id:userId},{$set: {otp:otp}});

    return {
      status: "success",
      message: "OTP Successfully sent to your email, please check your email",

    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Sending OTP failed",
      error_message: error.message,
    };
  }
};
const VerifyAccountService = async (req) => {
  try {
    const email=req.headers.email;
    const userId = new ObjectID(req.headers.user_id);
    const verified=true
    const otp=req.params.otp;
    const data = await UserModel.updateOne(
        { _id: userId, email: email, otp: otp },
        { $set: { verified: verified, otp: 0 } }
    );
    const newToken = EncodeToken(email, userId,verified);

    if(data['matchedCount']===0) {
      return {
        status: "error",
        message: "verification failed due to some error",
      };
    }
    return {
      status: "success",
      message: "User account verified Successfully",
      token: newToken,

    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Account verification failed",
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
  SendOTPService,
  VerifyAccountService
};

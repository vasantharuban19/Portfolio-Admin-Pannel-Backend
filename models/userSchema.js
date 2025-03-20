import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { validateEmail } from "../middlewares/validateEmail.js";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Name Required"],
  },
  email: {
    type: String,
    required: [true, "Email Required"],
    unique: true,
    validate: {
      validator: validateEmail,
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  phone: {
    type: Number,
    required: [true, "Phone Number Required"],
    unique: true,
    validate: {
      validator: (value) => /^\+?[1-9]\d{0,14}$/.test(value),
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  aboutMe: {
    type: String,
    required: [true, "About Me Is Required"],
  },
  password: {
    type: String,
    required: [true, "Password Required"],
    minlength: [8, "Password must be at least 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  portfolioURL: {
    type: String,
    required: [true, "Portfolio URL must be provided"],
  },
  githubURL: {
    type: String,
  },
  linkedinURL: {
    type: String,
  },
  gmailURL: {
    type: String,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//! Hashing the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
//! Compare the password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
//! Generating jsonWebToken
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "7d",
  });
};
//! Generating Reset password token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");
  // Hashing and Adding Reset Password Token
  this.resetPasswordToken = crypto
    .createHash("sha512")
    .update(resetToken)
    .digest("hex");
  // Expiring Token
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

export const User = mongoose.model("User", userSchema);

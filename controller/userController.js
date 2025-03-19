import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

//! Register
export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Avatar and Resume Required", 400));
  }
  const { avatar, resume } = req.files;
  //   console.log("AVATAR", avatar);
  //   console.log("RESUME", resume);

  // Post Avatar
  const cloudinaryForAvatar = await cloudinary.uploader.upload(
    avatar.tempFilePath,
    { folder: "PORTFOLIO AVATAR" }
  );
  if (!cloudinaryForAvatar || cloudinaryForAvatar.error) {
    console.error(
      "Avatar Upload Failed",
      cloudinaryForAvatar.error || "Unknown error"
    );
    return next(new ErrorHandler("Failed to upload avatar", 500));
  }
  //Post Resume
  const cloudinaryForResume = await cloudinary.uploader.upload(
    resume.tempFilePath,
    { folder: "PORTFOLIO RESUME" }
  );
  if (!cloudinaryForResume || cloudinaryForResume.error) {
    console.error(
      "Resume Upload Failed",
      cloudinaryForResume.error || "Unknown error"
    );
    return next(new ErrorHandler("Failed to upload resume", 500));
  }
  const {
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    linkedinURL,
    gmailURL,
  } = req.body;
  const user = await User.create({
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    linkedinURL,
    gmailURL,
    avatar: {
      public_id: cloudinaryForAvatar.public_id,
      url: cloudinaryForAvatar.secure_url,
    },
    resume: {
      public_id: cloudinaryForResume.public_id,
      url: cloudinaryForResume.secure_url,
    },
  });
  generateToken(user, "Registered Successfully", 201, res);
});

//! Login User
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Email And Password Required", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password", 404));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Incorrect Password", 401));
  }
  generateToken(user, "Logged In Successfully", 200, res);
});

//! Get User
export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

//! Logout User
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});

//! Updating Profile
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    aboutMe: req.body.aboutMe,
    portfolioURL: req.body.portfolioURL,
    githubURL: req.body.githubURL,
    linkedinURL: req.body.linkedinURL,
    gmailURL: req.body.gmailURL,
  };
  if (req.files && req.files.avatar) {
    const avatar = req.files.avatar;
    const user = await User.findById(req.user.id);
    const profileImageId = user.avatar.public_id;
    await cloudinary.uploader.destroy(profileImageId);
    const newprofileImage = await cloudinary.uploader.upload(
      avatar.tempFilePath,
      { folder: "PORTFOLIO AVATAR" }
    );
    newUserData.avatar = {
      public_id: newprofileImage.public_id,
      url: newprofileImage.secure_url,
    };
  }

  if (req.files && req.files.resume) {
    const resume = req.files.resume;
    const user = await User.findById(req.user.id);
    const resumeFileId = user.resume.public_id;
    if (resumeFileId) {
      await cloudinary.uploader.destroy(resumeFileId);
    }
    const newResumeFile = await cloudinary.uploader.upload(
      resume.tempFilePath,
      { folder: "PORTFOLIO RESUME" }
    );
    newUserData.resume = {
      public_id: newResumeFile.public_id,
      url: newResumeFile.secure_url,
    };
  }
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});

//! Update Password
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  const user = await User.findById(req.user.id).select("+password");
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return next(new ErrorHandler("Please Fill All Field", 400));
  }
  const isPasswordMatched = await user.comparePassword(currentPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Current Password does not match"));
  }
  if (newPassword !== confirmNewPassword) {
    return next(
      new ErrorHandler("New Password & Confirm New Password does not match")
    );
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});

//! Get User for Portfolio
export const getUserForPortfolio = catchAsyncErrors(async (req, res, next) => {
  const id = "67bb5c08e71b70213cedbe35";
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    user,
  });
});

//! Forgot Password
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!req.body.email) {
    return next(new ErrorHandler("Email is required", 400));
  }

  if (!user) {
    return next(new ErrorHandler("User not found with this email!", 404));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested a password reset. Please click on the following link to complete the process:\n\n${resetPasswordUrl}\n\nIf you did not make this request, please ignore this email and no changes will be made.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Portfolio dashboard Password Recovery`,
      message,
    });
    res.status(201).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//! Reset Password
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params;
  const resetPasswordToken = crypto
    .createHash("sha512")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler("Reset Password Token is Invalid or Expired", 400)
    );
  }
  if (!req.body.password || !req.body.confirmPassword) {
    return next(new ErrorHandler("Please Fill All Fields", 400));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password & Confirm Password does not match", 400)
    );
  }
  user.password = await req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  generateToken(user, "Password Reset Successfully", 200, res);
});

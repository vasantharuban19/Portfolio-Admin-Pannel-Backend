import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { SoftwareApplication } from "../models/applicationSchema.js";
import { v2 as cloudinary } from "cloudinary";

//! Adding New Application
export const addNewApplication = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Application Image/Icon Required", 404));
  }
  const { name } = req.body;
  const { svg } = req.files;
  if (!name) {
    return next(new ErrorHandler("Please provide a Software name", 400));
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    svg.tempFilePath,
    {
      folder: "PORTFOLIO SOFTWARE APPLICATIONS",
    }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error: ",
      cloudinaryResponse.error || "Unknown error"
    );
    return next(new ErrorHandler("Failed to upload", 500));
  }
  const softWareApplication = await SoftwareApplication.create({
    name,
    svg: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "Application Added Successfully",
    softWareApplication,
  });
});

//! delete the Application
export const deleteApplication = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let softwareApplication = await SoftwareApplication.findById(id);
  if (!softwareApplication) {
    return next(new ErrorHandler("Already Deleted", 404));
  }
  const softWareApplicationSvgId = softwareApplication.svg.public_id;
  await cloudinary.uploader.destroy(softWareApplicationSvgId);
  await softwareApplication.deleteOne();
  res.status(200).json({
    success: true,
    message: "Application Deleted Successfully",
  });
});

//! Gett ALl Application
export const getAllApplications = catchAsyncErrors(async (req, res, next) => {
  const softwareApplications = await SoftwareApplication.find();
  res.status(200).json({
    success: true,
    softwareApplications,
  });
});

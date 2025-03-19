import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Timeline } from "../models/timelineSchema.js";

export const addTimeline = catchAsyncErrors(async (req, res, next) => {
  const { title, description, grade, from, to } = req.body;

  if (!title || !description || !grade || !from || !to) {
    return next(new ErrorHandler("Please Fill All Field", 400));
  }
  const newTimeline = await Timeline.create({
    title,
    description,
    grade,
    timeline: { from, to },
  });
  res.status(200).json({
    success: true,
    message: "Timeline created successfully",
    newTimeline,
  });
});

export const deleteTimeline = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let timeline = await Timeline.findById(id);
  if (!timeline) {
    return next(new ErrorHandler("Timeline not found", 404));
  }
  await timeline.deleteOne();
  res.status(200).json({
    success: true,
    message: "Timeline deleted successfully",
  });
});

export const getAllTimeline = catchAsyncErrors(async (req, res, next) => {
  const timelines = await Timeline.find();
  res.status(200).json({
    success: true,
    timelines,
  });
});

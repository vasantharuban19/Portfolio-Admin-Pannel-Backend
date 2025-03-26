import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Message } from "../models/messageSchema.js";
import { sendEmail } from "../utils/sendEmail.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { senderName, senderEmail, subject, message } = req.body;

  if (!senderName || !senderEmail || !subject || !message) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  // Save message to MongoDB
  const data = await Message.create({
    senderName,
    senderEmail,
    subject,
    message,
  });

  // Email Content
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="background: #7F22FE; color: white; text-align: center; padding: 10px; border-radius: 5px;">New Contact Message</h2>
      <p style="font-size: 16px; color: #333;">You have received a new message from your portfolio contact form:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr>
          <td style="font-weight: bold; padding: 8px; border-bottom: 1px solid #ddd;">Name:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${senderName}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 8px; border-bottom: 1px solid #ddd;">Email:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${senderEmail}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 8px; border-bottom: 1px solid #ddd;">Subject:</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${subject}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 8px;">Message:</td>
          <td style="padding: 8px;">${message}</td>
        </tr>
      </table>

      <p style="text-align: center; margin-top: 20px; font-size: 14px; color: #666;">
        <em>Reply directly to this email to respond to the sender.</em>
      </p>
    </div>
  `;

  // Send email
  try {
    await sendEmail({
      email: "vasanthruban1920@gmail.com",
      replyTo: senderEmail,
      subject: `New Contact Message from ${senderName}`,
      html,
    });
    res.status(201).json({
      success: true,
      message: "Message sent successfully and email delivered!",
      data,
    });
  } catch (error) {
    console.error("Email sending error:", error);
    return next(
      new ErrorHandler("Message saved but email could not be sent", 500)
    );
  }
});

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();
  res.status(201).json({
    success: true,
    count: messages.length,
    messages,
  });
});

export const deleteMessage = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  if (!message) {
    return next(new ErrorHandler("Message Already Deleted", 400));
  }
  await message.deleteOne();
  res.status(201).json({
    success: true,
    message: "Message Deleted Successfully",
  });
});

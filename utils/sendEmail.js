import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

export const sendEmail = async (options) => {
  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.SMTP_MAIL}>`,
    to: options.email,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.message || "",
    html: options.html,
  };

  return await transporter.sendMail(mailOptions);
};

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP verification failed:", error);
  } else {
    console.log("SMTP server is ready");
  }
});

console.log("SMTP CONFIG:", {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  mail: process.env.SMTP_MAIL,
  passwordExists: Boolean(process.env.SMTP_PASSWORD),
});

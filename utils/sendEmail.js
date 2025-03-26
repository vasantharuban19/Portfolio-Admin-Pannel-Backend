import nodeMailer from "nodemailer";

export const sendEmail = async (options) => {
  const transpoter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };
  await transpoter.sendMail(mailOptions);
};

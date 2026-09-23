import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (options) => {
  const { data, error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: [options.email],
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
    text: options.message || "",
  });

  if (error) {
    console.error("Resend email error:", error);
    throw new Error(error.message || "Email could not be sent");
  }

  console.log("Email sent successfully:", data);

  return data;
};

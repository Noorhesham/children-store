"use server";
import { randomUUID } from "crypto";
import nodemailer from "nodemailer";
import { ReceiptEmailHtml } from "@/app/components/Email";

const emailUser = process.env.EMAIL_USER!;
const emailPassword = process.env.EMAIL_PASSWORD!;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});

export async function sendPaymentEmail(
  to: string,
  { email, products, total, orderId }: { email: string; products: any[]; total: number; orderId: string }
) {
  try {
    const info = await transporter.sendMail({
      from: emailUser, // Sender address
      to,
      subject: "Payment Successful",
      text: "Payment Successful",
      html: ReceiptEmailHtml({ email, date: new Date(), products, total, orderId }),
    });

    console.log("Message sent: %s", info.messageId);
    return {
      success: true,
      message: "Email sent successfully! check your inbox to see receipt details and order info.",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return { error: "Error sending email" };
  }
}

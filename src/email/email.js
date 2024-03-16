const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "..", "config", ".env"),
});
// Function to send email
async function sendEmail(controlNumber, documentationType, to) {
  // Create a transporter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // Your email address
      pass: process.env.EMAIL_PASSWORD, // Your password
    },
    debug: true, // Enable debugging
  });

  // Message object
  let mailOptions = {
    from: process.env.EMAIL, // Sender address
    to: to, // List of recipients
    subject: "Document Request System", // Subject line
    text: `Hello,

    Thank you for utilizing our online request system. We're pleased to inform you that your request has been successfully processed.

    To facilitate the retrieval of your document(s), we have assigned a unique control number to your request. Please find your control number below:

    Control Number: [Insert Control Number]

    Kindly present this control number to the relevant department or office designated for document issuance. They will use this number to locate and provide you with the requested document(s) promptly.

    If you have any questions or need further assistance, please do not hesitate to contact us at [School Contact Information].

    Best regards,
    The Registrar Team`,
    html: `<div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background-color: #f0f7ff; border: 1px solid #007bff; border-radius: 5px;">
              <h2 style="text-align: center; font-size: 28px; color: #007bff; margin-bottom: 20px;">Hello,</h2>
              <p style="font-size: 18px; color: #333;">Thank you for utilizing our online request system. We're pleased to inform you that your request has been successfully processed.</p>
              <p style="font-size: 18px; color: #333;">To facilitate the retrieval of your ${documentationType}, we have assigned a unique control number to your request. Please find your control number below:</p>
              <p style="font-size: 18px; color: #007bff; font-weight: bold;">Control Number: ${controlNumber}</p>
              <p style="font-size: 18px; color: #333;">Kindly present this control number to the relevant department or office designated for document issuance. They will use this number to locate and provide you with the requested document(s) promptly.</p>
              <p style="font-size: 18px; color: #333;">If you have any questions or need further assistance, please do not hesitate to contact us at [School Contact Information].</p>
              <p style="text-align: center; margin-top: 30px; color: #888; font-size: 16px;">Best regards,<br />The Registrar Team</p>
            </div>`,
  };

  try {
    // Send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Error occurred while sending email:", err);
  }
}

// Call the function to send email
module.exports = sendEmail;

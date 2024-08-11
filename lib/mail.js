'use server';
import nodemailer from 'nodemailer';


export async function sendMail({ to, name, subject, body }) {

    
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    const testResult = await transporter.verify();
    console.log('Connected to SMTP Server: ', testResult);
  } catch (error) {
    console.error('Error connecting to SMTP Server: ', error);
    return { success: false, error: 'Error connecting to SMTP Server' };
  }

  try {
    const info = await transporter.sendMail({
      from: SMTP_EMAIL,
      to: to,
      subject: subject,
      html: body,
    });

    console.log('Message sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending mail: ', error);
    return { success: false, error: error.message };
  }
}


import nodemailer from 'nodemailer';
import dns from 'dns';

const sendEmail = async (to , subject , message) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    family: 4,
    lookup: (hostname, options, callback) => {
      dns.lookup(hostname, { ...options, family: 4 }, callback);
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text: message,
  });
}

export default sendEmail;
import nodemailer from 'nodemailer';

const sendEmail = async (to , subject , message) => {
  try{
    const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text: message
  });
  }catch(error){
    console.error('Error sending email:', error);
  }
}

export default sendEmail;
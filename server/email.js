const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {
  let transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.EMAIL_ADDRESS,
    to: to,
    subject: subject,
    html,
  });

  console.log('Message sent: %s', info.messageId);
};

module.exports.sendEmail = sendEmail;

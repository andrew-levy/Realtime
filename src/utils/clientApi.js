import axios from 'axios';

const sendEmail = (to, subject, html) => {
  return axios.get('/sendEmail', {
    params: {
      to: to,
      subject: subject,
      html: html,
    },
  });
};

export default sendEmail;

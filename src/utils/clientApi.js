import axios from 'axios';

const sendEmail = (to, html) => {
  return axios.get('/sendEmail', {
    params: {
      to: to,
      html: html,
    },
  });
};

export default sendEmail;

const express = require('express');
const next = require('next');
const { sendEmail } = require('./email');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/sendEmail', (req, res) => {
    const to = req.query.to;
    const html = req.query.html;
    sendEmail(to, html);
    return res.send(`Email sent to ${to}`);
  });

  server.get('/status', (req, res) => {
    return res.send('working');
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
